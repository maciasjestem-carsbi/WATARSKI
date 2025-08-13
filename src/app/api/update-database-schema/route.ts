import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Updating database schema...')
    
    // Add missing columns to the cars table
    const updates = [
      // Add images column if it doesn't exist
      `ALTER TABLE cars ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'`,
      // Add version column if it doesn't exist
      `ALTER TABLE cars ADD COLUMN IF NOT EXISTS version VARCHAR(255) DEFAULT ''`,
      // Make year, mileage, and power nullable
      `ALTER TABLE cars ALTER COLUMN year DROP NOT NULL`,
      `ALTER TABLE cars ALTER COLUMN mileage DROP NOT NULL`, 
      `ALTER TABLE cars ALTER COLUMN power DROP NOT NULL`
    ]

    for (const update of updates) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: update })
        if (error) {
          console.log(`Update failed: ${update}`, error)
        } else {
          console.log(`Update successful: ${update}`)
        }
      } catch (updateError) {
        console.log(`Update error: ${update}`, updateError)
      }
    }

    // Check current table structure
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'cars')
      .eq('table_schema', 'public')

    if (columnsError) {
      console.error('Error checking table structure:', columnsError)
    } else {
      console.log('Current table structure:', columns)
    }

    return NextResponse.json({
      success: true,
      message: 'Database schema update completed',
      columns: columns || []
    })
  } catch (error) {
    console.error('Schema update error:', error)
    return NextResponse.json(
      { error: 'Failed to update database schema' },
      { status: 500 }
    )
  }
}
