import { Car, Phone, MapPin, Clock, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

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
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Car className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">WĄTARSKI</h1>
                  <p className="text-sm text-gray-600 font-medium">Włocławek</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Strona główna</Link>
              <Link href="/inventory" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Samochody</Link>
              <Link href="/service" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Serwis</Link>
              <Link href="/contact" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Kontakt</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">54 230 60 66</span>
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
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">WĄTARSKI</h3>
                  <p className="text-sm text-gray-400">Włocławek</p>
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
                  <span className="text-sm">54 230 60 66</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">info@watarski.pl</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">ul. Toruńska 123, 87-800 Włocławek</span>
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
                  Serwis
                </Link>
                <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2024 WĄTARSKI Włocławek. Wszystkie prawa zastrzeżone.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 