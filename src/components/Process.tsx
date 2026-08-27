'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// Reusable Star Milestone Checkpoint with Illustration placeholder (/image/star.svg)
function StarMilestone({
  springProgress,
  targetValue,
  positionClass,
}: {
  springProgress: MotionValue<number>
  targetValue: number
  positionClass: string
}) {
  // Safe single-function transforms for robust active highlight
  const opacity = useTransform(springProgress, (val) => {
    const dist = Math.abs(val - targetValue)
    return dist < 6 ? 1 : Math.max(0.35, 1 - (dist / 16) * 0.65)
  })
  
  const scale = useTransform(springProgress, (val) => {
    const dist = Math.abs(val - targetValue)
    return dist < 6 ? 1.25 : Math.max(0.85, 1.25 - (dist / 16) * 0.4)
  })

  return (
    <div className={`absolute bottom-full mb-1 sm:mb-2 flex flex-col items-center select-none ${positionClass}`}>
      <motion.div style={{ opacity, scale }} className="relative flex items-center justify-center">
        <img
          src="/image/star.svg"
          alt="Process Milestone Illustration"
          className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-[0_2px_8px_rgba(247,140,68,0.4)]"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}

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
      0.86, 1.00   // State 5: Step 04 - Full final resting delay before scrolling down
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

  // 4. Progress bar fill line smoothly synced with spring motion (0 to -80 -> 0 to 1)
  const progressLineScale = useTransform(springProgress, [0, -80], [0, 1])

  return (
    <section 
      ref={targetRef} 
      id="process" 
      className="relative w-full h-[580vh] bg-[#20D38E] z-20"
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
            <div className="max-w-[920px] mx-auto flex flex-col items-center">
              <h2 className="font-display font-medium text-[44px] sm:text-[58px] md:text-[70px] lg:text-[84px] xl:text-[96px] leading-[1.06] tracking-[-0.035em] text-[#111827] mb-6 sm:mb-8">
                A clear process from<br className="hidden sm:inline" /> idea to final file
              </h2>
              
              <p className="font-sans text-[17px] sm:text-[20px] lg:text-[24px] text-[#0A3D2A] font-normal leading-relaxed tracking-[-0.01em] max-w-[760px]">
                We keep the process simple, collaborative, and predictable — so you always know what&apos;s happening next.
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* STATE 2: STEP 01 - DISCOVERY & SCRIPT                             */}
          {/* ================================================================= */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 select-none">
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[620px]">
                <h3 className="font-display font-medium text-[26px] sm:text-[32px] lg:text-[38px] text-[#111827] tracking-tight mb-2">
                  01. Discovery &amp; script
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#0A3D2A] font-normal leading-relaxed">
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
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[620px]">
                <h3 className="font-display font-medium text-[26px] sm:text-[32px] lg:text-[38px] text-[#111827] tracking-tight mb-2">
                  02. Visual direction &amp; storyboard
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#0A3D2A] font-normal leading-relaxed">
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
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[620px]">
                <h3 className="font-display font-medium text-[26px] sm:text-[32px] lg:text-[38px] text-[#111827] tracking-tight mb-2">
                  03. Voiceover &amp; animation
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#0A3D2A] font-normal leading-relaxed">
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
            <div className="flex flex-col items-center max-h-[88vh] justify-center max-w-[760px] w-full">
              
              {/* Title & Description ON TOP */}
              <div className="text-center mb-4 sm:mb-6 max-w-[620px]">
                <h3 className="font-display font-medium text-[26px] sm:text-[32px] lg:text-[38px] text-[#111827] tracking-tight mb-2">
                  04. Delivery &amp; variations
                </h3>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#0A3D2A] font-normal leading-relaxed">
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
        {/* BOTTOM PROGRESS BAR WITH 5 STAR MILESTONES                          */}
        {/* =================================================================== */}
        <div className="absolute bottom-6 sm:bottom-8 left-[24px] right-[24px] z-30 pointer-events-none">
          <div className="relative w-full h-[4px] sm:h-[5px] bg-black/10 rounded-full flex items-center">
            
            {/* Orange Progress Fill Line */}
            <motion.div 
              style={{ scaleX: progressLineScale, transformOrigin: 'left' }} 
              className="h-full w-full bg-[#F78C44] rounded-full"
            />

            {/* Star Milestone 1 (Intro) */}
            <StarMilestone
              springProgress={springProgress}
              targetValue={0}
              positionClass="left-0 -translate-x-1/2"
            />

            {/* Star Milestone 2 (Step 01) */}
            <StarMilestone
              springProgress={springProgress}
              targetValue={-20}
              positionClass="left-[25%] -translate-x-1/2"
            />

            {/* Star Milestone 3 (Step 02) */}
            <StarMilestone
              springProgress={springProgress}
              targetValue={-40}
              positionClass="left-[50%] -translate-x-1/2"
            />

            {/* Star Milestone 4 (Step 03) */}
            <StarMilestone
              springProgress={springProgress}
              targetValue={-60}
              positionClass="left-[75%] -translate-x-1/2"
            />

            {/* Star Milestone 5 (Step 04) */}
            <StarMilestone
              springProgress={springProgress}
              targetValue={-80}
              positionClass="right-0 translate-x-1/2"
            />

          </div>
        </div>

      </div>
    </section>
  )
}
