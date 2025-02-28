import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: any) {
	const blog = await getCollection('blog')

	const items = blog
		.sort((a, b) => {
			return (
				new Date(b.data.published_at).valueOf() -
				new Date(a.data.published_at).valueOf()
			)
		})
		.map((post) => ({
			title: post.data.title,
			pubDate: new Date(post.data.published_at).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			description: post.data.excerpt,
			link: `/blog/${post.slug}/`,
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
