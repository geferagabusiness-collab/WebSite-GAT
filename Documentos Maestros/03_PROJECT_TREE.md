# PROJECT TREE — WEBSITE GAT

**Última actualización:** 2026-05-24 07:00 AM

## Ruta Local Oficial

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/
```

---

# Árbol Maestro (Implementado)

```txt
Website GAT/
│
├── Documentos Maestros/         # Documentación maestra del proyecto
│   ├── 01_DESIGN_TOKENS.md
│   ├── 01_SYSTEM_OVERVIEW.md
│   ├── 02_CODING_RULES.md
│   ├── 02_COMPONENT_ARCHITECTURE.md
│   ├── 03_ALEXANDRO_HOLOGRAM_SPEC.md
│   ├── 03_PROJECT_TREE.md
│   ├── 04_ARCHITECTURE_CONTRACTS.md
│   ├── 04_HOLOGRAM_CODE.md
│   ├── 05_BRANDING_SYSTEM.md
│   ├── 06_ALEXANDRO_EXPERIENCE.md
│   ├── 07_FRONTEND_STRUCTURE.md
│   ├── 08_UI_UX_RULES.md
│   ├── 09_BACKEND_ROADMAP.md
│   ├── 10_.CURSORRULES.md
│   ├── 11_GITHUB_WORKFLOW.md
│   ├── 12_AI_PROMPTING_RULES.md
│   ├── 13_MOTION_SYSTEM.md
│   ├── 14_CONTENT_STRUCTURE.md
│   ├── 15_DEPLOYMENT_PLAN.md
│   ├── 16_DIRECTIVA_OFICIAL.md
│   ├── 17_SESSION_LOG.md
│   ├── 18_DEPLOYMENT.md
│   └── README.md
│
├── Alexandro Imagenes/          # Assets locales (gitignored) — avatar 3D
│   ├── Alexandro.png
│   ├── logotipo_Alexandro.png
│   ├── login-bg.mp4
│   └── login-bg-poster.jpg
│
├── Grupo AXM Logo/              # Identidad visual (gitignored) — brand guide
│   ├── AI/
│   ├── Avatar/
│   ├── Brand Guide/
│   ├── CDR/
│   ├── EPS/
│   ├── JPG/
│   ├── PDF/
│   ├── PNG/
│   ├── PSD/
│   ├── SVG/
│   └── Tipografías/
│
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Layout raíz, fuentes Google, AlexandroWidget
│   ├── page.tsx                 # Home
│   ├── globals.css              # Design tokens CSS, efectos holograma
│   ├── nosotros/page.tsx
│   ├── servicios/page.tsx
│   ├── productos/page.tsx       # Seguridad Electrónica
│   ├── alexandro/page.tsx
│   ├── academy/page.tsx
│   ├── soporte/page.tsx
│   └── contacto/page.tsx
│
├── components/
│   ├── alexandro/
│   │   ├── AlexandroWidget.tsx  # Widget flotante + panel chat holográfico
│   │   └── AlexandroImage.tsx   # Imagen avatar con efectos CSS
│   ├── brand/
│   │   └── LogoDark.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageWrapper.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── HeroParticles.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── GlassCard.tsx
│       ├── GradientText.tsx
│       ├── SectionTitle.tsx
│       ├── PageBackground.tsx     # Fondo dinámico por página
│       ├── WarpBackground.tsx     # Efecto warp speed
│       ├── VortexBackground.tsx   # Efecto vórtice
│       ├── HypercubeBackground.tsx# Efecto hipercubo 3D
│       ├── ServiceCardReveal.tsx  # Reveal animado de tarjetas
│       └── TiltCard.tsx           # Tarjeta con tilt 3D
│
├── content/
│   └── sitio-web.txt              # Contenido textual del sitio
│
├── lib/
│   ├── alexandro.ts               # Config y lógica del widget Alexandro
│   ├── constants.ts               # Constantes globales, nav links
│   ├── motion.ts                  # Variantes Framer Motion
│   ├── page-content.ts            # Contenido estructurado por página
│   ├── responsive.ts              # Helpers responsive mobile/tablet
│   └── utils.ts                   # Utilidades (cn, etc.)
│
├── public/
│   ├── alexandro/
│   │   ├── alexandro-fullbody.png
│   │   └── alexandro-icon.png
│   └── logo/
│       ├── logo-color.png
│       ├── logo-dark.svg
│       └── logo-watermark.png
│
├── global.d.ts
├── next.config.ts
├── next-env.d.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .cursorrules
├── .gitignore
└── Website GAT.code-workspace
```

---

# Rutas Locales de Assets

## Alexandro — Imágenes para avatar 3D

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/Alexandro Imagenes/
```

Contiene referencias visuales de Alexandro para construcción del avatar holográfico 3D (imágenes, poster y recursos de apoyo). **Gitignored** — pendiente limpiar del `.gitignore`.

## Grupo AXM Technology — Identidad visual

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/Grupo AXM Logo/
```

Contiene la identidad visual oficial: logotipos, tipografías, brand guide y assets en formatos AI, Avatar, CDR, EPS, JPG, PDF, PNG, PSD y SVG. **Gitignored** — pendiente limpiar del `.gitignore`.

## Assets públicos desplegados

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/public/alexandro/
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/public/logo/
```

Assets optimizados para producción en `grupoaxmtechnology.com`.

---

# Estructura Futura (Roadmap)

```txt
Website GAT/
├── backend/          # NestJS — Sprint 8
├── frontend/         # Reservado si se separa del monorepo
├── api/
├── database/
├── academy/
├── certificates/
├── tickets/
├── support/
└── tests/
```

---

# Regla

Cada vez que se cree o elimine una carpeta crítica:

- actualizar este archivo,
- actualizar fecha,
- registrar mutación en `17_SESSION_LOG.md`.
