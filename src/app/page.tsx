import { Button } from '@/components/ui/button'
import { Car, Wrench, Phone, MapPin, Clock, Users, Shield, Star, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Car className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Volkswagen Wątarski</h1>
                <p className="text-sm text-gray-600">Włocławek</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Strona główna</Link>
              <Link href="/inventory" className="text-gray-900 hover:text-blue-600 transition-colors">Samochody</Link>
              <Link href="/service" className="text-gray-900 hover:text-blue-600 transition-colors">Serwis</Link>
              <Link href="/contact" className="text-gray-900 hover:text-blue-600 transition-colors">Kontakt</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">54 230 60 66</span>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                Umów wizytę
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/dealership-bg.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  <Award className="h-4 w-4" />
                  <span>Autoryzowany salon Volkswagen</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Volkswagen Wątarski
                  <span className="block text-blue-200">Włocławek</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Zaufany partner w motoryzacji z wieloletnim doświadczeniem. 
                  Oferujemy nowe i używane samochody Volkswagen oraz profesjonalny serwis.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inventory">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all">
                    Przeglądaj samochody
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl">
                    Skontaktuj się
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white text-sm">30+ lat doświadczenia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-300" />
                  <span className="text-white text-sm">Gwarancja marki</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white text-sm">1000+ zadowolonych klientów</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center group">
                    <div className="bg-white/20 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all transform group-hover:scale-110">
                      <Car className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Samochody osobowe</h3>
                    <p className="text-sm text-blue-100">Nowe i używane</p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-white/20 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all transform group-hover:scale-110">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Autoryzowany serwis</h3>
                    <p className="text-sm text-blue-100">Gwarancja marki</p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-white/20 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all transform group-hover:scale-110">
                      <Wrench className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Samochody dostawcze</h3>
                    <p className="text-sm text-blue-100">Dla firm</p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-white/20 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all transform group-hover:scale-110">
                      <Zap className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Finansowanie</h3>
                    <p className="text-sm text-blue-100">Dogodne warunki</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dlaczego Volkswagen Wątarski?</h2>
            <p className="text-xl text-gray-600">Ponad 30 lat doświadczenia w branży motoryzacyjnej</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-2xl font-bold text-white">30+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lat doświadczenia</h3>
              <p className="text-gray-600">W branży motoryzacyjnej</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-2xl font-bold text-white">1000+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zadowolonych klientów</h3>
              <p className="text-gray-600">Zaufali nam</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-2xl font-bold text-white">50+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Samochodów w ofercie</h3>
              <p className="text-gray-600">Nowe i używane</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wsparcie techniczne</h3>
              <p className="text-gray-600">Zawsze dostępni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nasze usługi</h2>
            <p className="text-xl text-gray-600">Kompleksowa obsługa motoryzacyjna w jednym miejscu</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/inventory" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Samochody osobowe</h3>
                <p className="text-gray-600 text-center mb-6">Nowe i używane samochody Volkswagen i Skoda z pełną gwarancją</p>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg group-hover:shadow-xl">
                    Przeglądaj ofertę
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/inventory" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Samochody dostawcze</h3>
                <p className="text-gray-600 text-center mb-6">Transporter i inne modele dostawcze dla Twojej firmy</p>
                <div className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg group-hover:shadow-xl">
                    Zobacz dostawcze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/service" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Wrench className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Autoryzowany serwis</h3>
                <p className="text-gray-600 text-center mb-6">Profesjonalny serwis z gwarancją marki Volkswagen</p>
                <div className="text-center">
                  <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg group-hover:shadow-xl">
                    Umów serwis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skontaktuj się z nami</h2>
            <p className="text-xl text-gray-600">Jesteśmy tutaj, aby Ci pomóc w wyborze idealnego samochodu</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Dane kontaktowe</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Telefon</p>
                    <p className="text-gray-600">54 230 60 66</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adres</p>
                    <p className="text-gray-600">ul. Toruńska 123, 87-800 Włocławek</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Godziny otwarcia</p>
                    <p className="text-gray-600">Pon-Pt: 8:00-17:00, Sob: 9:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Godziny otwarcia</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-medium">Poniedziałek - Piątek</span>
                  <span className="text-blue-600 font-semibold">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-medium">Sobota</span>
                  <span className="text-green-600 font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-medium">Niedziela</span>
                  <span className="text-red-600 font-semibold">Nieczynne</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                    Skontaktuj się z nami
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-4">
                  <Car className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Volkswagen Wątarski</h3>
                  <p className="text-sm text-gray-400">Włocławek</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Autoryzowany salon Volkswagen z wieloletnim doświadczeniem w sprzedaży i serwisie samochodów.
              </p>
              <div className="flex space-x-4">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">54 230 60 66</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Samochody</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/inventory" className="hover:text-white transition-colors">Nowe samochody</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors">Używane samochody</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors">Samochody dostawcze</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors">Finansowanie</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Serwis</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/service" className="hover:text-white transition-colors">Umów serwis</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors">Gwarancja</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors">Części zamienne</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors">Diagnostyka</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Kontakt</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Formularz kontaktowy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Dojazd</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Zespół</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Opinie klientów</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Volkswagen Wątarski Włocławek. Wszystkie prawa zastrzeżone.</p>
            <div className="mt-2">
              <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Panel administracyjny
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 