'use client'

import React, { useRef, useState, useEffect } from 'react'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react'

export default function AboutCoreValueVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Ensure autoplay on mount with 50% default volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Fallback for strict browser autoplay
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        }
      })
    }
  }, [])

  // Toggle sound on/off at 50% volume
  const toggleSound = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.muted = false
      videoRef.current.volume = 0.5
      setIsMuted(false)
      window.dispatchEvent(
        new CustomEvent('cursor-update', {
          detail: { text: 'Mute', icon: 'mute', visible: true },
        })
      )
    } else {
      videoRef.current.muted = true
      setIsMuted(true)
      window.dispatchEvent(
        new CustomEvent('cursor-update', {
          detail: { text: 'Sound', icon: 'sound', visible: true },
        })
      )
    }
  }

  return (
    <section 
      id="core-value-video"
      className="relative w-full overflow-hidden bg-black select-none"
    >
      {/* Full-width clean cinema container with work-style custom sound cursor */}
      <div
        onClick={toggleSound}
        data-cursor="project"
        data-cursor-text={isMuted ? 'Sound' : 'Mute'}
        data-cursor-icon={isMuted ? 'sound' : 'mute'}
        className="relative w-full aspect-video bg-black md:cursor-none cursor-pointer overflow-hidden flex items-center justify-center"
      >
        {/* HTML5 Video Element: Continuous Autoplay Loop at 50% Volume */}
        <video
          ref={videoRef}
          src="/video/PSTUDIO'S CORE VALUE.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Mobile touch indicator: Floating quick sound toggle on touch devices */}
        <div className="md:hidden absolute bottom-4 right-4 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={toggleSound}
            className="px-3.5 py-2 rounded-xl bg-accent-green text-black font-display font-medium text-[12px] uppercase tracking-wide flex items-center gap-1.5 shadow-md border border-black/5 active:scale-95 transition-transform"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <>
                <span>Sound</span>
                <IconVolume size={15} stroke={2.4} />
              </>
            ) : (
              <>
                <span>Mute</span>
                <IconVolumeOff size={15} stroke={2.4} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
