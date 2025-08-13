import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Initializing Supabase Storage...')

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return NextResponse.json(
        { error: 'Błąd podczas sprawdzania bucketów' },
        { status: 500 }
      )
    }

    const carImagesBucket = buckets?.find(bucket => bucket.name === 'car-images')

    if (!carImagesBucket) {
      console.log('car-images bucket does not exist')
      return NextResponse.json({
        success: false,
        message: 'Bucket "car-images" nie istnieje. Utwórz go w panelu Supabase: Storage > Create bucket > Name: car-images > Public bucket',
        buckets: buckets?.map(b => b.name) || []
      })
    } else {
      console.log('car-images bucket exists')
      
      // Test upload permissions
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('car-images')
        .upload('test.txt', testFile, { upsert: true })

      if (uploadError) {
        console.error('Upload test failed:', uploadError)
        return NextResponse.json({
          success: false,
          message: `Błąd uploadu: ${uploadError.message}`,
          bucket: carImagesBucket.name
        })
      }

      // Clean up test file
      await supabase.storage
        .from('car-images')
        .remove(['test.txt'])

      return NextResponse.json({
        success: true,
        message: 'Supabase Storage jest skonfigurowane poprawnie',
        bucket: carImagesBucket.name
      })
    }
  } catch (error) {
    console.error('Storage initialization error:', error)
    return NextResponse.json(
      { error: 'Błąd podczas inicjalizacji storage' },
      { status: 500 }
    )
  }
}


