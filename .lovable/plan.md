## Add live-site link under final website screenshot

Add a subtle "Visit live site ↗" link under the `featuredImage` at the top of the Spiber case study (the live homepage screenshot), styled identically to the "See full slide deck" links under the Audience Insights and Final Sitemap images.

### Implementation

**`src/data/projects.ts`** — extend the `featuredImage` block type with an optional `externalLink`:

```ts
| {
    type: 'featuredImage';
    ...
    externalLink?: { label: string; url: string };
  }
```

Apply on the Spiber final-site featuredImage:

```ts
externalLink: { label: 'Visit live site', url: 'https://spiber.inc/en' }
```

**`src/components/ProjectDetail.tsx`** — in the `featuredImage` case, after the image wrapper, conditionally render the same right-aligned, muted footnote-style anchor (`text-sm text-white/50`, underline, `↗`, `target="_blank" rel="noopener noreferrer"`) constrained to the same `max-w` width.

No other changes.
