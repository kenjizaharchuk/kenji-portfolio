# Raise Stone Lantern Mold image in carousel card

## Goal
Move the Stone Lantern Mold image crop upward so the lantern sits higher in the card and overlaps less with the title and tags.

## Changes

### Adjust image vertical anchor
In `src/data/carouselProjects.ts`, change the Stone Lantern Mold entry's `imagePosition` from `'center 30%'` to `'center bottom'` (equivalent to `center 100%`). This aligns the bottom edge of the source image with the bottom edge of the card, which raises the lantern in the visible crop.

## Files to edit
- `src/data/carouselProjects.ts`
