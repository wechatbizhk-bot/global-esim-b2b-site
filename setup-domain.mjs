/* ============================================================================
 * Global eSIM — one-command domain setup
 * ----------------------------------------------------------------------------
 * Handles BOTH deployment shapes:
 *
 *   1. GitHub Pages project URL (no custom domain yet):
 *        node setup-domain.mjs https://YOUR-USERNAME.github.io/YOUR-REPO
 *      No CNAME file is created, and no DNS work is needed.
 *
 *   2. Your own domain bought from GoDaddy:
 *        node setup-domain.mjs yourdomain.com
 *      Creates the CNAME file and prints the DNS records to add.
 *
 * Either way it sets config.site.url and rewrites every canonical / structured
 * data URL across all HTML documents, so search engines and social previews
 * point at the real address instead of the example.com placeholder.
 *
 * Safe to re-run, and safe to run again later when you move from the github.io
 * address to your own domain.
 * ==========================================================================*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PLACEHOLDER = 'https://www.example.com';

/* ------------------------------------------------------------- args ----- */
const raw = (process.argv[2] || '').trim();

if (!raw || raw === '-h' || raw === '--help') {
  console.log(`
Global eSIM — domain setup
==========================

  node setup-domain.mjs <domain-or-url>

Case 1 — still on the free GitHub Pages address
  node setup-domain.mjs https://YOUR-USERNAME.github.io/YOUR-REPO

Case 2 — your own domain from GoDaddy
  node setup-domain.mjs yourdomain.com
  node setup-domain.mjs www.yourdomain.com        ("www." is stripped)

What it does
  Sets site.url in config.js and rewrites every canonical URL across all HTML
  pages. In Case 2 it also creates the CNAME file and prints the DNS records
  to add at GoDaddy.
`);
  process.exit(0);
}

const isGithubPages = /\.github\.io(\/|$)/i.test(raw);
let ORIGIN, displayHost, mode;

if (isGithubPages) {
  // Keep the full URL including the repository sub-path.
  let u = raw.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  ORIGIN = "https://" + u;
  displayHost = u;
  mode = "pages";
} else {
  let domain = raw.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/\.$/, "").toLowerCase();
  const hadWww = /^www\./.test(domain);
  if (hadWww) domain = domain.slice(4);
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain)) {
    console.error('\n  ✗ "' + domain + '" does not look like a valid domain name.');
    console.error('    Expected "yourdomain.com", or a full URL such as');
    console.error('    "https://YOUR-USERNAME.github.io/YOUR-REPO".\n');
    process.exit(1);
  }
  ORIGIN = "https://" + domain;
  displayHost = domain;
  mode = "domain";
  if (hadWww) console.log('\n  note: you typed "www." — the bare domain is used as the canonical host,\n        and www will redirect to it automatically.');
}

console.log("\nGlobal eSIM — domain setup");
console.log("=".repeat(62));
console.log("  mode                    : " + (mode === "pages" ? "GitHub Pages project URL (no custom domain)" : "custom domain"));
console.log("  canonical base URL      : " + ORIGIN);
if (mode === "domain") console.log("  www redirect            : www." + displayHost + "  ->  " + displayHost);
console.log("");

/* -------------------------------------------------- 1. CNAME file ------- */
const cnamePath = path.join(ROOT, "CNAME");
if (mode === "domain") {
  const before = fs.existsSync(cnamePath) ? fs.readFileSync(cnamePath, "utf8").trim() : null;
  fs.writeFileSync(cnamePath, displayHost + "\n", "utf8");
  console.log("1. CNAME file " + (before === displayHost ? "already correct" : before ? "updated (" + before + " -> " + displayHost + ")" : "created") + ": " + displayHost);
} else {
  if (fs.existsSync(cnamePath)) {
    const existing = fs.readFileSync(cnamePath, "utf8").trim();
    console.log("1. CNAME file PRESENT (" + existing + ") but you are using the github.io address.");
    console.log("   ⚠️  A CNAME file tells GitHub Pages to serve a custom domain. Because you have");
    console.log("      not set one, DELETE the CNAME file from your repository or Pages may fail.");
  } else {
    console.log("1. No CNAME file — correct for a github.io project URL. Nothing to do.");
  }
}

/* ------------------------------------------- 2. rewrite references ------ */
const targets = [];
for (const f of fs.readdirSync(ROOT)) if (f.endsWith(".html")) targets.push(f);
const propsDir = path.join(ROOT, "proposals");
if (fs.existsSync(propsDir)) for (const f of fs.readdirSync(propsDir)) if (f.endsWith(".html")) targets.push(path.join("proposals", f));
targets.push(path.join("assets", "js", "config.js"));
targets.push(path.join("proposals", "build-proposals.mjs"));

