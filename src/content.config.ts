import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const posts = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		coverImage: z.url().transform(String).nullable().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
})

export const collections = { posts }
