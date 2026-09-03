'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { IconArrowRight } from '@tabler/icons-react'

export default function ProjectCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('View')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only activate on pointer: fine (desktop / mouse devices)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    // Position cursor center at mouse coordinates with GSAP
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor="project"]')
      if (target) {
        const text = target.getAttribute('data-cursor-text') || 'View'
        setLabel(text)
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      gsap.killTweensOf(cursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none will-change-transform hidden md:block"
    >
      <div
        className={`px-4 py-2 rounded-full bg-accent-green text-black font-display font-medium text-[13px] tracking-wide uppercase flex items-center gap-1.5 shadow-[0_12px_32px_rgba(32,211,142,0.45)] whitespace-nowrap transition-all duration-300 ease-out transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <span>{label}</span>
        <IconArrowRight size={15} stroke={2.4} />
      </div>
    </div>
  )
}
