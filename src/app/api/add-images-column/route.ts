import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Adding images column to cars table...')
    
    // Add images column to the cars table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE cars ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'`
    })

    if (error) {
      console.error('Error adding images column:', error)
      
      // Try alternative approach - direct SQL
      try {
        const { error: directError } = await supabase
          .from('cars')
          .select('id')
          .limit(1)
        
        if (directError) {
          throw new Error(`Database error: ${directError.message}`)
        }
        
        // If we can select, try to add column with a different approach
        console.log('Trying alternative approach...')
        return NextResponse.json({
          success: false,
          error: error.message,
          message: 'Nie można dodać kolumny images. Spróbuj dodać ją ręcznie w Supabase: SQL Editor > ALTER TABLE cars ADD COLUMN images JSONB DEFAULT \'[]\''
        })
      } catch (directError) {
        return NextResponse.json({
          success: false,
          error: error.message,
          message: 'Błąd połączenia z bazą danych'
        }, { status: 500 })
      }
    }

    console.log('Images column added successfully')
    return NextResponse.json({
      success: true,
      message: 'Kolumna images została dodana do tabeli cars'
    })
  } catch (error) {
    console.error('Add images column error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Błąd podczas dodawania kolumny images' 
      },
      { status: 500 }
    )
  }
}
