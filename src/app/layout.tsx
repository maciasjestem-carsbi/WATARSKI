import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Volkswagen Wątarski Włocławek - Samochody Osobowe i Dostawcze',
  description: 'Autoryzowany salon Volkswagen Wątarski Włocławek. Samochody osobowe, dostawcze, używane. Serwis, części zamienne, akcesoria.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 