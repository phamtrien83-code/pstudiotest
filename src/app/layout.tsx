import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import FigmaGrid from '@/components/FigmaGrid'
import { ContactModalProvider } from '@/context/ContactModalContext'
import ContactModal from '@/components/ContactModal'
import ProjectCursor from '@/components/ui/ProjectCursor'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PStudio - Strategic Explainer Videos',
  description: "We're a creative studio specializing in strategic Explainer Videos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-background text-studio-dark font-body min-h-screen">
        <ContactModalProvider>
          <FigmaGrid />
          <ProjectCursor />
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  )
}
