/**
 * All site content in one place, with small helpers for pages.
 * To add an article: drop a JSON file in ./articles and import it below.
 */
import type { Article, FormatKey, Script, Video } from "./types";

import a1 from "./articles/nasiyaning-tort-ming-yillik-yoli.json";
import a2 from "./articles/foizsiz-nasiya-yashirin-kredit.json";
import a3 from "./articles/2027-yildan-nasiya-bozori.json";
import a4 from "./articles/aholining-banklar-oldidagi-qarzi.json";
import a5 from "./articles/kredit-cheklovlari-va-mikroqarzlar.json";
import videoList from "./videos.json";
import s1 from "./scripts/nasiya-tarixi.json";
import s2 from "./scripts/nasiya-qulaylikmi-yoki-qimmat-qarz.json";

export * from "./types";

/** Newest first. Until real dates exist, `order` decides (higher = newer). */
export const articles: Article[] = ([a1, a2, a3, a4, a5] as unknown as Article[]).sort(
  (a, b) => b.order - a.order,
);

export const videos: Video[] = (videoList as Video[]).sort((a, b) => b.order - a.order);

const scripts: Record<string, Script> = Object.fromEntries(
  ([s1, s2] as Script[]).map((s) => [s.slug, s]),
);

export const formats: { key: FormatKey; label: string; plural: string }[] = [
  { key: "tahlil", label: "Tahlil", plural: "Tahlillar" },
  { key: "tushuntirish", label: "Tushuntirish", plural: "Tushuntirishlar" },
  { key: "uzun-oqish", label: "Uzun oʻqish", plural: "Uzun oʻqishlar" },
  { key: "yangilik", label: "Yangilik", plural: "Yangiliklar" },
];

export const formatLabel = (key: FormatKey) => formats.find((f) => f.key === key)?.label ?? key;

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getVideo = (slug: string) => videos.find((v) => v.slug === slug);
export const getScript = (slug?: string) => (slug ? scripts[slug] : undefined);
export const articlesIn = (format: FormatKey) => articles.filter((a) => a.format === format);

export const articleHref = (a: Pick<Article, "slug">) => `/maqolalar/${a.slug}`;
export const videoHref = (v: Pick<Video, "slug">) => `/multimedia/${v.slug}`;

/** The video made from the same material as this article, if any. */
export const videoFor = (a: Article) => videos.find((v) => v.related === a.slug);

/** Turkum — a series that runs across articles and videos. */
export const series = {
  "nasiya-sovga-emas": {
    title: "Nasiya — sovgʻa emas",
    parts: [
      { kind: "article", slug: "nasiyaning-tort-ming-yillik-yoli" },
      { kind: "video", slug: "nasiya-tarixi" },
      { kind: "article", slug: "foizsiz-nasiya-yashirin-kredit" },
      { kind: "video", slug: "nasiya-qulaylikmi-yoki-qimmat-qarz" },
      { kind: "article", slug: "2027-yildan-nasiya-bozori" },
    ] as const,
  },
} as const;

export type SeriesKey = keyof typeof series;

export function seriesParts(key: SeriesKey) {
  return series[key].parts.map((p) => {
    if (p.kind === "article") {
      const a = getArticle(p.slug)!;
      return { kind: "Maqola", title: a.title, href: articleHref(a), slug: a.slug };
    }
    const v = getVideo(p.slug)!;
    return { kind: "Video", title: v.title, href: videoHref(v), slug: v.slug };
  });
}

/** Plain text of an article (for reading time and meta descriptions). */
export function plainText(a: Article) {
  return a.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "graphic" ? "" : b.text))
    .join(" ")
    .replace(/\*+/g, "");
}
