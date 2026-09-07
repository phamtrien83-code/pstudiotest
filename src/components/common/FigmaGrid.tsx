'use client'

import React, { useEffect, useState } from 'react'

export default function FigmaGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if (e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault()
        setIsVisible((prev) => {
          const next = !prev
          setShowToast(true)
          setTimeout(() => setShowToast(false), 1500)
          return next
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-black/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-lg text-xs font-mono shadow-lg flex items-center gap-2 pointer-events-none transition-all">
          <span
            className={`w-2 h-2 rounded-full ${
              isVisible ? 'bg-red-500' : 'bg-gray-400'
            }`}
          />
          <span>Figma Grid: {isVisible ? 'ON' : 'OFF'}</span>
          <span className="text-gray-400 text-[11px]">(Shift + G)</span>
        </div>
      )}

      {/* Clean Figma Grid Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none select-none flex justify-center"
          aria-hidden="true"
        >
          {/* Full Width Grid Frame with 24px Margin */}
          <div className="relative w-full h-full px-[24px]">
            {/* 12 Columns with 24px Gutter - Solid Fill, No Stroke */}
            <div className="grid grid-cols-12 gap-[24px] h-full w-full">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="h-full bg-red-500/10"
                />
              ))}
            </div>

            {/* Vertical Center Solid Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-red-500/60" />

            {/* Horizontal Center Solid Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-red-500/60" />
          </div>
        </div>
      )}
    </>
  )
}
