## Plan: Featured Projects — title parity + 2×3 layout

### 1. Title size parity with "Things I've Made"
- "Things I've Made" uses `text-5xl md:text-6xl`. Featured Projects currently uses `text-4xl md:text-5xl`.
- Bump heading to `text-5xl md:text-6xl` so it reads as a true section title.

### 2. ~25% more space below the title
- Current `mb-10 md:mb-12` → `mb-14 md:mb-16` (≈+25–33%).

### 3. 2-column × 3-row desktop grid
- Grid classes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` → `grid-cols-1 md:grid-cols-2`.
- Mobile stays single column.
- Container width: keep section centered, swap inner wrapper from `w-[80vw] max-w-4xl` → `w-[88vw] max-w-5xl` so the 2-up cards have more presence without going full bleed.
- Row/column spacing: `gap-7 md:gap-9` → `gap-8 md:gap-10` (a touch more between the larger cards).

### 4. Larger, more substantial cards
- Keep `aspect-[4/3]` (cards naturally grow with the wider 2-col layout).
- Bump inner padding back up: `p-3 md:p-4` → `p-5 md:p-6`.
- Restore larger type inside cards: subtitle `text-[10px] md:text-[11px]` → `text-xs md:text-sm`; title `text-base md:text-lg` → `text-xl md:text-2xl`.
- Border, radius, gradient overlay, hover translate/scale, image cover, click-morph handler, `data-card-*` anchors — all unchanged.

### Out of scope
ProjectsCarousel, About, Contact, HeroSidebar, ProjectDetail, morph layer, project data.
