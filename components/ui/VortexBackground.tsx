'use client'

import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 80
const TRAIL_MIN = 5
const TRAIL_MAX = 8
const COLOR_SETS = [
  { rgb: [0, 117, 240] as const, alpha: 0.4 },
  { rgb: [0, 240, 252] as const, alpha: 0.3 },
] as const

interface VortexParticle {
  angle: number
  radius: number
  radiusSpeed: number
  baseOmega: number
  colorIndex: 0 | 1
  trail: { x: number; y: number }[]
  trailLength: number
}

export function VortexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let particles: VortexParticle[] = []
    let cx = 0
    let cy = 0
    let maxRadius = 0

    const createParticle = (): VortexParticle => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0,
      radiusSpeed: 0.35 + Math.random() * 0.55,
      baseOmega: 0.045 + Math.random() * 0.035,
      colorIndex: Math.random() < 0.5 ? 0 : 1,
      trail: [],
      trailLength: TRAIL_MIN + Math.floor(Math.random() * (TRAIL_MAX - TRAIL_MIN + 1)),
    })

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cx = canvas.width / 2
      cy = canvas.height / 2
      maxRadius = Math.min(cx, cy) * 0.92
      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle())
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i]
        const omega = p.baseOmega / (1 + p.radius * 0.018)
        p.angle += omega
        p.radius += p.radiusSpeed

        if (p.radius >= maxRadius) {
          particles[i] = createParticle()
          continue
        }

        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius

        p.trail.push({ x, y })
        if (p.trail.length > p.trailLength) {
          p.trail.shift()
        }

        const { rgb, alpha: baseAlpha } = COLOR_SETS[p.colorIndex]

        for (let t = 0; t < p.trail.length; t++) {
          const point = p.trail[t]
          const trailAlpha = ((t + 1) / p.trail.length) * baseAlpha
          ctx.beginPath()
          ctx.arc(point.x, point.y, 1.2 * ((t + 1) / p.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${trailAlpha})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseAlpha})`
        ctx.fill()
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
      aria-hidden
    />
  )
}
