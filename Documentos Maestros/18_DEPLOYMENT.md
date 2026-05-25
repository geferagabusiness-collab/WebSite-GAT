# DEPLOYMENT — WEBSITE GAT

**Última actualización:** 2026-05-24 07:00 AM

---

## Producción

| Campo | Valor |
|---|---|
| URL | grupoaxmtechnology.com |
| Plataforma | Hostinger Node.js (Web Hosting Business) |
| Framework | Next.js 15 |
| Node | 20.x |
| CI/CD | Automático — push a `main` dispara redeploy |

---

## Repositorio

https://github.com/geferagabusiness-collab/WebSite-GAT.git

---

## Flujo de deploy

```bash
git add .
git commit -m "tipo(scope): descripción"
git push origin main
```

Hostinger redespliega en 2-3 minutos automáticamente.

---

## Alexandro IA (Gemini) en producción

El chat usa la ruta interna de Next.js: `POST /api/alexandro/chat` (no requiere el backend Nest en Hostinger).

### Variable obligatoria en Hostinger

En el panel de la app Node.js → **Environment variables**:

| Variable | Valor |
|----------|--------|
| `GEMINI_API_KEY` | Tu API key de Google AI Studio (la misma que en `backend/.env` local) |

Guardar y **redeploy** (o esperar el redeploy tras `git push`).

### Verificación

1. Abrir https://grupoaxmtechnology.com
2. Clic en **Hablar con Alexandro**
3. Enviar un mensaje de prueba

Si falla: revisar logs en Hostinger y que `GEMINI_API_KEY` esté definida sin espacios extra.

### Desarrollo local

Copiar la key a `.env.local` en la raíz del proyecto (ver `.env.local.example`). Con `npm run dev` basta el puerto del front; no hace falta Nest salvo que uses `NEXT_PUBLIC_ALEXANDRO_API_URL`.

---

## Infraestructura adicional

- **VPS Hostinger IP:** 2.24.102.82
- **Uso actual VPS:** Proyecto Alexandro.app
- **Repo infraestructura:** https://github.com/geferagabusiness-collab/Infraestructura-proyectos-gat.git

---

## Correos activos — NO eliminar

- **Dominio:** grupoaxmtechnology.com
- **Proveedor:** Hostinger
