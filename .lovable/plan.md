## Short answer

Small tweak. ~10-line change to `MorphLayer.tsx`. No restructuring needed, and it doesn't reintroduce the card-end mismatch.

## Why it currently reads as a fade

Looking at `flipPair` in `MorphLayer.tsx`: both variants **do** translate. Card-variant goes `cardRect → detailRect`, detail-variant goes `cardRect → detailRect`. They travel in lockstep along the same path.

The problem is exactly that lockstep: at every frame, both variants occupy nearly identical screen position and size. Since the positions match throughout, the only visual signal that distinguishes one variant from the other is **opacity**, and a linear `1→0` / `0→1` crossfade across the full 1.0s makes the dominant percept "fade in place" rather than "thing moving."

The motion is there. It's just drowned out by the crossfade.

## The fix: compress the crossfade into a short window

Keep both variants traveling along the full path (unchanged). Change opacity from a linear ramp to a delayed-and-fast swap:

```ts
// Opening: card-variant stays fully visible while it travels most of the way,
// then quickly hands off to detail-variant near the end.
opacity: openingOrOpen
  ? { values: [1, 1, 0], times: [0, 0.65, 0.8] }   // card variant
  : { values: [0, 0, 1], times: [0, 0.2, 0.35] }   // close: inverse
```

(Framer Motion supports keyframe arrays + `times` directly on `animate`.)

Effect: the eye locks onto a single element traveling from card position to detail position, with the style swap happening in a narrow window where both variants are at nearly identical screen size — making the handoff invisible while the *journey* becomes the dominant signal.

## Tradeoffs and risks

**Pros**
- Reads as physical travel, not fade.
- Card-end and detail-end visual matches are preserved exactly (each variant still hits its native rect at full opacity at the matching endpoint).
- Roughly 10 lines changed, in one file. No context/rect/measurement changes.

**Cons / things to watch**
- **Handoff visibility.** Currently the style difference (font size, weight, line-height, tag wrap) is smeared across the whole 1.0s, so any mismatch is invisible-per-frame. Concentrating the swap into ~150ms means any residual mismatch in that window becomes a brief pop. In practice the title string is identical, weights match, and at the swap moment both variants are ~95% of the way to the same target rect — so the pop should be undetectable. But it's the one thing worth eyeballing after the change.
- **Asymmetric tuning.** Open and close may want slightly different crossfade windows because attention lands differently in each direction. Probably fine with the same numbers; one knob to tune if not.
- **No regression to the original mismatch issue.** That bug was caused by uniformly scaling a single detail-styled variant down to card size. Each variant here is still rendered at its native style and FLIPped — endpoints are unchanged. Safe on that axis.

**What it does NOT fix**
- The image and frame don't have this issue (single element, clearly traveling). No change needed there.
- If you later want elements to feel like they *accelerate into* the detail position (motion-blur-ish), that's a different change (separate easing per variant, or staggered start times). Not part of this tweak.

## Recommendation

Worth doing now — it's cheap, reversible (just revert opacity keyframes), and the current "fade feel" is the kind of thing that gets harder to notice once content fills the page, so judging it now is easier than judging it later. If after trying it the handoff pop is visible, widen the crossfade window from ~150ms to ~250ms; that's the one dial.
