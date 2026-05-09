## Goal

Limit the sidebar's hover trigger to the visible bars only. Today, the labels (even at `opacity-0`) still occupy layout width via `whitespace-nowrap`, making the `<nav>` bounding box extend ~150–200px to the right of the bars — so hovering empty space expands labels prematurely.

## Change (single file: `src/components/HeroSidebar.tsx`)

### 1. Move hover handlers from `<nav>` to a per-bar wrapper

Currently `onMouseEnter`/`onMouseLeave` live on `<nav>`, and per-button `onMouseEnter` lives on the entire `<button>` (which contains the bar **and** the label). Both fire over the label region.

New structure inside each `<button>`:

```tsx
<button ... className="group flex items-center gap-3 ...">
  {/* Hover-target wrapper: sized to the bar's max width only */}
  <div
    onMouseEnter={() => { setIsHovered(true); setHoveredIndex(index); }}
    onMouseLeave={() => { setIsHovered(false); setHoveredIndex(null); }}
    style={{ width: isCompact ? 60 : 100, height: 24 }}
    className="flex items-center"
  >
    <div
      className="h-[3px] bg-white/40 transition-all duration-300 ease-out group-hover:bg-white/80"
      style={{ width: `${getLineWidth(index)}px` }}
    />
  </div>

  {!isCompact && (
    <span className="...">{item.label}</span>
  )}
</button>
```

### 2. Remove `<nav>`-level hover handlers

`onMouseEnter`/`onMouseLeave` on the `<nav>` element are deleted. Each bar's wrapper handles its own enter/leave; leaving one bar without entering another resets state (closes the labels), which matches the intended behavior.

### 3. Vertical hit area

Use a fixed `height: 24px` on the wrapper (a bit larger than the 3px bar) so vertical hover feels forgiving but doesn't bleed into adjacent bars (existing `gap-3` = 12px between buttons keeps separation clean).

## What stays unchanged

- Visibility logic (About/Contact observers — just shipped)
- `getLineWidth` wave math
- Click-to-scroll behavior, `tabIndex`, keyboard behavior
- Label styling, fade/translate animation
- Compact mode breakpoint (1100px)
- All other components, layout, spacing, typography

## Verification

1. Hover directly on a bar → that bar widens, neighbors do the wave, label appears. ✅
2. Hover the empty space where a label *would* be (right of the bar) → no expansion, no label. ✅
3. Move cursor between bars vertically → smooth handoff via the per-wrapper enter/leave.
4. Click still scrolls to the section (button click handler unchanged).
