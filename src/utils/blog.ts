export const getSlug = (id: string) =>
	id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
