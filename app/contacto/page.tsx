'use client'

import { Button, getButtonClassName } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { HypercubeBackground } from '@/components/ui/HypercubeBackground'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SOCIAL_LINKS } from '@/lib/constants'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import { CONTACTO_CONTENT } from '@/lib/page-content'
import { Camera, Link2, MessageCircle, PlayCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'

const socialIcons = {
  linkedin: Link2,
  instagram: Camera,
  facebook: Users,
  youtube: PlayCircle,
} as const

const inputClass =
  'w-full rounded-lg border border-white/10 bg-axm-surface/50 px-4 py-3 text-body-md text-axm-white placeholder:text-axm-muted outline-none transition-colors focus:border-axm-blue/50 focus:ring-1 focus:ring-axm-blue/30'

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative bg-axm-deep">
      <HypercubeBackground />
      <PageBackground variant="contacto" />
      <section className="relative z-10 section-padding">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-16">
          <SectionTitle
            title={CONTACTO_CONTENT.title}
            subtitle={CONTACTO_CONTENT.subtitle}
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
          <motion.div variants={fadeInUpVariants}>
            <GlassCard className="h-full">
              <h3 className="font-display text-display-md font-semibold text-axm-white">Formulario</h3>
              <p className="mt-3 text-body-md text-axm-gray">{CONTACTO_CONTENT.form.intro}</p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="mb-1.5 block text-body-sm text-axm-gray">
                    Nombre
                  </label>
                  <input id="nombre" name="nombre" type="text" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="empresa" className="mb-1.5 block text-body-sm text-axm-gray">
                    Empresa
                  </label>
                  <input id="empresa" name="empresa" type="text" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="mensaje" className="mb-1.5 block text-body-sm text-axm-gray">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    className={inputClass}
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="w-full">
                  {submitted ? 'Mensaje enviado' : CONTACTO_CONTENT.form.cta}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <GlassCard className="flex h-full flex-col">
              <h3 className="font-display text-display-md font-semibold text-axm-white">WhatsApp</h3>
              <p className="mt-3 flex-1 text-body-md text-axm-gray">{CONTACTO_CONTENT.whatsapp.intro}</p>
              <a
                href={CONTACTO_CONTENT.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={getButtonClassName('cta', 'md', 'mt-6 inline-flex w-full gap-2 sm:w-auto')}
              >
                <MessageCircle size={20} />
                {CONTACTO_CONTENT.whatsapp.label}
              </a>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <GlassCard className="flex h-full flex-col">
              <h3 className="font-display text-display-md font-semibold text-axm-white">
                Redes sociales
              </h3>
              <p className="mt-3 flex-1 text-body-md text-axm-gray">{CONTACTO_CONTENT.social.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-axm-gray transition-colors hover:border-axm-blue/40 hover:text-axm-cyan"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
              <p className="mt-4 text-body-sm text-axm-muted">{CONTACTO_CONTENT.social.label}</p>
            </GlassCard>
          </motion.div>
      </motion.div>
      </div>
    </section>
    </div>
  )
}
