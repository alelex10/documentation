import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import remarkMermaid from 'remark-mermaidjs'

// https://astro.build/config
export default defineConfig({

  markdown: {
    remarkPlugins: [remarkMermaid]
  },
  build: {
    viewTransitions: {
      // Define animaciones de fallback
      fallbackName: "default",
      fallbackDuration: 300,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [expressiveCode(), mdx()],
});