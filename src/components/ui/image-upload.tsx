'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function ImageUpload({ value, onChange, placeholder = "Upload car image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    // Simulate file upload - in a real app, you'd upload to your server or cloud storage
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result)
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
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
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
        </Button>
        
        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemoveImage}
            className="text-red-600 hover:text-red-800"
          >
            <X className="h-4 w-4" />
            <span>Remove</span>
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Car preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{placeholder}</p>
            <p className="text-sm text-gray-400">Click upload to add an image</p>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Supported formats: JPG, PNG, WebP</p>
        <p>Maximum file size: 5MB</p>
      </div>
    </div>
  )
} 