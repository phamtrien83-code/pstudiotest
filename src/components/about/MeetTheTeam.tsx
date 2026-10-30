'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeamMemberWindow {
  id: string
  name: string
  role: string
  windowStyle: 'arch' | 'rect'
  aspectClass?: string
  shortIntro: string
  photoPlaceholder?: string
  photoTiltDeg: number
  photoOffsetX?: number
}

const TEAM_MEMBERS: Record<string, TeamMemberWindow> = {
  '3d-systems': {
    id: '3d-systems',
    name: 'Duy Pham',
    role: '3D & Technical Animation',
    windowStyle: 'arch',
    aspectClass: 'aspect-[4/4.3]',
    shortIntro:
      'Duy bridges complex SaaS telemetry and cloud infrastructure with tactile 3D isometric worlds. He turns abstract backend architecture into clear visual systems that technical buyers immediately trust.',
    photoTiltDeg: -4.5,
    photoOffsetX: -6,
  },
  'sound-foley': {
    id: 'sound-foley',
    name: 'Huy Vu',
    role: 'Sound Design & Foley Master',
    windowStyle: 'rect',
    aspectClass: 'aspect-[4/4.3]',
    shortIntro:
      'Huy engineers the invisible half of every PSTUDIO film — from tactile mechanical UI clicks and organic whooshes to bespoke musical scores that pace the narrative and lock in viewer attention.',
    photoTiltDeg: 3.8,
    photoOffsetX: 8,
  },
  'script-strategy': {
    id: 'script-strategy',
    name: 'Mai Nguyen',
    role: 'Strategy & Story Lead',
    windowStyle: 'rect',
    aspectClass: 'aspect-[3/3.65]',
    shortIntro:
      'Mai distills 40-page technical whitepapers and messy product roadmaps into sharp, 60-second narrative scripts. She focuses on the first 5 seconds of hook retention and clear value propositions.',
    photoTiltDeg: -3.2,
    photoOffsetX: 4,
  },
  'motion-lead': {
    id: 'motion-lead',
    name: 'Nam Tran',
    role: 'Lead Motion Designer',
    windowStyle: 'rect',
    aspectClass: 'aspect-[4/4.1]',
    shortIntro:
      'Nam obsesses over custom bezier curves, frame-by-frame weight, and seamless camera transitions. He ensures every UI reveal and character gesture feels effortless, intentional, and alive at 60fps.',
    photoTiltDeg: 4.6,
    photoOffsetX: -8,
  },
  'art-direction': {
    id: 'art-direction',
    name: 'Linh Dang',
    role: 'Art Director & Brand Systems',
    windowStyle: 'arch',
    aspectClass: 'aspect-[4/3.95]',
    shortIntro:
      'Linh builds the visual universe for every project before a single keyframe is set. She translates brand guidelines into distinctive editorial illustration styles, storyboards, and color harmonies.',
    photoTiltDeg: -5.2,
    photoOffsetX: 6,
  },
  'production-lead': {
    id: 'production-lead',
    name: 'Trang Le',
    role: 'Executive Producer & Founder',
    windowStyle: 'arch',
    aspectClass: 'aspect-[4/3.95]',
    shortIntro:
      'Trang leads studio operations and partner collaboration across US, EU, and APAC time zones. She keeps every milestone predictable, transparent, and aligned with measurable launch goals.',
    photoTiltDeg: 3.2,
    photoOffsetX: -4,
  },
}

// =============================================================================
// VECTOR ILLUSTRATIONS FOR EACH MEMBER INSIDE THEIR STUDIO WINDOW
// Unified warm cream interior (#FAF2EE) & clean dark line art (#142E22)
// =============================================================================

function StoryCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Hanging Pendant Lamp */}
      <line x1="115" y1="0" x2="115" y2="52" stroke="#142E22" strokeWidth="2" />
      <path d="M80 68 L150 68 L132 52 L98 52 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="115" cy="70" rx="35" ry="5" fill="#FEF3C7" stroke="#142E22" strokeWidth="1.8" />

      {/* Wall Storyboard Note */}
      <rect x="36" y="96" width="54" height="68" rx="3" fill="#FFFBEB" stroke="#142E22" strokeWidth="2" />
      <path d="M46 142 L58 124 L68 132 L80 112" stroke="#20D38E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="112" r="3" fill="#FF6B35" />

      {/* Character Standing with Script & Coffee Mug */}
      <path d="M145 320 L152 215 C154 198 168 192 186 192 C206 192 222 200 226 220 L234 320 Z" fill="#F9D8D6" stroke="#142E22" strokeWidth="2.2" />
      <path d="M174 193 L186 290 L202 290 L198 193 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <rect x="178" y="172" width="16" height="22" fill="#FFF1EE" stroke="#142E22" strokeWidth="2" />
      <circle cx="186" cy="148" r="26" fill="#FFF1EE" stroke="#142E22" strokeWidth="2.2" />
      <path d="M160 144 C156 116 212 114 212 142 C212 130 198 124 184 124 C170 124 162 132 160 144 Z" fill="#6B5B53" stroke="#142E22" strokeWidth="2" />
      <circle cx="176" cy="148" r="6.5" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <circle cx="193" cy="148" r="6.5" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <line x1="182.5" y1="148" x2="186.5" y2="148" stroke="#142E22" strokeWidth="2" />
      <path d="M181 161 Q185 165 190 161" stroke="#142E22" strokeWidth="2" strokeLinecap="round" />

      {/* Script Pages in Hand */}
      <path d="M108 196 L146 204 L140 262 L102 252 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <line x1="112" y1="214" x2="136" y2="219" stroke="#142E22" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="110" y1="226" x2="134" y2="231" stroke="#142E22" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="108" y1="238" x2="128" y2="242" stroke="#142E22" strokeWidth="1.6" strokeLinecap="round" />

      {/* Coffee Mug in Other Hand */}
      <rect x="148" y="218" width="18" height="22" rx="3" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <path d="M166 223 C171 223 171 235 166 235" stroke="#142E22" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MotionCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Pinboard with Sticky Notes on Wall */}
      <rect x="24" y="54" width="142" height="92" rx="3" fill="#FFFFFF" stroke="#142E22" strokeWidth="2.2" />
      <rect x="36" y="66" width="26" height="28" fill="#FEF3C7" stroke="#142E22" strokeWidth="1.6" transform="rotate(-4 36 66)" />
      <rect x="72" y="64" width="28" height="24" fill="#E0F2FE" stroke="#142E22" strokeWidth="1.6" />
      <rect x="112" y="68" width="32" height="36" fill="#FCE7F3" stroke="#142E22" strokeWidth="1.6" transform="rotate(3 112 68)" />
      <rect x="44" y="104" width="30" height="26" fill="#D1FAE5" stroke="#142E22" strokeWidth="1.6" />
      <rect x="88" y="102" width="26" height="28" fill="#FEF3C7" stroke="#142E22" strokeWidth="1.6" transform="rotate(-3 88 102)" />

      {/* Desk */}
      <rect x="16" y="226" width="220" height="12" fill="#A68A7B" stroke="#142E22" strokeWidth="2.2" />
      <rect x="30" y="238" width="12" height="82" fill="#8C7062" stroke="#142E22" strokeWidth="2.2" />

      {/* Laptop on Desk */}
      <rect x="64" y="170" width="70" height="48" rx="3" fill="#FFFFFF" stroke="#142E22" strokeWidth="2.2" />
      <rect x="69" y="175" width="60" height="38" fill="#E6F9F0" stroke="#142E22" strokeWidth="1.5" />
      <path d="M76 202 C88 184 104 206 120 186" stroke="#20D38E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 218 L142 218 L148 226 L50 226 Z" fill="#D1D5DB" stroke="#142E22" strokeWidth="2" />

      {/* Seated Animator Character */}
      <path d="M225 270 L295 270 L295 320 L225 320 Z" fill="#7C6A61" stroke="#142E22" strokeWidth="2.2" />
      <path d="M188 265 C188 205 268 205 268 265 Z" fill="#F9D8D6" stroke="#142E22" strokeWidth="2.2" />
      <circle cx="232" cy="156" r="25" fill="#FFF1EE" stroke="#142E22" strokeWidth="2.2" />
      <path d="M208 152 C206 122 258 122 258 154 C250 140 238 136 224 138 C214 140 210 146 208 152 Z" fill="#4A3F3A" stroke="#142E22" strokeWidth="2" />
      <circle cx="216" cy="158" r="6" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <line x1="222" y1="158" x2="232" y2="156" stroke="#142E22" strokeWidth="1.8" />
    </svg>
  )
}

function ArtDirectorCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Desk Surface at Bottom */}
      <rect x="0" y="258" width="320" height="62" fill="#F5E6E0" stroke="#142E22" strokeWidth="2.2" />

      {/* Architect Swing-Arm Desk Lamp */}
      <ellipse cx="248" cy="252" rx="26" ry="7" fill="#E5D5CE" stroke="#142E22" strokeWidth="2" />
      <path d="M254 248 L278 192 L244 150" stroke="#142E22" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="278" cy="192" r="4.5" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <path d="M214 148 L244 128 L256 146 L232 168 Z" fill="#F3E5DF" stroke="#142E22" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M214 152 L150 255 L235 255 L232 168 Z" fill="#FEF3C7" opacity="0.35" />

      {/* Sketchbook & Stylus on Desk */}
      <path d="M126 248 L198 242 L208 260 L134 266 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <line x1="142" y1="254" x2="188" y2="250" stroke="#20D38E" strokeWidth="2" strokeLinecap="round" />

      {/* Art Director Character */}
      <path d="M58 258 C58 195 162 195 162 258 Z" fill="#FADCD9" stroke="#142E22" strokeWidth="2.2" />
      <line x1="110" y1="202" x2="110" y2="258" stroke="#142E22" strokeWidth="1.8" />
      <circle cx="110" cy="156" r="26" fill="#FFF1EE" stroke="#142E22" strokeWidth="2.2" />
      <path d="M84 152 C82 118 138 118 138 152 L142 198 L128 198 L128 148 C120 138 100 138 92 148 L92 198 L78 198 Z" fill="#4A3B36" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="103" cy="158" r="2.2" fill="#142E22" />
      <circle cx="119" cy="158" r="2.2" fill="#142E22" />
      <path d="M107 169 Q111 172 115 169" stroke="#142E22" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="138" y1="218" x2="152" y2="246" stroke="#142E22" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function ThreeDCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Star on top */}
      <polygon
        points="160,36 165,48 178,48 167,56 171,68 160,60 149,68 153,56 142,48 155,48"
        fill="#FEF08A"
        stroke="#142E22"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Layered Stylized Foliage with 3D Nodes */}
      <path
        d="M160 66 L112 135 L134 135 L94 198 L122 198 L82 268 L238 268 L198 198 L226 198 L186 135 L208 135 Z"
        fill="#FCE7F3"
        stroke="#142E22"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M126 128 Q160 145 194 126" stroke="#142E22" strokeWidth="1.8" strokeDasharray="4 4" />
      <path d="M108 190 Q160 212 212 188" stroke="#142E22" strokeWidth="1.8" strokeDasharray="4 4" />
      <path d="M96 248 Q160 268 224 244" stroke="#142E22" strokeWidth="1.8" strokeDasharray="4 4" />
      <circle cx="145" cy="112" r="6" fill="#20D38E" stroke="#142E22" strokeWidth="1.8" />
      <circle cx="178" cy="156" r="7" fill="#FEF08A" stroke="#142E22" strokeWidth="1.8" />
      <circle cx="132" cy="172" r="6" fill="#FF6B35" stroke="#142E22" strokeWidth="1.8" />
      <circle cx="188" cy="222" r="7" fill="#20D38E" stroke="#142E22" strokeWidth="1.8" />
      <circle cx="138" cy="232" r="6.5" fill="#FFFFFF" stroke="#142E22" strokeWidth="1.8" />
      <rect x="146" y="268" width="28" height="52" fill="#A68A7B" stroke="#142E22" strokeWidth="2.2" />
    </svg>
  )
}

function SoundCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Side Table & Stack of Books */}
      <rect x="18" y="252" width="96" height="10" fill="#F5E6E0" stroke="#142E22" strokeWidth="2" />
      <line x1="66" y1="262" x2="66" y2="320" stroke="#142E22" strokeWidth="2.2" />
      <rect x="34" y="236" width="64" height="16" rx="2" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />
      <rect x="40" y="220" width="54" height="16" rx="2" fill="#FCE7F3" stroke="#142E22" strokeWidth="2" />
      <rect x="36" y="204" width="58" height="16" rx="2" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" />

      {/* Character Standing Holding Score Sheet & Notebook */}
      <path d="M142 246 L210 246 L218 320 L134 320 Z" fill="#3F3633" stroke="#142E22" strokeWidth="2.2" />
      <path d="M126 184 C132 168 152 164 176 164 C200 164 218 172 224 196 L210 246 L142 246 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2.2" />
      <path d="M164 164 L176 182 L188 164" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="176" cy="128" r="25" fill="#FFF1EE" stroke="#142E22" strokeWidth="2.2" />
      <path d="M150 126 C148 94 204 94 204 126 L208 156 L194 156 L194 122 C184 114 168 114 158 122 L158 156 L146 156 Z" fill="#5C4D46" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="169" cy="128" r="2.2" fill="#142E22" />
      <circle cx="183" cy="128" r="2.2" fill="#142E22" />
      <path d="M172 139 Q176 143 180 139" stroke="#142E22" strokeWidth="1.8" strokeLinecap="round" />

      {/* Floating Sheet Held in Right Hand */}
      <path d="M72 138 L122 118 L138 156 L88 176 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <rect x="178" y="206" width="28" height="36" rx="2" fill="#FADCD9" stroke="#142E22" strokeWidth="2" transform="rotate(-12 178 206)" />
    </svg>
  )
}

function ProducerCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Desk Surface at Bottom */}
      <rect x="0" y="268" width="320" height="52" fill="#E8D8D0" stroke="#142E22" strokeWidth="2.2" />

      {/* Classic Table Lamp on Left */}
      <path d="M36 164 L96 164 L84 118 L48 118 Z" fill="#8C7368" stroke="#142E22" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="62" y="164" width="8" height="92" fill="#705A50" stroke="#142E22" strokeWidth="2" />
      <rect x="44" y="256" width="44" height="12" rx="2" fill="#705A50" stroke="#142E22" strokeWidth="2" />

      {/* Producer Character Seated at Desk */}
      <path d="M118 268 C120 198 268 198 270 268 Z" fill="#FADCD9" stroke="#142E22" strokeWidth="2.2" />
      <path d="M148 206 L176 206 L194 232 L212 206 L240 206 L246 268 L142 268 Z" fill="#705A50" stroke="#142E22" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="194" cy="166" r="26" fill="#FFF1EE" stroke="#142E22" strokeWidth="2.2" />
      <rect x="168" y="134" width="52" height="12" rx="4" fill="#705A50" stroke="#142E22" strokeWidth="2" />
      <path d="M168 168 C168 198 220 198 220 168 L212 168 C210 182 178 182 176 168 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="185" cy="160" r="2.2" fill="#142E22" />
      <circle cx="203" cy="160" r="2.2" fill="#142E22" />

      {/* Storyboard Pad & Pen on Desk */}
      <path d="M150 258 L226 258 L232 272 L144 272 Z" fill="#FFFFFF" stroke="#142E22" strokeWidth="2" strokeLinejoin="round" />
      <line x1="218" y1="242" x2="206" y2="262" stroke="#142E22" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// =============================================================================
// FULL-WIDTH SCALED ARCHITECTURAL WINDOW FRAME COMPONENTS
// =============================================================================

function ShutteredWindow({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className={`relative flex flex-col items-center w-full select-none ${className}`}
    >
      {/* Top Stepped Architectural Cornice */}
      <div className="w-[calc(100%+28px)] sm:w-[calc(100%+36px)] h-[10px] sm:h-[12px] bg-accent-green border-[2.5px] border-[#0E3B2E]" />
      <div className="w-[calc(100%+14px)] sm:w-[calc(100%+18px)] h-[8px] sm:h-[10px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E]" />

      {/* Outer Window Frame */}
      <div className="w-full bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E] p-3 sm:p-4 lg:p-5">
        {/* Top Transom Bar with Vertical Divider */}
        <div className="w-full h-9 sm:h-11 lg:h-12 border-[2.5px] border-[#0E3B2E] grid grid-cols-12 mb-3 sm:mb-4 bg-accent-green">
          <div className="col-span-5 border-r-[2.5px] border-[#0E3B2E]" />
          <div className="col-span-2 border-r-[2.5px] border-[#0E3B2E]" />
          <div className="col-span-5" />
        </div>

        {/* Closed Horizontal Venetian Blinds Body */}
        <div
          className="relative w-full aspect-[3/3.65] border-[2.5px] border-[#0E3B2E] overflow-hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 13px, #0E3B2E 13px, #0E3B2E 15.5px)',
          }}
        >
          {/* Left & Right Blind Cord Lines */}
          <div className="absolute top-0 bottom-0 left-[14%] w-[2px] bg-[#0E3B2E]/55" />
          <div className="absolute top-0 bottom-0 right-[14%] w-[2px] bg-[#0E3B2E]/55" />
        </div>
      </div>

      {/* Bottom Stepped Architectural Window Sill */}
      <div className="w-[calc(100%+18px)] sm:w-[calc(100%+24px)] h-[9px] sm:h-[11px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E]" />
      <div className="w-[calc(100%+32px)] sm:w-[calc(100%+42px)] h-[10px] sm:h-[12px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E]" />
    </motion.div>
  )
}

