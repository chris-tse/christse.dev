import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: any) {
	const posts = await getCollection('posts')

	const items = posts
		.sort((a, b) => {
			return (
				new Date(b.data.publishedAt).valueOf() -
				new Date(a.data.publishedAt).valueOf()
			)
		})
		.map((post) => ({
			title: post.data.title,
			pubDate: new Date(post.data.publishedAt),
			description: post.data.description,
			link: `/blog/${post.id}/`,
		}))

	return rss({
		title:
			'Blog | Chris Tse - Coder, Gamer, Keyboard & PC Enthusiast, Anime Fan',
		description:
			'Chris Tse is a frontend engineer, performance optimization specialist, and PC & mechanical keyboard enthusiast who likes to build stuff for the web.',
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items,
		customData: `<language>en-us</language>`,
		stylesheet: '/rss.xsl',
	})
}
