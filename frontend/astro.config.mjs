import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  base:'/',
    integrations: [tailwind()],
  outDir: 'dist',
  vite: { build: { sourcemap: true } }
});