'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Animated Hand-drawn Underline from /image/2 underline.svg beneath CTA heading
function BrushUnderline() {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.35,
      }}
      className="relative w-full max-w-[380px] sm:max-w-[540px] md:max-w-[660px] lg:max-w-[750px] aspect-[771/106] mx-auto mt-1 sm:mt-2 md:mt-2.5 lg:mt-3 pointer-events-none select-none flex items-center justify-center will-change-transform"
    >
      <img
        src="/image/2 underline.svg"
        alt="Underline Decoration"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
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

// Giant White P + Orange Star Vector from /image/logoIcon.svg
function GiantPLogo() {
  return (
    <div className="relative w-[180px] sm:w-[240px] lg:w-[290px] aspect-[427/552] select-none pointer-events-none">
      <img
        src="/image/logoIcon.svg"
        alt="PStudio Logo Icon"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  )
}

// 8-Point Star bullet icon from /image/star.svg
function StarBullet() {
  return (
    <img
      src="/image/star.svg"
      alt="Star bullet"
      className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain flex-shrink-0"
      draggable={false}
    />
  )
}

export default function CalloutFooter() {
  return (
    <footer className="relative w-full bg-[#FFFFFF] pt-20 sm:pt-28 lg:pt-36 flex flex-col z-20 overflow-hidden">
      
      {/* 1. TOP CALL TO ACTION SECTION (White Background) */}
      <div className="w-full max-w-[1200px] mx-auto px-[24px] flex flex-col items-center text-center pb-20 sm:pb-28 lg:pb-32">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-[44px] sm:text-[62px] md:text-[76px] lg:text-[88px] xl:text-[96px] leading-[1.05] tracking-[-0.035em] text-[#111827] max-w-[900px] mx-auto"
        >
          Ready to make<br />your product<br />easier to buy?
        </motion.h2>

        <BrushUnderline />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 md:mt-10"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#20D38E] text-[#0A3D2A] font-display font-medium text-[18px] sm:text-[19px] rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all duration-200"
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
              <a
                href="https://www.linkedin.com/company/pstudiovn/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors"
              >
                <StarBullet />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/pstudiovn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors"
              >
                <StarBullet />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.behance.net/pstudiovn?tracking_source=search_projects%7CPstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors"
              >
                <StarBullet />
                <span>Behance</span>
              </a>
              <a
                href="https://vimeo.com/pstudiovietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors"
              >
                <StarBullet />
                <span>Vimeo</span>
              </a>
              <a
                href="https://www.instagram.com/pstudiovn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display font-medium text-[17px] sm:text-[18px] text-[#111827] hover:text-white transition-colors"
              >
                <StarBullet />
                <span>Instagram</span>
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
