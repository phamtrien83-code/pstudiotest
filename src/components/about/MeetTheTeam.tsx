'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TeamMemberWindow {
  id: string
  name: string
  role: string
  department: 'story' | 'motion' | 'visuals' | 'audio'
  status: string
  windowStyle: 'arch' | 'loft' | 'pane' | 'porthole' | 'bay' | 'gable'
  accentColor: string
  sillItem: 'plant' | 'cat' | 'coffee' | 'headphones' | 'lamp' | 'pencil'
  description: string
}

const TEAM_MEMBERS: TeamMemberWindow[] = [
  {
    id: 'script-strategy',
    name: 'Mai Nguyen',
    role: 'Strategy & Story Lead',
    department: 'story',
    status: 'Crafting opening hooks',
    windowStyle: 'arch',
    accentColor: '#F59E0B',
    sillItem: 'coffee',
    description: 'Turns 40-page technical telemetry whitepapers into clear, 60-second high-converting narrative scripts.',
  },
  {
    id: 'motion-lead',
    name: 'Nam Tran',
    role: 'Lead Motion Designer',
    department: 'motion',
    status: 'Easing bezier curves',
    windowStyle: 'loft',
    accentColor: '#20D38E',
    sillItem: 'headphones',
    description: 'Crafts physics-based motion language, kinetic typography, and fluid camera transitions that feel alive.',
  },
  {
    id: 'art-direction',
    name: 'Linh Dang',
    role: 'Art Director & Brand Systems',
    department: 'visuals',
    status: 'Picking color palettes',
    windowStyle: 'bay',
    accentColor: '#EC4899',
    sillItem: 'plant',
    description: 'Shapes distinct visual identities, bespoke vector illustration worlds, and cohesive color harmonies.',
  },
  {
    id: '3d-systems',
    name: 'Duy Pham',
    role: '3D & Technical Animation',
    department: 'motion',
    status: 'Rendering particle pass',
    windowStyle: 'porthole',
    accentColor: '#38BDF8',
    sillItem: 'lamp',
    description: 'Bridges complex SaaS telemetry data with cinematic 3D isometric architectures and glowing nodal pipelines.',
  },
  {
    id: 'sound-foley',
    name: 'Huy Vu',
    role: 'Sound Design & Foley Master',
    department: 'audio',
    status: 'Dialing in frequency',
    windowStyle: 'pane',
    accentColor: '#A855F7',
    sillItem: 'pencil',
    description: 'Engineers satisfying UI whooshes, mechanical clicks, and custom musical scores that anchor emotional resonance.',
  },
  {
    id: 'production-lead',
    name: 'Trang Le',
    role: 'Executive Producer & Founder',
    department: 'story',
    status: 'Reviewing final cut',
    windowStyle: 'gable',
    accentColor: '#10B981',
    sillItem: 'cat',
    description: 'Orchestrates project roadmaps, client alignment across US/EU/Asia, and keeps every delivery on time.',
  },
]

// =============================================================================
// VECTOR ILLUSTRATIONS FOR EACH CHARACTER INSIDE THEIR WINDOW
// =============================================================================

function StoryCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Wall Poster with Narrative Graph */}
      <rect x="35" y="45" width="65" height="85" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
      <path d="M45 105 L60 85 L75 95 L90 65" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="90" cy="65" r="3.5" fill="#EF4444" />

      {/* Floating Idea Lightbulb */}
      <g className="animate-bounce" style={{ animationDuration: '3s' }}>
        <path d="M245 60 C245 48 255 40 267 40 C279 40 289 48 289 60 C289 68 283 74 278 78 L278 86 L256 86 L256 78 C251 74 245 68 245 60 Z" fill="#FDE047" stroke="#1F2937" strokeWidth="2.5" />
        <rect x="260" y="86" width="14" height="6" rx="2" fill="#9CA3AF" stroke="#1F2937" strokeWidth="2" />
        {/* Glow rays */}
        <line x1="267" y1="28" x2="267" y2="34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="295" y1="45" x2="290" y2="49" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="239" y1="45" x2="244" y2="49" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Desk Surface */}
      <rect x="20" y="240" width="280" height="80" rx="4" fill="#92400E" stroke="#1F2937" strokeWidth="3.5" />
      <rect x="25" y="240" width="270" height="8" fill="#B45309" />

      {/* Coffee Mug with Animated Rising Steam */}
      <rect x="45" y="215" width="28" height="30" rx="4" fill="#EF4444" stroke="#1F2937" strokeWidth="2.5" />
      <path d="M73 222 C78 222 82 226 82 230 C82 234 78 238 73 238" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 205 C50 195 56 190 54 180" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.75" />
      <path d="M62 208 C60 198 66 193 64 183" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.75" />

      {/* Laptop on Desk */}
      <path d="M125 210 L195 210 L205 240 L115 240 Z" fill="#E5E7EB" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="130" y="150" width="60" height="60" rx="4" fill="#374151" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="134" y="154" width="52" height="52" rx="2" fill="#60A5FA" opacity="0.9" />
      <line x1="140" y1="168" x2="175" y2="168" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="176" x2="165" y2="176" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="184" x2="180" y2="184" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Character (Torso, Head, Ponytail) */}
      <path d="M110 270 C110 215 210 215 210 270 Z" fill="#F43F5E" stroke="#1F2937" strokeWidth="3" />
      {/* Neck */}
      <rect x="150" y="195" width="20" height="20" fill="#FBCFE8" stroke="#1F2937" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="160" cy="165" r="32" fill="#FBCFE8" stroke="#1F2937" strokeWidth="3" />
      {/* Ponytail Hair */}
      <path d="M135 155 C130 120 185 120 185 155 C185 140 170 135 155 135 C140 135 135 145 135 155 Z" fill="#18181B" />
      <path d="M185 145 C205 140 220 155 215 175 C210 165 200 155 185 155 Z" fill="#18181B" stroke="#1F2937" strokeWidth="2" />
      {/* Stylish Glasses */}
      <rect x="145" y="158" width="13" height="10" rx="2" stroke="#1F2937" strokeWidth="2.5" fill="rgba(255,255,255,0.4)" />
      <rect x="163" y="158" width="13" height="10" rx="2" stroke="#1F2937" strokeWidth="2.5" fill="rgba(255,255,255,0.4)" />
      <line x1="158" y1="163" x2="163" y2="163" stroke="#1F2937" strokeWidth="2.5" />
      {/* Smile */}
      <path d="M155 180 Q160 185 165 180" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MotionCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Floating Keyframe Bezier Curve in background */}
      <path
        d="M30 90 C 80 40, 120 140, 180 60 C 220 10, 270 110, 300 70"
        stroke="#20D38E"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="50" r="4.5" fill="#20D38E" stroke="#111827" strokeWidth="1.5" />
      <circle cx="180" cy="60" r="4.5" fill="#20D38E" stroke="#111827" strokeWidth="1.5" />
      <circle cx="270" cy="100" r="4.5" fill="#20D38E" stroke="#111827" strokeWidth="1.5" />

      {/* Desk Surface */}
      <rect x="15" y="240" width="290" height="80" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />

      {/* Dual Ultra-wide Monitors */}
      {/* Left Monitor */}
      <rect x="35" y="130" width="85" height="95" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="3" />
      <rect x="40" y="135" width="75" height="75" rx="3" fill="#1E293B" />
      {/* Timeline Layers on Screen */}
      <rect x="45" y="145" width="65" height="8" rx="2" fill="#20D38E" opacity="0.8" />
      <rect x="45" y="160" width="45" height="8" rx="2" fill="#38BDF8" opacity="0.8" />
      <rect x="45" y="175" width="55" height="8" rx="2" fill="#F43F5E" opacity="0.8" />
      <rect x="45" y="190" width="65" height="12" rx="2" fill="#0284C7" opacity="0.5" />
      <line x1="72" y1="140" x2="72" y2="205" stroke="#FDE047" strokeWidth="2" strokeDasharray="2 2" />

      {/* Right Monitor */}
      <rect x="200" y="130" width="85" height="95" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="3" />
      <rect x="205" y="135" width="75" height="75" rx="3" fill="#1E293B" />
      {/* 3D Wireframe sphere preview */}
      <circle cx="242" cy="172" r="24" stroke="#20D38E" strokeWidth="2" fill="none" />
      <ellipse cx="242" cy="172" rx="24" ry="10" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
      <line x1="242" y1="148" x2="242" y2="196" stroke="#38BDF8" strokeWidth="1.5" />

      {/* Motion Animator Character (Center) */}
      <path d="M105 270 C105 210 215 210 215 270 Z" fill="#20D38E" stroke="#0F172A" strokeWidth="3" />
      {/* Neck */}
      <rect x="150" y="195" width="20" height="20" fill="#FED7AA" stroke="#0F172A" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="160" cy="165" r="32" fill="#FED7AA" stroke="#0F172A" strokeWidth="3" />
      {/* Beanie Hat */}
      <path d="M130 160 C130 130 190 130 190 160 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="2.5" />
      <rect x="126" y="154" width="68" height="10" rx="3" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      {/* Over-ear Headphones */}
      <path d="M130 155 C125 140 195 140 190 155" stroke="#F43F5E" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <rect x="125" y="155" width="10" height="20" rx="4" fill="#F43F5E" stroke="#0F172A" strokeWidth="2" />
      <rect x="185" y="155" width="10" height="20" rx="4" fill="#F43F5E" stroke="#0F172A" strokeWidth="2" />
      {/* Eyes & Focus Expression */}
      <circle cx="152" cy="172" r="3" fill="#0F172A" />
      <circle cx="168" cy="172" r="3" fill="#0F172A" />
      <path d="M157 183 Q160 186 163 183" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ArtDirectorCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Hanging Swatch Palette Ribbons */}
      <g opacity="0.9">
        <rect x="35" y="30" width="18" height="60" rx="4" fill="#EC4899" stroke="#1F2937" strokeWidth="2" />
        <rect x="58" y="30" width="18" height="80" rx="4" fill="#F59E0B" stroke="#1F2937" strokeWidth="2" />
        <rect x="81" y="30" width="18" height="50" rx="4" fill="#20D38E" stroke="#1F2937" strokeWidth="2" />
        <rect x="104" y="30" width="18" height="70" rx="4" fill="#6366F1" stroke="#1F2937" strokeWidth="2" />
      </g>

      {/* Floating Geometric Inspiration Solids */}
      <circle cx="265" cy="65" r="18" fill="#F472B6" stroke="#1F2937" strokeWidth="2.5" />
      <polygon points="230,110 255,70 280,110" fill="#FBBF24" stroke="#1F2937" strokeWidth="2.5" />

      {/* Desk Surface */}
      <rect x="20" y="240" width="280" height="80" rx="4" fill="#E2E8F0" stroke="#1F2937" strokeWidth="3.5" />

      {/* Drawing Tablet & Stylus */}
      <rect x="55" y="220" width="80" height="55" rx="5" fill="#1E293B" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="62" y="226" width="66" height="42" rx="2" fill="#E0E7FF" />
      {/* Abstract Colorful Artwork on Tablet */}
      <circle cx="95" cy="245" r="12" fill="#EC4899" />
      <path d="M75 258 Q95 235 115 258" fill="#6366F1" />
      {/* Stylus */}
      <line x1="140" y1="215" x2="155" y2="245" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

      {/* Art Director Character */}
      <path d="M110 270 C110 215 210 215 210 270 Z" fill="#6366F1" stroke="#1F2937" strokeWidth="3" />
      {/* Neck */}
      <rect x="150" y="195" width="20" height="20" fill="#FED7AA" stroke="#1F2937" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="160" cy="165" r="32" fill="#FED7AA" stroke="#1F2937" strokeWidth="3" />
      {/* Chic Bob Haircut */}
      <path d="M128 160 C128 125 192 125 192 160 C192 185 185 190 185 190 C185 160 175 140 160 140 C145 140 135 160 135 190 Z" fill="#0F172A" />
      {/* Statement Earrings */}
      <circle cx="127" cy="175" r="5" fill="#F59E0B" stroke="#1F2937" strokeWidth="2" />
      <circle cx="193" cy="175" r="5" fill="#F59E0B" stroke="#1F2937" strokeWidth="2" />
      {/* Eyes with stylish cat-eye liner */}
      <path d="M147 169 Q153 166 156 169" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M164 169 Q167 166 173 169" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      {/* Confident Smile */}
      <path d="M154 182 Q160 187 166 182" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function ThreeDCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Isometric Grid Background */}
      <g opacity="0.3" stroke="#38BDF8" strokeWidth="1.5">
        <line x1="40" y1="40" x2="280" y2="160" />
        <line x1="40" y1="100" x2="280" y2="220" />
        <line x1="280" y1="40" x2="40" y2="160" />
        <line x1="280" y1="100" x2="40" y2="220" />
      </g>

      {/* Rotating 3D Isometric Wireframe Cube Floating in Air */}
      <g transform="translate(210, 45)">
        <polygon points="40,10 75,30 75,70 40,50" fill="#38BDF8" opacity="0.8" stroke="#1F2937" strokeWidth="2.5" />
        <polygon points="40,10 5,30 40,50 75,30" fill="#7DD3FC" opacity="0.9" stroke="#1F2937" strokeWidth="2.5" />
        <polygon points="5,30 40,50 40,90 5,70" fill="#0284C7" stroke="#1F2937" strokeWidth="2.5" />
        <circle cx="40" cy="50" r="3" fill="#FFFFFF" />
      </g>

      {/* Desk Surface */}
      <rect x="20" y="240" width="280" height="80" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="3.5" />

      {/* Giant Curved Monitor */}
      <path d="M50 145 Q160 135 270 145 L265 225 Q160 215 55 225 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
      {/* Mesh Polygons on Monitor */}
      <polygon points="80,165 110,155 130,185 95,195" stroke="#38BDF8" strokeWidth="1.5" fill="rgba(56,189,248,0.2)" />
      <polygon points="110,155 150,160 160,190 130,185" stroke="#20D38E" strokeWidth="1.5" fill="rgba(32,211,142,0.2)" />
      <polygon points="150,160 180,150 200,180 160,190" stroke="#F43F5E" strokeWidth="1.5" fill="rgba(244,63,94,0.2)" />

      {/* 3D Artist Character */}
      <path d="M110 270 C110 210 210 210 210 270 Z" fill="#0284C7" stroke="#1F2937" strokeWidth="3" />
      {/* Neck */}
      <rect x="150" y="195" width="20" height="20" fill="#FBCFE8" stroke="#1F2937" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="160" cy="165" r="32" fill="#FBCFE8" stroke="#1F2937" strokeWidth="3" />
      {/* Curly Modern Hair */}
      <circle cx="140" cy="140" r="14" fill="#18181B" />
      <circle cx="160" cy="135" r="15" fill="#18181B" />
      <circle cx="180" cy="140" r="14" fill="#18181B" />
      <circle cx="132" cy="155" r="11" fill="#18181B" />
      <circle cx="188" cy="155" r="11" fill="#18181B" />
      {/* Cyber/Creative Glasses */}
      <rect x="142" y="160" width="16" height="12" rx="3" fill="#38BDF8" opacity="0.8" stroke="#1F2937" strokeWidth="2" />
      <rect x="162" y="160" width="16" height="12" rx="3" fill="#38BDF8" opacity="0.8" stroke="#1F2937" strokeWidth="2" />
      <line x1="158" y1="166" x2="162" y2="166" stroke="#1F2937" strokeWidth="2" />
      {/* Smirk */}
      <path d="M156 182 Q164 185 168 180" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SoundCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Sound Equalizer Waves Floating on Wall */}
      <g transform="translate(40, 50)">
        {[18, 38, 55, 24, 68, 42, 85, 30, 60, 48, 22].map((height, i) => (
          <rect
            key={i}
            x={i * 22}
            y={85 - height}
            width="10"
            height={height}
            rx="4"
            fill="#A855F7"
            opacity="0.8"
          />
        ))}
      </g>

      {/* Desk Surface */}
      <rect x="20" y="240" width="280" height="80" rx="4" fill="#312E81" stroke="#1F2937" strokeWidth="3.5" />

      {/* Audio Mixing Console with Faders */}
      <rect x="40" y="220" width="90" height="55" rx="5" fill="#1E1B4B" stroke="#1F2937" strokeWidth="2.5" />
      <line x1="55" y1="230" x2="55" y2="265" stroke="#4338CA" strokeWidth="2" />
      <rect x="51" y="242" width="8" height="6" rx="1" fill="#20D38E" />
      <line x1="75" y1="230" x2="75" y2="265" stroke="#4338CA" strokeWidth="2" />
      <rect x="71" y="235" width="8" height="6" rx="1" fill="#F43F5E" />
      <line x1="95" y1="230" x2="95" y2="265" stroke="#4338CA" strokeWidth="2" />
      <rect x="91" y="250" width="8" height="6" rx="1" fill="#FBBF24" />
      <line x1="115" y1="230" x2="115" y2="265" stroke="#4338CA" strokeWidth="2" />
      <rect x="111" y="238" width="8" height="6" rx="1" fill="#38BDF8" />

      {/* Studio Condenser Mic with Pop Filter */}
      <g transform="translate(195, 150)">
        <rect x="30" y="40" width="14" height="35" rx="7" fill="#64748B" stroke="#1F2937" strokeWidth="2" />
        <line x1="37" y1="75" x2="37" y2="100" stroke="#1F2937" strokeWidth="3.5" />
        <ellipse cx="37" cy="100" rx="18" ry="6" fill="#334155" stroke="#1F2937" strokeWidth="2" />
        {/* Round Pop Filter */}
        <circle cx="22" cy="55" r="16" fill="rgba(0,0,0,0.3)" stroke="#1F2937" strokeWidth="2" />
        <line x1="22" y1="71" x2="32" y2="85" stroke="#1F2937" strokeWidth="2" />
      </g>

      {/* Sound Designer Character */}
      <path d="M105 270 C105 210 205 210 205 270 Z" fill="#7C3AED" stroke="#1F2937" strokeWidth="3" />
      {/* Neck */}
      <rect x="145" y="195" width="20" height="20" fill="#FED7AA" stroke="#1F2937" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="155" cy="165" r="32" fill="#FED7AA" stroke="#1F2937" strokeWidth="3" />
      {/* Hair */}
      <path d="M130 155 C125 125 185 125 185 155 Z" fill="#374151" />
      {/* Huge Professional Studio Headphones */}
      <path d="M125 155 C120 135 190 135 185 155" stroke="#1F2937" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <ellipse cx="122" cy="165" rx="8" ry="16" fill="#F59E0B" stroke="#1F2937" strokeWidth="2.5" />
      <ellipse cx="188" cy="165" rx="8" ry="16" fill="#F59E0B" stroke="#1F2937" strokeWidth="2.5" />
      {/* Closed Eyes Vibing to Music */}
      <path d="M143 170 Q148 165 153 170" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M158 170 Q163 165 168 170" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      {/* Beat smile */}
      <path d="M150 182 Q156 188 162 182" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ProducerCharacter() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none">
      {/* Delivery Checklist Board on Wall */}
      <rect x="35" y="45" width="75" height="95" rx="6" fill="#FEF08A" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="58" y="38" width="30" height="12" rx="3" fill="#94A3B8" stroke="#1F2937" strokeWidth="2" />
      {/* Checkmarks */}
      <circle cx="48" cy="65" r="5" fill="#20D38E" />
      <line x1="58" y1="65" x2="98" y2="65" stroke="#1F2937" strokeWidth="2" />
      <circle cx="48" cy="85" r="5" fill="#20D38E" />
      <line x1="58" y1="85" x2="92" y2="85" stroke="#1F2937" strokeWidth="2" />
      <circle cx="48" cy="105" r="5" fill="#20D38E" />
      <line x1="58" y1="105" x2="100" y2="105" stroke="#1F2937" strokeWidth="2" />
      <circle cx="48" cy="125" r="5" fill="#F43F5E" />
      <line x1="58" y1="125" x2="88" y2="125" stroke="#1F2937" strokeWidth="2" />

      {/* Clock on Wall */}
      <circle cx="260" cy="65" r="22" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
      <line x1="260" y1="65" x2="260" y2="52" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="260" y1="65" x2="272" y2="65" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />

      {/* Desk Surface */}
      <rect x="20" y="240" width="280" height="80" rx="4" fill="#047857" stroke="#1F2937" strokeWidth="3.5" />

      {/* Film Clapperboard on Desk */}
      <g transform="translate(50, 195) rotate(-8)">
        <rect x="0" y="14" width="48" height="36" rx="3" fill="#18181B" stroke="#1F2937" strokeWidth="2" />
        <rect x="0" y="0" width="48" height="14" rx="2" fill="#E4E4E7" stroke="#1F2937" strokeWidth="2" />
        <polygon points="6,0 12,0 6,14 0,14" fill="#18181B" />
        <polygon points="18,0 24,0 18,14 12,14" fill="#18181B" />
        <polygon points="30,0 36,0 30,14 24,14" fill="#18181B" />
        <polygon points="42,0 48,0 42,14 36,14" fill="#18181B" />
        <text x="6" y="38" fill="#20D38E" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PROD 4K</text>
      </g>

      {/* Executive Producer Character */}
      <path d="M110 270 C110 215 210 215 210 270 Z" fill="#059669" stroke="#1F2937" strokeWidth="3" />
      {/* Neck */}
      <rect x="150" y="195" width="20" height="20" fill="#FBCFE8" stroke="#1F2937" strokeWidth="2.5" />
      {/* Head */}
      <circle cx="160" cy="165" r="32" fill="#FBCFE8" stroke="#1F2937" strokeWidth="3" />
      {/* Elegant Short Wave Hair */}
      <path d="M130 160 C130 120 190 120 190 160 C190 145 180 135 160 135 C140 135 130 145 130 160 Z" fill="#78350F" />
      {/* Warm Smiling Eyes & Glasses */}
      <circle cx="148" cy="165" r="8" stroke="#1F2937" strokeWidth="2" fill="none" />
      <circle cx="172" cy="165" r="8" stroke="#1F2937" strokeWidth="2" fill="none" />
      <line x1="156" y1="165" x2="164" y2="165" stroke="#1F2937" strokeWidth="2" />
      <circle cx="148" cy="165" r="2.5" fill="#1F2937" />
      <circle cx="172" cy="165" r="2.5" fill="#1F2937" />
      {/* Confident Smile */}
      <path d="M152 182 Q160 188 168 182" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// Window Sill Decoration Accents
