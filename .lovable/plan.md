## Fix border-radius corner toggling during card↔hero morph

Root cause: border-radius lives on the Framer Motion `layoutId` animated elements, so it gets stripped/un-interpolated mid-morph. Fix structurally — move the radius onto a static (non-motion) wrapper with `overflow: hidden`. The animated parent resizes around it; the wrapper's radius is never interpolated, so corners stay visually constant throughout.

### `src/components/ProjectsCarousel.tsx`

In `cardInner`:
- Remove `rounded-3xl` from `cardClass` on the outer `motion.div`.
- Remove inline `style={{ borderRadius: '1.5rem' }}` from the outer `motion.div`.
- Remove inline `borderRadius` from the `motion.img` style (keep `objectPosition`).
- Wrap **all** inner content of the outer `motion.div` (the `motion.img`, the gradient overlay, the relative `z-10` text/title/tags block, and the hover overlay) inside a single static `<div className="absolute inset-0" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>`.

Resulting structure:
```
motion.div (layoutId card-{slug})     ← NO radius, NO overflow-hidden
  static div [borderRadius 1.5rem, overflow hidden, absolute inset-0]
    motion.img (layoutId card-image-{slug})    ← no radius
    gradient overlay
    relative z-10 content (subtitle, motion.h3, motion.div tags)
    hover overlay
```

The outer animated element has no radius at all. All clipping happens on the static wrapper, which never animates → corners are visually identical at every frame of the morph.

### `src/components/ProjectDetail.tsx`

- Remove `style={{ borderRadius: '1.5rem' }}` from the outer detail `motion.div` (layoutId `card-${slug}`).
- On the hero `motion.div` (layoutId `card-image-${slug}`): remove `style={{ borderRadius: '1.5rem' }}` and remove `overflow-hidden` from its className.
- Wrap the inner `<img>` in a static `<div className="absolute inset-0" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>`.
- Keep `aspect-[21/9]` and the `border border-white/15` on the hero `motion.div`.

Resulting structure:
```
motion.div (layoutId card-image-{slug}) [aspect-[21/9], border]  ← no radius
  static div [borderRadius 1.5rem, overflow hidden, absolute inset-0]
    <img ... />
```

### Out of scope
- Aspect ratio stays `aspect-[21/9]`.
- No changes to block layouts, filters, content, close button, or any other animation.

### Files
- `src/components/ProjectsCarousel.tsx`
- `src/components/ProjectDetail.tsx`