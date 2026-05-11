## Plan

1. **Replace the current Figma scroll guard with temporary diagnostics only**
   - Remove/disable the existing restoration guard for this test so it does not hide the real trigger.
   - Add clearly prefixed console logs around the Figma embed and the project detail scroll container.
   - Keep this diagnostic code temporary and easy to remove.

2. **Log every plausible scroll-jump signal**
   - Scroll container: `scroll`, current `scrollTop`, previous `scrollTop`, delta, active element, iframe bounds, wrapper bounds.
   - Window/document/body: `scroll`, `focus`, `blur`, `focusin`, `focusout`, pointer/mouse events.
   - Iframe element: `load`, `focus`, `blur`, `pointerdown`, `mousedown`, bounding rect before/after interaction.
   - Global messages: `message` events from Figma/embed origins, logging only origin and safe metadata.
   - Layout shifts: `ResizeObserver` on the wrapper and iframe; optional `PerformanceObserver` for layout shift entries if supported.

3. **Have you reproduce the issue once**
   - You click the Figma page-selector dropdown in the preview.
   - I’ll read the console log snapshot and identify the exact event order and which scrollable element changed.

4. **Propose the permanent fix based on evidence**
   - If the scroll is browser focus-scroll: use a structural isolation fix rather than another timed restoration attempt.
   - If the scroll is layout/resize-driven: stabilize iframe/wrapper dimensions and containment.
   - If anchoring/smooth scrolling is involved: apply scoped CSS such as `overflow-anchor: none`, `scroll-behavior: auto`, or containment only where needed.
   - If Figma posts a message that triggers layout or focus behavior: ignore/neutralize the app-side trigger if one exists.

5. **After confirmation, remove diagnostics and implement the smallest permanent fix**
   - No permanent console noise.
   - No extra visual changes to the case study.
   - Keep the solution scoped to the Figma embed/project detail view.