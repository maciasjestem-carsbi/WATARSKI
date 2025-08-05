import { NextResponse } from 'next/server'
import { supabaseCarDatabase } from '@/lib/database-supabase'

export async function GET() {
  try {
    console.log('Testing featured cars endpoint...')
    
    const featuredCars = await supabaseCarDatabase.getFeaturedCars()
    
    console.log('Featured cars found:', featuredCars.length)
    console.log('Featured cars:', featuredCars.map(car => `${car.brand} ${car.model} (${car.featured ? 'featured' : 'not featured'})`))
    
    return NextResponse.json({
      success: true,
      count: featuredCars.length,
      cars: featuredCars
    })
  } catch (error) {
    console.error('Error testing featured cars:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
} 