

## Update About Me Section Text and Font Weight

### Changes

**File: `src/components/AboutSection.tsx`**

1. **Replace body text** with the three new paragraphs provided, including italicizing the word "why" in the first paragraph.

2. **Increase text brightness/weight:**
   - Body text: change from `text-foreground/60` to `text-foreground/80` and add `font-medium` -- this bumps readability without going full bold.
   - "Welcome to my website!" subtitle: change from `text-foreground/80` to `text-foreground/90` and add `font-semibold` (currently just inherits normal weight).

3. **Keep unchanged:** "I'm Kenji" title and all sizing/layout.

