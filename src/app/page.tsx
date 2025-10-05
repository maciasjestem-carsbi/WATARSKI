'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Wrench, Phone, MapPin, Clock, Users, Shield, Star, ArrowRight, CheckCircle, Award, Zap, Search, Filter, Calendar, CreditCard, Truck, Car as CarIcon, ChevronRight, Play, WrenchIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import type { CarData } from '@/lib/database-supabase'

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<CarData[]>([])
  const [latestCars, setLatestCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentCarIndex, setCurrentCarIndex] = useState(0)
  const [showConfigurator, setShowConfigurator] = useState(false)
  
  // Search filters state (multiple selections)
  const [searchFilters, setSearchFilters] = useState({
    brand: [] as string[],
    type: [] as string[],
    fuel: [] as string[],
    transmission: [] as string[]
  })
  
  // Dropdown states
  const [openDropdowns, setOpenDropdowns] = useState({
    brand: false,
    type: false,
    fuel: false,
    transmission: false
  })
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    const setTheme = () => setIsDarkTheme(!!mq?.matches)
    setTheme()
    mq?.addEventListener('change', setTheme)
    return () => mq?.removeEventListener('change', setTheme)
  }, [])

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        closeAllDropdowns()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: keyof typeof openDropdowns) => {
    setOpenDropdowns(prev => {
      // Close all other dropdowns first, then toggle the current one
      const newState = {
        brand: false,
        type: false,
        fuel: false,
        transmission: false
      }
      newState[dropdown] = !prev[dropdown]
      return newState
    })
  }
  
  const selectOption = (key: keyof typeof searchFilters, value: string) => {
    if (value === '') return // Ignore placeholder clicks
    
    setSearchFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value) // Remove if already selected
        : [...prev[key], value] // Add if not selected
    }))
  }
  
  const closeAllDropdowns = () => {
    setOpenDropdowns({
      brand: false,
      type: false,
      fuel: false,
      transmission: false
    })
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    // Handle multiple brand selections
    if (searchFilters.brand.length > 0) {
      searchFilters.brand.forEach(brand => params.append('brand', brand))
    }
    
    // Handle multiple type selections
    if (searchFilters.type.length > 0) {
      searchFilters.type.forEach(type => {
        if (type === 'osobowe') {
          params.append('type', 'new')
          params.append('segment', 'osobowe')
        } else if (type === 'dostawcze') {
          params.append('type', 'new')
          params.append('segment', 'dostawcze')
        } else if (type === 'certyfikowane') {
          params.append('segment', 'certyfikowane')
        }
      })
    }
    
    // Handle multiple fuel selections
    if (searchFilters.fuel.length > 0) {
      searchFilters.fuel.forEach(fuel => params.append('fuel', fuel))
    }
    
    // Handle multiple transmission selections
    if (searchFilters.transmission.length > 0) {
      searchFilters.transmission.forEach(transmission => params.append('transmission', transmission))
    }
    
    const searchUrl = `/inventory${params.toString() ? `?${params.toString()}` : ''}`
    window.location.href = searchUrl
  }

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

  // Use black variants by default (white tile background)
  const vwLogoSrc = '/images/vw%20brand%20logo%20black.png'
  const vwdLogoSrc = '/images/vw%20dostawcze%20brand%20logo%20black.png'
  const skodaLogoSrc = '/images/skoda%20brand%20logo%20black.png'

  return (
    <Layout>
      {/* Hero Section - Volkswagen Style */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden min-h-[40vh] flex items-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/images/515255155_1371526357899288_6404303245651664116_n.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80"></div>
        
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:col-span-1">
              {/* Logo aligned with carousel top */}
              <div className="flex items-center justify-start mb-8">
                <img 
                  src="/images/brands%20white.png" 
                  alt="Autoryzowany Dealer Volkswagen, Skoda, Volkswagen Commercial Vehicles" 
                  className="h-24 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/brands%20black.png';
                  }}
                />
              </div>

              {/* CTA Buttons */}
              <div className="w-full max-w-3xl mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                   {/* Primary CTA spans 2 cols on md+ */}
                   <Link href="/inventory" className="md:col-span-5">
                     <Button
                       size="lg"
                       className="w-full rounded-xl bg-white text-blue-800 hover:bg-blue-50 shadow-xl font-semibold px-12 py-6 text-xl md:text-3xl flex items-center justify-center whitespace-normal text-center"
                     >
                       <span className="mr-3">Przeglądaj samochody</span>
                       <ArrowRight className="h-7 w-7" />
                     </Button>
                   </Link>
                   {/* Secondary CTAs: contact narrower (2) and configurator wider (3) */}
                   <Link href="/contact" className="md:col-span-2">
                     <Button
                       size="lg"
                       className="w-full rounded-xl bg-white/90 text-blue-800 hover:bg-white shadow-lg font-semibold px-8 py-5 text-lg md:text-2xl whitespace-normal text-center"
                     >
                       Skontaktuj się
                     </Button>
                   </Link>
                   <div className="md:col-span-3">
                     <Button
                       size="lg"
                       variant="outline"
                       className="w-full rounded-xl bg-white/10 text-white border-white/40 hover:bg-white/20 shadow-lg font-semibold px-10 py-5 text-base md:text-lg whitespace-normal text-center"
                       onClick={() => setShowConfigurator(true)}
                     >
                       Skonfiguruj nowy samochód
                     </Button>
                   </div>
                 </div>
              </div>

              {/* Trust indicators - square tiles aligned with price box bottom */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 aspect-square overflow-hidden flex flex-col items-center justify-center text-center p-3 min-w-0">
                  <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                  <span className="text-white text-xs sm:text-sm leading-tight font-medium break-words">30+ lat doświadczenia</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 aspect-square overflow-hidden flex flex-col items-center justify-center text-center p-3 min-w-0">
                  <CreditCard className="h-8 w-8 text-blue-200 mb-2" />
                  <span className="text-white text-xs sm:text-sm leading-tight font-medium break-words">Leasing, Kredyt, Najem</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 aspect-square overflow-hidden flex flex-col items-center justify-center text-center p-3 min-w-0">
                  <WrenchIcon className="h-8 w-8 text-yellow-200 mb-2" />
                  <span className="text-white text-xs sm:text-sm leading-tight font-medium break-words">Pakiety przeglądów</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 aspect-square overflow-hidden flex flex-col items-center justify-center text-center p-3 min-w-0">
                  <Shield className="h-8 w-8 text-blue-300 mb-2" />
                  <span className="text-white text-xs sm:text-sm leading-tight font-medium break-words">Gwarancja</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 aspect-square overflow-hidden flex flex-col items-center justify-center text-center p-3 min-w-0">
                  <Users className="h-8 w-8 text-purple-200 mb-2" />
                  <span className="text-white text-xs sm:text-sm leading-tight font-medium break-words">1000+ zadowolonych klientów</span>
                </div>
              </div>
            </div>
 
            {/* Right side - Car showcase (wider) */}
            <div className="relative mt-6 lg:mt-0">
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
                    
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[16/9] w-full min-h-[320px]">
                      <Link href={`/car/${currentCar.id}`} className="block">
                        <Image
                          src={currentCar.imageUrl || "/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp"}
                          alt={`${currentCar.brand} ${currentCar.model}`}
                          fill
                          className="object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                      </Link>
                    </div>
                    
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                      <Link href={`/car/${currentCar.id}`} className="block hover:scale-105 transition-transform duration-200">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {currentCar.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł
                          </p>
                          <p className="text-sm text-gray-600">{currentCar.brand} {currentCar.model}</p>
                        </div>
                      </Link>
                    </div>
                    
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
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[16/9] w-full min-h-[320px]">
                      <Link href="/inventory" className="block">
                        <Image
                          src="/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp"
                          alt="Volkswagen T-Roc"
                          fill
                          className="object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                      </Link>
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                      <Link href="/inventory" className="block hover:scale-105 transition-transform duration-200">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">129 900 zł</p>
                          <p className="text-sm text-gray-600">Volkswagen T-Roc</p>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Configurator Modal */}
        {showConfigurator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowConfigurator(false)} />
            <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Skonfiguruj swój nowy samochód</h3>
                <button onClick={() => setShowConfigurator(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-xl p-6">
                  <a href="https://www.volkswagen.pl/pl/konfigurator.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <img src={vwLogoSrc} alt="Volkswagen" className="h-16 w-auto"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/vw%20brand%20logo%20white.png' }} />
                  </a>
                </div>
                <div className="border rounded-xl p-6">
                  <a href="https://www.vwdostawcze.pl/pl/konfigurator.html?---=%7B%22configuration-step-navigation-service%22%3A%22%2F%3FconfigStep%3D%257B%2522context%2522%253A%2522mofa-standalone%2522%252C%2522selectedStep%2522%253A%2522carline%2522%257D%22%7D" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <img src={vwdLogoSrc} alt="Volkswagen Dostawcze" className="h-20 md:h-24 w-auto"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/vw%20dostawcze%20brand%20logo%20white.png' }} />
                  </a>
                </div>
                <div className="border rounded-xl p-6">
                  <a href="https://cc.skoda-auto.com/pol/pl-pl?pagegroup=Website&salesprogram=POL&type=Car%20configurator" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <img src={skodaLogoSrc} alt="Škoda" className="h-20 md:h-24 w-auto"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/skoda%20brand%20logo%20white.png' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Search Section - Volkswagen Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Wyszukaj samochód</h2>
              <p className="text-lg text-gray-600">Znajdź idealny samochód dla siebie</p>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown('brand')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-left flex items-center justify-between overflow-hidden"
                >
                  <span className={searchFilters.brand.length > 0 ? '' : 'text-gray-500'}>
                    {searchFilters.brand.length > 0 
                      ? searchFilters.brand.join(', ') 
                      : 'Marka'
                    }
                  </span>
                  <svg 
                    className={`h-5 w-5 transition-transform ${openDropdowns.brand ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.brand && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div 
                      onClick={() => selectOption('brand', 'Volkswagen')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Volkswagen
                    </div>
                    <div 
                      onClick={() => selectOption('brand', 'Volkswagen Dostawcze')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Volkswagen Dostawcze
                    </div>
                    <div 
                      onClick={() => selectOption('brand', 'Skoda')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Skoda
                    </div>
                    <div 
                      onClick={() => selectOption('brand', 'Inne')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Inne
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown('type')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-left flex items-center justify-between overflow-hidden"
                >
                  <span className={searchFilters.type.length > 0 ? '' : 'text-gray-500'}>
                    {searchFilters.type.length > 0 
                      ? searchFilters.type.map(t => 
                          t === 'osobowe' ? 'Nowe osobowe' : 
                          t === 'dostawcze' ? 'Nowe dostawcze' : 
                          t === 'certyfikowane' ? 'Certyfikowane używane' : t
                        ).join(', ')
                      : 'Typ pojazdu'
                    }
                  </span>
                  <svg 
                    className={`h-5 w-5 transition-transform ${openDropdowns.type ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.type && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                    <div 
                      onClick={() => selectOption('type', 'osobowe')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Nowe osobowe
                    </div>
                    <div 
                      onClick={() => selectOption('type', 'dostawcze')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Nowe dostawcze
                    </div>
                    <div 
                      onClick={() => selectOption('type', 'certyfikowane')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Certyfikowane używane
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown('fuel')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-left flex items-center justify-between overflow-hidden"
                >
                  <span className={searchFilters.fuel.length > 0 ? '' : 'text-gray-500'}>
                    {searchFilters.fuel.length > 0 
                      ? searchFilters.fuel.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ')
                      : 'Rodzaj paliwa'
                    }
                  </span>
                  <svg 
                    className={`h-5 w-5 transition-transform ${openDropdowns.fuel ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.fuel && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                    <div 
                      onClick={() => selectOption('fuel', 'benzyna')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Benzyna
                    </div>
                    <div 
                      onClick={() => selectOption('fuel', 'diesel')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Diesel
                    </div>
                    <div 
                      onClick={() => selectOption('fuel', 'hybryda')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Hybryda
                    </div>
                    <div 
                      onClick={() => selectOption('fuel', 'elektryk')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Elektryk
                    </div>
                    <div 
                      onClick={() => selectOption('fuel', 'lpg')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      LPG
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown('transmission')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-left flex items-center justify-between overflow-hidden"
                >
                  <span className={searchFilters.transmission.length > 0 ? '' : 'text-gray-500'}>
                    {searchFilters.transmission.length > 0 
                      ? searchFilters.transmission.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')
                      : 'Skrzynia biegów'
                    }
                  </span>
                  <svg 
                    className={`h-5 w-5 transition-transform ${openDropdowns.transmission ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.transmission && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                    <div 
                      onClick={() => selectOption('transmission', 'automatyczna')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Automatyczna
                    </div>
                    <div 
                      onClick={() => selectOption('transmission', 'manualna')}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      Manualna
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold rounded-xl"
              >
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                    ) : (
                      <CarIcon className="h-32 w-32 text-blue-600" />
                    )}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      car.type === 'new' ? 'bg-green-100 text-green-800' : 
                      car.type === 'used' ? 'bg-purple-100 text-purple-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
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