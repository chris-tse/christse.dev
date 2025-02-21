import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		published_at: z.date(),
		reading_time: z.number(),
		excerpt: z.string(),
		feature_image: z.string().optional(),
		social_image: z.string().optional(),
	}),
})

export const collections = {
	blog: blogCollection,
}
