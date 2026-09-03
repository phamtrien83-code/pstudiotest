'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import MagneticWrap from './MagneticWrap'

export type TicketButtonVariant = 'accent' | 'orange' | 'magenta' | 'dark' | 'white'
export type TicketButtonSize = 'sm' | 'md' | 'lg'

interface TicketButtonProps {
  children: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  variant?: TicketButtonVariant
  size?: TicketButtonSize
  target?: string
  rel?: string
  className?: string
  showIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
  magnetic?: boolean
  magneticStrength?: number
}

const VARIANTS_CONFIG: Record<
  TicketButtonVariant,
  {
    bg: string
    text: string
    border?: string
  }
> = {
  accent: {
    bg: 'bg-accent-green',
    text: 'text-black',
  },
  orange: {
    bg: 'bg-accent-orange',
    text: 'text-black',
  },
  magenta: {
    bg: 'bg-[#FF007F]',
    text: 'text-white',
  },
  dark: {
    bg: 'bg-studio-dark',
    text: 'text-white',
  },
  white: {
    bg: 'bg-white',
    text: 'text-studio-dark',
    border: 'border border-black/10',
  },
}

const SIZES_CONFIG: Record<
  TicketButtonSize,
  {
    height: string
    fontSize: string
    px: string
    iconBox: string
    iconSize: string
    radius: string
  }
> = {
  sm: {
    height: 'h-[42px]',
    fontSize: 'text-[14px] sm:text-[15px]',
    px: 'px-4 sm:px-5',
    iconBox: 'w-[42px] h-[42px]',
    iconSize: 'w-[13px] h-[12px]',
    radius: 'rounded-[10px]',
  },
  md: {
    height: 'h-[50px] sm:h-[54px]',
    fontSize: 'text-[16px] sm:text-[17px]',
    px: 'px-5 sm:px-7',
    iconBox: 'w-[50px] h-[50px] sm:w-[54px] sm:h-[54px]',
    iconSize: 'w-[15px] h-[14px]',
    radius: 'rounded-[14px]',
  },
  lg: {
    height: 'h-[58px] sm:h-[64px]',
    fontSize: 'text-[18px] sm:text-[20px]',
    px: 'px-7 sm:px-9',
    iconBox: 'w-[58px] h-[58px] sm:w-[64px] sm:h-[64px]',
    iconSize: 'w-[18px] h-[17px]',
    radius: 'rounded-[18px]',
  },
}

// Staggered letters bounce animation with genuine elastic oscillation
const letterContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.024,
    },
  },
}

const letterVariants = {
  initial: {
    y: 0,
    scaleY: 1,
    rotate: 0,
  },
  hover: {
    y: [0, 8, -5, 2.5, -1, 0],
    scaleY: [1, 0.28, 1.24, 0.93, 1.03, 1],
    rotate: [0, 18, -6, 2.5, -0.8, 0],
    transition: {
      duration: 0.78,
      times: [0, 0.2, 0.38, 0.54, 0.72, 1],
      ease: ['easeIn', 'easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
    },
  },
}

// Fractured ticket tilt physics: impulse bounce on hover that smoothly settles back to flat (0deg, 0px)
const textTabVariants = {
  initial: {
    rotate: 0,
    x: 0,
    y: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, 5, -1.8, 0.8, 0],
    x: [0, 3, -0.8, 0.4, 0],
    y: [0, 1.8, -0.4, 0.2, 0],
    scale: [1, 0.96, 1.02, 0.99, 1],
    transition: {
      duration: 0.72,
      times: [0, 0.22, 0.46, 0.72, 1],
      ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
    },
  },
}

const iconTabVariants = {
  initial: {
    rotate: 0,
    x: 0,
    y: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -22, 7, -2.5, 0],
    x: [0, -5.5, 1.8, -0.6, 0],
    y: [0, 4.2, -1, 0.4, 0],
    scale: [1, 0.94, 1.03, 0.99, 1],
    transition: {
      duration: 0.72,
      times: [0, 0.22, 0.46, 0.72, 1],
      ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
    },
  },
}

const arrowVariants = {
  initial: {
    x: 0,
    scale: 1,
  },
  hover: {
    x: [0, 5, -1.5, 0.8, 0],
    scale: [1, 1.16, 0.94, 1.02, 1],
    transition: {
      duration: 0.72,
      times: [0, 0.22, 0.46, 0.72, 1],
      ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
    },
  },
}

export default function TicketButton({
  children,
  href,
  onClick,
  variant = 'accent',
  size = 'md',
  target,
  rel,
  className = '',
  showIcon = true,
  type = 'button',
  disabled = false,
  ariaLabel,
  magnetic = true,
  magneticStrength = 0.55,
}: TicketButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const variantStyles = VARIANTS_CONFIG[variant]
  const sizeStyles = SIZES_CONFIG[size]

  // Content of the ticket button (semantic span elements to allow valid button/link nesting)
  const innerContent = (
    <motion.span
      className={`relative inline-flex items-center select-none cursor-pointer ${className}`}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* 1. Main Text Tab */}
      <motion.span
        variants={textTabVariants}
        className={`relative ${sizeStyles.height} ${sizeStyles.px} ${sizeStyles.radius} ${variantStyles.bg} ${variantStyles.text} ${variantStyles.border || ''} flex items-center justify-center font-display font-medium ${sizeStyles.fontSize} tracking-[-0.01em] whitespace-nowrap z-10`}
        style={{ transformOrigin: 'bottom right' }}
      >
        <motion.span
          variants={letterContainerVariants}
          className="inline-flex items-center overflow-visible"
        >
          {Array.from(children).map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              className="inline-block origin-bottom"
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>

      {/* 2. Arrow Icon Tab (Ticket stub tab with notch junction) */}
      {showIcon && (
        <motion.span
          variants={iconTabVariants}
          className={`relative ${sizeStyles.iconBox} ${sizeStyles.radius} ${variantStyles.bg} ${variantStyles.text} ${variantStyles.border || ''} -ml-[2px] flex items-center justify-center flex-shrink-0 z-0`}
          style={{ transformOrigin: 'top left' }}
        >
          {/* Tabler Icon Arrow with Elastic Spring Bounce */}
          <motion.span
            variants={arrowVariants}
            className="flex items-center justify-center flex-shrink-0"
          >
            <IconArrowRight
              size={size === 'sm' ? 18 : size === 'md' ? 22 : 26}
              stroke={2.4}
              className="flex-shrink-0"
            />
          </motion.span>
        </motion.span>
      )}
    </motion.span>
  )

  let interactiveElement: React.ReactNode

  if (href) {
    const isExternal = href.startsWith('http') || target === '_blank'
    if (isExternal) {
      interactiveElement = (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          onClick={onClick}
          aria-label={ariaLabel || children}
          className="inline-flex items-center justify-center focus:outline-none cursor-pointer"
        >
          {innerContent}
        </a>
      )
    } else {
      interactiveElement = (
        <Link
          href={href}
          onClick={onClick}
          aria-label={ariaLabel || children}
          className="inline-flex items-center justify-center focus:outline-none cursor-pointer"
        >
          {innerContent}
        </Link>
      )
    }
  } else {
    interactiveElement = (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || children}
        className="inline-flex items-center justify-center bg-transparent p-0 border-0 outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {innerContent}
      </button>
    )
  }

  if (!magnetic) {
    return interactiveElement
  }

  return (
    <MagneticWrap strength={magneticStrength}>
      {interactiveElement}
    </MagneticWrap>
  )
}
