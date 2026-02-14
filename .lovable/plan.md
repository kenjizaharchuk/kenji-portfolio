
## Fix Digital Design Filter Carousel Glitch

### The Problem

When you select only "Digital Design", the carousel filters down to 6 projects. Swiper's **loop mode** works by cloning slides and appending them before/after the real slides. With the coverflow 3D effect, this cloning sometimes fails to produce enough "left-side" slides, leaving the left position empty. Scrolling left then causes visual glitches as Swiper tries to loop through incorrectly positioned clones.

The root cause is that the Swiper instance **stays mounted** when filters change (the `key` only changes at the 3-slide threshold), so Swiper tries to hot-update its loop clones with a different number of slides -- which is unreliable with the coverflow effect.

### The Fix

**Force Swiper to fully remount whenever the filtered project list changes.** Instead of reusing the same Swiper instance and calling `slideTo()`, we give it a unique `key` based on the actual filter selection so React destroys and recreates it cleanly.

### Technical Changes

**File: `src/components/ProjectsCarousel.tsx`**

1. **Change the Swiper `key`** from `filteredProjects.length >= 3 ? 'loop' : 'no-loop'` to something unique per filter combination, e.g. `activeFilters.sort().join(',') || 'all'`. This forces a clean remount every time filters change.

2. **Remove the sticky-card `useEffect`** (the one that calls `swiperRef.current.slideTo(...)` when `activeFilters` change). Since Swiper remounts fresh, this is no longer needed -- the `initialSlide` prop handles positioning.

3. **Remove `isFilterTransitioning` ref** -- no longer needed since we're not hot-updating slides.

4. **Compute `initialSlide` intelligently** -- when Swiper remounts, set `initialSlide` to the index of the current project in the new filtered list (if it exists), or the nearest project otherwise. This preserves the "sticky card" feel without the buggy `slideTo` workaround.

5. **Keep `loop={filteredProjects.length >= 3}`** -- this is still correct, loop just needs a fresh mount to set up its clones properly.

### Trade-off

The carousel will briefly "reset" visually when you tap a filter (rather than animating to the new position). This is a small cosmetic trade-off for eliminating the glitch entirely. The transition is fast enough that it feels intentional.
