# Plan — lading-portafolio

> Engram Topic: `project/lading-portafolio`

---

## 🎯 Objetivo

Portafolio personal de Juan Sebastián usando Angular 21, Vitest, Tailwind CSS v4.

---

## 🔍 Stack tecnológico

- **Framework:** Angular 21.2.1
- **Testing:** Vitest + jsdom
- **Styling:** Tailwind CSS v4 + PostCSS
- **Package manager:** npm@11.8.0
- **Node:** v24.15.0 (via mise)
- **TypeScript:** ~5.9.2

---

## 📋 Estructura actual

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   └── services/
├── public/
└── styles.css
```

---

## 📋 Fases

### Fase 1: Golden Template ✅
- [x] docs/plan.md
- [x] docs/specs.md
- [x] docs/tasks.md
- [ ] docs/tests.md
- [ ] docs/verify.md

### Fase 2: Mejoras pendientes
- [ ] Agregar componentes interactivos
- [ ] Mejorar SEO
- [ ] Optimizar performance (Core Web Vitals)
- [ ] Agregar tests E2E

---

## 🔧 Comandos mise

```bash
mise x -- npm run start    # Dev server
mise x -- npm run build    # Production build
mise x -- npm run test     # Vitest
mise x -- npm run lint     # ESLint + Prettier
```

---

## 📊 Métricas de éxito

| Métrica | Target |
|---------|--------|
| Tests | 100% passing |
| Coverage | >80% |
| Lint | 0 errors |
| Performance | LCP <2.5s, CLS <0.1 |

---

**Última actualización:** 10 Mayo 2026