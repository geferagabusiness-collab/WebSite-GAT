'use client'

import { useEffect, useRef } from 'react'

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let progress = 0

    // Nodos del circuito — coordenadas en porcentaje del canvas
    const nodes = [
      { x: 0.05, y: 0.2 }, { x: 0.2, y: 0.2 }, { x: 0.2, y: 0.5 },
      { x: 0.4, y: 0.5 }, { x: 0.4, y: 0.15 }, { x: 0.6, y: 0.15 },
      { x: 0.6, y: 0.65 }, { x: 0.75, y: 0.65 }, { x: 0.75, y: 0.35 },
      { x: 0.95, y: 0.35 }, { x: 0.95, y: 0.8 }, { x: 0.5, y: 0.8 },
      { x: 0.5, y: 0.9 }, { x: 0.15, y: 0.9 }, { x: 0.15, y: 0.65 },
      { x: 0.05, y: 0.65 }, { x: 0.05, y: 0.2 },
    ]

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function getPoint(i: number) {
      const n = nodes[i]
      return { x: n.x * canvas!.width, y: n.y * canvas!.height }
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const segments = nodes.length - 1
      const segIndex = Math.floor(progress * segments)
      const segProgress = (progress * segments) % 1

      // Dibujar líneas base del circuito
      ctx.strokeStyle = 'rgba(0, 117, 240, 0.08)'
      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      const p0 = getPoint(0)
      ctx.moveTo(p0.x, p0.y)
      for (let i = 1; i < nodes.length; i++) {
        const p = getPoint(i)
        ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()

      // Dibujar segmentos recorridos con glow
      ctx.strokeStyle = 'rgba(0, 159, 252, 0.35)'
      ctx.lineWidth = 1.5
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(0, 117, 240, 0.6)'
      ctx.beginPath()
      ctx.moveTo(p0.x, p0.y)
      for (let i = 1; i <= Math.min(segIndex + 1, segments); i++) {
        const p = getPoint(i)
        if (i <= segIndex) {
          ctx.lineTo(p.x, p.y)
        } else {
          const prev = getPoint(i - 1)
          ctx.lineTo(
            prev.x + (p.x - prev.x) * segProgress,
            prev.y + (p.y - prev.y) * segProgress,
          )
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Punto de luz que recorre el circuito
      const curSeg = Math.min(segIndex, segments - 1)
      const from = getPoint(curSeg)
      const to = getPoint(curSeg + 1)
      const dotX = from.x + (to.x - from.x) * segProgress
      const dotY = from.y + (to.y - from.y) * segProgress

      const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12)
      grad.addColorStop(0, 'rgba(0, 240, 252, 0.9)')
      grad.addColorStop(0.4, 'rgba(0, 117, 240, 0.4)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(dotX, dotY, 12, 0, Math.PI * 2)
      ctx.fill()

      // Nodos (puntos de intersección)
      nodes.slice(0, -1).forEach((_, i) => {
        const p = getPoint(i)
        const isVisited = i <= segIndex
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = isVisited
          ? 'rgba(0, 159, 252, 0.6)'
          : 'rgba(0, 117, 240, 0.15)'
        ctx.fill()
      })

      progress += 0.0008
      if (progress >= 1) progress = 0
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden
    />
  )
}
