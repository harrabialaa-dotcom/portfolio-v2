import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'Alaa Harrabi · IT & Industrial Automation Specialist',
  description: 'IT & Industrial Automation Specialist with 6+ years at Valeo — SAP, MES, OT/IT Integration, Cybersecurity & AI-powered industrial systems.',
  keywords: 'SAP, MES, OPC UA, TISAX, Industrial Automation, IT Specialist, Valeo, Tunisia, DELMIA Apriso, SCADA',
  openGraph: {
    title: 'Alaa Harrabi · IT & Industrial Automation Specialist',
    description: 'Bridging shopfloor OT and enterprise IT in automotive manufacturing.',
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
