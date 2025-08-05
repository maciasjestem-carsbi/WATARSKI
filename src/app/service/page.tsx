import { Button } from '@/components/ui/button'
import { Car, Wrench, Clock, Shield, Users, Phone, Mail } from 'lucide-react'

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">WĄTARSKI Włocławek</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-900 hover:text-blue-600">Strona główna</a>
              <a href="/inventory" className="text-gray-900 hover:text-blue-600">Samochody</a>
              <a href="/service" className="text-blue-600 font-medium">Serwis</a>
              <a href="/contact" className="text-gray-900 hover:text-blue-600">Kontakt</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Autoryzowany Serwis Volkswagen</h1>
          <p className="text-lg text-gray-600">Profesjonalny serwis z gwarancją marki Volkswagen</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Serwis mechaniczny</h3>
            <p className="text-gray-600 mb-4">Kompleksowa obsługa mechaniczna wszystkich modeli Volkswagen</p>
            <Button className="w-full">Umów wizytę</Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gwarancja</h3>
            <p className="text-gray-600 mb-4">Pełna gwarancja marki Volkswagen na wszystkie usługi</p>
            <Button className="w-full">Sprawdź gwarancję</Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Szybki serwis</h3>
            <p className="text-gray-600 mb-4">Ekspresowa obsługa w trybie priorytetowym</p>
            <Button className="w-full">Zarezerwuj termin</Button>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nasze usługi serwisowe</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Przeglądy okresowe
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Naprawy silników i skrzyń biegów
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Diagnostyka komputerowa
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Serwis klimatyzacji
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Wymiana olejów i filtrów
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Naprawy układów hamulcowych
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Godziny otwarcia serwisu</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Poniedziałek - Piątek:</span>
                <span className="font-medium">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sobota:</span>
                <span className="font-medium">Nieczynne</span>
              </div>
              <div className="flex justify-between">
                <span>Niedziela:</span>
                <span className="font-medium">Nieczynne</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Kontakt serwisowy</h3>
              <p className="text-sm text-gray-600">Tel: 54 230 60 66</p>
              <p className="text-sm text-gray-600">E-mail: serwis@watarski.pl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 