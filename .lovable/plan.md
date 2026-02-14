

## Remove Landing Page and Simplify About Section

### What Changes

1. **Remove the 3D hero section** -- the floating "KENJI ZAHARCHUK" name, the scroll chevron, and the Canvas that powers them will be removed entirely.

2. **Remove the zoom-in scroll animation from About** -- as you suspected, the scale-from-tiny effect no longer makes sense when About is the first thing visitors see. The card will appear immediately at full size with no scroll-pinning.

3. **Update the preloader** -- after the preloader finishes, the site reveals directly into the About section (your photo, intro text, starfield background).

4. **Update sidebar navigation** -- remove the "Landing Page" nav item since that section no longer exists. The remaining items shift up: About Me, Things I've Made, Contact.

5. **Keep the StarField background** -- the stars and Milky Way remain as the ambient background across the whole site.

### What Gets Removed
- `src/components/Hero3D.tsx` (entire file, no longer imported)
- The GSAP ScrollTrigger pin/scale animation inside `AboutSection.tsx`
- The "Landing Page" entry from the sidebar nav items

### What Gets Modified

**`src/pages/Index.tsx`**
- Remove the `Hero3D` import and `<Hero3D />` from the JSX

**`src/components/AboutSection.tsx`**
- Remove the GSAP ScrollTrigger effect (no more pinning, no scale animation)
- Remove `useRef`, `useEffect`, and `gsap` imports
- The card renders at full scale immediately as a static, welcoming section
- Keep the existing layout, photo, and text as-is

**`src/components/HeroSidebar.tsx`**
- Remove `{ label: 'Landing Page', sectionId: 'landing' }` from `navItems`
- Remove the special-case scroll offset for `'about'` (no longer needed since there's no 2.5vh scroll animation to skip past)
- Clean up any intersection observer logic that referenced the landing section

**`src/components/Preloader.tsx`**
- No changes needed -- it already fades out to reveal whatever is behind it, which will now be the About section

### End Result

Visitors see: Preloader animation plays, fades out, reveals the About section ("I'm Kenji" + photo) with the starfield behind it. Scrolling down goes straight to "Things I've Made" and then Contact.

