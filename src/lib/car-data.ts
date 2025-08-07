import { CarData } from './database'

// Shared car data - this would come from an API in a real app
export const sharedCars: CarData[] = [
  {
    id: '1',
    brand: 'Volkswagen',
    model: 'T-Roc',
    version: 'R-Line',
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
    version: 'SE',
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
    version: '2023',
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
  },
  {
    id: '4',
    brand: 'Skoda',
    model: 'Octavia',
    version: '2.0 TSI',
    year: 2024,
    mileage: 15,
    fuel: 'Benzyna',
    power: 150,
    price: 145000,
    type: 'new',
    description: 'Nowa Skoda Octavia - praktyczny i elegancki sedan. Doskonałe połączenie komfortu i funkcjonalności.',
    imageUrl: '/api/placeholder/400/300',
    featured: false,
    source: 'manual',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    brand: 'BMW',
    model: '3 Series',
    version: '320d',
    year: 2022,
    mileage: 35000,
    fuel: 'Diesel',
    power: 190,
    price: 165000,
    type: 'used',
    description: 'Używany BMW 3 Series w doskonałym stanie. Sportowe prowadzenie i luksusowe wyposażenie.',
    imageUrl: '/api/placeholder/400/300',
    featured: false,
    source: 'manual',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'A4',
    version: '2.0 TDI',
    year: 2021,
    mileage: 42000,
    fuel: 'Benzyna',
    power: 150,
    price: 125000,
    type: 'used',
    description: 'Używany Audi A4 - elegancki sedan premium. Zaawansowane technologie i komfort jazdy.',
    imageUrl: '/api/placeholder/400/300',
    featured: false,
    source: 'manual',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const getFeaturedCars = () => sharedCars.filter(car => car.featured)

export const getAllCars = () => sharedCars

export const getCarById = (id: string) => sharedCars.find(car => car.id === id) 