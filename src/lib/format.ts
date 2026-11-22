const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

/** "2026-11-17" → "17-noyabr, 2026" */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}-${months[m - 1]}, ${y}`;
}

/** "2026-11-17" → "17.11.2026" — for mono meta lines. */
export function formatDateShort(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** Reading time in minutes at ~200 words per minute (Uzbek words are long). */
export function readingMinutes(text: string) {
  const words = text
    .replace(/[:#>|*\-=]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Heading text → address anchor, e.g. "Nega tartib kerak boʻldi?" → "nega-tartib-kerak-boldi". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[ʻʼ‘’'`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
