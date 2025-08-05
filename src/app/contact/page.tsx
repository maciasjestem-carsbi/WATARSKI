import { Button } from '@/components/ui/button'
import { Car, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Volkswagen Wątarski Włocławek</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-900 hover:text-blue-600">Strona główna</a>
              <a href="/inventory" className="text-gray-900 hover:text-blue-600">Samochody</a>
              <a href="/service" className="text-gray-900 hover:text-blue-600">Serwis</a>
              <a href="/contact" className="text-blue-600 font-medium">Kontakt</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skontaktuj się z nami</h1>
          <p className="text-lg text-gray-600">Jesteśmy do Państwa dyspozycji w sprawie samochodów i serwisu</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dane kontaktowe</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
                  <p className="text-gray-600">54 230 60 60</p>
                  <p className="text-gray-600">+48 515 736 773</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">E-mail</h3>
                  <p className="text-gray-600">salon@watarski.pl</p>
                  <p className="text-gray-600">recepcja@watarski.pl</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Adres</h3>
                  <p className="text-gray-600">ul. Toruńska 169</p>
                  <p className="text-gray-600">87-800 Włocławek</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Godziny otwarcia</h3>
                  <p className="text-gray-600">Poniedziałek - Piątek: 08:00 - 17:00</p>
                  <p className="text-gray-600">Sobota: 09:00 - 13:00</p>
                  <p className="text-gray-600">Niedziela: Nieczynne</p>
                </div>
              </div>
            </div>

            {/* Staff Information */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nasz zespół</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Violetta Augustyniak Tomaszewska</h4>
                  <p className="text-sm text-gray-600">Kierownik sprzedaży</p>
                  <p className="text-sm text-gray-600">Tel: +48 604 105 700</p>
                  <p className="text-sm text-gray-600">violetta.tomaszewska@watarski.pl</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Krystian Kalinowski</h4>
                  <p className="text-sm text-gray-600">Specjalista ds. sprzedaży</p>
                  <p className="text-sm text-gray-600">Tel: +48 664 635 555</p>
                  <p className="text-sm text-gray-600">krystian.kalinowski@watarski.pl</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Adam Bartczak</h4>
                  <p className="text-sm text-gray-600">Specjalista ds. sprzedaży</p>
                  <p className="text-sm text-gray-600">Tel: +48 789 442 423</p>
                  <p className="text-sm text-gray-600">adam.bartczak@watarski.pl</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Wyślij nam wiadomość</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imię *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nazwisko *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temat</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Wybierz temat</option>
                  <option value="general">Zapytanie ogólne</option>
                  <option value="sales">Pytanie o sprzedaż</option>
                  <option value="service">Zapytanie o serwis</option>
                  <option value="test-drive">Jazda próbna</option>
                  <option value="financing">Finansowanie</option>
                  <option value="other">Inne</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wiadomość *</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Opisz, w czym możemy Państwu pomóc..."
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="privacy" className="rounded border-gray-300" required />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności *
                </label>
              </div>

              <Button type="submit" className="w-full">
                Wyślij wiadomość
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Jak nas znaleźć</h2>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Mapa interaktywna będzie tutaj osadzona</p>
              <p className="text-sm text-gray-500">ul. Toruńska 169, 87-800 Włocławek</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 