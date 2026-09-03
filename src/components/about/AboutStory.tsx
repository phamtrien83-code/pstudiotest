'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

// Star Accent with scroll-linked rotation (No idle floating)
function StarAccent({
  className,
  delay = 0,
  size = 48,
  rotate,
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative select-none pointer-events-none z-10 flex items-center justify-center ${className || ''}`}
    >
      <motion.div
        style={{ rotate }}
        className="relative flex items-center justify-center"
      >
        <img
          src="/image/star.svg"
          alt="Star Decoration"
          style={{ width: size, height: size }}
          className="object-contain"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  )
}

// Continuous Green Ribbon Path Component from newly drawn vectorline.svg
// The ribbon is drawn stroke-first along its path, in lockstep with the
// horizontal scroll — the line's leading tip advances as each screen slides in.
function RibbonCanvas({ progress }: { progress: MotionValue<number> }) {
  // Lead the scroll — the line finishes drawing well before the track does,
  // so its tip is always ahead of the screen sliding into view.
  const pathLength = useTransform(progress, [0, 0.65], [0, 1], { clamp: true })

  return (
    <div className="absolute top-[13vh] lg:top-[15vh] left-[-7vw] w-[314vw] h-[85vh] pointer-events-none z-0 overflow-visible will-change-transform">
      <svg
        viewBox="0 0 4830 834"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="ribbon-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#20D38E" floodOpacity="0.25" />
          </filter>
        </defs>

        <motion.path
          d="M14.9404 306.502C197.107 239.002 476.942 214.292 1034.94 482.502C1592.94 750.711 2133.94 651.675 2266.44 359.175C2398.94 51.6755 1870.94 -172.825 1731.94 207.175C1592.94 547.175 2453.65 654.502 2995.94 654.502C3400 654.502 3700 450 4025 450C4350 450 4650 624.502 4830 680"
          stroke="#20D38E"
          strokeWidth="86"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ribbon-glow)"
          style={{ pathLength }}
        />
      </svg>
    </div>
  )
}

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track vertical scroll across the pinning container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Direct horizontal translation from 0vw to -200vw with zero latency
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw'])

  // Pure clockwise scroll-driven rotation for all decorative stars
  const rotateCw = useTransform(scrollYProgress, [0, 1], [0, 720])

  return (
    <div id="about-story" className="relative w-full bg-background selection:bg-accent-green selection:text-black">
      
      {/* ========================================================================= */}
      {/* DESKTOP / TABLET PINNED HORIZONTAL STORY TRACK                            */}
      {/* ========================================================================= */}
      <section
        ref={containerRef}
        className="hidden md:block relative w-full h-[440vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-background">
          
          {/* Continuous Moving Track (300vw total width for 3 distinct full-bleed screens) */}
          <motion.div
            style={{ x }}
            className="relative flex flex-row h-full w-[300vw] will-change-transform"
          >
            {/* The SVG Ribbon looping continuously across all 3 screens */}
            <RibbonCanvas progress={scrollYProgress} />

            {/* ================================================================= */}
            {/* SCREEN 1: ORIGIN & TURNING POINT                                  */}
            {/* ================================================================= */}
            <div className="relative w-screen h-full flex-shrink-0 px-[24px]">
              <div className="w-full h-full grid grid-cols-12 gap-[24px] relative">
                
                {/* Block 1: 4 years ago... (Column 2 to 5 -> col-start-2 col-span-4) */}
                <div className="row-start-1 col-start-2 col-span-4 pt-[20vh] lg:pt-[22vh] relative z-20 w-full pointer-events-auto">
                  <p className="font-sans text-[18px] lg:text-[20px] xl:text-[22px] text-studio-dark font-normal leading-[1.65] tracking-[-0.015em]">
                    4 years ago, <span className="font-semibold text-black">PSTUDIO</span> was a small motion graphics team in Ho Chi Minh City. We loved the craft &mdash; keyframes, easing curves, and color palettes. We could make anything look beautiful.
                  </p>
                </div>

                {/* Decorative Orange Star: Bottom Left in Column 3 (Clockwise) */}
                <div className="row-start-1 col-start-3 col-span-1 flex flex-col justify-end pb-[10vh] lg:pb-[14vh] items-center pointer-events-none z-10">
                  <StarAccent size={150} delay={0.3} rotate={rotateCw} />
                </div>

                {/* Decorative Orange Star: Top Right in Column 10 (Clockwise) */}
                <div className="row-start-1 col-start-10 col-span-1 pt-[12vh] lg:pt-[15vh] flex justify-center items-start pointer-events-none z-10">
                  <StarAccent size={150} delay={0.2} rotate={rotateCw} />
                </div>

                {/* Block 2: But we kept running into the same problem... (Column 9 to 12 -> col-start-9 col-span-4) */}
                <div className="row-start-1 col-start-9 col-span-4 pt-[44vh] lg:pt-[47vh] relative z-20 w-full pointer-events-auto">
                  <p className="font-sans text-[18px] lg:text-[20px] xl:text-[22px] text-studio-dark font-normal leading-[1.65] tracking-[-0.015em] mb-4">
                    But we kept running into the same problem: we&apos;d deliver a stunning video, and the client would come back and say, <span className="italic font-medium text-black">&ldquo;It looks amazing &mdash; but it didn&apos;t move the numbers.&rdquo;</span>
                  </p>
                  <p className="font-sans text-[18px] lg:text-[20px] xl:text-[22px] font-semibold text-black leading-snug">
                    That moment changed how we think about video.
                  </p>
                </div>

              </div>
            </div>

            {/* ================================================================= */}
            {/* SCREEN 2: THE LOOP & EVOLUTION                                    */}
            {/* ================================================================= */}
            <div className="relative w-screen h-full flex-shrink-0 px-[24px]">
              <div className="w-full h-full grid grid-cols-12 gap-[24px] relative">
                
                {/* Decorative Orange Star: Top Right in Col 11 (Clockwise) */}
                <div className="row-start-1 col-start-11 col-span-1 pt-[12vh] lg:pt-[14vh] flex justify-center items-start pointer-events-none z-10">
                  <StarAccent size={90} delay={0.2} rotate={rotateCw} />
                </div>

                {/* Block 3: Inside the Green Ribbon Loop */}
                <div className="row-start-1 col-start-1 lg:col-start-1 col-span-6 lg:col-span-5 pt-[33vh] lg:pt-[34vh] -ml-[3vw] lg:ml-[3vw] relative z-20 pointer-events-auto flex justify-center">
                  <p className="max-w-[380px] lg:max-w-[420px] font-sans text-[18px] lg:text-[20px] xl:text-[22px] text-studio-dark font-normal leading-[1.6] tracking-[-0.015em]">
                    We stopped asking <span className="font-medium text-black">&ldquo;what style do you want?&rdquo;</span> and started asking <span className="font-semibold text-black">&ldquo;what business problem are we solving?&rdquo;</span> We stopped delivering files and started delivering results.
                  </p>
                </div>

                {/* Decorative Orange Star: Bottom Center below Loop in Col 4 (Clockwise) */}
                <div className="row-start-1 col-start-4 col-span-1 flex flex-col justify-end pb-[10vh] lg:pb-[12vh] items-center pointer-events-none z-10">
                  <StarAccent size={80} delay={0.4} rotate={rotateCw} />
                </div>

                {/* Block 4: Today, PSTUDIO is a team of 8... (Column 9 to 12) */}
                <div className="row-start-1 col-start-9 col-span-4 pt-[48vh] lg:pt-[52vh] relative z-20 w-full pointer-events-auto">
                  <p className="font-sans text-[18px] lg:text-[20px] xl:text-[22px] text-studio-dark font-normal leading-[1.65] tracking-[-0.015em]">
                    Today, <span className="font-semibold text-black">PSTUDIO</span> is a team of 8 members working with SaaS, tech, healthcare, and industrial companies across the US, EU, and Asia. We&apos;ve shipped 200+ videos and learned something from every single one:
                  </p>
                </div>

              </div>
            </div>

            {/* ================================================================= */}
            {/* SCREEN 3: THE PHILOSOPHY HEADLINE                                 */}
            {/* ================================================================= */}
            <div className="relative w-screen h-full flex-shrink-0 px-[24px]">
              <div className="w-full h-full grid grid-cols-12 gap-[24px] relative items-center">
                
                {/* Decorative Orange Star: Left of Headline in Col 2 (Clockwise) */}
                <div className="row-start-1 col-start-2 col-span-1 flex justify-center items-center pointer-events-none z-10">
                  <StarAccent size={84} delay={0.2} rotate={rotateCw} />
                </div>

                {/* Big Bold Headline Statement in Col 3 to 10 */}
                <div className="row-start-1 col-start-3 col-span-8 relative z-20 text-center flex flex-col justify-center items-center">
                  <h2 className="font-display font-medium text-[38px] sm:text-[46px] md:text-[54px] lg:text-[62px] xl:text-[70px] leading-[1.14] tracking-[-0.03em] text-[#111111]">
                    The best video isn&apos;t the prettiest. It&apos;s the one your customer finally understands.
                  </h2>
                </div>

                {/* Decorative Orange Star: Right beneath Ribbon Wave in Col 11 (Clockwise) */}
                <div className="row-start-1 col-start-11 col-span-1 flex flex-col justify-end pb-[12vh] items-center pointer-events-none z-10">
                  <StarAccent size={90} delay={0.4} rotate={rotateCw} />
                </div>

              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE NARRATIVE TIMELINE                                      */}
      {/* ========================================================================= */}
      <section className="md:hidden relative w-full px-6 py-16 flex flex-col gap-12">
        
        {/* Section 1 */}
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="w-10 h-1.5 bg-accent-green rounded-full mb-4" />
          <p className="font-sans text-[17px] text-studio-dark leading-[1.65]">
            4 years ago, <span className="font-semibold text-black">PSTUDIO</span> was a small motion graphics team in Ho Chi Minh City. We loved the craft — keyframes, easing curves, and color palettes. We could make anything look beautiful.
          </p>
        </div>

        {/* Section 2 */}
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <p className="font-sans text-[17px] text-studio-dark leading-[1.65] mb-3">
            But we kept running into the same problem: we&apos;d deliver a stunning video, and the client would come back and say, <span className="italic font-medium text-black">&ldquo;It looks amazing — but it didn&apos;t move the numbers.&rdquo;</span>
          </p>
          <p className="font-sans text-[17px] font-semibold text-black">
            That moment changed how we think about video.
          </p>
        </div>

        {/* Section 3: Loop Highlight Card */}
        <div className="relative bg-[#20D38E]/15 border-2 border-accent-green/40 p-7 rounded-3xl shadow-sm">
          <img
            src="/image/star.svg"
            alt="Star"
            className="w-8 h-8 object-contain absolute -top-4 -right-2"
          />
          <p className="font-sans text-[17px] text-studio-dark font-medium leading-[1.65]">
            We stopped asking <span className="text-black font-semibold">&ldquo;what style do you want?&rdquo;</span> and started asking <span className="text-black font-semibold">&ldquo;what business problem are we solving?&rdquo;</span> We stopped delivering files and started delivering results.
          </p>
        </div>

        {/* Section 4 */}
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <p className="font-sans text-[17px] text-studio-dark leading-[1.65]">
            Today, <span className="font-semibold text-black">PSTUDIO</span> is a team of 8 members working with SaaS, tech, healthcare, and industrial companies across the US, EU, and Asia. We&apos;ve shipped 200+ videos and learned something from every single one:
          </p>
        </div>

        {/* Section 5: Statement */}
        <div className="relative py-8 text-center">
          <img
            src="/image/star.svg"
            alt="Star"
            className="w-10 h-10 object-contain mx-auto mb-4"
          />
          <h2 className="font-display font-medium text-[30px] leading-[1.2] text-[#111111]">
            The best video isn&apos;t the prettiest. It&apos;s the one your customer finally understands.
          </h2>
        </div>

      </section>

    </div>
  )
}
