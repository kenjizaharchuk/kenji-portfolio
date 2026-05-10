
# Project Detail View — Plan

Goal: Click a card in the "Things I've Made" carousel → it morphs into a full-screen case study at `/projects/:slug`. Reusable across ~25 projects. First project populated: `planet-money-bot` with lorem-ipsum placeholders.

---

## 1. Data layer

Create `src/data/projects.ts`:

```ts
export type Block =
  | { type: 'context'; content: string }
  | { type: 'gallery'; images: { src: string; alt: string }[] } // 2-col
  | { type: 'pullQuote'; content: string; attribution?: string }
  | { type: 'embed'; label: string; src?: string }
  | { type: 'process'; content: string; image: string; imageAlt: string }
  | { type: 'outcome'; content: string };

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroImagePosition?: string;
  blocks: Block[];
}

export const projectDetails: ProjectDetail[] = [ /* planet-money-bot here */ ];
export const getProjectBySlug = (slug: string) => projectDetails.find(p => p.slug === slug);
```

Populate `planet-money-bot` only, with lorem ipsum for each block type. Reuse existing image imports.

In `src/components/ProjectsCarousel.tsx`, add an optional `slug` field to the existing `Project` type and set `slug: 'planet-money-bot'` on the matching entry. Other projects: leave slug undefined for now (their cards stay non-clickable into detail view, OR fall back to existing link). Per request: links can be removed for now — we will treat presence of `slug` as the click trigger and ignore `link` when slug exists.

---

## 2. Routing — modal pattern

Add to `src/App.tsx`:

```tsx
<Route path="/" element={<Index />} />
<Route path="/projects/:slug" element={<Index />} />
```

Both routes render `Index`. Inside `Index`, read `useParams().slug`. If present → render `<ProjectDetail slug={slug} />` overlaid on top of the homepage (which stays mounted underneath, preserving carousel scroll/index). If no slug → just the homepage.

Card click handler in `ProjectsCarousel`:
- Only when card is the active (centered) slide AND has a `slug`.
- Calls `navigate(\`/projects/${slug}\`)` (React Router) — this updates URL via history.pushState without remounting `Index`.
- Existing `link` external behavior is dropped for slug-bearing cards.

Browser back: `navigate(-1)` happens automatically; `slug` becomes undefined → reverse animation triggers (handled by Framer Motion `AnimatePresence`).

Direct visit / forward to `/projects/:slug`: `Index` mounts with slug already present → `ProjectDetail` renders without enter animation. We detect this by tracking whether the slug was set by a navigation from `/` (animate) vs initial mount (no animate). A simple ref `hasMountedRef` set to true after first render — if slug is present on first render, render with `initial={false}` on motion components.

Escape key: `useEffect` in `ProjectDetail` listens for `Escape` → `navigate(-1)` (or `navigate('/')` as fallback if no history).

---

## 3. The morph animation (Framer Motion)

Install `framer-motion` (verify package.json; add if missing).

Shared-layout strategy with `layoutId`:

- Card in carousel wraps its visual content in `<motion.div layoutId={\`card-\${slug}\`}>` (only when slug exists). The image inside uses `layoutId={\`card-image-\${slug}\`}`. Title `layoutId={\`card-title-\${slug}\`}`. Tag container `layoutId={\`card-tags-\${slug}\`}`.
- `ProjectDetail` renders matching `motion.div`s with the same `layoutId`s in their hero positions.
- Wrap the detail view in `<AnimatePresence>` at `Index` level so close also animates.
- Transition: `{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }` tuned for ~750ms feel, or `{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }` for cinematic curve. Will go with the cubic-bezier duration version to match existing carousel feel.

Container expansion behavior:
- The card `motion.div` expands from its rect to `fixed inset-0` covering viewport (z-index above StarField). Background of expanded container is the site `bg-background` so stars are fully covered.
- Hero image scales modestly. Achieved by giving the hero image its own `motion.div` container that, in detail view, is sized to e.g. 60vh tall and ~1100px wide max — roughly 1.3–1.5x the card image's pixel size at desktop. Image inside uses `object-fit: cover`.
- Title + tags reposition via their layoutIds to their final spots (below or overlaid on hero).
- The rest of the blocks live inside the expanding container but outside the shared-layout elements. They use `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` with a small delay (~0.4s) so they reveal as the container finishes expanding — described as "uncovered" rather than dramatic fade.

