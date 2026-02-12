

## Adjust "Things I've Made" Sidebar Scroll Target

### What Changes

When clicking the "Things I've Made" bar in the sidebar, the viewport currently scrolls to the very top of that section, showing mostly empty space above the heading. Instead, it should scroll further down so the carousel cards are centered in the viewport.

### Technical Details

**File: `src/components/HeroSidebar.tsx`** (line 99-101, inside `scrollToSection`)

Add a special case for `sectionId === 'things'`, similar to how `'about'` already has a custom offset. The target will be the section's `offsetTop` plus roughly half the viewport height (`window.innerHeight * 0.5`), which will center the view on the carousel cards rather than showing mostly the top padding.

```text
Current:
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }

New:
  } else if (sectionId === 'things') {
    const targetY = element.offsetTop + (window.innerHeight * 0.5);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
```
