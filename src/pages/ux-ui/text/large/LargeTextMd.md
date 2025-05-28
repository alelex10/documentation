# Textos en la web

### 1. Ancho de texto recomendado:

- **45-75 caracteres por línea** (≈ 300-500 px o 45–75 _ch_).
#### ejemplo:
warnin_(completar ejemplo)_
  ```css
  .texto {
  	max-width: 75ch; /* Alternativa a pixels */
  	margin: 0 auto; /* Centra el contenido */
  }
  ```

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nam sed ratione rerum maiores doloremque nesciunt, officiis suscipit exercitationem eos inventore voluptas quis commodi omnis. Ut ipsam recusandae laboriosam sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolore dicta est sed recusandae, impedit et obcaecati esse laborum corrupti maiores, ullam eaque dolor quasi excepturi voluptatibus velit. Dolor, eaque.

### 2. Otras recomendaciones UX/UI:

- **Altura de línea (_line-height_):**
  - 1.4–1.6 veces la fuente (ej. `line-height: 1.5;` para 16px).
  - Mejora la legibilidad al separar líneas.
- **Tamaño de fuente:**
  - _16px–18px_ para texto principal.
  - Evita fuentes menores de 14px.
  - _para esta pagina, para el texto normal se usa 16px y para el codigo 14px_
- **Contraste visual:**

  - Relación de contraste ≥ **4.5:1** (texto negro sobre blanco es ideal).
  - Usa herramientas como [WebAIM Contrast Checker](https://webaim.org/).

- **Espaciado y alineación:**

  - _Alinear a la izquierda_ para textos largos (evita justificado, crea "río de texto").
  - Márgenes entre párrafos (ej. `padding-bottom: 1.5em;`).

- **Responsividad:**

  - Usa unidades relativas (`em`, `%`, `vw`) para adaptarse a dispositivos.

  ```css
  @media (max-width: 600px) {
  	.texto {
  		font-size: 14px;
  		max-width: 90%;
  	}
  }
  ```

- **Jerarquía visual:**

  - Destaca títulos con negritas (_bold_) o tamaño mayor.
  - Usa negritas (_no subrayados_) para palabras clave (ex: `font-weight: 500;`).

- **Espaciamiento interléxico:**
  - Evita excesivo espaciado (`letter-spacing`) en bloques largos de texto.

Aplica estas regulas junto auebas de usabilidad y pruebas A/B para ajustar según el diseño específico.

<!-- GitHib Markdown Lint Config -->