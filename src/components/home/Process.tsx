'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Track vertical scroll within this container for 5 states
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // 1. Calculate discrete center step targets across 5 states (0%, -20%, -40%, -60%, -80% of 500vw)
  // Both State 1 (Intro) and State 5 (Final Step 04) have dedicated resting buffers
  const targetStep = useTransform(
    scrollYProgress,
    [
      0.00, 0.10,  // State 1: Intro - Initial holding pause
      0.22, 0.34,  // State 2: Step 01 - Center
      0.44, 0.56,  // State 3: Step 02 - Center
      0.66, 0.78,  // State 4: Step 03 - Center
      0.86, 1.00   // State 5: Step 04 - Dedicated resting delay before scrolling down to next section
    ],
    [
      0, 0,
      -20, -20,
      -40, -40,
      -60, -60,
      -80, -80
    ]
  )

  // 2. Physical spring physics for buttery smooth magnetic self-centering deceleration
  const springProgress = useSpring(targetStep, {
    stiffness: 130,
    damping: 24,
    mass: 0.7,
  })

  // 3. Transform spring progress into CSS horizontal translation (500vw total width)
  const x = useTransform(springProgress, (val) => `${val}%`)

  // 4. Progress bar fill line smoothly synced with spring motion (0 to -80 -> 0 to 1) with safe clamp
  const progressLineScale = useTransform(springProgress, [0, -80], [0, 1], { clamp: true })

  // 5. Single traveling star position and smooth rotation across the 5 milestones (0% -> 100%)
  const starLeft = useTransform(springProgress, [0, -80], ['0%', '100%'], { clamp: true })
  const starRotate = useTransform(springProgress, [0, -80], [0, 360], { clamp: true })

  // 6. Milestone detection: triggers lively physical bounce when star arrives at any checkpoint
  const milestoneProximity = useTransform(springProgress, (val) => {
    const milestones = [0, -20, -40, -60, -80]
    const minDist = Math.min(...milestones.map((m) => Math.abs(val - m)))
    if (minDist > 4.5) return 0
    const p = (4.5 - minDist) / 4.5
    return p * p * (3 - 2 * p)
  })

  const targetStarScale = useTransform(milestoneProximity, [0, 1], [1.0, 1.55])

  const starBounceScale = useSpring(targetStarScale, {
    stiffness: 380,
    damping: 12, // Bouncy spring with overshoot at each milestone
    mass: 0.5,
  })

  return (
    <section 
      ref={targetRef} 
      id="process" 
      className="relative w-full h-[580vh] bg-[#20D38E] z-30"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#20D38E]">
        
        {/* Horizontal Moving Track - 5 States (500vw total width) */}
        <motion.div 
          style={{ x }} 
          className="flex flex-row h-full w-[500vw] will-change-transform"
        >
          
          {/* ================================================================= */}
          {/* STATE 1: TITLE "A clear process..." + SUBTITLE                     */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 text-center select-none">
            <div className="max-w-[920px] mx-auto flex flex-col items-center -translate-y-4 sm:-translate-y-6">
              <h2 className="font-display font-medium text-[44px] sm:text-[58px] md:text-[70px] lg:text-[84px] xl:text-[96px] leading-[1.06] tracking-[-0.035em] text-[#0A1F18] mb-6 sm:mb-8">
                A clear process from<br className="hidden sm:inline" /> idea to final file
              </h2>
              
              <p className="font-sans text-[17px] sm:text-[20px] lg:text-[24px] text-[#083323] font-normal leading-relaxed tracking-[-0.01em] max-w-[760px]">
                We keep the process simple, collaborative, and predictable — so you always know what&apos;s happening next.
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* STATE 2: STEP 01 - DISCOVERY & SCRIPT                             */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 select-none">
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full -translate-y-5 sm:-translate-y-7 lg:-translate-y-8">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[660px]">
                <h3 className="font-display font-medium text-[32px] sm:text-[38px] lg:text-[44px] text-[#0A1F18] tracking-tight leading-[1.12] mb-2 sm:mb-2.5">
                  01. Discovery &amp; script
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#083323] font-normal leading-relaxed">
                  We start with your goals, audience, and distribution plan. Then we write a script that ties your value prop to a clear call to action.
                </p>
              </div>

              {/* Arch Window Visual */}
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] shadow-[inset_0_16px_32px_rgba(0,0,0,0.3)]" />
                <img
                  src="/image/image 428.png"
                  alt="01. Discovery & script"
                  className="w-full h-full object-cover object-left"
                  draggable={false}
                />
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* STATE 3: STEP 02 - VISUAL DIRECTION & STORYBOARD                  */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 select-none">
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full -translate-y-5 sm:-translate-y-7 lg:-translate-y-8">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[660px]">
                <h3 className="font-display font-medium text-[32px] sm:text-[38px] lg:text-[44px] text-[#0A1F18] tracking-tight leading-[1.12] mb-2 sm:mb-2.5">
                  02. Visual direction &amp; storyboard
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#083323] font-normal leading-relaxed">
                  We define the visual style, then map every scene to the script so your team can see the full story before we animate.
                </p>
              </div>

              {/* Arch Window Visual */}
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] shadow-[inset_0_16px_32px_rgba(0,0,0,0.3)]" />
                <img
                  src="/image/image 428.png"
                  alt="02. Visual direction & storyboard"
                  className="w-full h-full object-cover object-[33%_center]"
                  draggable={false}
                />
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* STATE 4: STEP 03 - VOICEOVER & ANIMATION                          */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 select-none">
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full -translate-y-5 sm:-translate-y-7 lg:-translate-y-8">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[660px]">
                <h3 className="font-display font-medium text-[32px] sm:text-[38px] lg:text-[44px] text-[#0A1F18] tracking-tight leading-[1.12] mb-2 sm:mb-2.5">
                  03. Voiceover &amp; animation
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#083323] font-normal leading-relaxed">
                  Once the storyboard is approved, we record the voiceover and bring everything to life with custom 2D animation.
                </p>
              </div>

              {/* Arch Window Visual */}
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] shadow-[inset_0_16px_32px_rgba(0,0,0,0.3)]" />
                <img
                  src="/image/image 428.png"
                  alt="03. Voiceover & animation"
                  className="w-full h-full object-cover object-[66%_center]"
                  draggable={false}
                />
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* STATE 5: STEP 04 - DELIVERY & VARIATIONS (New 4th Phase)           */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 select-none">
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full -translate-y-5 sm:-translate-y-7 lg:-translate-y-8">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[660px]">
                <h3 className="font-display font-medium text-[32px] sm:text-[38px] lg:text-[44px] text-[#0A1F18] tracking-tight leading-[1.12] mb-2 sm:mb-2.5">
                  04. Delivery &amp; variations
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#083323] font-normal leading-relaxed">
                  You get ready-to-use files for your homepage, sales deck, social, and ads — plus short cutdowns if needed.
                </p>
              </div>

              {/* Arch Window Visual */}
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] shadow-[inset_0_16px_32px_rgba(0,0,0,0.3)]" />
                <img
                  src="/image/image 428.png"
                  alt="04. Delivery & variations"
                  className="w-full h-full object-cover object-right"
                  draggable={false}
                />
              </div>

            </div>
          </div>

        </motion.div>

        {/* =================================================================== */}
        {/* BOTTOM PROGRESS BAR WITH 1 TRAVELING STAR ACROSS 5 MILESTONES       */}
        {/* =================================================================== */}
        <div className="absolute bottom-6 sm:bottom-8 left-[32px] right-[32px] sm:left-[44px] sm:right-[44px] z-40 pointer-events-none">
          <div className="relative w-full h-[4px] sm:h-[5px] flex items-center">
            
            {/* Orange Progress Fill Line */}
            <motion.div 
              style={{ scaleX: progressLineScale, transformOrigin: 'left' }} 
              className="h-full w-full bg-[#F78C44] rounded-full"
            />

            {/* Single Traveling Star: Riding on top of the slider bar with generous breathing room */}
            <motion.div
              style={{
                left: starLeft,
                bottom: '100%',
                x: '-50%',
              }}
              className="absolute mb-3.5 sm:mb-4 z-40 pointer-events-none select-none flex items-center justify-center"
            >
              <motion.div
                style={{
                  scale: starBounceScale,
                  rotate: starRotate,
                }}
                className="flex items-center justify-center"
              >
                <img
                  src="/image/star.svg"
                  alt="Process Milestone Star"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
