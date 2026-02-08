import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		coverImage: z.string().url().nullable().optional(),
		tags: z.array(z.string()).default([]),
	}),
})

export const collections = { posts }
