import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProgressBar from '@/components/framer-motion/ProgressBar';

import './globals.css';

import { isDev } from '@/lib/dev';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  alternates: {
    canonical: '/feed.xml',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'rss' }],
    },
  },
  //  manifest: 'https://nextjs.org/manifest.json',
  // robots: {
  //   index: false,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: false,
  //     noimageindex: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // authors: [{ name: 'oeyoews', url: 'https://github.com/oeyoews' }],
  title: process.env.TITLE,
  description: process.env.DESCRIPTION,
  openGraph: {
    images: [
      {
        url: '/next.svg',
        width: 80,
        height: 60,
      },
    ],
    title: 'Next.js Blog',
    description: 'Next.js Blog',
    siteName: 'Next.js Blog',
    // url: 'https://nextjs.org',
  },
  //  metadataBase: new URL('https://acme.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ProgressBar />
        <NavBar />
        {children}
        {!isDev && <Analytics />}
        <Footer />
      </body>
    </html>
  );
}
