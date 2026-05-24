'use client'

import { LogoDark } from '@/components/brand/LogoDark'
import { getButtonClassName } from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/constants'
import { mobileMenuVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <header
      className={cn(
        'glass-navbar fixed inset-x-0 top-0 z-50 transition-shadow duration-300',
        isScrolled && 'shadow-card',
      )}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={closeMobile}>
          <LogoDark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-axm-white/80 transition-colors duration-300 hover:text-axm-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contacto"
          className={getButtonClassName('primary', 'sm', 'hidden lg:inline-flex')}
        >
          Contactar
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-axm-white/80 transition-colors hover:text-axm-cyan lg:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="overflow-hidden border-t border-white/6 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-3 font-medium text-axm-white/80 transition-colors hover:bg-white/5 hover:text-axm-cyan"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                onClick={closeMobile}
                className={getButtonClassName('primary', 'sm', 'mt-2 w-full')}
              >
                Contactar
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
