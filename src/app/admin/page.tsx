'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Plus, Trash2, Edit, Star, Upload, Download } from 'lucide-react'
import ImageUpload from '@/components/ui/image-upload'
import { sharedCars, type CarData } from '@/lib/car-data'

export default function AdminPage() {
  const [cars, setCars] = useState<CarData[]>(sharedCars)

  const [isScraping, setIsScraping] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState<CarData | null>(null)

  const [newCar, setNewCar] = useState<Partial<CarData>>({
    brand: '',
    model: '',
    year: 2024,
    mileage: 0,
    fuel: 'Benzyna',
    power: 100,
    price: 0,
    type: 'new',
    description: '',
    featured: false
  })

  const handleScrapeOtomoto = async () => {
    setIsScraping(true)
    try {
      const response = await fetch('/api/scrape-otomoto')
      const data = await response.json()
      
      if (data.cars) {
        const scrapedCars = data.cars.map((car: any, index: number) => ({
          id: `otomoto-${Date.now()}-${index}`,
          brand: car.brand || 'Nieznana',
          model: car.model || 'Nieznany',
          year: car.year || 2020,
          mileage: car.mileage || 0,
          fuel: car.fuel || 'Benzyna',
          power: car.power || 100,
          price: car.price || 50000,
          type: 'used' as const,
          description: car.description || 'Samochód z Otomoto',
          imageUrl: car.imageUrl,
          featured: false,
          source: 'otomoto' as const
        }))
        
        setCars(prev => [...prev, ...scrapedCars])
      }
    } catch (error) {
      console.error('Błąd podczas scrapowania:', error)
    } finally {
      setIsScraping(false)
    }
  }

  const handleAddCar = () => {
    if (newCar.brand && newCar.model && newCar.price && newCar.price > 0) {
      const car: CarData = {
        id: Date.now().toString(),
        brand: newCar.brand!,
        model: newCar.model!,
        year: newCar.year!,
        mileage: newCar.mileage!,
        fuel: newCar.fuel!,
        power: newCar.power!,
        price: newCar.price!,
        type: newCar.type!,
        description: newCar.description!,
        imageUrl: newCar.imageUrl,
        featured: newCar.featured!,
        source: 'manual'
      }
      
      setCars(prev => [...prev, car])
      setNewCar({
        brand: '',
        model: '',
        year: 2024,
        mileage: 0,
        fuel: 'Benzyna',
        power: 100,
        price: 0,
        type: 'new',
        description: '',
        featured: false
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteCar = (id: string) => {
    setCars(prev => prev.filter(car => car.id !== id))
  }

  const handleToggleFeatured = (id: string) => {
    setCars(prev => {
      const updatedCars = prev.map(car => 
        car.id === id ? { ...car, featured: !car.featured } : car
      )
      
      // Ensure only 3 cars are featured
      const featuredCount = updatedCars.filter(car => car.featured).length
      if (featuredCount > 3) {
        // Remove featured flag from the oldest non-featured car
        const nonFeatured = updatedCars.filter(car => !car.featured)
        if (nonFeatured.length > 0) {
          const oldestNonFeatured = nonFeatured[0]
          return updatedCars.map(car => 
            car.id === oldestNonFeatured.id ? { ...car, featured: false } : car
          )
        }
      }
      
      return updatedCars
    })
  }

  const handleImageUpload = (imageUrl: string) => {
    if (editingCar) {
      setCars(prev => prev.map(car => 
        car.id === editingCar.id ? { ...car, imageUrl } : car
      ))
      setEditingCar(null)
    } else {
      setNewCar(prev => ({ ...prev, imageUrl }))
    }
  }

  const featuredCars = cars.filter(car => car.featured)
  const otomotoCars = cars.filter(car => car.source === 'otomoto')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">WĄTARSKI - Panel Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleScrapeOtomoto} 
                disabled={isScraping}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {isScraping ? 'Importowanie...' : 'Import z Otomoto'}
              </Button>
              <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj samochód
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Wszystkie samochody</h3>
            <p className="text-3xl font-bold text-blue-600">{cars.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Polecane (max 3)</h3>
            <p className="text-3xl font-bold text-green-600">{featuredCars.length}/3</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Z Otomoto</h3>
            <p className="text-3xl font-bold text-purple-600">{otomotoCars.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Nowe samochody</h3>
            <p className="text-3xl font-bold text-orange-600">{cars.filter(car => car.type === 'new').length}</p>
          </div>
        </div>

        {/* Add Car Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Dodaj nowy samochód</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Marka"
                value={newCar.brand}
                onChange={(e) => setNewCar(prev => ({ ...prev, brand: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Model"
                value={newCar.model}
                onChange={(e) => setNewCar(prev => ({ ...prev, model: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Rok"
                value={newCar.year}
                onChange={(e) => setNewCar(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Przebieg (km)"
                value={newCar.mileage}
                onChange={(e) => setNewCar(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <select
                value={newCar.fuel}
                onChange={(e) => setNewCar(prev => ({ ...prev, fuel: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Benzyna">Benzyna</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybryda">Hybryda</option>
                <option value="Elektryczny">Elektryczny</option>
              </select>
              <input
                type="number"
                placeholder="Moc (KM)"
                value={newCar.power}
                onChange={(e) => setNewCar(prev => ({ ...prev, power: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Cena (PLN)"
                value={newCar.price}
                onChange={(e) => setNewCar(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <select
                value={newCar.type}
                onChange={(e) => setNewCar(prev => ({ ...prev, type: e.target.value as 'new' | 'used' | 'delivery' }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="new">Nowy</option>
                <option value="used">Używany</option>
                <option value="delivery">Dostawczy</option>
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCar.featured}
                  onChange={(e) => setNewCar(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm text-gray-700">Polecany (na stronie głównej)</label>
              </div>
            </div>
            <textarea
              placeholder="Opis samochodu"
              value={newCar.description}
              onChange={(e) => setNewCar(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
              rows={3}
            />
            <div className="mt-4">
              <ImageUpload 
                value={newCar.imageUrl} 
                onChange={handleImageUpload}
                placeholder="Dodaj zdjęcie samochodu"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <Button onClick={handleAddCar} className="bg-blue-600 hover:bg-blue-700">
                Dodaj samochód
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Anuluj
              </Button>
            </div>
          </div>
        )}

        {/* Cars Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista samochodów</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zdjęcie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marka/Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rok/Przebieg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Polecany
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
                      <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                        {car.imageUrl ? (
                          <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{car.brand}</div>
                        <div className="text-sm text-gray-500">{car.model}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{car.year}</div>
                        <div className="text-sm text-gray-500">{car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        car.type === 'new' ? 'bg-green-100 text-green-800' :
                        car.type === 'used' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        onClick={() => handleToggleFeatured(car.id)}
                        variant={car.featured ? "default" : "outline"}
                        size="sm"
                        className={car.featured ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        car.source === 'otomoto' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {car.source === 'otomoto' ? 'Otomoto' : 'Ręczne'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setEditingCar(car)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCar(car.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
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