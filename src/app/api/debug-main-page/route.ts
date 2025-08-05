import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Debugging main page data fetching...')
    
    // Test 1: Check environment variables
    const vercelUrl = process.env.VERCEL_URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    
    console.log('Environment variables:')
    console.log('- VERCEL_URL:', vercelUrl)
    console.log('- NEXT_PUBLIC_BASE_URL:', baseUrl)
    
    // Test 2: Try to fetch featured cars
    const baseUrlToUse = vercelUrl 
      ? `https://${vercelUrl}` 
      : baseUrl || 'http://localhost:3000'
    
    console.log('Using base URL:', baseUrlToUse)
    
    const response = await fetch(`${baseUrlToUse}/api/cars/featured`, {
      cache: 'no-store'
    })
    
    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)
    
    if (response.ok) {
      const featuredCars = await response.json()
      console.log('Featured cars fetched:', featuredCars.length)
      console.log('Featured cars:', featuredCars)
      
      return NextResponse.json({
        success: true,
        environment: {
          vercelUrl,
          baseUrl,
          baseUrlToUse
        },
        response: {
          status: response.status,
          ok: response.ok
        },
        featuredCars: {
          count: featuredCars.length,
          cars: featuredCars
        }
      })
    } else {
      const errorText = await response.text()
      console.error('Response error:', errorText)
      
      return NextResponse.json({
        success: false,
        environment: {
          vercelUrl,
          baseUrl,
          baseUrlToUse
        },
        response: {
          status: response.status,
          ok: response.ok,
          error: errorText
        }
      })
    }
    
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
} 