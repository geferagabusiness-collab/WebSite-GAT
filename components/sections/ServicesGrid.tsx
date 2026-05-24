'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { HOME_SERVICES_SECTION, SERVICES, type ServiceIconName } from '@/lib/constants'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import {
  ArrowRight,
  Brain,
  Code,
  Headphones,
  Network,
  Shield,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  Headphones,
  Network,
  Brain,
  Code,
  Shield,
  TrendingUp,
}

export function ServicesGrid() {
  return (
    <section className="section-padding bg-axm-deep">
      <motion.div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={HOME_SERVICES_SECTION.title}
          subtitle={HOME_SERVICES_SECTION.subtitle}
          align="center"
          className="mx-auto mb-10 sm:mb-16"
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.icon]

            return (
              <motion.div key={service.id} variants={fadeInUpVariants}>
                <GlassCard className="flex h-full flex-col">
                  <Icon size={32} style={{ color: service.color }} />
                  <h3 className="mt-5 font-display text-xl font-semibold text-axm-white sm:text-2xl md:text-display-md">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-md text-axm-gray">{service.description}</p>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-axm-cyan transition-colors hover:text-axm-electric"
                  >
                    Conocer más
                    <ArrowRight size={16} />
                  </Link>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
