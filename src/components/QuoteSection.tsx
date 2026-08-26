'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Organic 4-Point Star (Matches public/image/star.svg exact geometry)
function OrganicStar({
  color,
  className = '',
  style,
}: {
  color: string
  className?: string
  style?: any
}) {
  return (
    <motion.svg
      viewBox="0 0 208 208"
      className={`absolute select-none pointer-events-none ${className}`}
      style={style}
      fill="none"
    >
      <path
        d="M103.791 207.565C98.6495 207.565 94.4705 203.382 94.4705 198.245V159.659C94.4705 133.985 73.5799 113.095 47.9019 113.095H9.31206C4.1748 113.095 0 108.916 0 103.783C0 98.6453 4.1748 94.4705 9.31206 94.4705H47.9144C73.584 94.4705 94.4705 73.584 94.4705 47.9144V9.31623C94.4705 4.17897 98.6495 0 103.791 0C108.924 0 113.107 4.17897 113.107 9.31623V47.9019C113.107 73.5799 133.994 94.4705 159.667 94.4705H198.261C203.399 94.4705 207.578 98.6453 207.578 103.783C207.578 108.916 203.399 113.095 198.261 113.095H159.659C133.99 113.095 113.107 133.977 113.107 159.647V198.245C113.107 203.382 108.924 207.565 103.791 207.565Z"
        fill={color}
      />
    </motion.svg>
  )
}

