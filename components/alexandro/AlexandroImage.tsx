'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export const ALEXANDRO_IMAGES = {
  icon: '/alexandro/alexandro-icon.png',
  fullbody: '/alexandro/alexandro-fullbody.png',
} as const

interface AlexandroImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export function AlexandroImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority = false,
  sizes,
}: AlexandroImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        aria-label={`${alt} (placeholder)`}
        className={cn(
          'bg-gradient-axm',
          fill ? 'absolute inset-0' : '',
          className,
        )}
        role="img"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

export function AlexandroPlaceholder({
  className,
  label = 'Alexandro',
}: {
  className?: string
  label?: string
}) {
  return (
    <div
      aria-label={`${label} (placeholder)`}
      className={cn('bg-gradient-axm', className)}
      role="img"
    />
  )
}
