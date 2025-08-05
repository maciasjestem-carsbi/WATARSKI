export interface CarBrand {
  id: string
  name: string
  country: string
  category: 'luxury' | 'mainstream' | 'sports' | 'electric'
}

export const carBrands: CarBrand[] = [
  // German Brands
  { id: 'volkswagen', name: 'Volkswagen', country: 'Germany', category: 'mainstream' },
  { id: 'bmw', name: 'BMW', country: 'Germany', category: 'luxury' },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', country: 'Germany', category: 'luxury' },
  { id: 'audi', name: 'Audi', country: 'Germany', category: 'luxury' },
  { id: 'porsche', name: 'Porsche', country: 'Germany', category: 'luxury' },
  { id: 'skoda', name: 'Skoda', country: 'Czech Republic', category: 'mainstream' },
  { id: 'opel', name: 'Opel', country: 'Germany', category: 'mainstream' },

  // Japanese Brands
  { id: 'toyota', name: 'Toyota', country: 'Japan', category: 'mainstream' },
  { id: 'honda', name: 'Honda', country: 'Japan', category: 'mainstream' },
  { id: 'nissan', name: 'Nissan', country: 'Japan', category: 'mainstream' },
  { id: 'mazda', name: 'Mazda', country: 'Japan', category: 'mainstream' },
  { id: 'subaru', name: 'Subaru', country: 'Japan', category: 'mainstream' },
  { id: 'mitsubishi', name: 'Mitsubishi', country: 'Japan', category: 'mainstream' },
  { id: 'lexus', name: 'Lexus', country: 'Japan', category: 'luxury' },
  { id: 'infiniti', name: 'Infiniti', country: 'Japan', category: 'luxury' },
  { id: 'acura', name: 'Acura', country: 'Japan', category: 'luxury' },

  // American Brands
  { id: 'ford', name: 'Ford', country: 'USA', category: 'mainstream' },
  { id: 'chevrolet', name: 'Chevrolet', country: 'USA', category: 'mainstream' },
  { id: 'cadillac', name: 'Cadillac', country: 'USA', category: 'luxury' },
  { id: 'buick', name: 'Buick', country: 'USA', category: 'mainstream' },
  { id: 'chrysler', name: 'Chrysler', country: 'USA', category: 'mainstream' },
  { id: 'dodge', name: 'Dodge', country: 'USA', category: 'mainstream' },
  { id: 'jeep', name: 'Jeep', country: 'USA', category: 'mainstream' },
  { id: 'lincoln', name: 'Lincoln', country: 'USA', category: 'luxury' },
  { id: 'pontiac', name: 'Pontiac', country: 'USA', category: 'mainstream' },

  // Korean Brands
  { id: 'hyundai', name: 'Hyundai', country: 'South Korea', category: 'mainstream' },
  { id: 'kia', name: 'Kia', country: 'South Korea', category: 'mainstream' },
  { id: 'genesis', name: 'Genesis', country: 'South Korea', category: 'luxury' },

  // French Brands
  { id: 'renault', name: 'Renault', country: 'France', category: 'mainstream' },
  { id: 'peugeot', name: 'Peugeot', country: 'France', category: 'mainstream' },
  { id: 'citroen', name: 'Citroën', country: 'France', category: 'mainstream' },
  { id: 'ds', name: 'DS', country: 'France', category: 'luxury' },

  // Italian Brands
  { id: 'fiat', name: 'Fiat', country: 'Italy', category: 'mainstream' },
  { id: 'alfa-romeo', name: 'Alfa Romeo', country: 'Italy', category: 'luxury' },
  { id: 'lancia', name: 'Lancia', country: 'Italy', category: 'mainstream' },
  { id: 'ferrari', name: 'Ferrari', country: 'Italy', category: 'luxury' },
  { id: 'lamborghini', name: 'Lamborghini', country: 'Italy', category: 'luxury' },
  { id: 'maserati', name: 'Maserati', country: 'Italy', category: 'luxury' },

  // British Brands
  { id: 'land-rover', name: 'Land Rover', country: 'UK', category: 'luxury' },
  { id: 'jaguar', name: 'Jaguar', country: 'UK', category: 'luxury' },
  { id: 'mini', name: 'MINI', country: 'UK', category: 'mainstream' },
  { id: 'bentley', name: 'Bentley', country: 'UK', category: 'luxury' },
  { id: 'rolls-royce', name: 'Rolls-Royce', country: 'UK', category: 'luxury' },
  { id: 'aston-martin', name: 'Aston Martin', country: 'UK', category: 'luxury' },
  { id: 'mclaren', name: 'McLaren', country: 'UK', category: 'luxury' },

  // Swedish Brands
  { id: 'volvo', name: 'Volvo', country: 'Sweden', category: 'luxury' },
  { id: 'saab', name: 'Saab', country: 'Sweden', category: 'mainstream' },

  // Spanish Brands
  { id: 'seat', name: 'SEAT', country: 'Spain', category: 'mainstream' },

  // Chinese Brands
  { id: 'geely', name: 'Geely', country: 'China', category: 'mainstream' },
  { id: 'byd', name: 'BYD', country: 'China', category: 'mainstream' },
  { id: 'nio', name: 'NIO', country: 'China', category: 'electric' },
  { id: 'xpeng', name: 'XPeng', country: 'China', category: 'electric' },

  // Electric/New Brands
  { id: 'tesla', name: 'Tesla', country: 'USA', category: 'electric' },
  { id: 'rivian', name: 'Rivian', country: 'USA', category: 'electric' },
  { id: 'lucid', name: 'Lucid', country: 'USA', category: 'electric' },
  { id: 'polestar', name: 'Polestar', country: 'Sweden', category: 'electric' },

  // Other European Brands
  { id: 'dacia', name: 'Dacia', country: 'Romania', category: 'mainstream' },
  { id: 'skoda', name: 'Skoda', country: 'Czech Republic', category: 'mainstream' },
  { id: 'tata', name: 'Tata', country: 'India', category: 'mainstream' },
  { id: 'mahindra', name: 'Mahindra', country: 'India', category: 'mainstream' },
]

export const getBrandByName = (name: string): CarBrand | undefined => {
  return carBrands.find(brand => brand.name.toLowerCase() === name.toLowerCase())
}

export const getBrandsByCategory = (category: CarBrand['category']): CarBrand[] => {
  return carBrands.filter(brand => brand.category === category)
}

export const getNewCarBrands = (): CarBrand[] => {
  // For new cars, only show Skoda and Volkswagen
  return carBrands.filter(brand => ['skoda', 'volkswagen'].includes(brand.id))
}

export const getAllBrands = (): CarBrand[] => {
  // For used cars, show all brands
  return carBrands
} 