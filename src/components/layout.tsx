import { Car, Phone, MapPin, Clock, Mail, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Logo from './logo'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="mr-4">
                  <Logo size="md" />
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Strona główna</Link>

              {/* Samochody dropdown */}
              <div className="relative group">
                <Link href="/inventory" className="text-gray-900 hover:text-blue-600 transition-colors font-medium inline-flex items-center">
                  Samochody
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg py-2">
                  <Link href="/inventory?type=new&segment=osobowe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nowe osobowe</Link>
                  <Link href="/inventory?type=new&segment=dostawcze" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nowe dostawcze</Link>
                  <Link href="/inventory?segment=certyfikowane" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Certyfikowane Używane</Link>
                </div>
              </div>

              <Link href="/service" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Usługi</Link>
              <Link href="/contact" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">O nas</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">54 230 60 60</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3">
                  <Logo size="sm" color="white" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Autoryzowany salon Volkswagen i Skoda. Zaufany partner w motoryzacji z wieloletnim doświadczeniem.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Dane kontaktowe</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">54 230 60 60</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">info@watarski.pl</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">ul. Toruńska 169, 87-800 Włocławek</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Godziny otwarcia</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <div className="text-sm">
                    <div>Poniedziałek - Piątek: 8:00 - 18:00</div>
                    <div>Sobota: 9:00 - 14:00</div>
                    <div>Niedziela: Zamknięte</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Szybkie linki</h4>
              <div className="space-y-2">
                <Link href="/inventory" className="block text-sm text-gray-400 hover:text-white transition-colors">
                  Samochody
                </Link>
                <Link href="/service" className="block text-sm text-gray-400 hover:text-white transition-colors">
                  Usługi
                </Link>
                <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">
                  O nas
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2025 WĄTARSKI Włocławek. Wszystkie prawa zastrzeżone.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="https://www.facebook.com/Watarski" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/watarski.wloclawek" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Panel admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 