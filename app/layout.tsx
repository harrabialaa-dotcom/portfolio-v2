import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'Alaa Harrabi · IT Specialist',
  description: 'Portfolio of Alaa Harrabi — IT Specialist at Valeo, Tunis. Industrial automation, web development, and systems engineering.',
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
