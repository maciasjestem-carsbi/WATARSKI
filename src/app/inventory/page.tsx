'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Search, Filter, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCars, type CarData } from '@/lib/car-data'

export default function InventoryPage() {
  const [cars] = useState<CarData[]>(getAllCars())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  // Get unique brands for filter
  const brands = Array.from(new Set(cars.map(car => car.brand)))

  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || car.type === selectedType
    const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'under50k' && car.price < 50000) ||
                        (priceRange === '50k-100k' && car.price >= 50000 && car.price < 100000) ||
                        (priceRange === '100k-200k' && car.price >= 100000 && car.price < 200000) ||
                        (priceRange === 'over200k' && car.price >= 200000)

    return matchesSearch && matchesType && matchesBrand && matchesPrice
  })

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
              <a href="/inventory" className="text-blue-600 font-medium">Samochody</a>
              <a href="/service" className="text-gray-900 hover:text-blue-600">Serwis</a>
              <a href="/contact" className="text-gray-900 hover:text-blue-600">Kontakt</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Szukaj samochodów po modelu lub marce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Wszystkie typy</option>
                <option value="new">Nowe samochody</option>
                <option value="used">Używane samochody</option>
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Wszystkie marki</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Wszystkie ceny</option>
                <option value="under50k">Do 50 000 PLN</option>
                <option value="50k-100k">50 000 - 100 000 PLN</option>
                <option value="100k-200k">100 000 - 200 000 PLN</option>
                <option value="over200k">Powyżej 200 000 PLN</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Pokazano {filteredCars.length} z {cars.length} samochodów
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <Link key={car.id} href={`/car/${car.id}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {car.imageUrl ? (
                    <Image
                      src={car.imageUrl}
                      alt={car.model}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={`/api/placeholder/400/300`}
                      alt="Placeholder"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      car.type === 'new' ? 'bg-green-100 text-green-800' :
                      car.type === 'used' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
                    </span>
                  </div>
                  {car.featured && (
                    <div className="absolute top-2 left-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h3>
                    <p className="text-gray-600 mb-4">{car.year} • {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km • {car.fuel} • {car.power} KM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">{car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Zobacz szczegóły
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nie znaleziono samochodów</h3>
            <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania lub filtry.</p>
          </div>
        )}
      </div>
    </div>
  )
} 