'use client'

import { ALEXANDRO_IMAGES, AlexandroImage } from '@/components/alexandro/AlexandroImage'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { fadeInUp, fadeInUpVariants } from '@/lib/motion'
import { ALEXANDRO_PAGE_CONTENT } from '@/lib/page-content'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function AlexandroPage() {
  const [active, setActive] = useState(0)
  const pillar = ALEXANDRO_PAGE_CONTENT.pillars[active]

  return (
    <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-axm-deep section-padding sm:min-h-[calc(100dvh-5rem)] md:min-h-[calc(100dvh-6rem)]">
      <PageBackground variant="alexandro" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_40%,rgba(92,196,255,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow-b opacity-60" />

      <div className="relative z-10 mx-auto grid max-w-container items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Columna izquierda — texto */}
        <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} className="order-2 lg:order-1 flex flex-col">
          <span className="inline-block rounded-full border border-axm-blue/30 bg-axm-blue/10 px-4 py-1.5 font-mono text-mono-sm text-axm-cyan w-fit">
            {ALEXANDRO_PAGE_CONTENT.badge}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-axm-white sm:mt-6 sm:text-4xl md:text-display-xl lg:text-display-2xl">
            <GradientText as="span">{ALEXANDRO_PAGE_CONTENT.headline}</GradientText>
          </h1>
          <p className="mt-4 max-w-xl text-body-md text-axm-gray sm:mt-6 sm:text-body-lg">
            {ALEXANDRO_PAGE_CONTENT.description}
          </p>

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {ALEXANDRO_PAGE_CONTENT.pillars.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200 ${
                  active === i
                    ? 'border-axm-blue bg-axm-blue/20 text-axm-cyan'
                    : 'border-white/10 bg-white/5 text-axm-gray hover:border-axm-blue/30 hover:text-axm-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Card con BorderBeam y flechas */}
          <div className="relative mt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-xl border border-axm-blue/15 bg-axm-blue/5 p-5 pr-16 pl-16"
              >
                <BorderBeam />
                <h3 className="font-display text-base font-semibold text-axm-white sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-axm-gray">
                  {pillar.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={() =>
                setActive(
                  (prev) =>
                    (prev - 1 + ALEXANDRO_PAGE_CONTENT.pillars.length) %
                    ALEXANDRO_PAGE_CONTENT.pillars.length,
                )
              }
              aria-label="Pilar anterior"
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-axm-gray transition-all duration-200 hover:border-axm-blue/40 hover:bg-axm-blue/10 hover:text-axm-cyan"
            >
              ‹
            </button>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={() =>
                setActive((prev) => (prev + 1) % ALEXANDRO_PAGE_CONTENT.pillars.length)
              }
              aria-label="Pilar siguiente"
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-axm-gray transition-all duration-200 hover:border-axm-blue/40 hover:bg-axm-blue/10 hover:text-axm-cyan"
            >
              ›
            </button>
          </div>

          {/* Indicadores */}
          <div className="mt-5 flex gap-1.5">
            {ALEXANDRO_PAGE_CONTENT.pillars.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Pilar ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  active === i ? 'w-8 bg-axm-blue' : 'w-4 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <a
            href={ALEXANDRO_PAGE_CONTENT.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full sm:w-auto"
          >
            <Button variant="cta" size="lg" className="w-full sm:w-auto">
              {ALEXANDRO_PAGE_CONTENT.cta}
            </Button>
          </a>
        </motion.div>

        {/* Columna derecha — imagen */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUpVariants}
          className="relative order-1 mx-auto aspect-[3/4] w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:order-2 lg:max-w-lg"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-holo opacity-40 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 holo-border shadow-glow-holo">
            <AlexandroImage
              src={ALEXANDRO_IMAGES.fullbody}
              alt="Alexandro — Gerente Operativo IA"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 512px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
