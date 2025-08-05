import { NextRequest, NextResponse } from 'next/server'
import * as puppeteer from 'puppeteer'

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
  let browser: puppeteer.Browser | null = null

  try {
    const { url } = await request.json()

    if (!url || !url.includes('otomoto.pl')) {
      return NextResponse.json(
        { error: 'Invalid Otomoto URL provided' },
        { status: 400 }
      )
    }

    console.log('Starting scraping for URL:', url)

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    })

    const page = await browser.newPage()
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 })
    
    console.log('Navigating to URL...')
    
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    console.log('Page loaded, waiting for content...')

    // Wait a bit for dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Try to find any content on the page
    const pageContent = await page.content()
    console.log('Page content length:', pageContent.length)

    // Extract car details with more robust selectors
    const carData = await page.evaluate(() => {
      console.log('Starting extraction...')

      // Helper function to extract text content
      const getText = (selector: string) => {
        const element = document.querySelector(selector)
        return element ? element.textContent?.trim() : ''
      }

      // Helper function to extract number
      const getNumber = (selector: string) => {
        const text = getText(selector)
        return text ? parseInt(text.replace(/\D/g, '')) : 0
      }

      // Log all elements with data-testid for debugging
      const testElements = document.querySelectorAll('[data-testid]')
      console.log('Found elements with data-testid:', testElements.length)
      testElements.forEach((el, i) => {
        console.log(`Element ${i}:`, el.getAttribute('data-testid'), el.textContent?.substring(0, 50))
      })

      // Extract price - try multiple selectors
      let price = 0
      const priceSelectors = [
        '[data-testid="advert-price"]',
        '[data-testid="price"]',
        '.price',
        '.advert-price',
        '.e1hbhzwx0',
        '[class*="price"]',
        '[class*="Price"]',
        'span[class*="price"]',
        'div[class*="price"]'
      ]
      
      for (const selector of priceSelectors) {
        const priceElement = document.querySelector(selector)
        if (priceElement) {
          const priceText = priceElement.textContent || ''
          console.log('Found price element:', selector, priceText)
          const extractedPrice = parseInt(priceText.replace(/\D/g, ''))
          if (extractedPrice > 0) {
            price = extractedPrice
            break
          }
        }
      }

      // Extract title (brand and model) - try multiple selectors
      let brand = 'Nieznana'
      let model = 'Nieznany'
      
      const titleSelectors = [
        'h1',
        '[data-testid="advert-title"]',
        '.advert-title',
        '.e1hbhzwx0',
        '[class*="title"]',
        '[class*="Title"]',
        'h1[class*="title"]',
        'div[class*="title"]'
      ]
      
      for (const selector of titleSelectors) {
        const titleElement = document.querySelector(selector)
        if (titleElement) {
          const title = titleElement.textContent?.trim() || ''
          console.log('Found title element:', selector, title)
          if (title) {
            const parts = title.split(' ')
            if (parts.length >= 2) {
              brand = parts[0]
              model = parts.slice(1).join(' ')
              break
            }
          }
        }
      }

      // Extract year - try multiple selectors
      let year = new Date().getFullYear()
      const yearSelectors = [
        '[data-testid="advert-details-item"][data-testid*="year"]',
        '[data-testid="year"]',
        '.year',
        '.e1hbhzwx0:contains("rok")',
        '[class*="year"]',
        'span[class*="year"]',
        'div[class*="year"]'
      ]
      
      for (const selector of yearSelectors) {
        const yearText = getText(selector)
        if (yearText) {
          console.log('Found year element:', selector, yearText)
          const extractedYear = parseInt(yearText)
          if (extractedYear > 1900 && extractedYear <= new Date().getFullYear()) {
            year = extractedYear
            break
          }
        }
      }

      // Extract mileage - try multiple selectors
      let mileage = 0
      const mileageSelectors = [
        '[data-testid="advert-details-item"][data-testid*="mileage"]',
        '[data-testid="mileage"]',
        '.mileage',
        '.e1hbhzwx0:contains("km")',
        '[class*="mileage"]',
        '[class*="Mileage"]',
        'span[class*="mileage"]',
        'div[class*="mileage"]'
      ]
      
      for (const selector of mileageSelectors) {
        const mileageText = getText(selector)
        if (mileageText) {
          console.log('Found mileage element:', selector, mileageText)
          const extractedMileage = parseInt(mileageText.replace(/\D/g, ''))
          if (extractedMileage > 0) {
            mileage = extractedMileage
            break
          }
        }
      }

      // Extract fuel type - try multiple selectors
      let fuel = 'Benzyna'
      const fuelSelectors = [
        '[data-testid="advert-details-item"][data-testid*="fuel"]',
        '[data-testid="fuel"]',
        '.fuel',
        '.e1hbhzwx0:contains("paliwo")',
        '[class*="fuel"]',
        '[class*="Fuel"]',
        'span[class*="fuel"]',
        'div[class*="fuel"]'
      ]
      
      for (const selector of fuelSelectors) {
        const fuelText = getText(selector)
        if (fuelText) {
          console.log('Found fuel element:', selector, fuelText)
          fuel = fuelText
          break
        }
      }

      // Extract power - try multiple selectors
      let power = 100
      const powerSelectors = [
        '[data-testid="advert-details-item"][data-testid*="power"]',
        '[data-testid="power"]',
        '.power',
        '.e1hbhzwx0:contains("KM")',
        '[class*="power"]',
        '[class*="Power"]',
        'span[class*="power"]',
        'div[class*="power"]'
      ]
      
      for (const selector of powerSelectors) {
        const powerText = getText(selector)
        if (powerText) {
          console.log('Found power element:', selector, powerText)
          const extractedPower = parseInt(powerText.replace(/\D/g, ''))
          if (extractedPower > 0) {
            power = extractedPower
            break
          }
        }
      }

      // Extract description - try multiple selectors
      let description = 'Samochód z Otomoto'
      const descriptionSelectors = [
        '[data-testid="advert-description"]',
        '.description',
        '.advert-description',
        '.e1hbhzwx0',
        '[class*="description"]',
        '[class*="Description"]',
        'div[class*="description"]',
        'p[class*="description"]'
      ]
      
      for (const selector of descriptionSelectors) {
        const descriptionElement = document.querySelector(selector)
        if (descriptionElement) {
          const descText = descriptionElement.textContent?.trim()
          if (descText && descText.length > 10) {
            console.log('Found description element:', selector, descText.substring(0, 50))
            description = descText
            break
          }
        }
      }

      // Extract main image - try multiple selectors
      let imageUrl = ''
      const imageSelectors = [
        '[data-testid="advert-image"] img',
        '.gallery-image img',
        '.advert-image img',
        '.e1hbhzwx0 img',
        'img[src*="otomoto"]',
        'img[src*="ireland"]',
        'img[src*="apollo"]',
        'img[class*="image"]',
        'img[class*="Image"]'
      ]
      
      for (const selector of imageSelectors) {
        const imageElement = document.querySelector(selector)
        if (imageElement) {
          const src = imageElement.getAttribute('src')
          if (src && (src.includes('otomoto') || src.includes('ireland') || src.includes('apollo'))) {
            console.log('Found image element:', selector, src)
            imageUrl = src
            break
          }
        }
      }

      // Extract transmission
      let transmission = 'Manualna'
      const transmissionSelectors = [
        '[data-testid="advert-details-item"][data-testid*="transmission"]',
        '[data-testid="transmission"]',
        '.transmission',
        '.e1hbhzwx0:contains("skrzynia")',
        '[class*="transmission"]',
        '[class*="Transmission"]',
        'span[class*="transmission"]',
        'div[class*="transmission"]'
      ]
      
      for (const selector of transmissionSelectors) {
        const transmissionText = getText(selector)
        if (transmissionText) {
          console.log('Found transmission element:', selector, transmissionText)
          transmission = transmissionText
          break
        }
      }

      // Extract color
      let color = 'Nieznany'
      const colorSelectors = [
        '[data-testid="advert-details-item"][data-testid*="color"]',
        '[data-testid="color"]',
        '.color',
        '.e1hbhzwx0:contains("kolor")',
        '[class*="color"]',
        '[class*="Color"]',
        'span[class*="color"]',
        'div[class*="color"]'
      ]
      
      for (const selector of colorSelectors) {
        const colorText = getText(selector)
        if (colorText) {
          console.log('Found color element:', selector, colorText)
          color = colorText
          break
        }
      }

      // Extract VIN
      let vin = ''
      const vinSelectors = [
        '[data-testid="advert-details-item"][data-testid*="vin"]',
        '[data-testid="vin"]',
        '.vin',
        '.e1hbhzwx0:contains("VIN")',
        '[class*="vin"]',
        '[class*="VIN"]',
        'span[class*="vin"]',
        'div[class*="vin"]'
      ]
      
      for (const selector of vinSelectors) {
        const vinText = getText(selector)
        if (vinText) {
          console.log('Found VIN element:', selector, vinText)
          vin = vinText
          break
        }
      }

      // Extract features
      const featuresSelectors = [
        '[data-testid="advert-features"] li',
        '.features-list li',
        '.advert-features li',
        '.e1hbhzwx0 li',
        '[class*="features"] li',
        '[class*="Features"] li'
      ]
      
      let features: string[] = []
      for (const selector of featuresSelectors) {
        const featuresElements = document.querySelectorAll(selector)
        if (featuresElements.length > 0) {
          console.log('Found features elements:', selector, featuresElements.length)
          features = Array.from(featuresElements)
            .map(el => el.textContent?.trim())
            .filter((text): text is string => Boolean(text))
          break
        }
      }

      console.log('Extraction complete. Results:', {
        brand, model, year, mileage, fuel, power, price, 
        description: description.substring(0, 50), 
        imageUrl: imageUrl.substring(0, 50),
        transmission, color, vin, featuresCount: features.length
      })

      return {
        brand: brand || 'Nieznana',
        model: model || 'Nieznany',
        year,
        mileage,
        fuel,
        power,
        price,
        description,
        imageUrl,
        transmission,
        color,
        vin,
        features
      }
    })

    console.log('Scraped data:', carData)

    // Validate extracted data
    if (!carData.brand || !carData.model || carData.price === 0) {
      console.log('Validation failed - insufficient data extracted')
      return NextResponse.json(
        { error: 'Could not extract car details from the provided URL. Please check if the URL is correct and the page is accessible.' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      car: carData,
      message: 'Car details scraped successfully'
    })

  } catch (error) {
    console.error('Error scraping car details:', error)
    return NextResponse.json(
      { error: 'Failed to scrape car details. Please check the URL and try again. Error: ' + (error as Error).message },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close()
    }
  }
} 