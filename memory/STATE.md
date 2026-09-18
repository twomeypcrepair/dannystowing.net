# STATE — dannystowing.net

_Last updated: 2026-09-17 (night)_

## Where it stands
v2 high-end dark design plus SEO and accessibility pass, live on GitHub Pages at https://twomeypcrepair.github.io/dannystowing.net/. Gates G1 to G13 in GATES.md (structure, copy, NAP, skeleton, visual, live, SEO, footer credit, axe, keyboard, Lighthouse, holiday logic, holiday pill in browser). Automatic holiday greeting pill is live; preview with ?holiday=YYYY-MM-DD. Not yet on its own domain. Not yet shown to Danny. Vash is getting the domain once Danny approves the site.

## Facts carried over from dannysautobody.net (verified 2026-09-17 by reading the live site)
- Phone (870) 994-2701, email dannysauto@centurytel.net, 7 Little Creek Cir, Ash Flat AR 72513, Mon to Fri 9 AM to 5 PM.
- Service towns: Ash Flat, Cherokee Village, Franklin, Hardy, Horseshoe Bend, Mammoth Spring, Salem, Williford.
- Brand mark: red "D" (assets/d-mark.png, transparent, pulled from the old site's uploads).
- Notion has the email as dannysautobody@centurytel.net. The live site says dannysauto@. Went with the live site. Confirm with Danny.

## Needs Danny (assumptions to confirm, in the order they matter)
1. Business name: RESOLVED 2026-09-18. Legal name is "Danny's Auto" (from Vash). Site brand, title, schema and footer use it; "Danny's Towing" kept as a schema alternateName.
2. Hours. Kept Mon to Fri 9 to 5 from the old site. If he runs after-hours or 24/7 calls, the page should say so. It currently makes no after-hours claim.
3. Services listed: towing, wrecks, won't-start help (jump/gas/lockout), drop-off anywhere. Guessed from a normal towing operation. Cut anything he doesn't do.
4. Email address (see above).
5. Photos. The three on the page are Unsplash stock (see DECISIONS). Real photos of his truck should replace them: hero 11:13 portrait, bento tall 3:4, bento wide 9:7.

## Domain cutover checklist (when dannystowing.net is registered)
The site currently uses the github.io URL as its canonical. Swap every one of these to https://dannystowing.net/ in the same commit, then rerun `node scripts/check-site.mjs seo`:
- `index.html`: `<link rel="canonical">`, `og:url`, JSON-LD `url`
- `sitemap.xml`: `<loc>`
- `robots.txt`: `Sitemap:` line
- `404.html`: the favicon href and "Back to the site" href use the `/dannystowing.net/` path prefix; on the custom domain they become `/`
- Add a `CNAME` file containing `dannystowing.net`, set the custom domain in the repo Pages settings, Cloudflare CNAME `dannystowing.net` → `twomeypcrepair.github.io` (and `www` if wanted), enforce HTTPS once the cert issues.
- Cloudflare redirect rule on the old zone: dannysautobody.net/* → https://dannystowing.net/ (301). Keep the old zone.
- Google Business Profile: update the website field and, if the name changes, the business name. Submit the sitemap in Search Console.
- Notion: retire the dannysautobody.net Infrastructure row, add dannystowing.net. Human-gated.

## Next steps
- Show Danny, collect the answers above, edit copy, swap photos.
- Then the domain cutover checklist.
