import { LogoDark } from '@/components/brand/LogoDark'
import { FOOTER_COLUMNS, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants'
import { Camera, Link2, PlayCircle, Users } from 'lucide-react'
import Link from 'next/link'

const socialIcons = {
  linkedin: Link2,
  instagram: Camera,
  facebook: Users,
  youtube: PlayCircle,
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 bg-axm-navy">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex">
              <LogoDark className="[&>svg]:h-10" />
            </Link>
            <p className="max-w-sm text-body-md text-axm-gray">
              Tecnología, automatización e inteligencia artificial para empresas
              que buscan crecer con infraestructura avanzada.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-axm-gray transition-colors hover:border-axm-blue/40 hover:text-axm-cyan"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-body-lg font-semibold text-axm-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-axm-gray transition-colors hover:text-axm-cyan"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/6 pt-8">
          <p className="text-center text-body-sm text-axm-muted">
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
