## Diagnosis

**"Duplicate" featured article:** There's only one `featuredArticle` block in the data. The visual duplication is because `pmb-article-thumb.png` is a screenshot of the actual article header — it already contains "Published in JSK Fellows", the title, the description, and the date. The card then re-renders all four below the image, which reads as two stacked cards.

**Figma iframe scroll jump:** The current `useFigmaScrollGuard` saves `scrollTop` on `mousedown` and restores on `window.blur`. The actual trigger is the browser scrolling the focused iframe into view, which fires `scroll` on the `[data-detail-scroll]` container — not always on window blur, and not always within one rAF. The save-and-restore window is too narrow and watches the wrong event.

## Changes

### 1. `src/data/projects.ts`
- Add a `featuredImage` block between `context` and the first `processNarrative` for `planet-money-bot`, using the laptop screenshot (`pmb-laptop-hero.png`), `width: 'md'`, `aspect: '16/10'`. Copy `user-uploads://Screenshot_2026-05-11_at_2.21.09_AM.png` to `src/assets/pmb-laptop-hero.png`.
- Convert the "Final UI & Visual Language" block from `processNarrative` to two consecutive blocks:
  - A small `processNarrative` with the heading + paragraph and `images: []`.
  - A `featuredImage` with `pmbFinalScreens`, `aspect: '21/9'`, `width: 'lg'` (~80% width, centered).
- (No data duplication of `featuredArticle` to remove — confirmed only one exists.)

### 2. `src/components/ProjectDetail.tsx`

**Featured article card — narrower + de-duplicate text:**
- Wrap the card in `<div className="mx-auto w-full md:max-w-[60%]">` so it renders at ~60% width, centered.
- Because the thumbnail image already contains the source / title / description / date, when `block.thumbnail` is present, render **only the thumbnail** inside the white card (no text block beneath). When no thumbnail, keep the current text layout. This eliminates the perceived "two cards" without losing information.

**Figma iframe scroll guard — stronger fix:**
Replace `useFigmaScrollGuard` with a version that:
- Still captures `scrollTop` on `mousedown` (capture phase) on the wrapper.
- Sets a `guardedUntil = performance.now() + 800` timestamp.
- Attaches a `scroll` listener on the `[data-detail-scroll]` container (passive: false where needed). While `performance.now() < guardedUntil`, if `scrollEl.scrollTop !== saved`, immediately reassign `scrollEl.scrollTop = saved`. This snaps the container back regardless of what triggered the scroll (focus-into-view, postMessage-driven layout, etc.).
- Also handles `focusin` on window (iframe focus often fires this) to refresh `saved` and extend the guard.
- Keeps `tabIndex={-1}` on the iframe as a belt-and-suspenders measure.
- Cleans up on unmount.

This neutralizes the scroll jump regardless of which event the browser actually fires when the user clicks the Figma page-selector dropdown.

### Files touched
- `src/assets/pmb-laptop-hero.png` (new, copied from upload)
- `src/data/projects.ts`
- `src/components/ProjectDetail.tsx`

### Sizing principle going forward
Hero / final-screens collage: full or near-full width (`21/9`, lg). Process imagery: medium width. Closing article card: ~60% width. Applied here; will reuse for future projects.
