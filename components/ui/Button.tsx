import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'cta'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-axm text-white font-semibold shadow-btn-primary hover:shadow-glow-blue hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'border border-axm-blue/40 text-axm-cyan bg-transparent hover:bg-axm-blue/10 hover:border-axm-blue',
  outline:
    'border border-white/15 text-white bg-transparent hover:bg-white/5 hover:border-white/30',
  cta: 'bg-gradient-axm text-white font-bold shadow-btn-primary hover:shadow-glow-blue hover:scale-[1.03]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-body-sm rounded-lg',
  md: 'px-6 py-3 text-body-md rounded-lg',
  lg: 'px-8 py-4 text-body-lg rounded-xl',
}

export function getButtonClassName(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={getButtonClassName(variant, size, className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
