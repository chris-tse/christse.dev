# Migrate experimental-5 (Terminal) to index.astro

This document tracks everything needed to cut over the terminal/CLI design from
`src/pages/experimental-5.astro` to become the new `src/pages/index.astro`.

---

## 1. Architecture / Componentization

The experimental page is a single 1036-line file. Before it can replace index, it
needs to be broken into reusable Astro components and integrated with the existing
Layout system.

- [ ] Create a new `TerminalLayout.astro` (or extend `Layout.astro`) that provides
      the shared `<head>` tags (meta, favicons, manifest, canonical, sitemap,
      analytics, fonts) while allowing the terminal body chrome.
- [ ] Extract each `<section class="block ...">` into its own component:
  - `TerminalBoot.astro` -- the system boot messages
  - `TerminalHero.astro` -- ASCII art name + tagline
  - `TerminalSkills.astro` -- `ls ~/skills/` grid
  - `TerminalCareer.astro` -- todo-list work history + subagent block
  - `TerminalProjects.astro` -- `find ~/projects` list
  - `TerminalContact.astro` -- contact links
  - `TerminalPrompt.astro` -- blinking cursor prompt
  - `TerminalFooter.astro` -- footer bar
- [ ] Extract the terminal chrome wrapper (`.terminal`, `.terminal-bar`,
      `.terminal-body`) into a shared `TerminalWindow.astro` component.
- [ ] Move the CRT overlay (`.scanlines`, `.crt-flicker`) into a `CrtOverlay.astro`
      component.
- [ ] Move inline `<style>` blocks into component-scoped styles or a dedicated
      stylesheet (e.g., `src/styles/terminal.css`).

---

## 2. Missing Content (Close the Information Gap)

Content present on the current index but missing from experimental-5:

- [ ] **About / Bio section** -- Add a `cat about.md` block with the personal bio
      (7+ years experience, community involvement, hobbies: gym, Japanese, gaming).
- [ ] **Resume download** -- Add a resume link, e.g., styled as
      `wget /resume.pdf` or a download command. Link to `/resume.pdf`.
- [ ] **Twitter/X link** -- Add to the contact links array
      (`https://x.com/ChrisMTse`).

---

## 3. Navigation

The current site has a sticky nav bar with links to About, Projects, Contact, and
Blog. experimental-5 has none.

- [ ] Add a terminal-themed navigation. Options:
  - Minimal: Add `[about]` `[projects]` `[blog]` `[contact]` links in the
    `.terminal-bar` next to the title text.
  - Or: Add a `help` block at the top that lists available "commands" as anchor
    links + the `/blog` route.
- [ ] Ensure the blog link (`/blog`) is present and accessible.
- [ ] Add a mobile-friendly navigation solution (the terminal bar may need a
      hamburger or collapsible menu on small screens).

---

## 4. SEO & Meta

Tags present in `Layout.astro` but missing from experimental-5:

- [ ] `<title>` with the site-wide suffix
      (`" | Chris Tse - Coder, Gamer, Keyboard & PC Enthusiast, Anime Fan"`)
      -- or decide on a new suffix that fits the terminal brand.
- [ ] `<meta name="description">` with a proper default.
- [ ] `<link rel="canonical" href="https://christse.dev/" />`
- [ ] `<link rel="sitemap" href="/sitemap-index.xml" />`
- [ ] Add **Open Graph meta tags** (`og:title`, `og:description`, `og:type`,
      `og:url`, `og:image`, `og:site_name`). These are missing from the current
      index too -- good time to add them.
- [ ] Add **Twitter Card meta tags** (`twitter:card`, `twitter:title`,
      `twitter:description`, `twitter:image`, `twitter:creator`). Also missing
      from the current index.
- [ ] Consider generating a **social share image** (OG image) -- an image of the
      terminal with the ASCII name would be distinctive.

---

## 5. Analytics

