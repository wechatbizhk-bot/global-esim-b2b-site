#!/usr/bin/env node
/* ============================================================================
 * Global eSIM — publish to GitHub in one command
 * ----------------------------------------------------------------------------
 * Uploads this folder to your GitHub repository, creating new files and
 * updating changed ones. It does NOT need git to be installed, and it does not
 * matter whether you upload with GitHub's website in future — use whichever you
 * prefer.
 *
 * USAGE
 *   node push-to-github.mjs <TOKEN>
 *   node push-to-github.mjs <TOKEN> --dry-run        show what would change
 *   node push-to-github.mjs <TOKEN> owner/repo       use a different repository
 *
 * HOW TO GET A TOKEN (about 60 seconds)
 *   1. Go to  https://github.com/settings/personal-access-tokens/new
 *   2. Token name:      "Global eSIM site upload"
 *      Expiration:      pick something, e.g. 90 days
 *   3. Repository access:  Only select repositories  ->  eSim
 *   4. Permissions -> Repository permissions:
 *          Contents ................ Read and write     <-- the only one needed
 *   5. Generate token, copy it, and paste it after the script name.
 *
 * The token is used only to talk to GitHub in this run. It is never written to
 * disk. Treat it like a password — if you ever paste it somewhere public,
 * revoke it at https://github.com/settings/tokens and make a new one.
 *
 * HOW IT AVOIDS WASTED UPLOADS
 *   It asks GitHub for the current file list once, then computes the git blob
 *   SHA of every local file and compares. Only files whose contents actually
 *   differ are uploaded. Re-running with nothing changed uploads nothing.
 * ==========================================================================*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/* -------------------------------------------------------------- args ----- */
const argv = process.argv.slice(2);
const token = argv.find((a) => !a.startsWith("--") && !a.includes("/"));
const repoArg = argv.find((a) => a.includes("/") && !a.startsWith("--"));
const dryRun = argv.includes("--dry-run");
const withWorkflows = argv.includes("--with-workflows");

if (!token || argv.includes("-h") || argv.includes("--help")) {
  console.log(`
Global eSIM — publish to GitHub
===============================

  node push-to-github.mjs <TOKEN> [owner/repo] [--dry-run] [--with-workflows]

Examples
  node push-to-github.mjs ghp_xxxxxxxxxxxx
  node push-to-github.mjs ghp_xxxxxxxxxxxx --dry-run
  node push-to-github.mjs ghp_xxxxxxxxxxxx kawansherman/eSim

Get a token at https://github.com/settings/personal-access-tokens/new
with "Contents: Read and write" on the repository only.
`);
  process.exit(token ? 0 : 1);
}

const REPO = repoArg || "kawansherman/eSim";
const BRANCH = "main";
const API = "https://api.github.com";

const HEADERS = {
  Authorization: "Bearer " + token,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "global-esim-site-publisher"
};

/* ------------------------------------------------------- local files ----- */
const SKIP_DIRS = new Set([".git", "node_modules", ".cache", "_site"]);
const SKIP_FILES = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);

function gitBlobSha(buf) {
  // GitHub's contents API returns the git blob SHA, so we can compare locally.
  const header = Buffer.from("blob " + buf.length + "\0", "utf8");
  return crypto.createHash("sha1").update(header).update(buf).digest("hex");
}

function walk(dir, base, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = base ? base + "/" + entry.name : entry.name;
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      if (entry.name === ".github" && !withWorkflows) continue;
      walk(full, rel, out);
    } else if (entry.isFile()) {
      if (SKIP_FILES.has(entry.name)) continue;
      // Never upload the uploader's own scratch output
      if (/\.(zip|7z|tmp|log)$/i.test(entry.name)) continue;
      const buf = fs.readFileSync(full);
      out.push({ path: rel, buf, sha: gitBlobSha(buf), size: buf.length });
    }
  }
  return out;
}

const local = walk(ROOT, "", []);
/* ------------------------------------------------------ remote state ----- */
console.log("\nGlobal eSIM — publishing to GitHub");
console.log("=".repeat(64));
console.log("  repository : " + REPO + "   branch: " + BRANCH);
console.log("  local files: " + local.length);
if (dryRun) console.log("  MODE       : dry run — nothing will be uploaded");
console.log("");

let remote = {};
try {
  const res = await fetch(`${API}/repos/${REPO}/git/trees/${BRANCH}?recursive=1`, { headers: HEADERS });
  if (res.status === 401) {
    console.error("  ✗ GitHub rejected the token (401). Check it was copied in full and has not expired.");
    process.exit(1);
  }
  if (res.status === 404) {
    console.error(`  ✗ Repository "${REPO}" not found, or the token cannot see it.`);
    console.error("    Check the spelling, and that the token grants access to this repository.");
    process.exit(1);
  }
  if (!res.ok) {
    console.error("  ✗ Could not read the repository tree: HTTP " + res.status);
    console.error("    " + (await res.text()).slice(0, 300));
    process.exit(1);
  }
  const json = await res.json();
  for (const t of json.tree || []) if (t.type === "blob") remote[t.path] = t.sha;
  console.log("  remote files: " + Object.keys(remote).length + " (read in one request)");
} catch (err) {
  console.error("  ✗ Could not reach GitHub: " + (err && err.message ? err.message : err));
  console.error("    Check your internet connection and try again.");
  process.exit(1);
}

