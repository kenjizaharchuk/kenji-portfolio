## Scope

Data and copy changes for Spiber and Planet Money Bot. Files touched: `src/data/projects.ts` and `src/components/ProjectDetail.tsx` only.

## Task 1: Planet Money Bot

- Update existing `figmaEmbed` URL to `https://embed.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1262-6744&embed-host=share` and match `externalUrl` to same node id.
- Update bottom `featuredArticle` URL to `https://jskfellows.stanford.edu/can-we-build-an-ai-chatbot-for-journalism-79ffe39e053e`. Keep treatment; adjust copy so the card's action reads "Read the article →".

## Task 2: Spiber rewrite

### Type changes (`src/data/projects.ts`)

- `processNarrative` image `aspect` union: add `'natural'`. Lets image render at intrinsic ratio.
- `outcome` block: add optional `ctaUrl?: string` and `ctaLabel?: string`.
- `figmaEmbed` block: add optional `interactiveHint?: boolean` and `size?: 'default' | 'contained'`.
  - `interactiveHint: true` renders a small hint line directly below the iframe ("Click through the embed to explore the deck." — short, plain).
  - `size: 'contained'` constrains the embed to a narrower max width on desktop with horizontal breathing room; mobile stays full width.

### Renderer changes (`src/components/ProjectDetail.tsx`)

- `processNarrative`: when `aspect === 'natural'`, drop forced aspect class and absolute positioning; render image as a normal block at intrinsic ratio inside the rounded bordered container.
- `outcome`: when `ctaUrl` is set, render a subtle inline link below the sentence using `ctaLabel`, new tab, `rel="noopener noreferrer"`.
- `figmaEmbed`:
  - When `size === 'contained'`, wrap the iframe in a centered container roughly `md:max-w-[70%]` (mobile full width).
  - When `interactiveHint` is true, render a small muted hint line directly below the iframe (e.g. `text-sm text-foreground/60`).
  - When `externalUrl` is set on a block that also has `interactiveHint`, promote the external link from the subtle right-aligned footnote to a more visible treatment: left-aligned, normal text size, underlined, with the link icon/arrow. Sits below the hint, above any spacing to the next block. This applies only when both `interactiveHint` and `externalUrl` exist on the same block, so other embeds keep the existing footnote style.

### Spiber blocks (replaces current Spiber blocks)

Keep slug/title/subtitle/category/tags/heroImage. Replace `blocks` with:

1. `context` — six-week timeline, three weeks content strategy + three weeks wireframing, weekly client check-ins, audiences: investors, sustainability-focused brands, potential hires.
2. `figmaEmbed` — heading "Research and Proposals"; content paragraph as specified; embed URL `…node-id=1-196…`; external URL `…proto/…node-id=1-196…`; `linkLabel: 'See the full deck'`; `interactiveHint: true`; `size: 'contained'`.
3. `processNarrative` — heading "Sitemap"; paragraph as specified; one image `spiber-initial-sitemap.png`, `aspect: 'natural'`.
4. `figmaEmbed` — heading "Final Sitemap"; content "Iterated structure with mobile considerations baked in."; embed URL `…node-id=827-4244…`; external URL `…node-id=827-4244…`; `linkLabel: 'See the full Figma file'`. No `interactiveHint`, default size.
5. `processNarrative` — heading "Wireframes"; paragraph as specified; two images (`spiber-wireframe-1.png`, `spiber-wireframe-2.png`), both `aspect: 'natural'`.
6. `outcome` — "The site went live on Spiber's domain." with `ctaUrl: 'https://spiber.inc/en'`, `ctaLabel: 'Visit spiber.inc/en ↗'`.

The unused `liveLink` block type definition stays in place to keep the change minimal.

## Voice

Plain, concise, first-person where natural. No emdashes.

## Out of scope

`ProjectsCarousel.tsx`, morph animation, routing, and every file outside the two listed.
