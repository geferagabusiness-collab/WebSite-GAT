'use client'

import { ALEXANDRO_IMAGES, AlexandroImage } from '@/components/alexandro/AlexandroImage'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { openAlexandroWidget } from '@/lib/alexandro'
import { fadeInUp, fadeInUpVariants } from '@/lib/motion'
import { ALEXANDRO_PAGE_CONTENT } from '@/lib/page-content'
import { motion } from 'framer-motion'

export default function AlexandroPage() {
  return (
    <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-axm-deep section-padding sm:min-h-[calc(100dvh-5rem)] md:min-h-[calc(100dvh-6rem)]">
      <PageBackground variant="alexandro" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_40%,rgba(92,196,255,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow-b opacity-60" />

      <div className="relative z-10 mx-auto grid max-w-container items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          className="order-2 lg:order-1"
        >
          <span className="inline-block rounded-full border border-axm-blue/30 bg-axm-blue/10 px-4 py-1.5 font-mono text-mono-sm text-axm-cyan">
            {ALEXANDRO_PAGE_CONTENT.badge}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-axm-white sm:mt-6 sm:text-4xl md:text-display-xl lg:text-display-2xl">
            <GradientText as="span">{ALEXANDRO_PAGE_CONTENT.headline}</GradientText>
          </h1>
          <p className="mt-4 max-w-xl text-body-md text-axm-gray sm:mt-6 sm:text-body-lg">
            {ALEXANDRO_PAGE_CONTENT.description}
          </p>
          <Button
            type="button"
            variant="cta"
            size="lg"
            className="mt-6 w-full sm:mt-10 sm:w-auto"
            onClick={() => openAlexandroWidget()}
          >
            {ALEXANDRO_PAGE_CONTENT.cta}
          </Button>
        </motion.div>

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
