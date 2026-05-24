import { getButtonClassName } from '@/components/ui/Button'
import { HOME_CTA } from '@/lib/constants'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,117,240,0.25)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-axm-white sm:text-4xl md:text-display-xl">
          {HOME_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-body-md text-axm-gray sm:mt-6 sm:text-body-lg">{HOME_CTA.subtitle}</p>

        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <Link href={HOME_CTA.primary.href} className={getButtonClassName('primary', 'lg', 'w-full sm:w-auto')}>
            {HOME_CTA.primary.label}
          </Link>
          <Link
            href={HOME_CTA.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClassName('secondary', 'lg', 'w-full gap-2 sm:w-auto')}
          >
            <MessageCircle size={20} />
            {HOME_CTA.whatsapp.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
