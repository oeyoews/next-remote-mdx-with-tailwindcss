import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Mdx with TailwindCSS',
  description: 'Next Mdx with TailwindCSS demo project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <body className={`bg-[#F5F5EE]`}> */}
        <Header />
        {children}
      </body>
    </html>
  )
}