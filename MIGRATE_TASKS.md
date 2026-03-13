# Terminal Migration — Tasks

Each task below is independently executable. Tasks are ordered by dependency.
Status key: `[ ]` pending, `[~]` in progress, `[x]` done, `[-]` skipped/cancelled.

---

## Task 1: Create `TerminalLayout.astro`

Build a shared layout that provides all `<head>` infrastructure (meta, favicons,
manifest, canonical, sitemap, analytics, fonts, ClientRouter) while allowing the
terminal body chrome. This replaces the current `Layout.astro` as the primary
layout for terminal-themed pages.

- [ ] Create `src/layouts/TerminalLayout.astro` with these props:
  - `title: string`
  - `description?: string`
  - `canonical?: string`
  - `socialImage?: string`
- [ ] Include in `<head>`:
  - `<ClientRouter />` (from `astro:transitions`)
  - `<meta charset>`, `<meta viewport>`
  - `<title>` with suffix `" | Chris Tse - Frontend Engineer"`
  - `<meta name="description">` with sensible default
  - `<link rel="canonical">` (resolve from `Astro.site` + `Astro.url` if not
    provided)
  - `<link rel="sitemap" href="/sitemap-index.xml" />`
  - Favicon links (apple-touch-icon, 32x32, 16x16)
  - `<link rel="manifest" href="/site.webmanifest" />`
  - Open Graph meta tags (`og:title`, `og:description`, `og:type`, `og:url`,
    `og:image`, `og:site_name`)
  - Twitter Card meta tags (`twitter:card`, `twitter:title`,
    `twitter:description`, `twitter:image`, `twitter:creator`)
  - JetBrains Mono via Google Fonts (weights 400, 500, 600, 700, 800 only)
  - `<Analytics />` component
  - `import '../styles/global.css'`
- [ ] Body contains a `<slot />` — terminal chrome is NOT part of the layout
      (each page composes its own chrome so blog pages can differ)

**File:** `src/layouts/TerminalLayout.astro`
**Depends on:** None
**Verify:** `bun astro check` passes, `bun build` passes

---

## Task 2: Create `TerminalWindow.astro` wrapper component

Extract the terminal chrome (window frame with title bar, dots, body area) into a
reusable component.

- [x] Create `src/components/terminal/TerminalWindow.astro`
- [x] Props: `title?: string` (defaults to `"christse@portfolio ~"`)
- [x] Markup: `.terminal` > `header.terminal-bar` (dots + title + spacer) +
      `main.terminal-body` > `<slot />`
- [x] Include the scoped styles for `.terminal`, `.terminal-bar`, `.bar-dots`,
      `.dot`, `.bar-title`, `.bar-spacer`, `.terminal-body`

**File:** `src/components/terminal/TerminalWindow.astro`
**Depends on:** None
**Verify:** `bun astro check` passes

---

## Task 3: Create `CrtOverlay.astro`

Extract the CRT scanline and flicker overlays into a standalone component.

- [x] Create `src/components/terminal/CrtOverlay.astro`
- [x] Markup: two `div`s (`.scanlines` and `.crt-flicker`), both `aria-hidden="true"`
- [x] Include scoped styles for scanlines gradient, flicker animation, and
      `position: fixed` overlay positioning
- [x] Add `will-change: opacity` to `.crt-flicker` for GPU compositing
- [x] Respect `prefers-reduced-motion` — disable animations when reduced motion
      is preferred

**File:** `src/components/terminal/CrtOverlay.astro`
**Depends on:** None
**Verify:** `bun astro check` passes

---

## Task 4: Create terminal section components

Extract each section from experimental-5 into its own component. Each component
receives its data via props (no direct JSON imports — the page passes data down).

- [x] `src/components/terminal/TerminalBoot.astro` — system boot messages
- [x] `src/components/terminal/TerminalHero.astro` — ASCII art + `cat tagline.md`
      output. Props: `asciiName: string[]`
- [x] `src/components/terminal/TerminalAbout.astro` — **NEW section** styled as
      `$ cat about.md`. Content: bio from current `About.astro` (7+ years
      experience, community involvement, hobbies)
- [x] `src/components/terminal/TerminalSkills.astro` — `ls ~/skills/` grid.
      Props: `skills: string[]`
- [x] `src/components/terminal/TerminalCareer.astro` — todo-list career history
      with subagent block for latest role. Props: `workHistory` array,
      `toolNames: string[]`
- [x] `src/components/terminal/TerminalProjects.astro` — `find ~/projects`
      listing. Props: `projects` array
- [x] `src/components/terminal/TerminalContact.astro` — contact links grid.
      Props: `contactLinks` array. Add Twitter/X link
      (`https://x.com/ChrisMTse`) and resume download link (`/resume.pdf`)
