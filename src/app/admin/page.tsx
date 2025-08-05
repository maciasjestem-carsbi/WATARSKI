'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Plus, Edit, Trash2, Eye, Download, RefreshCw } from 'lucide-react'
import { carBrands, getAllBrands, getNewCarBrands } from '@/lib/car-brands'
import ImageUpload from '@/components/ui/image-upload'

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
  source?: 'manual' | 'otomoto'
}

export default function AdminPage() {
  const [cars, setCars] = useState<CarData[]>([
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
      status: 'available',
      source: 'manual'
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
      status: 'available',
      source: 'manual'
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
      status: 'available',
      source: 'manual'
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
      status: 'available',
      source: 'manual'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState<CarData | null>(null)
  const [isScraping, setIsScraping] = useState(false)

  const [formData, setFormData] = useState({
    type: 'new' as 'new' | 'used',
    brand: 'Volkswagen',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: '',
    description: '',
    imageUrl: '',
    status: 'available' as 'available' | 'sold' | 'reserved'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCar) {
      // Update existing car
      setCars(cars.map(car => 
        car.id === editingCar.id 
          ? { ...formData, id: car.id, source: 'manual' }
          : car
      ))
      setEditingCar(null)
    } else {
      // Add new car
      const newCar: CarData = {
        ...formData,
        id: Date.now().toString(),
        source: 'manual'
      }
      setCars([...cars, newCar])
    }
    
    setShowAddForm(false)
    setFormData({
      type: 'new',
      brand: 'Volkswagen',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: 'Petrol',
      transmission: 'Manual',
      color: '',
      description: '',
      imageUrl: '',
      status: 'available'
    })
  }

  const handleEdit = (car: CarData) => {
    setEditingCar(car)
    setFormData(car)
    setShowAddForm(true)
  }

  const handleDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id))
  }

  const handleScrapeOtomoto = async () => {
    setIsScraping(true)
    try {
      const response = await fetch('/api/scrape-otomoto')
      const data = await response.json()
      
      if (data.success && data.cars.length > 0) {
        // Add scraped cars to inventory
        const newCars = data.cars.map((car: any) => ({
          ...car,
          id: `otomoto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }))
        
        setCars(prevCars => [...prevCars, ...newCars])
        alert(`Pomyślnie zaimportowano ${data.cars.length} samochodów z Otomoto!`)
      } else {
        alert('Nie udało się pobrać samochodów z Otomoto. Sprawdź konsolę dla szczegółów.')
      }
    } catch (error) {
      console.error('Scraping error:', error)
      alert('Błąd podczas pobierania danych z Otomoto.')
    } finally {
      setIsScraping(false)
    }
  }

  const getAvailableBrands = () => {
    return formData.type === 'new' ? getNewCarBrands() : getAllBrands()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">WĄTARSKI - Panel Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Dodaj samochód
              </Button>
              <Button 
                onClick={handleScrapeOtomoto} 
                disabled={isScraping}
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                {isScraping ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {isScraping ? 'Pobieranie...' : 'Import z Otomoto'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Wszystkie samochody</h3>
            <p className="text-3xl font-bold text-blue-600">{cars.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Nowe samochody</h3>
            <p className="text-3xl font-bold text-blue-600">
              {cars.filter(car => car.type === 'new').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Używane samochody</h3>
            <p className="text-3xl font-bold text-green-600">
              {cars.filter(car => car.type === 'used').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Dostępne</h3>
            <p className="text-3xl font-bold text-green-600">
              {cars.filter(car => car.status === 'available').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Sprzedane</h3>
            <p className="text-3xl font-bold text-red-600">
              {cars.filter(car => car.status === 'sold').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Zarezerwowane</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {cars.filter(car => car.status === 'reserved').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Z Otomoto</h3>
            <p className="text-3xl font-bold text-purple-600">
              {cars.filter(car => car.source === 'otomoto').length}
            </p>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCar ? 'Edytuj samochód' : 'Dodaj nowy samochód'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const newType = e.target.value as 'new' | 'used'
                    setFormData({
                      ...formData, 
                      type: newType,
                      brand: newType === 'new' ? 'Volkswagen' : 'Volkswagen'
                    })
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="new">Nowy samochód</option>
                  <option value="used">Używany samochód</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {getAvailableBrands().map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rok</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena (PLN)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Przebieg (km)</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rodzaj paliwa</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Petrol">Benzyna</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Elektryczny</option>
                  <option value="Hybrid">Hybryda</option>
                  <option value="Plug-in Hybrid">Plug-in Hybryda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skrzynia biegów</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Manual">Manualna</option>
                  <option value="Automatic">Automatyczna</option>
                  <option value="CVT">CVT</option>
                  <option value="Semi-Automatic">Półautomatyczna</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kolor</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'available' | 'sold' | 'reserved'})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="available">Dostępny</option>
                  <option value="sold">Sprzedany</option>
                  <option value="reserved">Zarezerwowany</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Zdjęcie samochodu</label>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(value) => setFormData({...formData, imageUrl: value})}
                  placeholder="Dodaj zdjęcie samochodu"
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <Button type="submit">
                  {editingCar ? 'Aktualizuj samochód' : 'Dodaj samochód'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingCar(null)
                    setFormData({
                      type: 'new',
                      brand: 'Volkswagen',
                      model: '',
                      year: new Date().getFullYear(),
                      price: 0,
                      mileage: 0,
                      fuelType: 'Petrol',
                      transmission: 'Manual',
                      color: '',
                      description: '',
                      imageUrl: '',
                      status: 'available'
                    })
                  }}
                >
                  Anuluj
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Stan magazynowy</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Samochód
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marka
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Źródło
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Car className="h-6 w-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {car.model}
                          </div>
                          <div className="text-sm text-gray-500">
                            {car.year} • {car.mileage.toLocaleString()}km
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        car.type === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {car.type === 'new' ? 'Nowy' : 'Używany'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {car.brand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {car.price.toLocaleString()} PLN
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        car.status === 'available' ? 'bg-green-100 text-green-800' :
                        car.status === 'sold' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {car.status === 'available' ? 'Dostępny' :
                         car.status === 'sold' ? 'Sprzedany' : 'Zarezerwowany'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        car.source === 'otomoto' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {car.source === 'otomoto' ? 'Otomoto' : 'Ręczne'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(car)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(car.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 