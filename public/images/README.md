# Image Upload System

## Folder Structure

```
public/images/
├── cars/          # Car images for inventory
├── hero/          # Hero section background images
├── logo/          # Company logos and branding
└── README.md      # This file
```

## How to Upload Images

### 1. **Hero Section Images** (`/public/images/hero/`)
- **dealership-bg.jpg** - Main hero background (1920x1080px recommended)
- **showroom.jpg** - Showroom interior
- **service-bg.jpg** - Service area background

### 2. **Car Images** (`/public/images/cars/`)
- Upload car photos here for the inventory
- Use descriptive names: `volkswagen-golf-2024-white.jpg`
- Recommended size: 800x600px or 1200x800px
- Supported formats: JPG, PNG, WebP

### 3. **Logo Images** (`/public/images/logo/`)
- **volkswagen-logo.png** - Volkswagen brand logo
- **watarski-logo.png** - Company logo
- **favicon.ico** - Website favicon

## Usage in Code

### In React Components:
```jsx
import Image from 'next/image'

// Hero background
<div className="bg-[url('/images/hero/dealership-bg.jpg')] bg-cover bg-center">

// Car image
<Image 
  src="/images/cars/volkswagen-golf-2024-white.jpg"
  alt="Volkswagen Golf 2024"
  width={400}
  height={300}
  className="rounded-lg"
/>

// Logo
<Image 
  src="/images/logo/volkswagen-logo.png"
  alt="Volkswagen"
  width={200}
  height={80}
/>
```

### In CSS:
```css
.hero-section {
  background-image: url('/images/hero/dealership-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

## Image Optimization

- Next.js automatically optimizes images in the `/public` folder
- Use `.webp` format for better compression
- Keep file sizes under 500KB for web performance
- Use descriptive alt text for accessibility

## Recommended Image Sizes

| Use Case | Width | Height | Format |
|----------|-------|--------|--------|
| Hero Background | 1920px | 1080px | JPG |
| Car Thumbnail | 400px | 300px | JPG/WebP |
| Car Detail | 800px | 600px | JPG/WebP |
| Logo | 200px | 80px | PNG |
| Service Image | 600px | 400px | JPG |

## File Naming Convention

- Use lowercase letters
- Separate words with hyphens
- Include year and color for car images
- Example: `volkswagen-golf-2024-white-front.jpg`

## Upload Process

1. Save your images to the appropriate folder
2. Use descriptive filenames
3. Optimize images for web (compress if needed)
4. Update the code to reference the new images
5. Test the website to ensure images load correctly

## Current Placeholder Images

The website currently uses placeholder images from `/api/placeholder/[width]/[height]`. Replace these with real images for a professional look. 