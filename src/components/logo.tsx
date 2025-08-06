import { ReactNode } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`font-bold text-blue-900 ${sizeClasses[size]} ${className}`}>
      <div className="leading-tight">
        <div className="text-2xl font-extrabold tracking-wide">WĄTARSKI</div>
        <div className="h-0.5 bg-blue-900 my-1"></div>
        <div className="text-lg font-semibold tracking-wide">WŁOCŁAWEK</div>
      </div>
    </div>
  )
} 