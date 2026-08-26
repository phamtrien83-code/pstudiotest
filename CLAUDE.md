# CLAUDE.md — Trien Pham Portfolio

## PROJECT OVERVIEW

Portfolio website for Trien Pham — a digital marketer, designer, and videographer based in Ho Chi Minh City, Vietnam. Single-page experience with cinematic scroll-driven animations.

**Tech Stack:**
- Next.js 14.2.3 (App Router, TypeScript)
- React 18
- Tailwind CSS v3.4 + PostCSS
- Framer Motion 11 (animations, springs, scroll reveals)
- @studio-freight/lenis (smooth scrolling)
- lucide-react (icons)

**Figma MCP is connected.** All visual assets (images, masks, backgrounds) are pulled from Figma via `src/constants/assets.ts` (`FIGMA_ASSETS`). Always reference the Figma design before making visual/UI changes.

---

## PROJECT STRUCTURE

### Pages (`src/app/`)
| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout — LoadingScreen + SmoothScroll wrapper + Navbar + children |
| `page.tsx` | Home — renders `<Homepage />` |
| `about/page.tsx` | About — renders `<AboutPage />` |
| `work/page.tsx` | Work listing — renders `<WorkPage />` |
| `work/[id]/page.tsx` | Project detail — horizontal-scroll slideshow (desktop) / stacked mobile view |
| `contact/page.tsx` | Contact — renders `<ContactPage />` |
| `globals.css` | Tailwind directives + CSS vars (fonts, colors, scrollbar-hide, content-wrap) |

