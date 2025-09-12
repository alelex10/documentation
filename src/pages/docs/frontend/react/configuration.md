---
layout: "/layout.astro"
---

# Implementar PATH alias en Vite con TS

Les paso como debe estar configurado el archivo tsconfig.app.json y vite.config.ts:

- En el archivo tsconfig deben agregar: 

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

- En el archivo vite.config.ts deben tener:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

> Es importante que para que les funcione instalen los tipos de node `pnpm add -D @types/node`, por alguna razón no lo instala por defecto Vite en la versión 7.
