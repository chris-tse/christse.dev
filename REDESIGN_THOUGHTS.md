# Homepage Redesign Thoughts

## Overview

Experimental homepage redesign exploring a warmer, more personal aesthetic while maintaining professional credibility. Moving away from generic "product landing page" vibes toward something that feels like an actual person's corner of the web.

---

## Design Direction

### Core Philosophy

- **Clean & Professional** — but not sterile
- **Personal** — shows hobbies, interests, personality
- **Light Mode** — warm cream base with restrained color palette
- **Structured with Whimsy** — organized layout with playful touches

### Color Palette

- **Background**: `#FAF8F3` — warm off-white/cream (not clinical pure white)
- **Primary Accent**: `#E8A598` — soft coral (food-inspired, warm)
- **Secondary Accent**: `#9BB89F` — sage green (natural, calming)
- **Text**: Gray-900 for headings, gray-700/600 for body

### Typography

- **Font**: Lexend (clean, readable, friendly but professional)
- **Japanese Text**: よろしく, またね！— personal touches without overdoing it

---

## Layout Structure

### Sections (in order)

1. **Hero**
   - Large name display
   - Japanese greeting with typewriter effect
   - Brief tagline

2. **About Me**
   - Professional summary (7+ years experience)
   - Personal touches (community, gym, Japanese, gaming)

3. **Work Experience** (Timeline Style)
   - Vertical timeline with connected dots
   - Current role highlighted with coral/pulse
   - Download resume button
   - Real data from `work-history.json`

4. **Featured Projects** (2-column grid)
   - Cards with hover tilt effect
   - Links to live projects
   - Tech stack tags
   - Real data from `projects.json`

5. **Currently Playing**
   - Gaming: gacha games (HSR, ZZZ, Genshin)
   - Watching: anime list (Frieren, Dungeon Meshi, Bebop)

6. **My Setup** (/uses style)
   - Keyboard specs (Tofu65, Ink Blacks, GMK Olivia)
   - PC build details
   - Dev tools & preferences

7. **Connect**
   - Social links with proper brand colors
   - GitHub, X/Twitter, LinkedIn, Email

---

## Implemented Whimsy Effects

### 1. Typewriter Effect (Hero)

- **What**: "よろしく" types out character by character
- **How**: CSS animation with `steps()` and blinking cursor
- **Why**: Terminal/dev aesthetic, subtle motion on load
- **Respects**: `prefers-reduced-motion` (disabled if user prefers)

### 2. 3D Card Tilt (On Hover)

- **What**: Cards subtly tilt toward cursor on hover (-2deg X, 2deg Y)
- **How**: CSS `perspective` + `transform` on `:hover`
- **Why**: Adds tactile feel, makes site feel responsive
- **Respects**: `prefers-reduced-motion`

### 3. Timeline Pulse

- **What**: Current job dot gently pulses
- **How**: CSS `box-shadow` animation
- **Why**: Visual hierarchy, draws eye to current role

### 4. Link Underlines

- **What**: Links get animated underline on hover (coral → sage)
- **How**: `::after` pseudo-element with `transform: scaleX()`
- **Why**: Polished interaction feedback

---

## Pending Whimsy Ideas (Brainstorm)

### Subtle (Under Consideration)

- [ ] **Cursor trail** — tiny particles following mouse
- [ ] **Subtle noise texture** — 5% opacity grain overlay
- [ ] **Keyboard typing sounds** — mechanical clicks on interactions
- [ ] **Scroll progress** — indicator for reading position

### Playful (Future Exploration)

- [ ] **Konami code easter egg** — ↑↑↓↓←→←→BA reveals something
- [ ] **Random link underline colors** — like cassidoo's site
- [ ] **Emoji floaters** — brief animations on page load
- [ ] **Terminal typing** — more sections with typewriter effect

### Flashy (Probably Too Much)

- [ ] **Particle background** — floating hiragana characters
- [ ] **Day/night cycle** — theme based on visitor's time
- [ ] **Boot sequence** — fake CLI loading on first visit

---

## Inspirations Referenced

### Sites We Like

- **Wes Bos** — friendly, approachable, shows personality
- **Ethan Niser** — clean, personal, hobby sections
- **Josh Comeau** — playful but professional
- **Effect Institute** — animations, whimsy, immersive
- **Cassidoo** — random link underline colors

### What We Avoided

- Dark mode (user preference: light)
- Glassmorphism (too generic/AI-looking)
- Brutalist (not the right vibe)
- Product landing page aesthetics (too sterile)

---

## Technical Notes

### Data Sources

- Work history: `src/data/work-history.json`
- Projects: `src/data/projects.json`
- All real data, no placeholders

### Accessibility

- All animations respect `prefers-reduced-motion`
- Proper semantic HTML
- Color contrast compliant
- Focus states on interactive elements

### Performance

- CSS-only animations (no JS for effects)
- Static generation (Astro)
- Minimal JavaScript

---

## Open Questions

1. Should we add more whimsy, or is current level right?
2. Timeline vs card layout for work history — which feels better?
3. Should "Currently Playing" auto-update or stay manual?
4. Worth adding a dark mode toggle, or stick to light?
5. Any sections feel too cluttered or sparse?

---

## Next Steps

- [ ] Review preview deployment
- [ ] Test on mobile
- [ ] Check accessibility with screen reader
- [ ] Decide on additional whimsy effects
- [ ] Potentially promote `/experimental` to replace `/`

---

_Last updated: February 15, 2025_
