import { NextResponse } from 'next/server'
import { carDatabase } from '@/lib/database'

// GET /api/cars/featured - Get featured cars
export async function GET() {
  try {
    const featuredCars = await carDatabase.getFeaturedCars()
    return NextResponse.json(featuredCars)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch featured cars' },
      { status: 500 }
    )
  }
} 