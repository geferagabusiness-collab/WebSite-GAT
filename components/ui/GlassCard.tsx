import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function GlassCard({ className, hover = true, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn('glass-card p-4 sm:p-6', hover && 'glass-card-hover', className)}
      {...props}
    >
      {children}
    </div>
  )
}
