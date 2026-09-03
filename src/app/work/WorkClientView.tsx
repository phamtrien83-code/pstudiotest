'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Project,
  WORK_CATEGORIES,
  ANIMATION_STYLES,
} from '@/data/projects'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'

interface WorkClientViewProps {
  projects: Project[]
}

export default function WorkClientView({ projects }: WorkClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter(
      (p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.industry.toLowerCase().includes(selectedCategory.toLowerCase())
    )
  }, [projects, selectedCategory])

  return (
    <main className="min-h-screen bg-background text-studio-dark selection:bg-accent-green selection:text-black flex flex-col">
      <Navbar />

      {/* ========================================================================= */}
      {/* SHOWCASE HERO SECTION                                                     */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-10 sm:pt-14 pb-8 sm:pb-12 px-[24px] overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 20%, rgba(32, 211, 142, 0.08) 0%, rgba(249, 249, 249, 0) 70%)',
          }}
        />

        {/* Decorative rotating star */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-8 right-[8vw] pointer-events-none opacity-40 hidden md:block"
        >
          <img
            src="/image/star.svg"
            alt="Star decoration"
            className="w-12 h-12 object-contain"
            draggable={false}
          />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/5 text-xs sm:text-[13px] font-sans text-studio-gray mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-studio-dark">
              Portfolio &amp; Case Studies
            </span>
            <span className="text-black/20">•</span>
            <span>200+ Videos Shipped</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[36px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.08] tracking-[-0.035em] text-studio-dark max-w-4xl"
          >
            Work that clarifies the complex and{' '}
            <span className="relative inline-block text-black">
              moves the needle
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 bottom-1 w-full h-[6px] bg-accent-green/60 -z-10 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[17px] sm:text-[20px] text-studio-gray font-sans max-w-2xl leading-relaxed"
          >
            Explore animated explainer videos, product demos, and brand stories built
            for SaaS, Tech, Healthcare, and Industrial pioneers worldwide.
          </motion.p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FILTER TABS                                                               */}
      {/* ========================================================================= */}
      <section className="sticky top-[76px] sm:top-[84px] z-40 bg-background/85 backdrop-blur-md py-3 sm:py-4 px-[24px] border-b border-black/5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 py-1">
          {WORK_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[14px] font-sans font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-studio-gray hover:text-studio-dark hover:bg-black/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkCategory"
                    className="absolute inset-0 bg-studio-dark rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECTS GRID                                                             */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Link href={`/work/${project.slug}`} className="flex flex-col h-full">
                    {/* Poster Artwork Box with 16:9 Aspect Ratio */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Video Play Badge Overlay */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-14 h-14 rounded-full bg-accent-green text-black flex items-center justify-center shadow-lg shadow-accent-green/30 group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-6 h-6 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-black/70 backdrop-blur-md text-white">
                          {project.client}
                        </span>
                        {project.featured && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-accent-green text-black">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Video Type Pill */}
                      <div className="absolute bottom-3 right-3 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/90 backdrop-blur-md text-studio-dark shadow-sm">
                          {project.videoType}
                        </span>
                      </div>
                    </div>

                    {/* Card Meta Content */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-sans text-studio-gray mb-2">
                          <span className="font-medium text-accent-forest">
                            {project.category}
                          </span>
                          <span>{project.year}</span>
                        </div>

                        <h2 className="font-display font-medium text-[22px] sm:text-[24px] text-studio-dark group-hover:text-black leading-snug">
                          {project.title}
                        </h2>

                        <p className="mt-2.5 text-[14px] text-studio-gray line-clamp-2 leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[13px] font-semibold text-studio-dark group-hover:text-accent-forest transition-colors">
                        <span>View Case Study</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ANIMATION STYLES SHOWCASE SECTION                                         */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#111111] text-white py-20 px-[24px] relative overflow-hidden">
        {/* Subtle decorative glow in dark mode */}
        <div
          className="absolute -top-[20%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
          style={{ background: '#20D38E' }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-accent-green text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Diverse Capabilities</span>
              </div>
              <h2 className="font-display font-medium text-[32px] sm:text-[44px] md:text-[52px] leading-tight tracking-tight text-white">
                Animation Styles We Master
              </h2>
            </div>
            <p className="font-sans text-[16px] text-white/60 max-w-md leading-relaxed">
              Every business challenge requires a distinct visual treatment. We match
              your brand with the ideal aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANIMATION_STYLES.map((style) => (
              <div
                key={style.id}
                className="group relative bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden p-6 hover:border-accent-green/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-black/30">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>

                <div>
                  <h3 className="font-display font-medium text-[20px] sm:text-[22px] text-white mb-1.5 group-hover:text-accent-green transition-colors">
                    {style.name}
                  </h3>
                  <p className="font-sans text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">
                    {style.tagline}
                  </p>
                  <p className="font-sans text-[14px] text-white/70 leading-relaxed">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Callout CTA Footer */}
      <CalloutFooter />
    </main>
  )
}
