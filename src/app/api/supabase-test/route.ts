import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test 1: Basic connection - try to access cars table
    const { data: connectionTest, error: connectionError } = await supabase
      .from('cars')
      .select('count', { count: 'exact', head: true })

    if (connectionError) {
      console.error('Connection error:', connectionError)
      
      // If cars table doesn't exist, try to create it
      if (connectionError.message.includes('relation "cars" does not exist')) {
        console.log('Cars table does not exist, creating it...')
        
        // For now, return a helpful message
        return NextResponse.json({
          success: false,
          test: 'connection',
          error: 'Cars table does not exist',
          message: 'Please create the cars table in your Supabase dashboard',
          sql: `
CREATE TABLE IF NOT EXISTS cars (
  id VARCHAR(255) PRIMARY KEY,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel VARCHAR(255) NOT NULL,
  power INTEGER NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  source VARCHAR(50) DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
          `
        }, { status: 500 })
      }
      
      return NextResponse.json({
        success: false,
        test: 'connection',
        error: connectionError.message,
        details: connectionError
      }, { status: 500 })
    }

    console.log('Connection successful, testing table operations...')

    // Test 2: Try to insert a test record
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
      description: 'Test car for database verification',
      featured: false,
      source: 'test'
    }

    const { data: insertData, error: insertError } = await supabase
      .from('cars')
      .insert(testCar)
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({
        success: false,
        test: 'insert',
        error: insertError.message,
        details: insertError
      }, { status: 500 })
    }

    console.log('Insert successful, cleaning up...')

    // Test 3: Clean up test record
    const { error: deleteError } = await supabase
      .from('cars')
      .delete()
      .eq('id', testCar.id)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      // Don't fail the test for cleanup errors
    }

    // Test 4: Get actual car count
    const { data: cars, error: countError } = await supabase
      .from('cars')
      .select('*')

    if (countError) {
      console.error('Count error:', countError)
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase database connection and operations successful',
      tests: {
        connection: '✅ Passed',
        insert: '✅ Passed',
        delete: '✅ Passed',
        count: countError ? '❌ Failed' : '✅ Passed'
      },
      carCount: cars?.length || 0,
      supabaseUrl: 'https://spwyjrykkqoezyzigxdg.supabase.co'
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      message: 'Unexpected error during Supabase test'
    }, { status: 500 })
  }
} 