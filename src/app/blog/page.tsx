import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'
import BlogClientView from './BlogClientView'
import { BLOG_POSTS } from '@/data/blogPosts'

export const metadata: Metadata = {
  title: 'Blog & Strategic Insights | PStudio',
  description:
    'Read actionable insights, creative frameworks, and behind-the-scenes case studies on B2B SaaS explainer videos, product storytelling, and motion design.',
  keywords: [
    'B2B SaaS Explainer Videos',
    'Product Storytelling',
    'Motion Design Strategy',
    'Video Marketing Insights',
    'PStudio Blog',
  ],
  openGraph: {
    title: 'PStudio Blog — Insights on B2B SaaS Explainer Videos & Motion Design',
    description:
      'Explore actionable frameworks and creative strategies to turn complex tech into compelling product stories that sell.',
    url: 'https://pstudio.vn/blog',
    siteName: 'PStudio',
    images: [
      {
        url: '/image/Work/10.webp',
        width: 1200,
        height: 630,
        alt: 'PStudio Blog Insights',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PStudio Blog — Strategic Explainer Video Insights',
    description:
      'Actionable frameworks on turning complex software into clear, high-converting product stories.',
    images: ['/image/Work/10.webp'],
  },
  alternates: {
    canonical: 'https://pstudio.vn/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-studio-dark flex flex-col selection:bg-accent-green selection:text-black">
      <Navbar />
      <BlogClientView posts={BLOG_POSTS} />
      <CalloutFooter />
    </main>
  )
}
