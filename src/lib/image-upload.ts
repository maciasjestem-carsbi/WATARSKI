// Image upload utility for WĄTARSKI website
// This handles image uploads and storage using Supabase Storage

export interface ImageUploadResult {
  url: string
  filename: string
  size: number
}

// Production implementation using Supabase Storage via API route
export async function uploadImage(file: File): Promise<ImageUploadResult> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

// Fallback for development (base64) - uncomment if needed
/*
export async function uploadImageBase64(file: File): Promise<ImageUploadResult> {
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
*/ 