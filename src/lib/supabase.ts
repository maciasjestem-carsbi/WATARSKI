import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.WATARSKI_VERCEL_URL
const supabaseAnonKey = process.env.WATARSKI_VERCEL_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client for server-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database schema for cars table
export const createCarsTable = `
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
);
` 