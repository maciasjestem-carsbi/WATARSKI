import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Updating featured cars with order numbers...')
    
    // Get all featured cars
    const { data: featuredCars, error: fetchError } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: true })

    if (fetchError) {
      console.error('Error fetching featured cars:', fetchError)
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 })
    }

    if (!featuredCars || featuredCars.length === 0) {
      return NextResponse.json({ success: true, message: 'No featured cars found' })
    }

    // Update each featured car with order number
    for (let i = 0; i < featuredCars.length; i++) {
      const car = featuredCars[i]
      const orderNumber = i + 1

      const { error: updateError } = await supabase
        .from('cars')
        .update({ featured_order: orderNumber })
        .eq('id', car.id)

      if (updateError) {
        console.error(`Error updating car ${car.id}:`, updateError)
        return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
      }

      console.log(`Updated car ${car.brand} ${car.model} with order ${orderNumber}`)
    }

    console.log('Successfully updated featured cars with order numbers')
    return NextResponse.json({ 
      success: true, 
      message: 'Featured cars updated with order numbers',
      updatedCars: featuredCars.length
    })

  } catch (error) {
    console.error('Error updating featured order:', error)
    return NextResponse.json({ success: false, error: 'Failed to update featured order' }, { status: 500 })
  }
} 