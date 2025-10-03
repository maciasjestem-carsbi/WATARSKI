'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Phone, Car, Calendar, Fuel, Cog, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import type { CarData } from '@/lib/database-supabase'

export default function CarDetailPage() {
  const params = useParams()
  const carId = params?.id as string
  
  const [car, setCar] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) return
      
      try {
        const response = await fetch(`/api/cars/${carId}`)
        if (response.ok) {
          const carData = await response.json()
          setCar(carData)
        } else {
          setError('Samochód nie został znaleziony')
        }
      } catch (err) {
        setError('Błąd podczas ładowania danych samochodu')
        console.error('Error fetching car:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [carId])

  const nextImage = () => {
    if (car?.images && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images!.length)
    }
  }

  const prevImage = () => {
    if (car?.images && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images!.length) % car.images!.length)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-700">Ładowanie szczegółów samochodu...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !car) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Samochód nie został znaleziony</h1>
            <p className="text-lg text-gray-700 mb-8">{error}</p>
            <Link href="/inventory">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Powrót do listy samochodów
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const currentImage = car.images && car.images.length > 0 
    ? car.images[currentImageIndex] 
    : car.imageUrl || '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp'

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Strona główna</Link>
              <span className="text-gray-400">/</span>
              <Link href="/inventory" className="text-gray-500 hover:text-gray-700">Samochody</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{car.brand} {car.model}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white aspect-square">
                <Image
                  src={currentImage}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                
                {car.images && car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {car.images.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {car.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative overflow-hidden rounded-xl aspect-square ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    car.type === 'new' ? 'bg-green-100 text-green-800' : 
                    car.type === 'used' ? 'bg-purple-100 text-purple-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
                  </span>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rok produkcji</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Przebieg</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rodzaj paliwa</p>
                    <p className="font-semibold">{car.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Cog className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Moc</p>
                    <p className="font-semibold">{car.power} KM</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Opis</h3>
                  <p className="text-gray-700 leading-relaxed">{car.description}</p>
                </div>
              )}

              {/* Contact Section */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
                <p className="text-gray-700 mb-4">Interesuje Cię ten samochód? Skontaktuj się z nami!</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:542306060" 
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>54 230 60 60</span>
                  </a>
                  <Link 
                    href="/contact" 
                    className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <span>Zadaj pytanie</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/inventory">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Powrót do listy samochodów</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}