'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const navLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'About us', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if scrolled past top
      setIsScrolled(currentScrollY > 20)

      // When inside the Process section, keep navbar hidden even if scrolling up
      const processElem = document.getElementById('process')
      if (processElem) {
        const rect = processElem.getBoundingClientRect()
        // If the viewport is engaged inside the process horizontal scroll track
        const isInsideProcess = rect.top <= 60 && rect.bottom >= window.innerHeight - 60
        if (isInsideProcess) {
          setIsVisible(false)
          setMobileMenuOpen(false)
          lastScrollY.current = currentScrollY
          return
        }
      }

      // Scroll Down -> Hide Navbar, Scroll Up -> Reveal Navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false)
        setMobileMenuOpen(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 w-full px-[24px] py-4 sm:py-5 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-b border-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full grid grid-cols-12 gap-[24px] items-center">
          {/* Brand Logo - Starts at Column 1 */}
          <div className="col-span-6 md:col-span-4 flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links - Centered with elegant tighter spacing */}
          <nav className="hidden md:flex col-span-4 justify-center items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base lg:text-[17px] font-medium transition-colors relative py-1 inline-block ${
                    isActive
                      ? 'text-black after:w-full font-semibold'
                      : 'text-studio-dark hover:text-black after:w-0 hover:after:w-full'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent-green after:transition-all`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA Button - Ends at Column 12 */}
          <div className="hidden md:flex col-span-4 justify-end items-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-green text-black font-semibold text-base lg:text-[17px] hover:brightness-105 hover:shadow-lg hover:shadow-accent-green/20 active:scale-95 transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="col-span-6 flex justify-end md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-studio-dark hover:bg-black/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-[24px] right-[24px] mt-2 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-black/5 flex flex-col gap-4 md:hidden z-50"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-colors py-2 border-b border-black/5 ${
                      isActive ? 'text-accent-green font-semibold' : 'text-studio-dark hover:text-accent-green'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-accent-green text-black font-semibold text-base mt-2 shadow-md shadow-accent-green/20"
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to maintain layout height when fixed navbar is active */}
      <div className="w-full h-[76px] sm:h-[84px] pointer-events-none" />
    </>
  )
}
