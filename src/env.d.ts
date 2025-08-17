/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly UMAMI_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
	readonly MARBLE_API_URL: string
	readonly MARBLE_WORKSPACE_KEY: string
}
