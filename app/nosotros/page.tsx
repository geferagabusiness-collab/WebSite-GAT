'use client'

import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/ui/TiltCard'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import { NOSOTROS_CONTENT } from '@/lib/page-content'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NosotrosPage() {
  return (
    <div className="relative overflow-hidden bg-axm-deep">
      <PageBackground variant="nosotros" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,117,240,0.18)_0%,transparent_65%)]" />

      <section className="relative z-10 section-padding">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            className="mb-16"
          >
            <SectionTitle
              title={NOSOTROS_CONTENT.title}
              subtitle={NOSOTROS_CONTENT.subtitle}
              align="center"
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-3"
          >
            {NOSOTROS_CONTENT.sections.map((section) => (
              <motion.div key={section.id} variants={fadeInUpVariants}>
                <TiltCard className="flex h-full flex-col">
                  <GradientText as="h3" className="font-display text-display-md font-semibold">
                    {section.title}
                  </GradientText>
                  <p className="mt-4 flex-1 text-body-md text-axm-gray">{section.body}</p>
                  <Link
                    href="/contacto"
                    className="mt-6 text-body-sm font-medium text-axm-cyan transition-colors hover:text-axm-electric"
                  >
                    {section.cta} →
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
