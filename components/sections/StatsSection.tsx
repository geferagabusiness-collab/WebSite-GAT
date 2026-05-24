'use client'

import { GradientText } from '@/components/ui/GradientText'
import { GlassCard } from '@/components/ui/GlassCard'
import { HOME_STATS } from '@/lib/constants'
import { animate, useInView } from 'framer-motion'
import { Building2, Clock, Layers, Star, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const STAT_ICONS: LucideIcon[] = [Building2, Star, Clock, Layers]

const STAT_TARGETS = [
  { value: 500, suffix: '+' },
  { value: 99, suffix: '%' },
  { value: 24, suffix: '/7' },
  { value: 6, suffix: '' },
] as const

function AnimatedStatValue({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, target])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative section-padding">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-axm-navy/60 via-axm-deep/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-container px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {HOME_STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index]
            const { value, suffix } = STAT_TARGETS[index]

            return (
              <GlassCard
                key={stat.label}
                className="holo-border text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-blue"
              >
                <Icon
                  size={20}
                  className="mx-auto mb-3 text-axm-cyan"
                  aria-hidden
                />
                <GradientText
                  as="p"
                  className="bg-gradient-to-br from-axm-blue to-axm-cyan font-display text-display-lg font-bold"
                >
                  <AnimatedStatValue target={value} suffix={suffix} />
                </GradientText>
                <p className="mt-2 text-body-md text-axm-gray">{stat.label}</p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