// config.js is the single source of truth for the current base URL, so a
// re-run (e.g. moving from github.io to a custom domain) works cleanly.
const cfgPath = path.join(ROOT, "assets", "js", "config.js");
const cfgText = fs.readFileSync(cfgPath, "utf8");
const cfgMatch = cfgText.match(/^\s*url:\s*"([^"]+)"/m);
let currentBase = cfgMatch ? cfgMatch[1].replace(/\/+$/, "") : PLACEHOLDER;

if (currentBase === ORIGIN) {
  console.log("2. Canonical URLs already point at " + ORIGIN + " — nothing to rewrite.");
} else {
  let filesChanged = 0, refsChanged = 0;
  for (const rel of targets) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) continue;
    const before = fs.readFileSync(p, "utf8");
    if (!before.includes(currentBase)) continue;
    const hits = before.split(currentBase).length - 1;
    fs.writeFileSync(p, before.split(currentBase).join(ORIGIN), "utf8");
    filesChanged++; refsChanged += hits;
  }
  console.log("2. Rewrote " + refsChanged + " URL reference(s) across " + filesChanged + " file(s)");
  console.log("   " + currentBase + "  ->  " + ORIGIN);
  console.log("   (canonical tags, Open Graph, structured data, config.url, proposal build script)");
}

/* ------------------------------------------------------- 3. verify ------ */
let leftovers = 0;
for (const rel of targets) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  const n = fs.readFileSync(p, "utf8").split("example.com").length - 1;
  if (n) { console.log("   ! " + rel + " still contains " + n + " placeholder reference(s)"); leftovers += n; }
}
console.log("3. Placeholder check: " + (leftovers ? leftovers + " remaining (see above)" : "clean — no example.com left in any page"));

/* ------------------------------------------------------- 4. next ------- */
if (mode === "domain") {
  const A = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"];
  const AAAA = ["2606:50c0:8000::153", "2606:50c0:8001::153", "2606:50c0:8002::153", "2606:50c0:8003::153"];

  console.log("\n" + "=".repeat(62));
  console.log("NOW ADD THESE RECORDS IN GODADDY");
  console.log("=".repeat(62));
  console.log("\nGoDaddy  ->  My Products  ->  " + displayHost + "  ->  DNS\n");
  console.log("DELETE first:");
  console.log("  any existing  A      @     record pointing at GoDaddy parking");
  console.log('  any existing  CNAME  www   record pointing at "@" or a parking page\n');
  console.log("THEN ADD:");
  console.log("  Type    Name    Value                           TTL");
  console.log("  " + "-".repeat(58));
  for (const ip of A) console.log("  A       @       " + ip.padEnd(31) + " 1 hour");
  for (const ip of AAAA) console.log("  AAAA    @       " + ip.padEnd(31) + " 1 hour   (optional, IPv6)");
  console.log("  CNAME   www     YOUR-GITHUB-USERNAME.github.io  1 hour");
  console.log("\n  Use \"yourname.github.io\" only — never add the repository name.\n");
  console.log("=".repeat(62));
  console.log("THEN, ON GITHUB");
  console.log("=".repeat(62));
  console.log(`
  1. Push these files to your repository (the CNAME file matters).
  2. Repository  ->  Settings  ->  Pages
  3. Custom domain:  ${displayHost}          ->  Save
  4. Wait for "DNS check successful"   (10 minutes to 24 hours)
  5. Tick "Enforce HTTPS"              (up to 24 hours to appear)

Test it:
  Resolve-DnsName ${displayHost} -Type A
  Resolve-DnsName www.${displayHost} -Type CNAME
`);
} else {
  console.log("\n" + "=".repeat(62));
  console.log("THEN, ON GITHUB");
  console.log("=".repeat(62));
  console.log(`
  1. Upload these updated files to your repository.
  2. Settings -> Pages should already be set to:
       Source: Deploy from a branch   Branch: main   Folder: / (root)
  3. Wait 1-3 minutes, then hard-refresh with Ctrl+F5.

Your site will be live at:
  ${ORIGIN}/

No DNS changes are needed for a github.io address.

LATER, when you buy your domain from GoDaddy, re-run this script:
  node setup-domain.mjs yourdomain.com
and it will move the canonical URLs across for you.
`);
}

console.log("Full walkthrough, including troubleshooting: DEPLOYMENT.md");
console.log("Status: " + (leftovers ? "finished WITH WARNINGS" : "OK — canonical URLs now point at " + ORIGIN) + "\n");
process.exit(leftovers ? 1 : 0);
