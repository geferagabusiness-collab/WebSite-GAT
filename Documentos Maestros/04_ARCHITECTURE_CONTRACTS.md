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

---

# Branding

Todos los módulos visuales:

- dependen de branding centralizado.

---

# Motion System

Todas las animaciones:

- deben respetar el motion system global.
