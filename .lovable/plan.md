## Metadata strip emphasis (Spiber case study + all projects)

File: `src/components/ProjectDetail.tsx`, inside `MetaStrip`.

### Labels (CLIENT / TIMELINE / OUTCOME / QUICK LINKS)
- Size: `text-[10px] md:text-xs` → `text-xs md:text-sm` (one size up).
- Weight: add `font-semibold`.
- Opacity: `text-foreground/45` → `text-foreground/70`.
- Keep uppercase + `tracking-wider`.

### Values (Client/Timeline/Outcome)
- Size: `text-sm md:text-[15px]` → `text-base md:text-lg`.
- Weight: add `font-medium`.
- Opacity: `text-foreground/85` → `text-foreground` (full).
- Slightly increase vertical gap between label and value: `gap-1` → `gap-1.5`.

### Quick Links
- Already at a good level; bump slightly to match new value prominence:
  - Size: `text-sm md:text-[15px]` → `text-base md:text-[15px]` (mobile bump only).
  - Opacity: `text-foreground/80` → `text-foreground/90`.
  - No weight change.

No other components, no animation/layout/structure changes.
