'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, Plus, Trash2, AlertCircle } from 'lucide-react'
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
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (value.length + files.length > maxImages) {
      setUploadError(`Możesz dodać maksymalnie ${maxImages} zdjęć. Obecnie masz ${value.length} zdjęć.`)
      return
    }

    setIsUploading(true)
    setUploadError(null)
    
    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`Plik ${file.name} nie jest obrazem`)
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Plik ${file.name} jest za duży (maksymalnie 10MB)`)
        }

        return await uploadImage(file)
      })

      const results = await Promise.all(uploadPromises)
      const newUrls = results.map(result => result.url)
      
      onChange([...value, ...newUrls])
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadError(error instanceof Error ? error.message : 'Błąd podczas przesyłania zdjęć. Spróbuj ponownie.')
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
            <span>{isUploading ? 'Przesyłanie...' : 'Dodaj zdjęcia'}</span>
          </Button>
          
          {value.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveAllImages}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
              <span>Usuń wszystkie</span>
            </Button>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {value.length} / {maxImages} zdjęć
        </div>
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
          <span className="text-sm text-red-700">{uploadError}</span>
        </div>
      )}

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
              <div className="w-full h-32 bg-gray-100 rounded-lg border overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Zdjęcie samochodu ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gray-200">
                        <div class="text-center">
                          <ImageIcon class="h-8 w-8 text-gray-400 mx-auto mb-1" />
                          <p class="text-xs text-gray-500">Błąd ładowania</p>
                        </div>
                      </div>
                    `
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-sm"
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
                <p className="text-gray-500 text-sm">Dodaj więcej</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{placeholder}</p>
            <p className="text-sm text-gray-400">Kliknij aby dodać zdjęcia (maksymalnie {maxImages})</p>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Obsługiwane formaty: JPG, PNG, WebP</p>
        <p>Maksymalny rozmiar pliku: 10MB na zdjęcie</p>
        <p>Maksymalna liczba zdjęć: {maxImages}</p>
        <p className="text-blue-600">Zdjęcia są bezpiecznie przechowywane na Vercel Blob</p>
      </div>
    </div>
  )
}

