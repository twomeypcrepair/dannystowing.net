# DECISIONS — dannystowing.net

## 2026-09-17 — Static HTML on GitHub Pages, no WordPress
The old site was WordPress for a one-page brochure. The towing business needs one page with a phone number. Plain HTML + CSS, no build, no plugins to update. If Danny later wants a blog or forms, revisit.

## 2026-09-17 — No contact form
The conversion for a tow company is a phone call, not a form someone reads Monday. Every CTA is a tel: link. A fixed call bar sits at the bottom on phones. Static hosting has no backend anyway; if a form is wanted later, Formspree or a Cloudflare Worker.

## 2026-09-17 — Look v2: dark, night-on-the-shoulder (supersedes the v1 print look)
Vash asked for a high-end look after v1. v2: near-black #070606, one red #FF2B2B, Outfit 800 display, Geist body, Geist Mono labels. Floating glass pill nav, double-bezel cards (28px shell, 22px core), pill buttons with the arrow in its own circle, bento services grid with two photos and one red CTA cell, one marquee for the towns, scroll reveals via IntersectionObserver. Dark theme locked, no light variant. Shape rule: pills for controls, 28/22 shells for cards, nothing else rounded.
v1 (paper, ink, Archivo Black, zero radius) lives in git history at commit 005c196 if the flat look is ever wanted back.

## 2026-09-17 — Photos are Unsplash hotlinks until Danny supplies his own
No photos of Danny's trucks exist. Three Unsplash photos (license allows commercial use, credit in the footer): red Ford wrecker by ftodne (hero), night pickup by sebastiaanstam (bento), roadside red sedan by hectoroconnor (bento). Picked because none show another company's name on the truck. Swap for real photos of Danny's rig as soon as there are any; keep the same aspect ratios (11:13 hero, 3:4 tall cell, 9:7 wide cell).

## 2026-09-17 — Keep the old name on the page once
"You might know us as Danny's Auto Body" stays in the about band. Locals know that name, and it carries the search equity. No other body-shop wording anywhere; the copy check enforces it.

## 2026-09-17 — Public repo
GitHub Pages on a free org plan needs a public repo. The page content is the same public info the old site already shows. CLAUDE.md is gitignored per the public-repo convention.

## 2026-09-17 — Google Fonts via link tag
Self-hosting fonts on a one-file site is more files for no gain. Link tag with display=swap. If it ever matters, download the three families into assets/.
