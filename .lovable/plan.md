

## Update Favicon and Add OG Preview Image

Two simple file copies — no code logic, dependencies, or build config changes.

### Steps

1. **Replace favicon**
   - Copy `user-uploads://Website_Favicon-2.png` to `public/favicon.png` (overwriting the existing one)

2. **Add OG preview image**
   - Copy `user-uploads://Screenshot_2026-02-27_at_8.04.56 AM.png` to `public/og-image.png`
   - This is the rectangular photo that will show up in link previews (iMessage, Discord, Twitter, etc.)
   - `index.html` already points to `/og-image.png` from the previous edit, so no HTML changes needed

### What will NOT change
- No HTML, CSS, JS, or config changes
- No dependency or lockfile changes
- No build configuration changes

### Caching note
After deploy, social platforms may still show the old preview for a while due to caching. You can force a refresh using the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or by waiting a few hours.

