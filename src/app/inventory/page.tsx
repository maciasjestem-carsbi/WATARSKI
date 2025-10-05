'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { Car, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import type { CarData } from '@/lib/database-supabase'

function InventoryContent() {
  const [cars, setCars] = useState<CarData[]>([])
  const [filteredCars, setFilteredCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [carImageIndices, setCarImageIndices] = useState<Record<string, number>>({})
  
  // Search filters state (multiple selections) - same as homepage
  const [searchFilters, setSearchFilters] = useState({
    brand: [] as string[],
    type: [] as string[],
    fuel: [] as string[],
    transmission: [] as string[]
  })
  
  // Dropdown states - same as homepage
  const [openDropdowns, setOpenDropdowns] = useState({
    brand: false,
    type: false,
    fuel: false,
    transmission: false
  })
  const searchParams = useSearchParams()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/cars')
        if (!res.ok) throw new Error('Failed to fetch cars')
        const data: CarData[] = await res.json()
        setCars(data)
        setFilteredCars(data)
        const indices: Record<string, number> = {}
        data.forEach(c => { indices[c.id] = 0 })
        setCarImageIndices(indices)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Close dropdowns when clicking outside - same as homepage
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

  // Dropdown functions - same as homepage
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

  // Apply initial filters from URL - convert to new format
  useEffect(() => {
    const typeParam = searchParams.get('type') || ''
    const segmentParam = searchParams.get('segment') || ''
    const brandParam = searchParams.get('brand') || ''
    const fuelParam = searchParams.get('fuel') || ''
    const newFilters = {
      brand: [] as string[],
      type: [] as string[],
      fuel: [] as string[],
      transmission: [] as string[]
    }
    
    // Handle brand filters
    if (brandParam) {
      newFilters.brand = [brandParam]
    }
    
    // Handle type filters 
    if (typeParam === 'osobowe') {
      newFilters.type = ['osobowe']
    } else if (typeParam === 'dostawcze') {
      newFilters.type = ['dostawcze']
    } else if (typeParam === 'certyfikowane') {
      newFilters.type = ['certyfikowane']
    }
    
    // Handle fuel filters
    if (fuelParam) {
      newFilters.fuel = [fuelParam]
    }
    
    setSearchFilters(newFilters)
  }, [searchParams])

  const getImages = (car: CarData) => {
    return car.images && car.images.length > 0 ? car.images : (car.imageUrl ? [car.imageUrl] : [])
  }

  const nextImage = (carId: string) => {
    const car = cars.find(c => c.id === carId)
    if (!car) return
    const imgs = getImages(car)
    if (imgs.length <= 1) return
    setCarImageIndices(prev => ({ ...prev, [carId]: (prev[carId] + 1) % imgs.length }))
  }

  const prevImage = (carId: string) => {
    const car = cars.find(c => c.id === carId)
    if (!car) return
    const imgs = getImages(car)
    if (imgs.length <= 1) return
    setCarImageIndices(prev => ({ ...prev, [carId]: (prev[carId] - 1 + imgs.length) % imgs.length }))
  }

  // Filtering with new filter system
  useEffect(() => {
    let list = cars

    // Brand filters
    if (searchFilters.brand.length > 0) {
      list = list.filter(c => searchFilters.brand.includes(c.brand))
    }

    // Type filters
    if (searchFilters.type.length > 0) {
      list = list.filter(c => {
        return searchFilters.type.some(filterType => {
          if (filterType === 'osobowe') {
            return c.type !== 'delivery' && (c.type === 'new' || c.type === 'used')
          } else if (filterType === 'dostawcze') {
            return c.type === 'delivery'
          } else if (filterType === 'certyfikowane') {
            return c.featured
          }
          return false
        })
      })
    }

    // Fuel filters
    if (searchFilters.fuel.length > 0) {
      list = list.filter(c => searchFilters.fuel.includes(c.fuel))
    }

    // Transmission filters
    if (searchFilters.transmission.length > 0) {
      list = list.filter(c => searchFilters.transmission.includes(c.transmission))
    }

    setFilteredCars(list)
  }, [cars, searchFilters])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-gray-600">Ładowanie...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Search Section - same as homepage */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Filtruj samochody</h2>
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
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 4.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
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
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 4.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.type && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 4.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.fuel && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.21 4.33a.75.75 0 01.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdowns.transmission && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
              
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Znalezione samochody ({filteredCars.length})</h2>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Car className="h-12 w-12 mx-auto mb-4" />
            Brak wyników dla wybranych filtrów
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const imgs = getImages(car)
              const idx = carImageIndices[car.id] || 0
              const img = imgs[idx]
              const multi = imgs.length > 1
              return (
                <div key={car.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                  <div className="relative">
                    <div className="relative w-full aspect-[16/9] bg-gray-100">
                      {img ? (
                        <Image src={img} alt={`${car.brand} ${car.model}`} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Car className="h-8 w-8" /></div>
                      )}
                      {multi && (
                        <>
                          <button onClick={(e)=>{e.preventDefault();e.stopPropagation();prevImage(car.id)}} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button onClick={(e)=>{e.preventDefault();e.stopPropagation();nextImage(car.id)}} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                            {idx+1}/{imgs.length}
                          </div>
                        </>
                      )}
                      {car.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Polecane
                        </div>
                      )}
                    </div>
                  </div>
                  <Link href={`/car/${car.id}`} className="p-5 flex-1 flex flex-col group">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{car.brand} {car.model}</h3>
                    {car.version && <p className="text-blue-600 text-sm font-medium mb-1">{car.version}</p>}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{car.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">{car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł</span>
                      <span className="text-xs text-gray-500">{car.year} • {car.mileage ? `${car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km` : 'N/A'}</span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InventoryContent />
    </Suspense>
  )
}