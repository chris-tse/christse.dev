import GhostContentAPI from '@tryghost/content-api'

// Initialize the Ghost API client
const api = new GhostContentAPI({
	url: import.meta.env.GHOST_URL,
	key: import.meta.env.GHOST_CONTENT_API_KEY,
	version: 'v5.0',
})

// Get all posts
export async function getAllPosts() {
	return await api.posts
		.browse({
			limit: 'all',
			include: ['tags'],
		})
		.catch((err: Error) => {
			console.error(err)
			return []
		})
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
	return await api.posts
		.read({
			slug,
		})
		.catch((err: Error) => {
			console.error(err)
			return null
		})
}

// Get all tags
export async function getAllTags() {
	return await api.tags
		.browse({
			limit: 'all',
		})
		.catch((err: Error) => {
			console.error(err)
			return []
		})
}
