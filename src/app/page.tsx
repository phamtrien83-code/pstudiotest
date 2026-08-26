import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import QuoteSection from '@/components/QuoteSection'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import SelectedWork from '@/components/SelectedWork'
import FAQ from '@/components/FAQ'
import CalloutFooter from '@/components/CalloutFooter'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-studio-dark flex flex-col selection:bg-accent-green selection:text-black">
      <Navbar />
      <Hero />
      <QuoteSection />
      <Testimonials />
      <Process />
      <SelectedWork />
      <FAQ />
      <CalloutFooter />
    </main>
  )
}
