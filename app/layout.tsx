import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
export const metadata: Metadata = {
  //  manifest: 'https://nextjs.org/manifest.json',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'Next.js',
  authors: [{ name: 'oeyoews' }, { name: 'oeyoews', url: 'https://github.com/oeyoews' }],
  creator: 'oeyoews',
  applicationName: 'Next.js',
  title: process.env.TITLE,
  description: process.env.DESCRIPTION,
  keywords: ['Next.js', 'React', 'JavaScript', 'Blog'],
  openGraph: {
    images: [
      {
        url: '/next.svg',
        width: 80,
        height: 60
      }
    ],
    title: 'Next.js Blog',
    description: 'Next.js Blog',
    // url: 'https://nextjs.org',
    siteName: 'Next.js Blog',
  },
  //  metadataBase: new URL('https://acme.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}