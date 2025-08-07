import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spwyjrykkqoezyzigxdg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwd3lqcnlra3FvZXp5emlneGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzExMjEsImV4cCI6MjA3MDAwNzEyMX0.SEPwNyLe8_ID-ZYFxMq0Nyds64L0yZzLoPvc5YS194I'

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
  version VARCHAR(255) DEFAULT '',
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel VARCHAR(255) NOT NULL,
  power INTEGER NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER DEFAULT NULL,
  source VARCHAR(50) DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
` 