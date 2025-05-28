---
layout: "/layout.astro"
---

Sí, aquí hay formas de representar **advercencias (warnings) y errores (errors)** en archivos Markdown, con ejemplos prácticos:

---

### 1. **Blocques de Advertencias/Errores**
Usando **códigos de bloque** con emojis o clases para estilos:
```markdown
```warning
⚠️ **ATENCIÓN**: El archivo está en edición colaborativa.  
No borrar la sección *Configuración*.
```


```error
❌ **ERROR 404**:  
El archivo `src/script.js` no se encuentra.  
Verifique la ubicación.
```

```
### 🔴 `Error: Invalid Credentials`  
Verifique usuario y contraseña.
```

---

### 2. **Uso de HTML (para plataformas que lo permitan)**
```markdown
<details>
<summary>🚨 Datos Sensibles (Expandido)</summary>
¡Esta variable es visible en producción!
```python
SECRET_TOKEN = "ejemplo_inseguro"
```
</details>
```

### 3. **Notas y Errores con Bloques de Código**
```markdown
### ⚠️ Nota Importante
```note
Este cambio afecta a producción.  
Requiere aprobación.
```

### Error en Migración
```diff
-老版本的 ruta: /old_api
+Nueva ruta: /v2/new_api/endpoint
```
---

### 4. **Tablas para Errores Sistema**
```markdown
| CÓDIGO | MENSAJE          | SOLUCIÓN               |
|--------|------------------|-----------------------|
| `E_001` | Archivo no encontrado | Verificar la extensión .md |
| `E_002` | Formato inválido  | Usar doble espacio al final |
```

---

### 5. **Enlaces con Iconos**
```markdown
[❗ Corregir error de gramática en sección 3](#section3)  
[⚠️ Riesgo de SOBRECARGA al ejecutar](#fix)
```

---

### 6. **Errores Sintaxis en Código**
```markdown
Error en línea 3:
```python
    def error(): 
        print("¡Cuidado!"  # 🆘 Falta cerrar el paréntesis!
```
```

---

### 7. **Markdown en GitHub Flavored Markdown (GFM)**
**Casos comunes:**
```markdown
⚠️ **Warning**: Esta pull request no pasó los tests.  
❌ **Error**: `Clase 'Main' no definida` en *app.py*.  
💡 **Sugerencia**: Verificar dependencias (npm install).
```

---

### 8. **Variables o Errores Dinámicos**
Para logs o documentación técnica:
```markdown
### Logs de Error:
```
2023-10-15 10:00:00 ERROR 500: Internal Server Error  
Cause: [FileNotFoundException](url)
```

### Variables Sensibles:
```env
# ⚠️ No commitear este archivo!
DB_PASSWORD=production_sec_123  # ❌ No debe ir a Git
```
```

---

### 9. **Formato para Errores en APIs**
```markdown
### Respuesta 401 (Error Autenticación):
```json
{
  "error": "Token expirado",
  "retry_after": 90
}
```

---

### ¿Cómo funcionan?
- Los **emojis** (⚠️, ❌, etc.) funcionan en la mayoría de editores (GitHub, GitLab, VSCode).
- Los bloques de código con IDs como `warning`, `error` requieren que el lector soporte **syntax highlight** (VSCode, Previewers).
- Las tablas y HTML `<details>` son ampliamente compatibles en GitHub, Jekyll o Docusaurus.

¿Necesitas un ejemplo específicamente para un uso como *documentos de errores*, *APIs*, o *logs técnico*? 😊