- [x] `src/components/terminal/TerminalPrompt.astro` — blinking cursor
- [x] `src/components/terminal/TerminalFooter.astro` — footer bar

**Files:** `src/components/terminal/*.astro`
**Depends on:** None
**Verify:** `bun astro check` passes

---

## Task 5: Create terminal navigation

Add a terminal-themed navigation to the terminal bar and a mobile-friendly
solution.

- [x] Create `src/components/terminal/TerminalNav.astro`
- [x] Add anchor links in the terminal bar area: `[about]` `[skills]`
      `[projects]` `[blog]` `[contact]` — styled as bracketed terminal commands
- [x] Props: `hrefs` object with optional overrides for each section
- [x] Include a `[blog]` link pointing to `/blog`
- [x] Mobile: collapse nav links behind a hamburger/toggle on small screens, or
      use a scrollable row. Keep it simple — no JS if possible (CSS-only toggle
      via `<details>` or similar)
- [x] Add a skip-to-content link (`<a href="#main-content"
class="sr-only focus:not-sr-only">Skip to content</a>`)

**File:** `src/components/terminal/TerminalNav.astro`
**Depends on:** None
**Verify:** `bun astro check` passes, keyboard navigation works in dev

---

## Task 6: Create shared terminal styles

Move all shared CSS from experimental-5's inline `<style>` into either
component-scoped styles (preferred for Astro) or a shared stylesheet. Define the
terminal color palette and typography.

- [ ] Create `src/styles/terminal.css` for shared terminal variables and base
      styles (CSS custom properties for the color palette, font stack, common
      patterns like `.cmd-line`, `.prompt`, `.output`, reveal animations)
- [ ] Each component's unique styles stay in its own scoped `<style>` block
- [ ] Ensure the reveal animation classes (`.reveal`, `.d1`–`.d7`) are available
      globally or in a shared location
- [ ] Ensure `prefers-reduced-motion` disables all animations and transitions

**File:** `src/styles/terminal.css`
**Depends on:** None
**Verify:** `bun build` passes

---

## Task 7: Assemble new `index.astro`

Compose the new homepage from the extracted components and TerminalLayout.

- [ ] Replace `src/pages/index.astro` with the terminal design
- [ ] Import and use `TerminalLayout.astro` as the layout
- [ ] Import and compose: `CrtOverlay`, `TerminalWindow` (wrapping
      `TerminalBoot`, `TerminalHero`, `TerminalAbout`, `TerminalSkills`,
      `TerminalCareer`, `TerminalProjects`, `TerminalContact`,
      `TerminalPrompt`), `TerminalFooter`
- [ ] TerminalWindow title bar should include `TerminalNav`
- [ ] Pass data from JSON imports as props to each section component
- [ ] Set `title="Chris Tse - Frontend Engineer"`,
      `canonical="https://christse.dev/"`
- [ ] Verify all sections render identically to experimental-5

**File:** `src/pages/index.astro`
**Depends on:** Tasks 1–6
**Verify:** `bun dev` — visual comparison with `/experimental-5`, `bun astro check`, `bun build`

---

## Task 8: Build terminal-themed blog post layout

Create `TerminalBlogPostLayout.astro` for the blog-redesign post pages.

- [ ] Create `src/layouts/TerminalBlogPostLayout.astro`
- [ ] Use `TerminalLayout.astro` as the base (passes `<head>` tags, analytics,
      fonts)
- [ ] Props: `title`, `pubDate`, `heroImage`, `description`, `socialImage`
- [ ] Header: terminal-styled prompt `$ cat blog/{slug}.md` above the title
      (replaces the light gradient hero)
- [ ] Include article meta (date, author) styled as terminal output
- [ ] Content area: `<article>` with prose classes, dark-themed:
  - Max width: `max-w-3xl` (narrower for monospace readability)
  - Line height: `leading-loose` (1.8–2.0)
  - Generous padding: `px-6 md:px-10`
  - Paragraph spacing: `mb-6`
  - Soft off-white text on dark background
- [ ] Add `transition:name` attributes for view transition animations
- [ ] Include terminal nav consistent with homepage

**File:** `src/layouts/TerminalBlogPostLayout.astro`
**Depends on:** Task 1
**Verify:** `bun dev` — navigate to `/blog-redesign/{slug}`, check reading comfort

---

## Task 9: Build terminal-themed blog listing

Style the `blog-redesign.astro` page with the full terminal aesthetic.

