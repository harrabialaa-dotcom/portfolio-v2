import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'Alaa Harrabi · Regional Information Security Architect Africa',
  description: 'Regional Information Security Architect with 6+ years of experience in security architecture, OT/IT security, risk management and cybersecurity governance.',
  keywords: 'Information Security Architecture, Security Risk Assessment, Application Security Reviews, Cybersecurity Governance, OT/IT Security, Vulnerability Management, Secure SDLC, Cloud Security, Dräxlmaier, Africa',
  openGraph: {
    title: 'Alaa Harrabi · Regional Information Security Architect Africa',
    description: 'Cybersecurity governance, security architecture and secure digital transformation across automotive environments.',
    url: 'https://portfolio-v2-liart-three.vercel.app',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <Cursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
