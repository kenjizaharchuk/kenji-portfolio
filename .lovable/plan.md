# Add "Stone Lantern Mold" carousel card

## Changes

1. **Upload image to Lovable Assets**
   - Run `lovable-assets create --file /mnt/user-uploads/IMG_3123.JPG --filename stone-lantern-mold.JPG` and save the CLI output to `src/assets/stone-lantern-mold.JPG.asset.json`.
   - This keeps the binary out of the repo while the carousel can import the CDN URL.

2. **Add a new carousel project entry**
   - In `src/data/carouselProjects.ts`, append a new project object:
     - `id`: 22 (next available after existing IDs)
     - `title`: "Stone Lantern Mold"
     - `subtitle`: "Additive Manufacturing for Repeatable Casting"
     - `image`: imported URL from the asset pointer
     - `tags`: ["TPU 3D Printing", "Mold Design", "Hydrostatic Simulation", "Design for Manufacturing", "Fusion 360"]
     - `categories`: ["Physical Design"]
     - `link`: "https://docs.google.com/presentation/d/1g2llmE0ZVSJEn_Gelu62Pbc-JVPjGG4jQrhqtQxfGEY/edit?usp=sharing"
   - No `slug` is needed; the carousel will treat it as an external-link card, same as the existing Rizzle AI card.

3. **Verify**
   - Build passes.
   - In the preview, the new card appears in the "Things I've Made" carousel under the Physical Design filter and the default view.
   - Clicking the active card opens the Google Slides link in a new tab.
