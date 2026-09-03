'use client'

import React from 'react'
import Link from 'next/link'
import { Project } from '@/data/projects'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'
import { useContactModal } from '@/context/ContactModalContext'

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

  return (
    <main className="min-h-screen bg-background text-studio-dark selection:bg-accent-green selection:text-black flex flex-col">
      <Navbar />

      {/* ========================================================================= */}
      {/* TOP BREADCRUMB & BACK LINK                                                */}
      {/* ========================================================================= */}
      <div className="w-full px-[24px] pt-8 sm:pt-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-studio-gray hover:text-black transition-colors"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Work</span>
          </Link>

          <span className="text-xs sm:text-sm font-sans text-studio-gray">
            {project.client} &bull; {project.year}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO & VIDEO PLAYER                                                       */}
      {/* ========================================================================= */}
      <article className="w-full px-[24px] py-6 sm:py-10">
        <div className="max-w-6xl mx-auto flex flex-col">
          {/* Header Info */}
          <div className="mb-8 sm:mb-10 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-studio-dark text-white">
                {project.client}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-accent-green/20 text-accent-forest border border-accent-green/30">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-black/[0.04] text-studio-gray border border-black/5">
                {project.videoType}
              </span>
            </div>

            <h1 className="font-display font-medium text-[34px] sm:text-[48px] md:text-[58px] lg:text-[66px] leading-[1.08] tracking-[-0.035em] text-studio-dark max-w-4xl">
              {project.title}
            </h1>

            <p className="mt-4 text-[18px] sm:text-[21px] text-studio-gray font-sans max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Cinematic 16:9 Video Player Box */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-black shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-black/10">
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
              <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-end p-8 text-center">
                  <span className="text-white/80 font-sans text-sm">
                    High Resolution Artwork Showcase
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* PROJECT METADATA BAR                                                      */}
          {/* ========================================================================= */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-studio-gray/70 mb-1">
                Client
              </span>
              <span className="font-sans font-medium text-[16px] text-studio-dark">
                {project.client}
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-studio-gray/70 mb-1">
                Industry
              </span>
              <span className="font-sans font-medium text-[16px] text-studio-dark">
                {project.industry}
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-studio-gray/70 mb-1">
                Video Format
              </span>
              <span className="font-sans font-medium text-[16px] text-studio-dark">
                {project.videoType}
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-studio-gray/70 mb-1">
                Year
              </span>
              <span className="font-sans font-medium text-[16px] text-studio-dark">
                {project.year}
              </span>
            </div>
          </div>

          {/* Deliverables Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-studio-gray mr-2">
              Deliverables:
            </span>
            {project.deliverables.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.04] text-studio-dark border border-black/5"
              >
                {item}
              </span>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* STORY & CASE STUDY BREAKDOWN                                              */}
          {/* ========================================================================= */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Overview & Solution */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <h2 className="font-display font-medium text-[26px] sm:text-[30px] text-studio-dark mb-4">
                  The Story &amp; Overview
                </h2>
                <p className="font-sans text-[17px] text-studio-dark/85 leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 p-7 rounded-3xl">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] flex items-center justify-center font-bold text-sm mb-4">
                    !
                  </div>
                  <h3 className="font-display font-medium text-[20px] text-studio-dark mb-2">
                    The Challenge
                  </h3>
                  <p className="font-sans text-[15px] text-studio-dark/80 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="bg-[#20D38E]/15 border border-[#20D38E]/30 p-7 rounded-3xl">
                  <div className="w-8 h-8 rounded-full bg-[#20D38E]/30 text-accent-forest flex items-center justify-center font-bold text-sm mb-4">
                    ✓
                  </div>
                  <h3 className="font-display font-medium text-[20px] text-studio-dark mb-2">
                    The PSTUDIO Approach
                  </h3>
                  <p className="font-sans text-[15px] text-studio-dark/80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Takeaways & Highlights */}
              {project.keyPoints && project.keyPoints.length > 0 && (
                <section className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <h3 className="font-display font-medium text-[24px] text-studio-dark mb-6">
                    Key Highlights &amp; Execution
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {project.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-accent-green/30 text-accent-forest flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="font-sans text-[16px] text-studio-dark/85 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Column: Project Sidebar CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="sticky top-[100px] bg-studio-dark text-white p-8 rounded-3xl flex flex-col justify-between shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 text-accent-green text-xs font-semibold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span>Start Your Project</span>
                  </div>

                  <h3 className="font-display font-medium text-[26px] leading-snug mb-3">
                    Need a video like this for your product?
                  </h3>

                  <p className="font-sans text-[15px] text-white/70 leading-relaxed mb-6">
                    We translate complex technology into irresistible video narratives that
                    convert decision makers.
                  </p>
                </div>

                <button
                  onClick={openContactModal}
                  className="w-full py-4 rounded-xl bg-accent-green text-black font-semibold text-[16px] shadow-lg shadow-accent-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Talk about your video</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL GALLERY (STILLS & GIFS)                                            */}
          {/* ========================================================================= */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-accent-forest text-xs font-semibold uppercase tracking-wider mb-2">
                    <span>Scene Stills &amp; Motion Loops</span>
                  </div>
                  <h2 className="font-display font-medium text-[28px] sm:text-[36px] text-studio-dark">
                    Visual Craftsmanship
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((mediaUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/5 border border-black/5 shadow-sm group"
                  >
                    <img
                      src={mediaUrl}
                      alt={`${project.title} scene ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* ADJACENT PROJECTS NAVIGATION                                              */}
          {/* ========================================================================= */}
          <section className="mt-24 pt-12 border-t border-black/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Previous Project */}
              <Link
                href={`/work/${prevProject.slug}`}
                className="group p-6 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
                  <img
                    src={prevProject.thumbnail}
                    alt={prevProject.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors">
                    &larr; Previous Project
                  </span>
                  <span className="font-display font-medium text-[18px] text-studio-dark group-hover:text-black line-clamp-1">
                    {prevProject.title}
                  </span>
                  <span className="text-xs text-studio-gray font-sans mt-0.5">
                    {prevProject.client}
                  </span>
                </div>
              </Link>

              {/* Next Project */}
              <Link
                href={`/work/${nextProject.slug}`}
                className="group p-6 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all flex items-center justify-end gap-4 text-right"
              >
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-semibold text-studio-gray group-hover:text-accent-forest transition-colors">
                    Next Project &rarr;
                  </span>
                  <span className="font-display font-medium text-[18px] text-studio-dark group-hover:text-black line-clamp-1">
                    {nextProject.title}
                  </span>
                  <span className="text-xs text-studio-gray font-sans mt-0.5">
                    {nextProject.client}
                  </span>
                </div>
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
                  <img
                    src={nextProject.thumbnail}
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Global Callout CTA Footer */}
      <CalloutFooter />
    </main>
  )
}
