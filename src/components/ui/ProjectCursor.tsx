'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import {
  IconArrowRight,
  IconVolume,
  IconVolumeOff,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-react'

export default function ProjectCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('View')
  const [iconType, setIconType] = useState<'arrow' | 'play' | 'pause' | 'sound' | 'mute'>('arrow')
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
        const icon = (target.getAttribute('data-cursor-icon') as 'arrow' | 'play' | 'pause' | 'sound' | 'mute') || 'arrow'
        setLabel(text)
        setIconType(icon)
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const handleCursorUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ text?: string; icon?: 'arrow' | 'play' | 'pause' | 'sound' | 'mute'; visible?: boolean }>
      if (customEvent.detail) {
        if (customEvent.detail.text !== undefined) setLabel(customEvent.detail.text)
        if (customEvent.detail.icon !== undefined) setIconType(customEvent.detail.icon)
        if (customEvent.detail.visible !== undefined) setIsVisible(customEvent.detail.visible)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('cursor-update', handleCursorUpdate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('cursor-update', handleCursorUpdate)
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
        className={`px-3.5 py-2 rounded-xl bg-accent-green text-black font-display font-medium text-[13px] tracking-wide uppercase flex items-center gap-1.5 shadow-md border border-black/5 whitespace-nowrap transition-all duration-300 ease-out transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <span>{label}</span>
        {iconType === 'play' ? (
          <IconPlayerPlay size={15} stroke={2.4} className="fill-current" />
        ) : iconType === 'pause' ? (
          <IconPlayerPause size={15} stroke={2.4} className="fill-current" />
        ) : iconType === 'sound' ? (
          <IconVolume size={15} stroke={2.4} />
        ) : iconType === 'mute' ? (
          <IconVolumeOff size={15} stroke={2.4} />
        ) : (
          <IconArrowRight size={15} stroke={2.4} />
        )}
      </div>
    </div>
  )
}
