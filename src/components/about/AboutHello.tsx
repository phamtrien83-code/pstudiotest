'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GREETINGS = [
  'Hello!',
  'Bonjour!',
  'Xin chào!',
  'Hola!',
  'Ciao!',
  'Hallo!',
  'こんにちは!',
]

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: 1,
    },
  },
}

const letterVariants = {
  initial: {
    opacity: 0,
    y: 55,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -45,
    filter: 'blur(10px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function AboutHello() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % GREETINGS.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(handleNext, 4000)
    return () => clearInterval(interval)
  }, [handleNext])

  const currentGreeting = GREETINGS[activeIndex]

  return (
    <section
      className="relative w-full h-screen min-h-[100dvh] -mt-[76px] sm:-mt-[84px] flex items-center justify-center bg-background overflow-hidden select-none cursor-default"
      onClick={handleNext}
    >
      {/* Subtle background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(32, 213, 142, 0.06) 0%, rgba(249, 249, 249, 0) 75%)',
        }}
      />

      {/* Decorative Star Accents - 4 clearly visible stars */}
      {/* Star 1: Top-Left */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[16vh] left-[7vw] pointer-events-none opacity-80 sm:opacity-90 block z-0"
      >
        <img
          src="/image/star.svg"
          alt="Star Decoration"
          className="w-9 h-9 sm:w-16 sm:h-16 object-contain drop-shadow-sm"
          draggable={false}
        />
      </motion.div>

      {/* Star 2: Top-Right */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[20vh] right-[8vw] pointer-events-none opacity-75 sm:opacity-85 block z-0"
      >
        <img
          src="/image/star.svg"
          alt="Star Decoration"
          className="w-7 h-7 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
          draggable={false}
        />
      </motion.div>

      {/* Star 3: Bottom-Left */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[20vh] left-[9vw] pointer-events-none opacity-75 sm:opacity-85 block z-0"
      >
        <img
          src="/image/star.svg"
          alt="Star Decoration"
          className="w-8 h-8 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
          draggable={false}
        />
      </motion.div>

      {/* Star 4: Bottom-Right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[16vh] right-[7vw] pointer-events-none opacity-80 sm:opacity-90 block z-0"
      >
        <img
          src="/image/star.svg"
          alt="Star Decoration"
          className="w-10 h-10 sm:w-16 sm:h-16 object-contain drop-shadow-sm"
          draggable={false}
        />
      </motion.div>

      {/* Centerpiece: Massive Typography Greeting with Character Stagger */}
      <div className="relative z-10 flex items-center justify-center w-full text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentGreeting}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="font-display font-medium text-[84px] sm:text-[132px] md:text-[180px] lg:text-[228px] xl:text-[268px] 2xl:text-[296px] leading-none tracking-[-0.04em] text-accent-green text-center select-none whitespace-nowrap cursor-pointer flex items-center justify-center"
          >
            {Array.from(currentGreeting).map((char, index) => (
              <motion.span
                key={`${currentGreeting}-${index}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>
      </div>
    </section>
  )
}
