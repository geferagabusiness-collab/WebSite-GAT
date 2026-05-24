import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionTitle({
  title,
  subtitle,
  align = 'left',
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'max-w-content',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
      {...props}
    >
      <h2 className="font-display text-3xl font-bold text-axm-white sm:text-4xl md:text-display-lg">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-body-md text-axm-gray sm:mt-4 sm:text-body-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}
