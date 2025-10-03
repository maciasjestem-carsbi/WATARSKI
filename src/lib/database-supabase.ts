import { supabase } from './supabase'

// Supabase-based database types
export interface CarData {
  id: string
  brand: string
  model: string
  version: string
  year: number | null
  mileage: number | null
  fuel: string
  power: number | null
  engineCapacity: number | null // pojemność silnika w cm³
  transmission: string // automatyczna/manualna
  price: number
  type: 'new' | 'used' | 'delivery'
  vehicleType: 'osobowy' | 'dostawczy' | 'certyfikowany' // nowe pole dla filtrowania
  description: string
  imageUrl?: string
  images?: string[]
  featured: boolean
  featuredOrder?: number
  source?: 'manual' | 'otomoto'
  createdAt: Date
  updatedAt: Date
}

// Supabase-based database implementation
class SupabaseCarDatabase {
  // Initialize database table
  async init() {
    try {
      // Create table if it doesn't exist
      const { error } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS cars (
            id VARCHAR(255) PRIMARY KEY,
            brand VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            version VARCHAR(255) DEFAULT '',
            year INTEGER,
            mileage INTEGER,
            fuel VARCHAR(255) NOT NULL,
            power INTEGER,
            engine_capacity INTEGER,
            transmission VARCHAR(50) DEFAULT 'manualna',
            price INTEGER NOT NULL,
            type VARCHAR(50) NOT NULL,
            vehicle_type VARCHAR(50) DEFAULT 'osobowy',
            description TEXT NOT NULL,
            image_url TEXT,
            images JSONB DEFAULT '[]',
            featured BOOLEAN DEFAULT FALSE,
            featured_order INTEGER,
            source VARCHAR(50) DEFAULT 'manual',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `
      })

      if (error) {
        console.error('Error creating table:', error)
        // Try alternative approach - insert sample data directly
        await this.insertSampleData()
      } else {
        // Check if table is empty and insert sample data
        const { count } = await supabase
          .from('cars')
          .select('*', { count: 'exact', head: true })

        if (count === 0) {
          await this.insertSampleData()
        }
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
        version: 'R-Line',
        year: 2024,
        mileage: 10,
        fuel: 'hybryda',
        power: 150,
        engine_capacity: 1500,
        transmission: 'automatyczna',
        price: 129900,
        type: 'new',
        vehicle_type: 'osobowy',
        description: 'Nowy Volkswagen T-Roc w doskonałym stanie. Samochód wyposażony w najnowsze technologie bezpieczeństwa i komfortu. Idealny do jazdy miejskiej i dalekich podróży.',
        image_url: '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
        images: [
          '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
          '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp',
          '/images/TC0861-t-roc-r-line-white-exterior-driving_crop-1.webp'
        ],
        featured: true,
        featured_order: 1,
        source: 'manual'
      },
      {
        id: '2',
        brand: 'Volkswagen',
        model: 'Passat',
        version: 'SE',
        year: 2024,
        mileage: 5,
        fuel: 'diesel',
        power: 150,
        engine_capacity: 2000,
        transmission: 'automatyczna',
        price: 189900,
        type: 'new',
        vehicle_type: 'osobowy',
        description: 'Elegancki Volkswagen Passat - flagowy sedan marki. Luksusowe wnętrze, zaawansowane systemy bezpieczeństwa i doskonałe osiągi.',
        image_url: '/images/Passat_SE.webp',
        images: [
          '/images/Passat_SE.webp',
          '/images/Passat_SE.webp'
        ],
        featured: true,
        featured_order: 2,
        source: 'manual'
      },
      {
        id: '3',
        brand: 'Volkswagen',
        model: 'Tiguan',
        version: '2023',
        year: 2023,
        mileage: 45000,
        fuel: 'benzyna',
        power: 184,
        engine_capacity: 2000,
        transmission: 'manualna',
        price: 89900,
        type: 'used',
        vehicle_type: 'certyfikowany',
        description: 'Używany Volkswagen Tiguan w świetnym stanie. Samochód z pełną historią serwisową, idealny dla rodzin.',
        image_url: '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
        images: [
          '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
          '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
          '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp',
          '/images/TN2395_Tiguan-in-front-of-house-beauty_16-9-2.webp'
        ],
        featured: true,
        featured_order: 3,
        source: 'manual'
      },
      {
        id: '4',
        brand: 'Volkswagen Dostawcze',
        model: 'Caddy',
        version: 'Maxi',
        year: 2024,
        mileage: 0,
        fuel: 'diesel',
        power: 115,
        engine_capacity: 2000,
        transmission: 'manualna',
        price: 89000,
        type: 'delivery',
        vehicle_type: 'dostawczy',
        description: 'Nowy Volkswagen Caddy Maxi - idealny do transportu towarów. Przestronna kabina i duża powierzchnia ładunkowa.',
        image_url: '/images/Tayron_exterior_parking_in_front_of_ocean-1.webp',
        images: [
          '/images/Tayron_exterior_parking_in_front_of_ocean-1.webp'
        ],
        featured: false,
        source: 'manual'
      }
    ]

    const { error } = await supabase
      .from('cars')
      .insert(sampleCars)

    if (error) {
      console.error('Error inserting sample data:', error)
    }
  }

  // Get all cars
  async getAllCars(): Promise<CarData[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching cars:', error)
        return []
      }

      return data?.map(row => ({
        id: row.id,
        brand: row.brand,
        model: row.model,
        version: row.version || '',
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        engineCapacity: row.engine_capacity,
        transmission: row.transmission,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        vehicleType: row.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: row.description,
        imageUrl: row.image_url || (row.images && row.images.length > 0 ? row.images[0] : null),
        images: row.images || [],
        featured: row.featured,
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      })) || []
    } catch (error) {
      console.error('Error fetching cars:', error)
      return []
    }
  }

  // Get featured cars
  async getFeaturedCars(): Promise<CarData[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching featured cars:', error)
        return []
      }

      // Add visual order numbers based on array position
      return data?.map((row, index) => ({
        id: row.id,
        brand: row.brand,
        model: row.model,
        version: row.version || '',
        year: row.year,
        mileage: row.mileage,
        fuel: row.fuel,
        power: row.power,
        engineCapacity: row.engine_capacity,
        transmission: row.transmission,
        price: row.price,
        type: row.type as 'new' | 'used' | 'delivery',
        vehicleType: row.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: row.description,
        imageUrl: row.image_url || (row.images && row.images.length > 0 ? row.images[0] : null),
        images: row.images || [],
        featured: row.featured,
        featuredOrder: index + 1, // Visual order based on array position
        source: row.source as 'manual' | 'otomoto',
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      })) || []
    } catch (error) {
      console.error('Error fetching featured cars:', error)
      return []
    }
  }

  // Get car by ID
  async getCarById(id: string): Promise<CarData | null> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        brand: data.brand,
        model: data.model,
        version: data.version || '',
        year: data.year,
        mileage: data.mileage,
        fuel: data.fuel,
        power: data.power,
        engineCapacity: data.engine_capacity,
        transmission: data.transmission,
        price: data.price,
        type: data.type as 'new' | 'used' | 'delivery',
        vehicleType: data.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: data.description,
        imageUrl: data.image_url || (data.images && data.images.length > 0 ? data.images[0] : null),
        images: data.images || [],
        featured: data.featured,
        source: data.source as 'manual' | 'otomoto',
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error fetching car:', error)
      return null
    }
  }

  // Add new car
  async addCar(carData: Omit<CarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarData> {
    try {
      const newCar = {
        ...carData,
        id: Date.now().toString(),
        image_url: carData.imageUrl || (carData.images && carData.images.length > 0 ? carData.images[0] : null),
        images: carData.images || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('cars')
        .insert(newCar)
        .select()
        .single()

      if (error) {
        throw new Error('Failed to add car')
      }

      return {
        id: data.id,
        brand: data.brand,
        model: data.model,
        version: data.version || '',
        year: data.year,
        mileage: data.mileage,
        fuel: data.fuel,
        power: data.power,
        engineCapacity: data.engine_capacity,
        transmission: data.transmission,
        price: data.price,
        type: data.type as 'new' | 'used' | 'delivery',
        vehicleType: data.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: data.description,
        imageUrl: data.image_url || (data.images && data.images.length > 0 ? data.images[0] : null),
        images: data.images || [],
        featured: data.featured,
        source: data.source as 'manual' | 'otomoto',
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error adding car:', error)
      throw new Error('Failed to add car')
    }
  }

  // Update car
  async updateCar(id: string, carData: Partial<CarData>): Promise<CarData | null> {
    try {
      const updateData: any = {
        ...carData,
        updated_at: new Date().toISOString()
      }

      if (carData.imageUrl !== undefined) {
        updateData.image_url = carData.imageUrl
        delete updateData.imageUrl
      }

      if (carData.images !== undefined) {
        updateData.images = carData.images
      }

      const { data, error } = await supabase
        .from('cars')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        brand: data.brand,
        model: data.model,
        version: data.version || '',
        year: data.year,
        mileage: data.mileage,
        fuel: data.fuel,
        power: data.power,
        engineCapacity: data.engine_capacity,
        transmission: data.transmission,
        price: data.price,
        type: data.type as 'new' | 'used' | 'delivery',
        vehicleType: data.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: data.description,
        imageUrl: data.image_url || (data.images && data.images.length > 0 ? data.images[0] : null),
        images: data.images || [],
        featured: data.featured,
        source: data.source as 'manual' | 'otomoto',
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error updating car:', error)
      return null
    }
  }

  // Delete car
  async deleteCar(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id)

      return !error
    } catch (error) {
      console.error('Error deleting car:', error)
      return false
    }
  }

  // Toggle featured status
  async toggleFeatured(id: string): Promise<CarData | null> {
    try {
      // Get current car
      const car = await this.getCarById(id)
      if (!car) return null

      const newFeatured = !car.featured

      if (newFeatured) {
        // Check how many featured cars we have
        const { data: featuredCars } = await supabase
          .from('cars')
          .select('id')
          .eq('featured', true)

        if (featuredCars && featuredCars.length >= 3) {
          // Cannot add more featured cars
          return null
        }
      }

      // Update featured status
      const { data, error } = await supabase
        .from('cars')
        .update({ 
          featured: newFeatured,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        brand: data.brand,
        model: data.model,
        version: data.version || '',
        year: data.year,
        mileage: data.mileage,
        fuel: data.fuel,
        power: data.power,
        engineCapacity: data.engine_capacity,
        transmission: data.transmission,
        price: data.price,
        type: data.type as 'new' | 'used' | 'delivery',
        vehicleType: data.vehicle_type as 'osobowy' | 'dostawczy' | 'certyfikowany',
        description: data.description,
        imageUrl: data.image_url,
        images: data.images || [],
        featured: data.featured,
        featuredOrder: newFeatured ? 1 : undefined, // Will be calculated in getFeaturedCars
        source: data.source as 'manual' | 'otomoto',
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
      return null
    }
  }
}

// Export singleton instance
export const supabaseCarDatabase = new SupabaseCarDatabase()

// Note: To use this database:
// 1. Create a Supabase project at https://supabase.com
// 2. Get your project URL and anon key
// 3. Add environment variables:
//    WATARSKI_VERCEL_URL=your_project_url
//    WATARSKI_VERCEL_ANON_KEY=your_anon_key
// 4. Replace carDatabase with supabaseCarDatabase in your API routes 