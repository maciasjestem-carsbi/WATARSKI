import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Initializing database...')
    
    // Create cars table if it doesn't exist
    const { error: createError } = await supabase.rpc('exec_sql', {
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
          featured_order INTEGER DEFAULT NULL,
          source VARCHAR(50) DEFAULT 'manual',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    if (createError) {
      console.error('Error creating table:', createError)
      return NextResponse.json({ success: false, error: createError.message }, { status: 500 })
    }

    // Add featured_order column if it doesn't exist
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE cars 
        ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT NULL;
      `
    })

    if (alterError) {
      console.error('Error adding featured_order column:', alterError)
      // Don't return error here as column might already exist
    }

    console.log('Database initialized successfully')
    return NextResponse.json({ success: true, message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json({ success: false, error: 'Failed to initialize database' }, { status: 500 })
  }
} 