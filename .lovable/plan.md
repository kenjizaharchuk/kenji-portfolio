## Diagnosis

`overscroll-behavior-x: contain` only takes effect on **native scroll containers** — i.e. an element with `overflow-x: auto/scroll` whose content is wider than its box. Swiper is not a native scroll container: it uses CSS transforms on a flex track and consumes wheel/touch events via JS handlers. The Swiper wrapper never actually scrolls in the browser's eyes, so the overscroll mechanism never engages. Putting `overscroll-behavior-x: contain` on it is a no-op.

The browser's trackpad-swipe back/forward gesture (macOS Safari/Chrome) is triggered when:
- A horizontal-dominant wheel/swipe event reaches an element that **isn't a horizontally-scrollable native container**, OR
- The horizontal scroll on such a container reaches its edge without `contain`/`none` set.

In our case the page itself has no horizontal scroll, and Swiper doesn't qualify as a scroll container, so every horizontal trackpad gesture is eligible for navigation — explaining why it triggers so easily, not only at edges.

`touch-action: pan-y` is also irrelevant here: it governs touch (finger) gestures, not trackpad wheel events.

---

## Proposed approach

Two layered fixes — together they make browser-swipe-nav impossible while interacting with the page, without breaking Swiper or mouse-clicked back/forward.

### Fix A — Disable swipe-nav globally via CSS

Add to `src/index.css`:

```css
html, body {
  overscroll-behavior-x: none;
}
```

Setting it on the root scrolling element (`html`/`body`) tells the browser: never treat horizontal overscroll on this document as a navigation gesture. This is the documented, supported way to opt out of swipe-back across Chrome, Edge, Firefox, and Safari (Safari 16+). It does **not** affect:
- The browser's back/forward toolbar buttons (those are explicit navigations, not gestures).
- Keyboard shortcuts.
- Swiper's own horizontal interaction (Swiper handles wheel/touch in JS; this property only governs the browser's overscroll/gesture behavior).

This single change typically fixes the issue completely. The earlier attempt failed only because it was scoped to a non-scrolling element.

### Fix B — Belt-and-suspenders: preventDefault on horizontal wheel inside the carousel section

In case any browser/version still slips through (older Safari, or future regressions), attach a non-passive `wheel` listener to the `#things` section that calls `preventDefault()` when the gesture is horizontal-dominant:

```ts
useEffect(() => {
  const el = sectionRef.current;
  if (!el) return;
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
  };
  el.addEventListener('wheel', onWheel, { passive: false });
  return () => el.removeEventListener('wheel', onWheel);
}, []);
```

Calling `preventDefault()` on the wheel event blocks the browser's gesture interpretation. Swiper's mousewheel module reads `deltaX` from the same event (event listeners are independent — preventDefault doesn't stop other listeners from receiving the event), so carousel scrolling continues to work normally.

Scoping this to the `#things` section (not the whole document) means vertical-dominant scrolls outside the carousel are untouched, and only horizontal-dominant wheel deltas over the carousel section are swallowed.

### Why this won't break things

- Fix A is a single declarative CSS property; it only changes overscroll/gesture behavior, not scrolling itself.
- Fix B preventDefaults only horizontal-dominant wheel events, and only within the carousel section. Swiper's own handler still receives the event and reads `deltaX`. Vertical page scrolling (`deltaY`-dominant) is untouched, so users can still scroll the page with a trackpad while the cursor is over the carousel.
- Mouse-clicked back/forward buttons go through a different code path (explicit navigation, not gesture) and are unaffected by both fixes.

### Cleanup

Remove the now-useless `[overscroll-behavior-x:contain] [touch-action:pan-y]` from the Swiper's className in `ProjectsCarousel.tsx` (it's a no-op on a non-scroll container).

---

## Files to change

- `src/index.css` — add `overscroll-behavior-x: none` to `html, body`.
- `src/components/ProjectsCarousel.tsx` — add `sectionRef` + non-passive wheel listener on the `#things` section; remove the inert arbitrary classes from the Swiper.

## Verification checklist

1. Trackpad swipe left/right while hovering the carousel → carousel scrolls, browser does NOT navigate.
2. Trackpad swipe left/right while hovering above/below the carousel → browser does NOT navigate (Fix A covers this too).
3. Trackpad scroll vertically anywhere → page scrolls normally.
4. Mouse-click the browser back button → still navigates back.
5. Keyboard Alt+Left / Cmd+Left → still navigates back.
6. Open a project → close via button → returns to homepage, card visible (regression check on prior fix).
