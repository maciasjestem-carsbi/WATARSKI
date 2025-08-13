'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Star, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { CarData } from '@/lib/database-supabase'
import Layout from '@/components/layout'

export default function InventoryPage() {
  const [cars, setCars] = useState<CarData[]>([])
  const [filteredCars, setFilteredCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadCars = async () => {
      try {
        // Use the API endpoint instead of direct database access
        const response = await fetch('/api/cars')
        if (!response.ok) {
          throw new Error('Failed to fetch cars')
        }
        const allCars = await response.json()
        setCars(allCars)
        setFilteredCars(allCars)
      } catch (error) {
        console.error('Error loading cars:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCars()
  }, [])

  useEffect(() => {
    let filtered = cars

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(car => car.type === selectedType)
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(car => car.brand === selectedBrand)
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      filtered = filtered.filter(car => {
        if (max) {
          return car.price >= min && car.price <= max
        } else {
          return car.price >= min
        }
      })
    }

    setFilteredCars(filtered)
  }, [cars, searchTerm, selectedType, selectedBrand, priceRange])

  const brands = Array.from(new Set(cars.map(car => car.brand)))

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

  return (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">WĄTARSKI Włocławek</h1>
            <p className="text-xl text-blue-100 mb-8">
              Przeglądaj nasze samochody - nowe i używane
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Szukaj samochodu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white/20 hover:bg-white/30 border border-white/30"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtry
                  {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Typ samochodu</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-0 text-gray-900"
                      >
                        <option value="all">Wszystkie</option>
                        <option value="new">Nowe</option>
                        <option value="used">Używane</option>
                        <option value="delivery">Dostawcze</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Marka</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-0 text-gray-900"
                      >
                        <option value="all">Wszystkie marki</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cena</label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-0 text-gray-900"
                      >
                        <option value="all">Wszystkie ceny</option>
                        <option value="0-50000">Do 50 000 zł</option>
                        <option value="50000-100000">50 000 - 100 000 zł</option>
                        <option value="100000-200000">100 000 - 200 000 zł</option>
                        <option value="200000-">Powyżej 200 000 zł</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Znalezione samochody ({filteredCars.length})
          </h2>
          <p className="text-gray-600">
            {filteredCars.length === 0 ? 'Nie znaleziono samochodów spełniających kryteria' : 'Przeglądaj nasze oferty'}
          </p>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak wyników</h3>
            <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Link key={car.id} href={`/car/${car.id}`} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative">
                    <Image
                      src={(car.images && car.images.length > 0) ? car.images[0] : (car.imageUrl || '/api/placeholder/400/300')}
                      alt={`${car.brand} ${car.model}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    {car.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Polecane
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {car.brand} {car.model}
                      </h3>
                      {car.version && (
                        <p className="text-blue-600 text-sm font-medium mb-2">{car.version}</p>
                      )}
                      <p className="text-gray-600 text-sm mb-3">{car.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Rok:</span>
                        <p className="font-medium">{car.year}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Przebieg:</span>
                        <p className="font-medium">{car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Paliwo:</span>
                        <p className="font-medium">{car.fuel}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Moc:</span>
                        <p className="font-medium">{car.power} KM</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-2xl font-bold text-blue-600">
                        {car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
} 