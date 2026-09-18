// Gate oracle for GATES.md. Usage: node scripts/check-site.mjs <structure|copy|nap|skeleton|seo|footer|live [url]>
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2];
const fail = (msg) => { console.error("FAIL: " + msg); process.exit(1); };
const read = (f) => readFileSync(resolve(root, f), "utf8");
const html = () => read("index.html");
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
const jsonld = (h) => {
  const m = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) fail("no JSON-LD block");
  return JSON.parse(m[1]);
};
const meta = (h, attr, name) => h.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];

const NAP = {
  phoneDigits: "8709942701",
  phoneDisplay: "(870) 994-2701",
  street: "7 Little Creek Cir",
  cityZip: "Ash Flat, AR 72513",
  email: "dannysauto@centurytel.net",
};

// Old site copy: the positive control the copy scanner must reject.
const OLD_COPY = "We specialize in both auto body repair and auto painting. Expert Mechanics. Bumper-To-Bumper. Used Car Sales. Driven to deliver the best in auto repair services — seamless.";
const BODYSHOP = /(body repair|auto painting|paint shop|used car|bumper-to-bumper|collision repair|expert mechanics|auto repair services)/i;
const DASHES = /[–—]/;
const BANNED = /\b(solution|platform|leverage|empower|elevate|robust|seamless|streamline|passionate|dedicated to|industry-leading|cutting-edge|best-in-class|delve|unlock)\b/i;
const scan = (s) => [BODYSHOP, DASHES, BANNED].map((re) => s.match(re)?.[0]).filter(Boolean);

