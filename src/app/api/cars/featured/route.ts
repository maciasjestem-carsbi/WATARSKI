import { NextResponse } from 'next/server'
import { supabaseCarDatabase } from '@/lib/database-supabase'

// GET /api/cars/featured - Get featured cars
export async function GET() {
  try {
    const featuredCars = await supabaseCarDatabase.getFeaturedCars()
    return NextResponse.json(featuredCars)
  } catch (error) {
    console.error('Error fetching featured cars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured cars' },
      { status: 500 }
    )
  }
} 