- [ ] Update `src/pages/blog-redesign.astro` to use `TerminalLayout.astro`
- [ ] Wrap content in `TerminalWindow` + `CrtOverlay`
- [ ] Style listing as directory output: `$ ls ~/blog/` header
- [ ] Each post entry: filename-style link, date, description — terminal colors
- [ ] Include `TerminalNav` in the terminal bar
- [ ] Add `transition:name` attributes for view transition animations

**File:** `src/pages/blog-redesign.astro`
**Depends on:** Tasks 1, 2, 3, 5
**Verify:** `bun dev` — navigate to `/blog-redesign`, check layout

---

## Task 10: Configure Tailwind Typography dark prose styles

Override `@tailwindcss/typography` prose defaults for dark terminal theme.

- [ ] Add dark prose overrides in `src/styles/terminal.css` (or global.css)
      targeting `.prose` within terminal-themed pages:
  - Headings: bright text (e.g., `#e0e0e0`)
  - Body text: `#c8c8c8` on `#0d1117`
  - Links: terminal blue `#59c2ff` with underline
  - Blockquotes: left border in terminal green, dimmed text
  - Code/pre: terminal-native styling (dark bg, green/amber text)
  - `hr`: subtle border color
  - Lists: proper marker color
- [ ] Verify prose renders correctly for all blog posts (check headings, code
      blocks, lists, links, blockquotes)

**File:** `src/styles/terminal.css`
**Depends on:** Task 6
**Verify:** `bun dev` — read through each blog post at `/blog-redesign/{slug}`

---

## Task 11: Update blog-redesign `[...slug].astro` to use terminal layout

- [ ] Update `src/pages/blog-redesign/[...slug].astro` to import
      `TerminalBlogPostLayout.astro` instead of `BlogPostLayout.astro`
- [ ] Pass all required props through

**File:** `src/pages/blog-redesign/[...slug].astro`
**Depends on:** Task 8
**Verify:** `bun dev` — navigate to `/blog-redesign/{slug}`, content renders

---

## Task 12: Accessibility audit and fixes

- [ ] **Color contrast**: Audit and fix WCAG AA compliance:
  - `.todo-item.done` at `opacity: 0.55` — increase to at least 0.7 or
    adjust colors
  - `.todo-meta` `#3d4455` on `#0d1117` — lighten to meet 4.5:1 ratio
  - `.project-desc` `#6c7080` on `#0a0e14` — lighten to meet 4.5:1
  - `.bar-title` `#5c6773` on `#151a24` — lighten to meet 4.5:1
- [ ] **Keyboard navigation**: Add visible focus indicators (outline or ring)
      for all interactive elements (project links, contact links, nav links)
- [ ] **Screen reader**: Mark decorative `$` prompts and `[system]` prefixes
      with `aria-hidden="true"` where not already done
- [ ] **Skip-to-content**: Verify the skip link from Task 5 works correctly

**Files:** Terminal component styles
**Depends on:** Tasks 4, 5, 7
**Verify:** Manual keyboard-tab through all interactive elements, check contrast
with browser devtools

---

## Task 13: Responsive / mobile testing and fixes

- [ ] Test terminal chrome at narrow widths (< 375px) — ensure no horizontal
      overflow
- [ ] Verify ASCII art scales properly via `clamp()` — no overflow or
      illegibility on small screens
- [ ] Verify footer collapses to column layout on mobile
- [ ] Verify subagent/tool-call blocks use single-column on mobile with good
      padding
- [ ] Verify blog post reading experience on mobile — generous padding, good
      line length
- [ ] Test terminal nav on mobile — collapsed state works, all links accessible

**Files:** Various terminal components
**Depends on:** Tasks 7, 8, 9
**Verify:** `bun dev` — test in browser at 320px, 375px, 768px, 1024px widths

---

## Task 14: Fonts — switch to JetBrains Mono, remove Lexend

- [ ] Remove Lexend Google Fonts link from `Layout.astro`
- [ ] Add JetBrains Mono Google Fonts link to `TerminalLayout.astro` (done in
      Task 1, verify weights: 400, 500, 600, 700, 800 — drop 300 weight)
- [ ] Update `BlogPostLayout.astro` to use JetBrains Mono instead of Lexend
      (for the transition period while old blog pages exist)
- [ ] Consider self-hosting via `@fontsource/jetbrains-mono` — evaluate in a
      future task

**Files:** `src/layouts/TerminalLayout.astro`, `src/layouts/Layout.astro`,
`src/layouts/BlogPostLayout.astro`
**Depends on:** Task 1
**Verify:** `bun dev` — no Lexend font requests in Network tab on terminal pages

---

## Task 15: Fix `site.webmanifest`

- [ ] Set `name` to `"Chris Tse"` and `short_name` to `"Chris Tse"`
- [ ] Update `theme_color` and `background_color` to match the terminal theme
      (e.g., `#0a0e14`)

