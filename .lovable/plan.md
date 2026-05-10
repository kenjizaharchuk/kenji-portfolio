## Three Refinements to Project Detail View

Scoped to `ProjectsCarousel.tsx` and `ProjectDetail.tsx`. No other files touched.

### 1. Fix filter-toggle entrance animation on slugged card

**Problem:** When filters toggle, the Swiper remounts (`key={swiperKey}`). Cards with `layoutId` (currently only Planet Money Bot) get treated as moving from their previous DOM location — sliding in from off-screen — instead of appearing in place like other cards.

**Fix in `ProjectsCarousel.tsx`:**
- Import `LayoutGroup` from `framer-motion`.
- Wrap the `<Swiper>` block in `<LayoutGroup id={swiperKey}>…</LayoutGroup>`. Each filter context becomes its own layout group; on filter change the old group unmounts and the new one mounts fresh with no prior position to animate from. Card → detail morph still works because it occurs within a single LayoutGroup instance (no remount on navigation).

### 2. Preserve rounded corners through the entire morph

**Problem:** Detail view stays `fixed inset-0` (desired fullscreen). Both endpoints have `borderRadius: 1.5rem`, but Framer Motion's layout animation isn't interpolating the radius continuously — corners flicker sharp mid-morph. This typically happens when the radius isn't on the same animated element as the layout, or an ancestor's clipping strips it.

**Fix in both files — apply identical inline style at both endpoints of every shared `layoutId`:**

On the **outer panel** (`card-${slug}`):
- Carousel side (`ProjectsCarousel.tsx`): the `motion.div` already has `style={{ borderRadius: '1.5rem' }}`. Add `overflow: 'hidden'` to the inline style so radius + clipping are both animated together: `style={{ borderRadius: '1.5rem', overflow: 'hidden' }}`. Remove the `overflow-hidden` Tailwind class from that element's `className` so there's only one source of truth for clipping (inline). Keep `rounded-3xl` removed in favor of inline radius.
- Detail side (`ProjectDetail.tsx`): the outer `motion.div` (`fixed inset-0 z-[60] bg-background overflow-y-auto`). Change inline style from `{ borderRadius: '1.5rem' }` to `{ borderRadius: '1.5rem', overflow: 'hidden' }`. Remove `overflow-y-auto` from className and move scrolling to an **inner wrapper** (a plain `div` with `h-full overflow-y-auto`) that holds the close button + `<article>`. This way the morphing element has stable `overflow: hidden` + radius at both ends; scrolling is delegated to a child that doesn't participate in the layout animation.

On the **hero image wrapper** (`card-image-${slug}`):
- Carousel side: currently a `motion.img` with `style={{ objectPosition, borderRadius: '1.5rem' }}`. Add `overflow: 'hidden'` to the inline style (harmless on `img` but keeps endpoints symmetric).
- Detail side: the hero `motion.div` already has `style={{ borderRadius: '1.5rem' }}`. Add `overflow: 'hidden'` inline and remove the `overflow-hidden` Tailwind class so the inline value is the only one Framer interpolates.

**Why this works:** Framer Motion animates inline `borderRadius` as a continuous numeric value when set via `style` on the layoutId element. By making both endpoints expose identical inline `{ borderRadius: '1.5rem', overflow: 'hidden' }` — with no competing Tailwind classes on the same element and no ancestor `overflow: hidden` stripping the radius mid-flight — the radius interpolates smoothly the entire way.

**Ancestor check:** No parent of the outer panel applies `overflow: hidden`. `main` in `Index.tsx` uses `overflow-x-hidden` only, which doesn't clip the radius (the morph happens within the viewport rectangle).

### 3. Smaller hero image in expanded view

**Fix in `ProjectDetail.tsx`:**
- On the hero `motion.div`: change `className="relative w-full aspect-[21/9] overflow-hidden border border-white/15"` to `className="relative w-full max-w-2xl mx-auto aspect-[21/9] border border-white/15"` (removed `overflow-hidden` per #2; added `max-w-2xl mx-auto`).
- Keep `aspect-[21/9]` so the aspect ratio stays stable through the morph.
- Keep inline `style={{ borderRadius: '1.5rem', overflow: 'hidden' }}`.
- Title, subtitle, tags below remain full article width — only the hero image is constrained.

### Out of scope
- Detail view stays fullscreen (`fixed inset-0`). No inset, no backdrop.
- Close button stays `fixed top-6 right-6 md:top-8 md:right-8`.
- Block layouts, typography, animation timing, carousel scroll/swiper config — untouched.

### Files to edit
- `src/components/ProjectsCarousel.tsx` — wrap Swiper in `LayoutGroup`; add `overflow: 'hidden'` inline on card + image motion elements; remove redundant `overflow-hidden` Tailwind on the card motion.div.
- `src/components/ProjectDetail.tsx` — add `overflow: 'hidden'` inline on outer panel and hero; move scrolling to an inner wrapper; constrain hero to `max-w-2xl mx-auto`; drop `overflow-hidden` Tailwind class on hero.
