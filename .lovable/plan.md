## Diagnoses

**Issue 1 — Double-image flash on open (root cause):**
`MorphLayer` lingers one paint at `phase === 'open'` to prevent a black flash. In that same paint, `ProjectDetail` flips `showMorphedElements` to `true` (opacity 1) because the condition fires on `morph.phase === 'open'`. Result: for one frame, both the ghost image AND the real hero image are rendered. The two layers aren't sub-pixel identical (different DOM, different stacking, browser rounding), so the user sees a doubled image.

**Issue 2 — Black flash on close (root cause):**
`close()` sets `isClosing=true` (real elements start fading), then waits `CLOSE_FADE_MS = 160ms` before calling `morph.startClose()`. During that 160ms the real elements are fading toward 0 but no ghost is mounted yet → dark page background is the only thing visible.

**Issue 3 — Carousel disappears instantly on open (root cause):**
`ProjectDetail` renders its root as `<div className="fixed inset-0 z-[60] bg-background ...">`. The instant the route mounts at `t=0` of the morph, this opaque dark surface covers the entire viewport, hiding the carousel before the frame ghost has expanded. On close, the inverse works because ProjectDetail unmounts only after `navigate(-1)` runs, which is timed to the retract — but on open, mount is immediate.

---

## Fixes

### Fix 1 — Eliminate double-image (MorphLayer.tsx)

Replace the "linger then unmount" strategy with "fade ghost to 0 during linger frame". During `phase === 'open'`:
- Keep the portal mounted for one paint (linger), BUT
- Set the whole portal's `opacity` to 0 immediately when phase flips to 'open'

Real elements are visible (opacity 1) and ghost is invisible (opacity 0) in the same paint. No double image, no black gap. After the 1-paint linger, unmount the portal.

Implementation: wrap the portal's outer `<div>` with `style={{ opacity: phase === 'open' ? 0 : 1 }}`. The linger logic stays as-is for safe unmount timing.

### Fix 2 — Start close retract immediately (ProjectDetail.tsx)

Restructure `close()`:
```
setIsClosing(true);                       // real elements begin fading
morph.startClose(detailRects, cardRects); // ghost retraction starts NOW
navigate(-1 or '/');                      // schedule unmount via existing route flow
```
Remove the `setTimeout(..., CLOSE_FADE_MS)`. The CSS `transition: opacity 160ms` on real elements still produces a graceful fade, but it now overlaps the start of the 1s ghost retract instead of preceding it. No gap.

Concern: the ghost mounts and starts animating immediately while real elements are still partly visible behind it for ~160ms. The ghost sits at `z-index: 65` and the page is `z-index: 60`, so the ghost is on top — the cross-dissolve actually reads as a smooth handoff (real elements fading out under a ghost that's just starting to move). This is desirable, not a bug.

### Fix 3 — Don't paint the page background on open (ProjectDetail.tsx)

Make the root `bg-background` conditional on phase. The page background should appear ONLY when the frame ghost has finished expanding (i.e., NOT during `opening`).

```tsx
const pageBgVisible = skipEnterAnimation || morph.phase !== 'opening';
// root: className without bg-background; style={{ backgroundColor: pageBgVisible ? 'hsl(var(--background))' : 'transparent' }}
```

During `opening`: root is transparent → carousel/stars visible underneath → frame ghost expands over them (matches the close direction's reveal).
At `phase === 'open'` (and during `closing`): root has its solid background as today.

The carousel/Index page still renders in the DOM behind ProjectDetail (route is `/projects/:slug` which also renders `<Index>` per App.tsx routing — verify quickly, but the user's observation that close works confirms it). If for any reason the carousel doesn't paint behind ProjectDetail, we can additionally make ProjectDetail mount-skip its content rendering during `opening` and only show the close button + measurement refs in hidden form.

---

## Technical notes

- No changes to `morphContext.tsx`, `ProjectsCarousel.tsx`, `App.tsx`, or `projects.ts`.
- Files touched: `src/components/MorphLayer.tsx`, `src/components/ProjectDetail.tsx`.
- Ordering for #2: dispatching `setIsClosing(true)` and `morph.startClose(...)` in the same tick is safe — React batches; the ghost mounts with `phase: 'closing'` and animates from detailRects → cardRects in 1s, real elements fade 0→1 in 160ms underneath.
- For #3, verify the route stack does keep `<Index>` mounted under `<ProjectDetail>`. If not, a one-line fallback is to render the carousel route content even on `/projects/:slug` (already the case based on App.tsx — both routes use `<Index />`).

## Tradeoffs / concerns

- Fix 1 assumes one `requestAnimationFrame` of `opacity: 0` ghost + opacity-1 real is enough to "cover the handoff." If we still see any flicker, the next iteration is to gate `showMorphedElements` on a context flag set after the linger completes (slightly more wiring).
- Fix 2's overlap (ghost visible while real fades) is intentional and visually superior to the current sequential gap.
- Fix 3 only matters for the `opening` phase; during the linger frame at `open`, we want the bg solid so there's no flash if anything goes wrong with the ghost layer.