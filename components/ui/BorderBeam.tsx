'use client'

import { useEffect, useRef } from 'react'

interface BorderBeamProps {
  color?: string
  duration?: number
}

export function BorderBeam({ duration = 2000 }: BorderBeamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const w = canvas.width
    const h = canvas.height
    const r = 12 // border-radius
    const perimeter = 2 * (w + h)

    // Colores del arcoíris eléctrico
    const colors = ['#00f0ff', '#00ff88', '#7c3aed', '#0075f0', '#00f0ff']

    function getPointOnRect(t: number): [number, number] {
      const d = t * perimeter
      if (d < w) return [d, 0]
      if (d < w + h) return [w, d - w]
      if (d < 2 * w + h) return [w - (d - w - h), h]
      return [0, h - (d - 2 * w - h)]
    }

    function draw(timestamp: number) {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const t = (elapsed % duration) / duration

      ctx.clearRect(0, 0, w, h)

      // Trazar el borde completo (base sutil)
      ctx.beginPath()
      ctx.roundRect(1, 1, w - 2, h - 2, r)
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Luz que recorre el borde
      const tailLength = 0.25 // 25% del perímetro
      const segments = 60

      for (let i = 0; i <= segments; i++) {
        const segT = (t - (i / segments) * tailLength + 1) % 1
        const alpha = 1 - i / segments
        const colorT = i / segments
        const colorIndex = Math.floor(colorT * (colors.length - 1))
        const colorNext = Math.min(colorIndex + 1, colors.length - 1)
        const colorProgress = colorT * (colors.length - 1) - colorIndex

        // Interpolar color
        const c1 = colors[colorIndex]
        const c2 = colors[colorNext]
        const hex = interpolateColor(c1, c2, colorProgress)

        const [x, y] = getPointOnRect(segT)

        ctx.beginPath()
        ctx.arc(x, y, 3 * (1 - i / segments) + 0.5, 0, Math.PI * 2)
        ctx.fillStyle = hex.replace(')', `,${alpha * 0.9})`).replace('rgb', 'rgba')
        ctx.shadowBlur = 8
        ctx.shadowColor = hex
        ctx.fill()
      }

      ctx.shadowBlur = 0
      animRef.current = requestAnimationFrame(draw)
    }

    function interpolateColor(c1: string, c2: string, t: number): string {
      const parse = (hex: string) => [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ]
      const [r1, g1, b1] = parse(c1)
      const [r2, g2, b2] = parse(c2)
      return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [duration])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
