# CHANGELOG — dannystowing.net

## File structure
```
dannystowing.net/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md            # gitignored
├── GATES.md             # acceptance ledger (unlazy)
├── README.md
├── index.html           # the whole site (inline reveal script at the bottom)
├── style.css
├── robots.txt
├── assets/d-mark.png    # red D from the old site (transparent PNG)
├── scripts/check-site.mjs
├── documentation/
└── memory/ (STATE, DECISIONS, CHANGELOG, LESSONS)
```

## Changes (newest first)

### 2026-09-17 (later) — v2 high-end redesign
- Photo swap after Vash review: the roadside red-sedan shot read like a body slumped over a car door. Replaced with a flat-tire change by jairph, credit updated.
- Dark theme, red accent, Outfit + Geist + Geist Mono. Floating glass pill nav with phone pill. Hero split: chip, headline, lead, white pill CTA with red arrow circle, ghost CTA, double-bezel photo card (red wrecker).
- Services as a 7-cell bento: night photo (tall), four text cells, roadside photo, red gradient call cell. Collapses to 6-col at tablet and single column on phones.
- Towns as one CSS marquee (paused on hover, static under reduced motion). About statement in a bezel card with a red top glow. Contact split: heading + oversized phone link left, details card with Maps button right.
- Scroll reveals (fade, lift, un-blur) via IntersectionObserver, staggered by --i. Everything visible when JS is off or reduced motion is on.
- Fixed floating red call pill on phones. Grain overlay and two radial red orbs (plain gradients, no filter blur, to keep phones smooth).
- Photo credits in the footer. og:image points at the hero photo.
- Fixes found in review: nav width max-content (was shrink-fitting into half the viewport at tablet width and losing its gaps), tablet bento CTA span 3 so no empty half row, marquee separators as thin bars not dots.

### 2026-09-17 — Initial build
- Live at https://twomeypcrepair.github.io/dannystowing.net/ (public repo twomeypcrepair/dannystowing.net, Pages from main root). Custom domain not yet set.
- One-page site: header with phone, hero (headline + call button + red D), what we do (4 cells), where we go (8 towns), about band (body shop closed, towing only), contact (phone/email/address/hours), footer, mobile fixed call bar.
- AutomotiveBusiness JSON-LD with NAP, hours and areaServed.
- Gate script `scripts/check-site.mjs` (structure, copy, nap, skeleton, live) and `GATES.md`.
- Repo skeleton (README, AGENTS, CLAUDE, memory/).
