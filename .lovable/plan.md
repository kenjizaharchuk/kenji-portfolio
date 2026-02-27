

## Mobile-Only CSS Adjustments

Three targeted mobile fixes using media queries in `src/index.css`. No HTML, JS, dependency, or build changes.

### 1. About Me section — fix clipping and centering

The About section uses `h-screen` with `flex items-center justify-center` and the inner box has `ml-8 lg:ml-16`. On mobile, the left margin shifts it right, and the container can clip at the top.

**Fix:** Add a mobile media query that removes the left margin and adds top padding so the box is fully visible and centered.

### 2. "Things I've Made" cards — reduce text/tag size

The carousel cards use `text-2xl md:text-3xl` for titles and `text-sm` for tags with `px-3 py-1` padding. On mobile (the `w-[340px] h-[260px]` card size), these overpower the image.

**Fix:** Add mobile styles to reduce the card title to ~1.15rem, subtitle to ~0.75rem, and tag pills to ~0.65rem with tighter padding, giving the image more visual priority.

### 3. Contact image — center on mobile

The existing mobile CSS in `ContactSection.tsx` sets the image container width but doesn't center it horizontally.

**Fix:** Add `margin: 0 auto` and remove the `paddingLeft: '8vw'` override on the image column in the existing mobile media query styles.

### Technical Details

All changes go into `src/index.css` as new `@media (max-width: 768px)` rules, plus a small tweak to the inline `<style>` block in `ContactSection.tsx` to center the contact image.

**Files modified:**
- `src/index.css` — add mobile media queries for About section and carousel cards
- `src/components/ContactSection.tsx` — adjust existing mobile `<style>` block to center the image
- `src/components/AboutSection.tsx` — remove the hardcoded `ml-8 lg:ml-16` in favor of responsive classes

