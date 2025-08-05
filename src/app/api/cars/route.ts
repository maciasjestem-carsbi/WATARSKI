import { NextRequest, NextResponse } from 'next/server'
import { supabaseCarDatabase } from '@/lib/database-supabase'

// GET /api/cars - Get all cars
export async function GET() {
  try {
    const cars = await supabaseCarDatabase.getAllCars()
    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

// POST /api/cars - Add new car
export async function POST(request: NextRequest) {
  try {
    const carData = await request.json()
    const newCar = await supabaseCarDatabase.addCar(carData)
    return NextResponse.json(newCar, { status: 201 })
  } catch (error) {
    console.error('Error adding car:', error)
    return NextResponse.json(
      { error: 'Failed to add car' },
      { status: 500 }
    )
  }
} 