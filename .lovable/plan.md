# Fixing the card-end visual mismatch

## Diagnosis (your hypothesis was correct, with one refinement)

The ghost currently renders **one copy** of each text/tag block using the **detail view's intrinsic styles** (subtitle `text-sm md:text-base`, title `text-4xl md:text-6xl`, tags in detail-width flex-wrap), and uniformly scales that copy down to fit the card at the card-end.

Two sources of mismatch follow from this:

1. **Title block** — the measured rect is the wrapper that contains *both* the subtitle and the `h1`. The detail subtitle (`"LEAD DESIGNER · DIGITAL DESIGN · WORK EXPERIENCE"`) is much longer than the card subtitle (`"Lead Designer"`), so the detail wrapper is wider than its title alone. Card-side measures a narrower wrapper. The width ratio used for uniform scale ends up smaller than the true font-size ratio (30/60 = 0.5), so the title shrinks *past* the real card title's size.

2. **Tags** — chip styles are identical between views, but card and detail containers wrap chips at different widths, into different numbers of rows. Scaling detail-layout chips by `cardTagsWidth / detailTagsWidth` produces chips that are smaller than the real card's chips (which never reflowed and are at intrinsic font size).

The subtitle already crossfades two stacked variants, which is why nobody complained about it.

## Fix: dual-render the title slot and the tags, crossfade between them

Render **both** a card-styled variant and a detail-styled variant for the title block and the tags. Each variant is laid out at its own natural size (no width animation, no reflow). Each variant FLIPs between the card rect and the detail rect using its own transform. They crossfade based on phase progress.

At the card-end: card-variant is opacity 1, detail-variant is opacity 0 — perfect visual match with the real card.
At the detail-end: inverse — perfect match with the resting case study.
In the middle: both variants occupy nearly the same screen size and position (the title scales linearly because the string is identical and font weight matches; chips have identical intrinsic sizing). The crossfade therefore reads as a continuous resolve, not a "pop."

This is the technique the subtitle is already using; we extend it to title and tags.

## Implementation

### `morphContext.tsx`
Extend `MorphRects` so the ghost can position each variant precisely:

```ts
interface MorphRects {
  frame: Rect;
  image: Rect;
  titleText: Rect;   // the <h3>/<h1> element only
  subtitle: Rect;    // the subtitle <p> element only
  tags: Rect;        // unchanged role, but tags-of-the-source-view
}
```

Drop the old combined `title` rect.

### Measurement sites
- `ProjectsCarousel.tsx` (card side): add `data-card-part="subtitle"` to the card's subtitle `<p>` and `data-card-part="title"` to the `<h3>`. Measure both. `tags` rect already measured.
- `ProjectDetail.tsx`: add refs for the detail subtitle `<p>` and the detail `<h1>`. Measure both into `detailRects.subtitle` and `detailRects.titleText`. `tagsBlockRef` already measured.

### `MorphLayer.tsx` — render two variants per slot

**Title slot.** Two stacked `<h1>`s:
- **Card-title variant** — classes `text-2xl md:text-3xl` (matches real card). Positioned at `detailRects.titleText` with transform `inverseUniform(cardRects.titleText, detailRects.titleText)` at card-end and identity at detail-end. *Wait — render it at the card layout instead*: position at `cardRects.titleText`, identity at card-end, transform to `detailRects.titleText` at detail-end. Cleaner mental model.
- **Detail-title variant** — classes `text-4xl md:text-6xl`. Position at `detailRects.titleText`, identity at detail-end, transform to `cardRects.titleText` at card-end.
- Opacity: card-variant `1 → 0`; detail-variant `0 → 1`. Reverse for closing.

**Subtitle slot.** Same dual-FLIP, replacing the current "stacked at detail layout" approach. Card-variant uses the card's subtitle classes (`text-base text-white/70`), positioned at `cardRects.subtitle`. Detail-variant uses the detail classes (`text-sm md:text-base text-white/60`), positioned at `detailRects.subtitle`.

**Tags slot.** Two stacked tag containers:
- **Card-tags variant** — rendered inside a `width: cardRects.tags.width` flex-wrap, so chips wrap exactly like the real card. Position at `cardRects.tags`, identity at card-end, uniform scale to `detailRects.tags` at detail-end.
- **Detail-tags variant** — rendered inside a `width: detailRects.tags.width` flex-wrap. Position at `detailRects.tags`, identity at detail-end, uniform scale to `cardRects.tags` at card-end.
- Each variant's *own* width is fixed (no animation), so there is no reflow during the morph. The chips on each variant are at their natural intrinsic size when their opacity is 1.

**Frame and image** — unchanged.

### `ProjectDetail.tsx`
- Add the two new refs (subtitle, titleText) and populate `detailRects` accordingly.
- The "resting" opacity-toggled elements stay as-is.

## What this preserves

- No tag reflow during flight (each variant's container width is constant).
- No title pop at midpoint (same string, linear scale, near-identical screen size; the crossfade lands on overlapping visuals).
- Hero border behavior, easing curve (`[0.65, 0, 0.35, 1]`, 1.0s), z-layering, page background, and close-direction overlap from the prior fixes all stay exactly as they are.

## Files touched

- `src/lib/morphContext.tsx` — extend `MorphRects` (add `titleText`, `subtitle`; drop `title`).
- `src/components/ProjectsCarousel.tsx` — measure card subtitle + title elements; populate new rect shape.
- `src/components/ProjectDetail.tsx` — add subtitle/titleText refs; populate new rect shape.
- `src/components/MorphLayer.tsx` — replace single-variant title block + single-variant tags with dual-render + crossfade.
