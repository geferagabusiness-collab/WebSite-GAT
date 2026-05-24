# ALEXANDRO HOLOGRAM SPEC — WEBSITE GAT
# Documento para Cursor | Generado por Claude

---

## DESCRIPCIÓN FUNCIONAL

Cuando el usuario hace click en el botón flotante de Alexandro:

1. El fondo de la página oscurece (overlay semi-transparente)
2. Desde la parte inferior derecha emerge el avatar de Alexandro
3. Animación de "materialización holográfica" (scan lines + partículas + glow)
4. Aparece panel de conversación lateral izquierdo del avatar
5. Estado idle: leve movimiento de respiración en loop
6. Por ahora: UI completa sin agente conectado (input visible pero respuesta placeholder)

---

## ARQUITECTURA DEL SISTEMA

```
AlexandroButton (fixed, bottom-right)
    └── onClick → abre AlexandroModal

AlexandroModal (fixed, full-screen overlay)
    ├── BackdropOverlay (oscurece página)
    ├── AlexandroAvatar (imagen + efectos 3D)
    │   ├── HologramEffects (scan lines, glow, partículas)
    │   └── EstadoAnimación: idle | listening | speaking | loading
    ├── AlexandroPanel (panel conversación)
    │   ├── Header (nombre + estado)
    │   ├── MessageList (área de chat)
    │   └── InputArea (campo + botón enviar)
    └── CloseButton
```

---

## COMPONENTE: AlexandroButton.tsx

```tsx
// Posición: fixed bottom-6 right-6, z-50
// Tamaño: 64x64px círculo
// Contenido: imagen alexandro-icon.png dentro del círculo con glow
// Efectos:
//   - Border gradiente: axm-blue → axm-cyan rotando lentamente (CSS animation)
//   - Glow pulsante: box-shadow axm-blue oscilando con keyframe
//   - Hover: scale 1.1, glow más intenso
//   - Active: scale 0.95
// Tooltip al hover: "Hablar con Alexandro"

// Código base:
const AlexandroButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full
               ring-2 ring-axm-blue/50 hover:ring-axm-cyan/80
               shadow-glow-blue hover:shadow-glow-cyan
               transition-all duration-300 hover:scale-110 active:scale-95
               overflow-hidden group"
    aria-label="Hablar con Alexandro"
  >
    {/* Imagen del avatar circular */}
    <Image
      src="/alexandro/alexandro-icon.png"
      alt="Alexandro IA"
      fill
      className="object-cover"
    />
    {/* Pulse ring animado */}
    <span className="absolute inset-0 rounded-full ring-2 ring-axm-cyan/30 animate-ping" />
  </button>
)
```

---

## COMPONENTE: AlexandroModal.tsx

```tsx
// Estado global: usar Context o Zustand (según preferencia del proyecto)
// Si no hay estado global aún: useState en layout.tsx, pasar por props

// Estructura del modal:
// - AnimatePresence de Framer Motion para entrada/salida
// - Overlay: fixed inset-0, bg-black/70, backdrop-blur-sm, z-40
// - Contenedor principal: fixed, bottom-0 right-0, z-50
//   Desktop: ancho ~800px, alto ~85vh, posición bottom-0 right-0
//   Mobile: full width, altura ~90vh, desde abajo

// Animación del contenedor:
const modalVariants = {
  initial: { opacity: 0, y: '100%', scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: '20%',
    scale: 0.97,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
}
```

---

## COMPONENTE: AlexandroAvatar.tsx

```tsx
// Técnica: CSS + Framer Motion (NO React Three Fiber para esta versión)
// Razón: Las imágenes PNG de Alexandro son suficientes para lograr
//        el efecto holográfico deseado sin el costo de un modelo 3D.
//        R3F se puede agregar en Fase 2 si se quiere modelo volumétrico real.

// Layout del avatar:
// - Imagen principal: alexandro-fullbody.png
// - Tamaño: ~280px ancho, altura auto
// - Posición: centrado verticalmente, ligeramente a la derecha en desktop

// EFECTOS HOLOGRÁFICOS (CSS + Framer Motion):

// 1. Animación de entrada "materialización":
const avatarEntrance = {
  initial: { opacity: 0, y: 80, filter: 'blur(20px) brightness(2)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px) brightness(1)',
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
  }
}

// 2. Idle breathing loop (una vez que apareció):
const idleAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
}

// 3. Glow pulsante en el pecho (el punto de luz de las imágenes):
// Div absoluto sobre el pecho del avatar:
// background: radial-gradient(circle, rgba(79,195,247,0.6) 0%, transparent 70%)
// Animación: opacity 0.4 → 1 → 0.4, scale 0.8 → 1.2 → 0.8, loop 3s

// 4. Scan lines (overlay CSS):
// Pseudo-elemento o div con:
// background: repeating-linear-gradient(
//   0deg,
//   transparent,
//   transparent 2px,
//   rgba(79, 195, 247, 0.03) 2px,
//   rgba(79, 195, 247, 0.03) 4px
// )
// pointer-events: none, position absolute, inset 0

// 5. Halo/glow base debajo del avatar:
// Div elipse debajo con radial-gradient azul/cyan, blur alto, opacidad 0.3
// Animación: scale 0.9 → 1.1, loop lento

// 6. Partículas flotantes alrededor:
// 8-12 pequeños divs (2-4px) con posición absoluta aleatoria
// Animación individual: flotar hacia arriba y desvanecer, loop con delay aleatorio
// Color: axm-cyan o holo-gold aleatoriamente
```

