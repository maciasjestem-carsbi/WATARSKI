import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Adding featured_order column to cars table...')
    
    // Try to add the column using SQL
    const { error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE cars ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT NULL;'
    })

    if (error) {
      console.error('Error adding column:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        message: 'Please add the column manually in Supabase dashboard'
      }, { status: 500 })
    }

    console.log('Successfully added featured_order column')
    return NextResponse.json({ 
      success: true, 
      message: 'Featured order column added successfully'
    })

  } catch (error) {
    console.error('Error adding featured order column:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add featured order column',
      message: 'Please add the column manually in Supabase dashboard: ALTER TABLE cars ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT NULL;'
    }, { status: 500 })
  }
} 