'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Process() {
  return (
    <section id="process" className="relative w-full bg-[#20D38E] pt-20 sm:pt-28 lg:pt-32 pb-0 px-4 sm:px-6 overflow-hidden z-20">
      <div className="max-w-[1464px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-[720px] mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="font-display font-medium text-[44px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[1.05] tracking-[-0.035em] text-[#111827] mb-5">
            Process
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] lg:text-[18px] text-[#0A3D2A] font-normal leading-relaxed tracking-[-0.01em] max-w-[580px] mx-auto px-4">
            We transform intricate products into straightforward, engaging explainer videos, respecting the process to bring ideas to life.
          </p>
        </motion.div>

        {/* 3 Arches Triptych Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-6 items-end">
          
          {/* Arch 1 (Left Window) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[236px] aspect-[472/760] w-full bg-[#0D382A] shadow-2xl"
          >
            {/* Cut-out / Inner Depth Shadow */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] ring-1 ring-black/10 shadow-[inset_0_12px_24px_rgba(0,0,0,0.2)]" />
            
            {/* Left Portion of Illustration */}
            <img
              src="/image/image 428.png"
              alt="Process Step 1"
              className="w-full h-full object-cover object-left"
              draggable={false}
            />
          </motion.div>

          {/* Arch 2 (Center Window) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[236px] aspect-[472/760] w-full bg-[#0D382A] shadow-2xl"
          >
            {/* Cut-out / Inner Depth Shadow */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] ring-1 ring-black/10 shadow-[inset_0_12px_24px_rgba(0,0,0,0.2)]" />
            
            {/* Center Portion of Illustration */}
            <img
              src="/image/image 428.png"
              alt="Process Step 2"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </motion.div>

          {/* Arch 3 (Right Window) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[236px] aspect-[472/760] w-full bg-[#0D382A] shadow-2xl"
          >
            {/* Cut-out / Inner Depth Shadow */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] ring-1 ring-black/10 shadow-[inset_0_12px_24px_rgba(0,0,0,0.2)]" />
            
            {/* Right Portion of Illustration */}
            <img
              src="/image/image 428.png"
              alt="Process Step 3"
              className="w-full h-full object-cover object-right"
              draggable={false}
            />
          </motion.div>

        </div>

      </div>
    </section>
  )
}
