import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
import compress from 'astro-compress'

// https://astro.build/config
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    partytown(),
    compress(),
    prefetch(),
    mdx(),
  ],
  output: 'static',
  site: 'https://kalkafox.github.io',
})
