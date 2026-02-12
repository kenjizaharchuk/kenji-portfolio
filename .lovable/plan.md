

## Push "Things I've Made" Down + Add Card Outlines

### What Changes

**1. Increase top spacing on "Things I've Made" section**

The About section ends right at the viewport edge (it's a pinned full-screen section). Currently, "Things I've Made" only has `pt-12` (48px) / `md:pt-16` (64px) of top padding, while Contact has `pt-48` (192px). To equalize the visual gap between sections, we'll increase the Projects section top padding to `pt-48` to match Contact.

**2. Add subtle border outline to project cards**

Add a `border border-white/15` to each project card for a soft, elegant highlight that complements the dark starfield background without being distracting.

### Technical Details

**File: `src/components/ProjectsCarousel.tsx`**

- **Line 280** -- Section element: change `pt-12 pb-16 md:pt-16 md:pb-20` to `pt-48 pb-16 md:pb-20`
- **Line 337** -- Card container div (the `rounded-3xl overflow-hidden` div): add `border border-white/15` to existing classes

