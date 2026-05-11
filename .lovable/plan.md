## Changes

**1. Update Figma embed URL (Planet Money Bot only)**

In `src/data/projects.ts`, replace the `FIGMA_PLACEHOLDER_URL` reference inside the `planet-money-bot` `figmaEmbed` block with:
`https://embed.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1051-2710&embed-host=share`

Spiber's `figmaEmbed` keeps `FIGMA_PLACEHOLDER_URL`.

**2. Add the 4 uploaded images at `aspect-[16/9]`**

Copy uploads into `src/assets/`:
- `user-uploads://Early_sketches.png` → `src/assets/pmb-early-sketches-1.png`
- `user-uploads://Early_sketches_2.png` → `src/assets/pmb-early-sketches-2.png`
- `user-uploads://A_B_Testing_2.png` → `src/assets/pmb-mid-fidelity-1.png`
- `user-uploads://Design_iteration_notes.png` → `src/assets/pmb-mid-fidelity-2.png`

In `src/data/projects.ts`, import these and assign as `src` on the two `processNarrative` blocks:
- "Early Experiments & Wireframes" → sketches 1 and 2
- "Mid-Fidelity Iterations & UX Decisions" → A/B testing board, then design iteration notes

Change each of these 4 image slots from `aspect: '4/3'` to `aspect: '16/9'`. Existing alt text stays.

**Future enhancement (not in this change):** click-to-expand lightbox for process images.

## Answer to your uploading question

For static case study assets like this, chat upload is the right call. Worth knowing for later:
- **Many at once (10+):** zip the batch and upload the zip; I'll extract into `src/assets/`.
- **You want full control without prompting me:** drop files into `src/assets/` via the GitHub integration, then just tell me the filenames.
- **End-user uploads at runtime:** Lovable Cloud storage. Not needed here.