- [ ] Include the `Analytics.astro` component (Umami at `umami.ctse.dev`,
      gated behind `PROD` + `UMAMI_ID`).

---

## 6. Fonts

- [ ] Replace Google Fonts `Lexend` with `JetBrains Mono` in the layout/head.
- [ ] Remove Lexend font entirely -- blog will also use JetBrains Mono now.
      Update `BlogPostLayout.astro` to drop the Lexend Google Fonts link.
- [ ] Consider self-hosting JetBrains Mono via `@fontsource/jetbrains-mono`
      instead of Google Fonts for better performance and privacy.

---

## 7. Astro Features

experimental-5 doesn't use any Astro framework features beyond templating.

- [ ] Add `ClientRouter` (from `astro:transitions`) for SPA-style page transitions
      between home and blog pages.
- [ ] Ensure `global.css` (Tailwind + typography plugin) is imported -- the
      experimental page imports it but relies heavily on scoped styles instead
      of utility classes. Decide whether to keep scoped CSS or migrate to
      Tailwind utilities.

---

## 8. Accessibility Audit

The experimental page has some good foundations (`aria-label`, semantic HTML,
`prefers-reduced-motion`) but needs a full check:

- [ ] **Color contrast** -- Verify WCAG AA compliance for all text on the dark
      background, especially:
  - Dimmed "completed" career items (`.todo-item.done` at `opacity: 0.55`)
  - `.todo-meta` color `#3d4455` on `#0d1117` background
  - `.project-desc` color `#6c7080` on `#0a0e14` background
  - `.bar-title` color `#5c6773` on `#151a24` background
- [ ] **Keyboard navigation** -- Ensure all interactive elements (project links,
      contact links) have visible focus indicators.
- [ ] **Screen reader testing** -- Verify the terminal metaphor doesn't confuse
      assistive technology. The `$` prompts and `[system]` prefixes are
      decorative and should be hidden or marked `aria-hidden`.
- [ ] **Skip-to-content link** -- Add one for keyboard users.

---

## 9. Blog Integration

The blog listing page (`/blog`) and blog post layout (`BlogPostLayout.astro`) use
their own separate layout with the Lexend font and light theme.

**Decision: Full terminal blog** -- restyle blog to match the terminal aesthetic
for visual cohesion, but optimize for reading comfort.

### Development namespace strategy

To develop the terminal blog alongside the existing light-themed blog without
disrupting it, the redesign lives under a parallel `/blog-redesign/*` route:

- `src/pages/blog-redesign.astro` -- terminal-themed blog listing (stub created)
- `src/pages/blog-redesign/[...slug].astro` -- terminal-themed blog post (stub created)

Both pull from the same `posts` content collection as the originals. Internal links
within the redesign pages point to `/blog-redesign/` slugs so you can browse the
full redesigned blog in isolation.

**Cutover**: When the redesign is final, delete the old `src/pages/blog.astro` and
`src/pages/blog/[...slug].astro`, then rename/move the redesign files to take their
place. Update all internal links back to `/blog/`.

### Blog reading experience guidelines

- **Font**: JetBrains Mono (same as homepage, good legibility for monospace).
- **Line-height**: 1.8–2.0 for body text (monospace is naturally denser than
  proportional fonts, so it needs more breathing room).
- **Max-width**: Narrower content column -- `max-w-2xl` or `max-w-3xl` (monospace
  characters are wider, so fewer characters per line for comfortable reading).
- **Text color**: Soft off-white on dark background, not pure `#fff` on `#000`.
  Use the same palette as experimental-5 (e.g., `#c8c8c8` / `#e0e0e0` on
  `#0d1117` / `#1a1a2e`).
- **Padding**: Generous horizontal padding on both sides for a "comfy" feel,
  especially on mobile.
- **Paragraph spacing**: Extra margin between paragraphs (`mb-6` or more).
- **Code blocks**: Should feel native -- terminal-themed code blocks on a
  terminal-themed blog will look natural.
