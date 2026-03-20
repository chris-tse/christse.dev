import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	site:
		process.env.NODE_ENV === 'production'
			? 'https://christse.dev'
			: 'http://localhost:4321',
	integrations: [sitemap(), mdx()],
	trailingSlash: 'never',
})
