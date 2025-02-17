import 'dotenv/config'
import GhostContentAPI from '@tryghost/content-api'
import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

if (!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY) {
	throw new Error(
		'GHOST_URL and GHOST_CONTENT_API_KEY must be set in environment variables',
	)
}

// Initialize the Ghost API client
const api = new GhostContentAPI({
	url: process.env.GHOST_URL,
	key: process.env.GHOST_CONTENT_API_KEY,
	version: 'v5.0',
})

async function backupGhostContent() {
	try {
		// Get all posts from Ghost
		const posts = await api.posts
			.browse({
				limit: 'all',
				include: ['tags'],
			})
			.catch((err: Error) => {
				console.error(err)
				return []
			})

		// Create backup directory with current date
		const date = format(new Date(), 'yyyy-MM-dd')
		const backupDir = path.join(
			process.cwd(),
			'backups',
			date,
		)

		// Ensure backup directory exists
		fs.mkdirSync(backupDir, { recursive: true })

		// Process each post
		for (const post of posts) {
			const fileName = `${post.slug}.md`
			const filePath = path.join(backupDir, fileName)

			// Create markdown content with frontmatter
			const content = `---
title: ${post.title}
description: ${post.excerpt || ''}
date: ${post.published_at}
updated: ${post.updated_at}
tags: ${post.tags?.map((tag) => tag.name).join(', ') || ''}
---

${post.html}
`

			// Write to file
			fs.writeFileSync(filePath, content, 'utf-8')
			console.log(`Backed up: ${fileName}`)
		}

		console.log(`\nBackup completed successfully! Files saved to: ${backupDir}`)
	} catch (error) {
		console.error('Error backing up Ghost content:', error)
	}
}

backupGhostContent()
