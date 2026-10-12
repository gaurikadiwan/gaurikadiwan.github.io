// Checks every internal link, image and anchor in the static export (out/).
// Run after `npm run build`. Exits non-zero if anything is broken.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (!fs.existsSync(OUT)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) htmlFiles.push(p);
  }
})(OUT);

const idsCache = new Map();
function idsOf(file) {
  if (!idsCache.has(file)) {
    const html = fs.readFileSync(file, "utf8");
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
}

function resolveTarget(urlPath) {
  let p = decodeURIComponent(urlPath);
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
  const candidates = [path.join(OUT, p), path.join(OUT, p, "index.html"), path.join(OUT, `${p}.html`)];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

const problems = [];
let checked = 0;
for (const file of htmlFiles) {
  const rel = path.relative(OUT, file);
  if (rel.startsWith("_next") || rel === "404.html" || rel.startsWith("_not-found") || rel.includes("_none")) continue;
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|data:|tel:)/.test(url) || url.startsWith("//")) continue;
    checked++;
    const [pathname, hash] = url.split("#");
    const target = pathname ? resolveTarget(pathname.split("?")[0]) : file;
    if (!target) {
      problems.push(`${rel}: broken link ${url}`);
      continue;
    }
    if (hash && target.endsWith(".html") && !idsOf(target).has(hash)) {
      problems.push(`${rel}: missing anchor #${hash} in ${url || "(same page)"}`);
    }
  }
  if (/lorem ipsum|TODO|TBD/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) {
    problems.push(`${rel}: contains placeholder text`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) across ${htmlFiles.length} pages:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${checked} internal links and assets checked across ${htmlFiles.length} HTML files. No problems.`);
