import { Button } from '@/components/ui/button'
import { Car, Wrench, Phone, MapPin, Clock, Users, Shield, Star, ArrowRight, CheckCircle, Award, Zap, Search, Filter, Calendar, CreditCard, Truck, Car as CarIcon, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { carDatabase } from '@/lib/database'
import Layout from '@/components/layout'

export default async function HomePage() {
  const featuredCars = await carDatabase.getFeaturedCars()

  return (
    <Layout>
      {/* Hero Section - Volkswagen Style */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm font-medium border border-white/30">
                  <Award className="h-4 w-4" />
                  <span>Autoryzowany salon Volkswagen i Skoda</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  WĄTARSKI
                  <span className="block text-blue-200 text-5xl lg:text-6xl mt-2">Włocławek</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                  Zaufany partner w motoryzacji z wieloletnim doświadczeniem. 
                  Oferujemy nowe samochody Volkswagen i Skoda oraz używane samochody różnych marek.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inventory">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all font-semibold px-8 py-4 text-lg">
                    Przeglądaj samochody
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl font-semibold px-8 py-4 text-lg">
                    Skontaktuj się
                  </Button>
                </Link>
              </div>

              {/* Trust indicators - Volkswagen style */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">30+ lat doświadczenia</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Shield className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">Gwarancja marki</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">1000+ klientów</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Car showcase */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp"
                  alt="Volkswagen T-Roc"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">129 900 zł</p>
                    <p className="text-sm text-gray-600">Volkswagen T-Roc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section - Volkswagen Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wyszukaj samochód</h2>
              <p className="text-lg text-gray-600">Znajdź idealny samochód dla siebie</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Marka, model..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                <option>Wszystkie typy</option>
                <option>Nowe samochody</option>
                <option>Używane samochody</option>
                <option>Samochody dostawcze</option>
              </select>
              <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                <option>Wszystkie ceny</option>
                <option>Do 50 000 PLN</option>
                <option>50 000 - 100 000 PLN</option>
                <option>100 000 - 200 000 PLN</option>
                <option>Powyżej 200 000 PLN</option>
              </select>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold rounded-xl">
                <Search className="h-5 w-5 mr-2" />
                Szukaj
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section - Volkswagen Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Polecane samochody</h2>
            <p className="text-xl text-gray-600">Sprawdź nasze najnowsze oferty</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Link key={car.id} href={`/car/${car.id}`}>
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer h-full flex flex-col">
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                    {car.imageUrl ? (
                      <Image 
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CarIcon className="h-32 w-32 text-blue-600" />
                    )}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {car.type === 'new' ? 'Nowy' : 'Używany'}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h3>
                          <p className="text-gray-600 text-lg">{car.year} • {car.mileage} km • {car.fuel} • {car.power} KM</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-3xl font-bold text-gray-900">{car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł</span>
                      <span className="text-lg text-gray-500 font-medium">{(car.price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł/mies.</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold rounded-xl">
                      Zobacz szczegóły
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/inventory">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Zobacz wszystkie samochody
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Volkswagen Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nasze usługi</h2>
            <p className="text-xl text-gray-600">Kompleksowa obsługa motoryzacyjna w jednym miejscu</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/inventory" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <Car className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Samochody osobowe</h3>
                <p className="text-gray-600 text-center mb-8 text-lg">Nowe Volkswagen i Skoda oraz używane samochody różnych marek</p>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg group-hover:shadow-xl py-4 px-6 text-lg font-semibold rounded-xl">
                    Przeglądaj ofertę
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/inventory" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <Truck className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Samochody dostawcze</h3>
                <p className="text-gray-600 text-center mb-8 text-lg">Transporter i inne modele dostawcze dla Twojej firmy</p>
                <div className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg group-hover:shadow-xl py-4 px-6 text-lg font-semibold rounded-xl">
                    Zobacz dostawcze
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/service" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <Wrench className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Autoryzowany serwis</h3>
                <p className="text-gray-600 text-center mb-8 text-lg">Profesjonalny serwis z gwarancją marki</p>
                <div className="text-center">
                  <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg group-hover:shadow-xl py-4 px-6 text-lg font-semibold rounded-xl">
                    Umów serwis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Volkswagen Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dlaczego WĄTARSKI?</h2>
            <p className="text-xl text-gray-600">Ponad 30 lat doświadczenia w branży motoryzacyjnej</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">30+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lat doświadczenia</h3>
              <p className="text-gray-600">W branży motoryzacyjnej</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">1000+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zadowolonych klientów</h3>
              <p className="text-gray-600">Zaufali nam</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Samochodów w ofercie</h3>
              <p className="text-gray-600">Nowe i używane</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">24/7</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wsparcie techniczne</h3>
              <p className="text-gray-600">Zawsze dostępni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Volkswagen Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skontaktuj się z nami</h2>
            <p className="text-xl text-gray-600">Jesteśmy tutaj, aby Ci pomóc w wyborze idealnego samochodu</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Dane kontaktowe</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Telefon</p>
                    <p className="text-gray-600 text-lg">54 230 60 66</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Adres</p>
                    <p className="text-gray-600 text-lg">ul. Toruńska 123, 87-800 Włocławek</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Godziny otwarcia</p>
                    <p className="text-gray-600 text-lg">Pon-Pt: 8:00-17:00, Sob: 9:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Godziny otwarcia</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                  <span className="font-semibold text-lg">Poniedziałek - Piątek</span>
                  <span className="text-blue-600 font-bold text-lg">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                  <span className="font-semibold text-lg">Sobota</span>
                  <span className="text-green-600 font-bold text-lg">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                  <span className="font-semibold text-lg">Niedziela</span>
                  <span className="text-red-600 font-bold text-lg">Nieczynne</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg py-4 text-lg font-semibold rounded-xl">
                    Skontaktuj się z nami
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Volkswagen Style */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">WĄTARSKI</h3>
                  <p className="text-sm text-gray-400">Włocławek</p>
                </div>
              </div>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Autoryzowany salon Volkswagen i Skoda z wieloletnim doświadczeniem w sprzedaży i serwisie samochodów.
              </p>
              <div className="flex space-x-4 items-center">
                <Phone className="h-6 w-6 text-blue-400" />
                <span className="text-gray-400 text-lg font-semibold">54 230 60 66</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8">Samochody</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/inventory" className="hover:text-white transition-colors text-lg">Nowe samochody</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors text-lg">Używane samochody</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors text-lg">Samochody dostawcze</Link></li>
                <li><Link href="/inventory" className="hover:text-white transition-colors text-lg">Finansowanie</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8">Serwis</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/service" className="hover:text-white transition-colors text-lg">Umów serwis</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors text-lg">Gwarancja</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors text-lg">Części zamienne</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors text-lg">Diagnostyka</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8">Kontakt</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors text-lg">Formularz kontaktowy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors text-lg">Dojazd</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors text-lg">Zespół</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors text-lg">Opinie klientów</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">&copy; 2025 WĄTARSKI Włocławek. Wszystkie prawa zastrzeżone.</p>
            <div className="mt-4">
              <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Panel administracyjny
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
} 