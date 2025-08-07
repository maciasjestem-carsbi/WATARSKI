import { NextRequest, NextResponse } from 'next/server'

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

    // Use Vercel Blob with the provided token
    try {
      const { put } = await import('@vercel/blob')
      const { url } = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
      })

      return NextResponse.json({
        url,
        filename,
        size: file.size,
        message: 'Zdjęcie zostało pomyślnie przesłane do Vercel Blob'
      })
    } catch (blobError) {
      console.error('Vercel Blob error:', blobError)
      
      // Fallback to placeholder if Blob fails
      return NextResponse.json({
        url: '/api/placeholder/400/300',
        filename,
        size: file.size,
        message: 'Vercel Blob nie działa - używam obrazu zastępczego'
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