// Textured Linocut Illustration Card Component
function LinocutArtwork({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[#0D382A] rounded-none overflow-hidden shadow-2xl flex items-center justify-center ${className}`}>
      {/* Linocut Woodblock Vector Art */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full object-cover select-none"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Deep Green */}
        <rect width="800" height="400" fill="#0D382A" />

        {/* Linocut Texture Overlay Grain */}
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
        </filter>
        <rect width="800" height="400" filter="url(#noiseFilter)" fill="#FFF" opacity="0.3" />

        {/* Starry Sky Hatching Waves */}
        <g stroke="#F4EFE6" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          {/* Waves / Sky lines */}
          <path d="M -20 40 Q 200 20, 400 45 T 820 35" strokeDasharray="12 4 8 4" />
          <path d="M -20 65 Q 200 45, 400 70 T 820 60" strokeDasharray="16 6 10 4" />
          <path d="M -20 90 Q 220 70, 420 95 T 820 85" strokeDasharray="14 5 12 5" />
          <path d="M -20 115 Q 180 95, 380 120 T 820 110" strokeDasharray="20 6 8 6" />
          <path d="M -20 140 Q 240 120, 440 145 T 820 135" strokeDasharray="15 6 18 4" />
          <path d="M -20 165 Q 210 145, 410 170 T 820 160" strokeDasharray="22 8 10 5" />
          <path d="M -20 190 Q 230 170, 430 195 T 820 185" strokeDasharray="18 6 14 6" />
          <path d="M -20 215 Q 200 195, 400 220 T 820 210" strokeDasharray="12 5 16 5" />
        </g>

        {/* Linocut Sky Sparkles & Burst Stars */}
        <g fill="#F4EFE6" stroke="#F4EFE6" strokeWidth="2">
          {/* Star 1 */}
          <circle cx="110" cy="70" r="3" />
          <path d="M110 55 L110 85 M95 70 L125 70 M100 60 L120 80 M120 60 L100 80" strokeWidth="2" strokeLinecap="round" />
          
          {/* Dots */}
          <circle cx="240" cy="65" r="4" fill="none" strokeWidth="2.5" />
          <circle cx="390" cy="68" r="4" fill="none" strokeWidth="2.5" />
          <circle cx="640" cy="65" r="4" fill="none" strokeWidth="2.5" />

          {/* Star 2 */}
          <polygon points="500,45 504,58 518,58 506,66 510,80 500,70 490,80 494,66 482,58 496,58" fill="#F4EFE6" stroke="none" />

          {/* Star 3 */}
          <path d="M700 70 L700 95 M688 82 L712 82 M691 73 L709 91 M709 73 L691 91" strokeWidth="2.5" strokeLinecap="round" />

          {/* Small Star Right */}
          <polygon points="665,160 668,170 678,170 670,176 673,186 665,179 657,186 660,176 652,170 662,170" fill="#F4EFE6" stroke="none" />
        </g>

        {/* Left Textured Linen / Sail / Cloud */}
        <g fill="#F4EFE6">
          <path
            d="M -10 170 Q 150 180, 180 230 C 170 290, 140 360, 180 420 L -10 420 Z"
            fill="#F3ECE0"
          />
          {/* Hatching grain inside sail */}
          <g stroke="#0D382A" strokeWidth="1.5" opacity="0.4">
            <line x1="20" y1="210" x2="160" y2="210" strokeDasharray="4 4" />
            <line x1="10" y1="225" x2="150" y2="225" strokeDasharray="3 3" />
            <line x1="30" y1="240" x2="140" y2="240" strokeDasharray="5 3" />
            <line x1="15" y1="255" x2="135" y2="255" strokeDasharray="4 2" />
            <line x1="25" y1="270" x2="120" y2="270" strokeDasharray="3 3" />
          </g>
        </g>

        {/* Handcrafted Linocut Floating Vessel / Boat */}
        <g transform="translate(360, 270)">
          {/* Vessel hull */}
          <path
            d="M 0 35 Q 80 30, 140 0 C 130 15, 90 42, 0 38 Z"
            fill="#F3ECE0"
          />
          {/* Straps / Details */}
          <rect x="35" y="18" width="22" height="12" rx="2" fill="#0D382A" />
          <rect x="38" y="21" width="16" height="6" rx="1" fill="#F3ECE0" />
          <path d="M 0 32 C -15 25, -20 38, -2 46" stroke="#F3ECE0" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Water Wake / Foam trail */}
          <g stroke="#F3ECE0" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <path d="M 25 50 Q 80 52, 160 40" strokeDasharray="14 4 10 4" />
            <path d="M 45 60 Q 95 62, 140 52" strokeDasharray="8 4 12 6" />
            <path d="M 60 70 Q 110 72, 150 62" strokeDasharray="6 3 10 4" />
          </g>
        </g>
      </svg>

      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

// Character-by-character Reveal Component
function CharSpan({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: any
}) {
  // Stagger reveal across [0.0 to 0.25]
  const start = (index / total) * 0.20
  const end = Math.min(0.25, start + 0.035)
  const opacity = useTransform(progress, [start, end], [0.15, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

function TextReveal({
  text,
  startIndex,
  total,
  progress,
}: {
  text: string
  startIndex: number
  total: number
  progress: any
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <CharSpan
          key={i}
          char={char}
          index={startIndex + i}
          total={total}
          progress={progress}
        />
      ))}
    </>
  )
}

export default function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP 3D depth wrapper refs for each star
  const star1Wrapper = useRef<HTMLDivElement>(null)
  const star2Wrapper = useRef<HTMLDivElement>(null)
  const star3Wrapper = useRef<HTMLDivElement>(null)
  const star4Wrapper = useRef<HTMLDivElement>(null)
  const star5Wrapper = useRef<HTMLDivElement>(null)
  const star6Wrapper = useRef<HTMLDivElement>(null)
  const star7Wrapper = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger for 3D translateZ fly-out effect (completes as video reaches fullscreen at 70%)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const starConfigs = [
        { ref: star1Wrapper, z: isMobile ? 300 : 500 },
        { ref: star2Wrapper, z: isMobile ? 260 : 420 },
        { ref: star3Wrapper, z: isMobile ? 350 : 600 },
        { ref: star4Wrapper, z: isMobile ? 280 : 450 },
        { ref: star5Wrapper, z: isMobile ? 320 : 520 },
        { ref: star6Wrapper, z: isMobile ? 300 : 480 },
        { ref: star7Wrapper, z: isMobile ? 340 : 560 },
      ]

      starConfigs.forEach(({ ref, z }) => {
        if (!ref.current) return
        gsap.fromTo(
          ref.current,
          { z: 0 },
          {
            z,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: '70% bottom',
              scrub: 1.2,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 25,
    restDelta: 0.001,
  })

  // Total characters across the quote: 10 + 7 + 8 + 17 = 42
  const TOTAL_CHARS = 42

  // Text Movements:
  // - Phase 1 (Stagger Reveal): 0.0 -> 0.25
  // - Phase 2 (Reading Hold): 0.25 -> 0.36
  // - Phase 3 (Parting & Video Expansion): 0.36 -> 0.70
  // - Phase 4 (Fullscreen Video Viewing Dwell): 0.70 -> 1.0
  const topTextY = useTransform(smoothProgress, [0, 0.36, 0.68, 1], [0, 0, -400, -400])
  const topTextOpacity = useTransform(smoothProgress, [0, 0.36, 0.60, 1], [1, 1, 0, 0])

  const bottomTextY = useTransform(smoothProgress, [0, 0.36, 0.68, 1], [0, 0, 400, 400])
  const bottomTextOpacity = useTransform(smoothProgress, [0, 0.36, 0.60, 1], [1, 1, 0, 0])

  const leftWordX = useTransform(smoothProgress, [0, 0.36, 0.68, 1], [0, 0, -550, -550])
  const rightWordX = useTransform(smoothProgress, [0, 0.36, 0.68, 1], [0, 0, 550, 550])
  const sideWordsOpacity = useTransform(smoothProgress, [0, 0.36, 0.60, 1], [1, 1, 0, 0])

  // Center Expanding Card - Expands to true fullscreen (100vw x 100vh) by 0.70, then stays fullscreen until 1.0
  const cardWidth = useTransform(smoothProgress, [0, 0.36, 0.58, 0.70, 1], ['0vw', '0vw', '60vw', '100vw', '100vw'])
  const cardHeight = useTransform(smoothProgress, [0, 0.36, 0.58, 0.70, 1], ['0vh', '0vh', '45vh', '100vh', '100vh'])
  const cardOpacity = useTransform(smoothProgress, [0, 0.36, 0.45, 1], [0, 0, 1, 1])
  const cardScale = useTransform(smoothProgress, [0, 0.36, 0.70, 1], [0.85, 0.85, 1.0, 1.0])

  // Floating Decorative Organic Stars - Burst from Center Outward & Exit before Fullscreen Video
  // Uses responsive viewport units (vw/vh) so trajectory scales proportionally on all mobile & desktop screens
  // Star 1 (Top-Left)
  const star1Opacity = useTransform(smoothProgress, [0, 0.05, 0.64, 0.70, 1], [0, 1, 1, 0, 0])
  const star1Scale = useTransform(smoothProgress, [0, 0.14, 0.70, 1], [0, 0.3, 2.0, 2.0])
  const star1Rotate = useTransform(smoothProgress, [0, 0.70, 1], [0, -25, -25])
  const star1X = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['22vw', '0vw', '-15vw', '-15vw'])
  const star1Y = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['18vh', '0vh', '-12vh', '-12vh'])
  const star1Filter = useTransform(smoothProgress, [0, 0.36, 0.70, 1], ['blur(0px)', 'blur(4px)', 'blur(14px)', 'blur(14px)'])

  // Star 2 (Top-Right)
  const star2Opacity = useTransform(smoothProgress, [0, 0.05, 0.64, 0.70, 1], [0, 1, 1, 0, 0])
  const star2Scale = useTransform(smoothProgress, [0, 0.14, 0.70, 1], [0, 0.28, 1.9, 1.9])
  const star2Rotate = useTransform(smoothProgress, [0, 0.70, 1], [0, 25, 25])
  const star2X = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['-22vw', '0vw', '15vw', '15vw'])
  const star2Y = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['18vh', '0vh', '-12vh', '-12vh'])
  const star2Filter = useTransform(smoothProgress, [0, 0.36, 0.70, 1], ['blur(0px)', 'blur(4px)', 'blur(14px)', 'blur(14px)'])

  // Star 3 (Mid-Left)
  const star3Opacity = useTransform(smoothProgress, [0, 0.05, 0.64, 0.70, 1], [0, 1, 1, 0, 0])
  const star3Scale = useTransform(smoothProgress, [0, 0.14, 0.70, 1], [0, 0.25, 2.1, 2.1])
  const star3Rotate = useTransform(smoothProgress, [0, 0.70, 1], [0, -30, -30])
  const star3X = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['16vw', '0vw', '-14vw', '-14vw'])
  const star3Y = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['10vh', '0vh', '-5vh', '-5vh'])
  const star3Filter = useTransform(smoothProgress, [0, 0.36, 0.70, 1], ['blur(0px)', 'blur(5px)', 'blur(16px)', 'blur(16px)'])

  // Star 4 (Bottom-Right)
  const star4Opacity = useTransform(smoothProgress, [0, 0.05, 0.64, 0.70, 1], [0, 1, 1, 0, 0])
  const star4Scale = useTransform(smoothProgress, [0, 0.14, 0.70, 1], [0, 0.28, 1.9, 1.9])
  const star4Rotate = useTransform(smoothProgress, [0, 0.70, 1], [0, 30, 30])
  const star4X = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['-18vw', '0vw', '14vw', '14vw'])
  const star4Y = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['-14vh', '0vh', '12vh', '12vh'])
  const star4Filter = useTransform(smoothProgress, [0, 0.36, 0.70, 1], ['blur(0px)', 'blur(4px)', 'blur(14px)', 'blur(14px)'])

  // Star 5 (Bottom-Left)
  const star5Opacity = useTransform(smoothProgress, [0, 0.05, 0.64, 0.70, 1], [0, 1, 1, 0, 0])
  const star5Scale = useTransform(smoothProgress, [0, 0.14, 0.70, 1], [0, 0.3, 2.0, 2.0])
  const star5Rotate = useTransform(smoothProgress, [0, 0.70, 1], [0, -20, -20])
  const star5X = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['22vw', '0vw', '-15vw', '-15vw'])
  const star5Y = useTransform(smoothProgress, [0, 0.25, 0.70, 1], ['-18vh', '0vh', '14vh', '14vh'])
  const star5Filter = useTransform(smoothProgress, [0, 0.36, 0.70, 1], ['blur(0px)', 'blur(5px)', 'blur(16px)', 'blur(16px)'])

  // Star 6 (Mid-Right Small Orange Star)
  const star6Opacity = useTransform(smoothProgress, [0, 0.18, 0.25, 0.64, 0.70, 1], [0, 0, 1, 1, 0, 0])
  const star6Scale = useTransform(smoothProgress, [0, 0.18, 0.30, 0.70, 1], [0, 0, 0.22, 2.0, 2.0])
  const star6Rotate = useTransform(smoothProgress, [0, 0.18, 0.70, 1], [0, 0, 35, 35])
  const star6X = useTransform(smoothProgress, [0, 0.18, 0.40, 0.70, 1], ['-16vw', '-16vw', '0vw', '14vw', '14vw'])
  const star6Y = useTransform(smoothProgress, [0, 0.18, 0.40, 0.70, 1], ['10vh', '10vh', '0vh', '-6vh', '-6vh'])
  const star6Filter = useTransform(smoothProgress, [0, 0.40, 0.70, 1], ['blur(0px)', 'blur(0px)', 'blur(16px)', 'blur(16px)'])

  // Star 7 (Bottom-Center-Left Small Green Star)
  const star7Opacity = useTransform(smoothProgress, [0, 0.20, 0.28, 0.64, 0.70, 1], [0, 0, 1, 1, 0, 0])
  const star7Scale = useTransform(smoothProgress, [0, 0.20, 0.32, 0.70, 1], [0, 0, 0.20, 1.9, 1.9])
  const star7Rotate = useTransform(smoothProgress, [0, 0.20, 0.70, 1], [0, 0, -28, -28])
  const star7X = useTransform(smoothProgress, [0, 0.20, 0.44, 0.70, 1], ['14vw', '14vw', '0vw', '-12vw', '-12vw'])
  const star7Y = useTransform(smoothProgress, [0, 0.20, 0.44, 0.70, 1], ['-12vh', '-12vh', '0vh', '10vh', '10vh'])
  const star7Filter = useTransform(smoothProgress, [0, 0.40, 0.70, 1], ['blur(0px)', 'blur(0px)', 'blur(15px)', 'blur(15px)'])

  return (
    <section ref={containerRef} className="relative w-full h-[390vh] bg-background">
      {/* Sticky Fullscreen Scene */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}>
        
        {/* Background Floating Organic Stars (Staggered Entrance, Outward Pan, Depth Blur & GSAP 3D translateZ) */}
        {/* Top Left Green Star — GSAP wrapper for Z-depth */}
        <div ref={star1Wrapper} className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 md:-top-16 md:-left-16 w-28 sm:w-56 md:w-80 h-28 sm:h-56 md:h-80" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#20D38E"
            className="w-full h-full inset-0"
            style={{ opacity: star1Opacity, scale: star1Scale, rotate: star1Rotate, x: star1X, y: star1Y, filter: star1Filter }}
          />
        </div>

        {/* Top Right Orange Star — GSAP wrapper for Z-depth */}
        <div ref={star2Wrapper} className="absolute -top-5 -right-5 sm:-top-8 sm:-right-8 md:-top-12 md:-right-12 w-24 sm:w-52 md:w-72 h-24 sm:h-52 md:h-72" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#FF7A45"
            className="w-full h-full inset-0"
            style={{ opacity: star2Opacity, scale: star2Scale, rotate: star2Rotate, x: star2X, y: star2Y, filter: star2Filter }}
          />
        </div>

        {/* Mid-Left Small Green Star — GSAP wrapper for Z-depth */}
        <div ref={star3Wrapper} className="absolute top-[18%] sm:top-[22%] left-[4%] sm:left-[16%] md:left-[22%] w-14 sm:w-28 md:w-44 h-14 sm:h-28 md:h-44" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#20D38E"
            className="w-full h-full inset-0"
            style={{ opacity: star3Opacity, scale: star3Scale, rotate: star3Rotate, x: star3X, y: star3Y, filter: star3Filter }}
          />
        </div>

        {/* Mid-Right Small Orange Star — GSAP wrapper for Z-depth */}
        <div ref={star6Wrapper} className="absolute top-[16%] sm:top-[18%] right-[4%] sm:right-[18%] md:right-[22%] w-12 sm:w-24 md:w-40 h-12 sm:h-24 md:h-40" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#FF7A45"
            className="w-full h-full inset-0"
            style={{ opacity: star6Opacity, scale: star6Scale, rotate: star6Rotate, x: star6X, y: star6Y, filter: star6Filter }}
          />
        </div>

        {/* Bottom-Center-Left Small Green Star — GSAP wrapper for Z-depth */}
        <div ref={star7Wrapper} className="absolute bottom-[18%] sm:bottom-[22%] left-[6%] sm:left-[24%] md:left-[28%] w-10 sm:w-20 md:w-36 h-10 sm:h-20 md:h-36" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#20D38E"
            className="w-full h-full inset-0"
            style={{ opacity: star7Opacity, scale: star7Scale, rotate: star7Rotate, x: star7X, y: star7Y, filter: star7Filter }}
          />
        </div>

        {/* Bottom Right Green Star — GSAP wrapper for Z-depth */}
        <div ref={star4Wrapper} className="absolute bottom-[10%] sm:bottom-[14%] right-[4%] sm:right-[10%] md:right-[15%] w-20 sm:w-40 md:w-56 h-20 sm:h-40 md:h-56" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#20D38E"
            className="w-full h-full inset-0"
            style={{ opacity: star4Opacity, scale: star4Scale, rotate: star4Rotate, x: star4X, y: star4Y, filter: star4Filter }}
          />
        </div>

        {/* Bottom Left Orange Star — GSAP wrapper for Z-depth */}
        <div ref={star5Wrapper} className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 md:-bottom-16 md:-left-16 w-28 sm:w-56 md:w-80 h-28 sm:h-56 md:h-80" style={{ transformStyle: 'preserve-3d' }}>
          <OrganicStar
            color="#FF7A45"
            className="w-full h-full inset-0"
            style={{ opacity: star5Opacity, scale: star5Scale, rotate: star5Rotate, x: star5X, y: star5Y, filter: star5Filter }}
          />
        </div>

        {/* Central Content Layout */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full select-none">
          
          {/* Top Line: "We turning" (Chars 0..9) */}
          <motion.div
            style={{ y: topTextY, opacity: topTextOpacity }}
            className="font-display font-medium text-[42px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] leading-[1.05] tracking-[-0.035em] text-studio-dark mb-2 sm:mb-4 whitespace-nowrap px-4 sm:px-8"
          >
            <TextReveal text="We turning" startIndex={0} total={TOTAL_CHARS} progress={smoothProgress} />
          </motion.div>

          {/* Middle Line: "complex" + [Expanding Linocut Card / Video Embed Viewport] + "product" */}
          <div className="flex items-center justify-center my-1 sm:my-2 w-full">
            {/* Left Word: "complex" (Chars 10..16) */}
            <motion.span
              style={{ x: leftWordX, opacity: sideWordsOpacity }}
              className="font-display font-medium text-[42px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] leading-[1.05] tracking-[-0.035em] text-studio-dark whitespace-nowrap z-10"
            >
              <TextReveal text="complex" startIndex={10} total={TOTAL_CHARS} progress={smoothProgress} />
            </motion.span>

            {/* Expanding Artwork Preview Container - True 100vw x 100vh Fullscreen */}
            <motion.div
              style={{
                width: cardWidth,
                height: cardHeight,
                opacity: cardOpacity,
                scale: cardScale,
              }}
              className="relative overflow-hidden flex-shrink-0 mx-0 flex items-center justify-center rounded-none z-20"
            >
              <video
                src="/video/PSTUDIO SIZZLE REEL.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Word: " product" (Chars 17..24, includes natural space) */}
            <motion.span
              style={{ x: rightWordX, opacity: sideWordsOpacity }}
              className="font-display font-medium text-[42px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] leading-[1.05] tracking-[-0.035em] text-studio-dark whitespace-nowrap z-10"
            >
              <TextReveal text=" product" startIndex={17} total={TOTAL_CHARS} progress={smoothProgress} />
            </motion.span>
          </div>

          {/* Bottom Line: "into clear videos" (Chars 25..41) */}
          <motion.div
            style={{ y: bottomTextY, opacity: bottomTextOpacity }}
            className="font-display font-medium text-[42px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] leading-[1.05] tracking-[-0.035em] text-studio-dark mt-2 sm:mt-4 whitespace-nowrap px-4 sm:px-8"
          >
            <TextReveal text="into clear videos" startIndex={25} total={TOTAL_CHARS} progress={smoothProgress} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