- **Prose overrides**: Restyle `@tailwindcss/typography` prose classes for dark
  theme (headings, links, blockquotes, lists, hr, etc.).

### Tasks

- [x] Create stub pages at `/blog-redesign` and `/blog-redesign/[slug]`.
- [ ] Build terminal-themed blog post layout for `blog-redesign/[...slug].astro`:
  - Create a new `TerminalBlogPostLayout.astro` (or adapt `BlogPostLayout.astro`)
  - Dark background, JetBrains Mono font
  - Replace the light gradient hero section with a terminal-styled header
    (e.g., `$ cat blog/post-title.md` prompt above the title)
  - Apply comfy reading styles (line-height, max-width, padding, spacing)
- [ ] Build terminal-themed blog listing for `blog-redesign.astro`:
  - Dark background, monospace font
  - Style post listing to look like directory output (e.g., `$ ls ~/blog/`)
- [ ] Configure Tailwind Typography dark prose styles -- override default prose
      colors for headings, body text, links, blockquotes, code, hr, etc.
- [ ] Add terminal-themed navigation consistent with the new homepage.
- [ ] Share a base layout between homepage and blog (the new `TerminalLayout.astro`)
      to eliminate the current duplication of `<head>` tags, fonts, and analytics.
- [ ] Test reading experience at various viewport sizes -- ensure comfortable
      reading on phone, tablet, and desktop.
- [ ] **Cutover**: Replace original `/blog` pages with redesign versions and
      update all internal links.

---

## 10. Responsive / Mobile

The experimental page has basic responsive handling but needs more attention:

- [ ] Test the terminal chrome at very narrow widths (< 375px).
- [ ] The ASCII art is already responsive via `clamp()` -- verify it doesn't
      overflow or become illegible on small screens.
- [ ] The footer currently uses `flex` with `justify-content: space-between` --
      already collapses to column on mobile, verify it looks right.
- [ ] Test the subagent/tool-call blocks on mobile -- they switch to single
      column, but verify padding and readability.

---

## 11. Performance

- [ ] Audit the CRT effects (`.scanlines`, `.crt-flicker`) for GPU compositing --
      full-viewport `position: fixed` overlays with gradients can cause
      unnecessary repaints. Consider `will-change: opacity` or conditionally
      disabling on low-power devices.
- [ ] The JetBrains Mono font loads 6 weights (300-800). Trim to only the
      weights actually used (400, 500, 600, 700, 800) to reduce payload.
- [ ] Ensure no layout shifts from the staggered reveal animations (elements
      start at `opacity: 0` with `translateY(10px)`).

---

## 12. Cleanup

- [ ] Remove or archive the 5 experimental pages (`experimental.astro` through
      `experimental-5.astro`) after the migration is complete.
- [ ] Remove old blog pages (`src/pages/blog.astro`, `src/pages/blog/[...slug].astro`)
      and old `BlogPostLayout.astro` after the blog redesign cutover.
- [ ] Remove unused components from the old index (Hero, About, Work-History,
      Project-Section, Contact, Footer, Face) if they are no longer referenced.
- [ ] Remove unused dependencies from `package.json` if appropriate
      (`lucide-astro`, `@tailwindcss/forms`, `date-fns` appear unused).
- [ ] Fix the `site.webmanifest` -- `name` and `short_name` are currently
      empty strings.

---

## 13. Pre-Launch Checklist

- [ ] Side-by-side comparison of old vs new in a local dev build.
- [ ] Run `bun astro check` -- zero type errors.
- [ ] Run `bun build` -- clean production build.
- [ ] Run `bun format:write` to ensure consistent formatting.
- [ ] Test in Chrome, Firefox, Safari (desktop + mobile).
- [ ] Verify all outbound links work (GitHub, LinkedIn, Twitter, email, resume,
      project links).
- [ ] Verify analytics fires in a production preview.
- [ ] Lighthouse audit: Performance, Accessibility, SEO, Best Practices.
