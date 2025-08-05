import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Checking featured cars in database...')
    
    // Get all cars
    const { data: allCars, error: allCarsError } = await supabase
      .from('cars')
      .select('*')
    
    if (allCarsError) {
      console.error('Error fetching all cars:', allCarsError)
      return NextResponse.json({
        success: false,
        error: allCarsError.message
      }, { status: 500 })
    }
    
    // Get featured cars
    const { data: featuredCars, error: featuredError } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
    
    if (featuredError) {
      console.error('Error fetching featured cars:', featuredError)
      return NextResponse.json({
        success: false,
        error: featuredError.message
      }, { status: 500 })
    }
    
    console.log('All cars:', allCars?.length || 0)
    console.log('Featured cars:', featuredCars?.length || 0)
    
    return NextResponse.json({
      success: true,
      allCars: allCars?.length || 0,
      featuredCars: featuredCars?.length || 0,
      featuredCarsList: featuredCars || [],
      allCarsList: allCars || []
    })
    
  } catch (error) {
    console.error('Error checking featured cars:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
} 