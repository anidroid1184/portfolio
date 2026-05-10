# Specs — lading-portafolio

> Engram Topic: `project/lading-portafolio/specs`

---

## 🎯 Propósito

Portafolio personal que muestra trabajos, proyectos y habilidades de Juan Sebastián.

---

## 1. Stack

| Componente | Versión |
|------------|---------|
| Angular | 21.2.1 |
| TypeScript | 5.9.2 |
| Tailwind CSS | 4.1.12 |
| Vitest | 4.0.8 |
| Node | 24.15.0 |

---

## 2. Estructura de componentes

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── project-card/
│   │   └── skill-badge/
│   ├── pages/
│   │   ├── home/
│   │   ├── projects/
│   │   └── about/
│   └── services/
│       └── projects.service.ts
├── public/
│   └── assets/
└── styles.css
```

---

## 3. Reglas Golden Template

| ID | Regla | Aplicación |
|----|-------|------------|
| R1 | mise x -- | Usar mise para todos los comandos |
| R2 | No SQLite | N/A (proyecto frontend) |
| R3 | sd-edit | Usar `sd` para editar archivos |
| R4 | Observabilidad | Console.log en desarrollo, remove en producción |

---

## 4. Testing

| Tipo | Herramienta | Target |
|------|-------------|--------|
| Unit | Vitest | >80% coverage |
| Component | Vitest + Angular Testing Library | Todos los componentes |
| E2E | Playwright | Flows principales |

---

## 5. Pre-commit hooks

- ESLint
- Prettier (formato)
- Vitest (unit tests)

---

**Última actualización:** 10 Mayo 2026