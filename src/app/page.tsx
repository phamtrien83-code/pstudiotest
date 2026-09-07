import Navbar from '@/components/common/Navbar'
import Hero from '@/components/home/Hero'
import QuoteSection from '@/components/home/QuoteSection'
import Testimonials from '@/components/home/Testimonials'
import Process from '@/components/home/Process'
import SelectedWork from '@/components/home/SelectedWork'
import FAQ from '@/components/home/FAQ'
import CalloutFooter from '@/components/common/CalloutFooter'

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
