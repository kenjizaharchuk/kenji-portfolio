
## Scope

Two files change: `src/data/projects.ts` (data + types) and `src/components/ProjectDetail.tsx` (renderer additions). `ProjectsCarousel.tsx` gets one tiny edit to add `slug: 'spiber'` to the existing Spiber card.

## 1. New + revised block types

### `figmaEmbed`
```ts
{ type: 'figmaEmbed'; url: string; title?: string; heading?: string }
```
- `url` is a Figma embed URL (typically `https://www.figma.com/embed?embed_host=share&url=...`).
- Renders a full-width responsive iframe (aspect 16/10, rounded, bordered) with `allowfullscreen`. Standard Figma embed gives pan, zoom, page nav inline.
- Optional `heading` rendered above the iframe.

### `featuredArticle`
```ts
{ type: 'featuredArticle'; source: string; title: string; description: string; date: string; url: string }
```
- Renders a single clickable `<a target="_blank" rel="noopener noreferrer">` styled as a clean white card on dark background.
- Layout: small uppercase "Published in {source}" eyebrow, title (large, dark), description (muted dark), date footer.
- Hover: subtle lift + border darken. Whole card is the link.

### `processNarrative` (new, replaces use of `process` for Planet Money sections)
Existing `process` block only allows one image and no heading. The user needs headed sections with multiple placeholder image slots. New block:
```ts
{
  type: 'processNarrative';
  heading: string;
  content: string;
  images: { src?: string; alt: string; aspect?: '4/3' | '16/9' | '1/1' }[];
}
```
- When `src` is undefined, the slot renders as a dashed-bordered empty placeholder with the alt text faintly shown. Lets the user drop real images in later without restructuring.
- Layout: heading + paragraph on top, image grid below (1 col mobile, 2 col md when >1 image, 1 col when only 1).
- The existing `process` block stays in the union for back-compat but is unused after this change.

## 2. Planet Money Bot content

Update the existing `planet-money-bot` entry in `projectDetails`:

- `subtitle`: `Lead Designer`
- `category`: `Digital Design · Work Experience`
- `tags`: unchanged
- `blocks`, in order:
  1. `context` — combined paragraph: "Planet Money Bot is a conversational chatbot... usability, transparency, and play. Goal: build a website to boost engagement with the extensive Planet Money podcast archives." (two sentences, no emdashes)
  2. `processNarrative` heading `Early Experiments & Wireframes`, body as supplied, 2 placeholder image slots (alt: "Early wireframe sketch 1/2")
  3. `processNarrative` heading `Mid-Fidelity Iterations & UX Decisions`, body as supplied, 2 placeholder image slots (alt: "Mid-fidelity Figma screen 1/2")
  4. `figmaEmbed` — placeholder URL pointing to a public Figma community file so the block renders. Heading: `Interactive prototype`. Placeholder URL: `https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFP7lqd1V00LUaT5zvdklkkkk%2FFigma-Basics`. (Easy to swap.)
  5. `processNarrative` heading `Final UI & Visual Language`, body as supplied, 2 placeholder image slots (alt: "Final UI mockup 1/2")
  6. `outcome` — exact text supplied.
  7. `featuredArticle` — source: `JSK Fellows`, title: `Can We Build An AI Chatbot For Journalism?`, description: `Early Lessons In Accuracy, Sourcing, and Delight From A (Draft) Chatbot Based on NPR's Planet Money Archives`, date: `Apr 17, 2023`, url: `#` (placeholder, user will supply real URL).

## 3. Spiber placeholder case study

- Add a new `ProjectDetail` with `slug: 'spiber'`, title `Spiber Brewed Protein`, subtitle `Creative Intern`, category `Digital Design · Work Experience`, tags from the carousel entry. `heroImage` = the `spiberProject` asset already imported in the carousel (re-import in projects.ts).
- Blocks: lorem-ipsum modeled on current PMB placeholder structure: `context`, `processNarrative` (one heading + 2 placeholder slots), `figmaEmbed` (same placeholder URL), `processNarrative` (one heading + 2 placeholder slots), `outcome`, `featuredArticle` (lorem placeholders).
- In `ProjectsCarousel.tsx`, add `slug: 'spiber'` to the existing project id 9 (`Spiber Brewed Protein`). No other carousel changes.

## 4. BlockRenderer changes (`ProjectDetail.tsx`)

Add three cases to the existing `switch (block.type)`:

- `figmaEmbed`: render heading (if any) + `<div class="aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"><iframe src={url} class="w-full h-full" allowfullscreen /></div>`.
- `featuredArticle`: render `<a>` card. Container: `rounded-2xl bg-white p-6 md:p-8 block transition hover:-translate-y-0.5 hover:shadow-xl`. Inside: uppercase source eyebrow (muted), title (text-2xl md:text-3xl font-display font-bold text-black), description (text-base md:text-lg text-black/70), date footer (text-sm text-black/50 uppercase tracking-wide).
- `processNarrative`: heading (`font-display text-3xl md:text-4xl font-bold text-white/90`), content paragraph (matches existing context style), then image grid. Empty slots = dashed-bordered placeholder boxes labeled with their alt text faintly.

All Tailwind tokens follow the existing semantic style (no new colors needed; the white-card on dark bg uses literal `bg-white`/`text-black` which is acceptable for an intentional inverted card, consistent with the user's Medium-preview reference).

## Voice and formatting

- No emdashes anywhere in new strings or headings. Periods, commas, colons only.
- Block headings: plain, technical ("Early Experiments & Wireframes" as supplied — note `&` is fine, that's not an emdash).
- First person, not braggy.

## Out of scope

- No removal of the legacy `process` or `embed` block types (kept to avoid breaking anything else, but unused after this pass).
- No image uploads. All real images remain placeholders until the user provides them.
- No styling changes to existing blocks.

## Verification

- Visit `/projects/planet-money-bot`: all 7 blocks render in order, figma iframe loads, featured article card is clickable and opens in new tab.
- Visit `/projects/spiber` directly and via the carousel card: morph open/close works, blocks render with lorem.
- Browser back from either detail page returns to home with carousel intact (existing behavior preserved).
