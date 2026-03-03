
## Add 3 New Cards, Swap Positions, and Add Arrow Key Navigation

### 1. Copy images to `src/assets/`

- `user-uploads://Screenshot_2026-03-02_at_7.23.04 PM.png` → `src/assets/notes-from-farm.png`
- `user-uploads://Screenshot_2026-03-02_at_5.25.42 PM.png` → `src/assets/time-capsule.png`
- `user-uploads://Screenshot_2026-03-02_at_5.14.01 PM.png` → `src/assets/sensory-puzzle.png`

### 2. Add 3 new project entries in `ProjectsCarousel.tsx`

Add a `link?: string` field to the `Project` interface, then add these cards to the `projects` array:

- **Notes From the Farm** (id: 18) — link: `https://news.stanford.edu/stories/2025/05/notes-from-farm-book-advice-tips-incoming-students`
- **Time Capsule** (id: 19)
- **Sensory Puzzle** (id: 20) — link: `https://www.youtube.com/watch?v=OM2aNGwdu0M`

All three are categorized under `Physical Design`.

### 3. Swap Mountain Sculpture and Planet Money Bot positions

Move the Mountain Sculpture entry (id: 2, currently at array position 7) to where Planet Money Bot is (position 12), and vice versa. This swaps their order in the carousel.

### 4. Make clickable cards open links in new tab

Wrap the card `<div>` in an `<a>` tag (or use an `onClick` handler) when `project.link` is defined, opening the URL in a new tab. Only "Notes From the Farm" and "Sensory Puzzle" will be clickable.

### 5. Add arrow key navigation

Swiper already captures keyboard events via its `Keyboard` module. Add the `Keyboard` module to the Swiper config with `keyboard: { enabled: true }`. This enables left/right arrow key navigation out of the box, alongside all existing interactions (scroll, drag, click).

### Files modified
- `src/components/ProjectsCarousel.tsx` — new imports, interface update, 3 new entries, position swap, link handling, keyboard module
- 3 new image files in `src/assets/`
