// Browser-driven audits over the DevTools protocol (needs Chrome on the machine).
// node scripts/audit.mjs axe <url>         zero axe-core WCAG 2.2 AA violations at 1440 and 390 wide
// node scripts/audit.mjs keyboard <url>    skip link first, every Tab stop has a visible focus ring
// node scripts/audit.mjs lighthouse <url>  mobile Lighthouse: seo 100, a11y 100, best-practices >= 90, performance >= 85
import { spawn, execSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [mode, url] = process.argv.slice(2);
const fail = (msg) => { console.error("FAIL: " + msg); process.exit(1); };
if (!mode || !url) fail("usage: node scripts/audit.mjs <axe|keyboard|lighthouse> <url>");

const CHROME = ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"];
const chrome = CHROME.find((p) => { try { return readFileSync(p).length > 0; } catch { return false; } });
if (!chrome) fail("Chrome not found");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withPage(fn) {
  const port = 9300 + Math.floor(Math.random() * 500);
  const profile = mkdtempSync(join(tmpdir(), "audit-"));
  const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--remote-debugging-port=" + port, "--user-data-dir=" + profile, "about:blank"], { stdio: "ignore" });
  let target;
  for (let i = 0; i < 50 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {} if (!target) await sleep(200); }
  if (!target) { proc.kill(); fail("could not attach to Chrome"); }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map(); const waiters = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
    if (waiters.has(m.method)) { waiters.get(m.method)(); waiters.delete(m.method); }
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const waitEvent = (method) => new Promise((r) => waiters.set(method, r));
  const evalJs = async (expression) => { const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description || "")); return r.result.value; };
  const open = async (width, height, mobile) => {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
    const loaded = waitEvent("Page.loadEventFired");
    await send("Page.navigate", { url });
    await loaded;
    await evalJs("new Promise(r=>setTimeout(r,1200))");
  };
  await send("Page.enable"); await send("Runtime.enable");
  try { return await fn({ send, evalJs, open }); }
  finally { ws.close(); try { execSync(process.platform === "win32" ? `taskkill /PID ${proc.pid} /T /F` : `kill ${proc.pid}`, { stdio: "ignore" }); } catch {} }
}

if (mode === "axe") {
  const axeSrc = await (await fetch("https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js")).text();
  if (!axeSrc.includes("axe")) fail("could not download axe-core");
  await withPage(async ({ evalJs, open }) => {
    let total = 0;
    for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
      await open(w, h, mobile);
      await evalJs("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in')); 1");
      await evalJs(axeSrc + "; 1");
      const result = await evalJs("axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } }).then(r => JSON.stringify({ v: r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0,3).map(n => n.target.join(' ')) })), passes: r.passes.length }))");
      const { v, passes } = JSON.parse(result);
      console.log(`${w}px: ${v.length} violations, ${passes} rules passed`);
      for (const x of v) console.log(`  ${x.impact} ${x.id}: ${x.help} -> ${x.nodes.join(" | ")}`);
      total += v.length;
    }
    if (total) fail(`${total} axe violations`);
    console.log("axe check passed");
  });
} else if (mode === "keyboard") {
  await withPage(async ({ send, evalJs, open }) => {
    await open(1440, 900, false);
    await evalJs("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in')); 1");
    const expectedCount = await evalJs("document.querySelectorAll('a[href], button, [tabindex=\"0\"]').length - document.querySelectorAll('.call-bar').length");
    const stops = [];
    for (let i = 0; i < expectedCount + 2; i++) {
      await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
      await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
      const s = await evalJs("(()=>{const e=document.activeElement; if(!e||e===document.body) return JSON.stringify({body:true}); const cs=getComputedStyle(e); const r=e.getBoundingClientRect(); return JSON.stringify({tag:e.tagName, cls:e.className.toString().split(' ')[0], text:(e.getAttribute('aria-label')||e.textContent).trim().replace(/\\s+/g,' ').slice(0,40), href:e.getAttribute('href'), outline:cs.outlineStyle+' '+cs.outlineWidth, visible:cs.visibility!=='hidden'&&cs.display!=='none'&&r.width>0&&r.height>0, inView:r.top>=0&&r.bottom<=innerHeight, w:Math.round(r.width), h:Math.round(r.height)})})()");
      const st = JSON.parse(s);
      if (st.body) break;
      stops.push(st);
    }
    for (const st of stops) console.log(`  ${st.tag}.${st.cls} "${st.text}" ${st.href || ""} outline=${st.outline} ${st.w}x${st.h}`);
    if (!stops.length || stops[0].cls !== "skip") fail("first Tab stop is not the skip link");
    const noRing = stops.filter((s) => !/solid/.test(s.outline) || s.outline.endsWith(" 0px"));
    if (noRing.length) fail("Tab stops without a visible focus ring: " + noRing.map((s) => s.tag + "." + s.cls).join(", "));
    const small = stops.filter((s) => s.cls !== "skip" && (s.w < 24 || s.h < 24));
    if (small.length) fail("Tab stops smaller than 24x24: " + small.map((s) => `${s.cls} ${s.w}x${s.h}`).join(", "));
    const order = stops.map((s) => s.cls);
    for (const c of ["skip", "brand", "nav-call", "btn", "cell", "big-phone", "built"]) if (!order.includes(c)) fail("expected a Tab stop with class " + c);
    if (stops.length < expectedCount) fail(`only ${stops.length} of ${expectedCount} focusable elements were reached by Tab`);
    console.log(`${stops.length} Tab stops, all with focus rings`);
    console.log("keyboard check passed");
  });
} else if (mode === "lighthouse") {
  const out = join(mkdtempSync(join(tmpdir(), "lh-")), "lh.json");
  const args = ["-y", "lighthouse@12.6.1", url, "--output=json", "--output-path=" + out, "--quiet", "--chrome-flags=--headless=new --no-first-run", "--only-categories=performance,accessibility,best-practices,seo"];
  const r = spawnSync(process.platform === "win32" ? "npx.cmd" : "npx", args, { stdio: ["ignore", "inherit", "inherit"], shell: process.platform === "win32" });
  if (r.status !== 0) fail("lighthouse exited " + r.status);
  const lhr = JSON.parse(readFileSync(out, "utf8"));
  const score = (c) => Math.round(lhr.categories[c].score * 100);
  const s = { performance: score("performance"), accessibility: score("accessibility"), "best-practices": score("best-practices"), seo: score("seo") };
  console.log("lighthouse (mobile):", JSON.stringify(s));
  const failing = Object.values(lhr.audits).filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "notApplicable").map((a) => `${a.id} (${a.score})`);
  if (failing.length) console.log("audits below 1:", failing.join(", "));
  const min = { performance: 85, accessibility: 100, "best-practices": 90, seo: 100 };
  const short = Object.entries(min).filter(([k, v]) => s[k] < v);
  if (short.length) fail("below threshold: " + short.map(([k, v]) => `${k} ${s[k]} < ${v}`).join(", "));
  console.log("lighthouse check passed");
} else {
  fail("unknown mode " + mode);
}
