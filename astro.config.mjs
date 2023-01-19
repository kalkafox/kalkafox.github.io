import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
import react from "@astrojs/react"

// https://astro.build/config
import deno from "@astrojs/deno"

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://kalkafox.github.io",
  output: "server",
  adapter: deno()
});