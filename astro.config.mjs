import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  site: 'https://iw469.github.io',
  base: '/tedxakitaintluni' ,
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // allow using imports like "@/assets/..." to reference src/
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
