import { NextResponse } from 'next/server'
import { supabaseCarDatabase } from '@/lib/database-supabase'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Initializing database...')
    
    // Initialize the database with new schema
    await supabaseCarDatabase.init()
    
    // Update existing table to allow NULL values for year, mileage, and power
    try {
      const { error: alterError } = await supabase.rpc('exec_sql', {
        sql: `
          ALTER TABLE cars 
          ALTER COLUMN year DROP NOT NULL,
          ALTER COLUMN mileage DROP NOT NULL,
          ALTER COLUMN power DROP NOT NULL;
        `
      })
      
      if (alterError) {
        console.log('Table already updated or error:', alterError)
      } else {
        console.log('Table schema updated successfully')
      }
    } catch (alterError) {
      console.log('Could not alter table (might already be correct):', alterError)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    )
  }
} 