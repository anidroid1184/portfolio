# .opencode/RULES.md

**REGLAS CORE — NO negociables**

---

## 1. ENTORNO ESTRICTO

```bash
# TODO comando DEBE prefijarse con mise x --
mise x -- ng serve
mise x -- ng test
mise x -- ng build
mise x -- npm run lint
```

**Por qué**: Asegura versiones correctas de Node y Angular CLI.

---

## 2. PROTECCIÓN

```bash
# ✅ Usar sd para editar
sd 'old_text' 'new_text' file.ts

# ❌ NO write para editar
write --file file.ts  # NO sobreescribe correctamente
```

**NO eliminar:**
- Comentarios de infraestructura (Docker, k8s)
- Headers de license
- Configuraciones de build

---

## 3. OBSERVABILIDAD

Implementar console.log/debug en desarrollo para verificar resultados.

```typescript
// ✅ Logger en desarrollo
console.log('[DEBUG] projects:', projects);

// ❌ Sin logging = debugging ciego
getProjects() { return this.projects; }
```

---

## 4. VERIFICACIÓN ANTE TODO

Antes de proceder al siguiente paso:

| Pregunta | Si NO |
|----------|-------|
| ¿El resultado es real? | INVESTIGAR más |
| ¿No rompe nada? | REVERTIR cambios |
| ¿Tests pasan? | CORREGIR |
| ¿Se confirmó con usuario? | DETENER y PREGUNTAR |

---

## 5. DOCUMENTACIÓN VIVA

```bash
# Actualizar docs después de cada tarea
docs/tasks.md    # Marcar [x] completada
docs/verify.md   # Agregar resultado
```

---

**Violar estas reglas = PÉRDIDA DE TIEMPO y ERRORES en producción.**