# Motasim Bin Kamal — Portfolio Site

Enterprise-style personal portfolio for an AI Automation Engineer / Agent Developer.
Pure HTML5 / CSS3 / vanilla JS — no framework, no build step, no dependencies.

## File structure

```
portfolio/
├── index.html          Main page (all sections, SEO meta, JSON-LD)
├── style.css            Design system + all styling
├── script.js             Content arrays + all interactivity
├── README.md
└── assets/
    ├── resume.pdf         Downloadable CV (your uploaded CV, copied as-is)
    ├── images/
    │   └── og-cover.jpg   Placeholder social-share image
    └── icons/
        └── favicon.svg
```

## What's real vs. placeholder

**Real (pulled straight from your CV):** all experience entries, all 9 projects,
skills, certifications. Nothing is invented.

**Placeholder — fill these in before going live:**

1. **Photo** — `index.html`, the `.portrait-placeholder` block in the About
   section (~line with `<div class="portrait-placeholder">`). Replace it with:
   ```html
   <img src="assets/images/your-photo.jpg" alt="Md. Motasim Bin Kamal">
   ```
   Drop your photo in `assets/images/` first.

2. **Social links** — open `script.js`, find the `socialLinks` object near the
   bottom (`SOCIAL LINK PLACEHOLDERS` section) and fill in your real URLs:
   ```js
   const socialLinks = {
     github: 'https://github.com/your-username',
     linkedin: 'https://linkedin.com/in/your-profile',
     youtube: 'https://youtube.com/@your-channel',
     whatsapp: 'https://wa.me/8801720610836',
     calendly: 'https://calendly.com/your-link'
   };
   ```
   Every link on the page with `data-social="..."` (hero icons, contact
   section, footer) picks this up automatically — no HTML edits needed.

3. **Canonical URL / OG URL** — once you know your final domain, update the
   `<link rel="canonical">` and `og:url` tags in `index.html`'s `<head>`.

4. **OG cover image** — `assets/images/og-cover.jpg` is a generated
   placeholder. Swap it for a real 1200×630 image when you have one.

5. **Contact form backend** — the form currently opens the visitor's email
   client via `mailto:` (see `script.js`, section 10). That works with zero
   setup, but for a proper inbox-friendly form, wire it to one of:
   - [Netlify Forms](https://docs.netlify.com/forms/setup/) — add
     `netlify` and `data-netlify="true"` attributes to the `<form>` tag,
     zero JS needed, works automatically once deployed on Netlify.
   - [Formspree](https://formspree.io) — point the form's `action` at your
     Formspree endpoint.

## Adding new content later

Every dynamic section is driven by a JS array at the top of `script.js` —
you never need to touch the HTML:

| Section | Array in `script.js` |
|---|---|
| Skills | `skillGroups` |
| Experience timeline | `timeline` |
| Projects | `projects` |
| Certifications | `certifications` |
| Services | `services` |
| Recent builds / notes | `notes` |

To add a project, copy an existing object in the `projects` array and edit
the fields — it'll render automatically with filtering support.

## Deploying

### GitHub Pages
1. Create a new repo, push these files to the root (or a `docs/` folder).
2. Repo Settings → Pages → set source to your branch/folder.
3. Site goes live at `https://your-username.github.io/repo-name/`.

### Netlify
1. Drag the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop),
   **or** connect the GitHub repo for auto-deploys on push.
2. No build command needed — this is a static site.

### Vercel
1. `vercel deploy` from inside the `portfolio` folder, or import the repo
   at vercel.com. Framework preset: "Other" / static.

### Bolt.new / Lovable
1. Create a new project and upload/paste these three files
   (`index.html`, `style.css`, `script.js`) plus the `assets/` folder.
2. Both platforms serve static HTML directly — no configuration required.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses
`IntersectionObserver`, CSS custom properties, and `backdrop-filter` — all
widely supported since ~2020. No polyfills included.

## Performance notes

- Fonts load from Google Fonts CDN with `preconnect` hints.
- All images should be compressed before adding (use [squoosh.app](https://squoosh.app)
  or similar) — the placeholder OG image is already optimized.
- The particle canvas animation pauses cost is negligible; it's capped at
  ~70 particles on desktop, 32 on mobile.
