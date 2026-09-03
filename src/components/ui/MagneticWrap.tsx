'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface MagneticWrapProps {
  children: React.ReactNode
  className?: string
  strength?: number
  activeAreaPadding?: number
}

/**
 * MagneticWrap: GSAP quickTo-powered magnetic pull effect.
 * Attracts child elements smoothly toward the mouse cursor with an elastic release.
 */
export default function MagneticWrap({
  children,
  className = '',
  strength = 0.55,
}: MagneticWrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on pointer: fine (desktop / mouse devices)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const container = containerRef.current
    const target = targetRef.current
    if (!container || !target) return

    let xTo: gsap.QuickToFunc | null = null
    let yTo: gsap.QuickToFunc | null = null

    const initQuickTo = () => {
      xTo = gsap.quickTo(target, 'x', { duration: 0.35, ease: 'power2.out' })
      yTo = gsap.quickTo(target, 'y', { duration: 0.35, ease: 'power2.out' })
    }

    const handleMouseEnter = () => {
      initQuickTo()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!xTo || !yTo) {
        initQuickTo()
      }

      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rawDeltaX = (e.clientX - centerX) * strength
      const rawDeltaY = (e.clientY - centerY) * strength

      // Allow strong displacement up to 48px
      const maxDisplacement = 48
      const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawDeltaX))
      const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawDeltaY))

      xTo!(clampedX)
      yTo!(clampedY)
    }

    const handleMouseLeave = () => {
      // Clear quickTo references so subsequent enters create a fresh tween
      xTo = null
      yTo = null

      // Strong elastic spring release with substantial physical oscillation
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 1.05,
        ease: 'elastic.out(1.25, 0.32)',
        overwrite: 'auto',
      })
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(target)
    }
  }, [strength])

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center p-4 -m-4 ${className}`}
    >
      <div ref={targetRef} className="will-change-transform flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
