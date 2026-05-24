'use client'

import { getResponsiveCount } from '@/lib/responsive'
import { useEffect, useRef } from 'react'

const LINE_COUNT_DESKTOP = 60
interface WarpLine {
  angle: number
  length: number
  speed: number
  maxDist: number
}

function distToEdge(cx: number, cy: number, w: number, h: number, angle: number): number {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const candidates: number[] = []

  if (Math.abs(cos) > 1e-6) {
    if (cos > 0) candidates.push((w - cx) / cos)
    else candidates.push(-cx / cos)
  }
  if (Math.abs(sin) > 1e-6) {
    if (sin > 0) candidates.push((h - cy) / sin)
    else candidates.push(-cy / sin)
  }

  return Math.min(...candidates.filter((t) => t > 0))
}

function createLine(cx: number, cy: number, w: number, h: number, angle: number): WarpLine {
  return {
    angle,
    length: 0,
    speed: 2 + Math.random() * 4,
    maxDist: distToEdge(cx, cy, w, h, angle),
  }
}

export function WarpBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let lines: WarpLine[] = []
    let cx = 0
    let cy = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cx = canvas.width / 2
      cy = canvas.height / 2
      const lineCount = getResponsiveCount(LINE_COUNT_DESKTOP, 36, 20)
      lines = Array.from({ length: lineCount }, (_, i) =>
        createLine(cx, cy, canvas.width, canvas.height, (Math.PI * 2 * i) / lineCount),
      )
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const line of lines) {
        const accel = 1 + line.length * 0.012
        line.length += line.speed * accel

        if (line.length >= line.maxDist) {
          Object.assign(
            line,
            createLine(cx, cy, canvas.width, canvas.height, line.angle + (Math.random() - 0.5) * 0.05),
          )
          continue
        }

        const life = line.length / line.maxDist
        const fade = Math.sin(life * Math.PI)
        const x2 = cx + Math.cos(line.angle) * line.length
        const y2 = cy + Math.sin(line.angle) * line.length

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(0, 240, 252, ${0.18 * fade})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    const handleResize = () => {
      const prevAngles = lines.map((l) => l.angle)
      resize()
      lines.forEach((line, i) => {
        line.angle = prevAngles[i] ?? line.angle
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 sm:opacity-100"
      aria-hidden
    />
  )
}
