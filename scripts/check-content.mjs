#!/usr/bin/env node
/**
 * Content guard — `npm run check:content` (also runs before every build).
 *
 * Makes sure the site never changes what the authors wrote:
 *   1. Every article and video script on the site matches its original file
 *      (content/originals/*.txt) sentence for sentence — nothing changed,
 *      added or removed. Only typography may differ (oʻ gʻ ʼ « », spaces,
 *      bold/italic marks).
 *   2. Every number shown in an infographic appears in that article's text.
 *   3. Homepage excerpts are exact quotes from the article.
 *
 * If anything fails, the build stops and the problem is printed.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), "utf8");

// Same rules as scripts/import_sources.py
function normalize(s) {
  s = s.replace(/ /g, " ");
  s = s.replace(/([oOgG])[‘’'`ʼʻ]/g, "$1ʻ");
  s = s.replace(/(?<=[\p{L}\p{N}_])[‘’'`](?=[\p{L}\p{N}_])/gu, "ʼ");
  s = s.replace(/“/g, "«").replace(/”/g, "»").replace(/„/g, "«");
  let open = true;
  s = s.replace(/"/g, () => {
    const q = open ? "«" : "»";
    open = !open;
    return q;
  });
  return s.replace(/\*+/g, "").replace(/\s+/g, " ").trim();
}

const numberTokens = (s) =>
  new Set((normalize(s).match(/\d+(?:[ ]\d{3})*(?:[.,]\d+)?/g) ?? []).map((t) => t));

const errors = [];
const fail = (where, msg) => errors.push(`✗ ${where}: ${msg}`);

function compare(where, siteParas, originalParas, { caseInsensitiveFirst = false } = {}) {
  const a = siteParas.map(normalize);
  const b = originalParas.map(normalize).filter(Boolean);
  if (caseInsensitiveFirst && a[0] && b[0] && a[0].toLowerCase() === b[0].toLowerCase()) {
    a[0] = b[0];
  }
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] === b[i]) continue;
    if (a[i] === undefined)
      return fail(where, `paragraph missing on the site: «${b[i].slice(0, 80)}…»`);
    if (b[i] === undefined)
      return fail(where, `paragraph added that is not in the original: «${a[i].slice(0, 80)}…»`);
    let k = 0;
    while (a[i][k] === b[i][k]) k++;
    return fail(
      where,
      `paragraph ${i + 1} differs from the original\n    site:     …${a[i].slice(Math.max(0, k - 30), k + 50)}…\n    original: …${b[i].slice(Math.max(0, k - 30), k + 50)}…`,
    );
  }
}

function strings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => strings(v, out));
  return out;
}

// ── articles ──
const articleDir = "src/content/articles";
const files = readdirSync(join(root, articleDir)).filter((f) => f.endsWith(".json"));
for (const file of files) {
  const a = JSON.parse(read(join(articleDir, file)));
  const where = `maqola ${a.slug}`;
  const original = read(`content/originals/${a.slug}.txt`).split("\n");

  const site = [a.title];
  for (const b of a.body) {
    if (b.type === "graphic") continue;
    if (b.type === "list") site.push(...b.items);
    else site.push(b.text);
  }
  if (a.sources) site.push(a.sources.heading, ...a.sources.items);
  compare(where, site, original, { caseInsensitiveFirst: true });

  const fullText = normalize(site.join(" "));
  const known = numberTokens(fullText);

  for (const b of a.body.filter((b) => b.type === "graphic")) {
    const { kind, ...data } = b;
    delete data.type;
    for (const s of strings(data)) {
      for (const n of numberTokens(s)) {
        if (!known.has(n))
          fail(where, `infographic «${b.title ?? kind}» shows ${n}, which is not in the article`);
      }
    }
  }
  if (!fullText.includes(normalize(a.excerpt)))
    fail(where, "excerpt is not an exact quote from the article");
  for (const s of strings(a.cover ?? {}).filter((s) => !s.startsWith("/"))) {
    if (a.cover?.kind !== "graphic") break;
    for (const n of numberTokens(s))
      if (!known.has(n)) fail(where, `cover shows ${n}, which is not in the article`);
  }
}

// ── video scripts ──
const scriptDir = "src/content/scripts";
for (const file of readdirSync(join(root, scriptDir)).filter((f) => f.endsWith(".json"))) {
  const s = JSON.parse(read(join(scriptDir, file)));
  const original = read(`content/originals/video-${s.slug}.txt`).split("\n");
  compare(
    `ssenariy ${s.slug}`,
    s.body.map((b) => b.text),
    original,
  );
}

// ── video descriptions must be quotes from their script ──
const videos = JSON.parse(read("src/content/videos.json"));
for (const v of videos) {
  const script = JSON.parse(read(join(scriptDir, `${v.script}.json`)));
  const text = normalize(script.body.map((b) => b.text).join(" "));
  if (!text.includes(normalize(v.dek)))
    fail(`video ${v.slug}`, "description is not an exact quote from the script");
}

if (errors.length) {
  console.error(`\nContent check failed (${errors.length}):\n\n${errors.join("\n")}\n`);
  process.exit(1);
}
console.log(
  `✓ Content check passed: ${files.length} articles, scripts and infographics match the originals.`,
);
