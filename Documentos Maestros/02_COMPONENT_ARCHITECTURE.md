# ARQUITECTURA DE COMPONENTES — WEBSITE GAT
# Documento para Cursor | Generado por Claude

---

## STACK OFICIAL

```
Framework:    Next.js 14+ App Router
Lenguaje:     TypeScript (obligatorio)
Estilos:      TailwindCSS
Animaciones:  Framer Motion
3D/Holograma: React Three Fiber + Three.js
Íconos:       lucide-react
Fuentes:      Google Fonts (Space Grotesk, Syne, JetBrains Mono)
```

---

## ESTRUCTURA DE CARPETAS

```
app/
├── layout.tsx                    # Root layout — fuentes, metadata, providers
├── page.tsx                      # Página de Inicio
├── nosotros/page.tsx
├── servicios/
│   ├── page.tsx                  # Landing de todos los servicios
│   ├── soporte/page.tsx
│   ├── redes/page.tsx
│   ├── inteligencia-artificial/page.tsx
│   ├── software/page.tsx
│   ├── ciberseguridad/page.tsx
│   └── marketing/page.tsx
├── alexandro/page.tsx
├── academy/page.tsx
├── soporte/
│   ├── page.tsx
│   └── tickets/page.tsx
├── certificados/page.tsx
└── contacto/page.tsx

components/
├── layout/
│   ├── Navbar.tsx                # Navegación principal
│   ├── Footer.tsx                # Footer global
│   └── PageWrapper.tsx           # Wrapper con motion
├── ui/
│   ├── Button.tsx                # Variantes: primary, secondary, outline, cta
│   ├── Badge.tsx                 # Tags tecnológicos
│   ├── GlassCard.tsx             # Card glassmorphism base
│   ├── SectionTitle.tsx          # Título + subtítulo de sección estandarizado
│   ├── GradientText.tsx          # Texto con gradiente AXM
│   └── Divider.tsx               # Separador visual
├── sections/
│   ├── HeroSection.tsx           # Hero cinematográfico de inicio
│   ├── ServicesGrid.tsx          # Grid de 6 servicios
│   ├── AboutSection.tsx          # Misión / Visión / Equipo
│   ├── AlexandroSection.tsx      # CTA Alexandro en home
│   ├── AcademySection.tsx        # Preview Academy
│   ├── StatsSection.tsx          # Números/métricas empresa
│   ├── CTASection.tsx            # Call to action final
│   └── ContactSection.tsx        # Formulario + canales
├── alexandro/
│   ├── AlexandroButton.tsx       # Botón flotante siempre visible
│   ├── AlexandroModal.tsx        # Modal/overlay con holograma
│   ├── AlexandroAvatar.tsx       # Avatar 3D + efectos holográficos
│   ├── AlexandroPanel.tsx        # Panel de conversación lateral
│   └── HologramEffects.tsx       # Partículas, scan lines, glow
├── services/
│   └── ServiceCard.tsx           # Card individual de servicio
├── academy/
│   ├── CourseCard.tsx
│   └── CertificateSearch.tsx     # UI validación certificado (sin backend aún)
└── support/
    └── TicketForm.tsx            # Formulario ticket (sin backend aún)

lib/
├── motion.ts                     # Variantes Framer Motion (ver Design Tokens)
├── constants.ts                  # Datos estáticos: servicios, nav links, etc.
└── utils.ts                      # Funciones helper

public/
├── logo/
│   ├── logo-dark.svg             # Logo versión fondo oscuro (V4)
│   ├── logo-color.svg            # Logo versión color (V1)
│   └── logo-mark.svg             # Solo chip GAT
└── alexandro/
    ├── alexandro-avatar.png      # Imagen principal cuerpo completo
    ├── alexandro-icon.png        # Imagen circular (para botón flotante)
    └── alexandro-fullbody.png    # Imagen cuerpo completo alta resolución
```

---

## ORDEN DE IMPLEMENTACIÓN — FASE 1

### SPRINT 1 — Fundamentos (Día 1-2)
1. `layout.tsx` — fuentes Google, metadata, dark mode class
2. `tailwind.config.ts` — tokens completos del documento 01_DESIGN_TOKENS
3. `globals.css` — clases glassmorphism, custom scrollbar, base styles
4. `lib/motion.ts` — variantes Framer Motion
5. `lib/constants.ts` — datos navegación y servicios
6. `components/ui/` — Button, GlassCard, SectionTitle, GradientText, Badge

### SPRINT 2 — Navegación y Layout (Día 2-3)
7. `components/layout/Navbar.tsx`
8. `components/layout/Footer.tsx`
9. `components/layout/PageWrapper.tsx`

### SPRINT 3 — Hero y Home (Día 3-5)
10. `components/sections/HeroSection.tsx`
11. `components/sections/ServicesGrid.tsx`
12. `components/sections/StatsSection.tsx`
13. `components/sections/AlexandroSection.tsx`
14. `components/sections/CTASection.tsx`
15. `app/page.tsx` — ensamblaje

### SPRINT 4 — Holograma Alexandro (Día 5-7)
16. `components/alexandro/HologramEffects.tsx`
17. `components/alexandro/AlexandroAvatar.tsx`
18. `components/alexandro/AlexandroPanel.tsx`
19. `components/alexandro/AlexandroModal.tsx`
20. `components/alexandro/AlexandroButton.tsx`