---

## COMPONENTE: HologramEffects.tsx

```tsx
// Efectos separados para reutilización

// ScanLineOverlay: div con CSS scan lines, pointer-events-none
// GlowBase: elipse radial debajo del avatar
// FloatingParticles: partículas flotantes con Framer Motion
// HologramBorder: borde del panel con gradiente animado
// EnergyCore: punto de luz del pecho con glow pulsante

// Efecto "glitch" sutil al aparecer (solo en entrada, no en loop):
// Durante los primeros 0.5s después de la entrada:
// Aplicar filter: hue-rotate con keyframe rápido (3-4 frames)
// Escala X ligeramente: scaleX: [1, 1.02, 0.99, 1] muy rápido
// Esto simula interferencia holográfica al materializarse
```

---

## COMPONENTE: AlexandroPanel.tsx

```tsx
// Panel de conversación lateral al avatar
// Desktop: a la izquierda del avatar
// Mobile: debajo del avatar

// Estilo: glass-card + holo-border
// Ancho desktop: ~340px
// Header:
//   - Avatar circular pequeño (40px) con glow
//   - Nombre "Alexandro" en Syne 600
//   - Badge de estado: punto verde pulsante + "En línea"
//   - Botón cerrar (X) top-right

// MessageList:
//   - Scroll interno
//   - Mensaje inicial de Alexandro al abrir:
//     "Hola, soy Alexandro. Soy el gerente operativo IA de Grupo AXM Technology.
//      ¿En qué puedo ayudarte hoy?"
//   - Burbujas: Alexandro (izquierda, glass dark) | Usuario (derecha, gradiente axm)
//   - Timestamp en cada mensaje

// InputArea:
//   - Input text con placeholder "Escribe tu consulta..."
//   - Botón enviar (ícono Send de lucide, color axm-cyan)
//   - Estilo: glass-card borde inferior del panel
//   - Por ahora: al enviar, mostrar mensaje placeholder de respuesta
//     "Estoy procesando tu consulta..." (se conectará al agente real en Fase 2)

// NOTA FASE 2: El input se conectará al agente IA de Alexandro.app
// mediante API call al backend del VPS Hostinger (2.24.102.82)
// Los mensajes se pasarán al endpoint: POST /api/alexandro/chat
```

---

## ESTADOS DEL AVATAR

```tsx
type AlexandroState = 'idle' | 'listening' | 'speaking' | 'loading'

// IDLE: breathing animation (y: flotación suave)
// LISTENING: leve inclinación + glow más intenso en cabeza
// SPEAKING: glow del pecho más activo + partículas más rápidas
// LOADING: partículas en espiral, glow pulsante más rápido

// Transiciones entre estados via Framer Motion
// Los estados se controlan desde AlexandroPanel según interacción del usuario
```

---

## ARCHIVOS DE IMAGEN REQUERIDOS

```
Copiar desde:
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/Alexandro Imagenes/

A:
public/alexandro/

Renombrar como:
- alexandro-icon.png       → imagen circular del rostro (Image 1 — con borde chat)
- alexandro-hero.png       → cuerpo completo con fondo oscuro (Image 2 o 3)
- alexandro-fullbody.png   → cuerpo completo alta resolución (Image 3 — más nítida)

NOTA: Asegurarse que alexandro-hero.png y alexandro-fullbody.png
tengan fondo oscuro/negro para que el efecto holográfico
con glow y blend-mode funcione correctamente.
blend-mode recomendado en CSS: mix-blend-mode: screen o lighten
sobre el fondo oscuro del modal — esto realzará las luces
y hará desaparecer los bordes negros de la imagen.
```

---

## LOGO — ARCHIVO A USAR

```
Copiar desde carpeta SVG del proyecto:

Para Navbar y uso general sobre fondo oscuro:
→ Grupo_AXM_Tecnhology_SVG_V4.svg  (versión blanco/gris sobre oscuro)
   Renombrar a: public/logo/logo-dark.svg

Para uso sobre fondo claro (si aplica):
→ Grupo_AXM_Tecnhology_SVG_V1.svg  (versión color azul)
   Renombrar a: public/logo/logo-color.svg

Solo el chip GAT (favicon, loader):
→ Extraer el path del chip del SVG o usar las versiones avatar PNG
   Renombrar a: public/logo/logo-mark.png
```

---

## NOTAS DE IMPLEMENTACIÓN

```
1. El botón flotante de Alexandro SIEMPRE visible en todas las páginas
   → Agregarlo en app/layout.tsx fuera del main content

2. El modal de Alexandro usa AnimatePresence de Framer Motion
   → Permite animación suave al cerrar también

3. En mobile el avatar se muestra más pequeño (150px) encima del panel
   El panel ocupa toda la parte inferior de la pantalla

4. Performance: las imágenes de Alexandro deben estar en formato WebP
   → Convertir PNG → WebP antes de subir a public/
   → Usar next/image con priority={false} y loading="lazy"
   → Excepción: la imagen del botón flotante sí tiene priority={true}

5. Accessibility:
   → El modal tiene role="dialog" aria-modal="true"
   → Botón cerrar tiene aria-label="Cerrar Alexandro"
   → Focus trap dentro del modal cuando está abierto
```
