'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Filter, Search, Star } from 'lucide-react'

interface CarData {
  id: string
  type: 'new' | 'used'
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  color: string
  description: string
  imageUrl: string
  status: 'available' | 'sold' | 'reserved'
}

export default function InventoryPage() {
  const [cars] = useState<CarData[]>([
    {
      id: '1',
      type: 'new',
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2024,
      price: 120000,
      mileage: 0,
      fuelType: 'Petrol',
      transmission: 'Manual',
      color: 'Biały',
      description: 'Nowy Volkswagen Golf z pełną gwarancją i najnowszymi funkcjami',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: '2',
      type: 'used',
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2021,
      price: 85000,
      mileage: 45000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      color: 'Niebieski',
      description: 'Dobrze utrzymany Volkswagen Passat z pełną historią serwisową',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: '3',
      type: 'new',
      brand: 'Volkswagen',
      model: 'Transporter',
      year: 2024,
      price: 180000,
      mileage: 0,
      fuelType: 'Diesel',
      transmission: 'Manual',
      color: 'Srebrny',
      description: 'Nowy Volkswagen Transporter - idealny samochód dostawczy',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: '4',
      type: 'used',
      brand: 'Volkswagen',
      model: 'Tiguan',
      year: 2020,
      price: 95000,
      mileage: 65000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Czarny',
      description: 'Volkswagen Tiguan w doskonałym stanie technicznym',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: '5',
      type: 'new',
      brand: 'Volkswagen',
      model: 'ID.4',
      year: 2024,
      price: 200000,
      mileage: 0,
      fuelType: 'Electric',
      transmission: 'Automatic',
      color: 'Niebieski',
      description: 'Nowy Volkswagen ID.4 - w pełni elektryczny SUV',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: '6',
      type: 'used',
      brand: 'Volkswagen',
      model: 'Crafter',
      year: 2019,
      price: 150000,
      mileage: 35000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      color: 'Biały',
      description: 'Volkswagen Crafter - duży samochód dostawczy',
      imageUrl: '/api/placeholder/300/200',
      status: 'available'
    }
  ])

  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    priceRange: '',
    fuelType: '',
    transmission: '',
    year: ''
  })

  const [searchTerm, setSearchTerm] = useState('')

  const filteredCars = cars.filter(car => {
    if (car.status !== 'available') return false
    
    if (searchTerm && !car.model.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !car.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    if (filters.type && car.type !== filters.type) return false
    if (filters.brand && car.brand !== filters.brand) return false
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false
    if (filters.transmission && car.transmission !== filters.transmission) return false
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      if (car.price < min || (max && car.price > max)) return false
    }
    
    if (filters.year && car.year !== parseInt(filters.year)) return false
    
    return true
  })

  // Get unique brands from available cars
  const availableBrands = Array.from(new Set(cars.filter(car => car.status === 'available').map(car => car.brand)))

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
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Wszystkie typy</option>
                <option value="new">Nowe samochody</option>
                <option value="used">Używane samochody</option>
              </select>

              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Wszystkie marki</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Wszystkie ceny</option>
                <option value="0-50000">Do 50 000 PLN</option>
                <option value="50000-100000">50 000 - 100 000 PLN</option>
                <option value="100000-150000">100 000 - 150 000 PLN</option>
                <option value="150000-999999">Powyżej 150 000 PLN</option>
              </select>

              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Wszystkie paliwa</option>
                <option value="Petrol">Benzyna</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Elektryczny</option>
                <option value="Hybrid">Hybryda</option>
                <option value="Plug-in Hybrid">Plug-in Hybryda</option>
              </select>

              <select
                value={filters.transmission}
                onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Wszystkie skrzynie</option>
                <option value="Manual">Manualna</option>
                <option value="Automatic">Automatyczna</option>
                <option value="CVT">CVT</option>
                <option value="Semi-Automatic">Półautomatyczna</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Pokazano {filteredCars.length} z {cars.filter(car => car.status === 'available').length} dostępnych samochodów
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Car className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      car.type === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {car.type === 'new' ? 'Nowy' : 'Używany'}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {car.brand}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{car.model}</h3>
                <p className="text-sm text-gray-600 mb-3">{car.year} • {car.mileage.toLocaleString()}km</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paliwo:</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Skrzynia:</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kolor:</span>
                    <span className="font-medium">{car.color}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{car.price.toLocaleString()} PLN</p>
                    <p className="text-sm text-gray-600">Miesięcznie od {(car.price / 60).toFixed(0)} PLN</p>
                  </div>
                  <Button size="sm">
                    Zobacz szczegóły
                  </Button>
                </div>
              </div>
            </div>
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