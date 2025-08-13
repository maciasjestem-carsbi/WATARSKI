'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Car, Phone, MapPin, Calendar, Zap, Fuel, Gauge, Star, ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { CarData } from '@/lib/database'

export default function CarDetailsPage() {
  const params = useParams()
  const [car, setCar] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carId = params.id as string
        const response = await fetch(`/api/cars/${carId}`)
        
        if (!response.ok) {
          throw new Error('Car not found')
        }
        
        const carData = await response.json()
        setCar(carData)
      } catch (error) {
        console.error('Error fetching car:', error)
        setCar(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [params.id])

  const getImages = () => {
    if (!car) return []
    return (car.images && car.images.length > 0) ? car.images : (car.imageUrl ? [car.imageUrl] : [])
  }

  const images = getImages()
  const currentImage = images[selectedImageIndex]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Samochód nie został znaleziony</h1>
          <p className="text-gray-600 mb-4">Przepraszamy, ale nie mogliśmy znaleźć tego samochodu.</p>
          <Link href="/inventory">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Wróć do listy samochodów
            </Button>
          </Link>
        </div>
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
              <Link href="/" className="flex items-center">
                <Car className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">WĄTARSKI</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">54 230 60 66</span>
              </div>
              <Link href="/contact">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg font-semibold">
                  Skontaktuj się
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Strona główna
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/inventory" className="text-gray-700 hover:text-blue-600">
                  Samochody
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{car.brand} {car.model}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Car Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {currentImage ? (
                <div className="relative">
                  <Image 
                    src={currentImage}
                    alt={`${car.brand} ${car.model}`}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <Car className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                      index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${car.brand} ${car.model} - zdjęcie ${index + 1}`}
                      width={120}
                      height={80}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  car.type === 'new' ? 'bg-green-100 text-green-800' :
                  car.type === 'used' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {car.type === 'new' ? 'Nowy' : car.type === 'used' ? 'Używany' : 'Dostawczy'}
                </span>
                {car.featured && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    <Star className="h-4 w-4 inline mr-1" />
                    Polecany
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
              {car.version && car.version.trim() && (
                <p className="text-xl text-blue-600 font-medium mb-2">{car.version}</p>
              )}
              <p className="text-2xl font-bold text-blue-600">{car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł</p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Rok produkcji</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.year || 'N/A'}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Gauge className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Przebieg</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.mileage ? car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' km' : 'N/A'}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Fuel className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-600">Paliwo</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.fuel}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Moc</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.power ? `${car.power} KM` : 'N/A'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Opis</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Contact & Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interesuje Cię ten samochód?</h3>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Zadzwoń teraz
                </Button>
                <Button variant="outline" className="w-full py-4 text-lg font-semibold">
                  <MapPin className="h-5 w-5 mr-2" />
                  Umów wizytę w salonie
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dane kontaktowe</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">54 230 60 66</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">ul. Toruńska 169, 87-800 Włocławek</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Pon-Pt: 8:00-17:00, Sob: 9:00-14:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <Image
              src={currentImage}
              alt={`${car.brand} ${car.model}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 