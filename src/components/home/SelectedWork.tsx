'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

// Vector Mezmo Telemetry Pipeline Artwork matching original design (Clean 4:3 Aspect Ratio)
function MezmoArtwork() {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#050E07] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center shadow-sm">
      {/* Top & Bottom Neon Yellow Accents */}
      <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 flex items-start justify-center">
        <div className="w-[85%] h-full bg-[#E5FC6B] [clip-path:polygon(0_0,100%_0,85%_100%,15%_100%)] opacity-95" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 flex items-end justify-center">
        <div className="w-[85%] h-full bg-[#E5FC6B] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)] opacity-95" />
      </div>

      {/* Grid line background overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#E5FC6B 1px, transparent 1px)',
          backgroundSize: '100% 32px',
        }}
      />

      {/* Main Stadium Outer Loop Track */}
      <div className="relative w-[90%] h-[74%] rounded-[100px] sm:rounded-[130px] md:rounded-[160px] border-[8px] sm:border-[12px] md:border-[14px] border-[#E5FC6B] flex items-center justify-center p-2 sm:p-4 shadow-[0_0_40px_rgba(229,252,107,0.12)]">
        {/* Inner Circuit Track */}
        <div className="w-full h-full rounded-[85px] sm:rounded-[115px] md:rounded-[140px] border-2 border-[#E5FC6B]/40 relative flex items-center justify-center">
          {/* Circuit Connection Nodes */}
          <div className="absolute -top-2.5 left-[15%] w-2.5 h-2.5 rounded-full bg-[#E5FC6B] shadow-[0_0_8px_#E5FC6B]" />
          <div className="absolute -top-2.5 right-[15%] w-2.5 h-2.5 rounded-full bg-[#E5FC6B] shadow-[0_0_8px_#E5FC6B]" />
          <div className="absolute -bottom-2.5 left-[15%] w-2.5 h-2.5 rounded-full bg-[#E5FC6B] shadow-[0_0_8px_#E5FC6B]" />
          <div className="absolute -bottom-2.5 right-[15%] w-2.5 h-2.5 rounded-full bg-[#E5FC6B] shadow-[0_0_8px_#E5FC6B]" />
          <div className="absolute top-[25%] -left-2.5 w-2.5 h-2.5 rounded-full bg-[#E5FC6B]" />
          <div className="absolute top-[25%] -right-2.5 w-2.5 h-2.5 rounded-full bg-[#E5FC6B]" />
          <div className="absolute bottom-[25%] -left-2.5 w-2.5 h-2.5 rounded-full bg-[#E5FC6B]" />
          <div className="absolute bottom-[25%] -right-2.5 w-2.5 h-2.5 rounded-full bg-[#E5FC6B]" />

          {/* SVG Complex 3D Geometric Entities */}
          <svg viewBox="0 0 500 400" className="w-full h-full" fill="none">
            {/* 1. 3D Torus (Top Left) */}
            <g transform="translate(45, 75) rotate(-18)">
              <ellipse cx="50" cy="50" rx="42" ry="24" fill="#6EE7B7" stroke="#111827" strokeWidth="3" />
              <path
                d="M8 50 v18 c0 13 19 24 42 24 s42 -11 42 -24 v-18 Z"
                fill="#5EEAD4"
                stroke="#111827"
                strokeWidth="3"
              />
              <ellipse cx="50" cy="50" rx="22" ry="12" fill="#818CF8" stroke="#111827" strokeWidth="2.5" />
              <line x1="50" y1="38" x2="50" y2="62" stroke="#4338CA" strokeWidth="2" />
              <line x1="28" y1="50" x2="72" y2="50" stroke="#4338CA" strokeWidth="2" />
            </g>

            {/* Small glowing floating orb near torus */}
            <circle cx="110" cy="205" r="12" fill="#99F6E4" stroke="#111827" strokeWidth="2" />

            {/* 2. 3D Isometric Open Cube (Top Center-Right) */}
            <g transform="translate(190, 45) rotate(12)">
              <path d="M70 10 L130 45 L130 115 L70 80 Z" fill="#DDD6FE" stroke="#111827" strokeWidth="3.5" />
              <path d="M70 80 L130 115 L70 150 L10 115 Z" fill="#C4B5FD" stroke="#111827" strokeWidth="3.5" />
              <path d="M10 45 L70 10 L70 80 L10 115 Z" fill="#18181B" stroke="#111827" strokeWidth="3.5" />

              {/* Hollow Inner Cube Room with Cyan & Yellow Glow */}
              <path d="M35 55 L75 35 L75 85 L35 105 Z" fill="#FEF08A" stroke="#111827" strokeWidth="2" />
              <path d="M75 35 L105 52 L105 102 L75 85 Z" fill="#67E8F9" stroke="#111827" strokeWidth="2" />
              <path d="M35 105 L75 85 L105 102 L65 122 Z" fill="#A7F3D0" stroke="#111827" strokeWidth="2" />
            </g>

            {/* Floating Soft Purple Sphere behind Cube */}
            <circle cx="370" cy="165" r="24" fill="#E9D5FF" stroke="#111827" strokeWidth="2.5" />

            {/* 3. 3D Cone (Bottom Left) */}
            <g transform="translate(115, 175) rotate(-15)">
              <ellipse cx="60" cy="110" rx="55" ry="22" fill="#3B82F6" stroke="#111827" strokeWidth="3" />
              <path d="M60 5 L5 110 A55 22 0 0 0 115 110 Z" fill="#C4B5FD" stroke="#111827" strokeWidth="3" />
              <ellipse cx="60" cy="70" rx="36" ry="12" fill="none" stroke="#111827" strokeWidth="2.5" />
            </g>

            {/* 4. Wireframe Geodesic Sphere (Bottom Right) */}
            <g transform="translate(310, 195)">
              <circle cx="55" cy="55" r="50" fill="#E9D5FF" stroke="#111827" strokeWidth="3" />
              <path d="M5 55 A50 50 0 0 1 105 55 Z" fill="#A5F3FC" fillOpacity="0.8" stroke="#111827" strokeWidth="2" />
              <path d="M55 5 C75 25, 75 85, 55 105" stroke="#111827" strokeWidth="2.5" fill="none" />
              <path d="M55 5 C35 25, 35 85, 55 105" stroke="#111827" strokeWidth="2.5" fill="none" />
              <path d="M5 55 C25 75, 85 75, 105 55" stroke="#111827" strokeWidth="2.5" fill="none" />
              <path d="M5 55 C25 35, 85 35, 105 55" stroke="#111827" strokeWidth="2.5" fill="none" />
              <line x1="55" y1="5" x2="55" y2="105" stroke="#111827" strokeWidth="2.5" />
              <line x1="5" y1="55" x2="105" y2="55" stroke="#111827" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

interface FeaturedWorkItem {
  id: string
  titleLines: string[]
  client: string
  slug: string
  description: string
  artworkType: 'mezmo' | 'image'
  imageSrc?: string
  metrics: {
    stat1: { value: string; label: string }
    stat2: { value: string; label: string }
    stat3: { value: string; label: string }
  }
}

const FEATURED_WORKS: FeaturedWorkItem[] = [
  {
    id: 'mezmo',
    titleLines: ['Mezmo', 'Telemetry', 'Pipeline'],
    client: 'Mezmo',
    slug: 'mezmo-explainer-video-data-observability-saas-animation',
    description:
      "We've solved the problem of turning Mezmo's complex data pipeline observability into a clear and compelling product story for SaaS buyers.",
    artworkType: 'mezmo',
    metrics: {
      stat1: { value: '12+', label: 'Partner' },
      stat2: { value: '1M', label: 'Views' },
      stat3: { value: '100K', label: 'Interactions' },
    },
  },
  {
    id: 'amazon-earth',
    titleLines: ['Amazon', 'Earth Month', 'Campaign'],
    client: 'Amazon',
    slug: 'amazon-earth-month-campaign-video-e-commerce-animation',
    description:
      'An environmental awareness campaign video for Amazon to inspire sustainable habits and eco-friendly packaging across global shoppers.',
    artworkType: 'image',
    imageSrc:
      'https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/83b54ee2-9fac-4f56-ba4b-d95446222af3/9.png',
    metrics: {
      stat1: { value: '5M+', label: 'Views' },
      stat2: { value: '200M+', label: 'Reach' },
      stat3: { value: '98%', label: 'Positive Feedback' },
    },
  },
  {
    id: 'amazon-loss-prevention',
    titleLines: ['Amazon', 'Loss Prevention', 'Protocol'],
    client: 'Amazon',
    slug: 'amazon-activities-explainer-video-e-commerce',
    description:
      'Simplifying internal security processes, warehouse asset tracking, and critical operational protocols into crisp, engaging visual communication.',
    artworkType: 'image',
    imageSrc:
      'https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/5daec28b-b8bc-4aa1-ae45-88bf67d02857/4.png',
    metrics: {
      stat1: { value: '15+', label: 'Hubs' },
      stat2: { value: '100%', label: 'On-Brand' },
      stat3: { value: '40+', label: 'Deliverables' },
    },
  },
  {
    id: 'vulcanlabs',
    titleLines: ['Vulcanlabs', 'Engineering', 'Core Values'],
    client: 'Vulcanlabs',
    slug: 'vulcanlabs-core-values-brand-video',
    description:
      'Translating cutting-edge AI software engineering culture and core product values into an inspiring cinematic animation for prospective talent.',
    artworkType: 'image',
    imageSrc:
      'https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/c8eb9e13-a4a3-43c3-ae30-97b7b134d930/1.png',
    metrics: {
      stat1: { value: '3x', label: 'Applications' },
      stat2: { value: '2.4M', label: 'Impressions' },
      stat3: { value: '92%', label: 'Approval' },
    },
  },
]

export default function SelectedWork() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_WORKS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === FEATURED_WORKS.length - 1 ? 0 : prev + 1))
  }

  const currentWork = FEATURED_WORKS[currentIndex]

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="work" className="relative w-full bg-[#FFFFFF] border-t border-black/5 z-20 overflow-hidden">
      {/* ========================================================================= */}
      {/* PHẦN 1: TITLE "SELECTED WORKS" (Full Width - 12 Columns Grid Alignment)   */}
      {/* ========================================================================= */}
      <div className="w-full pt-12 sm:pt-16 lg:pt-20 2xl:pt-24 pb-4 sm:pb-6 px-[24px]">
        <div className="w-full grid grid-cols-12 gap-[24px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 font-display font-medium text-[38px] sm:text-[48px] lg:text-[60px] xl:text-[68px] 2xl:text-[80px] 3xl:text-[96px] leading-[1.05] tracking-[-0.035em] text-[#111827] text-center"
          >
            Selected Works
          </motion.h2>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GROUP (PHẦN 2 + PHẦN 3): FIT SCREEN & FULL WIDTH 12-COLUMN GRID ALIGNMENT  */}
      {/* ========================================================================= */}
      <div className="w-full min-h-[calc(100vh-80px)] lg:min-h-screen flex flex-col justify-between py-6 sm:py-8 lg:py-12 2xl:py-16 px-[24px]">
        {/* ----------------------------------------------------------------------- */}
        {/* PHẦN 2: TÊN PROJECT + HÌNH (Cols 1-6 Left / Cols 7-12 Right)           */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center flex-1 my-auto pt-2 lg:pt-4">
          {/* Left Column: Project Info (Columns 1 to 6) */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            <div className="w-full max-w-[700px] 2xl:max-w-[900px] 3xl:max-w-[1200px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentWork.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-start"
                >
                  {/* Multi-line Big Display Title */}
                  <h3 className="font-sans font-medium text-[36px] sm:text-[46px] lg:text-[54px] xl:text-[62px] 2xl:text-[74px] 3xl:text-[88px] leading-[1.08] tracking-[-0.035em] text-[#111827] mb-4 sm:mb-5 2xl:mb-8">
                    {currentWork.titleLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < currentWork.titleLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Project Description */}
                  <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] 2xl:text-[20px] 3xl:text-[24px] text-gray-700 font-normal leading-relaxed tracking-[-0.01em] mb-6 sm:mb-8 2xl:mb-10 max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
                    {currentWork.description}
                  </p>

                  {/* Action Row: Visit Project Button + Interactive Arrow Switchers */}
                  <div className="flex items-center gap-4 sm:gap-5 2xl:gap-7 flex-wrap">
                    <Link
                      href={`/work/${currentWork.slug}`}
                      className="inline-flex items-center justify-center px-7 py-3.5 2xl:px-9 2xl:py-4 bg-[#20D38E] text-[#0D382A] font-display font-medium text-[16px] 2xl:text-[18px] rounded-lg shadow-sm hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      Visit project
                    </Link>

                    {/* Arrow Switchers (Preserve Aesthetics) */}
                    <div className="flex items-center gap-2 bg-black/[0.03] p-1.5 2xl:p-2 rounded-full border border-black/5">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous project"
                        className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-13 2xl:h-13 rounded-full bg-white hover:bg-black/5 active:scale-90 border border-black/10 flex items-center justify-center transition-all cursor-pointer text-[#111827] shadow-sm"
                      >
                        <IconArrowLeft size={18} stroke={2.2} />
                      </button>

                      <span className="font-sans font-medium text-xs sm:text-[13px] 2xl:text-[15px] text-studio-gray px-2 tracking-wider select-none whitespace-nowrap">
                        0{currentIndex + 1} / 0{FEATURED_WORKS.length}
                      </span>

                      <button
                        onClick={handleNext}
                        aria-label="Next project"
                        className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-13 2xl:h-13 rounded-full bg-white hover:bg-black/5 active:scale-90 border border-black/10 flex items-center justify-center transition-all cursor-pointer text-[#111827] shadow-sm"
                      >
                        <IconArrowRight size={18} stroke={2.2} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Project Artwork (Columns 7 to 12) */}
          <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentWork.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  {currentWork.artworkType === 'mezmo' ? (
                    <MezmoArtwork />
                  ) : (
                    <div className="relative w-full aspect-[4/3] bg-[#050E07] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center shadow-sm">
                      <img
                        src={currentWork.imageSrc}
                        alt={currentWork.titleLines.join(' ')}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[11px] 2xl:text-[13px] font-sans font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                          {currentWork.client}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHẦN 3: PHẦN SỐ LIỆU (12 Columns Grid Alignment: 3 Metrics x 4 Cols)   */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-full flex flex-col pt-8 sm:pt-10 2xl:pt-14 mt-auto border-t border-black/5">
          <div className="w-full grid grid-cols-12 gap-[24px] mb-6 sm:mb-8 2xl:mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="col-span-12 font-sans text-[14px] sm:text-[15px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#111827] font-normal tracking-tight text-left"
            >
              We&apos;ve helped them achieved
            </motion.p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentWork.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-[24px] items-center"
            >
              {/* Metric 1 (Cols 1 to 4) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] 2xl:text-[80px] 3xl:text-[96px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5 2xl:mb-3">
                  {currentWork.metrics.stat1.value}
                </span>
                <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px] 3xl:text-[52px] leading-tight tracking-[-0.025em] text-[#111827]">
                  {currentWork.metrics.stat1.label}
                </span>
              </div>

              {/* Metric 2 (Cols 5 to 8) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] 2xl:text-[80px] 3xl:text-[96px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5 2xl:mb-3">
                  {currentWork.metrics.stat2.value}
                </span>
                <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px] 3xl:text-[52px] leading-tight tracking-[-0.025em] text-[#111827]">
                  {currentWork.metrics.stat2.label}
                </span>
              </div>

              {/* Metric 3 (Cols 9 to 12) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] 2xl:text-[80px] 3xl:text-[96px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5 2xl:mb-3">
                  {currentWork.metrics.stat3.value}
                </span>
                <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px] 3xl:text-[52px] leading-tight tracking-[-0.025em] text-[#111827]">
                  {currentWork.metrics.stat3.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
