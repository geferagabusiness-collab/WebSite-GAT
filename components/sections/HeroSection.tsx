'use client'

import { HeroParticles } from '@/components/sections/HeroParticles'
import { GradientText } from '@/components/ui/GradientText'
import { getButtonClassName } from '@/components/ui/Button'
import { HOME_HERO } from '@/lib/constants'
import { blurReveal, fadeInUp } from '@/lib/motion'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <motion.div
          className="absolute top-[-10%] left-[60%] h-96 w-96 rounded-full bg-axm-blue/20 blur-[120px]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[30%] right-[5%] h-72 w-72 rounded-full bg-axm-cyan/15 blur-[120px]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[40%] h-48 w-48 rounded-full bg-axm-electric/10 blur-[120px]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <motion.div
          className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(0,117,240,0.38)_0%,rgba(0,159,252,0.12)_45%,transparent_72%)]"
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-[480px] bg-gradient-glow-b opacity-90"
        />
        <motion.div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: NOISE_TEXTURE,
            backgroundSize: '200px 200px',
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,117,240,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,117,240,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          }}
        />
        <HeroParticles />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-6 py-8 sm:py-10 lg:grid lg:grid-cols-5 lg:items-center lg:gap-8 lg:px-8">
        <motion.div className="flex flex-col items-center space-y-6 text-center lg:col-span-3 lg:max-w-2xl lg:items-start lg:text-left">
          <motion.span
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.animate.transition, delay: 0.2 }}
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-mono-sm text-axm-cyan"
          >
            {HOME_HERO.badge}
          </motion.span>

          <motion.h1
            initial={blurReveal.initial}
            animate={blurReveal.animate}
            transition={{ ...blurReveal.animate.transition, delay: 0.4 }}
            className="font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-axm-white md:text-5xl lg:text-6xl"
          >
            {HOME_HERO.headlineBefore}
            <GradientText as="span">{HOME_HERO.headlineHighlight}</GradientText>
            {HOME_HERO.headlineAfter}
          </motion.h1>

          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.animate.transition, delay: 0.6 }}
            className="text-lg text-axm-white/80 md:text-xl"
          >
            {HOME_HERO.lead}
          </motion.p>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.animate.transition, delay: 0.8 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start"
          >
            <Link
              href={HOME_HERO.ctaPrimary.href}
              className={getButtonClassName('primary', 'lg')}
            >
              {HOME_HERO.ctaPrimary.label}
            </Link>
            <Link
              href={HOME_HERO.ctaSecondary.href}
              className={getButtonClassName('secondary', 'lg')}
            >
              {HOME_HERO.ctaSecondary.label}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="hidden lg:col-span-2 lg:block" aria-hidden />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-axm-gray"
        >
          <span className="text-body-sm">Scroll</span>
          <ChevronDown size={20} className="text-axm-cyan" />
        </motion.div>
      </motion.div>
    </section>
  )
}
