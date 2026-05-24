# ARCHITECTURE CONTRACTS

# Contratos Globales

## Frontend

NO debe depender directamente de la base de datos.

Toda interacción:

Frontend -> API -> Backend

---

# Tickets

Frontend Tickets:

- depende de Backend Tickets,
- depende de Database Tickets.

---

# Certificados

Frontend Certificates:

- depende de Certificates API,
- depende de QR validation service.

---

# Alexandro

Frontend Avatar:

- depende de Animation Engine,
- depende de AI Service,
- depende de Voice Service.

Assets locales del avatar 3D:

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/Alexandro Imagenes/
```

---

# Branding

Todos los módulos visuales:

- dependen de branding centralizado.

Identidad visual oficial:

```txt
/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/Grupo AXM Logo/
```

---

# Motion System

Todas las animaciones:

- deben respetar el motion system global.
