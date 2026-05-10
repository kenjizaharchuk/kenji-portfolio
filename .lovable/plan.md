## Refinements to Project Detail View

Three targeted fixes, scoped to `ProjectsCarousel.tsx` and `ProjectDetail.tsx`. No other files touched.

### 1. Fix carousel card border-radius after close

**Problem:** Framer Motion's `layoutId` animation overrides `rounded-3xl` during the shared transition, leaving the card with sharp corners on return.

**Fix:** In `ProjectsCarousel.tsx`, on the `motion.div` with `layoutId={`card-${slug}`}`, add inline `style={{ borderRadius: '1.5rem' }}` (matches `rounded-3xl` = 24px). Apply the same inline radius on the `motion.img` for `card-image-${slug}` so both ends have an explicit, animatable radius.

In `ProjectDetail.tsx`, the hero image wrapper (`layoutId={`card-image-${project.slug}`}`) currently uses `rounded-3xl` — switch to inline `style={{ borderRadius: '1.5rem' }}` to match.

### 2. Unify content block widths in detail view

**Problem:** `BlockRenderer` cases use mixed `max-w-3xl` / full-width layouts, creating inconsistent left edges.

**Fix:** In `ProjectDetail.tsx`:
- The `<article>` already uses `max-w-5xl mx-auto px-6 md:px-10` — keep it as the single shared container.
- Remove per-block `max-w-3xl` constraints from `context`, `pullQuote`, and `outcome` blocks so they fill the article width.
- `gallery`, `embed`, `process` already span full width — leave their internal layout intact.
- Result: every block aligns to the same left/right edges defined by the parent article.

### 3. Shorter hero via aspect ratio (not fixed height)

**Fix:** In `ProjectDetail.tsx` hero `motion.div`, replace `aspect-[16/10] md:aspect-[16/9]` with `aspect-[21/9]` (cinematic widescreen). Keeps the aspect ratio stable through the morph (no mid-animation recrop/stretch) while making the hero shorter so a hint of content below is visible.

### 4. Rounded corners on outer detail container

**Fix:** In `ProjectDetail.tsx`, change the outer `motion.div`'s `style={{ borderRadius: 0 }}` to `style={{ borderRadius: '1.5rem' }}` so the rounded corners persist through the entire morph and match the site's visual language.

### Out of scope
- Close button styling/position (untouched per request).
- Carousel scroll, swiper config, hover behavior, typography, or any other animation timing.

### Files to edit
- `src/components/ProjectsCarousel.tsx` — inline `borderRadius` on card + image motion elements.
- `src/components/ProjectDetail.tsx` — inline `borderRadius` on outer container and hero image, remove per-block max-widths, change hero aspect to 21/9.
