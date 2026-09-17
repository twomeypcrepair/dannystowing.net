# Gates: dannystowing.net static site

OWNS: **

Scope: a one-page static GitHub Pages site for Danny's Towing (towing only, body shop dropped) that replaces dannysautobody.net, with the repo skeleton, verified live on GitHub Pages.

- [ ] G1: index.html has one h1, a tel link to the shop phone, viewport, description, and AutomotiveBusiness JSON-LD
  CHECK: node scripts/check-site.mjs structure
  EXPECT: structure check passed
  EVIDENCE: pending

- [ ] G2: page copy carries no body-shop service claims, no em/en dashes, and none of the VOICE.md banned words; the scanner fails on the old site's copy as a positive control
  CHECK: node scripts/check-site.mjs copy
  EXPECT: copy check passed
  EVIDENCE: pending

- [ ] G3: phone, street address, city/zip, email and hours in the page and in the JSON-LD match the old site's published NAP
  CHECK: node scripts/check-site.mjs nap
  EXPECT: nap check passed
  EVIDENCE: pending

- [ ] G4: repo skeleton present (README, AGENTS, CLAUDE, .gitignore, memory/STATE+DECISIONS+CHANGELOG+LESSONS) and CLAUDE.md is gitignored because the repo is public
  CHECK: node scripts/check-site.mjs skeleton
  EXPECT: skeleton check passed
  EVIDENCE: pending

- [ ] G5: page renders at 375px and desktop with no horizontal overflow, nav on one line, hero CTA visible without scrolling, no console errors
  EVIDENCE: pending

- [ ] G6: site is live on GitHub Pages: the Pages URL returns 200 and serves the towing page with the phone link
  CHECK: node scripts/check-site.mjs live https://twomeypcrepair.github.io/dannystowing.net/
  EXPECT: live check passed
  EVIDENCE: pending
