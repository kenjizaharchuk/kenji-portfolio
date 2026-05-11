# Three Polish Fixes for the Morph

## Issue 1 — Image squishes on close (root cause + fix)

**Diagnosis.** The image ghost is rendered at the hero rect (~21:9) and animated via non-uniform `scaleX` / `scaleY` transforms. Card rect ≈ 1.43:1, hero rect ≈ 2.33:1 — those aspect ratios are very different, so `scaleX ≠ scaleY` for the entire flight. The wrapper has `object-cover` on the `<img>`, but `object-cover` only re-fits at the *source* layout size; once a non-uniform transform is applied, the rendered pixels stretch with it. Mid-flight the image is literally squashed.

**Why open looks fine and close doesn't.** Mathematically the distortion is identical in both directions. Perceptually it's much more visible on close because the image starts large (hero-size) and shrinks — the squish dominates a big portion of the viewport. On open it starts as a small card-sized element and grows; the eye is tracking the page assembling itself, not scrutinizing image proportions.

**Fix.** Switch the image ghost from transform-scale to animating `top` / `left` / `width` / `height` directly. The `<img>` inside is `object-cover w-full h-full`, so at every interpolated frame the browser re-fits cover — zero distortion, identical visual on both directions. Frame stays on transform-scale (a flat dark rectangle has no aspect to distort, and we want compositor-friendly scaling there).

Cost: one element animating layout properties for 1s. Trivial — single layer, no children depending on its layout.

## Issue 2 — Black flash on landing (root cause + fix)

**Diagnosis.** Today, at `t=0.9s`:
- `onAnimationComplete` flips `phase` to `'open'`, which makes `MorphLayer` return `null` (ghost unmounts that frame).
- Simultaneously the real hero image, hero border, title block, and tags flip their `opacity` from 0 → 1 via a Tailwind `transition-opacity duration-200` CSS transition.

Result: the ghost vanishes instantly while the real elements take 200ms to fade in. The detail page's `bg-background` (dark) shows through that 200ms window — the "black flash."

**Fix (two small adjustments, work together).**

1. **Remove the 200ms CSS transition on the four real elements for the open direction.** They should snap to `opacity: 1` the same frame `phase === 'open'`. (Close direction continues to fade out via `isClosing`, which we keep as a JS-driven 160ms — handled by a small `closingFade` boolean separate from the open gate.)
2. **Defer ghost unmount by one paint.** In `MorphLayer`, when `phase === 'open'`, keep rendering for one additional `requestAnimationFrame` tick (small `useState` + `useEffect`). This guarantees the real elements paint at opacity 1 in the same (or prior) frame the ghost disappears — no gap, no flash.

Net effect: at `t=0.9s` the ghost and real elements occupy the same pixels for one frame, then the ghost lifts off cleanly.

Also nudge the body-content fade-in (`restAnimate`) `delay` from `0.55` → `0.45` so the surrounding case-study content is already ~70% faded in when the ghost lands. This isn't strictly required to kill the flash, but it makes the landing feel less like "page assembles after morph" and more like "page is already there."

## Issue 3 — Easing (recommendation)

Current curve `[0.22, 1, 0.36, 1]` is a strong ease-out: snaps fast at the start, glides at the end. That's exactly the "screen pops open" feeling you described.

Recommendation: switch to a symmetric ease-in-out cubic, `[0.65, 0, 0.35, 1]`, and bump duration `0.9s → 1.0s`. This gives a soft start, builds speed through the middle, and decelerates into the landing — feels like the page is taking a breath before opening. Same curve on the close, so retracting feels equally graceful.

No tradeoffs against the other fixes — easing is independent.

## Files to edit

- `src/components/MorphLayer.tsx`
  - Image ghost: animate `top` / `left` / `width` / `height` instead of `x/y/scaleX/scaleY`.
  - Add 1-frame deferred unmount when `phase === 'open'` (local `linger` state + rAF).
  - Update `DURATION = 1.0`, `EASE = [0.65, 0, 0.35, 1]`.
- `src/components/ProjectDetail.tsx`
  - Replace `transition-opacity duration-200` on hero img, hero border, title block, tags with no transition for the open direction. Drive a separate `closingFade` opacity for close (instant on open, 160ms on close — can be done with inline `transition` style toggled by `isClosing`).
  - `restAnimate` delay `0.55 → 0.45`.

No changes to context, carousel, routing, or `projects.ts`.

## Tradeoffs / concerns

- Animating `width`/`height`/`top`/`left` on the image ghost is not compositor-accelerated, but it's a single element for 1s — well within the perf budget. If a stutter ever appears on lower-end devices, fallback is a two-layer trick (outer non-uniform scale, inner counter-scale on the img) but that's not warranted yet.
- The 1-frame ghost linger relies on real elements painting at opacity 1 in the same frame. If we ever see a single-frame double-image (ghost + real both visible), they're at identical position and identical pixels, so it reads as nothing — strictly safer than a gap.
- Longer duration (1.0s) is a perceptible change. If after seeing it 1.0s feels too leisurely, dropping to 0.95s with the same curve is the obvious tuning knob.
