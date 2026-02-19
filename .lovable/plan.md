

## About Section Layout Refinement

All changes in `src/components/AboutSection.tsx`.

### 1. Reduce the horizontal gap

Change the flex container gap from `gap-7 md:gap-10` down to `gap-5 md:gap-6`. This closes the gutter by roughly 30-40% so the text and image feel paired rather than separated into two zones.

### 2. Constrain the text column width

Change the text column from `flex-1` (unconstrained) to `flex-[1.3]` and add `max-w-lg` to cap the line length. This:
- Shortens line length for better readability
- Naturally tightens the gap
- Makes the image feel larger and more present without resizing it

### 3. Pull the image closer (Option A -- editorial alignment)

Change the image column from `flex-1` to `flex-none` so it sizes to its content rather than stretching to fill half the container. This removes the dead space on the image side and lets the photo sit closer to the text, responding to it rather than floating independently.

### Summary of class changes

- Flex container: `gap-7 md:gap-10` to `gap-5 md:gap-6`
- Text column: `flex-1` to `flex-[1.3] max-w-lg`
- Image column: `flex-1 flex justify-center md:justify-end` to `flex-none`

No changes to font sizes, weights, colors, or the image itself.
