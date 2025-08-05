import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test the connection
    const { data, error } = await supabase
      .from('cars')
      .select('count', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        message: 'Database connection failed'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      carCount: data?.length || 0
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Database test failed'
    }, { status: 500 })
  }
} 