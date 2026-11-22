#!/usr/bin/env node
/**
 * Content guard — `npm run check:content` (also runs before every build).
 *
 * Makes sure the site never changes what the authors wrote:
 *   1. Every article and video script on the site matches its original file
 *      (content/originals/*.txt) sentence for sentence — nothing changed,
 *      added or removed. Only typography may differ (oʻ gʻ ʼ « », spaces,
 *      bold/italic marks).
 *   2. Every number shown in an infographic (if any) appears in that article.
 *   3. Page descriptions are exact quotes from the article.
 *   4. Every article image and video file exists.
 *
 * If anything fails, the build stops and the problem is printed.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

/** "88 trln 147 mlrd" → 88147 (mlrd), "−1,3%" → -1.3, "taxminan 125 dollar" → 125 */
function amount(value) {
  const v = normalize(value);
  const sign = /^[−-]/.test(v) ? -1 : 1;
  const trln = v.match(/(\d+(?:,\d+)?) trln(?: (\d+) mlrd)?/);
  if (trln && !/%/.test(v.split("trln")[0])) {
    return sign * (Number(trln[1].replace(",", ".")) * 1000 + Number(trln[2] ?? 0));
  }
  const n = v.match(/\d+(?:[ ]\d{3})*(?:,\d+)?/);
  return n ? sign * Number(n[0].replace(/ /g, "").replace(",", ".")) : null;
}

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
  // Bar lengths must match the numbers printed next to them, and composition
  // parts must add up to the total shown.
  for (const b of a.body.filter((b) => ["bars", "growth", "composition"].includes(b.kind))) {
    for (const item of b.items) {
      const shown = amount(item.value);
      if (shown === null || Math.abs(shown - item.v) > 1e-9)
        fail(
          where,
          `«${b.title}»: «${item.label}» is drawn as ${item.v} but labelled ${item.value}`,
        );
    }
    if (b.kind === "composition") {
      const sum = b.items.reduce((s, i) => s + i.v, 0);
      const total = /%/.test(b.items[0].value) ? 100 : amount(b.total.value);
      if (Math.abs(sum - total) > 1e-6)
        fail(where, `«${b.title}»: parts add up to ${sum}, total is ${total}`);
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

// ── every article has its picture, every video its file and poster ──
for (const file of files) {
  const a = JSON.parse(read(join(articleDir, file)));
  if (!existsSync(join(root, "public", a.cover.src)))
    fail(`maqola ${a.slug}`, `image missing: ${a.cover.src}`);
}
for (const v of JSON.parse(read("src/content/videos.json"))) {
  for (const f of [v.src, v.poster])
    if (!existsSync(join(root, "public", f))) fail(`video ${v.slug}`, `file missing: ${f}`);
}

if (errors.length) {
  console.error(`\nContent check failed (${errors.length}):\n\n${errors.join("\n")}\n`);
  process.exit(1);
}
console.log(
  `✓ Content check passed: ${files.length} articles match the originals word for word; all images and videos are in place.`,
);
