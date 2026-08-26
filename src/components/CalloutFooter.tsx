'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Double brush underline beneath CTA heading
function BrushUnderline() {
  return (
    <div className="relative w-full max-w-[620px] sm:max-w-[720px] h-12 sm:h-16 mx-auto -mt-2 sm:-mt-4 mb-8 sm:mb-12 pointer-events-none select-none">
      <svg
        viewBox="0 0 700 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Upper Brush Stroke */}
        <path
          d="M10 25 C180 15, 420 12, 680 28 C550 32, 340 34, 10 25 Z"
          fill="#20D38E"
        />
        {/* Lower Sweeping Brush Stroke */}
        <path
          d="M160 52 C320 42, 540 44, 690 56 C580 62, 380 64, 160 52 Z"
          fill="#20D38E"
        />
      </svg>
    </div>
  )
}

// Interactive Giant Eyes that track mouse movement
function InteractiveEyes() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Motion values for smooth pupil tracking
  const mouseX = useMotionValue(20) // default looking slightly right
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 180 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 180 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      // Calculate normalized vector from eye center to mouse
      const deltaX = e.clientX - eyeCenterX
      const deltaY = e.clientY - eyeCenterY
      const distance = Math.hypot(deltaX, deltaY) || 1

      // Max pupil offset in pixels
      const maxOffset = 28
      const factor = Math.min(distance / 250, 1) * maxOffset

      const offsetX = (deltaX / distance) * factor
      const offsetY = (deltaY / distance) * factor

      mouseX.set(offsetX)
      mouseY.set(offsetY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center gap-2 sm:gap-4 select-none mb-12 sm:mb-16 lg:mb-20"
    >
      {/* Left Eye */}
      <div className="relative w-[130px] h-[180px] sm:w-[190px] sm:h-[260px] lg:w-[230px] lg:h-[310px] bg-white rounded-[50%] flex items-center justify-center shadow-lg overflow-hidden">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="w-[48px] h-[72px] sm:w-[68px] sm:h-[102px] lg:w-[80px] lg:h-[120px] bg-[#111827] rounded-[50%]"
        />
      </div>

      {/* Right Eye */}
      <div className="relative w-[130px] h-[180px] sm:w-[190px] sm:h-[260px] lg:w-[230px] lg:h-[310px] bg-white rounded-[50%] flex items-center justify-center shadow-lg overflow-hidden">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="w-[48px] h-[72px] sm:w-[68px] sm:h-[102px] lg:w-[80px] lg:h-[120px] bg-[#111827] rounded-[50%]"
        />
      </div>
    </div>
  )
}

// Giant White P + Orange Star Vector
function GiantPLogo() {
  return (
    <div className="relative w-[160px] sm:w-[220px] lg:w-[280px] aspect-[260/340] select-none pointer-events-none">
      <svg
        viewBox="0 0 280 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Giant White "P" Stem & Loop */}
        <path
          d="M48 20 C130 20, 200 65, 200 145 C200 220, 130 260, 48 260 H48 V340 H0 V20 H48 Z M48 70 V210 C98 210, 148 185, 148 140 C148 95, 98 70, 48 70 Z"
          fill="#FFFFFF"
        />
        {/* 4-Point Sparkle Star in Vivid Orange */}
        <path
          d="M175 295 C175 255, 145 225, 105 225 C145 225, 175 195, 175 155 C175 195, 205 225, 245 225 C205 225, 175 255, 175 295 Z"
          fill="#FF723B"
        />
      </svg>
    </div>
  )
}

// 4-Point Star bullet icon
function StarBullet() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111827] flex-shrink-0"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  )
}

export default function CalloutFooter() {
  return (
    <footer className="relative w-full bg-[#FFFFFF] pt-24 sm:pt-32 lg:pt-40 flex flex-col z-20 overflow-hidden">
      
      {/* 1. TOP CALL TO ACTION SECTION (White Background) */}
      <div className="w-full max-w-[1512px] mx-auto px-[24px] flex flex-col items-center text-center pb-24 sm:pb-32 lg:pb-36">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-[44px] sm:text-[64px] lg:text-[84px] xl:text-[96px] leading-[1.02] tracking-[-0.04em] text-[#111827] max-w-[960px] mx-auto"
        >
          Ready to make<br />your product<br />easier to buy?
        </motion.h2>

        <BrushUnderline />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-4.5 bg-[#20D38E] text-[#0D382A] font-display font-medium text-[20px] sm:text-[22px] rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all duration-200"
          >
            Say Hello
          </Link>
        </motion.div>

      </div>

      {/* 2. GIANT GREEN DOME CHARACTER & FOOTER CONTENT */}
      <div className="relative w-full bg-[#20D38E] rounded-t-[100px] sm:rounded-t-[180px] md:rounded-t-[260px] lg:rounded-t-[380px] pt-16 sm:pt-24 lg:pt-32 pb-10 sm:pb-14 px-[24px] flex flex-col items-center">
        
        {/* Interactive Character Eyes */}
        <InteractiveEyes />

        {/* Main Footer Links Grid (12-Column Grid) */}
        <div className="w-full max-w-[1512px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-end pt-8 lg:pt-16 pb-16 lg:pb-24">
          
          {/* Col 1 to 5: Giant P+ Logo */}
          <div className="lg:col-span-5 lg:col-start-1 flex items-end justify-start mb-10 lg:mb-0">
            <GiantPLogo />
          </div>

          {/* Col 6 to 12: 3 Navigation & Info Columns */}
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 items-start">
            
            {/* Column 1: Page Navigation */}
            <div className="flex flex-col space-y-4">
              <Link href="#work" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>Work</span>
              </Link>
              <Link href="#about" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>About</span>
              </Link>
              <Link href="#service" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>Service</span>
              </Link>
              <Link href="#contact" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>Contact</span>
              </Link>
            </div>

            {/* Column 2: Social Networks */}
            <div className="flex flex-col space-y-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>LinkedIn</span>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>Behance</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors">
                <StarBullet />
                <span>Facebook</span>
              </a>
            </div>

            {/* Column 3: Contact Details */}
            <div className="flex flex-col space-y-4 font-sans text-[15px] sm:text-[16px] text-[#111827] font-medium">
              <a href="mailto:contact@pstudio.vn" className="hover:text-white transition-colors">
                E: contact@pstudio.vn
              </a>
              <p>
                A: HCMC, Vietnam
              </p>
              <a href="tel:+84982198220" className="hover:text-white transition-colors">
                P: +84 982 198 220
              </a>
            </div>

          </div>

        </div>

        {/* 3. BOTTOM LEGAL BAR */}
        <div className="w-full max-w-[1512px] mx-auto pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#0D382A] font-sans">
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center sm:justify-start">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <button className="hover:text-white transition-colors focus:outline-none">
              Cookies Setting
            </button>
          </div>

          <p className="text-center sm:text-right text-[#0D382A]/80">
            © {new Date().getFullYear()} PStudio. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  )
}
