import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Checking Supabase configuration...')

    // Test basic connection
    const { data, error } = await supabase
      .from('cars')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('Database connection error:', error)
      return NextResponse.json({
        success: false,
        error: 'Błąd połączenia z bazą danych',
        details: error.message,
        code: error.code
      })
    }

    console.log('Database connection successful')

    // Test storage permissions
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
    
    if (storageError) {
      console.error('Storage error:', storageError)
      return NextResponse.json({
        success: false,
        error: 'Błąd dostępu do storage',
        details: storageError.message
      })
    }

    console.log('Storage access successful')
    console.log('Available buckets:', buckets?.map(b => ({ name: b.name, public: b.public })) || [])

    return NextResponse.json({
      success: true,
      message: 'Supabase jest skonfigurowane poprawnie',
      database: 'Connected',
      storage: 'Accessible',
      buckets: buckets?.map(b => ({ name: b.name, public: b.public })) || [],
      totalBuckets: buckets?.length || 0
    })

  } catch (error) {
    console.error('Configuration check error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Błąd podczas sprawdzania konfiguracji',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

