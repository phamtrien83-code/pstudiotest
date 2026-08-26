'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-90px)] flex flex-col items-center justify-start overflow-hidden pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-6 sm:px-10 lg:px-16">
      {/* Hero Background Illustration - Full Width Cover */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none select-none flex items-end justify-center w-full h-full"
      >
        <img
          src="/image/image 448.svg"
          alt="PStudio Creative Team Illustration"
          className="w-full h-full object-cover object-bottom"
          draggable={false}
        />
      </motion.div>

      {/* Main Title and CTA */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl lg:max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[60px] leading-[1.18] tracking-[-0.025em] text-studio-dark"
        >
          We&apos;re a creative studio<br />
          specializing in strategic<br />
          Explainer Videos
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8"
        >
          <Link
            href="#strategy"
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-accent-green text-black font-semibold text-lg sm:text-[20px] shadow-sm hover:shadow-xl hover:shadow-accent-green/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>Talk about your video strategy</span>
            <svg
              className="ml-2.5 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
