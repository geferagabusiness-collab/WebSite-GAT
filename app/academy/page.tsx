'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WarpBackground } from '@/components/ui/WarpBackground'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import { ACADEMY_CONTENT } from '@/lib/page-content'
import { motion } from 'framer-motion'
import { useState } from 'react'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-axm-surface/50 px-4 py-3 text-body-md text-axm-white placeholder:text-axm-muted outline-none transition-colors focus:border-axm-blue/50 focus:ring-1 focus:ring-axm-blue/30'

export default function AcademyPage() {
  const [certCode, setCertCode] = useState('')
  const [certResult, setCertResult] = useState<string | null>(null)

  function handleConsult() {
    if (!certCode.trim()) {
      setCertResult('Ingrese un código de certificado válido.')
      return
    }
    setCertResult(ACADEMY_CONTENT.certificates.placeholderResult)
  }

  return (
    <div className="relative bg-axm-deep">
      <WarpBackground />
      <PageBackground variant="academy" />
      <div className="relative z-10">
      <section className="section-padding">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-10 sm:mb-16">
            <SectionTitle
              title={ACADEMY_CONTENT.title}
              subtitle={ACADEMY_CONTENT.subtitle}
              align="center"
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {ACADEMY_CONTENT.courses.map((course) => (
              <motion.div key={course.title} variants={fadeInUpVariants}>
                <GlassCard className="flex h-full flex-col">
                  <h3 className="font-display text-xl font-semibold text-axm-white sm:text-2xl md:text-display-md">
                    {course.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-md text-axm-gray">{course.description}</p>
                  <Button variant="secondary" size="sm" className="mt-6 w-fit">
                    {course.cta}
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-white/6">
        <div className="mx-auto max-w-narrow px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariants}
          >
            <GlassCard>
              <GradientText as="h2" className="font-display text-xl font-bold sm:text-2xl md:text-display-md">
                {ACADEMY_CONTENT.certificates.title}
              </GradientText>
              <p className="mt-3 text-body-md text-axm-gray">
                {ACADEMY_CONTENT.certificates.description}
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  value={certCode}
                  onChange={(e) => setCertCode(e.target.value)}
                  placeholder="Código de certificado"
                  className={inputClass}
                  aria-label="Código de certificado"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="w-full shrink-0 sm:w-auto"
                  onClick={handleConsult}
                >
                  {ACADEMY_CONTENT.certificates.cta}
                </Button>
              </div>
              {certResult ? (
                <p className="mt-4 rounded-lg border border-axm-blue/20 bg-axm-blue/5 p-4 text-body-sm text-axm-gray">
                  {certResult}
                </p>
              ) : null}
            </GlassCard>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}
