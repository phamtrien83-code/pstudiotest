import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from '@/data/projects'
import ProjectClientView from './ProjectClientView'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) {
    return {
      title: 'Project Not Found | PSTUDIO',
    }
  }

  return {
    title: `${project.title} | ${project.client} — PSTUDIO`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${project.client} — PSTUDIO`,
      description: project.summary,
      url: `https://pstudio.co/work/${project.slug}`,
      siteName: 'PSTUDIO',
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  if (!project) {
    notFound()
  }

  const { prev, next } = getAdjacentProjects(params.slug)

  return (
    <ProjectClientView
      project={project}
      prevProject={prev}
      nextProject={next}
    />
  )
}