/* ------------------------------------------------------------ diff ------- */
const toAdd = local.filter((f) => !(f.path in remote));
const toUpdate = local.filter((f) => f.path in remote && remote[f.path] !== f.sha);
const unchanged = local.filter((f) => remote[f.path] === f.sha);
const onlyRemote = Object.keys(remote).filter((p) => !local.some((f) => f.path === p));

console.log("");
console.log("  new files to add ....... " + toAdd.length);
console.log("  changed files to update  " + toUpdate.length);
console.log("  already up to date ..... " + unchanged.length);
if (onlyRemote.length) console.log("  on GitHub but not local  " + onlyRemote.length + "  (left alone — see below)");
console.log("");

if (toAdd.length) {
  console.log("  NEW:");
  toAdd.forEach((f) => console.log("    + " + f.path + "  (" + f.size.toLocaleString("en-US") + " bytes)"));
  console.log("");
}
if (toUpdate.length) {
  console.log("  UPDATED:");
  toUpdate.forEach((f) => console.log("    ~ " + f.path + "  (" + f.size.toLocaleString("en-US") + " bytes)"));
  console.log("");
}
if (onlyRemote.length && onlyRemote.length <= 12) {
  console.log("  ONLY ON GITHUB (not deleted — remove them yourself if you want to):");
  onlyRemote.forEach((p) => console.log("    ? " + p));
  console.log("");
}

const queue = [...toAdd, ...toUpdate];
if (!queue.length) {
  console.log("  ✓ Everything is already up to date. Nothing to upload.");
  console.log("    (If the live site still looks old, that is browser caching — press Ctrl+F5.)\n");
  process.exit(0);
}
if (dryRun) {
  console.log("  Dry run finished. Re-run without --dry-run to upload " + queue.length + " file(s).\n");
  process.exit(0);
}

/* ----------------------------------------------------------- upload ------ */
const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
let done = 0, failed = 0;
const failures = [];

for (const f of queue) {
  const body = {
    message: `Update ${f.path} (${stamp})`,
    content: f.buf.toString("base64"),
    branch: BRANCH
  };
  if (remote[f.path]) body.sha = remote[f.path];

  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      const res = await fetch(`${API}/repos/${REPO}/contents/${encodeURIComponent(f.path).replace(/%2F/g, "/")}`, {
        method: "PUT",
        headers: { ...HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) { ok = true; break; }
      const text = await res.text();
      if (res.status === 403 && /workflow/i.test(text)) {
        failures.push({ path: f.path, reason: "token lacks the Workflows permission (harmless — see note below)" });
        break;
      }
      if (res.status === 409 || res.status === 422) {
        // Someone changed the file between our read and our write; re-read and retry.
        const g = await fetch(`${API}/repos/${REPO}/contents/${f.path}?ref=${BRANCH}`, { headers: HEADERS });
        if (g.ok) { const j = await g.json(); body.sha = j.sha; continue; }
      }
      if (attempt === 3) failures.push({ path: f.path, reason: "HTTP " + res.status + " " + text.slice(0, 160) });
    } catch (err) {
      if (attempt === 3) failures.push({ path: f.path, reason: String(err && err.message ? err.message : err) });
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }

  done++;
  const label = remote[f.path] ? "updated" : "added  ";
  console.log("  " + (ok ? "✓" : "✗") + " " + label + " " + f.path);
}

/* ----------------------------------------------------------- summary ---- */
console.log("\n" + "=".repeat(64));
console.log("  uploaded : " + (done - failures.length) + " / " + queue.length);
if (failures.length) {
  console.log("  failed   : " + failures.length);
  failures.forEach((x) => console.log("      ✗ " + x.path + " — " + x.reason));
  console.log("\n  Re-run the script to retry only the files that failed.");
} else {
  console.log("  all files uploaded successfully.");
}
console.log("=".repeat(64));

console.log(`
NEXT
  1. GitHub Pages rebuilds automatically — allow 1-3 minutes.
  2. Open your site and press Ctrl+F5 to bypass the browser cache.
  3. Check the new page loads:  https://kawansherman.github.io/eSim/videos.html

REMINDER
  Revoke the token when you are finished with it, or set a short expiry when
  you create it: https://github.com/settings/tokens
`);
process.exit(failures.length ? 1 : 0);
