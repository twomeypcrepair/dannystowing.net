# DECISIONS — dannystowing.net

## 2026-09-17 — Static HTML on GitHub Pages, no WordPress
The old site was WordPress for a one-page brochure. The towing business needs one page with a phone number. Plain HTML + CSS, no build, no plugins to update. If Danny later wants a blog or forms, revisit.

## 2026-09-17 — No contact form
The conversion for a tow company is a phone call, not a form someone reads Monday. Every CTA is a tel: link. A fixed call bar sits at the bottom on phones. Static hosting has no backend anyway; if a form is wanted later, Formspree or a Cloudflare Worker.

## 2026-09-17 — Look: Swiss industrial print, light only
Paper #F4F4F0, ink #111, one red #FF0000 (the existing D mark is pure red; kept it so the mark and the accent match). Archivo Black display, Archivo body, IBM Plex Mono labels, zero border-radius, no shadows, no animation. Picked over the glassy/premium direction because the brand is a red block letter and the customer is standing on a road shoulder. Light theme locked; no dark mode variant (one substrate per the brutalist rule).

## 2026-09-17 — Keep the old name on the page once
"You might know us as Danny's Auto Body" stays in the about band. Locals know that name, and it carries the search equity. No other body-shop wording anywhere; the copy check enforces it.

## 2026-09-17 — Public repo
GitHub Pages on a free org plan needs a public repo. The page content is the same public info the old site already shows. CLAUDE.md is gitignored per the public-repo convention.

## 2026-09-17 — Google Fonts via link tag
Self-hosting fonts on a one-file site is more files for no gain. Link tag with display=swap. If it ever matters, download the three families into assets/.
