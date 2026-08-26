'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost, BLOG_CATEGORIES, BlogCategory } from '@/data/blogPosts'

interface BlogClientViewProps {
  posts: BlogPost[]
}

export default function BlogClientView({ posts }: BlogClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  const featuredPost = posts.find((p) => p.featured) || posts[0]

  return (
    <div className="w-full flex flex-col pt-6 pb-20 sm:pb-28">
      
      {/* 1. Header Hero Section */}
      <section className="w-full px-[24px] max-w-[1512px] mx-auto mb-12 sm:mb-16">
        <div className="flex flex-col items-start max-w-4xl">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20D38E]/15 border border-[#20D38E]/30 text-[#0D382A] text-xs sm:text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#20D38E] animate-pulse" />
            <span>PStudio Editorial &amp; Perspectives</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[42px] sm:text-[58px] lg:text-[72px] xl:text-[80px] leading-[1.04] tracking-[-0.035em] text-[#111827] mb-6"
          >
            Strategic Insights on SaaS Video &amp; Storytelling
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[17px] sm:text-[19px] text-gray-600 font-normal leading-relaxed max-w-2xl"
          >
            Actionable frameworks, creative philosophy, and production case studies to help product leaders turn complex tech into high-converting stories.
          </motion.p>

        </div>
      </section>

      {/* 2. Featured Post Spotlight */}
      {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
        <section className="w-full px-[24px] max-w-[1512px] mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-black/5 hover:border-black/15 shadow-sm hover:shadow-xl transition-all duration-300 items-center"
            >
              {/* Featured Cover Artwork */}
              <div className="lg:col-span-7 w-full aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden relative">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#111827] shadow-sm">
                  ★ Featured Article
                </div>
              </div>

              {/* Featured Content */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                <div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium mb-4">
                    <span className="px-3 py-1 bg-[#20D38E]/20 text-[#0D382A] rounded-full font-semibold">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="font-display font-medium text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.03em] text-[#111827] group-hover:text-[#0D382A] transition-colors mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 font-normal leading-relaxed line-clamp-3 mb-8">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Author Info & Read CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-black/10"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#111827]">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {featuredPost.author.role}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D382A] group-hover:translate-x-1 transition-transform">
                    Read article &rarr;
                  </span>
                </div>

              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* 3. Filter Tabs & Live Search Bar */}
      <section className="w-full px-[24px] max-w-[1512px] mx-auto mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:text-black border border-black/10 hover:border-black/20'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-2.5 pl-10 bg-white border border-black/10 rounded-xl text-sm text-studio-dark placeholder-gray-400 focus:outline-none focus:border-[#20D38E] focus:ring-2 focus:ring-[#20D38E]/20 transition-all"
            />
            <svg
              className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 4. Articles Grid */}
      <section className="w-full px-[24px] max-w-[1512px] mx-auto">
        {filteredPosts.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="font-display font-medium text-2xl text-[#111827] mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-5 py-2.5 bg-[#20D38E] text-[#0D382A] rounded-xl font-medium text-sm hover:brightness-105 transition-all"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/15 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    
                    {/* Card Cover Image */}
                    <div className="w-full aspect-[16/10] bg-gray-100 overflow-hidden relative">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#111827]">
                        {post.readTime}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                          <span className="px-2.5 py-0.5 bg-black/5 text-[#111827] rounded-md font-semibold">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="font-display font-medium text-[22px] sm:text-[24px] leading-snug tracking-[-0.025em] text-[#111827] group-hover:text-[#0D382A] transition-colors mb-3">
                          {post.title}
                        </h3>

                        <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 font-normal leading-relaxed line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Card Footer Author */}
                      <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-black/10"
                          />
                          <span className="text-xs font-medium text-[#111827]">
                            {post.author.name}
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-[#0D382A] group-hover:translate-x-1 transition-transform">
                          Read &rarr;
                        </span>
                      </div>

                    </div>

                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 5. Studio Newsletter Callout Banner */}
      <section className="w-full px-[24px] max-w-[1512px] mx-auto mt-24 sm:mt-32">
        <div className="w-full bg-[#20D38E] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-[#0D382A]">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D382A]/80 mb-2 block">
              PStudio Intelligence
            </span>
            <h3 className="font-display font-medium text-[32px] sm:text-[42px] leading-tight tracking-[-0.03em] mb-4">
              Get high-impact video strategy delivered monthly.
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#0D382A]/90 font-normal leading-relaxed">
              No fluff, no spam. Only tactical frameworks on positioning, motion metaphors, and video ROI for B2B SaaS founders.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for subscribing to PStudio Insights!')
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] sm:min-w-[400px]"
          >
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              className="px-5 py-3.5 rounded-xl bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 flex-grow"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#111827] text-white rounded-xl font-display font-medium text-sm hover:bg-black transition-colors whitespace-nowrap active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}
