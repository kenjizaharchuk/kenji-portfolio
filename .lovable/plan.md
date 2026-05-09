## Goal
Show the left sidebar only when the About Me or Contact Me sections are intersecting the viewport. Hide it everywhere else (including all of Things I've Made).

## Change (single file)

**`src/components/HeroSidebar.tsx`** — simplify the visibility logic in the existing `useEffect` (currently lines ~31–84).

- Keep the `IntersectionObserver` on `#about` and `#contact`.
- Remove the `thingsObserver` and the `inThingsDominant` hysteresis logic entirely (no longer needed).
- Replace the `updateVisibility` rule with:
  ```ts
  setIsVisible(inAbout || inContact);
  ```
- Initial state changes from `useState(true)` to `useState(false)` so the sidebar starts hidden until the About observer fires on mount (it will fire immediately since About is the first section).

## What stays exactly the same
- Hover wave animation, line widths, label reveal, compact breakpoint logic.
- `scrollToSection` behavior (including the `things-content` centering fix).
- Nav items, IDs, typography, spacing, transition timing (`duration-500` opacity fade).
- Responsive classes (`hidden md:flex …`) — unchanged, so desktop/laptop/tablet/mobile behavior is consistent with current responsive rules.
- Preloader gating (`isPreloaderActive`).

## Why this is reliable
Using only About + Contact intersection (instead of inferring "not in Projects") means the sidebar's visibility is driven directly by the two sections where it should appear. Any gap, padding, or future section between them will correctly result in a hidden sidebar without extra tuning.

## Verification
After the edit, scroll through the page in the preview and confirm:
1. Sidebar visible while About Me is on screen.
2. Sidebar fades out as soon as About leaves the viewport and stays hidden through Things I've Made.
3. Sidebar fades back in when Contact enters the viewport.
