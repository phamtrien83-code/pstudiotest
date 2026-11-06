'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

// Connecting white lines from 2.1.svg
const WHITE_CONNECTING_LINES = [
  {
    id: 'concept-to-archive',
    d: 'M240.99,645.93l19.4,4.36c23.25,5.22,39.76,25.86,39.76,49.69v77.11c0,65.95,53.46,119.42,119.42,119.42h406.93',
    delay: 0.1,
    hasEndDot: true,
  },
  {
    id: 'concept-to-center',
    d: 'M240.99,645.93l24.47-6.63c20.48-5.55,34.7-24.14,34.7-45.36h0c0-23.32,17.1-43.11,40.18-46.5l51.67-7.57',
    delay: 0.15,
    hasEndDot: true,
  },
  {
    id: 'sync-to-visual',
    d: 'M 591.22 167.07 L 1573.5 167.07',
    delay: 0.2,
    hasEndDot: false,
  },
  {
    id: 'sync-to-center',
    d: 'M591.22,196.89c277.86,0,368.78,36.11,368.78,155.85',
    delay: 0.1,
    hasEndDot: true,
  },
  {
    id: 'archive-to-artifacts',
    d: 'M1093.5,896.9c179.83,0,169.17-53.93,351.17-53.93',
    delay: 0.2,
    hasEndDot: true,
  },
  {
    id: 'visual-to-center',
    d: 'M1707,353c0,120.44-2.11,186.87-179,186.87',
    delay: 0.15,
    hasEndDot: true,
  },
  {
    id: 'artifacts-to-center',
    d: 'M1707,789.05c0-160.61-2.11-249.18-179-249.18',
    delay: 0.15,
    hasEndDot: true,
  },
]

// Origin yellow nodes (output connection ports)
const ORIGIN_YELLOW_NODES = [
  { cx: 591.22, cy: 167.07 },
  { cx: 591.22, cy: 196.89 },
  { cx: 240.99, cy: 645.93 },
  { cx: 1093.5, cy: 896.5 },
  { cx: 1707, cy: 353 },
  { cx: 1708.17, cy: 789.05 },
]

