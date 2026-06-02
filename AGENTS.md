# Portfolio – John Warren Manicane

## Overview

Static single-page portfolio. Vanilla HTML/CSS/JS, no build step. `package.json` exists with `three` installed but it is not imported or used anywhere in the site code.

## Entrypoints

| File | Role |
|---|---|
| `index.html` | App shell, sections, SKIP-link nav, SEO/OG meta |
| `style.css` | All styles (monochrome palette, responsive, dark/light, scroll reveal) |
| `script.js` | All JS (IIFE — nav, theme, scroll-reveal IntersectionObserver, project tab filtering) |
| `images/` | 5 subdirs: `app/`, `game/`, `web/`, `other/`, `icon/` |

## Key facts

- **No dev server needed** — open `index.html` directly in a browser or use any static file server.
- **No tests, linters, formatters, typecheckers, or CI** exist in this repo.
- **Theme** persisted in `localStorage` key `"theme"` (`"dark"` / `"light"`); respects `prefers-color-scheme`.
- **Project data** hardcoded in `script.js` as an array of objects, rendered dynamically by tab filter.
- **Scroll reveal** uses `IntersectionObserver` (`threshold: 0.12`, `rootMargin: "0px 0px -30px 0px"`). Elements with class `reveal` get class `is-visible` once scrolled into view (observed once, then unobserved).
- **Navigation** active state driven by another `IntersectionObserver` with `rootMargin: "-40% 0px -55% 0px"` on the 5 section IDs.
- **Mobile nav** hamburger toggle at <=768px; `nav-open` class on header controls bar animation.
- **Contact** email: `manicane4321@gmail.com`. CV link is a Google Drive URL.

## Adding a project

Add an entry to the `projects` array in `script.js`. Object shape:

```
{ type: "app"|"game"|"web"|"other", title, desc, img, alt, langs: string[], links: [{ text, href }] }
```

Place the screenshot in `images/{type}/`.

## Deploy

No config in this repo. Site is hosted on Vercel (`jw-watch.vercel.app` / `wildlife-ph.vercel.app` style — set up outside this repo).