**File:** `public/site.webmanifest`
**Depends on:** None
**Verify:** Manifest loads correctly in browser devtools Application tab

---

## Task 16: Blog cutover — replace `/blog` with redesign

After the terminal blog is finalized and tested:

- [ ] Delete `src/pages/blog.astro`
- [ ] Delete `src/pages/blog/[...slug].astro`
- [ ] Move `src/pages/blog-redesign.astro` → `src/pages/blog.astro`
- [ ] Move `src/pages/blog-redesign/[...slug].astro` →
      `src/pages/blog/[...slug].astro`
- [ ] Update all internal links from `/blog-redesign/` to `/blog/`
- [ ] Verify all blog URLs still work

**Files:** `src/pages/blog*.astro`, `src/pages/blog/**`
**Depends on:** Tasks 9, 10, 11
**Verify:** `bun build` — no broken routes, all blog posts render

---

## Task 17: Cleanup — remove old files and unused dependencies

- [ ] Delete experimental pages: `experimental.astro`, `experimental-2.astro`,
      `experimental-3.astro`, `experimental-4.astro`, `experimental-5.astro`
- [ ] Delete old `BlogPostLayout.astro` (replaced by
      `TerminalBlogPostLayout.astro`)
- [ ] Delete unused components from old index: `Hero.astro`, `About.astro`,
      `Work-History.astro`, `Work-Item.astro`, `Project-Section.astro`,
      `Project-Item.astro`, `Contact.astro`, `Footer.astro`, `Face.astro`,
      `Navigation.astro`
- [ ] Delete old `Layout.astro` (replaced by `TerminalLayout.astro`)
- [ ] Remove unused dependencies from `package.json`:
  - `@tailwindcss/forms` (no forms in terminal design)
  - `lucide-astro` (no icon usage)
  - `date-fns` (not imported anywhere)
- [ ] Run `bun install` to update lockfile

**Files:** Multiple
**Depends on:** Tasks 7, 16
**Verify:** `bun build` — clean build with no missing imports, `bun astro check`

---

## Task 18: Performance audit

- [ ] Verify CRT overlay uses GPU compositing (`will-change: opacity` on
      `.crt-flicker`)
- [ ] Verify JetBrains Mono loads only needed weights (400, 500, 600, 700, 800)
- [ ] Check for layout shifts from staggered reveal animations (elements at
      `opacity: 0` with `translateY(10px)`)
- [ ] Run Lighthouse in Chrome DevTools — target 90+ on all categories

**Depends on:** Task 7
**Verify:** Lighthouse scores, no janky animations in 6x CPU slowdown

---

## Final verification

- [ ] `bun astro check` — zero type errors
- [ ] `bun build` — clean production build
- [ ] `bun format:write` — consistent formatting
- [ ] Side-by-side comparison of new index vs experimental-5 in dev
- [ ] All outbound links work (GitHub, LinkedIn, Twitter/X, email, resume,
      project links)
- [ ] Analytics fires in production preview (`UMAMI_ID` set)

---

## Manual E2E Testing

- [ ] Homepage loads with terminal theme — all sections visible, animations play
- [ ] Terminal nav links scroll to correct sections
- [ ] Blog link navigates to `/blog` with terminal theme
- [ ] Blog post pages render with dark prose, comfortable reading experience
- [ ] View transitions work between homepage ↔ blog ↔ blog post
- [ ] Mobile: all sections readable, nav accessible, no horizontal overflow
- [ ] Reduced motion: animations disabled, content still visible
- [ ] Keyboard-only navigation: all interactive elements reachable with Tab,
      focus indicators visible
- [ ] Screen reader: page structure makes sense, decorative elements hidden

---

## Notes

- Use `bun` for all package management and scripts (never npm/yarn)
- Run `bun format:write` after modifying `.astro` files
- Keep component styles scoped where possible — only use `terminal.css` for
  truly shared patterns (variables, reveal animations, prompt styles)
- The blog redesign develops in parallel under `/blog-redesign/*` — cutover
  happens in Task 16 once approved
- Terminal color palette reference:
  - Background: `#0a0e14`
  - Terminal body: `#0d1117`
  - Terminal bar: `#151a24`
  - Border: `#1d2433`
  - Text primary: `#b3b1ad`
  - Text bright: `#e0e0e0`
  - Green (system): `#39ff14`
  - Blue (accent): `#59c2ff`
  - Purple (accent): `#d2a6ff`
  - Amber (system): `#e6b450`
  - Red (dot): `#ff5f57`
  - Yellow (dot): `#febc2e`
  - Green (dot): `#28c840`
