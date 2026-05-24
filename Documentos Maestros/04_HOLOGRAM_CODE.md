# ALEXANDRO HOLOGRAM — CÓDIGO COMPLETO
# Reemplazar los componentes actuales con estos

---

## 1. components/alexandro/HologramEffects.tsx

```tsx
'use client'

import { motion } from 'framer-motion'

// Líneas de escaneo horizontales sobre el avatar
export function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          rgba(0, 240, 252, 0.04) 3px,
          rgba(0, 240, 252, 0.04) 4px
        )`,
      }}
    />
  )
}

// Efecto glitch horizontal — aparece brevemente al materializar
export function GlitchLines({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {[15, 35, 55, 72, 88].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${top}%`,
            height: `${Math.random() * 3 + 1}px`,
            background: `rgba(0, 240, 252, ${Math.random() * 0.4 + 0.1})`,
            transform: `translateX(${Math.random() * 20 - 10}px)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 0.15, delay: i * 0.06 }}
        />
      ))}
    </div>
  )
}

// Base de luz en el suelo
export function GroundGlow() {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 pointer-events-none z-0"
      style={{
        transform: 'translateX(-50%)',
        width: '280px',
        height: '40px',
        background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0, 117, 240, 0.6) 0%, rgba(0, 240, 252, 0.3) 40%, transparent 70%)',
        filter: 'blur(8px)',
      }}
      animate={{
        opacity: [0.6, 1, 0.6],
        scaleX: [0.9, 1.1, 0.9],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Halo lateral — borde brillante a los lados del avatar
export function SideHalo() {
  return (
    <>
      {/* Borde izquierdo */}
      <motion.div
        className="absolute left-0 top-[10%] bottom-[5%] pointer-events-none z-10"
        style={{
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 240, 252, 0.8) 30%, rgba(0, 240, 252, 0.8) 70%, transparent)',
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Borde derecho */}
      <motion.div
        className="absolute right-0 top-[10%] bottom-[5%] pointer-events-none z-10"
        style={{
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 117, 240, 0.8) 30%, rgba(0, 117, 240, 0.8) 70%, transparent)',
        }}
        animate={{ opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </>
  )
}

// Partículas flotantes alrededor del avatar
export function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: Math.random() * 3 + 1,
    color: i % 3 === 0 ? 'rgba(245,166,35,0.8)' : 'rgba(0,240,252,0.8)',
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
    startY: `${60 + Math.random() * 30}%`,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -(200 + Math.random() * 150)],
            opacity: [0, 0.9, 0.9, 0],
            x: [0, (Math.random() - 0.5) * 40],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Núcleo de energía — punto de luz en el pecho
export function EnergyCore() {
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{
        // Posición aproximada del pecho en la imagen
        top: '38%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow exterior */}
      <motion.div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,252,0.3) 0%, transparent 70%)',
        }}
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Núcleo interior */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(0,240,252,0.95)',
          boxShadow: '0 0 12px rgba(0,240,252,1), 0 0 24px rgba(0,240,252,0.6)',
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
```

---

## 2. components/alexandro/AlexandroAvatar.tsx

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ScanLines,
  GlitchLines,
  GroundGlow,
  SideHalo,
  FloatingParticles,
  EnergyCore,
} from './HologramEffects'

interface Props {
  isVisible: boolean
}

export function AlexandroAvatar({ isVisible }: Props) {
  const [glitchVisible, setGlitchVisible] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Efecto glitch solo al materializar
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setGlitchVisible(true), 400)
      const timer2 = setTimeout(() => setGlitchVisible(false), 900)
      return () => { clearTimeout(timer); clearTimeout(timer2) }
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative flex items-end justify-center"
          style={{ width: '260px', height: '480px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Glow atmosférico detrás del avatar */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 80% at 50% 60%, rgba(0,117,240,0.25) 0%, rgba(0,240,252,0.1) 50%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Imagen del avatar con animación de materialización */}
          <motion.div
            className="relative z-10"
            style={{ width: '100%', height: '100%' }}
            initial={{
              opacity: 0,
              y: 60,
              filter: 'blur(16px) brightness(2) saturate(0)',
              scaleX: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px) brightness(1) saturate(1)',
              scaleX: 1,
            }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
          >
            {/* Idle breathing */}
            <motion.div
              style={{ width: '100%', height: '100%', position: 'relative' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {imageError ? (
                // Placeholder si la imagen no carga
                <div
                  className="w-full h-full rounded-2xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,117,240,0.3) 0%, rgba(0,240,252,0.1) 100%)',
                    border: '1px solid rgba(0,240,252,0.3)',
                  }}
                />
              ) : (
                <Image
                  src="/alexandro/alexandro-fullbody.png"
                  alt="Alexandro IA"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                    mixBlendMode: 'screen',        // Elimina el fondo negro/oscuro
                    filter: 'brightness(1.1) contrast(1.05) saturate(1.2)',
                  }}
                  onError={() => setImageError(true)}
                  priority
                />
              )}
            </motion.div>
          </motion.div>

          {/* Efectos holográficos encima de la imagen */}
          <ScanLines />
          <GlitchLines visible={glitchVisible} />
          <SideHalo />
          <EnergyCore />
          <FloatingParticles />
          <GroundGlow />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## 3. components/alexandro/AlexandroModal.tsx

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlexandroAvatar } from './AlexandroAvatar'
import { AlexandroPanel } from './AlexandroPanel'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function AlexandroModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(5, 8, 20, 0.85)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Contenedor principal */}
          <motion.div
            className="fixed z-50 flex items-end justify-center"
            style={{
              bottom: 0,
              right: 0,
              left: 0,
              paddingBottom: '0',
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Desktop layout */}
            <div className="hidden lg:flex items-end justify-center w-full max-w-4xl mx-auto px-8">
              {/* Avatar a la izquierda anclado al suelo */}
              <div className="flex-shrink-0 mr-[-20px] relative z-10">
                <AlexandroAvatar isVisible={isOpen} />
              </div>

              {/* Panel de chat */}
              <div className="flex-1 max-w-sm mb-6 relative z-20">
                <AlexandroPanel onClose={onClose} />
              </div>
            </div>

            {/* Mobile layout — stack vertical */}
            <div className="flex lg:hidden flex-col items-center w-full">
              <div className="w-48 relative z-10">
                <AlexandroAvatar isVisible={isOpen} />
              </div>
              <div className="w-full px-4 mb-0 mt-[-20px] relative z-20">
                <AlexandroPanel onClose={onClose} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## INSTRUCCIÓN PARA CURSOR

Reemplaza completamente los archivos:
- `components/alexandro/HologramEffects.tsx`
- `components/alexandro/AlexandroAvatar.tsx`
- `components/alexandro/AlexandroModal.tsx`

Con el código de este documento. No modifiques `AlexandroPanel.tsx`, `AlexandroButton.tsx` ni `AlexandroWidget.tsx` — esos están bien.

Después del reemplazo haz rebuild completo.

**Punto crítico a verificar:**
La imagen `alexandro-fullbody.png` tiene fondo oscuro — el `mix-blend-mode: screen` en el `<Image>` hace que el negro se vuelva transparente y solo queden las luces brillantes del personaje, creando el efecto holográfico real. Si el fondo de la imagen es muy claro o blanco, el blend no funciona correctamente — en ese caso cambiar `mixBlendMode: 'screen'` por `mixBlendMode: 'lighten'`.
