import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import AboutHello from '@/components/about/AboutHello'
import AboutStory from '@/components/about/AboutStory'
import AboutQuoteSection from '@/components/about/AboutQuoteSection'
import MeetTheTeam from '@/components/about/MeetTheTeam'
import CalloutFooter from '@/components/CalloutFooter'

export const metadata: Metadata = {
  title: 'About Us | PSTUDIO',
  description:
    'Learn how PSTUDIO evolved from craft-focused motion designers in Ho Chi Minh City to business problem solvers delivering high-impact video results for SaaS, tech, healthcare, and industrial companies worldwide.',
  openGraph: {
    title: 'About Us | PSTUDIO',
    description:
      'The best video isn’t the prettiest. It’s the one your customer finally understands. Learn about our journey and philosophy.',
    url: 'https://pstudio.co/about',
    siteName: 'PSTUDIO',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-studio-dark flex flex-col selection:bg-accent-green selection:text-black">
      <Navbar />
      <AboutHello />
      <AboutStory />
      <AboutQuoteSection />
      <MeetTheTeam />
      <CalloutFooter />
    </main>
  )
}
