## Problem

`HeroSidebar` is still mounted in `Index.tsx` and styled correctly (`fixed left-…`, `z-50`, `hidden md:flex`), so it should appear at the current 1483px viewport. The reason it disappears in preview is the visibility logic in `HeroSidebar.tsx`.

The current logic observes only the `#things` section and hides the sidebar whenever `things` has `intersectionRatio > 0.05`. Two issues with that:

1. The Projects section is `min-h-screen` and sits directly above Contact. When the user scrolls into the Contact section, the bottom of `#things` is still intersecting the top of the viewport, so the sidebar stays hidden on Contact.
2. On initial load / when scrolled to the very top (About), if the observer hasn't fired yet or `things` is partially visible at the bottom of the viewport on tall screens, the sidebar can also flicker hidden.

Net effect: sidebar feels like it "went away," even though nothing was removed.

## Fix (single file: `src/components/HeroSidebar.tsx`)

Replace the single-observer logic with a check that hides the sidebar **only when `#things` dominates the viewport** (i.e., the user is actually in the Projects section), not whenever it's barely intersecting.

Approach:
- Keep observing `#things`, but raise the hide threshold so the sidebar only hides when a meaningful portion of `things` is in view (e.g., `intersectionRatio >= 0.5`), with thresholds `[0, 0.25, 0.5, 0.75, 1]`.
- Alternatively / additionally, also observe `#about` and `#contact` and force the sidebar visible whenever either is intersecting the viewport at all — that guarantees it shows on both sections regardless of what `things` is doing at the edges.
- Combine: `isVisible = inAboutOrContact || !inThingsDominant`.

No changes to:
- Sidebar styles, position, z-index, or markup
- `Index.tsx` mounting
- Any section layouts (`AboutSection`, `ProjectsCarousel`, `ContactSection`)
- Mobile behavior (`hidden md:flex` stays)

## Verification

1. Load `/` — sidebar visible over About.
2. Scroll into Projects/Things — sidebar fades out.
3. Continue scrolling into Contact — sidebar fades back in and stays visible through the Contact section.
4. Confirm at viewport 1483×905 (current) and at ~1100px and ~768px breakpoints.

## Technical detail

In `HeroSidebar.tsx`, the `useEffect` that sets up `thingsObserver` will be replaced with three observers (`about`, `things`, `contact`) tracking three boolean refs, and `updateVisibility` becomes:

```ts
setIsVisible(inAbout || inContact || !inThingsDominant);
```

with `inThingsDominant` flipping true at `intersectionRatio >= 0.5` and false below `0.25` (small hysteresis to avoid flicker). Thresholds passed to the `things` observer: `[0, 0.25, 0.5, 0.75, 1]`. About/Contact observers use threshold `0` (any intersection counts).