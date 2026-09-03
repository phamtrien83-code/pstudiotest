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
    <div className="w-full flex flex-col pt-28 sm:pt-36 pb-24 sm:pb-32 selection:bg-accent-green selection:text-black">
      
      {/* 1. Header Hero Section */}
      <section className="w-full px-[24px] mb-12 sm:mb-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-8 flex flex-col items-start">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-[42px] sm:text-[58px] lg:text-[76px] xl:text-[84px] leading-[1.02] tracking-[-0.035em] text-[#111111] mb-6"
            >
              Insights &amp; Perspectives
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[18px] sm:text-[20px] text-[#111111]/70 font-normal leading-[1.65] max-w-2xl tracking-[-0.015em]"
            >
              Actionable frameworks, creative philosophy, and production case studies on turning complex software into clear, high-converting product stories.
            </motion.p>

          </div>
        </div>
      </section>

      {/* 2. Featured Post Spotlight */}
      {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
        <section className="w-full px-[24px] mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] bg-white p-6 sm:p-8 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border border-transparent hover:border-accent-green transition-all duration-300 items-center shadow-sm"
            >
              {/* Featured Cover Artwork (Columns 1-7) */}
              <div className="lg:col-span-7 w-full aspect-[16/10] bg-gray-100 overflow-hidden relative rounded-xl sm:rounded-2xl">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#111111] border border-black/5 shadow-sm">
                  Featured
                </div>
              </div>

              {/* Featured Content (Columns 8-12) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                <div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#111111]/60 font-medium mb-4">
                    <span className="px-3 py-1 bg-black/5 text-[#111111] rounded-xl font-semibold">
                      {featuredPost.category}
                    </span>
                    <span>&bull;</span>
                    <span>{featuredPost.readTime}</span>
                    <span>&bull;</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="font-display font-medium text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.03em] text-[#111111] group-hover:text-black transition-colors mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans text-[15px] sm:text-[16px] text-[#111111]/70 font-normal leading-[1.65] line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Read CTA */}
                <div className="flex items-center justify-end pt-6 border-t border-black/10">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] group-hover:translate-x-1.5 transition-transform">
                    Read article &rarr;
                  </span>
                </div>

              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* 3. Filter Tabs & Live Search Bar */}
      <section className="w-full px-[24px] mb-10 sm:mb-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center pb-6 border-b border-black/10">
          
          {/* Category Tabs (Columns 1-8) */}
          <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#111111] text-white'
                      : 'bg-transparent text-[#111111]/70 hover:text-black border border-black/10 hover:border-black/30'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Input (Columns 9-12) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end w-full">
            <div className="relative w-full sm:max-w-xs lg:w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-2.5 pl-10 bg-transparent border border-black/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
              <svg
                className="absolute left-3.5 top-3 w-4 h-4 text-[#111111]/40 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#111111]/40 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Articles Grid */}
      <section className="w-full px-[24px]">
        {filteredPosts.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <h3 className="font-display font-medium text-2xl text-[#111111] mb-2">
              No articles found
            </h3>
            <p className="text-[#111111]/60 max-w-md mb-6 font-sans">
              We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl font-medium text-sm hover:bg-black transition-all"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[24px]">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="col-span-1 md:col-span-1 lg:col-span-4 group flex flex-col bg-white overflow-hidden border border-transparent hover:border-accent-green transition-all duration-300 rounded-2xl sm:rounded-3xl shadow-sm"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    
                    {/* Card Cover Image */}
                    <div className="w-full aspect-[16/10] bg-gray-100 overflow-hidden relative">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold text-[#111111] border border-black/5">
                        {post.readTime}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#111111]/60 font-medium mb-3">
                          <span className="px-2.5 py-0.5 bg-black/5 text-[#111111] rounded-xl font-semibold">
                            {post.category}
                          </span>
                          <span>&bull;</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="font-display font-medium text-[22px] sm:text-[24px] leading-snug tracking-[-0.025em] text-[#111111] group-hover:text-black transition-colors mb-3">
                          {post.title}
                        </h3>

                        <p className="font-sans text-[14px] sm:text-[15px] text-[#111111]/70 font-normal leading-[1.65] line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Card Footer Read CTA */}
                      <div className="flex items-center justify-end pt-4 border-t border-black/10">
                        <span className="text-xs font-semibold text-[#111111] group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
                          Read article &rarr;
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

    </div>
  )
}
