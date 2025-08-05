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
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    // Wait for key elements to load
    await page.waitForSelector('[data-testid="advert-details"]', { timeout: 10000 })

    // Extract car details
    const carData = await page.evaluate(() => {
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

      // Extract price - try multiple selectors
      let price = 0
      const priceSelectors = [
        '[data-testid="advert-price"]',
        '.price',
        '.advert-price',
        '[data-testid="price"]',
        '.e1hbhzwx0'
      ]
      
      for (const selector of priceSelectors) {
        const priceElement = document.querySelector(selector)
        if (priceElement) {
          const priceText = priceElement.textContent || ''
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
        '.advert-title',
        '[data-testid="advert-title"]',
        '.e1hbhzwx0'
      ]
      
      for (const selector of titleSelectors) {
        const titleElement = document.querySelector(selector)
        if (titleElement) {
          const title = titleElement.textContent?.trim() || ''
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
        '.e1hbhzwx0:contains("rok")'
      ]
      
      for (const selector of yearSelectors) {
        const yearText = getText(selector)
        if (yearText) {
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
        '.e1hbhzwx0:contains("km")'
      ]
      
      for (const selector of mileageSelectors) {
        const mileageText = getText(selector)
        if (mileageText) {
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
        '.e1hbhzwx0:contains("paliwo")'
      ]
      
      for (const selector of fuelSelectors) {
        const fuelText = getText(selector)
        if (fuelText) {
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
        '.e1hbhzwx0:contains("KM")'
      ]
      
      for (const selector of powerSelectors) {
        const powerText = getText(selector)
        if (powerText) {
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
        '.e1hbhzwx0'
      ]
      
      for (const selector of descriptionSelectors) {
        const descriptionElement = document.querySelector(selector)
        if (descriptionElement) {
          const descText = descriptionElement.textContent?.trim()
          if (descText && descText.length > 10) {
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
        'img[src*="otomoto"]'
      ]
      
      for (const selector of imageSelectors) {
        const imageElement = document.querySelector(selector)
        if (imageElement) {
          const src = imageElement.getAttribute('src')
          if (src && src.includes('otomoto')) {
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
        '.e1hbhzwx0:contains("skrzynia")'
      ]
      
      for (const selector of transmissionSelectors) {
        const transmissionText = getText(selector)
        if (transmissionText) {
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
        '.e1hbhzwx0:contains("kolor")'
      ]
      
      for (const selector of colorSelectors) {
        const colorText = getText(selector)
        if (colorText) {
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
        '.e1hbhzwx0:contains("VIN")'
      ]
      
      for (const selector of vinSelectors) {
        const vinText = getText(selector)
        if (vinText) {
          vin = vinText
          break
        }
      }

      // Extract features
      const featuresSelectors = [
        '[data-testid="advert-features"] li',
        '.features-list li',
        '.advert-features li',
        '.e1hbhzwx0 li'
      ]
      
      let features: string[] = []
      for (const selector of featuresSelectors) {
        const featuresElements = document.querySelectorAll(selector)
        if (featuresElements.length > 0) {
          features = Array.from(featuresElements)
            .map(el => el.textContent?.trim())
            .filter((text): text is string => Boolean(text))
          break
        }
      }

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

    // Validate extracted data
    if (!carData.brand || !carData.model || carData.price === 0) {
      return NextResponse.json(
        { error: 'Could not extract car details from the provided URL' },
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
      { error: 'Failed to scrape car details. Please check the URL and try again.' },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close()
    }
  }
} 