'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className }: TiltCardProps) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 })

  const shadowX = useTransform(springRotateY, [-12, 12], [12, -12])
  const shadowY = useTransform(springRotateX, [-12, 12], [-12, 12])
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(0, 117, 240, 0.25), 0 0 60px rgba(0, 240, 252, 0.08)`

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 24)
    rotateX.set(y * -24)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        boxShadow,
      }}
      className="h-full rounded-2xl"
    >
      <GlassCard className={className}>{children}</GlassCard>
    </motion.div>
  )
}
