import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Populating database with sample cars...')

    // Sample cars data
    const sampleCars = [
      {
        id: '1',
        brand: 'Volkswagen',
        model: 'T-Roc',
        year: 2024,
        mileage: 10,
        fuel: 'Hybryda',
        power: 150,
        price: 129900,
        type: 'new',
        description: 'Nowy Volkswagen T-Roc w doskonałym stanie. Samochód wyposażony w najnowsze technologie bezpieczeństwa i komfortu. Idealny do jazdy miejskiej i dalekich podróży.',
        image_url: '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
        featured: true,
        source: 'manual'
      },
      {
        id: '2',
        brand: 'Volkswagen',
        model: 'Passat',
        year: 2024,
        mileage: 5,
        fuel: 'Diesel',
        power: 150,
        price: 189900,
        type: 'new',
        description: 'Elegancki Volkswagen Passat - flagowy sedan marki. Luksusowe wnętrze, zaawansowane systemy bezpieczeństwa i doskonałe osiągi.',
        image_url: '/images/Passat_SE.webp',
        featured: true,
        source: 'manual'
      },
      {
        id: '3',
        brand: 'Volkswagen',
        model: 'Tiguan',
        year: 2023,
        mileage: 45000,
        fuel: 'Benzyna',
        power: 184,
        price: 89900,
        type: 'used',
        description: 'Używany Volkswagen Tiguan w świetnym stanie. Samochód z pełną historią serwisową, idealny dla rodzin.',
        image_url: '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
        featured: true,
        source: 'manual'
      },
      {
        id: '4',
        brand: 'Skoda',
        model: 'Kodiaq',
        year: 2022,
        mileage: 35000,
        fuel: 'Diesel',
        power: 150,
        price: 115000,
        type: 'used',
        description: 'Skoda Kodiaq w doskonałym stanie technicznym. Samochód z pełną historią serwisową, idealny dla rodzin.',
        image_url: '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
        featured: false,
        source: 'manual'
      },
      {
        id: '5',
        brand: 'Volkswagen',
        model: 'Golf',
        year: 2024,
        mileage: 0,
        fuel: 'Benzyna',
        power: 110,
        price: 89900,
        type: 'new',
        description: 'Nowy Volkswagen Golf - ikona motoryzacji. Doskonałe połączenie stylu, komfortu i ekonomii.',
        image_url: '/images/Passat_SE.webp',
        featured: false,
        source: 'manual'
      }
    ]

    // Insert sample cars
    const { data: insertedCars, error: insertError } = await supabase
      .from('cars')
      .insert(sampleCars)
      .select()

    if (insertError) {
      console.error('Error inserting sample cars:', insertError)
      return NextResponse.json({
        success: false,
        error: insertError.message,
        message: 'Failed to insert sample cars'
      }, { status: 500 })
    }

    console.log('Database populated successfully with sample cars')
    return NextResponse.json({
      success: true,
      message: 'Database populated successfully with sample cars',
      insertedCars: insertedCars?.length || 0,
      cars: insertedCars
    })

  } catch (error) {
    console.error('Database population error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Database population failed'
    }, { status: 500 })
  }
} 