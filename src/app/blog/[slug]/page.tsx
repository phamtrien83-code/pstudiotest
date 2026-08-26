import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CalloutFooter from '@/components/CalloutFooter'
import { BLOG_POSTS, BlogPost } from '@/data/blogPosts'
import BlogPostClientArticle from './BlogPostClientArticle'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// 1. Static pre-rendering for all blog slugs
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

// 2. Dynamic SEO & OpenGraph metadata generation for Google & Social Media
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Article Not Found | PStudio',
    }
  }

  const postUrl = `https://pstudio.vn/blog/${post.slug}`

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      url: postUrl,
      siteName: 'PStudio',
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [post.coverImage],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get 2 related posts
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)

  // 3. JSON-LD Schema Markup (BlogPosting) for Rich Google Snippets
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://pstudio.vn${post.coverImage}`,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PStudio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pstudio.vn/image/image 448.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pstudio.vn/blog/${post.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-background text-studio-dark flex flex-col selection:bg-accent-green selection:text-black">
      {/* Inject Google Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Navbar />
      <BlogPostClientArticle post={post} relatedPosts={relatedPosts} />
      <CalloutFooter />
    </main>
  )
}
