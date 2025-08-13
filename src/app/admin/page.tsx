'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Car, Plus, Trash2, Edit, Star, Upload, Download, Link, Loader2, Home, AlertCircle } from 'lucide-react'
import ImageUpload from '@/components/ui/image-upload'
import MultipleImageUpload from '@/components/ui/multiple-image-upload'
import Logo from '@/components/logo'
import type { CarData } from '@/lib/database'

export default function AdminPage() {
  const [cars, setCars] = useState<CarData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFeaturedAlert, setShowFeaturedAlert] = useState(false)

  const [isScraping, setIsScraping] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState<CarData | null>(null)
  const [otomotoUrl, setOtomotoUrl] = useState('')

  const [newCar, setNewCar] = useState<Partial<CarData>>({
    brand: '',
    model: '',
    version: '',
    year: undefined,
    mileage: undefined,
    fuel: 'Benzyna',
    power: undefined,
    price: undefined,
    type: 'new',
    description: '',
    featured: false,
    images: []
  })

  // Load cars on component mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetch('/api/cars')
        if (!response.ok) {
          throw new Error('Failed to fetch cars')
        }
        const allCars = await response.json()
        setCars(allCars)
      } catch (error) {
        console.error('Error loading cars:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCars()
  }, [])

  const handleScrapeOtomotoUrl = async () => {
    if (!otomotoUrl.trim()) {
      alert('Proszę wprowadzić link do Otomoto')
      return
    }

    setIsScraping(true)
    try {
      const response = await fetch('/api/scrape-otomoto-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: otomotoUrl })
      })

      const data = await response.json()

      if (data.success && data.car) {
        const scrapedCar = data.car
        setNewCar({
          brand: scrapedCar.brand,
          model: scrapedCar.model,
          version: scrapedCar.version,
          year: scrapedCar.year,
          mileage: scrapedCar.mileage,
          fuel: scrapedCar.fuel,
          power: scrapedCar.power,
          price: scrapedCar.price,
          type: 'used' as const,
          description: scrapedCar.description,
          imageUrl: scrapedCar.imageUrl,
          images: scrapedCar.imageUrl ? [scrapedCar.imageUrl] : [],
          featured: false,
          source: 'otomoto' as const
        })
        setShowAddForm(true)
        setOtomotoUrl('')
        alert('Dane samochodu zostały pobrane! Sprawdź i zapisz.')
      } else {
        alert('Błąd podczas pobierania danych: ' + (data.error || 'Nieznany błąd'))
      }
    } catch (error) {
      console.error('Błąd podczas scrapowania:', error)
      alert('Błąd podczas pobierania danych z Otomoto')
    } finally {
      setIsScraping(false)
    }
  }

  const handleAddCar = async () => {
    // Validate required fields
    if (!newCar.brand?.trim()) {
      alert('Proszę wprowadzić markę samochodu')
      return
    }
    if (!newCar.model?.trim()) {
      alert('Proszę wprowadzić model samochodu')
      return
    }
    if (!newCar.price || newCar.price <= 0) {
      alert('Proszę wprowadzić poprawną cenę (większą od 0)')
      return
    }

    try {
      const carData = {
        brand: newCar.brand.trim(),
        model: newCar.model.trim(),
        version: newCar.version?.trim() || '',
        year: newCar.year || undefined,
        mileage: newCar.mileage || undefined,
        fuel: newCar.fuel || 'Benzyna',
        power: newCar.power || undefined,
        price: newCar.price,
        type: newCar.type || 'new',
        description: newCar.description?.trim() || '',
        imageUrl: newCar.imageUrl,
        images: newCar.images || [],
        featured: newCar.featured || false,
        source: newCar.source || 'manual'
      }
      
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add car')
      }

      const addedCar = await response.json()
      setCars(prev => [addedCar, ...prev])
      
      // Reset form
      setNewCar({
        brand: '',
        model: '',
        version: '',
        year: undefined,
        mileage: undefined,
        fuel: 'Benzyna',
        power: undefined,
        price: undefined,
        type: 'new',
        description: '',
        featured: false,
        images: []
      })
      setShowAddForm(false)
      
      alert('Samochód został pomyślnie dodany!')
    } catch (error) {
      console.error('Error adding car:', error)
      alert(`Błąd podczas dodawania samochodu: ${error instanceof Error ? error.message : 'Nieznany błąd'}`)
    }
  }

  const handleDeleteCar = async (id: string) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete car')
      }

      setCars(prev => prev.filter(car => car.id !== id))
    } catch (error) {
      console.error('Error deleting car:', error)
      alert('Błąd podczas usuwania samochodu')
    }
  }

  const handleToggleFeatured = async (id: string) => {
    try {
      const currentCar = cars.find(car => car.id === id)
      if (!currentCar) return

      const featuredCars = cars.filter(car => car.featured)
      
      // If trying to add a 4th featured car, show alert
      if (!currentCar.featured && featuredCars.length >= 3) {
        setShowFeaturedAlert(true)
        setTimeout(() => setShowFeaturedAlert(false), 5000)
        return // Prevent API call
      }

      const response = await fetch(`/api/cars/${id}/featured`, { method: 'PUT' })
      if (!response.ok) {
        throw new Error('Failed to toggle featured status')
      }
      const updatedCar = await response.json()
      setCars(prev => prev.map(car => car.id === id ? updatedCar : car))
    } catch (error) {
      console.error('Error toggling featured status:', error)
      alert('Błąd podczas zmiany statusu polecanych')
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="ml-4 text-lg text-gray-700">Ładowanie samochodów...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="mr-6">
                <Logo size="md" />
              </div>
              <div className="border-l border-gray-300 h-8 mx-4"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel Administracyjny</h1>
                <p className="text-sm text-gray-600">Zarządzanie samochodami</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Home className="h-4 w-4 mr-2" />
                Powrót do strony głównej
              </a>
              <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj samochód
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cars Alert */}
      {showFeaturedAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Maksymalnie 3 polecane samochody</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Możesz mieć maksymalnie 3 polecane samochody. Odznacz jedno z już polecanych, aby dodać nowe.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
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
            
            {/* Otomoto Import Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Link className="h-5 w-5 mr-2 text-green-600" />
                Import z Otomoto
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Wklej link do samochodu z Otomoto, aby automatycznie pobrać dane
              </p>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="https://www.otomoto.pl/osobowe/oferta/skoda-kodiaq-ID6HstBA.html"
                  value={otomotoUrl}
                  onChange={(e) => setOtomotoUrl(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isScraping}
                />
                <Button 
                  onClick={handleScrapeOtomotoUrl} 
                  disabled={isScraping || !otomotoUrl.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isScraping ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Pobieranie...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Pobierz dane
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="np. Volkswagen"
                value={newCar.brand || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, brand: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="np. Passat"
                value={newCar.model || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, model: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="np. 2.0 TDI"
                value={newCar.version || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, version: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="np. 2020"
                value={newCar.year || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, year: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1900"
                max="2030"
              />
              <input
                type="number"
                placeholder="np. 50000"
                value={newCar.mileage || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, mileage: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <select
                value={newCar.fuel || 'Benzyna'}
                onChange={(e) => setNewCar(prev => ({ ...prev, fuel: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Benzyna">Benzyna</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybryda">Hybryda</option>
                <option value="Elektryczny">Elektryczny</option>
              </select>
              <input
                type="number"
                placeholder="np. 150"
                value={newCar.power || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, power: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <input
                type="number"
                placeholder="np. 129900"
                value={newCar.price || ''}
                onChange={(e) => setNewCar(prev => ({ ...prev, price: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                required
              />
              <select
                value={newCar.type || 'new'}
                onChange={(e) => setNewCar(prev => ({ ...prev, type: e.target.value as 'new' | 'used' | 'delivery' }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="new">Nowy</option>
                <option value="used">Używany</option>
                <option value="delivery">Dostawczy</option>
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCar.featured || false}
                  onChange={(e) => setNewCar(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm text-gray-700">Polecany (na stronie głównej)</label>
              </div>
            </div>
            <textarea
              placeholder="Opis samochodu (opcjonalnie)"
              value={newCar.description || ''}
              onChange={(e) => setNewCar(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            <div className="mt-4">
              <MultipleImageUpload 
                value={newCar.images} 
                onChange={(images) => setNewCar(prev => ({ ...prev, images }))}
                placeholder="Dodaj zdjęcia samochodu"
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
                    Wersja
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
                    Nr
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
                      <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden relative">
                        {(car.images && car.images.length > 0) ? (
                          <>
                            <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover" />
                            {car.images.length > 1 && (
                              <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                                +{car.images.length - 1}
                              </div>
                            )}
                          </>
                        ) : car.imageUrl ? (
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
                      <div className="text-sm text-gray-900">{car.version}</div>
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
                      {car.featured && car.featuredOrder ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
                          {car.featuredOrder}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
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