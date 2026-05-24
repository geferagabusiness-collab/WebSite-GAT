export function getResponsiveCount(desktop: number, tablet?: number, mobile?: number): number {
  if (typeof window === 'undefined') return desktop

  const width = window.innerWidth
  if (width < 768) return mobile ?? Math.floor(desktop * 0.35)
  if (width < 1024) return tablet ?? Math.floor(desktop * 0.6)
  return desktop
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}
