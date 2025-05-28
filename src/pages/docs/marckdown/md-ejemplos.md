---
layout: "/layout.astro"
---
# Elementos de Markdown
### **Elementos Básicos de Markdown**

#### 1. **Encabezados**
```markdown
# H1 (Título principal)
## H2 (Subtítulo)
### H3 (Sub-subtítulo)
#### H4
##### H5
###### H6
```

#### 2. **Énfasis**
```markdown
**Negrita** (o __negrita__)
*Itálica* (o _itálica_)
~~Tachado~~
**_Combinado_**
```

#### 3. **Listas**
- **No ordenadas**:  
  ```markdown
  - Frutas  
    - Manzana  
    - Banana  
  - Verduras  
    - Lechuga  
  ```

- **Ordenadas**:  
  ```markdown
  1. Primer paso  
  2. Segundo paso  
     a. Subpaso (niveles con tabulación)  
  ```

#### 4. **Enlaces e Imágenes**
```markdown
[Ejemplo de enlace](https://ejemplo.com)  
![Alt texto](/ruta/imagen.jpg "Título opcional")  
[![Imagen con enlace](imagen.jpg)](https://ejemplo.com)
```

#### 5. **Código**
```markdown
`código corto`
-block code-
```python
def hola():
    print("¡Hola, mundo!")
```
```

#### 6. **Líneas Horizontales**
```markdown
---
*** 
___
```

#### 7. **Tablas**
```markdown
| Frutas  | Color    | Cantidad |
|---------|----------|---------:|
| Manzana | Rojo     |     10   |
| Banana  | Amarillo |     20   |
```

#### 8. **Citas**
```markdown
> Esta es una cita larga.  
>> Puedes anidar citas.
```

---

### **Elementos Avanzados**

#### 9. **Escapar caracteres**
```markdown
\*Este no es itálica*  
\( parentesis, \# numeral sin formato)
```

#### 10. **Footnotes**
```markdown
Esta es una nota[^1].  
[^1]: Contenido de la nota.
```

#### 11. **YAML Front Matter (para blogs)**
```markdown
---
title: "Tutorial de Markdown"
date: 2023-10-10
---
```

#### 12. **Checklist (GitHub flavored)**
```markdown
- [x] Tarea hecha  
- [ ] Por hacer  
  - [ ] Sublista con tarea
```

#### 13. **Highlights (GFM)**
```markdown
==Texto resaltado==
```

---

### **Ejemplo Completo**
```markdown
# Cómo preparar café

## Ingredientes
- Café molido
- Agua
- Azúcar (opcional)

### Instrucciones
1. Calienta el agua a 90°C.  
2. Combina 1 cucharada de café por cada 50ml de agua.

> **Nota**: No sobreexponer más de 4 minutos.

| Tamaño | Grano (g) |
|-------|-----------|
| Chica | 5         |
| Grande| 15        |

![Café espresso](imagen.jpg)

Referencia: [Guía de cafeterías](https://café.com/)
```

---

### **Notas Importantes**
1. Usar 2 espacios al final de línea para saltos de línea.
2. Los acentos requieren `&aacute;` en algunos renderizadores simples.
3. GitHub/GitLab soportan extensiones como tablas, checklists, y bloquessyntax-highlight.