import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
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

  integrations: [mdx()],
});