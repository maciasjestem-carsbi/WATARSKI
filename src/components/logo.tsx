import { ReactNode } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'default' | 'white'
}

export default function Logo({ size = 'md', className = '', color = 'default' }: LogoProps) {
  console.log('Logo component rendered with color:', color)
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const colorClasses = {
    default: 'text-blue-900',
    white: 'text-white'
  }

  const lineColorClasses = {
    default: 'bg-blue-900',
    white: 'bg-white'
  }

  // Use inline styles for white color to ensure it works
  const textStyle = color === 'white' ? { color: 'white' } : {}
  const lineStyle = color === 'white' ? { backgroundColor: 'white' } : {}

  return (
    <div className={`font-bold ${colorClasses[color]} ${sizeClasses[size]} ${className}`} style={textStyle}>
      <div className="flex flex-col items-center leading-tight">
        <div className="text-2xl font-extrabold tracking-wide">WĄTARSKI</div>
        <div className={`h-0.5 ${lineColorClasses[color]} my-0.5 w-full max-w-[120px]`} style={lineStyle}></div>
        <div className="text-sm font-semibold tracking-wide">WŁOCŁAWEK</div>
      </div>
    </div>
  )
} 