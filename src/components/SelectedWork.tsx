'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Vector Mezmo Telemetry Pipeline Artwork matching Figma Node 33:49 (Clean Rectangular Flush Edges 4:5 Aspect Ratio, No Shadow, No Border)
function MezmoArtwork() {
  return (
    <div className="relative w-full aspect-[4/5] bg-[#050E07] rounded-none overflow-hidden flex items-center justify-center">
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
          backgroundSize: '100% 32px'
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
              <path d="M8 50 v18 c0 13 19 24 42 24 s42 -11 42 -24 v-18 Z" fill="#5EEAD4" stroke="#111827" strokeWidth="3" />
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

export default function SelectedWork() {
  return (
    <section id="work" className="relative w-full bg-[#FFFFFF] border-t border-black/5 z-20">
      
      {/* ========================================================================= */}
      {/* PHẦN 1: TITLE "SELECTED WORKS" (Full Width - 12 Columns Grid Alignment)   */}
      {/* ========================================================================= */}
      <div className="w-full pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 px-[24px]">
        <div className="w-full grid grid-cols-12 gap-[24px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 font-display font-medium text-[38px] sm:text-[48px] lg:text-[60px] xl:text-[68px] leading-[1.05] tracking-[-0.035em] text-[#111827] text-center"
          >
            Selected Works
          </motion.h2>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GROUP (PHẦN 2 + PHẦN 3): FIT SCREEN & FULL WIDTH 12-COLUMN GRID ALIGNMENT  */}
      {/* ========================================================================= */}
      <div className="w-full min-h-[calc(100vh-80px)] lg:min-h-screen flex flex-col justify-between py-6 sm:py-8 lg:py-12 px-[24px]">
        
        {/* ----------------------------------------------------------------------- */}
        {/* PHẦN 2: TÊN PROJECT + HÌNH (Cols 1-6 Left / Cols 7-12 Right) - TOP ALIGNED */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start flex-1 my-auto pt-2 lg:pt-4">
          
          {/* Left Column: Project Info (Columns 1 to 6, Top-Aligned) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start justify-start"
          >
            <div className="w-full max-w-[560px]">
              <h3 className="font-display font-medium text-[36px] sm:text-[44px] lg:text-[52px] xl:text-[60px] leading-[1.08] tracking-[-0.035em] text-[#111827] mb-4 sm:mb-5">
                Mezmo<br />Telemetry<br />Pipeline
              </h3>

              <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-gray-700 font-normal leading-relaxed tracking-[-0.01em] mb-6 sm:mb-8">
                We&apos;ve solved the problem of turning Mezmo&apos;s complex data pipeline observability into a clear and compelling product story for SaaS buyers.
              </p>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#20D38E] text-[#0D382A] font-display font-medium text-[16px] rounded-lg shadow-sm hover:brightness-105 active:scale-95 transition-all duration-200"
              >
                Visit project
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Project Image / Visual Artwork (Columns 7 to 12, Top-Aligned) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full flex items-start justify-center lg:justify-end"
          >
            <MezmoArtwork />
          </motion.div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHẦN 3: PHẦN SỐ LIỆU (12 Columns Grid Alignment: 3 Metrics x 4 Cols)   */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-full flex flex-col pt-6 sm:pt-8 mt-auto border-t border-black/5">
          
          <div className="w-full grid grid-cols-12 gap-[24px] mb-6 sm:mb-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="col-span-12 font-sans text-[15px] sm:text-[17px] lg:text-[18px] text-gray-500 font-normal tracking-tight text-center"
            >
              We&apos;ve helped them achieved
            </motion.p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-[24px] items-center">
            
            {/* Metric 1: Partners (Cols 1 to 4) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                12+
              </span>
              <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] leading-tight tracking-[-0.025em] text-[#111827]">
                Partner
              </span>
            </motion.div>

            {/* Metric 2: Views (Cols 5 to 8) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                1M
              </span>
              <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] leading-tight tracking-[-0.025em] text-[#111827]">
                Views
              </span>
            </motion.div>

            {/* Metric 3: Interactions (Cols 9 to 12) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-center text-center"
            >
              <span className="font-display font-medium text-[40px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-none tracking-[-0.03em] text-[#111827] mb-1.5">
                100K
              </span>
              <span className="font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[38px] leading-tight tracking-[-0.025em] text-[#111827]">
                Interactions
              </span>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  )
}
