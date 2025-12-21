import { z, defineCollection } from 'astro:content'

const key = import.meta.env.MARBLE_WORKSPACE_KEY
const url = import.meta.env.MARBLE_API_URL

const postSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	content: z.string(),
	description: z.string(),
	coverImage: z.string().url().nullable(),
	publishedAt: z.coerce.date(),
	authors: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			image: z.string().url(),
		}),
	),
	category: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
	}),
	tags: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			slug: z.string(),
		}),
	),
	attribution: z
		.object({
			author: z.string(),
			url: z.string().url(),
		})
		.nullable(),
})

type Post = z.infer<typeof postSchema>

const postsCollection = defineCollection({
	schema: postSchema,
	loader: async () => {
		if (!url || !key) {
			console.warn('Marble CMS credentials not configured, skipping posts fetch')
			return {}
		}
		try {
			const response = await fetch(`${url}/${key}/posts`)
			const { posts }: { posts: Post[] } = await response.json()
			return Object.fromEntries(posts.map((post) => [post.id, post]))
		} catch (error) {
			console.error('Failed to fetch posts from Marble CMS:', error)
			return {}
		}
	},
})

export const collections = {
	posts: postsCollection,
}
