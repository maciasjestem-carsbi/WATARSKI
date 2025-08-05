import { NextRequest, NextResponse } from 'next/server'
import { carDatabase } from '@/lib/database'

// GET /api/cars - Get all cars
export async function GET() {
  try {
    const cars = await carDatabase.getAllCars()
    return NextResponse.json(cars)
  } catch (error) {
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
    const newCar = await carDatabase.addCar(carData)
    return NextResponse.json(newCar, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add car' },
      { status: 500 }
    )
  }
} 