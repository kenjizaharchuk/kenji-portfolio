## Goal

Push the Contact section's content down so the Projects → Contact gap visually matches the About → Projects gap. Edit only `ContactSection.tsx`.

## Why

`ContactSection` currently uses `pt-48` (12rem) on its `<section>`. The About → Projects gap is larger because `ProjectsCarousel` also has its own `pt-48` plus the natural end of the About section. To balance the two visual gaps, the Contact section needs more top breathing room.

## Change

### `src/components/ContactSection.tsx` (line ~32)

Increase the section's top padding. Keep everything else (bottom padding, horizontal padding, overflow) untouched.

- Before: `className="relative pt-48 pb-0 px-6 overflow-hidden"`
- After:  `className="relative pt-72 md:pt-80 pb-0 px-6 overflow-hidden"`

This adds roughly 6–8rem (~96–128px) of extra space above the heading/image row, which should bring the Projects → Contact gap into visual parity with About → Projects at the current 1483px viewport, while still scaling sensibly on smaller screens.

Nothing else in the file changes — typography, grid, image, panel styles, mobile overrides, and content all stay exactly as they are. `AboutSection.tsx` and `ProjectsCarousel.tsx` are not touched.

## Verification

Scroll the preview top → bottom and confirm:
- The empty space above "Contact Me!" is noticeably larger than before.
- The About → Projects gap and Projects → Contact gap now look balanced.
- No other visual change in the Contact section (image, panel, text, icons unchanged).

If the gap still looks too small after the change, we can bump to `pt-80 md:pt-96`; if it overshoots, drop to `pt-64 md:pt-72`.
