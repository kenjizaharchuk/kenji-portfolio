

## Narrow the Text Column by ~5%

**File:** `src/components/AboutSection.tsx`

Reduce the text column's flex-grow value from `flex-[1.3]` to `flex-[1.2]`. Since the image column is `flex-none` (fixed size), shrinking the text column's grow factor will naturally widen the gap between text and image without touching the image or adding explicit spacing.

No other changes -- the gap utilities, image column, container, and responsive behavior all stay as-is.

