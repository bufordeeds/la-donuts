import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>

      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'La Donuts | Fresh handmade donuts in Gillette, WY',
    template: '%s | La Donuts',
  },
  description:
    'Warm, fluffy handmade donuts made fresh every morning in Gillette, Wyoming. Classic favorites, filled donuts, and rotating specialty flavors. Order for pickup at our trailer.',
  keywords: [
    'donuts',
    'Gillette',
    'Wyoming',
    'La Donuts',
    'handmade donuts',
    'fresh donuts',
    'specialty donuts',
  ],
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
