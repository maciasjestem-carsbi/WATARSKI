'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'
import { uploadImage } from '@/lib/image-upload'

interface MultipleImageUploadProps {
  value?: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxImages?: number
}

export default function MultipleImageUpload({ 
  value = [], 
  onChange, 
  placeholder = "Upload car images",
  maxImages = 20 
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (value.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images. You currently have ${value.length} images.`)
      return
    }

    setIsUploading(true)
    
    try {
      const uploadPromises = files.map(file => uploadImage(file))
      const results = await Promise.all(uploadPromises)
      const newUrls = results.map(result => result.url)
      
      onChange([...value, ...newUrls])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload images. Please try again.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const handleRemoveAllImages = () => {
    onChange([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const canAddMore = value.length < maxImages

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || !canAddMore}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Images'}</span>
          </Button>
          
          {value.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveAllImages}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remove All</span>
            </Button>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {value.length} / {maxImages} images
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {value.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Car image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
          
          {canAddMore && (
            <div 
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Add more</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{placeholder}</p>
            <p className="text-sm text-gray-400">Click upload to add images (max {maxImages})</p>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Supported formats: JPG, PNG, WebP</p>
        <p>Maximum file size: 10MB per image</p>
        <p>Maximum images: {maxImages}</p>
        <p className="text-blue-600">Images are stored securely on Vercel Blob</p>
      </div>
    </div>
  )
}
