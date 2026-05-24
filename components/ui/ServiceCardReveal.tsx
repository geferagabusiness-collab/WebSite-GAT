'use client'

import { GlassCard, GlassCardProps } from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ServiceCardRevealProps extends GlassCardProps {
  index: number
  children: ReactNode
}

export function ServiceCardReveal({ index, children, ...glassCardProps }: ServiceCardRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)', z: -40 }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', z: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      viewport={{ once: true, margin: '-60px' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <GlassCard {...glassCardProps}>{children}</GlassCard>
    </motion.div>
  )
}
