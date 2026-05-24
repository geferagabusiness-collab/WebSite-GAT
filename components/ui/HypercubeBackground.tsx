'use client'

import { useEffect, useRef } from 'react'

type Vec4 = [number, number, number, number]

const ROTATION_SPEEDS = {
  xw: 0.003,
  yw: 0.005,
  zw: 0.002,
  xy: 0.004,
} as const

const PERSPECTIVE_W = 3.5
const PERSPECTIVE_Z = 2.8
const EDGE_COLOR = 'rgba(0, 240, 252, 0.15)'
const VERTEX_COLOR = '#00F0FC'

function buildVertices(): Vec4[] {
  const verts: Vec4[] = []
  for (let i = 0; i < 16; i++) {
    verts.push([
      i & 1 ? 1 : -1,
      i & 2 ? 1 : -1,
      i & 4 ? 1 : -1,
      i & 8 ? 1 : -1,
    ])
  }
  return verts
}

function buildEdges(vertexCount: number): [number, number][] {
  const edges: [number, number][] = []
  for (let i = 0; i < vertexCount; i++) {
    for (let j = i + 1; j < vertexCount; j++) {
      let diff = 0
      for (let k = 0; k < 4; k++) {
        if ((i >> k) % 2 !== (j >> k) % 2) diff++
      }
      if (diff === 1) edges.push([i, j])
    }
  }
  return edges
}

function rotatePlane(v: Vec4, a: number, b: number, theta: number): Vec4 {
  const next = [...v] as Vec4
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  const va = v[a]
  const vb = v[b]
  next[a] = va * cos - vb * sin
  next[b] = va * sin + vb * cos
  return next
}

function project4DTo2D(v: Vec4, scale: number, cx: number, cy: number): [number, number] {
  const wFactor = PERSPECTIVE_W / (PERSPECTIVE_W - v[3])
  const x3 = v[0] * wFactor
  const y3 = v[1] * wFactor
  const z3 = v[2] * wFactor
  const zFactor = PERSPECTIVE_Z / (PERSPECTIVE_Z - z3)
  const x2 = x3 * zFactor * scale + cx
  const y2 = y3 * zFactor * scale + cy
  return [x2, y2]
}

const BASE_VERTICES = buildVertices()
const EDGES = buildEdges(16)

export function HypercubeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let angles = { xw: 0, yw: 0, zw: 0, xy: 0 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const scale = (canvas.height * 0.7) / 4

      angles = {
        xw: angles.xw + ROTATION_SPEEDS.xw,
        yw: angles.yw + ROTATION_SPEEDS.yw,
        zw: angles.zw + ROTATION_SPEEDS.zw,
        xy: angles.xy + ROTATION_SPEEDS.xy,
      }

      const rotated = BASE_VERTICES.map((v) => {
        let p = v
        p = rotatePlane(p, 0, 3, angles.xw)
        p = rotatePlane(p, 1, 3, angles.yw)
        p = rotatePlane(p, 2, 3, angles.zw)
        p = rotatePlane(p, 0, 1, angles.xy)
        return p
      })

      const projected = rotated.map((v) => project4DTo2D(v, scale, cx, cy))

      ctx.strokeStyle = EDGE_COLOR
      ctx.lineWidth = 1
      for (const [a, b] of EDGES) {
        const [x1, y1] = projected[a]
        const [x2, y2] = projected[b]
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      for (const [x, y] of projected) {
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = VERTEX_COLOR
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
      className="pointer-events-none fixed inset-0 z-0 opacity-50"
      aria-hidden
    />
  )
}
