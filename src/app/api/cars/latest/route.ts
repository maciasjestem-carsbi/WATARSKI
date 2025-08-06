import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Fetching latest cars...')
    
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error fetching latest cars:', error)
      return NextResponse.json({ error: 'Failed to fetch latest cars' }, { status: 500 })
    }

    // Transform data to match CarData interface
    const latestCars = data?.map(row => ({
      id: row.id,
      brand: row.brand,
      model: row.model,
      year: row.year,
      mileage: row.mileage,
      fuel: row.fuel,
      power: row.power,
      price: row.price,
      type: row.type as 'new' | 'used' | 'delivery',
      description: row.description,
      imageUrl: row.image_url,
      featured: row.featured,
      featuredOrder: undefined, // Not needed for latest cars
      source: row.source as 'manual' | 'otomoto',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    })) || []

    console.log('Latest cars found:', latestCars.length)
    return NextResponse.json(latestCars)
  } catch (error) {
    console.error('Error fetching latest cars:', error)
    return NextResponse.json({ error: 'Failed to fetch latest cars' }, { status: 500 })
  }
} 