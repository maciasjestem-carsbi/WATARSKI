import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Creating car-images bucket in Supabase Storage...')

    // Create the car-images bucket
    const { data, error } = await supabase.storage.createBucket('car-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
    })

    if (error) {
      console.error('Error creating bucket:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          message: 'Błąd podczas tworzenia bucketu car-images' 
        },
        { status: 500 }
      )
    }

    console.log('Bucket created successfully:', data)
    
    return NextResponse.json({
      success: true,
      message: 'Bucket car-images został utworzony pomyślnie',
      bucket: data
    })
  } catch (error) {
    console.error('Storage bucket creation error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Błąd podczas tworzenia bucketu storage',
        message: 'Nieoczekiwany błąd podczas tworzenia bucketu' 
      },
      { status: 500 }
    )
  }
}
