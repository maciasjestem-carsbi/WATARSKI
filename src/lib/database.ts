// Database interface for WĄTARSKI car dealership
// This handles persistent storage of car data using Vercel Postgres

import { sql } from '@vercel/postgres'

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

// Production implementation using Vercel Postgres
class CarDatabase {
  // Initialize database table
  async init() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS cars (
          id VARCHAR(255) PRIMARY KEY,
          brand VARCHAR(255) NOT NULL,
          model VARCHAR(255) NOT NULL,
          year INTEGER NOT NULL,
          mileage INTEGER NOT NULL,
          fuel VARCHAR(255) NOT NULL,
          power INTEGER NOT NULL,
          price INTEGER NOT NULL,
          type VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          image_url TEXT,
          featured BOOLEAN DEFAULT FALSE,
          source VARCHAR(50) DEFAULT 'manual',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      
      // Insert sample data if table is empty
      const { rows } = await sql`SELECT COUNT(*) as count FROM cars`
      if (rows[0].count === '0') {
        await this.insertSampleData()
      }
    } catch (error) {
      console.error('Database initialization error:', error)
    }
  }

  // Insert sample data
  async insertSampleData() {
    const sampleCars = [
      {
        id: '1',
        brand: 'Volkswagen',
        model: 'T-Roc',
        year: 2024,
        mileage: 10,
        fuel: 'Hybryda',
        power: 150,
        price: 129900,
        type: 'new' as const,
        description: 'Nowy Volkswagen T-Roc w doskonałym stanie. Samochód wyposażony w najnowsze technologie bezpieczeństwa i komfortu. Idealny do jazdy miejskiej i dalekich podróży.',
        imageUrl: '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
        featured: true,
        source: 'manual' as const
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
        type: 'new' as const,
        description: 'Elegancki Volkswagen Passat - flagowy sedan marki. Luksusowe wnętrze, zaawansowane systemy bezpieczeństwa i doskonałe osiągi.',
        imageUrl: '/images/Passat_SE.webp',
        featured: true,
        source: 'manual' as const
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
        type: 'used' as const,
        description: 'Używany Volkswagen Tiguan w świetnym stanie. Samochód z pełną historią serwisową, idealny dla rodzin.',
        imageUrl: '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
        featured: true,
        source: 'manual' as const
      }
    ]

    for (const car of sampleCars) {
      await this.addCar(car)
    }
  }

  // Get all cars
  async getAllCars(): Promise<CarData[]> {
    try {
      const { rows } = await sql`
        SELECT * FROM cars 
        ORDER BY created_at DESC
      `
      return rows.map(row => ({
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }))
    } catch (error) {
      console.error('Error fetching cars:', error)
      return []
    }
  }

  // Get featured cars
  async getFeaturedCars(): Promise<CarData[]> {
    try {
      const { rows } = await sql`
        SELECT * FROM cars 
        WHERE featured = true 
        ORDER BY created_at DESC
      `
      return rows.map(row => ({
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }))
    } catch (error) {
      console.error('Error fetching featured cars:', error)
      return []
    }
  }

  // Get car by ID
  async getCarById(id: string): Promise<CarData | null> {
    try {
      const { rows } = await sql`
        SELECT * FROM cars WHERE id = ${id}
      `
      if (rows.length === 0) return null
      
      const row = rows[0]
      return {
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }
    } catch (error) {
      console.error('Error fetching car:', error)
      return null
    }
  }

  // Add new car
  async addCar(carData: Omit<CarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarData> {
    try {
      const id = Date.now().toString()
      const { rows } = await sql`
        INSERT INTO cars (
          id, brand, model, year, mileage, fuel, power, price, type, 
          description, image_url, featured, source
        ) VALUES (
          ${id}, ${carData.brand}, ${carData.model}, ${carData.year}, 
          ${carData.mileage}, ${carData.fuel}, ${carData.power}, ${carData.price}, 
          ${carData.type}, ${carData.description}, ${carData.imageUrl}, 
          ${carData.featured}, ${carData.source}
        ) RETURNING *
      `
      const row = rows[0]
      return {
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }
    } catch (error) {
      console.error('Error adding car:', error)
      throw new Error('Failed to add car')
    }
  }

  // Update car
  async updateCar(id: string, carData: Partial<CarData>): Promise<CarData | null> {
    try {
      // Build update query dynamically
      const updates = []
      const values = []
      let paramIndex = 1

      if (carData.brand !== undefined) {
        updates.push(`brand = $${paramIndex}`)
        values.push(carData.brand)
        paramIndex++
      }
      if (carData.model !== undefined) {
        updates.push(`model = $${paramIndex}`)
        values.push(carData.model)
        paramIndex++
      }
      if (carData.year !== undefined) {
        updates.push(`year = $${paramIndex}`)
        values.push(carData.year)
        paramIndex++
      }
      if (carData.mileage !== undefined) {
        updates.push(`mileage = $${paramIndex}`)
        values.push(carData.mileage)
        paramIndex++
      }
      if (carData.fuel !== undefined) {
        updates.push(`fuel = $${paramIndex}`)
        values.push(carData.fuel)
        paramIndex++
      }
      if (carData.power !== undefined) {
        updates.push(`power = $${paramIndex}`)
        values.push(carData.power)
        paramIndex++
      }
      if (carData.price !== undefined) {
        updates.push(`price = $${paramIndex}`)
        values.push(carData.price)
        paramIndex++
      }
      if (carData.type !== undefined) {
        updates.push(`type = $${paramIndex}`)
        values.push(carData.type)
        paramIndex++
      }
      if (carData.description !== undefined) {
        updates.push(`description = $${paramIndex}`)
        values.push(carData.description)
        paramIndex++
      }
      if (carData.imageUrl !== undefined) {
        updates.push(`image_url = $${paramIndex}`)
        values.push(carData.imageUrl)
        paramIndex++
      }
      if (carData.featured !== undefined) {
        updates.push(`featured = $${paramIndex}`)
        values.push(carData.featured)
        paramIndex++
      }
      if (carData.source !== undefined) {
        updates.push(`source = $${paramIndex}`)
        values.push(carData.source)
        paramIndex++
      }

      updates.push(`updated_at = CURRENT_TIMESTAMP`)

      // For now, use a simple approach - update each field individually
      if (carData.brand !== undefined) {
        await sql`UPDATE cars SET brand = ${carData.brand}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.model !== undefined) {
        await sql`UPDATE cars SET model = ${carData.model}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.year !== undefined) {
        await sql`UPDATE cars SET year = ${carData.year}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.mileage !== undefined) {
        await sql`UPDATE cars SET mileage = ${carData.mileage}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.fuel !== undefined) {
        await sql`UPDATE cars SET fuel = ${carData.fuel}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.power !== undefined) {
        await sql`UPDATE cars SET power = ${carData.power}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.price !== undefined) {
        await sql`UPDATE cars SET price = ${carData.price}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.type !== undefined) {
        await sql`UPDATE cars SET type = ${carData.type}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.description !== undefined) {
        await sql`UPDATE cars SET description = ${carData.description}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.imageUrl !== undefined) {
        await sql`UPDATE cars SET image_url = ${carData.imageUrl}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.featured !== undefined) {
        await sql`UPDATE cars SET featured = ${carData.featured}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }
      if (carData.source !== undefined) {
        await sql`UPDATE cars SET source = ${carData.source}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`
      }

      // Get updated car
      const { rows } = await sql`SELECT * FROM cars WHERE id = ${id}`
      
      if (rows.length === 0) return null
      
      const row = rows[0]
      return {
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }
    } catch (error) {
      console.error('Error updating car:', error)
      return null
    }
  }

  // Delete car
  async deleteCar(id: string): Promise<boolean> {
    try {
      const { rowCount } = await sql`
        DELETE FROM cars WHERE id = ${id}
      `
      return (rowCount || 0) > 0
    } catch (error) {
      console.error('Error deleting car:', error)
      return false
    }
  }

  // Toggle featured status
  async toggleFeatured(id: string): Promise<CarData | null> {
    try {
      // First, get current featured status
      const { rows } = await sql`
        SELECT featured FROM cars WHERE id = ${id}
      `
      if (rows.length === 0) return null

      const currentFeatured = rows[0].featured
      const newFeatured = !currentFeatured

      // Update the car's featured status
      const { rows: updatedRows } = await sql`
        UPDATE cars 
        SET featured = ${newFeatured}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `

      if (updatedRows.length === 0) return null

      // If we're setting this car as featured and we have more than 3 featured cars,
      // remove featured status from the oldest non-featured car
      if (newFeatured) {
        const { rows: featuredCount } = await sql`
          SELECT COUNT(*) as count FROM cars WHERE featured = true
        `
        if (parseInt(featuredCount[0].count) > 3) {
          await sql`
            UPDATE cars 
            SET featured = false, updated_at = CURRENT_TIMESTAMP
            WHERE id = (
              SELECT id FROM cars 
              WHERE featured = false 
              ORDER BY created_at ASC 
              LIMIT 1
            )
          `
        }
      }

      const row = updatedRows[0]
      return {
        id: row.id,
        brand: row.brand,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        description: row.description,
        imageUrl: row.image_url,
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
      return null
    }
  }
}

// Singleton instance
export const carDatabase = new CarDatabase()

// Initialize database on import
carDatabase.init() 