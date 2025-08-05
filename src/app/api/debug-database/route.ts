import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Debugging database...')

    // Test 1: Check if table exists
    const { data: tableTest, error: tableError } = await supabase
      .from('cars')
      .select('count', { count: 'exact', head: true })

    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'Table does not exist or connection failed',
        details: tableError,
        message: 'Please create the cars table in your Supabase dashboard'
      })
    }

    // Test 2: Get all cars
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })

    if (carsError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch cars',
        details: carsError
      })
    }

    // Test 3: Get featured cars
    const { data: featuredCars, error: featuredError } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)

    if (featuredError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch featured cars',
        details: featuredError
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        totalCars: cars?.length || 0,
        featuredCars: featuredCars?.length || 0,
        allCars: cars || [],
        featuredCarsList: featuredCars || []
      },
      environment: {
        hasBlobToken: !!process.env.WATARSKI_READ_WRITE_TOKEN,
        supabaseUrl: 'https://spwyjrykkqoezyzigxdg.supabase.co'
      }
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Database debug failed'
    }, { status: 500 })
  }
} 