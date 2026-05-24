# SESSION LOG — WEBSITE GAT

**Última actualización:** 2026-05-24 07:00 AM

---

## Sesión 001 — 2026-05-24

### Completado

- Sprint 1: Design tokens, tailwind.config.ts, globals.css, componentes UI base
- Sprint 2: Navbar, Footer, PageWrapper, layout.tsx, fuentes Google
- Sprint 3: HeroSection, StatsSection, ServicesGrid, CTASection, app/page.tsx
- Sprint 4: Sistema holograma Alexandro completo (AlexandroWidget, efectos CSS, panel chat)
- Sprint 5: 6 páginas internas (Nosotros, Servicios, Alexandro, Academy, Soporte, Contacto)
- Sprint 5b: Página Productos con Seguridad Electrónica
- Efectos visuales por página: warp speed, vórtice, hipercubo, tilt 3D, parallax
- Responsive mobile/tablet audit completo
- Deploy en producción: grupoaxmtechnology.com (Hostinger Node.js)
- CI/CD automático: push a main → redeploy automático en Hostinger

### Pendiente

- ⚠️ Deuda #1: Glow orbs no visibles en HeroSection — revisar z-index y opacity
- ⚠️ Deuda #2: Limpiar assets de branding del .gitignore (Grupo AXM Logo/, Alexandro Imagenes/)
- Sprint 6: Secciones faltantes en Home (preview Alexandro, preview Academy, preview Nosotros)
- Sprint 7: Formularios funcionales sin backend (contacto, tickets via WhatsApp/email)
- Sprint 8: Backend NestJS — sistema de tickets, certificados, dashboard
- Conectar agente IA real de Alexandro.app al widget del sitio
- Auditoría visual completa en producción (móvil real)

### Cómo hacer deploy

1. Hacer cambios en local
2. Compilar: `node node_modules/next/dist/bin/next build`
3. Commit: `git add . && git commit -m "tipo(scope): descripción"`
4. Push: `git push origin main`
5. Hostinger redespliega automáticamente en 2-3 minutos
6. Verificar en: grupoaxmtechnology.com

### Comandos útiles

```bash
# Levantar en local
cd "/media/nas_local/Proyectos Grupo AXM Technology/Website GAT"
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start --port 3013 --hostname 0.0.0.0
# Ver en: http://192.168.0.217:3013

# Si el puerto está ocupado
fuser -k 3013/tcp

# Si el build falla por caché del NAS
mkdir -p .next/server/pages
node node_modules/next/dist/bin/next build
```

### Repositorio

- **URL:** https://github.com/geferagabusiness-collab/WebSite-GAT.git
- **Rama principal:** main
