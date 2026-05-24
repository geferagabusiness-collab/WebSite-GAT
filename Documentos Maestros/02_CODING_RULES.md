# CODING RULES — WEBSITE GAT

# Filosofía General

El proyecto debe mantenerse:

- modular,
- escalable,
- limpio,
- desacoplado,
- mantenible,
- reutilizable.

---

# Lenguaje Oficial

- TypeScript obligatorio.
- Variables en inglés.
- Comentarios técnicos en español.

---

# Reglas de Arquitectura

- Separación estricta frontend/backend.
- Componentes reutilizables.
- Prohibido código monolítico.
- Prohibido lógica duplicada.
- Prohibido hardcode innecesario.

---

# Frontend

## Framework

- Next.js App Router.

## Estilos

- TailwindCSS.

## Animaciones

- Framer Motion.
- GSAP.

## 3D

- React Three Fiber.
- Three.js.

---

# UX/UI

- Responsive first.
- Mobile premium.
- Accesibilidad.
- Performance optimizada.
- Scroll suave.
- Motion coherente.

---

# Backend

- NestJS.
- Prisma ORM.
- Arquitectura modular.
- DTOs estrictos.
- Validaciones.

---

# Seguridad

- Sanitización inputs.
- Rate limiting.
- Variables entorno.
- JWT.
- Logs.

---

# Git Workflow

Commits claros.

Formato:

```txt
feat:
fix:
refactor:
style:
docs:
```

---

# Regla Crítica

NO implementar funcionalidades no aprobadas.

Siempre:

1. explicar,
2. validar,
3. implementar.

---

# Performance

Objetivos:

- Lighthouse 90+
- carga rápida,
- optimización imágenes,
- lazy loading,
- rendering eficiente.
