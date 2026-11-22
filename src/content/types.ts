/**
 * Content types.
 *
 * Until the content editor (Sanity, stage 4) is connected, stories and videos
 * live as files in `src/content/`. These types describe their shape; the CMS
 * will use the same fields, so pages will not need to change.
 */

/** The three reading sections. Each has its own address: /maqolalar, /tahlil, /qollanmalar. */
export type StorySection = "maqolalar" | "tahlil" | "qollanmalar";

export type StoryFormat = "Maqola" | "Tushuntirish" | "Tahlil" | "Qoʻllanma" | "Checklist";

export type Topic = "Nasiya" | "Kredit va qarz" | "BNPL" | "Isteʼmolchi huquqlari" | "Narxlar";

/**
 * A photograph that has not been taken yet. `brief` describes the documentary
 * shot to commission; the site shows it as a clearly marked placeholder.
 */
export type PhotoBrief = {
  shot: "Keng plan" | "Detal" | "Portret" | "Uy";
  brief: string;
  caption?: string;
  /** Placeholder tone, from the approved warm greys. */
  tone?: 1 | 2 | 3 | 4 | 5;
};

export type Source = { title: string; url?: string };

export type Story = {
  slug: string;
  section: StorySection;
  format: StoryFormat;
  topic: Topic;
  title: string;
  /** Part of the title set in terracotta italic — one accent per headline. */
  accent?: string;
  /** Standfirst: one or two sentences under the headline. */
  dek: string;
  author: string;
  /** ISO date, e.g. "2026-11-17". */
  publishedAt: string;
  photo?: PhotoBrief;
  keyTakeaway?: string;
  /** Article text in the site's simple text format (see src/lib/body.tsx). */
  body: string;
  sources?: Source[];
  /** Set when the story belongs to a numbered series. */
  series?: { name: string; part: number };
  /** Short note shown to readers when the piece is based on another publisher's data. */
  basedOn?: string;
};

export type Video = {
  slug: string;
  format: "Video-esse" | "Tushuntirish" | "Qisqa";
  topic: Topic;
  title: string;
  accent?: string;
  dek: string;
  description: string;
  /** "tez-orada" = announced but not published yet. */
  status: "tez-orada" | "chiqdi";
  youtubeId?: string;
  /** "18:24" — only when the video exists. */
  duration?: string;
  publishedAt: string;
  /** What the video covers (shown instead of timed chapters until the video exists). */
  covers: string[];
  /** Timed chapters, once the video is published. */
  chapters?: { time: string; title: string }[];
  frame: PhotoBrief;
  related?: { section: StorySection; slug: string };
  credits?: { role: string; name: string }[];
};
