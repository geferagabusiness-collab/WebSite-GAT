'use client'

import { fadeIn } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      className={cn('min-h-screen pt-16', className)}
    >
      {children}
    </motion.main>
  )
}
