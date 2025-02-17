import type { PostsOrPages } from '@tryghost/content-api'

export interface BlogPostLayoutProps {
	title: string
	pubDate: Date
	heroImage?: string
	description?: string
	html?: string
}

export type GhostPost = PostsOrPages
