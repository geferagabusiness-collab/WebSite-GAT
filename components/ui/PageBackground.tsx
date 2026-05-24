'use client'

import { EASINGS } from '@/lib/motion'
import { getResponsiveCount } from '@/lib/responsive'
import { motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

export type BgVariant =
  | 'nosotros'
  | 'servicios'
  | 'alexandro'
  | 'productos'
  | 'academy'
  | 'soporte'
  | 'contacto'

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

const GRID_MASK =
  'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

interface BackgroundParticlesProps {
  count: number
  speedMultiplier?: number
  connectionDistance?: number
  showConnections?: boolean
}

const PARTICLE_COLORS = ['#0075F0', '#00F0FC']

function BackgroundParticles({
  count,
  speedMultiplier = 1,
  connectionDistance = 140,
  showConnections = true,
}: BackgroundParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let particles: Particle[] = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      particles = Array.from({ length: getResponsiveCount(count, Math.floor(count * 0.6), Math.floor(count * 0.35)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: ((Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.3 : -0.3)) * speedMultiplier,
        vy: ((Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.3 : -0.3)) * speedMultiplier,
        radius: Math.random() * 2 + 1,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? PARTICLE_COLORS[0],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      }

      if (showConnections) {
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const a = particles[i]
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(0, 159, 252, ${0.15 * (1 - distance / connectionDistance)})`
              ctx.lineWidth = 1
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      animationId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, speedMultiplier, connectionDistance, showConnections])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

const CIRCUIT_PATHS = [
  'M 0 15 L 35 15 L 35 45 L 65 45 L 65 15 L 100 15',
  'M 0 35 L 25 35 L 25 75 L 50 75 L 50 35 L 100 35',
  'M 0 55 L 40 55 L 40 25 L 70 25 L 70 85 L 100 85',
  'M 0 75 L 30 75 L 30 55 L 60 55 L 60 95 L 100 95',
  'M 10 0 L 10 40 L 45 40 L 45 100',
  'M 30 0 L 30 60 L 55 60 L 55 100',
  'M 50 0 L 50 30 L 80 30 L 80 100',
  'M 70 0 L 70 50 L 90 50 L 90 100',
  'M 85 0 L 85 70 L 20 70 L 20 100',
  'M 95 0 L 95 20 L 15 20 L 15 100',
]

function CircuitLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {CIRCUIT_PATHS.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(0, 240, 252, 0.06)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="200"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 200 }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  )
}

function NoiseOverlay({ opacity }: { opacity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: NOISE_TEXTURE,
        backgroundSize: '200px 200px',
        opacity,
      }}
      aria-hidden
    />
  )
}

function PerspectiveGrid({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(rgba(0,117,240,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,117,240,0.08) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: GRID_MASK,
        maskImage: GRID_MASK,
      }}
      aria-hidden
    />
  )
}

function GlowOrb({
  className,
  delay = 0,
}: {
  className: string
  delay?: number
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: EASINGS.smooth,
        delay,
      }}
      aria-hidden
    />
  )
}

function NosotrosBackground() {
  return (
    <>
      <PerspectiveGrid />
      <GlowOrb
        className="top-[-5%] right-[-5%] h-80 w-80 bg-axm-blue/20 blur-[100px]"
      />
      <GlowOrb
        className="bottom-[-5%] left-[-5%] h-72 w-72 bg-axm-cyan/20 blur-[100px]"
        delay={1.2}
      />
    </>
  )
}

function ProductosPerspectiveGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(245,166,35,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.08) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: GRID_MASK,
        maskImage: GRID_MASK,
      }}
      aria-hidden
    />
  )
}

function ProductosBackground() {
  return (
    <>
      <ProductosPerspectiveGrid />
      <GlowOrb className="top-[-5%] right-[-5%] h-80 w-80 bg-[#F5A623]/25 blur-[100px]" />
      <GlowOrb
        className="bottom-[-5%] left-[-5%] h-72 w-72 bg-[#F5A623]/15 blur-[100px]"
        delay={1.2}
      />
    </>
  )
}

function ServiciosBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,117,240,0.2)_0%,transparent_70%)]"
        aria-hidden
      />
      <CircuitLines />
    </>
  )
}

function AlexandroBackground() {
  return (
    <>
      <PerspectiveGrid opacity={0.35} />
      <BackgroundParticles count={100} speedMultiplier={1.8} />
      <GlowOrb className="top-[10%] right-[15%] h-96 w-96 bg-axm-blue/25 blur-[120px]" />
      <GlowOrb
        className="bottom-[15%] left-[10%] h-80 w-80 bg-axm-cyan/25 blur-[120px]"
        delay={1}
      />
      <GlowOrb
        className="top-[45%] left-[45%] h-64 w-64 bg-[#F5A623]/20 blur-[120px]"
        delay={2}
      />
      <NoiseOverlay opacity={0.04} />
    </>
  )
}

function AcademyBackground() {
  return (
    <>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb className="top-[-8%] right-[-8%] h-96 w-96 bg-[#F5A623]/25 blur-[120px]" />
      <GlowOrb
        className="bottom-[-5%] left-[-5%] h-72 w-72 bg-axm-cyan/20 blur-[100px]"
        delay={1.5}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)',
        }}
        animate={{ backgroundPosition: ['0px 0px', '0px 8px'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />
    </>
  )
}

function SoporteBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,117,240,0.04) 60px, rgba(0,117,240,0.04) 61px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-axm-blue/15 blur-[100px]"
        aria-hidden
      />
    </>
  )
}

function ContactoBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,117,240,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <BackgroundParticles count={20} speedMultiplier={0.25} showConnections={false} />
      <NoiseOverlay opacity={0.03} />
    </>
  )
}

const VARIANT_MAP: Record<BgVariant, () => ReactNode> = {
  nosotros: NosotrosBackground,
  servicios: ServiciosBackground,
  alexandro: AlexandroBackground,
  productos: ProductosBackground,
  academy: AcademyBackground,
  soporte: SoporteBackground,
  contacto: ContactoBackground,
}

interface PageBackgroundProps {
  variant: BgVariant
}

export function PageBackground({ variant }: PageBackgroundProps) {
  const Background = VARIANT_MAP[variant]

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASINGS.fade }}
      aria-hidden
    >
      <Background />
    </motion.div>
  )
}
