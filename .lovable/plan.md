

## Equalize Spacing Above and Below the Carousel

### What Changes

Make the gap between the "Projects" heading and the cards equal to the gap between the cards and the filter chips, creating a visually symmetric layout.

Both will be set to the same value (`mt-8` / `mb-8`, which is 32px).

### Technical Details

**File: `src/components/ProjectsCarousel.tsx`**

- **Heading div** (currently `mb-12`): Change to `mb-8` -- this closes the gap between "Projects" and the cards
- **Filter chips container** (currently `mt-5`): Change to `mt-8` -- this pushes the filter buttons slightly further from the cards

`mb` = margin-bottom (space below an element), `mt` = margin-top (space above). Setting both to `8` (32px) makes the spacing identical on both sides of the carousel.

