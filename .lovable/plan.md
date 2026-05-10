Update only `src/components/HeroSidebar.tsx` sidebar visibility logic.

Goal: The sidebar must hide as soon as the Projects carousel/card area approaches the left side of the viewport, never overlapping side cards.

Changes:
1. Keep About and Contact observers, hover behavior, nav buttons, scrolling, layout, classes, and markup exactly as-is.
2. Replace the Projects observer with a stricter, earlier-triggering one:
   - Observe the outer `#things` section (the full Projects area, taller than `#things-content`).
   - Use `threshold: 0` and a generous negative vertical `rootMargin` like `rootMargin: "-5% 0px -5% 0px"`, so `inProjects` becomes true the moment any meaningful slice of Projects enters the viewport — well before cards can reach the sidebar's vertical band.
   - Treat any intersection (`entry.isIntersecting`) as `inProjects = true`, with no ratio gating.
3. Change the visibility formula to give Projects strict priority:
   ```ts
   setIsVisible((inAbout || inContact) && !inProjects);
   ```
   About/Contact can no longer override Projects.
4. As a backup safeguard, also observe `#things-content` with the same options and OR the two intersection results into `inProjects`, so either signal hides the sidebar.

Result: Sidebar is hidden throughout the entire Things I've Made view, including while side carousel cards are visible, and only reappears once About or Contact is in the viewport and Projects is not.

No layout, spacing, scroll behavior, carousel behavior, hover animation, typography, images, cards, or content will be changed.