// Database interface for WĄTARSKI car dealership
// This handles persistent storage of car data

export interface CarData {
  id: string
  brand: string
  model: string
  year: number
  mileage: number
  fuel: string
  power: number
  price: number
  type: 'new' | 'used' | 'delivery'
  description: string
  imageUrl?: string
  featured: boolean
  source?: 'manual' | 'otomoto'
  createdAt: Date
  updatedAt: Date
}

// Current implementation uses in-memory storage
// In production, you would use:
// 1. Vercel Postgres: npm install @vercel/postgres
// 2. Supabase: npm install @supabase/supabase-js
// 3. PlanetScale: npm install @planetscale/database

class CarDatabase {
  private cars: CarData[] = []

  constructor() {
    // Initialize with sample data
    this.cars = [
      {
        id: '1',
        brand: 'Volkswagen',
        model: 'T-Roc',
        year: 2024,
        mileage: 10,
        fuel: 'Hybryda',
        power: 150,
        price: 129900,
        type: 'new',
        description: 'Nowy Volkswagen T-Roc w doskonałym stanie. Samochód wyposażony w najnowsze technologie bezpieczeństwa i komfortu. Idealny do jazdy miejskiej i dalekich podróży.',
        imageUrl: '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
        featured: true,
        source: 'manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        brand: 'Volkswagen',
        model: 'Passat',
        year: 2024,
        mileage: 5,
        fuel: 'Diesel',
        power: 150,
        price: 189900,
        type: 'new',
        description: 'Elegancki Volkswagen Passat - flagowy sedan marki. Luksusowe wnętrze, zaawansowane systemy bezpieczeństwa i doskonałe osiągi.',
        imageUrl: '/images/Passat_SE.webp',
        featured: true,
        source: 'manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        brand: 'Volkswagen',
        model: 'Tiguan',
        year: 2023,
        mileage: 45000,
        fuel: 'Benzyna',
        power: 184,
        price: 89900,
        type: 'used',
        description: 'Używany Volkswagen Tiguan w świetnym stanie. Samochód z pełną historią serwisową, idealny dla rodzin.',
        imageUrl: '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
        featured: true,
        source: 'manual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }

  // Get all cars
  async getAllCars(): Promise<CarData[]> {
    return this.cars
  }

  // Get featured cars
  async getFeaturedCars(): Promise<CarData[]> {
    return this.cars.filter(car => car.featured)
  }

  // Get car by ID
  async getCarById(id: string): Promise<CarData | null> {
    return this.cars.find(car => car.id === id) || null
  }

  // Add new car
  async addCar(carData: Omit<CarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarData> {
    const newCar: CarData = {
      ...carData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.cars.push(newCar)
    return newCar
  }

  // Update car
  async updateCar(id: string, carData: Partial<CarData>): Promise<CarData | null> {
    const index = this.cars.findIndex(car => car.id === id)
    if (index === -1) return null

    this.cars[index] = {
      ...this.cars[index],
      ...carData,
      updatedAt: new Date()
    }
    return this.cars[index]
  }

  // Delete car
  async deleteCar(id: string): Promise<boolean> {
    const index = this.cars.findIndex(car => car.id === id)
    if (index === -1) return false

    this.cars.splice(index, 1)
    return true
  }

  // Toggle featured status
  async toggleFeatured(id: string): Promise<CarData | null> {
    const car = this.cars.find(car => car.id === id)
    if (!car) return null

    car.featured = !car.featured
    car.updatedAt = new Date()

    // Ensure only 3 cars are featured
    const featuredCount = this.cars.filter(c => c.featured).length
    if (featuredCount > 3) {
      const nonFeatured = this.cars.filter(c => !c.featured)
      if (nonFeatured.length > 0) {
        nonFeatured[0].featured = false
        nonFeatured[0].updatedAt = new Date()
      }
    }

    return car
  }
}

// Singleton instance
export const carDatabase = new CarDatabase()

// Production-ready database implementations (uncomment when ready)

/*
// Vercel Postgres implementation
import { sql } from '@vercel/postgres'

export class VercelPostgresDatabase {
  async getAllCars(): Promise<CarData[]> {
    const { rows } = await sql`SELECT * FROM cars ORDER BY created_at DESC`
    return rows.map(row => ({
      ...row,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }))
  }

  async addCar(carData: Omit<CarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarData> {
    const { rows } = await sql`
      INSERT INTO cars (brand, model, year, mileage, fuel, power, price, type, description, image_url, featured, source)
      VALUES (${carData.brand}, ${carData.model}, ${carData.year}, ${carData.mileage}, ${carData.fuel}, ${carData.power}, ${carData.price}, ${carData.type}, ${carData.description}, ${carData.imageUrl}, ${carData.featured}, ${carData.source})
      RETURNING *
    `
    return rows[0]
  }
}

// Supabase implementation
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export class SupabaseDatabase {
  async getAllCars(): Promise<CarData[]> {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async addCar(carData: Omit<CarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarData> {
    const { data, error } = await supabase
      .from('cars')
      .insert([carData])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
*/ 