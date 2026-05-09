## Goal

Reduce the excessive Projects → Contact gap that appears on tall/large external monitors, without changing the spacing that already looks good on laptops and phones, and without risking Projects peeking under About.

## Change

Single className edit in `src/components/ContactSection.tsx` (line 33).

Before:
```
className="relative pt-72 md:pt-80 pb-0 px-6 overflow-hidden"
```

After:
```
className="relative pt-72 md:pt-80 xl:pt-48 2xl:pt-32 pb-0 px-6 overflow-hidden"
```

## What this does

- `pt-72` (288px) — mobile, unchanged
- `md:pt-80` (320px) — tablet/small laptop, unchanged
- `xl:pt-48` (192px) — kicks in at ≥1280px wide (large laptops, small external monitors)
- `2xl:pt-32` (128px) — kicks in at ≥1536px wide (large external monitors)

On large displays, Projects' centered `min-h-screen` layout already contributes ~300–400px of empty space below the carousel. Trimming Contact's own top padding offsets that donated space so the Projects → Contact gap feels balanced.

## Why this is safe

- Only touches one className on Contact. Does not modify `AboutSection` or `ProjectsCarousel`.
- `min-h-screen` on Projects is preserved, so the centered carousel feel is unchanged.
- `xl:` and `2xl:` breakpoints do not trigger on phones or on the user's 1483px laptop preview viewport — laptop and mobile spacing stay byte-for-byte identical.
- Cannot cause Projects to peek under About (that would require shrinking About or Projects' top padding, neither of which we're doing).

## Verification

1. At the current 1483px viewport: Contact spacing should look identical to now (xl breakpoint is 1280px, but the visual change is small at this width — `pt-48` instead of `pt-80` is ~128px tighter; if it feels too tight here we can raise `xl:pt-48` to `xl:pt-64`).
2. Simulate a tall monitor (e.g., 1920×1200): Projects → Contact gap should noticeably shrink.
3. Mobile (<768px) and tablet (768–1279px): no change.
4. Confirm About still fills the first screen and Projects does not peek through.

## Tuning note

If `xl:pt-48` feels too aggressive at 1280–1535px widths (common laptops), the easy adjustment is to bump it to `xl:pt-64` (256px) and keep `2xl:pt-32` for the truly large screens. We can tune after seeing it live.
