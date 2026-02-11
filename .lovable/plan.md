

## Unify Font to Cormorant Garamond + Remove Carousel Dots

### What Changes

**1. Apply Cormorant Garamond (`font-display`) to remaining text outside Contact section**

The Contact section already uses `font-display` everywhere -- no changes needed there. The remaining areas to update are:

- **Sidebar nav labels** ("Landing Page", "About Me", etc.) in `HeroSidebar.tsx` -- currently uses `font-body`
- **Filter chip buttons** ("Physical Design", "Digital Design", "Art", "Work Experience") in `ProjectsCarousel.tsx`
- **Carousel card text** (project titles, subtitles, tag pills) in `ProjectsCarousel.tsx`
- **"No projects match" fallback text** in `ProjectsCarousel.tsx`

**2. Remove the pagination dots from the carousel**

Remove the dot indicators beneath the Swiper carousel and clean up related CSS.

---

### Technical Details

**File: `src/components/HeroSidebar.tsx`**
- Change `font-body` to `font-display` on the nav label span

**File: `src/components/ProjectsCarousel.tsx`**
- Remove `Pagination` from the Swiper module import and config
- Add `font-display` to: subtitle, title, tag pills, filter buttons, and fallback text

**File: `src/index.css`**
- Remove `.swiper-pagination` and `.swiper-pagination-bullet` CSS rules

This is easy to revert if you prefer the original look after seeing it.
