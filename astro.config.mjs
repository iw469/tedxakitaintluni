import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { loadEnv } from "vite";

const { SITE_URL: site } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});