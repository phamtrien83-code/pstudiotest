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
    let isInside = false

    const initQuickTo = () => {
      xTo = gsap.quickTo(target, 'x', { duration: 0.35, ease: 'power2.out' })
      yTo = gsap.quickTo(target, 'y', { duration: 0.35, ease: 'power2.out' })
    }

    const release = () => {
      if (!isInside) return
      isInside = false
      xTo = null
      yTo = null

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.95,
        ease: 'elastic.out(1.2, 0.35)',
        overwrite: 'auto',
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !target) return

      const rect = container.getBoundingClientRect()
      // Ignore if container is not in viewport or hidden
      if (rect.width === 0 || rect.height === 0) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Magnetic trigger zone extends comfortably beyond the button boundary
      const triggerWidth = rect.width / 2 + 40
      const triggerHeight = rect.height / 2 + 40

      const isWithinZone =
        Math.abs(deltaX) <= triggerWidth && Math.abs(deltaY) <= triggerHeight

      if (isWithinZone) {
        if (!isInside || !xTo || !yTo) {
          isInside = true
          initQuickTo()
        }

        const maxDisplacement = 38
        const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX * strength))
        const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY * strength))

        xTo!(clampedX)
        yTo!(clampedY)
      } else if (isInside) {
        release()
      }
    }

    const handleMouseLeaveWindow = () => {
      release()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      gsap.killTweensOf(target)
    }
  }, [strength])

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <div ref={targetRef} className="will-change-transform flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