// Destination yellow nodes (input dock ports)
const DESTINATION_YELLOW_NODES = [
  { cx: 826.5, cy: 896.5 },
  { cx: 392, cy: 539.87 },
  { cx: 960, cy: 353 },
  { cx: 1442.83, cy: 842.97 },
  { cx: 1528, cy: 539.87 },
]

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const isIntroInView = useInView(introRef, { amount: 0.25, once: false })
  
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
      className="relative w-full h-[580vh] bg-accent-green z-30"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-accent-green">
        
        {/* Horizontal Moving Track - 5 States (500vw total width) */}
        <motion.div 
          style={{ x }} 
          className="flex flex-row h-full w-[500vw] will-change-transform"
        >
          
          {/* ================================================================= */}
          {/* STATE 1: TITLE "A clear process..." + SUBTITLE + DIAGRAM          */}
          {/* ================================================================= */}
          <div ref={introRef} className="relative w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden select-none bg-[#20D38E]">
            {/* Desktop / Tablet Full Diagram SVG (Exact 1920x1080 Figma & SVG Layout) */}
            <svg
              viewBox="0 0 1920 1080"
              className="hidden md:block w-full h-full max-w-full max-h-full object-contain pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <clipPath id="process-clip-bottom">
                  <rect x="826.5" y="763" width="267" height="267" rx="20" ry="20" fill="none" />
                </clipPath>
                <clipPath id="process-clip-top-right">
                  <rect x="1573.5" y="86" width="267" height="267" rx="20" ry="20" fill="none" />
                </clipPath>
                <clipPath id="process-clip-prod-icon">
                  <rect x="1451.73" y="799.03" width="87.9" height="87.9" rx="3.33" ry="3.33" fill="none" />
                </clipPath>
                <clipPath id="process-clip-prod-inner">
                  <rect x="1446.73" y="794.03" width="97.9" height="97.9" fill="none" />
                </clipPath>
                <clipPath id="process-clip-left">
                  <rect x="80" y="564.86" width="162.14" height="162.14" rx="20" ry="20" fill="none" />
                </clipPath>
                <clipPath id="process-clip-brace-left">
                  <path
                    d="M234.07,217.15c-9.16,0-13.44-4.87-13.44-12.52v-11.93c0-3.28-1.09-4.29-4.71-4.29h-2.86v-8.91h2.86c3.61,0,4.71-1.01,4.71-4.29v-11.93c0-7.65,4.29-12.52,13.44-12.52h1.68v8.74h-2.1c-3.28,0-4.62,1.09-4.62,4.7v11.51c0,5.88-3.11,7.9-7.65,7.9v.67c4.54,0,7.65,2.02,7.65,7.9v11.51c0,3.61,1.34,4.71,4.62,4.71h2.1v8.74h-1.68Z"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="process-clip-brace-left-rect">
                  <rect x="208.06" y="145.77" width="32.69" height="76.38" fill="none" />
                </clipPath>
                <clipPath id="process-clip-brace-right">
                  <path
                    d="M257.06,217.15v-8.74h2.1c3.28,0,4.62-1.09,4.62-4.71v-11.51c0-5.88,3.11-7.9,7.65-7.9v-.67c-4.54,0-7.65-2.02-7.65-7.9v-11.51c0-3.61-1.34-4.7-4.62-4.7h-2.1v-8.74h1.68c9.16,0,13.44,4.87,13.44,12.52v11.93c0,3.28,1.09,4.29,4.71,4.29h2.86v8.91h-2.86c-3.61,0-4.71,1.01-4.71,4.29v11.93c0,7.65-4.29,12.52-13.44,12.52h-1.68Z"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="process-clip-brace-right-rect">
                  <rect x="255.81" y="149.52" width="25.19" height="68.88" fill="none" />
                </clipPath>
              </defs>

              {/* Center Framed Title & Subtitle */}
              <g>
                <text
                  transform="translate(449.46 468.74)"
                  fill="#000000"
                  className="font-display font-medium"
                  fontSize="100"
                  fontWeight="500"
                >
                  <tspan x="0" y="0">A clear process from</tspan>
                  <tspan x="166.65" y="113">idea to final file</tspan>
                </text>
                <text
                  transform="translate(528 651.62)"
                  fill="#000000"
                  className="font-display font-normal"
                  fontSize="28"
                  fontWeight="400"
                >
                  <tspan x="0" y="0">We keep the process simple, collaborative, and predictable - so you</tspan>
                  <tspan x="198.32" y="33.6">always know what’s happening next.</tspan>
                </text>

                {/* 4 Corner Stars - Always present (static) */}
                <g fill="#0e3b2e">
                  {/* Star 1: Top-Left (392, 353) */}
                  <path d="M392,369.48c-.83,0-1.5-.67-1.5-1.5v-6.23c0-4.14-3.37-7.51-7.51-7.51h-6.23c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h6.23c4.14,0,7.51-3.37,7.51-7.51v-6.23c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5v6.23c0,4.14,3.37,7.51,7.51,7.51h6.23c.83,0,1.5.67,1.5,1.5s-.67,1.5-1.5,1.5h-6.23c-4.14,0-7.51,3.37-7.51,7.51v6.23c0,.83-.68,1.5-1.5,1.5Z" />
                  {/* Star 3: Bottom-Left (392, 727) */}
                  <path d="M392,743.75c-.83,0-1.5-.67-1.5-1.5v-6.23c0-4.14-3.37-7.51-7.51-7.51h-6.23c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h6.23c4.14,0,7.51-3.37,7.51-7.51v-6.23c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5v6.23c0,4.14,3.37,7.51,7.51,7.51h6.23c.83,0,1.5.67,1.5,1.5s-.67,1.5-1.5,1.5h-6.23c-4.14,0-7.51,3.37-7.51,7.51v6.23c0,.83-.68,1.5-1.5,1.5Z" />
                  {/* Star 2: Top-Right (1528, 353) */}
                  <path d="M1528,369.75c-.83,0-1.5-.67-1.5-1.5v-6.23c0-4.14-3.37-7.51-7.51-7.51h-6.23c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h6.23c4.14,0,7.51-3.37,7.51-7.51v-6.23c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5v6.23c0,4.14,3.37,7.51,7.51,7.51h6.23c.83,0,1.5.67,1.5,1.5s-.67,1.5-1.5,1.5h-6.23c-4.14,0-7.51,3.37-7.51,7.51v6.23c0,.83-.68,1.5-1.5,1.5Z" />
                  {/* Star 4: Bottom-Right (1528, 727) */}
                  <path d="M1528,743.41c-.83,0-1.5-.67-1.5-1.5v-6.23c0-4.14-3.37-7.51-7.51-7.51h-6.23c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h6.23c4.14,0,7.51-3.37,7.51-7.51v-6.23c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5v6.23c0,4.14,3.37,7.51,7.51,7.51h6.23c.83,0,1.5.67,1.5,1.5s-.67,1.5-1.5,1.5h-6.23c-4.14,0-7.51,3.37-7.51,7.51v6.23c0,.83-.68,1.5-1.5,1.5Z" />
                </g>

                {/* Subtle base guide frame */}
                <rect
                  x="392"
                  y="353"
                  width="1136"
                  height="374"
                  fill="none"
                  stroke="#0e3b2e"
                  strokeOpacity="0.2"
                  strokeWidth="1.5"
                />

                {/* 4 Lines Connecting from Star 1 & 4 to Star 2 & 3 */}
                <g fill="none" stroke="#0e3b2e" strokeWidth="1.5">
                  {/* Line 1: Star 1 (Top-Left) -> Star 2 (Top-Right) */}
                  <motion.path
                    d="M 392 353 L 1528 353"
                    initial={{ pathLength: 0 }}
                    animate={isIntroInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                  />
                  {/* Line 2: Star 1 (Top-Left) -> Star 3 (Bottom-Left) */}
                  <motion.path
                    d="M 392 353 L 392 727"
                    initial={{ pathLength: 0 }}
                    animate={isIntroInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                  />
                  {/* Line 3: Star 4 (Bottom-Right) -> Star 2 (Top-Right) */}
                  <motion.path
                    d="M 1528 727 L 1528 353"
                    initial={{ pathLength: 0 }}
                    animate={isIntroInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                  />
                  {/* Line 4: Star 4 (Bottom-Right) -> Star 3 (Bottom-Left) */}
                  <motion.path
                    d="M 1528 727 L 392 727"
                    initial={{ pathLength: 0 }}
                    animate={isIntroInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                  />
                </g>
              </g>

              {/* Bottom Center Image: Design System Archive */}
              <g clipPath="url(#process-clip-bottom)">
                <image
                  width="1982"
                  height="1116"
                  transform="translate(711 717.8) scale(.28)"
                  href="/image/process-intro/img-0.png"
                />
              </g>

              {/* Top Right Image: Visual Synthesis */}
              <g clipPath="url(#process-clip-top-right)">
                <image
                  width="2050"
                  height="1083"
                  transform="translate(1476 58.66) scale(.29)"
                  href="/image/process-intro/img-1.png"
                />
                <image
                  width="1982"
                  height="1116"
                  transform="translate(1465.84 71.8) scale(.28)"
                  href="/image/process-intro/img-2.png"
                />
              </g>

              {/* Top Left Card: { Collaborative Sync } */}
              <g>
                <rect x="192.78" y="130.04" width="398.45" height="107.85" rx="13.3" ry="13.3" fill="#ffffff" />
                <g>
                  <text
                    transform="translate(303.35 177.26)"
                    fill="#111111"
                    className="font-display font-normal"
                    fontSize="23"
                  >
                    <tspan x="0" y="0">{'{ Collaborative Sync }'}</tspan>
                  </text>
                  <text
                    transform="translate(303.35 199.63)"
                    fill="#bdccd4"
                    className="font-display font-normal"
                    fontSize="13.39"
                  >
                    <tspan x="0" y="0">LIVE MULTI-USER REVIEW, FEEDBACK LOOP</tspan>
                  </text>
                </g>
                <rect
                  x="202.46"
                  y="140.01"
                  width="87.9"
                  height="87.9"
                  rx="3.33"
                  ry="3.33"
                  fill="#bdccd4"
                  transform="translate(430.37 -62.44) rotate(90)"
                />
              </g>

              {/* Bottom Right Card: { Production Artifacts } */}
              <g>
                <rect x="1442.05" y="789.05" width="398.45" height="107.85" rx="13.3" ry="13.3" fill="#ffffff" />
                <g>
                  <text
                    transform="translate(1552.63 836.27)"
                    fill="#111111"
                    className="font-display font-normal"
                    fontSize="23"
                  >
                    <tspan x="0" y="0">{'{ Production Artifacts }'}</tspan>
                  </text>
                  <text
                    transform="translate(1552.63 858.64)"
                    fill="#bdccd4"
                    className="font-display font-normal"
                    fontSize="13.39"
                  >
                    <tspan x="0" y="0">READY FOR DEPLOY</tspan>
                  </text>
                </g>
                <g>
                  <g clipPath="url(#process-clip-prod-icon)">
                    <g clipPath="url(#process-clip-prod-inner)">
                      <image
                        width="205"
                        height="205"
                        transform="translate(1446.52 793.92) scale(.48)"
                        href="/image/process-intro/img-3.png"
                      />
                    </g>
                  </g>
                  <rect
                    x="1451.73"
                    y="799.03"
                    width="87.9"
                    height="87.9"
                    rx="3.33"
                    ry="3.33"
                    fill="none"
                    stroke="#ffffff"
                  />
                </g>
              </g>

              {/* Left Image: { Concept Ingestion } */}
              <g clipPath="url(#process-clip-left)">
                <image
                  width="2228"
                  height="1392"
                  transform="translate(54.64 579.37) scale(.1)"
                  href="/image/process-intro/img-4.png"
                />
                <rect x="58.89" y="557.22" width="206.67" height="28.89" fill="#000002" />
                <rect x="58.89" y="698.11" width="206.67" height="28.89" fill="#000002" />
              </g>

              {/* Floating Labels */}
              <g>
                <text
                  transform="translate(80 523.52)"
                  fill="#ffffff"
                  className="font-display font-normal"
                  fontSize="23"
                >
                  <tspan x="0" y="0">{'{ Concept Ingestion }'}</tspan>
                </text>
                <text
                  transform="translate(80 545.89)"
                  fill="#106a47"
                  className="font-display font-normal"
                  fontSize="13.39"
                >
                  <tspan x="0" y="0">BRIEF VALIDATED, DIRECTION LOCKED</tspan>
                </text>
              </g>
              <text
                transform="translate(1102.51 1020.85)"
                fill="#ffffff"
                className="font-display font-normal"
                fontSize="23"
              >
                <tspan x="0" y="0">{'{ Design System Archive }'}</tspan>
              </text>
              <text
                transform="translate(1573.5 70.5)"
                fill="#ffffff"
                className="font-display font-normal"
                fontSize="23"
              >
                <tspan x="0" y="0">{'{ Visual Synthesis }'}</tspan>
              </text>

              {/* Connecting White Lines from 2.1.svg (Drawing when in view) */}
              <g fill="none" stroke="#ffffff" strokeWidth="1.5">
                {WHITE_CONNECTING_LINES.map((line) => (
                  <motion.path
                    key={line.id}
                    d={line.d}
                    initial={{ pathLength: 0 }}
                    animate={isIntroInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1], delay: line.delay }}
                  />
                ))}
              </g>

              {/* Origin Yellow Nodes from 2.1.svg (Output ports) */}
              <g fill="#facc15" stroke="#f9f9f9" strokeMiterlimit="10" strokeWidth="1.5">
                {ORIGIN_YELLOW_NODES.map((node, i) => (
                  <motion.circle
                    key={`origin-node-${i}`}
                    cx={node.cx}
                    cy={node.cy}
                    r={6.76}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isIntroInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                  />
                ))}
              </g>

              {/* Traveling Yellow Dots Riding Along White Lines As They Draw */}
              <g
                key={`traveling-dots-${isIntroInView ? 'in' : 'out'}`}
                fill="#facc15"
                stroke="#f9f9f9"
                strokeMiterlimit="10"
                strokeWidth="1.5"
              >
                {isIntroInView &&
                  WHITE_CONNECTING_LINES.map((line) => (
                    <g key={`traveler-${line.id}`} opacity={0}>
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        dur="0.05s"
                        begin={`${line.delay}s`}
                        fill="freeze"
                      />
                      <animateMotion
                        path={line.d}
                        dur="1.3s"
                        begin={`${line.delay}s`}
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                        keyTimes="0;1"
                      />
                      {!line.hasEndDot && (
                        <animate
                          attributeName="opacity"
                          values="1;1;0"
                          keyTimes="0;0.92;1"
                          dur="1.3s"
                          begin={`${line.delay}s`}
                          fill="freeze"
                        />
                      )}
                      <circle cx={0} cy={0} r={6.76} />
                    </g>
                  ))}
              </g>

              {/* Destination Yellow Nodes from 2.1.svg (Docked input ports) */}
              <g fill="#facc15" stroke="#f9f9f9" strokeMiterlimit="10" strokeWidth="1.5">
                {DESTINATION_YELLOW_NODES.map((node, i) => (
                  <motion.circle
                    key={`dest-node-${i}`}
                    cx={node.cx}
                    cy={node.cy}
                    r={6.76}
                    initial={{ opacity: 0 }}
                    animate={isIntroInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 1.45 }}
                  />
                ))}
              </g>

              {/* Curly Braces Icon Inside Collaborative Sync Card */}
              <g>
                <g clipPath="url(#process-clip-brace-left)">
                  <g clipPath="url(#process-clip-brace-left-rect)">
                    <image
                      width="69"
                      height="160"
                      transform="translate(207.64 145.44) scale(.48)"
                      href="/image/process-intro/img-5.png"
                    />
                  </g>
                </g>
                <g clipPath="url(#process-clip-brace-right)">
                  <g clipPath="url(#process-clip-brace-right-rect)">
                    <image
                      width="53"
                      height="145"
                      transform="translate(255.64 149.28) scale(.48)"
                      href="/image/process-intro/img-6.png"
                    />
                  </g>
                </g>
              </g>
            </svg>

            {/* Mobile Responsive Fallback */}
            <div className="md:hidden w-full px-6 flex flex-col items-center justify-center text-center">
              <div className="relative border-[1.5px] border-[#0e3b2e] px-5 py-8 max-w-[92vw] mx-auto flex flex-col items-center">
                <h2 className="font-display font-medium text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.03em] text-black mb-4">
                  A clear process from<br />idea to final file
                </h2>
                <p className="font-display text-[16px] sm:text-[18px] text-black font-normal leading-snug max-w-[540px]">
                  We keep the process simple, collaborative, and predictable - so you always know what&apos;s happening next.
                </p>
              </div>
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
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(14,59,46,0.18)] ring-1 ring-black/10">
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
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(14,59,46,0.18)] ring-1 ring-black/10">
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
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(14,59,46,0.18)] ring-1 ring-black/10">
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
              <div className="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] aspect-[472/680] h-[42vh] sm:h-[48vh] lg:h-[52vh] bg-[#0D382A] shadow-[0_24px_50px_rgba(14,59,46,0.18)] ring-1 ring-black/10">
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
