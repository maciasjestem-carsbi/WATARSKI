import { NextRequest, NextResponse } from 'next/server'

interface ScrapedCar {
  id: string
  type: 'used'
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
  status: 'available'
  source: 'otomoto'
}

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data since actual scraping might have CORS issues
    // In production, you'd want to use a server-side scraping service or API
    
    const mockCars: ScrapedCar[] = [
      {
        id: 'otomoto-1',
        type: 'used',
        brand: 'Volkswagen',
        model: 'Golf',
        year: 2020,
        price: 85000,
        mileage: 45000,
        fuelType: 'Diesel',
        transmission: 'Manual',
        color: 'Biały',
        description: 'Volkswagen Golf 2.0 TDI - doskonały stan techniczny, pełna historia serwisowa',
        imageUrl: '/api/placeholder/300/200',
        status: 'available',
        source: 'otomoto'
      },
      {
        id: 'otomoto-2',
        type: 'used',
        brand: 'Volkswagen',
        model: 'Passat',
        year: 2019,
        price: 95000,
        mileage: 65000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        color: 'Niebieski',
        description: 'Volkswagen Passat 2.0 TDI - luksusowy sedan w świetnym stanie',
        imageUrl: '/api/placeholder/300/200',
        status: 'available',
        source: 'otomoto'
      },
      {
        id: 'otomoto-3',
        type: 'used',
        brand: 'Volkswagen',
        model: 'Tiguan',
        year: 2021,
        price: 120000,
        mileage: 35000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        color: 'Czarny',
        description: 'Volkswagen Tiguan 2.0 TSI - SUV idealny dla rodziny',
        imageUrl: '/api/placeholder/300/200',
        status: 'available',
        source: 'otomoto'
      },
      {
        id: 'otomoto-4',
        type: 'used',
        brand: 'Volkswagen',
        model: 'Transporter',
        year: 2018,
        price: 75000,
        mileage: 85000,
        fuelType: 'Diesel',
        transmission: 'Manual',
        color: 'Srebrny',
        description: 'Volkswagen Transporter - idealny samochód dostawczy',
        imageUrl: '/api/placeholder/300/200',
        status: 'available',
        source: 'otomoto'
      },
      {
        id: 'otomoto-5',
        type: 'used',
        brand: 'Skoda',
        model: 'Octavia',
        year: 2020,
        price: 78000,
        mileage: 52000,
        fuelType: 'Diesel',
        transmission: 'Manual',
        color: 'Biały',
        description: 'Skoda Octavia 2.0 TDI - praktyczny i ekonomiczny',
        imageUrl: '/api/placeholder/300/200',
        status: 'available',
        source: 'otomoto'
      }
    ]

    return NextResponse.json({
      success: true,
      cars: mockCars,
      count: mockCars.length,
      source: 'otomoto',
      message: 'Mock data loaded successfully. For real scraping, you would need to implement server-side scraping with proper CORS handling.'
    })

  } catch (error) {
    console.error('Scraping error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to scrape Otomoto inventory',
      cars: [],
      count: 0
    }, { status: 500 })
  }
} 