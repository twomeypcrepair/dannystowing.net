# LESSONS — dannystowing.net

## 2026-09-17 — Notion and the live site disagreed on the email
Notion Customers row says dannysautobody@centurytel.net; the live site's mailto is dannysauto@centurytel.net. Used the live site (customer-approved, public) and flagged it. Lesson: for NAP, the published site or Google Business Profile beats a CRM field; check both.

## 2026-09-17 — Bash heredocs with an odd number of apostrophes fail in this harness
`cat > file <<'EOF'` blocks containing prose like "Danny's" died with "unexpected EOF while looking for matching quote" when the whole command had an odd apostrophe count. The Write tool is the reliable path for prose files on this box. Python one-liners with `open()` also need `C:\` style paths, not `/c/`.

## 2026-09-17 — The app's browser pane could not capture the v2 page
Screenshots timed out once the page had an infinite CSS marquee, and IntersectionObserver reveals never fired because the pane tab was in the background (hidden documents get no intersection callbacks). Plain `chrome --headless --screenshot` also lies about phones: Chrome will not open a window narrower than about 500px, so a "390px" capture is really a cropped 500px layout.
What worked: a 60-line Node script driving headless Chrome over the DevTools protocol (Node's built-in WebSocket), using `Emulation.setDeviceMetricsOverride` for true phone and tablet viewports, forcing `.reveal.in` and pausing the marquee before `Page.captureScreenshot`, and returning scrollWidth, h1 line count, CTA position, unloaded images and any element wider than the viewport. Kept in the session scratchpad; worth promoting to a shared tool if a third site needs it.

## 2026-09-17 — Fixed element at left:50% shrink-fits to half the viewport
A `position:fixed; left:50%; transform:translateX(-50%)` nav with no explicit width gets shrink-to-fit sizing against the space to the right of 50%, so at tablet widths it clamped and its flex gaps collapsed (brand ran into the links). `width: max-content` fixes it.
