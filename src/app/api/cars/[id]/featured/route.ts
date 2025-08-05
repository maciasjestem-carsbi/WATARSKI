import { NextRequest, NextResponse } from 'next/server'
import { carDatabase } from '@/lib/database'

// PUT /api/cars/[id]/featured - Toggle featured status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const updatedCar = await carDatabase.toggleFeatured(resolvedParams.id)
    
    if (!updatedCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedCar)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to toggle featured status' },
      { status: 500 }
    )
  }
} 