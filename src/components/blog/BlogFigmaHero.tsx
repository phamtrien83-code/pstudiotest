'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import { BlogPost } from '@/data/blogPosts'

interface BlogFigmaHeroProps {
  posts: BlogPost[]
  viewMode?: 'reel' | 'grid'
  onViewModeChange?: (mode: 'reel' | 'grid') => void
  onSelectCategory?: (category: string) => void
}

function ReelCardItem({
  post,
  index,
  activeIndex,
  smoothIndex,
  onSelectIndex,
}: {
  post: BlogPost
  index: number
  activeIndex: number
  smoothIndex: MotionValue<number>
  onSelectIndex: (idx: number) => void
}) {
  const isCenter = index === activeIndex

  // Smooth flat opacity based on distance from current smooth scroll index
  const opacity = useTransform(
    smoothIndex,
    [index - 2, index - 1, index, index + 1, index + 2],
    [0, 0.42, 1, 0.42, 0]
  )

  return (
    <motion.div
      style={{
        top: `${index * 108}%`,
        opacity,
      }}
      onClick={() => {
        if (!isCenter) {
          onSelectIndex(index)
        }
      }}
      className={`absolute inset-x-0 w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-black/5 bg-gray-100 will-change-transform ${
        isCenter ? 'cursor-pointer z-20' : 'cursor-pointer hover:opacity-75 transition-opacity z-10'
      }`}
      title={
        index < activeIndex
          ? 'Previous article'
          : index > activeIndex
          ? 'Next article'
          : post.title
      }
    >
      {isCenter ? (
        <Link href={`/blog/${post.slug}`} className="block w-full h-full relative">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            className="w-full h-full object-cover"
          />
        </Link>
      ) : (
        <div className="w-full h-full relative">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/15" />
        </div>
      )}
    </motion.div>
  )
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Build smooth magnetic plateaus so each card rests cleanly in center while scrolling stays continuous
  const { inputRange, outputRange } = useMemo(() => {
    if (total <= 1) {
      return { inputRange: [0, 1], outputRange: [0, 0] }
    }
    const inputs: number[] = []
    const outputs: number[] = []
    const slice = 1 / total
    const holdRatio = 0.32

    for (let i = 0; i < total; i++) {
      const start = i * slice
      const end = (i + 1) * slice
      const center = (start + end) / 2
      const halfHold = (slice * holdRatio) / 2

      const holdStart = i === 0 ? 0 : Math.max(0, center - halfHold)
      const holdEnd = i === total - 1 ? 1 : Math.min(1, center + halfHold)

      inputs.push(holdStart, holdEnd)
      outputs.push(i, i)
    }

    return { inputRange: inputs, outputRange: outputs }
  }, [total])

  const targetIndex = useTransform(scrollYProgress, inputRange, outputRange)

  const smoothIndex = useSpring(targetIndex, {
    stiffness: 115,
    damping: 24,
    mass: 0.55,
    restDelta: 0.001,
  })

  // Translate entire flat vertical track smoothly
  const trackY = useTransform(smoothIndex, (val) => `${-val * 108}%`)

  // Sync activeIndex for Left Title & Right Excerpt as smoothIndex moves
  useMotionValueEvent(smoothIndex, 'change', (latest) => {
    const nextIdx = Math.max(0, Math.min(total - 1, Math.round(latest)))
    setActiveIndex((prev) => (prev !== nextIdx ? nextIdx : prev))
  })

  // Smooth scroll to a specific card index when clicked or navigated via keyboard
  const scrollToIndex = useCallback(
    (idx: number) => {
      if (!sectionRef.current || total <= 1) return
      const clamped = Math.max(0, Math.min(total - 1, idx))
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const slice = 1 / total
      const progress = clamped === 0 ? 0 : clamped === total - 1 ? 1 : (clamped + 0.5) * slice
      window.scrollTo({
        top: sectionTop + progress * scrollableDistance,
        behavior: 'smooth',
      })
    },
    [total]
  )

  // Snap to the nearest article once the user stops scrolling inside the pinned reel
  useEffect(() => {
    if (viewMode !== 'reel' || total <= 1) return

    let timer: ReturnType<typeof setTimeout> | null = null
    let lastY = window.scrollY
    let direction: 1 | -1 = 1
    let touching = false

    const snap = () => {
      const section = sectionRef.current
      if (!section || touching) return

      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const scrollableDistance = section.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const y = window.scrollY
      // Only snap while the reel is pinned (not when scrolling into content above/below)
      if (y < sectionTop - 2 || y > sectionTop + scrollableDistance + 2) return

      // Bias toward the scroll direction so a small, intentional scroll moves to the next article
      const current = targetIndex.get()
      const bias = 0.3
      const raw = direction > 0 ? Math.floor(current + (1 - bias)) : Math.ceil(current - (1 - bias))
      const idx = Math.max(0, Math.min(total - 1, raw))

      const slice = 1 / total
      const progress = idx === 0 ? 0 : idx === total - 1 ? 1 : (idx + 0.5) * slice
      const targetY = sectionTop + progress * scrollableDistance
      if (Math.abs(targetY - y) < 2) return

      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }

    const schedule = (delay: number) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(snap, delay)
    }

    const onScroll = () => {
      const y = window.scrollY
      if (y !== lastY) direction = y > lastY ? 1 : -1
      lastY = y
      schedule(140)
    }
    const onTouchStart = () => {
      touching = true
      if (timer) clearTimeout(timer)
    }
    const onTouchEnd = () => {
      touching = false
      schedule(180)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [viewMode, total, targetIndex])

  // Keyboard navigation (ArrowUp / ArrowDown)
  useEffect(() => {
    if (viewMode !== 'reel') return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeIndex < total - 1) {
        e.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault()
        scrollToIndex(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, scrollToIndex, total, viewMode])

  if (total === 0) return null

  const currentPost = posts[activeIndex] || posts[0]
  const sectionHeightVh = Math.max(100, total * 58)

  return (
    <section
      ref={sectionRef}
      style={{ height: `${sectionHeightVh}vh` }}
      className="relative w-full -mt-[76px] sm:-mt-[84px] bg-background select-none"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 w-full h-screen min-h-[100dvh] max-h-[1080px] pt-[84px] sm:pt-[96px] pb-6 flex flex-col justify-between bg-background overflow-hidden px-[24px]">
        
        {/* Top Bar with Icon-Only View Switcher (Aligned to 12-Column Grid) */}
        <div className="w-full grid grid-cols-12 gap-[24px] items-center z-30">
          {onViewModeChange && (
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-center justify-end">
              <div className="inline-flex items-center gap-1 p-1 bg-black/5 rounded-2xl border border-black/5 shadow-inner">
                <button
                  onClick={() => onViewModeChange('reel')}
                  aria-label="Reel view"
                  title="Reel view"
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    viewMode === 'reel'
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#111111]/60 hover:text-black'
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="7" width="16" height="10" rx="2" />
                    <path d="M6 3h12" />
                    <path d="M6 21h12" />
                  </svg>
                </button>

                <button
                  onClick={() => onViewModeChange('grid')}
                  aria-label="All articles"
                  title="All articles"
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#111111]/60 hover:text-black'
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
                    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
                    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
                    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3-Column Split Container strictly aligned with 12-column Grid (4 cols each) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center relative my-auto">
          
          {/* ========================================================================= */}
          {/* COLUMN 1 (LEFT, Cols 1-4): Title & Category Tag                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 w-full h-auto lg:aspect-[472/247] flex flex-col justify-between order-2 lg:order-1 pt-4 lg:pt-0 z-30">
            
            {/* Balanced Title (Up to 3 lines, top-aligned with card) */}
            <div className="min-h-[96px] lg:min-h-[140px] flex items-start overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h1
                  key={currentPost.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-medium text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] leading-[1.18] tracking-[-0.025em] text-[#111111] line-clamp-3"
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

            {/* Category Tag in Accent Green */}
            <div className="pt-3 lg:pt-0 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentPost.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(currentPost.category)
                      }
                    }}
                    className="text-accent-green font-medium text-[14px] sm:text-[15px] tracking-[-0.01em] hover:opacity-80 transition-opacity text-left cursor-pointer inline-block"
                    title={`Filter by ${currentPost.category}`}
                  >
                    {currentPost.category}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2 (CENTER, Cols 5-8): Flat Smooth Vertical Reel Cards              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 w-full flex items-center justify-center relative order-1 lg:order-2 my-6 lg:my-0">
            <div className="relative w-full aspect-[472/247] flex items-center justify-center">
              <motion.div
                style={{ y: trackY }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                {posts.map((post, idx) => (
                  <ReelCardItem
                    key={post.slug}
                    post={post}
                    index={idx}
                    activeIndex={activeIndex}
                    smoothIndex={smoothIndex}
                    onSelectIndex={scrollToIndex}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3 (RIGHT, Cols 9-12): Excerpt & Read Article with Arrow            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 w-full h-auto lg:aspect-[472/247] flex flex-col justify-between order-3 pt-4 lg:pt-0 z-30">
            
            {/* Excerpt */}
            <div className="min-h-[96px] lg:min-h-[140px] flex items-start overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={currentPost.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-[14px] sm:text-[15px] xl:text-[15.5px] text-[#111111]/70 font-normal leading-[1.6] line-clamp-4"
                >
                  {currentPost.excerpt}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Action Row: "Read article ->" & Read Time */}
            <div className="flex items-center justify-between pt-4 border-t border-black/10 lg:border-t-0 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentPost.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex items-center justify-between"
                >
                  <Link
                    href={`/blog/${currentPost.slug}`}
                    className="group inline-flex items-center gap-1.5 text-accent-green font-semibold text-[14px] sm:text-[15px] underline decoration-accent-green underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>Read article</span>
                    <IconArrowRight
                      size={16}
                      stroke={2.2}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>

                  <span className="text-accent-green font-normal text-[13px] sm:text-[14px]">
                    {currentPost.readTime}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Bottom spacer for vertical balance */}
        <div className="w-full h-6 opacity-0 pointer-events-none" />
      </div>
    </section>
  )
}
