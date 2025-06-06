import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Navigation from '@/components/Navigation'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VP of One - Executive Leverage for Solo Leaders',
  description: 'Suite of AI executive assistants for strategy, analytics, and operations. Punch above your weight – lead big with a small team.',
  keywords: 'executive assistant, AI, strategy, analytics, operations, VP, leadership',
  openGraph: {
    title: 'VP of One - Executive Leverage for Solo Leaders',
    description: 'Suite of AI executive assistants for strategy, analytics, and operations',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}