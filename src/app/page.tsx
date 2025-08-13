'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Wrench, Phone, MapPin, Clock, Users, Shield, Star, ArrowRight, CheckCircle, Award, Zap, Search, Filter, Calendar, CreditCard, Truck, Car as CarIcon, ChevronRight, Play, WrenchIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import type { CarData } from '@/lib/database'

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<CarData[]>([])
  const [latestCars, setLatestCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentCarIndex, setCurrentCarIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured cars for rotation
        const featuredResponse = await fetch('/api/cars/featured')
        if (featuredResponse.ok) {
          const featured = await featuredResponse.json()
          setFeaturedCars(featured)
        } else {
          console.error('Failed to fetch featured cars:', featuredResponse.status)
        }

        // Fetch latest cars for the section
        const latestResponse = await fetch('/api/cars/latest')
        if (latestResponse.ok) {
          const latest = await latestResponse.json()
          setLatestCars(latest)
        } else {
          console.error('Failed to fetch latest cars:', latestResponse.status)
        }
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Rotate featured cars every 5 seconds
  useEffect(() => {
    if (featuredCars.length > 1) {
      const interval = setInterval(() => {
        setCurrentCarIndex((prev) => (prev + 1) % featuredCars.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [featuredCars.length])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-700">Ładowanie samochodów...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const currentCar = featuredCars[currentCarIndex] || featuredCars[0]

  return (
    <Layout>
      {/* Hero Section - Volkswagen Style */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/images/515255155_1371526357899288_6404303245651664116_n.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm font-medium border border-white/30">
                  <Award className="h-4 w-4" />
                  <span>Autoryzowany Dealer Volkswagen i Skoda</span>
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
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all font-semibold px-8 py-4 text-lg">
                    Skontaktuj się
                  </Button>
                </Link>
              </div>

              {/* Trust indicators - Volkswagen style */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 h-full flex flex-col items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                    <span className="text-white text-sm font-medium">30+ lat doświadczenia</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 h-full flex flex-col items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-300 mb-2" />
                    <span className="text-white text-sm font-medium">Gwarancja marki</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 h-full flex flex-col items-center justify-center">
                    <Star className="h-8 w-8 text-yellow-400 mb-2" />
                    <span className="text-white text-sm font-medium">1000+ klientów</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Car showcase */}
            <div className="relative">
              <div className="relative z-10">
                {currentCar ? (
                  <>
                    {/* Navigation arrows */}
                    {featuredCars.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentCarIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length)}
                          className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
                          <ChevronRight className="h-6 w-6 rotate-180" />
                        </button>
                        <button
                          onClick={() => setCurrentCarIndex((prev) => (prev + 1) % featuredCars.length)}
                          className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                    
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={currentCar.imageUrl || "/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp"}
                        alt={`${currentCar.brand} ${currentCar.model}`}
                        width={600}
                        height={600}
                        className="w-full h-[400px] object-cover object-center"
                      />
                      {/* Gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {currentCar.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł
                        </p>
                        <p className="text-sm text-gray-600">{currentCar.brand} {currentCar.model}</p>
                      </div>
                    </div>
                    
                    {/* Car indicator dots */}
                    {featuredCars.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {featuredCars.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentCarIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentCarIndex 
                                ? 'bg-white shadow-lg' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src="/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp"
                        alt="Volkswagen T-Roc"
                        width={600}
                        height={600}
                        className="w-full h-[400px] object-cover object-center"
                      />
                      {/* Gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">129 900 zł</p>
                        <p className="text-sm text-gray-600">Volkswagen T-Roc</p>
                      </div>
                    </div>
                  </>
                )}
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

      {/* Latest Cars Section - Volkswagen Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Najnowsze samochody</h2>
            <p className="text-xl text-gray-600">Sprawdź nasze najnowsze oferty</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestCars.slice(0, 3).map((car) => (
              <Link key={car.id} href={`/car/${car.id}`}>
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer h-full flex flex-col">
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                    {(car.images && car.images.length > 0) ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={car.images[0]}
                          alt={`${car.brand} ${car.model}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                    ) : car.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={car.imageUrl}
                          alt={`${car.brand} ${car.model}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
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

      {/* Services Section - Professional Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Nasze usługi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Kompleksowa obsługa motoryzacyjna w jednym miejscu - od sprzedaży po serwis</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Link href="/inventory" className="group">
              <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-100/50 backdrop-blur-sm h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Car className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-800 transition-colors">Samochody osobowe</h3>
                <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed flex-1">Nowe Volkswagen i Skoda oraz używane samochody różnych marek</p>
                <div className="text-center mt-auto">
                  <Button className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 shadow-lg group-hover:shadow-xl py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300">
                    Przeglądaj ofertę
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/inventory" className="group">
              <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-100/50 backdrop-blur-sm h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-indigo-600 transition-colors">Samochody dostawcze</h3>
                <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed flex-1">Transporter i inne modele dostawcze dla Twojej firmy</p>
                <div className="text-center mt-auto">
                  <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg group-hover:shadow-xl py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300">
                    Zobacz dostawcze
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link href="/service" className="group">
              <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-100/50 backdrop-blur-sm h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wrench className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-slate-600 transition-colors">Autoryzowany serwis</h3>
                <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed flex-1">Profesjonalny serwis z gwarancją marki</p>
                <div className="text-center mt-auto">
                  <Button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-lg group-hover:shadow-xl py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300">
                    Umów serwis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Professional Design */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Dlaczego WĄTARSKI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Ponad 30 lat doświadczenia w branży motoryzacyjnej</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">30+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">Lat doświadczenia</h3>
              <p className="text-gray-600 leading-relaxed">W branży motoryzacyjnej</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-2xl font-bold text-white">1000+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Zadowolonych klientów</h3>
              <p className="text-gray-600 leading-relaxed">Zaufali nam</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-slate-600 transition-colors">Samochodów w ofercie</h3>
              <p className="text-gray-600 leading-relaxed">Nowe i używane</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-slate-500 transition-colors">Pomoc drogowa</h3>
              <p className="text-gray-600 leading-relaxed">Zawsze dostępni</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 