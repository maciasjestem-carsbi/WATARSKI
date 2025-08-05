'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Car, Phone, MapPin, Calendar, Zap, Fuel, Gauge, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getCarById, type CarData } from '@/lib/car-data'

export default function CarDetailsPage() {
  const params = useParams()
  const [car, setCar] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carId = params.id as string
    const foundCar = getCarById(carId)
    setCar(foundCar || null)
    setLoading(false)
  }, [params.id])

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
              {car.imageUrl ? (
                <Image 
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <Car className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
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
              <p className="text-2xl font-bold text-blue-600">{car.price.toLocaleString()} zł</p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Rok produkcji</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.year}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Gauge className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Przebieg</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{car.mileage.toLocaleString()} km</p>
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
                <p className="text-xl font-semibold text-gray-900">{car.power} KM</p>
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
                  <span className="text-gray-700">ul. Toruńska 123, 87-800 Włocławek</span>
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
    </div>
  )
} 