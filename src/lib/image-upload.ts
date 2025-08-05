// Image upload utility for WĄTARSKI website
// This handles image uploads and storage

export interface ImageUploadResult {
  url: string
  filename: string
  size: number
}

// Current implementation uses base64 for demo
// In production, you would use:
// 1. Vercel Blob: npm install @vercel/blob
// 2. Cloudinary: npm install cloudinary
// 3. AWS S3: npm install @aws-sdk/client-s3
// 4. Local storage: public/images/ folder

export async function uploadImage(file: File): Promise<ImageUploadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      const result = reader.result as string
      resolve({
        url: result,
        filename: file.name,
        size: file.size
      })
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(file)
  })
}

// Production-ready upload functions (uncomment when ready)

/*
// Vercel Blob implementation
import { put } from '@vercel/blob'

export async function uploadImageVercel(file: File): Promise<ImageUploadResult> {
  const { url } = await put(file.name, file, {
    access: 'public',
  })
  
  return {
    url,
    filename: file.name,
    size: file.size
  }
}

// Cloudinary implementation
import { v2 as cloudinary } from 'cloudinary'

export async function uploadImageCloudinary(file: File): Promise<ImageUploadResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'your_preset')
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
  
  const data = await response.json()
  
  return {
    url: data.secure_url,
    filename: file.name,
    size: file.size
  }
}
*/ 