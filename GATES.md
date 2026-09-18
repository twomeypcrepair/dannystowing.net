# Gates: dannystowing.net static site

OWNS: **

Scope: a one-page static GitHub Pages site for Danny's Towing (towing only, body shop dropped) that replaces dannysautobody.net, with the repo skeleton, verified live on GitHub Pages.

- [x] G1: index.html has one h1, a tel link to the shop phone, viewport, description, and AutomotiveBusiness JSON-LD
  CHECK: node scripts/check-site.mjs structure
  EXPECT: structure check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=6f53e929a6a306fe4fc33f6bfaf26a53f3125c822629af7726baee7c6dc42a8d; exit=0; EXPECT=matched; output-sha256=cd7df0e01ad8c1bda28e34c53fe04d5d732f9102d2fc7cf59d331bea90926512; output-bytes=23; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G2: page copy carries no body-shop service claims, no em/en dashes, and none of the VOICE.md banned words; the scanner fails on the old site's copy as a positive control
  CHECK: node scripts/check-site.mjs copy
  EXPECT: copy check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=6456b4e202a843f9e13f27e96117b786f162f4108d244b6e923d12682e4f5d36; exit=0; EXPECT=matched; output-sha256=6f13841fa1bd0122a95b31a1a7c9b69e03672763f613f1957695e0122b665cf4; output-bytes=18; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G3: phone, street address, city/zip, email and hours in the page and in the JSON-LD match the old site's published NAP
  CHECK: node scripts/check-site.mjs nap
  EXPECT: nap check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=c9f26dd4ae94ffc73c74241ece6b1b93cea402acd4d46160909145457ca2485b; exit=0; EXPECT=matched; output-sha256=50c605a090185309b6d137278f7f1fbd5c63cfdb162cec512a61fd08eff96bd0; output-bytes=17; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G4: repo skeleton present (README, AGENTS, CLAUDE, .gitignore, memory/STATE+DECISIONS+CHANGELOG+LESSONS) and CLAUDE.md is gitignored because the repo is public
  CHECK: node scripts/check-site.mjs skeleton
  EXPECT: skeleton check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=90d2b7cb7da0603a9b97f737d35b5fce3db0f2377f2f098b50b779e4020949fc; exit=0; EXPECT=matched; output-sha256=e90cad503481fb2322f543ac341cef2b777486d8fe475d2d00e19e734eb904bb; output-bytes=22; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G5: page renders at 375px and desktop with no horizontal overflow, nav on one line, hero CTA visible without scrolling, no console errors
  EVIDENCE: 2026-09-17 v2 review via headless Chrome DevTools emulation (scratchpad shot.mjs). 1440x900: h1 2 lines, hero CTA bottom 670px, nav 642px one line, scrollWidth 1425 = viewport minus scrollbar. 820 tablet: h1 2 lines, nav children at 106-256 / 280-545 / 569-722 (no overlap), scrollWidth 820, no empty bento cell. 390 phone: scrollWidth 390, call pill fixed, hero CTA bottom 462px of 844. Console/runtime errors: none. All 4 images load; fonts Outfit, Geist, Geist Mono loaded.

- [x] G6: site is live on GitHub Pages: the Pages URL returns 200 and serves the towing page with the phone link
  CHECK: node scripts/check-site.mjs live https://twomeypcrepair.github.io/dannystowing.net/
  EXPECT: live check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=9f148ed28693f8f22f368ab048e86f083d50b4b8de07c8007dc6721771b90a2b; exit=0; EXPECT=matched; output-sha256=b3b66deb4e2f35d8e64e3c7b5991312e1bd57f76fffd0629b057353f1f96d497; output-bytes=18; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G7: SEO structure is complete: title 20-60 chars, description 50-160, canonical, full Open Graph set with og:url equal to canonical, Twitter card, JSON-LD url equal to canonical, heading levels never skip, every img has alt, sitemap.xml lists the canonical with lastmod, robots.txt points at the sitemap, noindex 404 page
  CHECK: node scripts/check-site.mjs seo
  EXPECT: seo check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=c9b242197788bb85fb212c46b115fcd7dfa460b6791da7ce8770612ba4638fed; exit=0; EXPECT=matched; output-sha256=c5881f2c13c6be13114adcfd1e7695c8c52a79f205a96ede81edb8bcf655c9c5; output-bytes=17; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G8: footer carries a Built by Twomey PC Repair link to twomeypcrepair.com and no photo credits remain
  CHECK: node scripts/check-site.mjs footer
  EXPECT: footer check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=a50e4b948b775dfa560b918b6d548bf158db899e5bd95349a1688b711f225fd5; exit=0; EXPECT=matched; output-sha256=5533e9ec33436c5b2c99456b471690df3e730d15999c186eb32f890306d9b4e5; output-bytes=20; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G9: axe-core reports zero WCAG 2.2 AA and best-practice violations at 1440 and 390 wide on the live page
  CHECK: node scripts/audit.mjs axe https://twomeypcrepair.github.io/dannystowing.net/
  EXPECT: axe check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=9606135369c157324ae8d2c1e7c30839838a598b2414a9896ba19451a2dc4168; exit=0; EXPECT=matched; output-sha256=8cac6f7f301599e0215d7ede188d5cce5e615d51e488005ef6c8df5f8df0bce5; output-bytes=92; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [x] G10: keyboard: first Tab stop is the skip link, every Tab stop shows a visible focus ring and is at least 24x24, every focusable element is reached
  CHECK: node scripts/audit.mjs keyboard https://twomeypcrepair.github.io/dannystowing.net/
  EXPECT: keyboard check passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=7fe5b8bc7897515af483e01107b30575442eac2f6e0c515a7d7022323767411c; exit=0; EXPECT=matched; output-sha256=1dcb22a81241e4987c264c326b56830c2884cac5c0563505f1a09b8f87938384; output-bytes=1016; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\TwomeyRepo\websites\dannystowing.net; path=d9662ebded43/37 entries

- [ ] G11: Lighthouse mobile on the live page scores seo 100, accessibility 100, best-practices at least 90, performance at least 85 (run the checker with --timeout 600)
  CHECK: node scripts/audit.mjs lighthouse https://twomeypcrepair.github.io/dannystowing.net/
  EXPECT: lighthouse check passed
  EVIDENCE: pending
