# Remove Featured Projects, keep case studies in the carousel

## Good news on scope

All six case studies (Spiber, Airan Lab, SKYN, Planet Money Bot, Discord, Genius Lyrics) already have `slug` values on their carousel cards, and the carousel already uses the same morph + detail-page flow as the Featured grid. Clicking those cards in "Things I've Made" already opens the case study pages.

So nothing needs to be "moved" — the Featured section is a duplicate entry point. Removing it loses no work.

## Changes

1. Delete `src/components/FeaturedProjects.tsx`.
2. Remove its import and `<FeaturedProjects />` render from `src/pages/Index.tsx`.
3. Sidebar (`HeroSidebar.tsx`): remove the "Featured Projects" nav item and the `#featured` intersection observer, reverting visibility to About + Contact. Order becomes About Me, Things I've Made, Contact.
4. Keep `src/data/carouselProjects.ts` as-is — the carousel depends on it now.
5. Verify after removal: each of the six carousel cards still morphs and opens its detail page, and closing a detail page returns to the correct card.

## Not touched

Carousel behavior/spacing, About, Contact, project detail pages, project data, morph/animation code.

## Your archiving question

Yes — use **Remix**. Right-click the project in the sidebar or dashboard (or project name → Settings → "Remix this project") and it creates an independent copy of the current code. The remix is a separate project that stays frozen at today's state; it is not connected to your GitHub repo, and future changes here won't affect it.

Recommended order: remix first (so the snapshot includes the Featured section), then approve this plan so I make the removal only in this project.
