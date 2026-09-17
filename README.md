# dannystowing.net

Static one-page site for Danny's Towing, Ash Flat AR. Replaces dannysautobody.net (body shop closed, towing only). Hosted on GitHub Pages, no build step.

**What this repo holds:** `index.html` + `style.css` + `assets/` (the site), `scripts/check-site.mjs` + `GATES.md` (acceptance checks), `memory/` (project memory).

## Run the checks
```
node scripts/check-site.mjs structure
node scripts/check-site.mjs copy
node scripts/check-site.mjs nap
node scripts/check-site.mjs skeleton
node scripts/check-site.mjs live https://twomeypcrepair.github.io/dannystowing.net/
```

## Where things live
- **Project memory** → `memory\` (STATE / DECISIONS / CHANGELOG / LESSONS). Read `memory\STATE.md` first when resuming.
- **Docs, references, notes** → `documentation\`
- **Relational truth** (customer, site record, tasks) → Notion Twomey Knowledge (Brain v5). This repo links to it, never copies it.
- **Secrets** → none in this repo. Infisical references only if any ever appear.

## Conventions
Inherits `C:\TwomeyRepo\CLAUDE.md` and `C:\TwomeyOS\00_System\CONVENTIONS.md`. Git via the `twomey-git-sync` skill. Public repo, so `CLAUDE.md` is gitignored.
