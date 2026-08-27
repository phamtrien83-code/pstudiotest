'use client'

import React from 'react'
import Image from 'next/image'

// Interactive hotspot definitions mapping to the windows in the illustrated building
const TEAM_WINDOWS = [
  {
    id: 'script-strategy',
    title: 'Strategy & Storytelling',
    role: 'Creative Direction & Scripts',
    // Top Right Window: person at desk with laptop & notes
    position: 'top-[16%] right-[3%] lg:right-[6%] w-[26%] h-[18%]',
  },
  {
    id: 'creative-lead',
    title: 'Craft & Motion',
    role: 'Lead Motion Designer',
    // Center Window: person with coffee & document
    position: 'top-[36%] left-[28%] lg:left-[30%] w-[26%] h-[20%]',
  },
  {
    id: 'art-direction',
    title: 'Art Direction & Swatches',
    role: 'Visual & Brand Systems',
    // Middle Right Window: person writing with lamp
    position: 'top-[36%] right-[10%] lg:right-[12%] w-[28%] h-[18%]',
  },
  {
    id: 'production-planning',
    title: 'Storyboard & Layout',
    role: 'Production & Animation',
    // Bottom Left Window: person with papers & books
    position: 'bottom-[8%] left-[2%] lg:left-[5%] w-[26%] h-[20%]',
  },
  {
    id: 'sound-render',
    title: 'Direction & Master Craft',
    role: 'Founder & Senior Director',
    // Bottom Right Window: veteran creator at drafting desk
    position: 'bottom-[8%] right-[8%] lg:right-[10%] w-[28%] h-[20%]',
  },
]

export default function MeetTheTeam() {
  return (
    <section
      id="meet-the-team"
      className="relative z-30 md:-mt-[100vh] w-full bg-[#8CE3B8] text-[#111111] overflow-hidden"
    >
      <div className="w-full max-w-[1512px] mx-auto flex flex-col items-center pt-16 sm:pt-24 pb-12 sm:pb-20">
        
        {/* Section Header: Clean title only */}
        <div className="text-center px-6 mb-8 sm:mb-12">
          <h2 className="font-display font-medium text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.02] tracking-[-0.035em] text-[#111111]">
            Meet the team
          </h2>
        </div>

        {/* Full-width Illustrated Building Visual Showcase */}
        <div className="relative w-full aspect-[1512/2434] overflow-hidden">
          <Image
            src="/image/image 427.png"
            alt="PSTUDIO Team Illustrated Building"
            fill
            priority
            className="object-contain object-top"
            sizes="100vw"
          />

          {/* Interactive Window Highlights (Hoverable tooltips over the window scenes) */}
          {TEAM_WINDOWS.map((window) => (
            <div
              key={window.id}
              className={`group absolute cursor-pointer rounded-xl transition-all duration-300 ${window.position}`}
            >
              {/* Subtle hover pulse border overlay */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-black/30 group-hover:bg-white/10 transition-all duration-300" />

              {/* Floating Tooltip Pill on Hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 whitespace-nowrap bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>{window.title}</span>
                <span className="text-white/60 text-[11px]">&bull; {window.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
