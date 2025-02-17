/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly UMAMI_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
	readonly GHOST_URL: string
	readonly GHOST_CONTENT_API_KEY: string
}
