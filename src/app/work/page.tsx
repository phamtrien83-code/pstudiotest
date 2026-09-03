import type { Metadata } from 'next'
import { getAllProjects } from '@/data/projects'
import WorkClientView from './WorkClientView'

export const metadata: Metadata = {
  title: 'Our Work — Explainer Video Portfolio | PSTUDIO',
  description:
    'Explore 200+ explainer videos, product demos, and brand animations crafted for SaaS, Tech, Healthcare, and Industrial companies including Amazon, GitLab, Sisense, and Meta.',
  openGraph: {
    title: 'Our Work — Explainer Video Portfolio | PSTUDIO',
    description:
      'Explore 200+ explainer videos, product demos, and brand animations crafted for SaaS, Tech, Healthcare, and Industrial companies.',
    url: 'https://pstudio.co/work',
    siteName: 'PSTUDIO',
  },
}

export default function WorkPage() {
  const projects = getAllProjects()
  return <WorkClientView projects={projects} />
}
