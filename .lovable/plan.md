

## Update Open Graph and Twitter Meta Tags

Remove all Lovable branding from link previews and use your website screenshot as the preview image.

### Changes (only `index.html` and one new image file)

**1. Copy uploaded screenshot to `public/`**
- Copy `user-uploads://Screenshot_2026-02-27_at_7.48.31 AM.png` to `public/og-image.png`

**2. Update `index.html` meta tags**

Replace all existing OG/Twitter meta tags and remove Lovable branding:

```html
<meta name="description" content="Portfolio of Kenji Zaharchuk -- Design, Art, and Creative Work" />
<meta name="author" content="Kenji Zaharchuk" />

<meta property="og:title" content="Kenji Zaharchuk" />
<meta property="og:description" content="Portfolio of Kenji Zaharchuk -- Design, Art, and Creative Work" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://kenjizaharchuk.com" />
<meta property="og:site_name" content="Kenji Zaharchuk" />
<meta property="og:image" content="https://kenjizaharchuk.com/og-image.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://kenjizaharchuk.com/og-image.png" />
```

- Remove the `twitter:site` tag referencing `@Lovable`
- Remove the TODO comment
- Use `summary_large_image` card type since the screenshot is a large landscape-ish image (looks much better in previews than `summary`)

### What will NOT change
- No layout, styling, or content changes
- No dependency or lockfile changes
- No build configuration changes
- No routing changes

### Deployment note
This auto-pushes to GitHub. If Cloudflare auto-deploys on push, it will rebuild. The change is trivial (one new image file + a few HTML meta tag edits).

### Note on caching
Social platforms (iMessage, Discord, etc.) cache link previews aggressively. After this deploys, it may take some time for the new preview to appear. You can force a refresh on some platforms by using tools like the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator).

