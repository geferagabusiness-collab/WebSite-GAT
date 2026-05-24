'use client'

import { Button, getButtonClassName } from '@/components/ui/Button'
import { VortexBackground } from '@/components/ui/VortexBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUpVariants, staggerContainer } from '@/lib/motion'
import { SOPORTE_CONTENT } from '@/lib/page-content'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-axm-surface/50 px-4 py-3 text-body-md text-axm-white placeholder:text-axm-muted outline-none transition-colors focus:border-axm-blue/50 focus:ring-1 focus:ring-axm-blue/30'

export default function SoportePage() {
  const [ticketSent, setTicketSent] = useState(false)

  function handleTicketSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTicketSent(true)
  }

  return (
    <div className="relative bg-axm-deep">
      <VortexBackground />
      <PageBackground variant="soporte" />
      <div className="relative z-10">
      <section className="section-padding">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-16">
            <SectionTitle
              title={SOPORTE_CONTENT.title}
              subtitle={SOPORTE_CONTENT.subtitle}
              align="center"
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariants}
          >
            <GlassCard className="mx-auto max-w-3xl">
              <h3 className="font-display text-display-md font-semibold text-axm-white">Tickets</h3>
              <p className="mt-3 text-body-md text-axm-gray">{SOPORTE_CONTENT.ticket.intro}</p>
              <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleTicketSubmit}>
                <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label htmlFor="empresa" className="mb-1.5 block text-body-sm text-axm-gray">
                      Empresa
                    </label>
                    <input id="empresa" name="empresa" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="area" className="mb-1.5 block text-body-sm text-axm-gray">
                      Área
                    </label>
                    <select id="area" name="area" required className={inputClass}>
                      {SOPORTE_CONTENT.ticket.areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="colaborador" className="mb-1.5 block text-body-sm text-axm-gray">
                    Colaborador
                  </label>
                  <input
                    id="colaborador"
                    name="colaborador"
                    type="text"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="descripcion" className="mb-1.5 block text-body-sm text-axm-gray">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="prioridad" className="mb-1.5 block text-body-sm text-axm-gray">
                    Prioridad
                  </label>
                  <select id="prioridad" name="prioridad" required className={inputClass}>
                    {SOPORTE_CONTENT.ticket.priorities.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" size="md">
                    {ticketSent ? 'Ticket registrado' : SOPORTE_CONTENT.ticket.cta}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-white/6 bg-axm-navy/40">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariants}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-display-lg font-bold text-axm-white">
              {SOPORTE_CONTENT.downloads.title}
            </h2>
            <p className="mt-3 text-body-lg text-axm-gray">{SOPORTE_CONTENT.downloads.subtitle}</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {SOPORTE_CONTENT.downloads.items.map((tool) => (
              <motion.div key={tool.name} variants={fadeInUpVariants}>
                <GlassCard className="flex h-full flex-col">
                  <h3 className="font-display text-display-md font-semibold text-axm-white">
                    {tool.name}
                  </h3>
                  <p className="mt-3 flex-1 text-body-md text-axm-gray">{tool.description}</p>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={getButtonClassName('secondary', 'md', 'mt-6 inline-flex gap-2')}
                  >
                    <Download size={18} />
                    {tool.cta}
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}
