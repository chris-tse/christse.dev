# Agent Guidelines for christse.dev

## Build/Test Commands

- **Dev**: `bun dev`
- **Build**: `bun build`
- **Preview**: `bun preview`
- **Format**: `bun format:write` (check with `bun format:check`)
- **Type check**: `bun astro check`
- **Package management**: Always use `bun` (never npm/yarn)

## Code Style

- **Formatting**: Tabs (width 2), single quotes, no semicolons, trailing commas
- **Run `bun format:write` after making changes to .astro files**
- **TypeScript**: Strictest config (`astro/tsconfigs/strictest`)
- **Imports**: ES modules only (`"type": "module"`)
- **Naming**: kebab-case for components (e.g., `Work-Item.astro`)
- **Astro components**: Use frontmatter for logic, destructure props clearly
- **Content**: Use Zod schemas for type safety (see `src/content/config.ts`)

## Project Structure

- Personal portfolio site built with Astro + Tailwind CSS
- Blog content in `src/content/blog/` with markdown
- Components in `src/components/`, layouts in `src/layouts/`
- Static pages in `src/pages/`
