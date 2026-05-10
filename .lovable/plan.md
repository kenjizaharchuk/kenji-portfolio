## Plan

Update only `src/components/HeroSidebar.tsx` so sidebar visibility is based on real visual collision with the Projects carousel/cards, not broad Projects section visibility.

### Collision target

- Use `.projects-carousel` (already present on the Swiper element in `ProjectsCarousel.tsx`, line 331) as the overlap target. This element wraps only the visible carousel/cards — not the heading, filter chips, or section background.
- Do NOT use `#things` or `#things-content` as the collision target.
- No markup change is needed since `.projects-carousel` already exists.

### Logic changes in `HeroSidebar.tsx`

1. Keep the existing About and Contact `IntersectionObserver`s so the sidebar still only appears in those regions.
2. Remove the `#things` and `#things-content` intersection observers and the `inProjectsOuter` / `inProjectsInner` flags.
3. Add a `useEffect` that performs a real overlap check using `getBoundingClientRect()`:
   - Read the sidebar `<nav>` rect via a `ref`.
   - Read the `.projects-carousel` rect via `document.querySelector('.projects-carousel')`.
   - Compute axis-aligned rectangle overlap (both horizontal AND vertical overlap must be true).
   - Store the result in an `overlapsCarousel` state.
4. Trigger the check on:
   - Initial mount.
   - `scroll` (passive listener) wrapped in `requestAnimationFrame` to throttle.
   - `resize`.
   - Cleanup all listeners on unmount.
5. Final visibility rule:

```ts
setIsVisible((inAbout || inContact) && !overlapsCarousel);
```

### What will not change

- No layout, spacing, scroll behavior, carousel behavior, hover animation, typography, images, cards, content, or markup outside the sidebar visibility logic.
- No broad viewport-based Projects hiding rule.
- The Projects heading, filter chips, or background alone will never hide the sidebar — only actual carousel/card overlap will.