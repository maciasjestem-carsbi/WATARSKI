import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Checking cars table schema...')
    
    // Get table schema information
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'cars')
      .eq('table_schema', 'public')
      .order('ordinal_position')

    if (columnsError) {
      console.error('Error fetching columns:', columnsError)
      return NextResponse.json(
        { error: 'Failed to fetch table schema' },
        { status: 500 }
      )
    }

    // Get sample data to see what's actually in the table
    const { data: sampleData, error: dataError } = await supabase
      .from('cars')
      .select('*')
      .limit(1)

    if (dataError) {
      console.error('Error fetching sample data:', dataError)
    }

    return NextResponse.json({
      success: true,
      columns: columns,
      sampleData: sampleData,
      message: 'Table schema checked successfully'
    })
  } catch (error) {
    console.error('Schema check error:', error)
    return NextResponse.json(
      { error: 'Failed to check table schema' },
      { status: 500 }
    )
  }
}
