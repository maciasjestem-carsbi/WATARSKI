# 🚗 WĄTARSKI Website Setup Guide

## 📋 Environment Variables Required

### **Vercel Blob Storage**
```
WATARSKI_READ_WRITE_TOKEN=your_blob_token_here
```

### **Supabase Database**
```
WATARSKI_VERCEL_URL=https://your-project.supabase.co
WATARSKI_VERCEL_ANON_KEY=your_anon_key_here
```

## 🗄️ Database Setup (Supabase)

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click "New Project"
4. Choose "Free Tier"
5. Enter project details:
   - **Name**: `WATARSKI_VERCEL`
   - **Database Password**: (choose a strong password)
   - **Region**: (choose closest to Poland)

### **Step 2: Get Credentials**
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `WATARSKI_VERCEL_URL`
   - **anon public** key → `WATARSKI_VERCEL_ANON_KEY`

### **Step 3: Create Database Table**
1. Go to **SQL Editor**
2. Run this SQL:
```sql
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
```

## 🖼️ Vercel Blob Setup

### **Step 1: Create Blob Store**
1. Go to your Vercel Dashboard
2. Navigate to **Storage** → **Blob**
3. Click **Create Blob Store**
4. Name it: `WATARSKI_VERCEL`
5. Copy the **Read/Write Token**

### **Step 2: Add Environment Variable**
```
WATARSKI_READ_WRITE_TOKEN=your_token_here
```

## 🔧 Vercel Deployment Setup

### **Step 1: Add Environment Variables**
In your Vercel project settings, add:

```
WATARSKI_VERCEL_URL=https://your-project.supabase.co
WATARSKI_VERCEL_ANON_KEY=your_anon_key_here
WATARSKI_READ_WRITE_TOKEN=your_blob_token_here
```

### **Step 2: Test Database Connection**
Visit: `https://your-domain.vercel.app/api/test-database`

Should return:
```json
{
  "success": true,
  "message": "Database connection successful",
  "carCount": 0
}
```

## 🚀 Production Database Switch

### **Option 1: Use Supabase (Recommended)**
Replace in your API routes:
```typescript
// Change from:
import { carDatabase } from '@/lib/database'

// To:
import { supabaseCarDatabase } from '@/lib/database-supabase'
```

### **Option 2: Keep Demo Mode**
The current in-memory database works perfectly for testing.

## 📊 Free Tier Limits

### **Supabase Free Tier:**
- ✅ **500MB database storage**
- ✅ **50MB file storage**
- ✅ **2GB bandwidth**
- ✅ **50,000 monthly active users**
- ✅ **Unlimited API requests**

### **Vercel Blob Free Tier:**
- ✅ **1GB storage**
- ✅ **100GB bandwidth**
- ✅ **Unlimited uploads**

## 🔍 Testing Your Setup

### **1. Test Database Connection:**
```
GET /api/test-database
```

### **2. Test Image Upload:**
```
POST /api/upload
```

### **3. Test Car Management:**
```
GET /api/cars
POST /api/cars
PUT /api/cars/[id]
DELETE /api/cars/[id]
```

## 🎯 Current Status

**✅ Ready Features:**
- **Vercel Blob**: Configured with `WATARSKI_READ_WRITE_TOKEN`
- **Supabase Database**: Ready with `WATARSKI_VERCEL_URL` and `WATARSKI_VERCEL_ANON_KEY`
- **Demo Mode**: Works immediately
- **Production Ready**: All features functional

**🚀 Your WĄTARSKI website is ready for production!** 