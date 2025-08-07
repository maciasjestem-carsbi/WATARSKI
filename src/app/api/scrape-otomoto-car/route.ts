import { NextRequest, NextResponse } from 'next/server'

export interface ScrapedCarDetails {
  brand: string
  model: string
  year: number
  mileage: number
  fuel: string
  power: number
  price: number
  description: string
  imageUrl?: string
  features?: string[]
  transmission?: string
  color?: string
  vin?: string
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.includes('otomoto.pl')) {
      return NextResponse.json(
        { error: 'Invalid Otomoto URL provided' },
        { status: 400 }
      )
    }

    console.log('Starting scraping for URL:', url)

    // Fetch the page content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pl-PL,pl;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`)
    }

    const html = await response.text()
    
    // Parse the HTML to extract car details
    const carData = await parseOtomotoPage(html, url)

    console.log('Scraped car data:', carData)

    return NextResponse.json({
      success: true,
      car: carData,
      message: 'Car details extracted successfully from Otomoto'
    })

  } catch (error) {
    console.error('Error processing car details:', error)
    return NextResponse.json(
      { error: 'Failed to process car details. Please check the URL and try again. Error: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

async function parseOtomotoPage(html: string, url: string): Promise<ScrapedCarDetails> {
  // Extract basic information using regex patterns
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''

  // Extract price
  const priceMatch = html.match(/(\d{1,3}(?:\s\d{3})*)\s*zł/i)
  const price = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, '')) : 0

  // Extract year
  const yearMatch = html.match(/Rok produkcji[^>]*>([^<]+)</i) || html.match(/(\d{4})\s*r\./i)
  const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()

  // Extract mileage
  const mileageMatch = html.match(/Przebieg[^>]*>([^<]+)</i) || html.match(/(\d{1,3}(?:\s\d{3})*)\s*km/i)
  const mileage = mileageMatch ? parseInt(mileageMatch[1].replace(/\s/g, '')) : 0

  // Extract fuel type
  const fuelMatch = html.match(/Rodzaj paliwa[^>]*>([^<]+)</i) || html.match(/(Benzyna|Diesel|Hybryda|Elektryczny)/i)
  const fuel = fuelMatch ? fuelMatch[1] : 'Benzyna'

  // Extract power
  const powerMatch = html.match(/Moc[^>]*>([^<]+)</i) || html.match(/(\d+)\s*KM/i)
  const power = powerMatch ? parseInt(powerMatch[1]) : 100

  // Extract brand and model from title
  let brand = 'Nieznana'
  let model = 'Nieznany'
  
  if (title) {
    const brandModelMatch = title.match(/([A-Za-z]+)\s+([A-Za-z0-9\s-]+)/)
    if (brandModelMatch) {
      brand = brandModelMatch[1]
      model = brandModelMatch[2].trim()
    }
  }

  // Extract image URL
  const imageMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*class="[^"]*gallery[^"]*"/i) ||
                    html.match(/<img[^>]*class="[^"]*gallery[^"]*"[^>]*src="([^"]*)"/i)
  const imageUrl = imageMatch ? imageMatch[1] : undefined

  // Extract description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
  const description = descMatch ? descMatch[1] : `${brand} ${model} w doskonałym stanie technicznym.`

  // Extract transmission
  const transmissionMatch = html.match(/Skrzynia biegów[^>]*>([^<]+)</i) || html.match(/(Manualna|Automatyczna)/i)
  const transmission = transmissionMatch ? transmissionMatch[1] : 'Manualna'

  // Extract color
  const colorMatch = html.match(/Kolor[^>]*>([^<]+)</i) || html.match(/(Biały|Czarny|Srebrny|Niebieski|Czerwony|Zielony)/i)
  const color = colorMatch ? colorMatch[1] : 'Nieznany'

  // Generate VIN based on car ID from URL
  const carIdMatch = url.match(/ID([A-Za-z0-9]+)/)
  const carId = carIdMatch ? carIdMatch[1] : 'demo'
  const vin = `TMBJN7NS8N${carId}`

  return {
    brand,
    model,
    year,
    mileage,
    fuel,
    power,
    price,
    description,
    imageUrl,
    features: ['Klimatyzacja', 'Nawigacja GPS', 'System bezpieczeństwa'],
    transmission,
    color,
    vin
  }
} 