'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import TicketButton from './ui/TicketButton'
import { IconArrowRight } from '@tabler/icons-react'

export default function SelectedWork() {
  // Sync with data/projects: take the 4 most recent / featured projects
  const recentProjects = PROJECTS.slice(0, 4)
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null)

  return (
    <section id="work" className="relative w-full bg-[#FFFFFF] border-t border-black/5 z-20 py-16 sm:py-24 px-[24px]">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/5 text-xs sm:text-[13px] font-sans text-studio-gray mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-studio-dark">
              Featured Case Studies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.05] tracking-[-0.035em] text-[#111827]"
          >
            Selected Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-sans text-[16px] sm:text-[18px] text-studio-gray max-w-xl leading-relaxed"
          >
            High-impact strategic animated videos engineered for SaaS, tech leaders, and high-growth brands.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 4 RECENT WORKS GRID                                                       */}
        {/* ========================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {recentProjects.map((project, index) => {
            const isHovered = hoveredSlug === project.slug
            const isAnotherHovered = hoveredSlug !== null && !isHovered

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className={`flex flex-col h-full transition-all duration-500 ease-out will-change-transform ${
                  isAnotherHovered
                    ? 'opacity-65 blur-[1px] scale-[0.99]'
                    : isHovered
                    ? 'opacity-100 blur-0 scale-[1.01]'
                    : 'opacity-100 blur-0 scale-100'
                }`}
              >
              <Link
                href={`/work/${project.slug}`}
                data-cursor="project"
                data-cursor-text="View"
                className="group block bg-white rounded-2xl sm:rounded-3xl border border-black/5 overflow-hidden transition-all duration-500 flex flex-col h-full cursor-none shadow-sm"
              >
                {/* Thumbnail & Video Preview Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Rich Dark Dim Overlay when another project is hovered */}
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none z-10 ${
                      isAnotherHovered ? 'opacity-100' : 'opacity-0'
                    }`}
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
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-sans text-studio-gray mb-2.5">
                      <span className="font-medium text-accent-forest">
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display font-medium text-[22px] sm:text-[26px] text-studio-dark group-hover:text-black leading-snug tracking-[-0.02em]">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-[14px] text-studio-gray line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[13px] font-semibold text-studio-dark group-hover:text-accent-forest transition-colors">
                    <span>View Case Study</span>
                    <IconArrowRight
                      size={16}
                      stroke={2.2}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          )
        })}
        </div>

        {/* ========================================================================= */}
        {/* EXPLORE ALL WORKS BUTTON                                                  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center pt-12 sm:pt-16 pb-4"
        >
          <TicketButton href="/work" variant="dark" size="lg">
            Explore all 200+ projects
          </TicketButton>
        </motion.div>

        {/* ========================================================================= */}
        {/* METRICS SHOWCASE SECTION                                                  */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col pt-12 sm:pt-16 mt-8 sm:mt-12 border-t border-black/5">
          <div className="w-full mb-6 sm:mb-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="font-sans text-[15px] sm:text-[17px] text-gray-500 font-normal tracking-tight text-center"
            >
              We&apos;ve helped them achieve
            </motion.p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-center">
            {/* Metric 1: Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                12+
              </span>
              <span className="font-display font-medium text-[20px] sm:text-[24px] lg:text-[28px] leading-tight tracking-[-0.025em] text-[#111827]">
                Partners
              </span>
            </motion.div>

            {/* Metric 2: Views */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                1M
              </span>
              <span className="font-display font-medium text-[20px] sm:text-[24px] lg:text-[28px] leading-tight tracking-[-0.025em] text-[#111827]">
                Views
              </span>
            </motion.div>

            {/* Metric 3: Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                100K
              </span>
              <span className="font-display font-medium text-[20px] sm:text-[24px] lg:text-[28px] leading-tight tracking-[-0.025em] text-[#111827]">
                Interactions
              </span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
