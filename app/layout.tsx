import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono, Libre_Baskerville } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], variable: '--font-libre' })

export const metadata: Metadata = {
  title: 'Tribuna — Pensamento que se organiza',
  description: 'Análises, relatos e pensamento crítico para quem não aceita o mundo como está.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2eee8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="light bg-background">
      <body className={`${geist.variable} ${geistMono.variable} ${libreBaskerville.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