### SPRINT 5 — Páginas internas (Día 7-10)
21. `app/nosotros/page.tsx`
22. `app/servicios/page.tsx` + subpáginas
23. `app/alexandro/page.tsx`
24. `app/academy/page.tsx`
25. `app/soporte/page.tsx`
26. `app/certificados/page.tsx`
27. `app/contacto/page.tsx`

---

## ESPECIFICACIONES POR COMPONENTE CRÍTICO

### Navbar.tsx

```tsx
// Comportamiento:
// - Fixed top, z-50
// - Fondo: glass-navbar (blur + dark semi-transparente)
// - Al scroll > 50px: agregar sombra sutil
// - Logo: SVG directo (no <img>), versión blanca
// - Links: Space Grotesk 500, texto axm-white/80, hover text-axm-cyan
// - CTA botón: variant="primary" tamaño sm
// - Mobile: hamburger menu con slide-down animado (Framer Motion)

// Items de navegación:
const navLinks = [
  { label: 'Nosotros',   href: '/nosotros' },
  { label: 'Servicios',  href: '/servicios' },
  { label: 'Alexandro',  href: '/alexandro' },
  { label: 'Academy',    href: '/academy' },
  { label: 'Soporte',    href: '/soporte' },
  { label: 'Contacto',   href: '/contacto' },
]
```

### HeroSection.tsx

```tsx
// Layout: full viewport height (min-h-screen)
// Fondo: gradient-hero + partículas canvas (ver abajo) + glow radial superior
// Contenido centrado con max-w-4xl
// Estructura:
//   - Badge superior: "Tecnología · IA · Automatización"
//   - H1 (display-2xl, Syne 800): texto con GradientText en palabra clave
//     "Impulsamos empresas con tecnología, automatización e inteligencia artificial"
//   - Párrafo lead (body-xl): propuesta de valor
//   - Dos botones: CTA primario + secundario ghost
//   - Scroll indicator animado abajo

// Partículas: implementar con canvas vanilla JS o tsParticles
// Config partículas:
//   - Color: #0075F0 y #00F0FC
//   - Cantidad: 60-80
//   - Tamaño: 1-3px
//   - Velocidad: muy lenta (0.3-0.8)
//   - Líneas de conexión: opacidad 0.15
//   - No interactivas (performance)

// Animación entrada:
//   - Badge: fadeInUp delay 0.2s
//   - H1: blurReveal delay 0.4s
//   - Párrafo: fadeInUp delay 0.6s
//   - Botones: fadeInUp delay 0.8s staggered
```

### ServicesGrid.tsx

```tsx
// 6 servicios en grid 2x3 desktop, 1 col mobile
// Cada ServiceCard:
//   - glass-card + glass-card-hover
//   - Ícono lucide (32px, color axm-cyan)
//   - Título (display-md)
//   - Descripción corta (body-md, axm-gray)
//   - Link "Conocer más" con arrow icon

// Datos desde lib/constants.ts:
export const SERVICES = [
  {
    id: 'soporte',
    title: 'Soporte y Mantenimiento',
    description: 'Asistencia técnica rápida y confiable para mantener la continuidad operativa.',
    icon: 'Headphones',
    href: '/servicios/soporte',
    color: '#009FFC',
  },
  {
    id: 'redes',
    title: 'Conectividad y Redes',
    description: 'Redes empresariales robustas, WiFi corporativo e infraestructura de servidores.',
    icon: 'Network',
    href: '/servicios/redes',
    color: '#0075F0',
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    description: 'Agentes IA, automatización de procesos y análisis inteligente de datos.',
    icon: 'Brain',
    href: '/servicios/inteligencia-artificial',
    color: '#00F0FC',
  },
  {
    id: 'software',
    title: 'Desarrollo de Software',
    description: 'Plataformas web, apps móviles y sistemas de gestión personalizados.',
    icon: 'Code2',
    href: '/servicios/software',
    color: '#4FC3F7',
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad',
    description: 'Auditorías, protección avanzada, respaldo y monitoreo 24/7.',
    icon: 'Shield',
    href: '/servicios/ciberseguridad',
    color: '#009FFC',
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Identidad corporativa, contenidos con IA y embudos de venta automatizados.',
    icon: 'TrendingUp',
    href: '/servicios/marketing',
    color: '#F5A623',
  },
]
```

---

## REGLAS GLOBALES DE CÓDIGO

```
1. TypeScript obligatorio — sin `any`
2. Variables y props en inglés
3. Comentarios técnicos en español
4. Cada componente en su propio archivo
5. Props siempre tipadas con interface
6. No inline styles — solo Tailwind + CSS variables
7. Imágenes: next/image siempre (optimización automática)
8. Fuentes: next/font/google (no CDN link en HTML)
9. Animaciones: Framer Motion, nunca CSS transitions complejas
10. No lógica de negocio en componentes UI
```

---

## DEPENDENCIAS A INSTALAR

```bash
npm install framer-motion
npm install @react-three/fiber @react-three/drei three
npm install lucide-react
npm install @types/three

# Fuentes — configurar en layout.tsx via next/font/google
# Space Grotesk, Syne, JetBrains Mono
```
