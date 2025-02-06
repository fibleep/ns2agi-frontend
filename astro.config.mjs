// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { fileURLToPath, URL } from 'node:url';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://ns2agi.com",
  vite: {
    resolve: {
      alias: {
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      }
    }
  }
});


