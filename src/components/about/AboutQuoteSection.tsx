'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Curated Unsplash images matching the Figma design themes
const IMAGES_PHASE_1 = {
  // Top-left: Minimalist studio desk workspace (grayscale)
  workspace: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
  // Top-right: Creative team smiling outdoors / sea view
  teamOcean: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  // Bottom-left: Team travel & adventure collage
  teamTrip: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
  // Bottom-right: Team dinner & celebration party
  teamDinner: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
}

const IMAGES_PHASE_2 = {
  // Top / Top-left: Design whiteboard & wireframe architecture
  wireframe: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
  // Top-right: UI design guidelines & brand swatches on display
  designBoard: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  // Bottom-left: Motion graphics & video editing timeline
  motionEdit: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
  // Bottom-right: Code & developer terminal monitor
  codeScreen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
}

// Image card component with pure scroll-driven parallax and configurable layer depth
function FloatingImageCard({
  src,
  alt,
  className = '',
  sizes = '320px',
  grayscale = false,
  yMotion,
  zIndex = 10,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  grayscale?: boolean
  yMotion?: any
  zIndex?: number
}) {
  return (
    <motion.div
      style={{ y: yMotion, zIndex }}
      className={`absolute overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-black/5 bg-white will-change-transform rounded-2xl sm:rounded-3xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${grayscale ? 'grayscale contrast-105 hover:grayscale-0 transition-all duration-500' : ''}`}
        sizes={sizes}
      />
    </motion.div>
  )
}

