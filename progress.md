# Progress Log

## Codebase Patterns

- Astro v6 Codebase
- Typescript

## Important Files

- MIGRATE_TASKS.md - the overall implementation tasks

## 2026-03-13 Init Progress

- Started progress file
- Inserted sample progress log

## 2026-03-13 Task 1: Create TerminalLayout.astro

- Created `src/layouts/TerminalLayout.astro` with props: `title`, `description?`, `canonical?`, `socialImage?`
- Head includes: `<ClientRouter />`, charset, viewport, title with `" | Chris Tse - Frontend Engineer"` suffix
- Meta: description with sensible default, canonical URL resolution, sitemap link
- Favicons: apple-touch-icon, 32x32, 16x16, webmanifest
- Open Graph tags: og:title, og:description, og:type, og:url, og:image, og:site_name
- Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator (@ChrisMTse)
- JetBrains Mono via Google Fonts (weights 400, 500, 600, 700, 800)
- Analytics component included
- Imports global.css
- Body contains only `<slot />` — terminal chrome is NOT part of the layout
- Smooth scroll with prefers-reduced-motion support
- Commit: `feat: create TerminalLayout.astro with terminal-themed head infrastructure`

## 2026-03-13 Task 2: Create TerminalWindow.astro wrapper component

- Created `src/components/terminal/TerminalWindow.astro`
- Props: `title?: string` (defaults to `"christse@portfolio ~"`)
- Markup: `.terminal` > `header.terminal-bar` (dots + title + spacer) + `main.terminal-body` > `<slot />`
- Scoped styles extracted from experimental-5: `.terminal`, `.terminal-bar`, `.bar-dots`, `.dot` (red/yellow/green), `.bar-title`, `.bar-spacer`, `.terminal-body`
- Includes responsive styles for mobile (< 700px): narrower width, no border-radius, reduced padding
- Verified: `bun astro check` — 0 errors, `bun run build` — clean build
- Commit: `feat: create TerminalWindow.astro reusable terminal chrome component`

## 2026-03-13 Task 3: Create CrtOverlay.astro

- Created `src/components/terminal/CrtOverlay.astro`
- Markup: two `div`s (`.scanlines` and `.crt-flicker`), both `aria-hidden="true"`
- Scoped styles extracted from experimental-5:
  - `.scanlines`: `position: fixed`, full viewport, `z-index: 100`, repeating linear gradient (2px transparent + 2px dark scanlines)
  - `.crt-flicker`: `position: fixed`, full viewport, `z-index: 99`, 8s infinite flicker animation with subtle green tint
  - Added `will-change: opacity` to `.crt-flicker` for GPU compositing (new vs experimental-5)
- `prefers-reduced-motion`: disables animation and sets opacity to 0 on `.crt-flicker`
- Verified: `bun astro check` — 0 errors, `bun run build` — clean build
- Ran `bun format:write` — formatting applied
- Commit: `feat: create CrtOverlay.astro with scanline and flicker effects`

## 2026-03-13 Task 4: Create terminal section components

- Created all 9 terminal section components in `src/components/terminal/`:
  - **TerminalBoot.astro** — system boot messages with `[system]` prefixes marked `aria-hidden`; scoped styles for `.sys-line`, `.prompt-sys`, `.success`
  - **TerminalHero.astro** — ASCII art name + `cat tagline.md` output; Props: `asciiName: string[]`; responsive `clamp()` font sizing for ASCII art; scoped styles for `.ascii-art`, `.md-output`, `.md-heading`
  - **TerminalAbout.astro** — NEW section styled as `$ cat about.md`; content from About.astro (7+ years experience, community involvement, hobbies); two paragraphs with proper spacing
  - **TerminalSkills.astro** — `ls ~/skills/` grid; Props: `skills: string[]`; staggered `typeIn` animation with CSS custom property `--i`; `prefers-reduced-motion` support
  - **TerminalCareer.astro** — todo-list career history; Props: `workHistory` array, `toolNames: string[]`; reversed chronological order; latest role marked `in-progress` with subagent block and tool-call pairs; responsive mobile layout (single-column tool-call pairs); `prefers-reduced-motion` support for pulse-glow animation
  - **TerminalProjects.astro** — `find ~/projects` listing; Props: `projects` array; clickable cards with tech tags; hover effects (green border glow, OPEN label); `prefers-reduced-motion` support
  - **TerminalContact.astro** — `christse --contact --list`; Props: `contactLinks` array; hover effects with arrow reveal; proper `target`/`rel` handling for mailto vs external links; `prefers-reduced-motion` support
  - **TerminalPrompt.astro** — blinking cursor with `step-end` animation; `prefers-reduced-motion` support
  - **TerminalFooter.astro** — footer bar with session info; responsive mobile layout (column direction at 700px)
- All decorative `$` prompts and `[system]` prefixes marked with `aria-hidden="true"`
- Each component has self-contained scoped styles extracted from experimental-5
- Data passed via props (no direct JSON imports in components — page passes data down)
- Verified: `bun astro check` — 0 errors, `bun run build` — clean build (14 pages)
- Ran `bun format:write` — formatting applied
- Commit: `feat: create terminal section components for homepage migration`

## 2026-03-13 Task 5: Create terminal navigation

- Created `src/components/terminal/TerminalNav.astro`
- Props: `hrefs?` object with optional overrides for `about`, `skills`, `projects`, `blog`, `contact` (defaults to anchor links `#about`, `#skills`, `#projects`, `/blog`, `#contact`)
- Bracketed terminal-style links: `[about]`, `[skills]`, `[projects]`, `[blog]`, `[contact]`
- Blog link detects active route via `Astro.url.pathname` and highlights with `.active` class
- Mobile (< 700px): CSS-only toggle using hidden checkbox + label — no JavaScript required
  - `[menu]` / `[x]` toggle label shown on mobile
  - Nav links collapse into dropdown positioned absolutely below terminal bar
  - Dark dropdown with border, shadow, and rounded bottom corners
- Skip-to-content link: `<a href="#main-content" class="skip-link">` — hidden until focused, then appears at top-left with green terminal styling
- Focus-visible indicators: green outline on all nav links for keyboard navigation
- `prefers-reduced-motion`: disables transitions on nav links and toggle
- Updated `TerminalWindow.astro` to accept `<slot name="nav" />` in the terminal bar for nav composition
- Added `position: relative` to `.terminal-bar` for mobile dropdown positioning
- Verified: `bun astro check` — 0 errors, `bun run build` — clean build (14 pages)
- Ran `bun format:write` — formatting applied
- Commit: `feat: create TerminalNav.astro with terminal-themed navigation`
