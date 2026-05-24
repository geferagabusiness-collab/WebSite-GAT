import { getButtonClassName } from '@/components/ui/Button'
import { HOME_CTA } from '@/lib/constants'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,117,240,0.25)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-content px-6 text-center lg:px-8">
        <h2 className="font-display text-display-xl font-bold text-axm-white">
          {HOME_CTA.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg text-axm-gray">{HOME_CTA.subtitle}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={HOME_CTA.primary.href} className={getButtonClassName('primary', 'lg')}>
            {HOME_CTA.primary.label}
          </Link>
          <Link
            href={HOME_CTA.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClassName('secondary', 'lg', 'gap-2')}
          >
            <MessageCircle size={20} />
            {HOME_CTA.whatsapp.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
