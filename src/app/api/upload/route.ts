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

    // For now, return a placeholder image
    // In production, you would configure Vercel Blob with proper environment variables
    console.log('File upload received:', filename, file.size, 'bytes')
    
    return NextResponse.json({
      url: '/api/placeholder/400/300',
      filename,
      size: file.size,
      message: 'File upload successful - using placeholder image. Configure Vercel Blob for production image storage.'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// Note: To enable Vercel Blob storage in production:
// 1. Go to your Vercel project dashboard
// 2. Navigate to Storage > Blob
// 3. Create a new Blob store
// 4. Add the BLOB_READ_WRITE_TOKEN environment variable
// 5. Update this endpoint to use the actual Blob storage 