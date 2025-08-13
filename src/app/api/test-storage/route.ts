import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing Supabase Storage...')
    console.log('Supabase URL:', 'https://spwyjrykkqoezyzigxdg.supabase.co')

    // Test 1: List buckets
    console.log('1. Listing buckets...')
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return NextResponse.json({
        success: false,
        error: 'Błąd podczas listowania bucketów',
        details: listError.message,
        code: listError.code
      })
    }

    console.log('Available buckets:', buckets?.map(b => ({ name: b.name, public: b.public })) || [])

    // Test 2: Check if car-images bucket exists
    const carImagesBucket = buckets?.find(bucket => bucket.name === 'car-images')
    
    if (!carImagesBucket) {
      console.log('car-images bucket not found')
      return NextResponse.json({
        success: false,
        message: 'Bucket "car-images" nie istnieje',
        availableBuckets: buckets?.map(b => ({ name: b.name, public: b.public })) || [],
        totalBuckets: buckets?.length || 0
      })
    }

    console.log('car-images bucket found:', carImagesBucket)

    // Test 3: Try to upload a test file
    console.log('2. Testing upload...')
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('car-images')
      .upload('test.txt', testFile, { upsert: true })

    if (uploadError) {
      console.error('Upload test failed:', uploadError)
      return NextResponse.json({
        success: false,
        message: `Błąd uploadu: ${uploadError.message}`,
        bucket: carImagesBucket.name,
        errorCode: uploadError.code
      })
    }

    console.log('Upload successful:', uploadData)

    // Test 4: Get public URL
    console.log('3. Getting public URL...')
    const { data: urlData } = supabase.storage
      .from('car-images')
      .getPublicUrl('test.txt')

    console.log('Public URL:', urlData.publicUrl)

    // Test 5: Clean up test file
    console.log('4. Cleaning up test file...')
    const { error: deleteError } = await supabase.storage
      .from('car-images')
      .remove(['test.txt'])

    if (deleteError) {
      console.error('Delete test failed:', deleteError)
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase Storage działa poprawnie!',
      bucket: carImagesBucket.name,
      publicUrl: urlData.publicUrl,
      uploadData: uploadData
    })

  } catch (error) {
    console.error('Storage test error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Błąd podczas testowania storage',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

