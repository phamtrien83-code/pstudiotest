'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost } from '@/data/blogPosts'

interface BlogFigmaHeroProps {
  posts: BlogPost[]
  viewMode?: 'reel' | 'grid'
  onViewModeChange?: (mode: 'reel' | 'grid') => void
  onSelectCategory?: (category: string) => void
}

export default function BlogFigmaHero({
  posts,
  viewMode = 'reel',
  onViewModeChange,
  onSelectCategory,
}: BlogFigmaHeroProps) {
  const total = posts.length
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const touchStartY = useRef<number | null>(null)
  const activeIndexRef = useRef(activeIndex)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, total - 1))
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // Window-level non-passive wheel event listener:
  // - Attached to window so cursor position (over Navbar, padding, cards) never leaks global scroll.
  // - While activeIndex < total - 1 and at top of page, ALWAYS prevents default to guarantee zero global scroll.
  // - Robust momentum lock absorbs all trackpad deceleration without skipping articles.
  // - When idle at the last article (total - 1) and user scrolls down: allows native global scroll to scroll to footer ("hết thì xuống").
  // - When scrolled down in footer: global scroll runs 100% untouched.
  // - When scrolled back up to top: scrolling UP steps backwards through articles.
  useEffect(() => {
    if (viewMode !== 'reel') return

    let wheelDebounceTimer: NodeJS.Timeout | null = null
    let isLocked = false

    const handleWindowWheel = (e: WheelEvent) => {
      const scrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0)

      // 1. If page is already scrolled down into the page/footer:
      if (scrollY > 10) {
        return
      }

      // 2. If currently in transition cooldown (absorbing trackpad momentum):
      // ALWAYS prevent default so momentum never triggers global scroll!
      if (isLocked) {
        e.preventDefault()
        if (wheelDebounceTimer) clearTimeout(wheelDebounceTimer)
        wheelDebounceTimer = setTimeout(() => {
          isLocked = false
        }, 180)
        return
      }

      // 3. Boundary: At first article (0) and scrolling UP:
      if (activeIndexRef.current === 0 && e.deltaY < 0) {
        return
      }

      // 4. Boundary: At last article (total - 1) and scrolling DOWN:
      // "hết thì xuống" -> Allow native global scroll to scroll down to footer!
      if (activeIndexRef.current >= total - 1 && e.deltaY > 0) {
        return
      }

      // 5. Within reel: intercept wheel and step active card
      // ALWAYS call preventDefault() before any other check!
      e.preventDefault()

      // Ignore micro-deltas
      if (Math.abs(e.deltaY) < 18) return

      isLocked = true

      if (e.deltaY > 0) {
        handleNext()
      } else {
        handlePrev()
      }

      // 180ms after the LAST wheel event of the gesture, unlock
      if (wheelDebounceTimer) clearTimeout(wheelDebounceTimer)
      wheelDebounceTimer = setTimeout(() => {
        isLocked = false
      }, 180)
    }

    window.addEventListener('wheel', handleWindowWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWindowWheel)
      if (wheelDebounceTimer) clearTimeout(wheelDebounceTimer)
    }
  }, [handleNext, handlePrev, total, viewMode])

  // Non-passive TouchMove for Mobile & Tablet:
  // Prevents premature mobile page scroll while swiping through reel articles
  useEffect(() => {
    if (viewMode !== 'reel') return
    const el = sectionRef.current
    if (!el) return

    const handleTouchMoveNative = (e: TouchEvent) => {
      const scrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0)
      if (scrollY > 10) return

      if (touchStartY.current !== null) {
        const deltaY = e.touches[0].clientY - touchStartY.current
        // If swiping up (moving towards next article) and not yet at the last article:
        if (deltaY < 0 && activeIndexRef.current < total - 1) {
          e.preventDefault()
        }
        // If swiping down (moving towards prev article) and not yet at first article:
        if (deltaY > 0 && activeIndexRef.current > 0) {
          e.preventDefault()
        }
      }
    }

    el.addEventListener('touchmove', handleTouchMoveNative, { passive: false })
    return () => el.removeEventListener('touchmove', handleTouchMoveNative)
  }, [total, viewMode])

  // Keyboard navigation (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0
      if (e.key === 'ArrowDown') {
        if (currentScrollY <= 10 && activeIndexRef.current < total - 1) {
          e.preventDefault()
          handleNext()
        }
      } else if (e.key === 'ArrowUp') {
        if (currentScrollY <= 10 && activeIndexRef.current > 0) {
          e.preventDefault()
          handlePrev()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, total])

  // Touch Swipe for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0
    if (currentScrollY > 10) return

    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(deltaY) > 35) {
      if (deltaY < 0) {
        if (activeIndexRef.current < total - 1) {
          handleNext()
        }
      } else {
        if (activeIndexRef.current > 0) {
          handlePrev()
        }
      }
    }
    touchStartY.current = null
  }

  // Finite 3D reel track: only render slots that fall within [0, total - 1]
  // This completely eliminates infinite scrolling / looping:
  // At index 0, there is nothing above. At index total - 1, there is nothing below.
  const visibleCards = useMemo(() => {
    if (total === 0) return []
    const offsets = [-2, -1, 0, 1, 2]
    return offsets
      .map((offset) => {
        const idx = activeIndex + offset
        if (idx < 0 || idx >= total) return null
        return {
          post: posts[idx],
          offset,
        }
      })
      .filter((item): item is { post: BlogPost; offset: number } => item !== null)
  }, [posts, activeIndex, total])

  if (total === 0) return null

  const currentPost = posts[activeIndex]

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen min-h-[100dvh] max-h-[1020px] -mt-[76px] sm:-mt-[84px] pt-[84px] sm:pt-[96px] pb-6 flex flex-col justify-between bg-background overflow-hidden px-[24px] select-none"
    >
      {/* Top Bar with View Switcher inside the Hero Section (Aligned to 12-Column Grid) */}
      <div className="w-full grid grid-cols-12 gap-[24px] items-center z-30">
        {onViewModeChange && (
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-center justify-end">
            <div className="inline-flex items-center p-1 bg-black/5 rounded-2xl border border-black/5 shadow-inner">
              <button
                onClick={() => onViewModeChange('reel')}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  viewMode === 'reel'
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-[#111111]/60 hover:text-black'
                }`}
              >
                <span>Reel View</span>
              </button>

              <button
                onClick={() => onViewModeChange('grid')}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-[#111111]/60 hover:text-black'
                }`}
              >
                <span>All Articles ({total})</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3-Column Split Container strictly aligned with 12-column Grid (4 cols each) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center relative my-auto">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (LEFT, Cols 1-4): Title & Tag (Matching card height aspect)      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 w-full h-auto lg:aspect-[472/247] flex flex-col justify-between order-2 lg:order-1 pt-4 lg:pt-0">
          
          {/* Big Title (Max 2 lines) */}
          <div className="min-h-[110px] lg:min-h-[160px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentPost.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-[28px] sm:text-[34px] lg:text-[36px] xl:text-[42px] leading-[1.12] tracking-[-0.03em] text-[#111111] line-clamp-2"
              >
                <Link
                  href={`/blog/${currentPost.slug}`}
                  className="hover:text-black transition-colors"
                >
                  {currentPost.title}
                </Link>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Tag in Accent Green (No Underline, with smooth text transition) */}
          <div className="pt-3 lg:pt-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory(currentPost.category)
                    }
                  }}
                  className="text-accent-green font-medium text-[15px] sm:text-[16px] hover:opacity-80 transition-opacity text-left cursor-pointer inline-block"
                  title={`Filter by ${currentPost.category}`}
                >
                  {currentPost.category}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2 (CENTER, Cols 5-8): Reel Cards (Exact 4 cols width aspect ratio)  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 w-full flex items-center justify-center relative order-1 lg:order-2 my-6 lg:my-0">
          
          {/* Center Card Anchor Container with 3D Perspective */}
          <div
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className="relative w-full aspect-[472/247] flex items-center justify-center"
          >
            {visibleCards.map(({ post, offset }) => {
              const isCenter = offset === 0
              const isTop = offset === -1
              const isBottom = offset === 1

              let y: string | number = '0%'
              let rotateX = 0
              let scale = 1
              let opacity = 1
              let transformOrigin = '50% 50%'
              let zIndex = 10
              let pointerEvents: 'auto' | 'none' = 'none'

              if (isCenter) {
                y = '0%'
                rotateX = 0
                scale = 1
                opacity = 1
                transformOrigin = '50% 50%'
                zIndex = 20
                pointerEvents = 'auto'
              } else if (isTop) {
                // Top card: tilts away at top (top 2 anchor points move closer together)
                y = '-110%'
                rotateX = 22
                scale = 0.93
                opacity = 0.45
                transformOrigin = '50% 100%'
                zIndex = 10
                pointerEvents = 'auto'
              } else if (isBottom) {
                // Bottom card: tilts away at bottom (bottom 2 anchor points move closer together)
                y = '110%'
                rotateX = -22
                scale = 0.93
                opacity = 0.45
                transformOrigin = '50% 0%'
                zIndex = 10
                pointerEvents = 'auto'
              } else if (offset === -2) {
                // Outer top buffer
                y = '-220%'
                rotateX = 32
                scale = 0.86
                opacity = 0
                transformOrigin = '50% 100%'
                zIndex = 0
                pointerEvents = 'none'
              } else if (offset === 2) {
                // Outer bottom buffer
                y = '220%'
                rotateX = -32
                scale = 0.86
                opacity = 0
                transformOrigin = '50% 0%'
                zIndex = 0
                pointerEvents = 'none'
              }

              return (
                <motion.div
                  key={post.slug}
                  initial={false}
                  animate={{
                    y,
                    rotateX,
                    scale,
                    opacity,
                    transformOrigin,
                    zIndex,
                  }}
                  transition={{
                    duration: 0.48,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    pointerEvents,
                  }}
                  onClick={() => {
                    if (isTop) handlePrev()
                    if (isBottom) handleNext()
                  }}
                  className={`absolute inset-0 w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-gray-100 will-change-transform ${
                    isCenter
                      ? 'cursor-pointer'
                      : isTop || isBottom
                      ? 'cursor-pointer hover:opacity-70 transition-opacity'
                      : ''
                  }`}
                  title={
                    isTop
                      ? 'View previous article'
                      : isBottom
                      ? 'View next article'
                      : undefined
                  }
                >
                  {isCenter ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block w-full h-full relative"
                    >
                      {/* Pure Artwork Image (No overlay, no text) */}
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-full relative">
                      {/* Pure Artwork Image with subtle peek veil */}
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3 (RIGHT, Cols 9-12): Excerpt & Read Details (Matching card height) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 w-full h-auto lg:aspect-[472/247] flex flex-col justify-between order-3 pt-4 lg:pt-0">
          
          {/* Excerpt */}
          <div className="min-h-[110px] lg:min-h-[160px] flex items-start overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPost.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-[15px] sm:text-[16px] text-[#111111]/70 font-normal leading-[1.65] line-clamp-4"
              >
                {currentPost.excerpt}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom Action Row: "Read article" (Underlined) & "X mins read" (Normal Font) with smooth text transition */}
          <div className="flex items-center justify-between pt-4 border-t border-black/10 lg:border-t-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-between"
              >
                <Link
                  href={`/blog/${currentPost.slug}`}
                  className="text-accent-green font-semibold text-[15px] sm:text-[16px] underline decoration-accent-green underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  Read article
                </Link>

                <span className="text-accent-green font-normal text-[15px] sm:text-[16px]">
                  {currentPost.readTime}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Bottom spacer for perfect balance */}
      <div className="w-full h-6 opacity-0 pointer-events-none" />

    </section>
  )
}
