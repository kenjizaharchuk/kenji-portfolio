

## Adjust "Things I've Made" Scroll Offset

### What Changes

Reduce the scroll offset so the viewport lands a bit higher -- showing the "Things I've Made" title near the top. Changing the multiplier from `0.5` to `0.3` moves the landing point up by roughly 20% of the viewport height (~96px on a typical screen).

### Technical Details

**File: `src/components/HeroSidebar.tsx`** (line 105)

Change:
```
const targetY = element.offsetTop + (window.innerHeight * 0.5);
```
To:
```
const targetY = element.offsetTop + (window.innerHeight * 0.3);
```

