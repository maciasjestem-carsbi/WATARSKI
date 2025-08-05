import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing single car insertion...')

    // Try to insert a single test car
    const testCar = {
      id: 'test-' + Date.now(),
      brand: 'Test',
      model: 'Car',
      year: 2024,
      mileage: 0,
      fuel: 'Test',
      power: 100,
      price: 100000,
      type: 'new',
      description: 'Test car for debugging',
      image_url: '/api/placeholder/400/300',
      featured: false,
      source: 'manual'
    }

    const { data: insertedCar, error: insertError } = await supabase
      .from('cars')
      .insert(testCar)
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({
        success: false,
        error: insertError.message,
        details: insertError,
        message: 'Failed to insert test car'
      }, { status: 500 })
    }

    console.log('Test car inserted successfully')
    return NextResponse.json({
      success: true,
      message: 'Test car inserted successfully',
      car: insertedCar
    })

  } catch (error) {
    console.error('Test insert error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Test insert failed'
    }, { status: 500 })
  }
} 