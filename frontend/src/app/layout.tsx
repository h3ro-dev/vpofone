import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
<<<<<<< HEAD
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import '../styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vpofone.com'),
  title: {
    template: '%s | VP of One',
    default: 'VP of One - Executive Leverage for Solo Leaders',
  },
  description: 'Suite of AI executive assistants for strategy, analytics, and operations. Punch above your weight and lead big with a small team.',
  keywords: ['executive assistant', 'AI', 'strategy', 'analytics', 'operations', 'VP', 'leadership', 'productivity'],
  authors: [{ name: 'Utlyze' }],
  creator: 'Utlyze',
  publisher: 'Utlyze',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'VP of One - Executive Leverage for Solo Leaders',
    description: 'Suite of AI executive assistants for strategy, analytics, and operations.',
    url: 'https://vpofone.com',
    siteName: 'VP of One',
    images: [
      {
        url: 'https://vpofone.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VP of One - Executive Leverage for Solo Leaders',
    description: 'Suite of AI executive assistants for strategy, analytics, and operations.',
    creator: '@vpofone',
    images: ['https://vpofone.com/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.json',
  themeColor: '#4169E1',
=======
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
>>>>>>> origin/main
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
  // Replace with your actual Google Analytics ID
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </head>
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider gaId={GA_ID}>
          {children}
        </AnalyticsProvider>
=======
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
>>>>>>> origin/main
      </body>
    </html>
  )
}