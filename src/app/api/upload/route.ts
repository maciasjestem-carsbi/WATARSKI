import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `car-${timestamp}.${extension}`

    // Check if Vercel Blob is configured
    const blobStoreToken = process.env.WATARSKI_READ_WRITE_TOKEN
    
    if (!blobStoreToken) {
      // Fallback to placeholder image if Vercel Blob is not configured
      console.log('Vercel Blob not configured, using placeholder image')
      return NextResponse.json({
        url: '/api/placeholder/400/300',
        filename,
        size: file.size,
        message: 'Vercel Blob not configured - using placeholder image'
      })
    }

    // Try to use Vercel Blob if configured
    try {
      const { put } = await import('@vercel/blob')
      const { url } = await put(filename, file, {
        access: 'public',
      })

      return NextResponse.json({
        url,
        filename,
        size: file.size
      })
    } catch (blobError) {
      console.error('Vercel Blob error:', blobError)
      
      // Fallback to placeholder if Blob fails
      return NextResponse.json({
        url: '/api/placeholder/400/300',
        filename,
        size: file.size,
        message: 'Vercel Blob failed - using placeholder image'
      })
    }

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 