

## Try "Alike" Font for About Me Body Text

Alike is available on Google Fonts as a serif typeface. It only comes in a single weight (400), so we cannot use semibold/bold variants natively -- but we can still test how it looks and use CSS `font-weight` to simulate heavier rendering if needed.

### Changes

**1. `index.html`** -- Add Alike to the Google Fonts import URL

Append `family=Alike` to the existing Google Fonts link so it loads alongside Poppins and Cormorant Garamond.

**2. `tailwind.config.ts`** -- Add an `alike` font family

Add a new entry: `alike: ['"Alike"', 'serif']` so we can use the class `font-alike` in components.

**3. `src/components/AboutSection.tsx`** -- Apply to body paragraphs

- Revert font size from `text-lg md:text-xl` back to `text-base md:text-lg`
- Bump weight from `font-medium` to `font-semibold`
- Replace `font-display` with `font-alike` on the two body paragraphs
- Headings ("I'm Kenji" and "Welcome to my website!") stay in Cormorant Garamond

This lets you compare Alike (body) vs Cormorant Garamond (headings) side by side. If you don't like it, reverting is a one-word class change.

