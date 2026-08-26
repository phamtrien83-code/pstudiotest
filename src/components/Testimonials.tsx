'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BrandLogo {
  name: string
  src: string
  alt: string
  className?: string
}

const BRAND_LOGOS: BrandLogo[] = [
  // Row 1
  {
    name: 'Sisense',
    src: '/image/testimonials/Sisense-Logo.svg',
    alt: 'Sisense Logo',
    className: 'h-5 sm:h-5.5 md:h-6 max-w-[120px]',
  },
  {
    name: 'GitLab',
    src: '/image/testimonials/gitlab-logo-100-rgb.svg',
    alt: 'GitLab Logo',
    className: 'h-5 sm:h-5.5 md:h-6 max-w-[110px]',
  },
  {
    name: 'Meta',
    src: '/image/testimonials/Meta_lockup_positive primary_RGB.svg',
    alt: 'Meta Logo',
    className: 'h-5 sm:h-5.5 md:h-6 max-w-[100px]',
  },
  {
    name: 'Red Cat Motion',
    src: '/image/testimonials/redcat-trimmed.png',
    alt: 'Red Cat Motion Logo',
    className: 'h-9 sm:h-11 md:h-12 max-w-[110px]',
  },
  {
    name: 'Dentsu Redder',
    src: '/image/testimonials/Logoredder-trimmed.png',
    alt: 'Dentsu Redder Logo',
    className: 'h-8 sm:h-9 md:h-10 max-w-[120px]',
  },
  // Row 2
  {
    name: 'TripAdvisor',
    src: '/image/testimonials/tripadvisor-trimmed.png',
    alt: 'TripAdvisor Logo',
    className: 'h-8 sm:h-9 md:h-10 max-w-[135px]',
  },
  {
    name: 'Amazon',
    src: '/image/testimonials/amazon-trimmed.png',
    alt: 'Amazon Logo',
    className: 'h-7 sm:h-8 md:h-9 max-w-[130px]',
  },
  {
    name: 'Sincerely Health',
    src: '/image/testimonials/sincerely-health-trimmed.png',
    alt: 'Sincerely Health Logo',
    className: 'h-8 sm:h-9 md:h-10 max-w-[145px]',
  },
  {
    name: 'TomoChain',
    src: '/image/testimonials/tomochain-seeklogo.svg',
    alt: 'TomoChain Logo',
    className: 'h-7 sm:h-7.5 md:h-8.5 max-w-[140px]',
  },
  {
    name: 'Napas',
    src: '/image/testimonials/napas-trimmed.png',
    alt: 'Napas Logo',
    className: 'h-5 sm:h-5.5 md:h-6 max-w-[110px]',
  },
]

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-[24px] border-t border-black/5 z-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        
        {/* Left Column: Heading + CTA Button (Columns 1 to 3 in 12-col grid) */}
        <div className="lg:col-span-3 lg:col-start-1 flex flex-col items-start justify-start">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[34px] sm:text-[40px] lg:text-[42px] xl:text-[48px] leading-[1.08] tracking-[-0.035em] text-studio-dark mb-8"
          >
            We&apos;re honored<br />to work with
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#20D38E] text-[#0D382A] font-display font-medium text-[16px] rounded-lg shadow-sm hover:brightness-105 active:scale-95 transition-all duration-200"
            >
              Let&apos;s work
            </Link>
          </motion.div>
        </div>

        {/* Right Column: 10 Brand Logos Grouped from Column 5 to 12 (8 Columns) + Caption */}
        <div className="lg:col-span-8 lg:col-start-5 flex flex-col justify-between h-full pt-1">
          
          {/* Logo Grid: 2 Rows x 5 Columns */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 items-center w-full"
          >
            {BRAND_LOGOS.map((brand) => (
              <div 
                key={brand.name} 
                className="w-full flex items-center justify-center h-14 sm:h-16 hover:opacity-80 transition-opacity"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className={`max-w-full w-auto object-contain select-none ${brand.className || 'h-6'}`}
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Bottom Caption: Metrics & Credentials (Right aligned) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-[13px] sm:text-[14px] text-gray-500 font-normal tracking-[-0.01em] mt-12 lg:mt-16 text-left lg:text-right max-w-[524px] lg:self-end leading-relaxed"
          >
            200+ explainer videos shipped · 4+ years focused on B2B SaaS &amp; Tech · Clients across the US, EU, and Asia
          </motion.p>
        </div>

      </div>
    </section>
  )
}
