import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  site: 'https://iw469.github.io',
  base: '/tedxakitaintluni',
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['virtual:astro-icon']   // ← this is the key line
      }
    }
  }
});