if (mode === "structure") {
  const h = html();
  const h1s = h.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(`expected 1 h1, found ${h1s.length}`);
  if (!h.includes(`href="tel:+1${NAP.phoneDigits}"`)) fail("no tel link to shop phone");
  if (!/<meta name="viewport"/.test(h)) fail("no viewport meta");
  if (!/<meta name="description" content="[^"]{40,}"/.test(h)) fail("no usable meta description");
  if (!/<title>[^<]*Towing[^<]*<\/title>/.test(h)) fail("title does not say Towing");
  const ld = jsonld(h);
  if (ld["@type"] !== "AutomotiveBusiness") fail("JSON-LD @type is not AutomotiveBusiness");
  if (!/^https:\/\/fonts\.googleapis\.com/.test(h.match(/href="(https:\/\/fonts[^"]+)"/)?.[1] || "https://fonts.googleapis.com")) fail("unexpected font host");
  console.log("structure check passed");
} else if (mode === "copy") {
  const ctl = scan(OLD_COPY);
  if (ctl.length < 3) fail("positive control did not trip the scanner: " + JSON.stringify(ctl));
  const hits = scan(text(html()));
  if (hits.length) fail("page copy tripped: " + JSON.stringify(hits));
  console.log("copy check passed");
} else if (mode === "nap") {
  const h = html(); const t = text(h); const ld = jsonld(h);
  for (const [k, v] of Object.entries(NAP)) if (k !== "phoneDigits" && !t.includes(v)) fail(`page text missing ${k}: ${v}`);
  if (!/Mon(day)?[^.]{0,40}Fri(day)?[^.]{0,40}9\s?AM[^.]{0,20}5\s?PM/i.test(t)) fail("hours Mon-Fri 9 AM to 5 PM not found");
  if (ld.telephone !== "+1" + NAP.phoneDigits) fail("JSON-LD telephone mismatch");
  if (ld.email !== NAP.email) fail("JSON-LD email mismatch");
  const a = ld.address || {};
  if (a.streetAddress !== NAP.street || a.addressLocality !== "Ash Flat" || a.postalCode !== "72513") fail("JSON-LD address mismatch");
  const oh = (ld.openingHoursSpecification || [])[0] || {};
  if (oh.opens !== "09:00" || oh.closes !== "17:00" || (oh.dayOfWeek || []).length !== 5) fail("JSON-LD hours mismatch");
  console.log("nap check passed");
} else if (mode === "skeleton") {
  for (const f of ["README.md", "AGENTS.md", "CLAUDE.md", ".gitignore", "memory/STATE.md", "memory/DECISIONS.md", "memory/CHANGELOG.md", "memory/LESSONS.md", "index.html", "style.css", "assets/d-mark.png"])
    if (!existsSync(resolve(root, f))) fail("missing " + f);
  const gi = read(".gitignore");
  if (!/^CLAUDE\.md$/m.test(gi)) fail("CLAUDE.md not gitignored (public repo)");
  console.log("skeleton check passed");
} else if (mode === "seo") {
  const h = html();
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] || "";
  if (title.length < 20 || title.length > 60) fail(`title length ${title.length}, want 20-60`);
  const desc = meta(h, "name", "description") || "";
  if (desc.length < 50 || desc.length > 160) fail(`description length ${desc.length}, want 50-160`);
  if (!/<html lang="en">/.test(h)) fail("html lang missing");
  const canonical = h.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (!canonical || !/^https:\/\/[^ ]+\/$/.test(canonical)) fail("canonical missing or not an absolute URL ending in /");
  for (const p of ["og:type", "og:site_name", "og:url", "og:title", "og:description", "og:image", "og:image:alt"]) if (!meta(h, "property", p)) fail("missing " + p);
  if (meta(h, "property", "og:url") !== canonical) fail("og:url differs from canonical");
  if (meta(h, "name", "twitter:card") !== "summary_large_image") fail("twitter:card missing");
  if (jsonld(h).url !== canonical) fail("JSON-LD url differs from canonical");
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  if (levels[0] !== 1) fail("first heading is not h1");
  for (let i = 1; i < levels.length; i++) if (levels[i] > levels[i - 1] + 1) fail(`heading level skips from h${levels[i - 1]} to h${levels[i]}`);
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  for (const tag of imgs) if (!/\balt="/.test(tag)) fail("img without alt: " + tag.slice(0, 80));
  if (!existsSync(resolve(root, "sitemap.xml"))) fail("sitemap.xml missing");
  const sm = read("sitemap.xml");
  if (!sm.includes("<loc>" + canonical + "</loc>")) fail("sitemap does not list the canonical URL");
  if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sm)) fail("sitemap lastmod missing");
  const robots = read("robots.txt");
  if (!robots.includes("Sitemap: " + canonical + "sitemap.xml")) fail("robots.txt has no Sitemap line for the canonical host");
  if (!existsSync(resolve(root, "404.html"))) fail("404.html missing");
  if (!/name="robots" content="noindex"/.test(read("404.html"))) fail("404.html is not noindex");
  console.log("seo check passed");
} else if (mode === "footer") {
  const h = html();
  const footer = h.match(/<footer>[\s\S]*?<\/footer>/)?.[0] || "";
  if (!/<a [^>]*href="https:\/\/twomeypcrepair\.com"[^>]*>Built by Twomey PC Repair<\/a>/.test(footer)) fail("footer lacks the Built by Twomey PC Repair link");
  if (/unsplash/i.test(text(h))) fail("visible page text still mentions Unsplash");
  if (/@ftodne|@sebastiaanstam|@jairph|@hectoroconnor/.test(h)) fail("photographer credit links still present");
  console.log("footer check passed");
} else if (mode === "live") {
  const url = process.argv[3];
  if (!url) fail("live needs a url");
  const res = await fetch(url, { redirect: "follow" });
  if (res.status !== 200) fail(`status ${res.status}`);
  const body = await res.text();
  if (!body.includes("Danny's Towing") && !body.includes("Danny&#39;s Towing")) fail("body does not name Danny's Towing");
  if (!body.includes(`tel:+1${NAP.phoneDigits}`)) fail("body has no phone link");
  console.log("live check passed");
} else {
  fail("unknown mode " + mode);
}
