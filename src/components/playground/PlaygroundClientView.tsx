'use client'

import React, { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'
import Navbar from '@/components/common/Navbar'
import { PLAYGROUND_ITEMS, PlaygroundItem } from '@/data/playgroundItems'

// Dimensions for each project card in the horizontal track
const CARD_DIMENSIONS: Record<string, { width: string; height: string; aspect: string }> = {
  'dome-architecture': { width: 'w-[240px] sm:w-[300px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[300/195]' },
  'hypnotic-spiral': { width: 'w-[235px] sm:w-[295px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[295/195]' },
  'highlands-mist': { width: 'w-[185px] sm:w-[220px]', height: 'h-[140px] sm:h-[165px]', aspect: 'aspect-[220/165]' },
  'golden-sunset': { width: 'w-[240px] sm:w-[300px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[300/195]' },
  'creative-atelier': { width: 'w-[240px] sm:w-[300px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[300/195]' },
  'wild-campfire': { width: 'w-[250px] sm:w-[310px]', height: 'h-[135px] sm:h-[155px]', aspect: 'aspect-[310/155]' },
  'curious-alpaca': { width: 'w-[185px] sm:w-[220px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[220/195]' },
  'neon-metropolis': { width: 'w-[240px] sm:w-[300px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[300/195]' },
  'kinetic-fluidity': { width: 'w-[225px] sm:w-[280px]', height: 'h-[155px] sm:h-[185px]', aspect: 'aspect-[280/185]' },
  'brand-odyssey': { width: 'w-[250px] sm:w-[310px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[310/195]' },
  'geometric-echoes': { width: 'w-[220px] sm:w-[270px]', height: 'h-[150px] sm:h-[175px]', aspect: 'aspect-[270/175]' },
}

export default function PlaygroundClientView() {
  // selectedItem: null = Phase 1 (Headline "We love...")
  // selectedItem: PlaygroundItem = Phase 2 (16:9 Video Player + "Hover to play")
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Drag interaction refs
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  // Sorted items by rowIndex
  const sortedItems = useMemo(() => {
    return [...PLAYGROUND_ITEMS].sort((a, b) => a.rowIndex - b.rowIndex)
  }, [])

  // Mouse drag-to-scroll interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    setIsMouseDown(true)
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - trackRef.current.offsetLeft
    scrollLeftRef.current = trackRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.3
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false)
    isDraggingRef.current = false
    setTimeout(() => {
      hasMovedRef.current = false
    }, 60)
  }

  return (
    <main className="h-screen h-[100dvh] w-full overflow-hidden bg-background text-studio-dark flex flex-col justify-between selection:bg-accent-green selection:text-black">
      <Navbar theme="light" />

      {/* ========================================================================= */}
      {/* FIT-SCREEN PLAYGROUND VIEWPORT STAGE (No Vertical Scroll, Zero Lag)        */}
      {/* ========================================================================= */}
      <div className="relative flex-1 w-full flex flex-col justify-between overflow-hidden pt-14 sm:pt-16 pb-3 sm:pb-4">
        
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[500px] sm:w-[850px] h-[500px] sm:h-[850px] rounded-full bg-gradient-to-tr from-accent-green/15 via-transparent to-black/5 blur-3xl" />
        </div>

        {/* TOP STAGE: Either Giant Headline OR Massive Video Player */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative min-h-0 px-3 sm:px-6 md:px-8 py-1 sm:py-2">
          <AnimatePresence mode="wait">
            {!selectedItem ? (
              // -----------------------------------------------------------------
              // STATE 1: Large Headline "We love making Cool Stuff"
              // -----------------------------------------------------------------
              <motion.div
                key="hero-title"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center px-4 max-w-5xl select-none pointer-events-none will-change-transform"
              >
                <h1 className="font-display font-medium text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] xl:text-[116px] leading-[1.02] tracking-[-0.035em] text-[#111111]">
                  We love making
                  <br />
                  <span className="relative inline-block text-black">
                    Cool Stuff
                  </span>
                </h1>
              </motion.div>
            ) : (
              // -----------------------------------------------------------------
              // STATE 2: Large Full-Width Video Player (No Excessive White Space)
              // -----------------------------------------------------------------
              <motion.div
                key="media-player"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[1600px] h-full max-h-[62vh] sm:max-h-[66vh] flex items-center justify-center pointer-events-auto select-none will-change-transform"
              >
                {/* Full Width Media Player */}
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111111] border border-black/10 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Video or Image Media */}
                      {selectedItem.videoUrl ? (
                        <video
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          key={selectedItem.videoUrl}
                          src={selectedItem.videoUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Action Buttons: Sound Toggle & Reset to Title */}
                      <div className="absolute top-3.5 sm:top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono font-medium text-accent-green border border-white/10">
                            {selectedItem.number}
                          </span>
                          <span className="text-[12px] sm:text-[13px] font-mono text-white/80 uppercase tracking-wider">
                            {selectedItem.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {selectedItem.videoUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsMuted((prev) => !prev)
                              }}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4 text-white/70" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-accent-green" />
                              )}
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedItem(null)
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                            title="Đóng xem trước (Quay về tiêu đề)"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Title & Description */}
                      <div className="absolute bottom-3.5 sm:bottom-5 left-5 sm:left-7 right-5 sm:right-7 flex flex-col gap-0.5 sm:gap-1 text-white pointer-events-none z-10">
                        <h2 className="font-display font-medium text-[20px] sm:text-[26px] md:text-[30px] leading-tight text-white">
                          {selectedItem.title}
                        </h2>
                        <p className="text-[12px] sm:text-[13px] text-white/75 font-sans line-clamp-1 max-w-xl">
                          {selectedItem.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================================= */}
        {/* BOTTOM STAGE: DRAGGABLE HORIZONTAL PROJECT TRACK                         */}
        {/* ======================================================================= */}
        <div className="relative w-full z-20">
          
          {/* Scrollable & Draggable Track with Projects (Top-aligned, Drag-enabled) */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`w-full overflow-x-auto scrollbar-hide py-2 px-6 sm:px-12 flex items-start gap-5 sm:gap-7 select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {sortedItems.map((item, index) => {
              const spec = CARD_DIMENSIONS[item.id] || { width: 'w-[240px] sm:w-[300px]', height: 'h-[165px] sm:h-[195px]', aspect: 'aspect-[4/3]' }
              const isCurrentActive = selectedItem?.id === item.id

              return (
                <motion.div
                  key={item.id}
                  initial={{ x: 180, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.12 + index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => {
                    if (isDraggingRef.current) return
                    setSelectedItem(item)
                  }}
                  onClick={() => {
                    if (hasMovedRef.current) return
                    setSelectedItem(item)
                  }}
                  className={`flex-shrink-0 ${spec.width} ${spec.height} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer relative transition-[border-color,opacity] duration-300 transform-gpu ${
                    isCurrentActive
                      ? 'border-2 border-accent-green ring-2 ring-accent-green/30 opacity-100'
                      : 'border border-black/10 opacity-75 hover:opacity-100 hover:border-black/30'
                  }`}
                  data-cursor="project"
                  data-cursor-text="Play"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover object-center pointer-events-none select-none"
                    loading="eager"
                  />

                  {/* Subtle Title Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 pointer-events-none">
                    <span className="text-white text-[12px] sm:text-[13px] font-sans font-medium line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </main>
  )
}
