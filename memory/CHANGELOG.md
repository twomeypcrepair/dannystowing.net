# CHANGELOG — dannystowing.net

## File structure
```
dannystowing.net/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md            # gitignored
├── GATES.md             # acceptance ledger (unlazy)
├── README.md
├── index.html           # the whole site
├── style.css
├── robots.txt
├── assets/d-mark.png    # red D from the old site
├── scripts/check-site.mjs
├── documentation/
└── memory/ (STATE, DECISIONS, CHANGELOG, LESSONS)
```

## Changes (newest first)

### 2026-09-17 — Initial build
- Live at https://twomeypcrepair.github.io/dannystowing.net/ (public repo twomeypcrepair/dannystowing.net, Pages from main root). Custom domain not yet set.
- One-page site: header with phone, hero (headline + call button + red D), what we do (4 cells), where we go (8 towns), about band (body shop closed, towing only), contact (phone/email/address/hours), footer, mobile fixed call bar.
- AutomotiveBusiness JSON-LD with NAP, hours and areaServed.
- Gate script `scripts/check-site.mjs` (structure, copy, nap, skeleton, live) and `GATES.md`.
- Repo skeleton (README, AGENTS, CLAUDE, memory/).
