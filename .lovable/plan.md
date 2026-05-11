## Diagnosis

### Issue 1: Browser back leaves carousel card hidden

**Why it happens.** The carousel hides the source card while a morph is active:

```ts
const isHidden = hasSlug && morph.slug === project.slug && morph.phase !== 'idle';
```

The morph state is only cleared by `MorphLayer.onFrameComplete` at the end of the closing animation. The close button flow drives that:

1. `close()` sets `isClosing` → calls `morph.startClose(...)` (phase becomes `'closing'`)
2. `close()` calls `navigate(-1)` → `ProjectDetail` unmounts
3. `MorphLayer` (mounted in `App`) keeps animating, then calls `reset()` on completion → card reappears

When the user presses browser back instead, React Router immediately changes the route, `ProjectDetail` unmounts before `startClose` is ever called, so `morph.phase` stays `'open'` forever and the source card stays hidden.

**Why the previous fix broke the close button.** Any `popstate` interceptor that calls `close()` re-enters: `close()` itself calls `navigate(-1)`, which fires `popstate` again. Without a guard, the second `popstate` either cancels the navigation (close button appears to do nothing) or skips the animation.

### Issue 2: Trackpad horizontal swipe triggers browser back/forward

The Swiper container doesn't set `overscroll-behavior-x`, so horizontal wheel/swipe deltas that hit the page edge are interpreted by the browser as a navigation gesture.

---

## Proposed approach

### Fix 1 — intercept `popstate` in `ProjectDetail`

On mount, push a sentinel history entry (`history.pushState({ morphSentinel: true }, '', location.href)`) and attach a `popstate` listener. When it fires:

- If `isClosingRef.current` is `true`, the popstate was triggered by `close()`'s own `navigate(-1)`. Do nothing — let the browser go back normally.
- Otherwise the user pressed browser back. Re-push the URL (`history.pushState(null, '', /projects/${slug})`) to cancel the navigation in place, then call `close()`. `close()` sets `isClosingRef`, plays the morph, then `navigate(-1)`; the listener sees the flag and lets that one through.

Cleanup on unmount: remove the listener. Also pop the sentinel entry if we're unmounting via the close-button flow (clean history).

**Safety net.** Add a `useEffect` cleanup in `ProjectDetail` that, on unmount, checks `morph.phase !== 'idle' && !isClosingRef.current` and calls `morph.reset()`. This guarantees the card is never left hidden even if any edge case slips past the popstate interceptor (e.g. browser-specific quirks, programmatic navigation).

**Why this won't re-break the close button.**
- The sentinel pushState happens once on mount; close button never touches it.
- `close()` is unchanged.
- The popstate listener short-circuits when `isClosingRef.current` is set, so `close()`'s `navigate(-1)` proceeds untouched and the animation runs.

### Fix 2 — contain horizontal overscroll on the carousel section

In `ProjectsCarousel.tsx`, add Tailwind arbitrary classes to the Swiper wrapper / section:

```tsx
className="projects-carousel w-full max-w-7xl [overscroll-behavior-x:contain] [touch-action:pan-y]"
```

`overscroll-behavior-x: contain` prevents horizontal scroll chaining to the browser (kills the gesture-back behavior on macOS trackpads, Chrome/Safari/Firefox). `touch-action: pan-y` does the same for touch devices. Mouse-clicked back/forward buttons are unaffected — those don't go through the gesture path.

---

## Files to change

- `src/components/ProjectDetail.tsx` — add popstate interceptor with `isClosingRef`, sentinel pushState on mount, unmount safety-net `morph.reset()`.
- `src/components/ProjectsCarousel.tsx` — add `[overscroll-behavior-x:contain] [touch-action:pan-y]` to the Swiper.

## Verification checklist

1. Click close button → morph animation plays → carousel returns with card visible. (must still work)
2. Press browser back → same morph animation plays → carousel returns with card visible.
3. Trackpad swipe-left/right in carousel → carousel scrolls, browser does NOT navigate back.
4. Clicking the actual back-arrow button in the browser chrome bar → still works (gesture-only is blocked, but explicit popstate is still handled by the same interceptor and runs the close animation).
5. Direct URL visit to `/projects/:slug` then back → no morph in flight, listener still cleans up, lands on homepage.
