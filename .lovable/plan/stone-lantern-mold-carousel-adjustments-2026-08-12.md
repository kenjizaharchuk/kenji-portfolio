# Stone Lantern Mold carousel adjustments

## Goal
1. Reorder the Stone Lantern Mold card so it sits between Hand Pendant and Wooden Clock in the carousel.
2. Adjust the card image crop so the stone lantern is centered vertically.

## Changes

### 1. Reorder carousel card
In `src/data/carouselProjects.ts`, move the `id: 22` Stone Lantern Mold project object from the end of the array to immediately after the Hand Pendant entry (`id: 1`) and before the Wooden Clock entry (`id: 5`).

### 2. Improve image vertical crop
Add `imagePosition: 'center 30%'` to the Stone Lantern Mold project object. This pulls the image anchor upward, which will show more of the upper portion of the photo and center the lantern better in the card frame. If the preview shows the lantern still too low or too high, we can tweak the percentage in a follow-up.

## Files to edit
- `src/data/carouselProjects.ts`
