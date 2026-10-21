import type { Metadata } from 'next'
import PlaygroundClientView from '@/components/playground/PlaygroundClientView'

export const metadata: Metadata = {
  title: 'Playground & Creative Experiments | PStudio',
  description:
    'An interactive creative lab featuring uncommissioned visual experiments, kinetic motion loops, 3D simulations, and procedural shaders by PStudio.',
  keywords: [
    'Motion Design Playground',
    'Creative Lab',
    '3D Animation Experiments',
    'Kinetic Typography',
    'PStudio Lab',
    'Visual R&D',
  ],
  openGraph: {
    title: 'PStudio Playground — We Love Making Cool Stuff',
    description:
      'Explore uncommissioned visual experiments, kinetic motion loops, and creative R&D from the team at PStudio.',
    url: 'https://pstudio.vn/playground',
    siteName: 'PStudio',
    images: [
      {
        url: '/image/playground/dome.webp',
        width: 1200,
        height: 630,
        alt: 'PStudio Playground',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PStudio Playground — We Love Making Cool Stuff',
    description:
      'Uncommissioned visual experiments, kinetic shaders, and motion design research by PStudio.',
    images: ['/image/playground/dome.webp'],
  },
  alternates: {
    canonical: 'https://pstudio.vn/playground',
  },
}

export default function PlaygroundPage() {
  return <PlaygroundClientView />
}
