

## Subtle Size Reduction for About Me Section (~5%)

### What Changes

A gentle tightening of the About Me card -- the frame, photo, and internal spacing all shrink slightly while text stays the same size.

### Specific Adjustments

**File: `src/components/AboutSection.tsx`**

| Element | Current | New |
|---------|---------|-----|
| Card width | `w-[85vw] max-w-5xl` | `w-[80vw] max-w-4xl` |
| Card padding | `px-8 md:px-12 py-12` | `px-7 md:px-10 py-10` |
| Inner gap | `gap-8 md:gap-12` | `gap-7 md:gap-10` |
| Photo size | `w-64 md:w-80` | `w-60 md:w-72` |
| Text | No change | No change |

Everything else (border, shadow, glow, rounded corners, margin-left offset) stays exactly the same.

