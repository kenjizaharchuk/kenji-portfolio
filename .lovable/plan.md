## Plan: Scale Featured Projects down ~12%

Single file: `src/components/FeaturedProjects.tsx`. Layout (2×3 desktop, 1-col mobile), hover, morph, data-attrs, images, gradient overlay — all unchanged.

### Changes
- **Container**: `w-[88vw] max-w-5xl` → `w-[82vw] max-w-4xl`.
- **Grid gap**: `gap-8 md:gap-10` → `gap-7 md:gap-8`.
- **Card padding**: `p-5 md:p-6` → `p-4 md:p-5`.
- **Title type**: `text-xl md:text-2xl` → `text-lg md:text-xl`.
- **Category label**: `text-xs md:text-sm` → `text-[11px] md:text-xs`.
- **Title spacing under header**: `mb-14 md:mb-16` → `mb-12 md:mb-14` (keeps proportions tight to the smaller grid).

Aspect ratio (`aspect-[4/3]`), border, radius, hover translate/scale, click handler, and `data-card-*` anchors stay as-is.

### Out of scope
About, ProjectsCarousel, Contact, HeroSidebar, ProjectDetail, morph layer, project data.
