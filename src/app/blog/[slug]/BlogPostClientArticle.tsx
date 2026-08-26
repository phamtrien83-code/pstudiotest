'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogPost } from '@/data/blogPosts'

interface BlogPostClientArticleProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostClientArticle({
  post,
  relatedPosts,
}: BlogPostClientArticleProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [copied, setCopied] = useState(false)

  // Track active heading for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const headings = post.contentSections.map((sec) =>
        document.getElementById(sec.id)
      )

      const scrollPosition = window.scrollY + 200

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i]
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(post.contentSections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [post.contentSections])

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <article className="w-full flex flex-col pt-6 pb-20 sm:pb-28">
      
      {/* 1. Breadcrumbs & Meta Header */}
      <div className="w-full px-[24px] max-w-[1512px] mx-auto mb-10 sm:mb-14">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-black transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </nav>

        {/* Title & Metadata */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium mb-4">
            <span className="px-3.5 py-1 bg-[#20D38E]/20 text-[#0D382A] rounded-full font-semibold">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[36px] sm:text-[50px] lg:text-[62px] leading-[1.08] tracking-[-0.035em] text-[#111827] mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Author info banner */}
          <div className="flex items-center gap-3 pt-6 border-t border-black/10">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-black/10"
            />
            <div>
              <p className="font-medium text-[15px] sm:text-[16px] text-[#111827]">
                {post.author.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {post.author.role}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Hero Cover Banner */}
      <div className="w-full px-[24px] max-w-[1512px] mx-auto mb-16 sm:mb-20">
        <div className="w-full aspect-[21/9] sm:aspect-[2.4/1] bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-black/5">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Main Editorial Content + Sticky Sidebar */}
      <div className="w-full px-[24px] max-w-[1512px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Sticky Left Sidebar (Table of Contents + Social Share) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col space-y-8 order-2 lg:order-1">
          
          {/* Table of Contents Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Table of Contents
            </h4>

            <ul className="space-y-3 text-sm">
              {post.tableOfContents.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block transition-all ${
                        isActive
                          ? 'text-[#0D382A] font-semibold translate-x-1'
                          : 'text-gray-600 hover:text-black font-normal'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Share Bar */}
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Share this insight
            </h4>

            <div className="flex items-center gap-3">
              <button
                onClick={copyShareLink}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium text-black transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <span>{copied ? '✓ Copied!' : '🔗 Copy Link'}</span>
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-black transition-colors text-xs font-medium"
                aria-label="Share on LinkedIn"
              >
                LinkedIn
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-black transition-colors text-xs font-medium"
                aria-label="Share on X"
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="bg-[#20D38E]/10 border border-[#20D38E]/30 rounded-2xl p-6 sm:p-7 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D382A] mb-2">
              Need strategic videos?
            </span>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              We help B2B SaaS teams turn complex telemetry and AI workflows into compelling product stories.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#20D38E] text-[#0D382A] rounded-xl text-sm font-semibold hover:brightness-105 transition-all text-center"
            >
              Book a Strategy Call
            </Link>
          </div>

        </aside>

        {/* Main Article Body (Right Column) */}
        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col space-y-12">
          
          {post.contentSections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="scroll-mt-28 flex flex-col space-y-6"
            >
              <h2 className="font-display font-medium text-[26px] sm:text-[32px] lg:text-[36px] leading-tight tracking-[-0.03em] text-[#111827] pt-2">
                {sec.heading}
              </h2>

              <div className="space-y-5 text-[16px] sm:text-[18px] text-gray-700 font-normal leading-[1.8] tracking-[-0.01em]">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Custom Quote Callout */}
              {sec.quote && (
                <div className="my-6 p-6 sm:p-8 bg-black/[0.02] border-l-4 border-[#20D38E] rounded-r-2xl">
                  <p className="font-display italic text-[18px] sm:text-[22px] leading-relaxed text-[#111827] mb-2">
                    &ldquo;{sec.quote}&rdquo;
                  </p>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    — PStudio Strategic Framework
                  </span>
                </div>
              )}

              {/* Key Takeaways Box */}
              {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                <div className="my-6 p-6 sm:p-8 bg-[#20D38E]/10 border border-[#20D38E]/30 rounded-2xl">
                  <h4 className="font-display font-semibold text-base sm:text-lg text-[#0D382A] mb-4 flex items-center gap-2">
                    <span>💡</span>
                    <span>Key Strategic Takeaways</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {sec.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-gray-800 leading-relaxed">
                        <span className="text-[#20D38E] font-bold text-lg leading-none select-none">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Author Signature Box */}
          <div className="pt-10 border-t border-black/10 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#20D38E]"
            />
            <div className="flex flex-col">
              <h4 className="font-display font-medium text-lg text-[#111827]">
                Written by {post.author.name}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">
                {post.author.role}. Focusing on brand positioning, high-converting visual metaphors, and motion identity for B2B SaaS companies.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full px-[24px] max-w-[1512px] mx-auto mt-24 sm:mt-32 pt-16 border-t border-black/10">
          <div className="flex flex-col mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Keep Reading
            </span>
            <h3 className="font-display font-medium text-[32px] sm:text-[40px] tracking-tight text-[#111827]">
              Related Strategic Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {relatedPosts.map((relPost) => (
              <Link
                key={relPost.slug}
                href={`/blog/${relPost.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/15 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden relative">
                  <img
                    src={relPost.coverImage}
                    alt={relPost.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#111827]">
                    {relPost.readTime}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="px-2.5 py-0.5 bg-black/5 text-[#111827] rounded-md font-semibold text-xs mb-3 inline-block">
                      {relPost.category}
                    </span>
                    <h4 className="font-display font-medium text-xl sm:text-2xl leading-snug tracking-tight text-[#111827] group-hover:text-[#0D382A] transition-colors mb-2">
                      {relPost.title}
                    </h4>
                    <p className="font-sans text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {relPost.excerpt}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#0D382A] group-hover:translate-x-1 transition-transform pt-4 border-t border-black/5 mt-4 inline-flex items-center gap-1">
                    Read article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  )
}
