## Diagnosis

### Issue 1 — Back button leaves carousel hidden

The card sets `opacity: 0` when `morph.slug === project.slug && morph.phase !== 'idle'`. The morph state is only reset by the close-button flow (`close()` in `ProjectDetail.tsx`), which calls `morph.startClose()` → animation → `morph.reset()` via `MorphLayer.onFrameComplete`.

Browser back fires `popstate` → React Router updates `slug` to undefined → `ProjectDetail` unmounts. Nothing calls `morph.reset()`, so `morph.phase` stays `'open'` and the matching card stays hidden. (The MorphLayer itself is invisible because `phase === 'open'` sets opacity to 0, so visually the card just appears "missing.")

### Issue 2 — Horizontal trackpad swipe triggers browser navigation

The Swiper container doesn't set `overscroll-behavior-x`, so when the carousel hits an edge (or even mid-scroll in some browsers/Swiper modes), the horizontal wheel/swipe deltas bubble to the page and trigger the browser's two-finger swipe back/forward gesture.

## Fix

### 1. Reset morph on back-navigation (and animate when possible)

**Preferred path: intercept `popstate` inside `ProjectDetail` and route it through `close()`** so the back-button gets the same close animation as the close button.

- Add a `popstate` listener in `ProjectDetail` that:
  1. Pushes the current `/projects/:slug` URL back onto history via `history.pushState` (cancels the user's back navigation in-place, without a real navigation).
  2. Calls `close()`, which already handles the close morph and then calls `navigate(-1)` at the right time.
  3. A small ref guards against re-entry while closing.
- This makes back-button behavior identical to clicking the close button.

**Safety net: unmount cleanup.** If for any reason the component unmounts while `morph.phase !== 'idle'` and not already closing (e.g., direct URL change, edge cases), call `morph.reset()` in a `useEffect` cleanup. This guarantees the carousel can never be left in the broken state.

### 2. Contain horizontal swipe in the carousel

In `ProjectsCarousel.tsx`, on the Swiper element (or a wrapping `div`):

- Add inline style / Tailwind: `overscroll-behavior-x: contain` (using `[overscroll-behavior-x:contain]` arbitrary class, since there's no built-in token for x-axis only).
- Add `touch-action: pan-y` on the carousel container so horizontal touch/trackpad gestures are consumed by Swiper and not interpreted as page-level horizontal scroll/back-swipe.

These two CSS properties together are the standard fix and don't affect the manual back/forward buttons.

## Files to change

- `src/components/ProjectDetail.tsx` — add popstate interceptor + unmount safety reset.
- `src/components/ProjectsCarousel.tsx` — add `overscroll-behavior-x: contain` and `touch-action: pan-y` to the Swiper wrapper.

## Risks / notes

- The popstate interceptor must guard against infinite loops: the `pushState` we do to cancel the back must not itself fire popstate (it won't — `pushState` doesn't), and `close()`'s own `navigate(-1)` must be allowed to proceed. A simple `isClosingRef` flag handles this.
- If the user mashes back rapidly, the cleanup `morph.reset()` in unmount is the backstop.
- `overscroll-behavior-x: contain` is supported in all modern browsers; no regression risk for keyboard/manual back navigation.
