import { NextResponse } from 'next/server'
import { supabaseCarDatabase } from '@/lib/database-supabase'

export async function GET() {
  try {
    console.log('Fetching featured cars...')
    const featuredCars = await supabaseCarDatabase.getFeaturedCars()
    console.log('Featured cars found:', featuredCars.length)
    return NextResponse.json(featuredCars)
  } catch (error) {
    console.error('Error fetching featured cars:', error)
    return NextResponse.json({ error: 'Failed to fetch featured cars' }, { status: 500 })
  }
} 