---
layout: "/layout.astro"
---

Excelente pregunta, Alejandro. En Astro podés mezclar contenido `.md` con componentes `.astro` usando **MDX** en lugar de Markdown puro.

---

## ✅ ¿Qué es MDX?

**MDX** es como Markdown, pero te permite **usar componentes Astro (o de React, Svelte, etc.) dentro del contenido**. Ideal para animaciones, elementos interactivos o layouts personalizados dentro de páginas de contenido.

---

## 🛠️ Paso a paso para usar MDX con Content Collections

---

### 📦 1. Instalar soporte para MDX

```bash
npm install @astrojs/mdx
```

Y luego en tu `astro.config.mjs`:

```js
import mdx from '@astrojs/mdx';

export default {
  integrations: [mdx()],
};
```

---

### 📁 2. Usar `.mdx` en lugar de `.md`

Renombrá tus archivos:

```
/src/content/docs/introduccion.mdx
```

Y en ese archivo podés hacer cosas como:

```mdx
---
title: "Introducción"
order: 1
---

# Bienvenido

Este sitio te guiará a través de...

<AvisoImportante />

<AnimacionFondo texto="¡Hola!" />
```

---

### 🔧 3. Importar y usar componentes dentro del `.mdx`

Creamos un componente, por ejemplo:

```astro
---
// src/components/AvisoImportante.astro
---
<div class="bg-yellow-200 p-4 border-l-4 border-yellow-500">
  ⚠️ Este contenido es muy importante, ¡leelo con atención!
</div>
```

Otro con animación simple:

```astro
---
// src/components/AnimacionFondo.astro
const { texto } = Astro.props;
---
<div class="animate-pulse text-xl text-blue-600">{texto}</div>
```

Y luego los importás al comienzo del `.mdx`:

```mdx
import AvisoImportante from '../../components/AvisoImportante.astro';
import AnimacionFondo from '../../components/AnimacionFondo.astro';
```

---

### 📌 4. ¡Listo! Tu contenido puede tener interactividad, animaciones o layouts personalizados dentro de las páginas generadas desde Content Collections.

---

## ⚠️ Cosas a tener en cuenta

* El componente que renderiza el contenido (`Markdown` o `Content`) debe soportar MDX. Con Content Collections, simplemente usá el método `getEntryBySlug()` y renderizalo con `<Content />`:

```astro
---
// Dentro de [...slug].astro o similar
import { getEntryBySlug } from 'astro:content';
import { Content } from 'astro/components';

const { slug } = Astro.params;
const page = await getEntryBySlug('docs', slug.join('/'));
---

<Content content={page} />
```

---

¿Querés que te arme un ejemplo completo que podés clonar o correr localmente con esto ya configurado?