function MemberWindowFrame({
  member,
  onSelect,
  isSelected,
  children,
  className = '',
}: {
  member: TeamMemberWindow
  onSelect: (member: TeamMemberWindow) => void
  isSelected?: boolean
  children: React.ReactNode
  className?: string
}) {
  const isArch = member.windowStyle === 'arch'

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(member)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      aria-label={`Meet ${member.name} — ${member.role}`}
      className={`group relative flex flex-col items-center w-full text-left cursor-pointer select-none focus:outline-none ${className}`}
    >
      {/* Top Stepped Cornice for Rectangular Windows */}
      {!isArch && (
        <>
          <div className="w-[calc(100%+28px)] sm:w-[calc(100%+36px)] h-[10px] sm:h-[12px] bg-accent-green border-[2.5px] border-[#0E3B2E] transition-colors" />
          <div className="w-[calc(100%+14px)] sm:w-[calc(100%+18px)] h-[8px] sm:h-[10px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E] transition-colors" />
        </>
      )}

      {/* Window Frame Body */}
      <div
        className={`w-full bg-accent-green border-[2.5px] border-[#0E3B2E] p-3 sm:p-4 lg:p-5 transition-all duration-300 ${
          isArch ? 'rounded-t-[50%_38px] sm:rounded-t-[50%_46px] pt-4 sm:pt-6' : 'border-t-0'
        } ${isSelected ? 'ring-4 ring-[#0E3B2E]/30' : ''}`}
      >
        {/* Two Top Transom Panes */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div
            className={`h-11 sm:h-14 lg:h-16 bg-[#FAF2EE] border-[2.5px] border-[#0E3B2E] ${
              isArch ? 'rounded-tl-[100%_30px] sm:rounded-tl-[100%_36px]' : ''
            }`}
          />
          <div
            className={`h-11 sm:h-14 lg:h-16 bg-[#FAF2EE] border-[2.5px] border-[#0E3B2E] ${
              isArch ? 'rounded-tr-[100%_30px] sm:rounded-tr-[100%_36px]' : ''
            }`}
          />
        </div>

        {/* Main Interior Window Pane */}
        <div
          className={`relative w-full ${
            member.aspectClass || 'aspect-[4/4.2]'
          } bg-[#FAF2EE] border-[2.5px] border-[#0E3B2E] overflow-hidden flex items-end justify-center`}
        >
          <div className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-500 ease-out">
            {children}
          </div>

          {/* Hover Pill Prompt */}
          <div className="absolute bottom-3.5 inset-x-3 flex justify-center opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-[#111111]/90 text-white text-xs sm:text-sm font-sans font-medium tracking-tight shadow-md backdrop-blur-sm flex items-center gap-2">
              <span>{member.name}</span>
              <span className="text-accent-green">&bull;</span>
              <span className="text-accent-green">{member.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stepped Architectural Window Sill */}
      <div className="w-[calc(100%+24px)] sm:w-[calc(100%+32px)] h-[10px] sm:h-[12px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E]" />
      <div className="w-[calc(100%+12px)] sm:w-[calc(100%+16px)] h-[8px] sm:h-[10px] bg-accent-green border-x-[2.5px] border-b-[2.5px] border-[#0E3B2E]" />
    </motion.button>
  )
}

