

## Give the Text Column More Space Within the Existing Container

### Problem
Both the text and image columns use `flex-1`, splitting the 896px container 50/50. You want the text column to be wider while keeping the image column narrower -- all within the current `max-w-4xl` container.

### Fix (File: `src/components/AboutSection.tsx`)

- **Text column (line 16):** Change `flex-1` to `flex-[3]` so it takes roughly 60% of the row
- **Image column (line 31):** Change `flex-1` to `flex-[2]` so it takes roughly 40% of the row
- **Reduce gap:** Change `gap-7 md:gap-10` to `gap-5 md:gap-8` to give the text a bit more breathing room

The container stays at `max-w-4xl` / `w-[80vw]`. The image keeps its own protected column -- it just gets a proportionally smaller share.

