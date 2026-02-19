

## Add Right Margin to the Text Column

### Problem
After reducing the gap, the text and image columns are too close together. You want more breathing room, but only by pulling the text column's right edge inward -- the image column stays untouched.

### Fix (File: `src/components/AboutSection.tsx`)

**Line 15 (text column div):** Add `pr-4 md:pr-6` (right padding) to the text column. This creates visual spacing between the text content and the image without affecting the image column or the flex gap.

Change:
```
<div className="flex-[3] text-center md:text-left">
```
To:
```
<div className="flex-[3] text-center md:text-left md:pr-6">
```

The `md:` prefix ensures this only applies on desktop where the columns are side-by-side. On mobile (stacked layout), no extra padding is added.