export default function MeetTheTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberWindow | null>(null)

  // Close drawer on Escape key
  useEffect(() => {
    if (!selectedMember) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMember])

  return (
    <section
      id="meet-the-team"
      className="relative z-20 w-full bg-accent-green text-[#111111] py-14 sm:py-20 lg:py-24 px-8 sm:px-14 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
    >
      {/* Full-Width Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* ===================================================================== */}
        {/* CLEAN SECTION HEADER — ONLY "Meet the team"                           */}
        {/* ===================================================================== */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-medium text-[52px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[132px] leading-[1.0] tracking-[-0.035em] text-[#111111] text-center mb-10 sm:mb-14 lg:mb-16"
        >
          Meet the team
        </motion.h2>

        {/* ===================================================================== */}
        {/* FULL-WIDTH STAGGERED 3-COLUMN ARCHITECTURAL WINDOW FACADE             */}
        {/* ===================================================================== */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 lg:gap-20 xl:gap-28 items-start">
          
          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 1 (LEFT): Subtle stagger offset without leaving top empty  */}
          {/* ----------------------------------------------------------------- */}
          <div className="w-full flex flex-col gap-14 md:gap-16 lg:gap-24 md:mt-16 lg:mt-24">
            {/* Mid-Left Arched Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['3d-systems']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === '3d-systems'}
            >
              <ThreeDCharacter />
            </MemberWindowFrame>

            {/* Bottom-Left Rectangular Cornice Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['sound-foley']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === 'sound-foley'}
            >
              <SoundCharacter />
            </MemberWindowFrame>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 2 (CENTER): Shutter -> Tall Member Window -> Shutter       */}
          {/* ----------------------------------------------------------------- */}
          <div className="w-full flex flex-col gap-14 md:gap-16 lg:gap-24">
            {/* Top-Center Shuttered Window */}
            <ShutteredWindow />

            {/* Mid-Center Tall Rectangular Cornice Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['script-strategy']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === 'script-strategy'}
            >
              <StoryCharacter />
            </MemberWindowFrame>

            {/* Bottom-Center Shuttered Window */}
            <ShutteredWindow />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 3 (RIGHT): Slightly offset from top (3 Member Windows)     */}
          {/* ----------------------------------------------------------------- */}
          <div className="w-full flex flex-col gap-14 md:gap-16 lg:gap-24 md:mt-8 lg:mt-12">
            {/* Top-Right Rectangular Cornice Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['motion-lead']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === 'motion-lead'}
            >
              <MotionCharacter />
            </MemberWindowFrame>

            {/* Mid-Right Arched Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['art-direction']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === 'art-direction'}
            >
              <ArtDirectorCharacter />
            </MemberWindowFrame>

            {/* Bottom-Right Arched Window */}
            <MemberWindowFrame
              member={TEAM_MEMBERS['production-lead']}
              onSelect={setSelectedMember}
              isSelected={selectedMember?.id === 'production-lead'}
            >
              <ProducerCharacter />
            </MemberWindowFrame>
          </div>

        </div>
      </div>

      {/* ======================================================================= */}
      {/* WIDER BORDERLESS SLIDE-OVER POP-UP FROM RIGHT TO LEFT                   */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Backdrop */}
            <motion.div
              key="member-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] cursor-pointer"
            />

            {/* Wider Right-to-Left Slide-Over Drawer (No borders, no dividers, no header/footer bars) */}
            <motion.aside
              key="member-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[540px] sm:max-w-[640px] lg:max-w-[700px] bg-[#FAF2EE] text-[#111111] shadow-2xl flex flex-col justify-start overflow-y-auto px-8 sm:px-14 lg:px-20 pt-10 sm:pt-14 pb-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start w-full my-auto"
                >
                  {/* Randomly Tilted Vertical Portrait Image Placeholder per Window */}
                  <div className="w-full flex justify-center mb-10 sm:mb-12">
                    <motion.div
                      initial={{ rotate: 0, scale: 0.94 }}
                      animate={{
                        rotate: selectedMember.photoTiltDeg,
                        x: selectedMember.photoOffsetX || 0,
                        scale: 1,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[260px] sm:w-[320px] lg:w-[360px] aspect-[3/4] rounded-2xl bg-[#E8DCD5] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col items-center justify-center relative select-none"
                    >
                      {selectedMember.photoPlaceholder ? (
                        <img
                          src={selectedMember.photoPlaceholder}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center px-6 text-[#111111]/40">
                          <span className="font-display font-medium text-sm sm:text-base tracking-tight text-[#111111]/55 mb-1">
                            Portrait Placeholder
                          </span>
                          <span className="font-sans text-xs">
                            3:4 Vertical Photo ({selectedMember.photoTiltDeg > 0 ? `+${selectedMember.photoTiltDeg}°` : `${selectedMember.photoTiltDeg}°`})
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Role */}
                  <span className="font-sans font-medium text-sm sm:text-base text-accent-green mb-2">
                    {selectedMember.role}
                  </span>

                  {/* Member Name */}
                  <h3 className="font-display font-medium text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.03em] text-[#111111] mb-4 sm:mb-5">
                    {selectedMember.name}
                  </h3>

                  {/* Short Intro */}
                  <p className="font-sans text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.68] text-[#111111]/75 max-w-[540px]">
                    {selectedMember.shortIntro}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
