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
      <section className="section-padding overflow-visible">
        <div className="mx-auto max-w-container overflow-visible px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-10 sm:mb-16">
            <SectionTitle
              title={ACADEMY_CONTENT.title}
              subtitle={ACADEMY_CONTENT.subtitle}
              align="center"
              className="mx-auto"
            />
          </motion.div>

          <style>{`
            @keyframes electric-title {
              0%   { color: #00ff88; }
              25%  { color: #00f0ff; }
              50%  { color: #39ff14; }
              75%  { color: #00ffc8; }
              100% { color: #00ff88; }
            }
            .electric-title {
              animation: electric-title 4s ease-in-out infinite;
            }
          `}</style>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="relative grid gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: '1400px' }}
          >
            {ACADEMY_CONTENT.courses.map((course, index) => (
              <motion.div
                key={course.title}
                variants={fadeInUpVariants}
                whileHover={{
                  scale: 1.5,
                  y: -24,
                  zIndex: 40,
                  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl cursor-pointer border border-white/15 bg-white/[0.07] p-8 shadow-lg transition-colors duration-300 hover:border-white/60 hover:bg-white hover:shadow-[0_48px_120px_rgba(0,0,0,0.55)]"
                style={{ transformOrigin: 'center center' }}
              >
                {/* Número */}
                <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 font-mono text-sm font-bold text-white/60 transition-colors duration-300 group-hover:border-axm-blue/20 group-hover:bg-axm-blue/5 group-hover:text-axm-gray">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Título animado — sin cambio de color al hover */}
                <h3
                  className="electric-title font-display text-xl font-bold sm:text-2xl"
                  style={{ animationDelay: `${index * 0.6}s` }}
                >
                  {course.title}
                </h3>

                {/* Descripción: blanco → azul al hover para contraste sobre fondo blanco */}
                <p className="mt-3 flex-1 text-body-md leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-axm-blue">
                  {course.description}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-fit border-axm-blue/50 text-axm-cyan group-hover:border-axm-blue group-hover:bg-axm-blue group-hover:text-white group-hover:shadow-[0_4px_20px_rgba(0,117,240,0.35)]"
                  >
                    {course.cta}
                  </Button>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent transition-colors duration-300 group-hover:from-axm-blue/25" />
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