// Stagger animation variants for smooth automatic word-by-word transitions
const quoteContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.048,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: 1,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(5px)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function AboutQuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPhase2, setIsPhase2] = useState(false)

  // Track vertical scroll across 280vh track:
  // 0% -> 20%: Quote 1 to Quote 2 word stagger (fast & early)
  // 0% -> 58%: Images fly continuously up and exit screen
  // 58% -> 68%: Blank clean screen pinned dwell
  // 68% -> 100%: Meet The Team slides up over the pinned screen (Curtain Up Pin)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Automatically toggle quotes earlier when user begins scrolling (threshold: 18%)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.18 && !isPhase2) {
      setIsPhase2(true)
    } else if (latest < 0.18 && isPhase2) {
      setIsPhase2(false)
    }
  })

  // Phase 1 Images: Enter and fly continuously UPWARDS and exit
  const img1_TopLeft_Y = useTransform(scrollYProgress, [0, 0.42], ['40px', '-1100px'])
  const img1_TopRight_Y = useTransform(scrollYProgress, [0, 0.42], ['60px', '-1300px'])
  const img1_BottomLeft_Y = useTransform(scrollYProgress, [0, 0.42], ['80px', '-1400px'])
  const img1_BottomRight_Y = useTransform(scrollYProgress, [0, 0.42], ['100px', '-1250px'])

  // Phase 2 Images: Enter from below and fly completely UPWARDS and OUT of screen by 58%
  const img2_Top_Y = useTransform(scrollYProgress, [0.18, 0.38, 0.58], ['1000px', '0px', '-1200px'])
  const img2_TopRight_Y = useTransform(scrollYProgress, [0.20, 0.40, 0.58], ['1150px', '0px', '-1300px'])
  const img2_BottomLeft_Y = useTransform(scrollYProgress, [0.22, 0.42, 0.58], ['1250px', '0px', '-1250px'])
  const img2_BottomRight_Y = useTransform(scrollYProgress, [0.24, 0.44, 0.58], ['1350px', '0px', '-1350px'])

  return (
    <section className="relative w-full bg-background selection:bg-accent-green selection:text-black">
      
      {/* ========================================================================= */}
      {/* DESKTOP PINNED 2-PHASE QUOTE SEQUENCE (Sticky Viewport)                   */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="hidden md:block relative w-full h-[280vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
          
          {/* Phase 1 Images (Multi-Layer Depth) */}
          {/* Layer 1: Behind text (z-10) */}
          <FloatingImageCard
            src={IMAGES_PHASE_1.workspace}
            alt="Studio Workspace"
            className="left-[6%] lg:left-[8%] top-[12%] lg:top-[14%] w-48 lg:w-60 h-48 lg:h-60"
            sizes="(max-width: 1024px) 192px, 240px"
            grayscale
            yMotion={img1_TopLeft_Y}
            zIndex={10}
          />
          <FloatingImageCard
            src={IMAGES_PHASE_1.teamDinner}
            alt="Team Dinner Celebration"
            className="right-[10%] lg:right-[14%] bottom-[10%] lg:bottom-[12%] w-48 lg:w-60 h-48 lg:h-60"
            sizes="(max-width: 1024px) 192px, 240px"
            yMotion={img1_BottomRight_Y}
            zIndex={10}
          />

          {/* Layer 3: In front of text (z-30) */}
          <FloatingImageCard
            src={IMAGES_PHASE_1.teamOcean}
            alt="PSTUDIO Team"
            className="right-[6%] lg:right-[10%] top-[6%] lg:top-[8%] w-64 lg:w-80 h-64 lg:h-80 shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
            sizes="(max-width: 1024px) 256px, 320px"
            yMotion={img1_TopRight_Y}
            zIndex={30}
          />
          <FloatingImageCard
            src={IMAGES_PHASE_1.teamTrip}
            alt="Team Adventure"
            className="left-[10%] lg:left-[14%] bottom-[6%] lg:bottom-[8%] w-64 lg:w-80 h-64 lg:h-80 shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
            sizes="(max-width: 1024px) 256px, 320px"
            yMotion={img1_BottomLeft_Y}
            zIndex={30}
          />

          {/* Phase 2 Images (Multi-Layer Depth) */}
          {/* Layer 1: Behind text (z-10) */}
          <FloatingImageCard
            src={IMAGES_PHASE_2.designBoard}
            alt="UI Design Guidelines"
            className="right-[6%] lg:right-[9%] top-[10%] lg:top-[12%] w-64 lg:w-80 h-64 lg:h-80"
            sizes="(max-width: 1024px) 256px, 320px"
            yMotion={img2_TopRight_Y}
            zIndex={10}
          />
          <FloatingImageCard
            src={IMAGES_PHASE_2.codeScreen}
            alt="Code and Digital Craft"
            className="right-[12%] lg:right-[16%] bottom-[8%] lg:bottom-[10%] w-52 lg:w-64 h-52 lg:h-64"
            sizes="(max-width: 1024px) 208px, 256px"
            yMotion={img2_BottomRight_Y}
            zIndex={10}
          />

          {/* Layer 3: In front of text (z-30) */}
          <FloatingImageCard
            src={IMAGES_PHASE_2.wireframe}
            alt="Wireframes and Planning"
            className="left-[14%] lg:left-[18%] top-[4%] lg:top-[6%] w-60 lg:w-72 h-60 lg:h-72 shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
            sizes="(max-width: 1024px) 240px, 288px"
            yMotion={img2_Top_Y}
            zIndex={30}
          />
          <FloatingImageCard
            src={IMAGES_PHASE_2.motionEdit}
            alt="Motion Graphics Production"
            className="left-[6%] lg:left-[9%] bottom-[10%] lg:bottom-[12%] w-52 lg:w-64 h-52 lg:h-64 shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
            sizes="(max-width: 1024px) 192px, 240px"
            yMotion={img2_BottomLeft_Y}
            zIndex={30}
          />

          {/* Central Stationary Headline Area (Middle Layer: z-20) */}
          <div className="relative z-20 max-w-[840px] text-center px-6 flex items-center justify-center min-h-[220px] pointer-events-none select-none">
            <AnimatePresence mode="wait">
              {!isPhase2 ? (
                <motion.div
                  key="quote-phase-1"
                  variants={quoteContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col items-center"
                >
                  <h2 className="font-display font-medium text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] leading-[1.08] tracking-[-0.035em] text-[#111111] flex flex-wrap justify-center gap-x-[0.32em] gap-y-1">
                    {['We', "didn't", 'start', 'as', 'a', 'strategy', 'studio'].map((word, idx) => (
                      <motion.span key={idx} variants={wordVariants} className="inline-block will-change-transform">
                        {word}
                      </motion.span>
                    ))}
                  </h2>
                </motion.div>
              ) : (
                <motion.div
                  key="quote-phase-2"
                  variants={quoteContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col items-center"
                >
                  <h2 className="font-display font-medium text-[40px] sm:text-[50px] md:text-[60px] lg:text-[68px] leading-[1.1] tracking-[-0.035em] text-[#111111] flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-x-[0.32em]">
                      {['We', 'started', 'as'].map((word, idx) => (
                        <motion.span key={idx} variants={wordVariants} className="inline-block will-change-transform">
                          {word}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div variants={wordVariants} className="mt-3 sm:mt-4 flex flex-col items-center will-change-transform">
                      <span className="font-display font-normal text-[60px] sm:text-[78px] md:text-[98px] lg:text-[118px] tracking-[-0.035em] text-black uppercase leading-[0.9]">
                        MAKERS
                      </span>
                      <img
                        src="/image/underline.svg"
                        alt=""
                        aria-hidden="true"
                        className="w-[108%] max-w-[340px] sm:max-w-[440px] md:max-w-[560px] h-auto -mt-1.5 sm:-mt-2 pointer-events-none select-none"
                      />
                    </motion.div>
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE STACKED VIEW                                            */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full px-6 py-16 flex flex-col gap-20">
        
        {/* Mobile Section 1: "We didn't start as a strategy studio" */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display font-medium text-[36px] sm:text-[42px] leading-[1.1] text-[#111111] mb-8">
            We didn&apos;t start as a strategy studio
          </h2>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_1.workspace}
                alt="Workspace"
                fill
                className="object-cover grayscale"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_1.teamOcean}
                alt="Team"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_1.teamTrip}
                alt="Trip"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_1.teamDinner}
                alt="Dinner"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* Mobile Section 2: "We started as MAKERS" */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display font-medium text-[34px] sm:text-[40px] leading-[1.1] text-[#111111] mb-8 flex flex-col items-center">
            <span>We started as</span>
            <div className="mt-2 inline-flex flex-col items-center">
              <span className="font-display font-normal text-[52px] sm:text-[64px] uppercase text-black leading-none">
                MAKERS
              </span>
              <img
                src="/image/underline.svg"
                alt=""
                aria-hidden="true"
                className="w-[108%] max-w-[280px] h-auto -mt-1 pointer-events-none select-none"
              />
            </div>
          </h2>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_2.wireframe}
                alt="Wireframes"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_2.designBoard}
                alt="Design Guidelines"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_2.motionEdit}
                alt="Motion edit"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full aspect-square overflow-hidden border border-black/5 shadow-sm rounded-xl sm:rounded-2xl">
              <Image
                src={IMAGES_PHASE_2.codeScreen}
                alt="Code screen"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}
