---
layout: "/layout.astro"
---

# CSS Module

- Los archivos CSS se deben importar con la extensió `.module.css`
- Los nombres deben ser camelCase, por ejemplo: `containerArticle`

## Ejemplo de creacion de las clases

`style.module.css`

```css
.containerArticle {
  background-color: red;
  width: 100px;
  height: 100px;
}

.buttonBlue {
  background-color: blue;
}
```

### Ejemplo de uso

```JSX
import styles from "./style.module.css";
// uso solo la clase que quiero
// tiene auto completado
<div class={styles.containerArticle}></div>
```
