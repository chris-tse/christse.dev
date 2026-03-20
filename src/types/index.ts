export interface WorkHistoryItem {
	employer: string
	title: string
	dateRange: string
	description: string[]
}

export interface Project {
	name: string
	description: string
	href: string
	technologies: string[]
}

export interface ContactLink {
	label: string
	href: string
	cmd: string
}

export interface ProfileInfoItem {
	key: string
	value: string
}