function SillDecor({ item }: { item: TeamMemberWindow['sillItem'] }) {
  if (item === 'coffee') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span>Espresso &bull; 98% focus</span>
      </div>
    )
  }
  if (item === 'headphones') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
        <span className="w-2 h-2 rounded-full bg-accent-green" />
        <span>Lo-Fi Beats &bull; 120 FPS</span>
      </div>
    )
  }
  if (item === 'plant') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
        <span className="text-sm leading-none">🪴</span>
        <span>Monstera &bull; Sunlight</span>
      </div>
    )
  }
  if (item === 'lamp') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
        <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
        <span>RTX 4090 &bull; Rendering</span>
      </div>
    )
  }
  if (item === 'pencil') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
        <span>48kHz &bull; 24-bit Master</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm text-xs font-medium text-studio-dark">
      <span className="text-sm leading-none">🐱</span>
      <span>Studio Cat &bull; Napping</span>
    </div>
  )
}

export default function MeetTheTeam() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'story' | 'motion' | 'visuals' | 'audio'>('all')

  const filteredMembers = TEAM_MEMBERS.filter(
    (member) => activeFilter === 'all' || member.department === activeFilter
  )

  return (
    <section
      id="meet-the-team"
      className="relative z-20 w-full bg-[#8CE3B8] text-[#111111] py-20 sm:py-28 lg:py-36 px-[24px] overflow-hidden"
    >
      {/* Decorative Architectural Wall Texture Grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#111111 1.5px, transparent 1.5px), linear-gradient(90deg, #111111 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col items-center">
        
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <div className="text-center max-w-3xl flex flex-col items-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 border border-black/10 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#111111] mb-5 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span>Behind the Studio Windows</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-medium text-[44px] sm:text-[62px] md:text-[76px] lg:text-[88px] 2xl:text-[98px] leading-[1.02] tracking-[-0.035em] text-[#111111]"
          >
            Meet the team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] text-[#111111]/80 mt-4 sm:mt-6 leading-relaxed max-w-2xl text-balance"
          >
            A tight-knit crew of 8 specialists in Ho Chi Minh City. Each window is a dedicated craft — from telemetry scripts to 60fps bezier curves.
          </motion.p>

          {/* Department Filter Pills (Responsive Wrap) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8"
          >
            {[
              { id: 'all', label: 'All Windows' },
              { id: 'story', label: 'Story & Scripts' },
              { id: 'motion', label: 'Motion & 3D' },
              { id: 'visuals', label: 'Art Direction' },
              { id: 'audio', label: 'Sound & Foley' },
            ].map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-md scale-105'
                      : 'bg-white/60 hover:bg-white text-[#111111] border border-black/10'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* ===================================================================== */}
        {/* RESPONSIVE ARCHITECTURAL WINDOW GRID (1 Col Mobile -> 2 Col Tablet -> 3 Col Desktop) */}
        {/* ===================================================================== */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredMembers.map((member, index) => {
            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col bg-[#F8F9FA] rounded-[32px] sm:rounded-[40px] border-[5px] sm:border-[6px] border-[#18241D] shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_65px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Architectural Window Header Header Band */}
                <div className="relative w-full pt-4 px-6 flex items-center justify-between border-b-2 border-[#18241D]/15 pb-3 bg-white/70">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: member.accentColor }}
                    />
                    <span className="font-sans font-semibold text-xs sm:text-[13px] tracking-wide text-studio-dark uppercase">
                      Room 0{index + 1}
                    </span>
                  </div>

                  {/* Live Status Pill */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/5 text-[11px] sm:text-xs font-sans font-medium text-studio-gray">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span>{member.status}</span>
                  </span>
                </div>

                {/* ============================================================= */}
                {/* The Window Interior Frame with Vector Character Illustration  */}
                {/* Aspect ratio ~1:1 ensures perfect responsive scaling on any screen */}
                {/* ============================================================= */}
                <div
                  className={`relative w-full aspect-[4/3.8] sm:aspect-[4/3.9] overflow-hidden flex items-center justify-center transition-colors duration-500 ${
                    member.department === 'motion'
                      ? 'bg-[#0F172A]'
                      : member.department === 'audio'
                      ? 'bg-[#1E1B4B]'
                      : member.department === 'visuals'
                      ? 'bg-[#FDF4FF]'
                      : 'bg-[#FFFBEB]'
                  }`}
                >
                  {/* Subtle Diagonal Window Glass Glare Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-10" />

                  {/* Character Illustration SVG */}
                  <div className="relative w-full h-full p-2 transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    {member.id === 'script-strategy' && <StoryCharacter />}
                    {member.id === 'motion-lead' && <MotionCharacter />}
                    {member.id === 'art-direction' && <ArtDirectorCharacter />}
                    {member.id === '3d-systems' && <ThreeDCharacter />}
                    {member.id === 'sound-foley' && <SoundCharacter />}
                    {member.id === 'production-lead' && <ProducerCharacter />}
                  </div>

                  {/* Window Sill Decorative Accent Badge */}
                  <div className="absolute bottom-3 left-4 z-20 pointer-events-none">
                    <SillDecor item={member.sillItem} />
                  </div>
                </div>

                {/* ============================================================= */}
                {/* Window Sill Stone / Wooden Ledge Separator                    */}
                {/* ============================================================= */}
                <div className="w-full h-3 bg-[#E5E7EB] border-y-2 border-[#18241D]/20 shadow-inner" />

                {/* ============================================================= */}
                {/* Member Details & Creative Role Description                    */}
                {/* ============================================================= */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-display font-medium text-[22px] sm:text-[24px] lg:text-[26px] text-studio-dark group-hover:text-black transition-colors">
                        {member.name}
                      </h3>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${member.accentColor}18`,
                          color: member.accentColor,
                        }}
                      >
                        {member.role}
                      </span>
                    </div>

                    <p className="font-sans text-[14px] sm:text-[15px] text-studio-gray leading-relaxed mt-2.5">
                      {member.description}
                    </p>
                  </div>

                  {/* Bottom Window Sill Architectural Feet Accent */}
                  <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-studio-gray font-sans">
                    <span>PSTUDIO &bull; Core Team</span>
                    <span className="group-hover:translate-x-1 transition-transform font-medium text-black inline-flex items-center gap-1">
                      Explore craft &rarr;
                    </span>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* ===================================================================== */}
        {/* BOTTOM STUDIO ARCHITECTURE FOOTER NOTE                                */}
        {/* ===================================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-18 text-center text-xs sm:text-sm text-[#111111]/70 font-sans max-w-xl"
        >
          Want to collaborate with our team directly? We take on 3 new video projects each month to ensure dedicated craft and partner-level focus.
        </motion.div>

      </div>
    </section>
  )
}
