

## Set Custom Favicon

A minimal, safe change that only adds one file and updates one HTML tag. No layout, styling, dependencies, build config, or lockfile changes.

### Steps

1. **Copy the uploaded image to `public/`**
   - Copy `user-uploads://Website_Favicon.png` to `public/favicon.png`

2. **Update `index.html`**
   - Replace the existing `<link rel="icon" href="/favicon.ico">` (if present) or add a new `<link rel="icon">` tag in the `<head>`
   - New tag: `<link rel="icon" type="image/png" href="/favicon.png">`

### What will NOT change
- No layout, styling, or content changes
- No dependency or lockfile changes
- No build configuration changes
- No routing changes

### Deployment note
This commit will auto-push to GitHub. If Cloudflare Pages is set to auto-deploy on push, it will trigger a rebuild. The change is trivial and will not break the build.

