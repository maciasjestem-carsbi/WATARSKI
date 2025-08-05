import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Initializing database...')

    // Step 1: Create the cars table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS cars (
        id VARCHAR(255) PRIMARY KEY,
        brand VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        mileage INTEGER NOT NULL,
        fuel VARCHAR(255) NOT NULL,
        power INTEGER NOT NULL,
        price INTEGER NOT NULL,
        type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        featured BOOLEAN DEFAULT FALSE,
        source VARCHAR(50) DEFAULT 'manual',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Try to create table using SQL editor approach
    const { error: tableError } = await supabase
      .from('cars')
      .select('count', { count: 'exact', head: true })

    if (tableError && tableError.message.includes('relation "cars" does not exist')) {
      console.log('Cars table does not exist, please create it manually in Supabase dashboard')
      return NextResponse.json({
        success: false,
        message: 'Cars table does not exist. Please create it manually in your Supabase dashboard.',
        sql: createTableSQL,
        instructions: [
          '1. Go to your Supabase dashboard',
          '2. Navigate to SQL Editor',
          '3. Run the SQL above to create the cars table',
          '4. Then call this endpoint again to insert sample data'
        ]
      })
    }

    // Step 2: Check if table is empty and insert sample data
    const { data: existingCars, error: countError } = await supabase
      .from('cars')
      .select('*')

    if (countError) {
      console.error('Error checking existing cars:', countError)
      return NextResponse.json({
        success: false,
        error: countError.message,
        message: 'Failed to check existing cars'
      }, { status: 500 })
    }

    if (existingCars && existingCars.length > 0) {
      console.log('Database already has cars, skipping sample data insertion')
      return NextResponse.json({
        success: true,
        message: 'Database already initialized with sample data',
        carCount: existingCars.length
      })
    }

    // Step 3: Insert sample data
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
      }
    ]

    const { data: insertedCars, error: insertError } = await supabase
      .from('cars')
      .insert(sampleCars)
      .select()

    if (insertError) {
      console.error('Error inserting sample data:', insertError)
      return NextResponse.json({
        success: false,
        error: insertError.message,
        message: 'Failed to insert sample data'
      }, { status: 500 })
    }

    console.log('Database initialized successfully with sample data')
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully with sample data',
      insertedCars: insertedCars?.length || 0,
      cars: insertedCars
    })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Database initialization failed'
    }, { status: 500 })
  }
} 