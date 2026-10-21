'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'
import Navbar from '@/components/common/Navbar'
import CalloutFooter from '@/components/common/CalloutFooter'
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
      <section className="relative w-full aspect-[16/9] max-h-[90vh] bg-black overflow-hidden select-none">
        {/* Top-Left Floating Back Button Pill */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 2xl:top-10 2xl:left-10 z-30">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-4 py-2.5 2xl:px-5 2xl:py-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white text-xs sm:text-sm 2xl:text-base font-sans font-medium transition-all shadow-md"
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
      {/* 2. TITLE & METADATA (12-Column Grid Alignment matching Figma Node 120:80)  */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-14 sm:py-20 2xl:py-28">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          
          {/* Left Column: Project Title (Cols 1 to 5) */}
          <div className="lg:col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-medium text-[38px] sm:text-[52px] lg:text-[62px] xl:text-[72px] 2xl:text-[84px] 3xl:text-[96px] leading-[1.04] tracking-[-0.035em] text-[#111111]"
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
              className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[28px] text-[#111111]/80 leading-relaxed max-w-2xl 2xl:max-w-4xl mb-8 sm:mb-10 2xl:mb-14"
            >
              {project.summary}
            </motion.p>

            {/* Metadata Coordinates (Client, Year, Service - Strict 3-Col Alignment) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-[24px] pt-2 2xl:pt-4"
            >
              {/* Client */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] 2xl:text-[15px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Client
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] 2xl:text-[24px] text-[#111111] leading-snug">
                  {project.client}
                </span>
              </div>

              {/* Year */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] 2xl:text-[15px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Year
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] 2xl:text-[24px] text-[#111111] leading-snug">
                  {project.year}
                </span>
              </div>

              {/* Service */}
              <div>
                <span className="block font-sans font-semibold text-xs sm:text-[13px] 2xl:text-[15px] uppercase tracking-wider text-[#20D38E] mb-1.5">
                  Service
                </span>
                <span className="font-display font-medium text-[17px] sm:text-[20px] 2xl:text-[24px] text-[#111111] leading-snug">
                  {project.videoType}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN SHOWCASE GALLERY (Full 12-Column Grid Alignment matching Figma)   */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-6 sm:py-10 2xl:py-16">
        <div className="w-full flex flex-col gap-[24px]">
          
          {/* Row 1: Two large 16:9 images side-by-side (Cols 1-6 & Cols 7-12) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
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
              className="lg:col-span-6 relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
            >
              <img
                src={showcaseItems[1]}
                alt={`${project.title} showcase 2`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Row 2: Asymmetric layout (Cols 1-8 wide + Cols 9-12 narrow) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
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

          {/* Row 3: Four portrait motion stills (Cols 1-3, 4-6, 7-9, 10-12) */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-12 gap-[24px]">
            {showcaseItems.slice(4, 8).map((mediaUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 lg:col-span-3 relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5"
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
      {/* 4. PREVIOUS / NEXT PROJECT NAVIGATION (12-Column Grid Alignment: 6 + 6)    */}
      {/* ========================================================================= */}
      <section className="w-full px-[24px] py-14 sm:py-20 2xl:py-28">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          {/* Previous Project (Cols 1 to 6) */}
          <Link
            href={`/work/${prevProject.slug}`}
            data-cursor="project"
            data-cursor-text="Previous"
            className="lg:col-span-6 group p-6 sm:p-7 2xl:p-9 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5 2xl:gap-6 cursor-none"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
              <img
                src={prevProject.thumbnail}
                alt={prevProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-1.5 text-xs 2xl:text-sm uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors mb-1">
                <IconArrowLeft
                  size={14}
                  stroke={2.4}
                  className="transform group-hover:-translate-x-0.5 transition-transform"
                />
                <span>Previous Project</span>
              </span>
              <span className="font-sans font-medium text-[18px] sm:text-[20px] 2xl:text-[24px] text-studio-dark group-hover:text-black line-clamp-1">
                {prevProject.title}
              </span>
              <span className="text-xs 2xl:text-sm text-studio-gray font-sans mt-0.5">
                {prevProject.client} &bull; {prevProject.year}
              </span>
            </div>
          </Link>

          {/* Next Project (Cols 7 to 12) */}
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="project"
            data-cursor-text="Next"
            className="lg:col-span-6 group p-6 sm:p-7 2xl:p-9 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-end gap-4 sm:gap-5 2xl:gap-6 text-right cursor-none"
          >
            <div className="flex flex-col">
              <span className="inline-flex items-center justify-end gap-1.5 text-xs 2xl:text-sm uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors mb-1">
                <span>Next Project</span>
                <IconArrowRight
                  size={14}
                  stroke={2.4}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </span>
              <span className="font-sans font-medium text-[18px] sm:text-[20px] 2xl:text-[24px] text-studio-dark group-hover:text-black line-clamp-1">
                {nextProject.title}
              </span>
              <span className="text-xs 2xl:text-sm text-studio-gray font-sans mt-0.5">
                {nextProject.client} &bull; {nextProject.year}
              </span>
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
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
