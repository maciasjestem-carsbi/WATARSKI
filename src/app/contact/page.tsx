import { Button } from '@/components/ui/button'
import { Phone, MapPin, Clock, Mail, Send, Car } from 'lucide-react'
import Layout from '@/components/layout'

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
            <p className="text-xl text-blue-100">
              Skontaktuj się z nami - jesteśmy tutaj, aby Ci pomóc
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WĄTARSKI Włocławek</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Autoryzowany salon Volkswagen i Skoda. Zaufany partner w motoryzacji z wieloletnim doświadczeniem.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telefon</h3>
                    <p className="text-gray-600">54 230 60 66</p>
                    <p className="text-sm text-gray-500">Poniedziałek - Piątek: 8:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@watarski.pl</p>
                    <p className="text-sm text-gray-500">Odpowiemy w ciągu 24 godzin</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adres</h3>
                    <p className="text-gray-600">ul. Toruńska 169</p>
                    <p className="text-gray-600">87-800 Włocławek</p>
                    <p className="text-sm text-gray-500">Województwo kujawsko-pomorskie</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Godziny otwarcia</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Poniedziałek - Piątek: 8:00 - 18:00</p>
                      <p>Sobota: 9:00 - 14:00</p>
                      <p>Niedziela: Zamknięte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Wyślij wiadomość</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jan.kowalski@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temat
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Wybierz temat</option>
                    <option>Zapytanie o samochód</option>
                    <option>Serwis i naprawy</option>
                    <option>Finansowanie</option>
                    <option>Inne</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Napisz swoją wiadomość..."
                  ></textarea>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  <Send className="h-4 w-4 mr-2" />
                  Wyślij wiadomość
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Znajdź nas</h2>
            <p className="text-lg text-gray-600">
              Odwiedź nas w salonie lub skontaktuj się telefonicznie
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nasza lokalizacja</h3>
              <p className="text-gray-600">ul. Toruńska 169, 87-800 Włocławek</p>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
                             <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2418.3740097564764!2d18.985806774502677!3d52.6893410986077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471c987b332f7e4b%3A0x5648f8df0a8d8647!2zVm9sa3N3YWdlbiBXxIV0YXJza2kgV8WCb2PFgmF3ZWs!5e0!3m2!1sen!2spl!4v1755120554044!5m2!1sen!2spl"
                 width="100%"
                 height="400"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="WĄTARSKI Włocławek - ul. Toruńska 169"
                 className="w-full h-96"
               ></iframe>
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Jak do nas trafić?</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Z centrum Włocławka: ul. Toruńska w kierunku północnym</p>
                <p>• Z drogi krajowej A1: zjazd Włocławek-Centrum</p>
                <p>• Parking dla klientów dostępny na miejscu</p>
                <p>• Dogodny dojazd komunikacją miejską</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 