### Homepage Components (`src/components/home/`)
Rendered in order by `<Homepage />`. Wrapped in a `<div>` with `mb-[100vh]` so content scrolls over a fixed-position Footer (curtain reveal pattern).

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Top nav — "made by Trien." logo + links. Slides down after loading screen. Hides on scroll-down, shows on scroll-up. |
| `Hero.tsx` | Full-viewport hero with 3D orbiting image. Three role labels orbit: Designer / Marketer / Videographer. Click image to cycle roles. Uses Figma mask (`imgImage410`) and image (`imgImage411`). |
| `Services.tsx` | Horizontal draggable card carousel (5 services). Active card is red (`#ff3716`), inactive are gray. IntersectionObserver-driven active state. Has prev/next buttons. Background image `/images/ServiceBG.jpg`. |
| `Principles.tsx` | "Working Principles" — three overlapping red (#ff3716) blocks with headline + caption. Absolute-positioned masonry-like layout. |
| `MeetTheTeam.tsx` | Full-bleed section with 3 grayscale photo squares that reveal color on hover. Background `/images/Meet The Team.png`. "Meet The Team" heading on the right. |
| `Works.tsx` | "Selected Works" — 4 project cards in a grid. Each card: title (red), Figma image, tags (red pill badges). Hover reveals overlay with "See more" button. |
| `Footer.tsx` | Full-viewport fixed footer (z-0). Reveals via scroll-triggered blur+opacity animation. Contains: menu links, social links, contact info, CTA buttons, bottom bar with copyright. |

### Shared Components (`src/components/`)
| Component | Purpose |
|-----------|---------|
| `LoadingScreen.tsx` | Full-screen loader — counts 0→100% with Framer Motion. Curtains upward on complete. Dispatches `loading-complete` event. |
| `SmoothScroll.tsx` | Lenis smooth-scroll wrapper (lerp 0.08, duration 1.2). Wraps all page content. |
| `HorizontalScroll.tsx` | Converts vertical wheel to horizontal snap-scroll. Used by project detail page. Stops Lenis, listens for wheel/keyboard, fires `onSlideChange` + `onProgress`. |
| `ProgressIndicator.tsx` | Fixed bottom-center slide counter for horizontal scroll (6 dots/lines). |
| `Hero.tsx` | **UNUSED** — earlier hero concept with text overlays and `/hero-collage.png`. Superseded by `home/Hero.tsx`. |
| `HelpSection.tsx` | **UNUSED** — earlier services section with hover-expanding cards. Superseded by `home/Services.tsx`. |

### About Page (`src/components/about/`)
`AboutPage.tsx` — Four sections: oversized hero headline ("Curating visual stories"), hobbies grid (asymmetric 12-col), honors/certificates grid (6 placeholder cards), contact info box, full-bleed cinematic break section.

### Contact Page (`src/components/contact/`)
`ContactPage.tsx` + `BusinessCard3D.tsx` + `contact.css` — Centered 3D flip card. Front: red (#ff3716) with "Build things that [BEAUTIFUL]". Back: cream background with contact details (email, phone, LinkedIn, Behance) + QR placeholder. Mouse-tracking 3D rotation, click to flip.

### Work Detail Page (`src/app/work/[id]/page.tsx`)
Six full-screen slides rendered inside `<HorizontalScroll>`:
1. Project Hero — title, year, category, client, overview
2. The Story — challenge + solution with image placeholder
3. Gallery — 3-column grid (first spans 2 cols)
4. Details — role, timeline, client, tech stack (pill badges)
5. Results — dark section with numbered impact items
6. Navigation — prev / all works / next links

Falls back to `<MobileView>` (stacked, no horizontal scroll) below 768px.

### Pages (`src/app/`)

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout — LoadingScreen + SmoothScroll wrapper + Navbar + children |
| `page.tsx` | Home — renders `<Homepage />` |
| `about/page.tsx` | About — renders `<AboutPage />` |
| `work/page.tsx` | Work listing — renders `<WorkPage />` |
| `work/[id]/page.tsx` | Project detail — horizontal-scroll slideshow (desktop) / stacked mobile view |
| `contact/page.tsx` | Contact — renders `<ContactPage />` |
| `experiments/page.tsx` | Experiments — animated grid of creative experiments with loading animation |
| `globals.css` | Tailwind directives + CSS vars (fonts, colors, scrollbar-hide, content-wrap) |

### Constants

`src/constants/assets.ts` — `FIGMA_ASSETS` object: 20+ Figma MCP asset URLs (images, masks, backgrounds). `src/constants/projects.ts` — `Project` interface + 4 project objects + `getProjectById()` + `getAdjacentProject()`. `src/constants/works.ts` — `Work` interface + works array used by `WorkPage.tsx` (separate from `projects.ts`).

### Config

`next.config.js` — Remote patterns whitelist for Next.js Image component: `figma.com` (Figma MCP assets) and `picsum.photos` (placeholder images). Adding a new external image host requires adding it here.

### Shared Components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `animations/Reveal.tsx` | Fade-up scroll reveal wrapper used by `Homepage.tsx` to animate each section |
| `LoadingScreen.tsx` | Full-screen loader — counts 0→100% with Framer Motion. Curtains upward on complete. Dispatches `loading-complete` event. |
| `SmoothScroll.tsx` | Lenis smooth-scroll wrapper (lerp 0.08, duration 1.2). Wraps all page content. |
| `HorizontalScroll.tsx` | Converts vertical wheel to horizontal snap-scroll. Used by project detail page. Stops Lenis, listens for wheel/keyboard, fires `onSlideChange` + `onProgress`. |
| `ProgressIndicator.tsx` | Fixed bottom-center slide counter for horizontal scroll (6 dots/lines). |
| `PageTransition.tsx` | Context-based page transition system. Used by `WorkPage.tsx` and `ContactPage.tsx` for animated navigation between pages via Framer Motion `AnimatePresence`. |
| `Hero.tsx` | **UNUSED** — earlier hero concept with text overlays and `/hero-collage.png`. Superseded by `home/Hero.tsx`. |
| `HelpSection.tsx` | **UNUSED** — earlier services section with hover-expanding cards. Superseded by `home/Services.tsx`. |

### Work Listing (`src/components/work/`)

| Component | Purpose |
|-----------|---------|
| `WorkPage.tsx` | "Selected Works" listing — animated loading grid (Minecraft chunk pop-in), then reveals work grid. Uses `works` from `@/constants/works`. Has page transition support via `PageTransition` context. |

---

## DESIGN SYSTEM

| Token | Value | Usage |
|-------|-------|-------|
| `#fffcec` | Warm cream | Primary background (body, home bg, contact bg) |
| `#ff3716` | Vibrant red | Accent color (active cards, buttons, hover states, headings) |
| `#1e1e1e` | Near-black | Text on light backgrounds |
| `--font-display` | Newsreader (serif) | Headings, large display text |
| `--font-body` | Space Grotesk (sans) | Body text, UI elements |

---

## QUICK START

```bash
npm install
npm run dev   # Start dev server on http://localhost:3000
npm run build # Production build
```

## BEFORE EVERY SESSION

1. Read this `CLAUDE.md`
2. Run `git log --oneline -10` to check recent changes
3. Confirm understanding of current state before implementing

## QUICK START

```bash
npm install
npm run dev     # Start dev server on http://localhost:3000
npm run build   # Production build
npm run lint    # ESLint
```

## CONFIG GOTCHAS

- `next.config.js`: Figma MCP asset URLs require `www.figma.com` in `images.remotePatterns`. Adding new image hosts requires updating this config or images will 404 at build time.

---

## WORKING RULES

1. **Specs first** — Define bulletproof requirements before writing any code.
2. **Test plan** — Define success criteria (visual checks, functional checks) before implementation.
3. **Implementation** — Code only what the specs require. No extras.
4. **Verify** — Run the dev server, visually inspect or check output against success criteria.
5. **Ship** — Commit with a clear message when verified.

- Do not flatter or agree without verifying — always check the actual code/output.
- Stay strictly within scope. Do not suggest "nice to have" features.
- Figma is the source of truth for design decisions. Before changing any visual element, consult the Figma file.
- Note: there are **two Navbar components** (`home/Navbar.tsx` and root `Navbar.tsx`). The root one is used by layout.tsx and is the live one. The `home/Navbar.tsx` is currently unused.
- Note: `src/components/Hero.tsx` and `src/components/HelpSection.tsx` are unused — superseded by `home/Hero.tsx` and `home/Services.tsx`. Do not modify unless explicitly asked.
