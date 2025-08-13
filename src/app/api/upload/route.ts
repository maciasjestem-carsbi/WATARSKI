import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nie podano pliku' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Plik musi być obrazem' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Rozmiar pliku musi być mniejszy niż 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `car-${timestamp}.${extension}`

    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Supabase Storage error:', error)
        throw new Error('Błąd podczas przesyłania do Supabase Storage')
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('car-images')
        .getPublicUrl(filename)

      return NextResponse.json({
        url: urlData.publicUrl,
        filename,
        size: file.size,
        message: 'Zdjęcie zostało pomyślnie przesłane do Supabase Storage'
      })
    } catch (storageError) {
      console.error('Storage error:', storageError)
      
      // Fallback to placeholder if storage fails
      return NextResponse.json({
        url: '/api/placeholder/400/300',
        filename,
        size: file.size,
        message: 'Supabase Storage nie działa - używam obrazu zastępczego'
      })
    }

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Błąd podczas przesyłania pliku' },
      { status: 500 }
    )
  }
} 