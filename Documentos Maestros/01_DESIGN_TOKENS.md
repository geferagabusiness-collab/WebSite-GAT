# DESIGN TOKENS — WEBSITE GAT
# Documento para Cursor | Generado por Claude

---

## COLORES OFICIALES

```ts
// tailwind.config.ts — extend.colors
colors: {
  // Primarios
  'axm-blue':       '#0075F0',   // Azul principal logo AXM
  'axm-cyan':       '#009FFC',   // Azul claro logo AXM
  'axm-electric':   '#00F0FC',   // Cian eléctrico (acento holográfico)

  // Fondos dark
  'axm-deep':       '#0A0E1A',   // Fondo base (más oscuro que navy)
  'axm-navy':       '#131C35',   // Fondo secundario
  'axm-dark':       '#1F2C33',   // Fondo cards/panels
  'axm-surface':    '#1A2235',   // Glassmorphism base

  // Textos
  'axm-white':      '#FDFDFD',   // Texto principal
  'axm-gray':       '#8A9BB0',   // Texto secundario
  'axm-muted':      '#4A5568',   // Texto deshabilitado

  // Alexandro / Hologram
  'holo-blue':      '#4FC3F7',   // Azul holográfico Alexandro
  'holo-gold':      '#F5A623',   // Dorado neural Alexandro
  'holo-glow':      'rgba(79, 195, 247, 0.15)',  // Glow sutil

  // Estado / Semánticos
  'success':        '#00E5A0',
  'warning':        '#F5A623',
  'error':          '#FF4D6D',
}
```

---

## TIPOGRAFÍA

```ts
// tailwind.config.ts — extend.fontFamily
fontFamily: {
  sans:    ['Space Grotesk', 'sans-serif'],   // Body, UI, botones
  display: ['Syne', 'sans-serif'],            // Títulos hero, headings grandes
  mono:    ['JetBrains Mono', 'monospace'],   // Código, badges, IDs técnicos
}

// Google Fonts a importar en layout.tsx:
// - Space Grotesk: 300,400,500,600,700
// - Syne: 600,700,800
// - JetBrains Mono: 400,500
```

### Escala tipográfica

| Token        | Tamaño  | Peso | Uso |
|-------------|---------|------|-----|
| display-2xl | 72px    | 800  | Hero principal |
| display-xl  | 56px    | 700  | Subtítulos hero |
| display-lg  | 40px    | 700  | Títulos de sección |
| display-md  | 32px    | 600  | Subtítulos sección |
| body-xl     | 20px    | 400  | Lead paragraph |
| body-lg     | 18px    | 400  | Texto corriente |
| body-md     | 16px    | 400  | Texto general |
| body-sm     | 14px    | 400  | Captions, labels |
| mono-sm     | 13px    | 500  | Badges, IDs |

---

## ESPACIADO Y LAYOUT

```ts
// Máximo ancho de contenido
maxWidth: {
  'container': '1280px',
  'content':   '960px',
  'narrow':    '720px',
}

// Secciones — padding vertical estándar
sectionPadding: 'py-24 md:py-32 lg:py-40'

// Gap entre secciones grandes
sectionGap: 'space-y-32 md:space-y-40'
```

---

## GRADIENTES

```ts
// En tailwind.config.ts — extend.backgroundImage
backgroundImage: {
  'gradient-axm':     'linear-gradient(135deg, #0075F0 0%, #009FFC 50%, #00F0FC 100%)',
  'gradient-hero':    'linear-gradient(180deg, #0A0E1A 0%, #131C35 50%, #0A0E1A 100%)',
  'gradient-card':    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  'gradient-holo':    'linear-gradient(180deg, rgba(79,195,247,0.2) 0%, rgba(245,166,35,0.1) 50%, transparent 100%)',
  'gradient-glow-b':  'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,117,240,0.3) 0%, transparent 70%)',
}
```

---

## GLASSMORPHISM — CLASES REUTILIZABLES

```css
/* globals.css */

.glass-card {
  background: rgba(26, 34, 53, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.glass-card-hover {
  transition: border-color 0.3s ease, background 0.3s ease;
}
.glass-card-hover:hover {
  background: rgba(26, 34, 53, 0.8);
  border-color: rgba(0, 117, 240, 0.3);
}

.glass-navbar {
  background: rgba(10, 14, 26, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.holo-border {
  border: 1px solid rgba(79, 195, 247, 0.25);
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.08), inset 0 0 20px rgba(79, 195, 247, 0.03);
}
```

---

## SOMBRAS Y GLOW

```ts
// tailwind.config.ts — extend.boxShadow
boxShadow: {
  'glow-blue':    '0 0 30px rgba(0, 117, 240, 0.4)',
  'glow-cyan':    '0 0 30px rgba(0, 240, 252, 0.3)',
  'glow-holo':    '0 0 60px rgba(79, 195, 247, 0.2), 0 0 120px rgba(79, 195, 247, 0.1)',
  'card':         '0 4px 24px rgba(0, 0, 0, 0.4)',
  'card-hover':   '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 117, 240, 0.15)',
  'btn-primary':  '0 4px 20px rgba(0, 117, 240, 0.5)',
}
```

---

## BORDER RADIUS

```ts
borderRadius: {
  'sm':   '8px',
  'md':   '12px',
  'lg':   '16px',
  'xl':   '24px',
  '2xl':  '32px',
  'full': '9999px',
}
```

---

## MOTION — DURACIONES Y EASINGS

```ts
// Para Framer Motion — usar como constantes en /lib/motion.ts

export const DURATIONS = {
  fast:    0.15,
  normal:  0.3,
  slow:    0.6,
  cinematic: 1.2,
}

export const EASINGS = {
  smooth:   [0.25, 0.46, 0.45, 0.94],
  snappy:   [0.34, 1.56, 0.64, 1],
  cinematic:[0.16, 1, 0.3, 1],
  fade:     [0.4, 0, 0.2, 1],
}

// Variantes reutilizables
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASINGS.cinematic } },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: EASINGS.fade } },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 16 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: EASINGS.cinematic } },
}
```

---

## BOTONES — VARIANTES

```tsx
// Clases TailwindCSS para cada variante

// Primary
'bg-gradient-axm text-white font-semibold px-6 py-3 rounded-lg shadow-btn-primary hover:shadow-glow-blue transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]'

// Secondary (ghost)
'border border-axm-blue/40 text-axm-cyan bg-transparent px-6 py-3 rounded-lg hover:bg-axm-blue/10 hover:border-axm-blue transition-all duration-300'

// Outline white
'border border-white/15 text-white bg-transparent px-6 py-3 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300'

// CTA grande
'bg-gradient-axm text-white font-bold px-8 py-4 rounded-xl text-lg shadow-btn-primary hover:shadow-glow-blue hover:scale-[1.03] transition-all duration-300'
```

---

## ÍCONOS

Librería: `lucide-react`

Tamaños estándar:
- Nav icons: `size={18}`
- Card icons: `size={24}`
- Feature icons: `size={32}`
- Hero accent icons: `size={48}`

Color base: `text-axm-cyan` para íconos de acento
Color muted: `text-axm-gray` para íconos secundarios
