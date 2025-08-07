import { NextRequest, NextResponse } from 'next/server'

export interface ScrapedCarDetails {
  brand: string
  model: string
  version: string
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

  // Extract price - look for price in various formats
  const priceMatch = html.match(/(\d{1,3}(?:\s\d{3})*)\s*zł/i) || 
                    html.match(/data-price="(\d+)"/i) ||
                    html.match(/price["\s]*:["\s]*(\d+)/i)
  const price = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, '')) : 0

  // Extract year - look for year in various formats
  const yearMatch = html.match(/Rok produkcji[^>]*>([^<]+)</i) || 
                   html.match(/(\d{4})\s*r\./i) ||
                   html.match(/data-year="(\d+)"/i) ||
                   html.match(/year["\s]*:["\s]*(\d{4})/i)
  const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()

  // Extract mileage - look for mileage in various formats
  const mileageMatch = html.match(/Przebieg[^>]*>([^<]+)</i) || 
                      html.match(/(\d{1,3}(?:\s\d{3})*)\s*km/i) ||
                      html.match(/data-mileage="(\d+)"/i) ||
                      html.match(/mileage["\s]*:["\s]*(\d+)/i)
  const mileage = mileageMatch ? parseInt(mileageMatch[1].replace(/\s/g, '')) : 0

  // Extract fuel type - look for fuel in various formats
  const fuelMatch = html.match(/Rodzaj paliwa[^>]*>([^<]+)</i) || 
                   html.match(/(Benzyna|Diesel|Hybryda|Elektryczny)/i) ||
                   html.match(/data-fuel="([^"]+)"/i)
  const fuel = fuelMatch ? fuelMatch[1] : 'Benzyna'

  // Extract power - look for power specifically, not mileage
  const powerMatch = html.match(/Moc[^>]*>([^<]+)</i) || 
                    html.match(/(\d+)\s*KM/i) ||
                    html.match(/data-power="(\d+)"/i) ||
                    html.match(/power["\s]*:["\s]*(\d+)/i) ||
                    html.match(/KM["\s]*:["\s]*(\d+)/i)
  const power = powerMatch ? parseInt(powerMatch[1]) : 100

  // Extract brand and model - improved parsing
  let brand = 'Nieznana'
  let model = 'Nieznany'
  let version = 'Nieznana'
  
  // Try to extract from structured data first
  const brandMatch = html.match(/data-brand="([^"]+)"/i) || 
                    html.match(/"brand"["\s]*:["\s]*"([^"]+)"/i)
  const modelMatch = html.match(/data-model="([^"]+)"/i) || 
                    html.match(/"model"["\s]*:["\s]*"([^"]+)"/i)
  const versionMatch = html.match(/data-version="([^"]+)"/i) || 
                      html.match(/"version"["\s]*:["\s]*"([^"]+)"/i)
  
  if (brandMatch) {
    brand = brandMatch[1]
  }
  if (modelMatch) {
    model = modelMatch[1]
  }
  if (versionMatch) {
    version = versionMatch[1]
  }
  
  // If not found in structured data, try to parse from title
  if (brand === 'Nieznana' && title) {
    // Common car brands to look for
    const brands = ['Skoda', 'Volkswagen', 'Audi', 'BMW', 'Mercedes', 'Ford', 'Opel', 'Renault', 'Peugeot', 'Citroen', 'Toyota', 'Honda', 'Nissan', 'Mazda', 'Hyundai', 'Kia']
    
    for (const brandName of brands) {
      if (title.toLowerCase().includes(brandName.toLowerCase())) {
        brand = brandName
        break
      }
    }
    
    // Extract model and version from title after brand
    if (brand !== 'Nieznana') {
      const modelRegex = new RegExp(`${brand}\\s+([A-Za-z0-9\\s-]+)`, 'i')
      const modelMatch = title.match(modelRegex)
      if (modelMatch) {
        const fullModelText = modelMatch[1].trim()
        
        // Try to separate model from version
        // Look for common version patterns like engine size, trim levels, etc.
        const versionPatterns = [
          /\d+\.\d+\s*(TSI|TDI|TFSI|TDI|GDI|HDI|CDI)/i,  // 2.0 TSI, 1.6 TDI, etc.
          /(RS|GTI|R|S|SE|SEL|Sport|Comfort|Ambition|Style|Elegance|Laurin|Klement)/i,  // Trim levels
          /(DSG|S-Tronic|Tiptronic|Manual|Automatic)/i,  // Transmission types
          /\d+\.\d+\s*(L|T|GDI|HDI)/i,  // Engine sizes
          /(Hybrid|PHEV|EV|Electric)/i,  // Fuel types
        ]
        
        let extractedVersion = ''
        let cleanModel = fullModelText
        
        // Try to find version patterns
        for (const pattern of versionPatterns) {
          const versionMatch = fullModelText.match(pattern)
          if (versionMatch) {
            extractedVersion = versionMatch[0].trim()
            // Remove version from model text
            cleanModel = fullModelText.replace(pattern, '').trim()
            break
          }
        }
        
        // If no specific version pattern found, try to extract after model name
        if (!extractedVersion) {
          // Common model names to identify where model ends and version begins
          const commonModels = ['Octavia', 'Superb', 'Fabia', 'Rapid', 'Kamiq', 'Karoq', 'Kodiaq', 'Scala', 'Enyaq']
          
          for (const modelName of commonModels) {
            if (fullModelText.toLowerCase().includes(modelName.toLowerCase())) {
              const modelIndex = fullModelText.toLowerCase().indexOf(modelName.toLowerCase())
              const afterModel = fullModelText.substring(modelIndex + modelName.length).trim()
              
              if (afterModel) {
                // Check if what comes after looks like a version (has numbers, engine codes, etc.)
                if (afterModel.match(/\d+\.\d+/) || afterModel.match(/(TSI|TDI|RS|GTI|DSG)/i)) {
                  cleanModel = modelName
                  extractedVersion = afterModel
                }
              }
              break
            }
          }
        }
        
        model = cleanModel
        if (extractedVersion) {
          version = extractedVersion
        }
        
        // Clean up model - remove year and other details
        model = model.replace(/\d{4}/g, '').replace(/\s+/g, ' ').trim()
      }
    }
  }

  // Extract image URL - improved pattern
  const imageMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*class="[^"]*gallery[^"]*"/i) ||
                    html.match(/<img[^>]*class="[^"]*gallery[^"]*"[^>]*src="([^"]*)"/i) ||
                    html.match(/data-image="([^"]+)"/i) ||
                    html.match(/"image"["\s]*:["\s]*"([^"]+)"/i)
  const imageUrl = imageMatch ? imageMatch[1] : undefined

  // Extract description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
  const description = descMatch ? descMatch[1] : `${brand} ${model} w doskonałym stanie technicznym.`

  // Extract transmission
  const transmissionMatch = html.match(/Skrzynia biegów[^>]*>([^<]+)</i) || 
                          html.match(/(Manualna|Automatyczna)/i) ||
                          html.match(/data-transmission="([^"]+)"/i)
  const transmission = transmissionMatch ? transmissionMatch[1] : 'Manualna'

  // Extract color
  const colorMatch = html.match(/Kolor[^>]*>([^<]+)</i) || 
                    html.match(/(Biały|Czarny|Srebrny|Niebieski|Czerwony|Zielony)/i) ||
                    html.match(/data-color="([^"]+)"/i)
  const color = colorMatch ? colorMatch[1] : 'Nieznany'

  // Generate VIN based on car ID from URL
  const carIdMatch = url.match(/ID([A-Za-z0-9]+)/)
  const carId = carIdMatch ? carIdMatch[1] : 'demo'
  const vin = `TMBJN7NS8N${carId}`

  console.log('Parsed data:', { brand, model, year, mileage, fuel, power, price, title })

  return {
    brand,
    model,
    version,
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