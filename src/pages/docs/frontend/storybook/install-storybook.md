---
layout: "/layout.astro"
---

# Instalación de Storybook

**inicializar proyecto react**

- no pude instalarlo con **react router framework**
  - el template con las configuraciones de react router, tiene conflicto con storybook
  - lo hice correr con **react router** en su version mas vasica
- instalar los tipos de node ``pnpm install @types/node``
- configurar **tailwindcss** con **storybook**

```bash
pnpm create vite@latest <project-name> -- --template react-ts
```

**instalar Storybook**

```bash
npm install -D @storybook/react-vite @storybook/addon-a11y @storybook/addon-docs @storybook/addon-vitest @storybook/test-runner @vitejs/plugin-react vitest playwright @vitest/coverage-v8
```
o
```bash
pnpm create storybook@latest
```

**incializar Storybook**

- __onboarding__: es una serie de preguntas que te ayudan a configurar Storybook para tu proyecto

```bash
npx storybook@latest init

? New to Storybook? » - Use arrow-keys. Return to submit.
>   Yes: Help me with onboarding # si ese nuevo 
    No: Skip onboarding \& dont ask again

? What configuration should we install? » - Use arrow-keys. Return to submit.
>   Recommended: Component dev, docs, test # recomendado para no configurarlo yo mismo
    Minimal: Component dev only

```

**install tailwindcss**

```bash
# se instala la versión 3 de tailwind porque la 4 tiene una configuración diferente
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init 
```
