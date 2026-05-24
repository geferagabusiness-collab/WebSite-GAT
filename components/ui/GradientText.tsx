import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
}

export function GradientText({
  as: Component = 'span',
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-gradient-axm bg-clip-text text-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
