'use client'

import { GradientText } from '@/components/ui/GradientText'
import { PageBackground } from '@/components/ui/PageBackground'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ServiceCardReveal } from '@/components/ui/ServiceCardReveal'
import { fadeInUpVariants } from '@/lib/motion'
import { SERVICIOS_PAGE_CONTENT } from '@/lib/page-content'
import { motion } from 'framer-motion'

export default function ServiciosPage() {
  return (
    <>
      <PageBackground variant="servicios" />
      <section className="relative z-10 section-padding bg-axm-deep">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div initial="initial" animate="animate" variants={fadeInUpVariants} className="mb-10 sm:mb-16">
          <SectionTitle
            title={SERVICIOS_PAGE_CONTENT.title}
            subtitle={SERVICIOS_PAGE_CONTENT.subtitle}
            align="center"
            className="mx-auto"
          />
        </motion.div>

        <div className="grid gap-6 sm:gap-10" style={{ perspective: '1200px' }}>
          {SERVICIOS_PAGE_CONTENT.services.map((service, index) => (
            <ServiceCardReveal key={service.id} index={index} className="p-5 sm:p-8 lg:p-10" hover>
              <div
                className="mb-2 h-1 w-16 rounded-full"
                style={{ backgroundColor: service.color }}
              />
                <h3 className="font-display text-2xl font-bold text-axm-white sm:text-3xl md:text-display-lg">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-3xl text-body-md text-axm-gray sm:mt-4 sm:text-body-lg">{service.description}</p>

                <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                  {service.subservices.map((sub) => (
                    <li
                      key={sub.title}
                      className="rounded-lg border border-white/6 bg-axm-surface/30 p-5"
                    >
                      <GradientText as="h3" className="text-body-lg font-semibold">
                        {sub.title}
                      </GradientText>
                      <p className="mt-2 text-body-sm text-axm-gray">{sub.description}</p>
                    </li>
                  ))}
                </ul>
            </ServiceCardReveal>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