Reverse: `AnimatePresence` with matching `exit` on the non-shared blocks (fade out fast, ~150ms), then layout animation contracts the shared elements back to the card. Carousel underneath is untouched, so scroll/index is preserved by construction.

---

## 4. Sidebar fade

`HeroSidebar` already takes no prop for this. Add a prop `forceHidden?: boolean`. In `Index`, pass `forceHidden={!!slug}`. Sidebar wraps its `nav` in a `motion` element or a CSS opacity transition (~400ms) and short-circuits visibility when `forceHidden` is true. No other sidebar logic changes.

---

## 5. ProjectDetail component

`src/components/ProjectDetail.tsx`:

- Props: `slug: string; isInitialDirectMount: boolean;`
- Looks up project; if not found, renders a small "Project not found" with link back.
- Layout (max-w container, generous spacing matching site):
  1. Hero — full-bleed `motion.div` with shared `layoutId` for image; title + tags below using shared layoutIds.
  2. Close button (top-right, `fixed`): Lucide `Minimize2`, ghost styling matching site, `aria-label="Close project"`. Click → `navigate(-1)` with fallback to `navigate('/')`.
  3. Renders `project.blocks` in order via a `<BlockRenderer />` switch:
     - context: large body paragraph
     - gallery: 2-col grid (`grid-cols-1 md:grid-cols-2`)
     - pullQuote: oversized display font, left border accent
     - embed: bordered placeholder box, height ~480px, label "Figma/CAD embed area"
     - process: 2-col side-by-side text + image (stacks on mobile)
     - outcome: closing paragraph, slightly emphasized
- Typography: existing `font-display`, `text-foreground`, semantic tokens only.
- Mobile: blocks stack, hero image height reduced, close button reachable in safe area.

---

## 6. Files to add / change

Add:
- `src/data/projects.ts`
- `src/components/ProjectDetail.tsx`
- `src/components/ProjectDetailBlocks.tsx` (optional split for the block renderer)

Change:
- `src/App.tsx` — add `/projects/:slug` route pointing to `Index`.
- `src/pages/Index.tsx` — read slug param, render `<AnimatePresence>` with `<ProjectDetail>` when slug present, pass `forceHidden` to `HeroSidebar`.
- `src/components/ProjectsCarousel.tsx` — add optional `slug` to Project type; set on Planet Money Bot entry; wire active-slide click → `navigate('/projects/' + slug)`; wrap card visuals in `motion.div` with `layoutId`s when slug exists. Existing link behavior preserved for cards without a slug.
- `src/components/HeroSidebar.tsx` — accept `forceHidden` prop; AND it into existing visibility rule. No other logic changes.
- `package.json` — add `framer-motion` if not present.

Do NOT modify: hero section, About, Contact, StarField, carousel scroll/swiper config, typography, spacing, or any unrelated component.

---

## 7. Edge cases

- Unknown slug in URL: `ProjectDetail` shows minimal "Not found" state with back link.
- Filter active in carousel and the slugged project is filtered out: clicking is impossible (it's not visible). Direct URL still works because detail view is independent of carousel state.
- Reduced motion: respect `prefers-reduced-motion` by setting `transition={{ duration: 0 }}` on the motion components when matched.

---

## 8. Verification

After implementation:
1. Click Planet Money Bot card → URL becomes `/projects/planet-money-bot`, morph plays, carousel underneath untouched.
2. Press back → reverse morph plays, carousel at same index/scroll.
3. Press Escape → same as close button.
4. Hard reload `/projects/planet-money-bot` → renders directly, no animation.
5. Other cards still behave as before (no slug → existing behavior).
6. Sidebar fades out during morph and back in on close.
7. Build passes; no TypeScript errors.
