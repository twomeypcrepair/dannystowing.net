// Gate oracle for GATES.md. Usage: node scripts/check-site.mjs <structure|copy|nap|skeleton|live [url]>
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2];
const fail = (msg) => { console.error("FAIL: " + msg); process.exit(1); };
const html = () => readFileSync(resolve(root, "index.html"), "utf8");
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
const jsonld = (h) => {
  const m = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) fail("no JSON-LD block");
  return JSON.parse(m[1]);
};

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
  const gi = readFileSync(resolve(root, ".gitignore"), "utf8");
  if (!/^CLAUDE\.md$/m.test(gi)) fail("CLAUDE.md not gitignored (public repo)");
  console.log("skeleton check passed");
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
