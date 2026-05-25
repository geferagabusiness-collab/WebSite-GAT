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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {ACADEMY_CONTENT.courses.map((course, index) => (
              <motion.div key={course.title} variants={fadeInUpVariants}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/5 to-transparent p-8 transition-all duration-500 hover:border-axm-blue/30 hover:shadow-[0_0_40px_rgba(0,117,240,0.08)]">
                  {/* Número de curso */}
                  <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-axm-blue/20 bg-axm-blue/10 font-mono text-sm font-bold text-axm-blue">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Línea decorativa superior */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-axm-blue/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <h3 className="font-display text-xl font-semibold text-axm-white sm:text-2xl">
                    {course.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-md leading-relaxed text-axm-gray">
                    {course.description}
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <Button variant="secondary" size="sm" className="w-fit">
                      {course.cta}
                    </Button>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                </div>
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
