import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site:
		process.env.NODE_ENV === 'production'
			? 'https://christse.dev'
			: 'http://localhost:4321',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	trailingSlash: 'never',
})
