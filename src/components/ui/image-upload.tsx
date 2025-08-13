'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { uploadImage } from '@/lib/image-upload'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function ImageUpload({ value, onChange, placeholder = "Dodaj zdjęcie samochodu" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)
    
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Plik nie jest obrazem')
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Plik jest za duży (maksymalnie 10MB)')
      }

      // Upload to Vercel Blob
      const result = await uploadImage(file)
      onChange(result.url)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadError(error instanceof Error ? error.message : 'Błąd podczas przesyłania zdjęcia. Spróbuj ponownie.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>{isUploading ? 'Przesyłanie...' : 'Dodaj zdjęcie'}</span>
        </Button>
        
        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemoveImage}
            className="text-red-600 hover:text-red-800"
          >
            <X className="h-4 w-4" />
            <span>Usuń</span>
          </Button>
        )}
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
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative">
          <div className="w-full h-48 bg-gray-100 rounded-lg border overflow-hidden">
            <img
              src={value}
              alt="Podgląd samochodu"
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
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{placeholder}</p>
            <p className="text-sm text-gray-400">Kliknij aby dodać zdjęcie</p>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Obsługiwane formaty: JPG, PNG, WebP</p>
        <p>Maksymalny rozmiar pliku: 10MB</p>
        <p className="text-blue-600">Zdjęcia są bezpiecznie przechowywane na Supabase Storage</p>
      </div>
    </div>
  )
} 