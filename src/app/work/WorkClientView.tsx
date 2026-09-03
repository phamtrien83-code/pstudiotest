'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, ANIMATION_STYLES } from '@/data/projects'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'

interface WorkClientViewProps {
  projects: Project[]
}

export default function WorkClientView({ projects }: WorkClientViewProps) {
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background text-studio-dark selection:bg-accent-green selection:text-black flex flex-col">
      <Navbar />

      {/* ========================================================================= */}
      {/* SHOWCASE HERO SECTION                                                     */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-16 sm:pt-20 pb-10 sm:pb-14 px-[24px] overflow-hidden">
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
          {/* Main Display Headline with Stylized SVG Underline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] leading-[1.06] tracking-[-0.035em] text-studio-dark max-w-4xl"
          >
            Work that clarifies the complex and{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-black">moves the needle</span>
              <motion.svg
                viewBox="0 0 700 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 sm:-bottom-3.5 left-0 w-full h-auto pointer-events-none select-none z-0 origin-left"
              >
                <path
                  d="M 588.40 7.57 C 590.97 7.10 594.49 6.45 599.26 7.41 C 600.47 7.65 601.24 7.98 601.92 8.27 C 602.59 8.56 603.19 8.82 604.09 8.94 C 605.10 9.07 606.32 9.01 607.63 8.95 C 609.47 8.87 611.53 8.77 613.56 9.17 C 613.70 9.19 613.85 9.22 614.01 9.25 C 615.48 9.54 617.66 9.97 619.78 10.63 C 626.22 11.38 632.81 12.19 639.26 13.04 C 649.97 14.45 660.91 16.01 671.63 17.68 C 676.92 18.51 681.85 19.80 685.39 21.32 C 688.94 22.84 690.80 24.50 690.61 25.86 C 690.41 27.23 688.17 28.24 684.37 28.87 C 680.57 29.49 675.52 29.67 670.26 29.38 C 661.75 28.91 653.28 28.50 644.69 28.14 C 644.24 28.12 643.80 28.10 643.35 28.08 C 640.06 27.93 636.95 27.99 633.84 28.06 C 633.13 28.08 632.42 28.10 631.70 28.11 C 626.23 28.22 615.84 27.05 610.12 26.43 C 610.01 26.42 609.91 26.41 609.80 26.40 C 608.44 26.24 607.15 26.11 605.64 25.99 C 602.02 25.68 597.18 25.26 587.05 24.16 C 584.10 24.01 581.14 23.86 578.17 23.70 C 546.29 22.04 514.40 20.47 482.49 19.34 C 482.09 19.33 481.68 19.31 481.26 19.30 C 473.27 19.14 463.36 19.04 457.11 18.69 C 449.17 18.23 443.78 17.86 439.35 17.51 C 414.00 16.64 388.72 16.14 363.39 16.17 C 355.51 16.14 347.50 16.18 339.61 16.27 C 332.38 16.32 324.99 16.42 317.74 16.54 C 313.52 16.73 309.52 16.92 305.77 17.10 C 300.51 17.43 295.85 17.72 292.01 17.88 C 282.76 18.22 272.07 18.29 264.30 18.29 C 263.01 18.28 261.78 18.28 260.66 18.27 C 254.40 18.47 248.19 18.68 242.04 18.91 C 241.62 18.86 241.19 18.82 240.75 18.77 C 235.31 18.22 228.76 18.43 218.57 18.85 C 214.05 19.03 208.84 19.26 202.78 19.46 C 198.88 19.57 196.83 19.37 195.13 19.18 C 194.63 19.13 194.16 19.08 193.69 19.05 C 192.07 18.94 190.39 19.17 188.42 19.45 C 185.87 19.82 182.82 20.30 178.78 20.14 C 165.70 19.74 160.07 20.70 155.82 21.41 C 154.54 21.63 153.37 21.82 152.17 21.95 C 148.30 22.39 142.84 22.45 138.74 22.31 C 135.53 22.18 128.77 22.84 123.89 23.36 C 122.02 23.57 119.51 23.70 116.54 23.89 C 113.36 24.08 109.72 24.34 105.89 24.73 C 96.38 25.68 90.96 26.24 86.89 26.63 C 85.71 26.74 84.62 26.83 83.54 26.93 C 80.22 27.23 75.67 27.61 71.34 27.97 C 66.16 28.43 60.88 28.90 56.79 29.30 C 46.39 29.87 35.94 30.43 25.26 31.06 C 19.95 31.28 14.70 31.09 10.82 30.34 C 6.97 29.60 4.86 28.32 4.79 26.93 C 4.73 25.54 6.64 24.04 10.37 22.66 C 14.15 21.27 19.38 20.16 24.70 19.59 C 35.73 18.52 46.46 17.58 57.26 16.74 C 70.56 15.65 83.61 14.65 97.07 13.80 C 106.14 13.21 115.75 12.63 124.84 12.13 C 125.79 12.07 126.75 12.02 127.71 11.96 C 135.58 11.16 143.15 10.45 148.67 10.09 C 153.20 9.80 156.61 9.83 159.39 9.87 C 161.32 9.91 163.04 9.94 164.79 9.88 C 165.72 9.84 167.00 9.77 168.54 9.68 C 174.93 9.32 185.42 8.70 195.32 8.61 C 199.76 8.57 204.65 8.65 209.50 8.73 C 216.41 8.87 222.90 9.00 226.11 8.83 C 231.76 8.44 238.35 8.40 244.15 8.41 C 249.60 8.43 254.41 8.43 257.17 8.16 C 260.44 7.82 263.29 7.86 267.44 7.91 C 270.30 7.94 273.82 7.93 278.62 7.89 C 284.15 7.80 288.14 7.89 291.46 7.96 C 296.13 8.04 299.66 8.14 304.93 7.81 C 310.78 7.42 316.89 7.15 321.68 7.19 C 323.87 7.21 326.37 7.17 328.98 7.13 C 332.42 7.07 336.09 7.01 339.39 7.11 C 342.11 7.20 344.38 7.46 346.39 7.71 C 347.02 7.79 347.62 7.86 348.20 7.93 C 350.38 7.92 352.55 7.91 354.73 7.89 C 355.08 7.84 355.45 7.79 355.83 7.74 C 357.77 7.50 360.15 7.22 363.09 7.06 C 367.72 6.81 371.83 6.96 376.17 7.10 C 379.54 7.21 383.07 7.33 387.09 7.30 C 389.82 7.29 392.93 7.19 396.02 7.09 C 400.60 6.94 405.13 6.79 408.30 6.93 C 409.48 6.99 410.50 7.19 411.51 7.38 C 411.52 7.38 411.52 7.39 411.53 7.39 C 411.59 7.40 411.66 7.42 411.73 7.43 C 419.39 7.40 427.08 7.37 434.78 7.36 C 435.44 7.33 436.11 7.30 436.78 7.27 C 440.03 7.12 443.20 6.97 445.29 6.78 C 447.53 6.55 453.15 6.56 459.08 6.56 C 462.96 6.53 466.97 6.49 470.25 6.44 C 472.16 6.39 473.97 6.61 475.83 6.83 C 477.56 7.04 479.35 7.25 481.30 7.27 C 482.28 7.28 483.33 7.23 484.47 7.17 C 485.46 7.13 486.51 7.08 487.61 7.07 C 488.63 7.06 490.91 7.16 493.83 7.25 C 495.64 7.31 497.69 7.38 499.85 7.44 C 505.54 7.55 511.23 7.67 516.94 7.82 C 518.13 7.78 519.16 7.69 519.98 7.55 C 520.57 7.45 521.08 7.31 521.60 7.18 C 522.31 6.98 523.04 6.77 524.04 6.64 C 524.82 6.55 525.74 6.57 526.35 6.71 C 526.63 6.77 526.85 6.87 527.05 6.96 C 527.27 7.06 527.48 7.14 527.73 7.16 C 527.91 7.17 528.10 7.14 528.33 7.09 C 528.70 7.02 529.18 6.92 529.90 6.96 C 532.61 7.07 535.68 7.25 538.72 7.43 C 542.09 7.62 545.38 7.81 547.99 7.87 C 550.92 7.93 555.07 8.28 559.23 8.65 C 562.15 8.91 565.09 9.17 567.60 9.35 C 570.07 9.53 572.63 9.54 575.11 9.55 C 578.08 9.56 580.93 9.56 583.33 9.84 C 583.82 9.90 584.41 10.15 585.16 10.46 C 585.70 10.68 586.31 10.93 587.01 11.16 C 590.10 11.39 593.20 11.64 596.29 11.90 C 596.40 11.89 596.51 11.87 596.63 11.85 C 596.63 11.85 596.65 11.85 596.67 11.85 Z"
                  fill="#20D38E"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 md:mt-14 text-[17px] sm:text-[20px] text-studio-gray font-sans max-w-2xl leading-relaxed"
          >
            Explore animated explainer videos, product demos, and brand stories built
            for SaaS, Tech, Healthcare, and Industrial pioneers worldwide.
          </motion.p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECTS GRID (Personaal Studio /recent Editorial 4-Column Layout)         */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14 sm:gap-y-18 lg:gap-y-20"
            >
              {projects.map((project, index) => {
                const isHovered = hoveredSlug === project.slug
                const isAnotherHovered = hoveredSlug !== null && !isHovered

                return (
                  <motion.article
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: index * 0.025 }}
                    onMouseEnter={() => setHoveredSlug(project.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className={`group relative flex flex-col transition-all duration-500 ease-out will-change-transform ${
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
                    className="flex flex-col group cursor-none"
                  >
                    {/* Poster Artwork Box: Aspect ~3:4 Portrait, Seamless & Borderless */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5 cursor-none">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />

                      {/* Rich Dark Dim Overlay when another project is hovered */}
                      <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none ${
                          isAnotherHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                        {/* Minimalist Floating Client Pill */}
                        <div className="absolute top-3.5 left-3.5 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-black/50 backdrop-blur-md text-white">
                            {project.client}
                          </span>
                        </div>

                        {/* Video Type Tag on bottom-right */}
                        <div className="absolute bottom-3.5 right-3.5 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium bg-white/90 backdrop-blur-md text-studio-dark shadow-sm">
                            {project.videoType}
                          </span>
                        </div>
                      </div>

                      {/* Metadata Directly Below Image (Personaal Studio Style) */}
                      <div className="mt-4 flex flex-col gap-1">
                        <h2 className="font-display font-medium text-[20px] sm:text-[22px] text-studio-dark group-hover:text-black leading-snug tracking-[-0.015em] line-clamp-1">
                          {project.title}
                        </h2>
                        <p className="font-sans text-[14px] text-studio-gray font-normal leading-normal">
                          {project.category} &bull; {project.year}
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
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
