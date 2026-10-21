'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost, BLOG_CATEGORIES, BlogCategory } from '@/data/blogPosts'
import {
  IconSearch,
  IconX,
  IconArrowRight,
} from '@tabler/icons-react'
import BlogFigmaHero from '@/components/blog/BlogFigmaHero'

interface BlogClientViewProps {
  posts: BlogPost[]
}

export default function BlogClientView({ posts }: BlogClientViewProps) {
  const [viewMode, setViewMode] = useState<'reel' | 'grid'>('reel')
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Dynamically calculate post counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length }
    BLOG_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = posts.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [posts])

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

  const handleViewModeChange = (mode: 'reel' | 'grid') => {
    setViewMode(mode)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <div className="w-full selection:bg-accent-green selection:text-black">
      
      {/* Main Content: Switch between Figma 3-Column Reel View and All Articles Grid */}
      {viewMode === 'reel' ? (
        /* ========================================================================= */
        /* OPTION 1: FIGMA 3-COLUMN HERO REEL (View Switcher is INSIDE this section) */
        /* ========================================================================= */
        <div key="reel-view" className="w-full">
          <BlogFigmaHero
            posts={posts}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onSelectCategory={(category) => {
              setSelectedCategory(category as BlogCategory)
              handleViewModeChange('grid')
            }}
          />
        </div>
      ) : (
        /* ========================================================================= */
        /* OPTION 2: ALL ARTICLES ARCHIVE (Filter Tabs, Search & Responsive Grid)   */
        /* ========================================================================= */
        <div
          key="grid-view"
          className="w-full min-h-screen flex flex-col pt-20 sm:pt-24 pb-20"
        >
          {/* Top View Mode Switcher Header inside Grid View (Aligned to 12-Column Grid) */}
          <div className="w-full px-[24px] pb-6">
            <div className="w-full grid grid-cols-12 gap-[24px] items-center">
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-center justify-end">
                <div className="inline-flex items-center p-1 bg-black/5 rounded-2xl border border-black/5 shadow-inner">
                  <button
                    onClick={() => handleViewModeChange('reel')}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-[#111111]/60 hover:text-black"
                  >
                    <span>Reel View</span>
                  </button>

                  <button
                    onClick={() => handleViewModeChange('grid')}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer bg-[#111111] text-white shadow-sm"
                  >
                    <span>All Articles ({posts.length})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

            {/* Filter Tabs & Live Search Bar */}
            <section className="w-full px-[24px] mb-10 sm:mb-12">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center pb-6 border-b border-black/10">
                
                {/* Category Tabs (Columns 1-8) */}
                <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
                  {BLOG_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat
                    const count = categoryCounts[cat] || 0

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#111111] text-white shadow-sm'
                            : 'bg-white text-[#111111]/70 hover:text-black border border-black/10 hover:border-black/30'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                            isSelected
                              ? 'bg-white/20 text-accent-green'
                              : 'bg-black/5 text-[#111111]/60'
                          }`}
                        >
                          {count}
                        </span>
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
                      className="w-full px-4 py-2.5 pl-10 bg-white border border-black/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all shadow-sm"
                    />
                    <IconSearch
                      size={16}
                      stroke={2.2}
                      className="absolute left-3.5 top-3 text-[#111111]/40 pointer-events-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-black/5 text-[#111111]/40 hover:text-black transition-colors"
                        aria-label="Clear search"
                      >
                        <IconX size={14} stroke={2.4} />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* Articles Grid */}
            <section className="w-full px-[24px]">
              <div className="w-full">
                {filteredPosts.length === 0 ? (
                  <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-black/5 shadow-sm">
                    <h3 className="font-display font-medium text-2xl text-[#111111] mb-2">
                      No articles found
                    </h3>
                    <p className="text-[#111111]/60 max-w-md mb-6 font-sans text-sm">
                      We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset category filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All')
                        setSearchQuery('')
                      }}
                      className="px-5 py-2.5 bg-[#111111] text-white rounded-xl font-medium text-sm hover:bg-black transition-all cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[24px] relative">
                    <AnimatePresence mode="popLayout">
                      {filteredPosts.map((post) => (
                        <motion.article
                          key={post.slug}
                          layout="position"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25 },
                            scale: { duration: 0.2 },
                          }}
                          className="col-span-1 md:col-span-1 lg:col-span-4 group flex flex-col bg-white overflow-hidden border border-transparent hover:border-accent-green transition-[border-color,box-shadow] duration-300 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg"
                        >
                          <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                            
                            {/* Card Cover Image */}
                            <div className="w-full aspect-[472/247] bg-gray-100 overflow-hidden relative">
                              <img
                                src={post.coverImage}
                                alt={post.coverImageAlt}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold text-[#111111] border border-black/5 shadow-sm">
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

                                <h3 className="font-display font-medium text-[20px] sm:text-[22px] leading-snug tracking-[-0.025em] text-[#111111] group-hover:text-black transition-colors mb-3">
                                  {post.title}
                                </h3>

                                <p className="font-sans text-[14px] sm:text-[15px] text-[#111111]/70 font-normal leading-[1.65] line-clamp-3 mb-6">
                                  {post.excerpt}
                                </p>
                              </div>

                              {/* Card Footer Read CTA */}
                              <div className="flex items-center justify-between pt-4 border-t border-black/10">
                                <span className="text-xs text-[#111111]/60">
                                  By {post.author.name}
                                </span>
                                <span className="text-xs font-semibold text-[#111111] group-hover:text-black group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                                  <span>Read article</span>
                                  <IconArrowRight size={14} />
                                </span>
                              </div>

                            </div>

                          </Link>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

    </div>
  )
}
