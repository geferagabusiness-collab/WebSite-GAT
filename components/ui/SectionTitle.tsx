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
      <h2 className="font-display text-display-lg font-bold text-axm-white">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-body-lg text-axm-gray">{subtitle}</p>
      ) : null}
    </div>
  )
}
