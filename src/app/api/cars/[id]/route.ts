import { NextRequest, NextResponse } from 'next/server'
import { carDatabase } from '@/lib/database'

// GET /api/cars/[id] - Get car by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const car = await carDatabase.getCarById(resolvedParams.id)
    
    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    )
  }
}

// PUT /api/cars/[id] - Update car
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const carData = await request.json()
    const updatedCar = await carDatabase.updateCar(resolvedParams.id, carData)
    
    if (!updatedCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedCar)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car' },
      { status: 500 }
    )
  }
}

// DELETE /api/cars/[id] - Delete car
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const success = await carDatabase.deleteCar(resolvedParams.id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car' },
      { status: 500 }
    )
  }
} 