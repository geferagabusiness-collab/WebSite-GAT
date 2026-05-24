'use client'

import { getButtonClassName } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import { PRODUCTOS_CONTENT } from '@/lib/page-content'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductosPage() {
  return (
    <div className="relative overflow-hidden bg-axm-deep">
      <PageBackground variant="productos" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,166,35,0.12)_0%,transparent_65%)]"
        aria-hidden
      />

      <section className="relative z-10 section-padding">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-10 sm:mb-16">
            <SectionTitle
              title={PRODUCTOS_CONTENT.title}
              subtitle={PRODUCTOS_CONTENT.subtitle}
              align="center"
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          >
            <GradientText as="h2" className="font-display text-2xl font-bold sm:text-3xl md:text-display-lg">
              {PRODUCTOS_CONTENT.product.title}
            </GradientText>
            <p className="mt-4 text-body-md text-axm-gray sm:mt-6 sm:text-body-lg">
              {PRODUCTOS_CONTENT.product.description}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {PRODUCTOS_CONTENT.features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUpVariants}>
                <GlassCard className="flex h-full flex-col">
                  <GradientText as="h3" className="font-display text-xl font-semibold sm:text-2xl md:text-display-md">
                    {feature.title}
                  </GradientText>
                  <p className="mt-3 flex-1 text-body-md text-axm-gray">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/6 section-padding">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUpVariants}
          className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="font-display text-2xl font-bold text-axm-white sm:text-3xl md:text-display-lg">
            ¿Listo para proteger su empresa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body-md text-axm-gray sm:mt-6 sm:text-body-lg">
            {PRODUCTOS_CONTENT.product.description}
          </p>
          <Link
            href="/contacto"
            className={getButtonClassName('cta', 'lg', 'mt-8 w-full sm:mt-10 sm:w-auto')}
          >
            {PRODUCTOS_CONTENT.product.cta}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
