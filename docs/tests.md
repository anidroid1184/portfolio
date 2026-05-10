# Tests — lading-portafolio

> Engram Topic: `project/lading-portafolio/tests`

---

## 📋 Plan de tests

---

## 1. Unit Tests (Vitest)

### Componentes
- `header.component.spec.ts` — Navegación, links
- `footer.component.spec.ts` — Links, copyright
- `project-card.component.spec.ts` — Display, click handlers

### Servicios
- `projects.service.spec.ts` — getProjects(), getProjectById()

---

## 2. Coverage Target

| Componente | Target |
|------------|--------|
| Services | >90% |
| Components | >70% |
| Total | >80% |

---

## 3. Ejecución

```bash
mise x -- ng test --coverage
```

---

## 4. E2E Tests (Playwright)

- Home page loads
- Navigation works
- Project detail opens

---

**Última actualización:** 10 Mayo 2026