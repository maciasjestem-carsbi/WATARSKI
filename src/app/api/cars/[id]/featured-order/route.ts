import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { newOrder } = await request.json()
    const carId = params.id

    console.log(`Updating featured order for car ${carId} to ${newOrder}`)

    // Get all featured cars
    const { data: featuredCars, error: fetchError } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error fetching featured cars:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch featured cars' }, { status: 500 })
    }

    if (!featuredCars) {
      return NextResponse.json({ error: 'No featured cars found' }, { status: 404 })
    }

    // Find the car to move
    const carToMove = featuredCars.find(car => car.id === carId)
    if (!carToMove) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }

    // Remove the car from its current position
    const carsWithoutMoved = featuredCars.filter(car => car.id !== carId)
    
    // Insert the car at the new position
    const newPosition = Math.min(newOrder - 1, carsWithoutMoved.length)
    carsWithoutMoved.splice(newPosition, 0, carToMove)

    // Update the created_at timestamps to reflect the new order
    // We'll use a simple approach: set created_at based on new position
    const baseTime = new Date('2024-01-01').getTime()
    
    for (let i = 0; i < carsWithoutMoved.length; i++) {
      const car = carsWithoutMoved[i]
      const newCreatedAt = new Date(baseTime + (carsWithoutMoved.length - i) * 1000).toISOString()
      
      const { error: updateError } = await supabase
        .from('cars')
        .update({ 
          created_at: newCreatedAt,
          updated_at: new Date().toISOString()
        })
        .eq('id', car.id)

      if (updateError) {
        console.error(`Error updating car ${car.id}:`, updateError)
        return NextResponse.json({ error: 'Failed to update car order' }, { status: 500 })
      }
    }

    // Return the updated car with its new order
    const updatedCar = {
      id: carToMove.id,
      brand: carToMove.brand,
      model: carToMove.model,
      year: carToMove.year,
      mileage: carToMove.mileage,
      fuel: carToMove.fuel,
      power: carToMove.power,
      price: carToMove.price,
      type: carToMove.type as 'new' | 'used' | 'delivery',
      description: carToMove.description,
      imageUrl: carToMove.image_url,
      featured: carToMove.featured,
      featuredOrder: newOrder,
      source: carToMove.source as 'manual' | 'otomoto',
      createdAt: new Date(carToMove.created_at),
      updatedAt: new Date()
    }

    console.log(`Successfully updated featured order for car ${carId}`)
    return NextResponse.json(updatedCar)

  } catch (error) {
    console.error('Error updating featured order:', error)
    return NextResponse.json({ error: 'Failed to update featured order' }, { status: 500 })
  }
} 