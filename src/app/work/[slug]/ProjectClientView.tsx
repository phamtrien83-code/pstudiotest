'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'
import { useContactModal } from '@/context/ContactModalContext'
import TicketButton from '@/components/ui/TicketButton'
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react'

interface ProjectClientViewProps {
  project: Project
  prevProject: Project
  nextProject: Project
}

export default function ProjectClientView({
  project,
  prevProject,
  nextProject,
}: ProjectClientViewProps) {
  const { openContactModal } = useContactModal()

  // Ensure we have rich visual assets for the showcase layout:
  // Row 1: 2 items (half width)
  // Row 2: 2 items (wide 8-col + narrow 4-col)
  // Row 3: 4 items (portrait cards)
  const rawGallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.thumbnail]

  const showcaseItems = Array.from({ length: 8 }, (_, i) => rawGallery[i % rawGallery.length])

  return (
    <main className="min-h-screen bg-background text-studio-dark selection:bg-accent-green selection:text-black flex flex-col">
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. FULL WIDTH 16:9 HERO MEDIA (Seamless Borderless)                       */}
      {/* ========================================================================= */}
      <section className="relative w-full aspect-[16/9] bg-black overflow-hidden select-none">
        {/* Top-Left Floating Back Button Pill */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white text-xs sm:text-sm font-sans font-medium transition-all shadow-md"
          >
            <IconArrowLeft
              size={16}
              stroke={2.4}
              className="transform group-hover:-translate-x-1 transition-transform text-accent-green"
            />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* Video Player or High-Res Ambient Artwork */}
        {project.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=0&title=0&byline=0&portrait=0&color=20D38E`}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={project.title}
          />
        ) : project.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={project.title}
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 2. TITLE & METADATA (Borderless Layout matching Figma Node 120:80)         */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-14 sm:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Project Title (Cols 1 to 5) */}
          <div className="lg:col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.04] tracking-[-0.035em] text-[#111111]"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Right Column: Summary & Metadata Info (Cols 6 to 12) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] text-[#111111]/80 leading-relaxed max-w-2xl mb-8 sm:mb-10"
            >
              {project.summary}
            </motion.p>

            {/* Metadata Coordinates (Client, Year, Service - No divider line) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 sm:gap-8 pt-2"
            >
              {/* Client */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Client
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] text-[#111111] leading-snug">
                  {project.client}
                </span>
              </div>

              {/* Year */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Year
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] text-[#111111] leading-snug">
                  {project.year}
                </span>
              </div>

              {/* Service */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Service
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] text-[#111111] leading-snug">
                  {project.videoType}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN SHOWCASE GALLERY (Full Width / Borderless matching Figma)         */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-6 sm:py-10">
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          
          {/* Row 1: Two large 16:9 images side-by-side (Static, No zoom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
            >
              <img
                src={showcaseItems[0]}
                alt={`${project.title} showcase 1`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
            >
              <img
                src={showcaseItems[1]}
                alt={`${project.title} showcase 2`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Row 2: Asymmetric layout (8-col wide + 4-col narrow, Static, No zoom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
            >
              <img
                src={showcaseItems[2]}
                alt={`${project.title} showcase 3`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 relative aspect-[16/9] lg:aspect-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
            >
              <img
                src={showcaseItems[3]}
                alt={`${project.title} showcase 4`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Row 3: Four portrait / vertical motion stills (Static, No zoom) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {showcaseItems.slice(4, 8).map((mediaUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
              >
                <img
                  src={mediaUrl}
                  alt={`${project.title} still ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STORY & STRATEGIC BREAKDOWN                                            */}
      {/* ========================================================================= */}
      {project.overview && (
        <section className="w-full px-[24px] py-14 sm:py-20 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {/* Story Card */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm">
              <span className="text-accent-forest text-xs font-semibold uppercase tracking-wider mb-2 block">
                The Context &amp; Objective
              </span>
              <h2 className="font-display font-medium text-[26px] sm:text-[32px] text-[#111111] mb-4">
                The Narrative
              </h2>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#111111]/80 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] flex items-center justify-center font-bold text-sm mb-4">
                  !
                </span>
                <h3 className="font-display font-medium text-[20px] sm:text-[22px] text-[#111111] mb-3">
                  The Challenge
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] text-[#111111]/75 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <span className="w-8 h-8 rounded-full bg-accent-green/30 text-accent-forest flex items-center justify-center font-bold text-sm mb-4">
                  ✓
                </span>
                <h3 className="font-display font-medium text-[20px] sm:text-[22px] text-[#111111] mb-3">
                  The PSTUDIO Approach
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] text-[#111111]/75 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Project CTA Bar */}
            <div className="p-8 sm:p-10 rounded-3xl bg-studio-dark text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-xl">
                <h3 className="font-display font-medium text-[24px] sm:text-[28px] text-white leading-tight mb-2">
                  Need a video like this for your product?
                </h3>
                <p className="font-sans text-[15px] text-white/70">
                  We turn complex technical capabilities into clear, high-converting video stories.
                </p>
              </div>

              <TicketButton onClick={openContactModal} variant="accent" size="lg">
                Talk about your video
              </TicketButton>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. PREVIOUS / NEXT PROJECT NAVIGATION (Seamless)                          */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Project */}
          <Link
            href={`/work/${prevProject.slug}`}
            data-cursor="project"
            data-cursor-text="Previous"
            className="group p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 cursor-none"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
              <img
                src={prevProject.thumbnail}
                alt={prevProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors mb-1">
                <IconArrowLeft
                  size={14}
                  stroke={2.4}
                  className="transform group-hover:-translate-x-0.5 transition-transform"
                />
                <span>Previous Project</span>
              </span>
              <span className="font-display font-medium text-[18px] sm:text-[20px] text-studio-dark group-hover:text-black line-clamp-1">
                {prevProject.title}
              </span>
              <span className="text-xs text-studio-gray font-sans mt-0.5">
                {prevProject.client} &bull; {prevProject.year}
              </span>
            </div>
          </Link>

          {/* Next Project */}
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="project"
            data-cursor-text="Next"
            className="group p-6 sm:p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-end gap-4 sm:gap-5 text-right cursor-none"
          >
            <div className="flex flex-col">
              <span className="inline-flex items-center justify-end gap-1.5 text-xs uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors mb-1">
                <span>Next Project</span>
                <IconArrowRight
                  size={14}
                  stroke={2.4}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </span>
              <span className="font-display font-medium text-[18px] sm:text-[20px] text-studio-dark group-hover:text-black line-clamp-1">
                {nextProject.title}
              </span>
              <span className="text-xs text-studio-gray font-sans mt-0.5">
                {nextProject.client} &bull; {nextProject.year}
              </span>
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
              <img
                src={nextProject.thumbnail}
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Global Callout CTA Footer */}
      <CalloutFooter />
    </main>
  )
}
