'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContactModal } from '@/context/ContactModalContext'
import { IconX, IconArrowRight } from '@tabler/icons-react'

// GSAP Timeline Animation with Staggered Entrance and Downward Collapse Exit
const cardVariants = {
  initial: (custom: number) => ({
    x: '110%',
    y: 0,
    rotate: 0,
    opacity: 0,
  }),
  animate: (custom: number) => ({
    x: '0%',
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      delay: custom * 0.08,
      ease: [0.175, 0.885, 0.32, 1.12], // GSAP back.out
    },
  }),
  exit: (custom: number) => {
    const tumbleRotations = [-7, 9, -12]
    return {
      y: '120vh',
      rotate: tumbleRotations[custom] || -8,
      opacity: 0.85,
      transition: {
        duration: 0.65,
        delay: (2 - custom) * 0.04, // Stagger from bottom (bottom panel drops first, then middle, then top)
        ease: [0.32, 0, 0.67, 0], // GSAP power3.in
      },
    }
  },
}

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@pstudio.vn')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pstudiovn/posts/?feedView=all' },
    { label: 'Facebook', href: 'https://www.facebook.com/pstudiovn' },
    { label: 'Behance', href: 'https://www.behance.net/pstudiovn?tracking_source=search_projects%7CPstudio' },
    { label: 'Vimeo', href: 'https://vimeo.com/pstudiovietnam' },
    { label: 'Instagram', href: 'https://www.instagram.com/pstudiovn' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-auto">
          
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={closeContactModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
          />

          {/* Right-Aligned 3-Panel Stack Container */}
          <div className="fixed inset-0 z-20 p-3 sm:p-5 flex flex-col items-end justify-between pointer-events-none gap-3 sm:gap-4">
            
            <div className="w-full max-w-[700px] h-full flex flex-col gap-3 sm:gap-4">
              
              {/* PANEL 1: DIGITAL BUSINESS CARD VISIT (Rounded matching design system) */}
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative flex-1 bg-[#FFFFFF] rounded-2xl sm:rounded-[28px] p-8 sm:p-11 md:p-14 flex flex-col justify-between shadow-2xl pointer-events-auto overflow-hidden will-change-transform"
              >
                {/* Top Close Button on the right */}
                <button
                  onClick={closeContactModal}
                  aria-label="Close card"
                  className="absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#111111] transition-all hover:rotate-90 duration-300 focus:outline-none cursor-pointer z-10"
                >
                  <IconX size={20} stroke={2.4} />
                </button>

                {/* Main Hero Headline */}
                <div className="pt-2 sm:pt-4 pr-12">
                  <p className="font-display font-medium text-[26px] sm:text-[34px] md:text-[38px] leading-[1.12] tracking-[-0.035em] text-[#111111]">
                    Making your product easier to buy through high-impact animated stories.
                  </p>
                </div>

                {/* Contact Details Grid (Balanced 2-Column Coordinates) */}
                <div className="my-auto py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 font-sans">
                  
                  {/* Email Block */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-xs sm:text-[13px] text-[#111111]/50">
                      Direct Email
                    </span>
                    <a
                      href="mailto:contact@pstudio.vn"
                      className="font-semibold text-[18px] sm:text-[21px] text-[#111111] hover:text-[#20D38E] transition-colors break-all"
                    >
                      contact@pstudio.vn
                    </a>
                  </div>

                  {/* Phone / WhatsApp Block */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-xs sm:text-[13px] text-[#111111]/50">
                      Phone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+84982198220"
                      className="font-semibold text-[18px] sm:text-[21px] text-[#111111] hover:text-[#20D38E] transition-colors"
                    >
                      +84 982 198 220
                    </a>
                  </div>

                  {/* Location Block */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-xs sm:text-[13px] text-[#111111]/50">
                      Studio Location
                    </span>
                    <p className="font-medium text-[16px] sm:text-[18px] text-[#111111]">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>

                  {/* Working Hours / Response */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-xs sm:text-[13px] text-[#111111]/50">
                      Working Time
                    </span>
                    <p className="font-medium text-[16px] sm:text-[18px] text-[#111111]">
                      Mon – Fri, 09:00 – 18:00 (GMT+7)
                    </p>
                  </div>

                </div>

                {/* Card Visit Footer Actions: Copy Email Button & Studio Stamp */}
                <div className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-sans">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/5 hover:bg-black/10 rounded-xl font-medium text-xs sm:text-sm text-[#111111] transition-all cursor-pointer"
                    >
                      <span>{copied ? '✓ Copied to clipboard!' : 'Copy Email Address'}</span>
                    </button>
                    <a
                      href="mailto:contact@pstudio.vn?subject=New%20Project%20Inquiry"
                      className="inline-flex items-center gap-1 font-medium text-xs sm:text-sm text-[#111111] hover:underline"
                    >
                      Open in Mail &rarr;
                    </a>
                  </div>

                  <span className="font-medium text-xs sm:text-sm text-[#111111]/40">
                    Est. 2020 • Vietnam
                  </span>
                </div>

              </motion.div>

              {/* PANEL 2: MIDDLE ACCENT GREEN PANEL (Rounded-2xl/3xl, Button rounded-xl) */}
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#20D38E] rounded-2xl sm:rounded-[24px] p-7 sm:p-8 text-[#0A3D2A] shadow-xl pointer-events-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5 will-change-transform"
              >
                <div className="max-w-md">
                  <h3 className="font-display font-medium text-[22px] sm:text-[26px] leading-tight tracking-[-0.03em] text-[#0A3D2A]">
                    Start your<br className="hidden sm:inline" /> video strategy today
                  </h3>
                </div>

                <div className="flex items-center flex-shrink-0">
                  <a
                    href="mailto:contact@pstudio.vn?subject=Project%20Inquiry%20from%20Website"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111111] text-white rounded-xl font-sans font-medium text-sm sm:text-base hover:bg-black active:scale-95 transition-all shadow-sm group"
                  >
                    <span>Send Brief</span>
                    <IconArrowRight size={16} stroke={2.4} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* PANEL 3: BOTTOM DARK SOCIAL PANEL (Rounded-2xl/3xl, logoIcon.svg) */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#111111] rounded-2xl sm:rounded-[24px] p-6 sm:p-7 text-white shadow-xl pointer-events-auto flex items-center justify-between gap-6 will-change-transform"
              >
                <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 font-sans font-medium text-sm sm:text-base text-gray-300">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#20D38E] transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>

                {/* Brand Logo Icon */}
                <div className="relative w-9 sm:w-11 aspect-[427/552] flex-shrink-0 select-none pointer-events-none">
                  <img
                    src="/image/logoIcon.svg"
                    alt="PStudio Logo Icon"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      )}
    </AnimatePresence>
  )
}
