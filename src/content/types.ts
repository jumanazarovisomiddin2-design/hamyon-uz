/**
 * The shape of HAMYON.UZ content.
 * Articles live in src/content/articles/*.json, videos in videos.json,
 * video scripts in src/content/scripts/*.json. A future CMS will write the
 * same fields.
 */

/** The two sections of the site. */
export type Section = "maqolalar" | "multimedia";

/** Article formats — shown as filters inside MAQOLALAR. */
export type FormatKey = "tahlil" | "tushuntirish" | "uzun-oqish" | "yangilik";

/* ── Infographics ─────────────────────────────────────────────────────────
 * Strings are shown as written; every number in them must appear in the
 * article (checked by `npm run check:content`). `v` numbers only size bars.
 */
export type Labelled = { label: string; value: string };

export type PriceGraphic = {
  kind: "price";
  title?: string;
  before: Labelled;
  after: Labelled;
  meta?: string[];
  diff?: Labelled;
};
export type ScheduleGraphic = {
  kind: "schedule";
  title?: string;
  count: number;
  amount: string;
  unit: string;
  first?: string;
  cadence?: string;
  total: Labelled;
  extra?: Labelled;
};
export type BarsGraphic = {
  kind: "bars";
  title?: string;
  items: (Labelled & { v: number; accent?: boolean })[];
};
export type GrowthGraphic = {
  kind: "growth";
  title?: string;
  items: (Labelled & { v: number; accent?: boolean })[];
};
export type CompositionGraphic = {
  kind: "composition";
  title?: string;
  total: Labelled;
  items: (Labelled & { v: number; accent?: boolean })[];
};
export type TimelineGraphic = {
  kind: "timeline";
  title?: string;
  items: { when: string; what: string }[];
};
export type FiguresGraphic = {
  kind: "figures";
  title?: string;
  items: { value: string; label: string }[];
};
export type ChangeGraphic = {
  kind: "change";
  title?: string;
  from: { when: string; value: string };
  to: { when: string; value: string };
  note?: string;
};
export type ReceiptGraphic = {
  kind: "receipt";
  title?: string;
  lines: Labelled[];
  total: Labelled;
  foot?: string;
};

export type Graphic =
  | PriceGraphic
  | ScheduleGraphic
  | BarsGraphic
  | GrowthGraphic
  | CompositionGraphic
  | TimelineGraphic
  | FiguresGraphic
  | ChangeGraphic
  | ReceiptGraphic;

/* ── Article body ───────────────────────────────────────────────────────── */
export type Block =
  | { type: "p" | "h2" | "h3" | "quote" | "speech" | "note"; text: string }
  | { type: "list"; items: string[] }
  | ({ type: "graphic" } & Graphic);

export type Cover =
  | { kind: "image"; src: string; alt: string; credit?: string; width: number; height: number }
  | {
      kind: "graphic";
      variant: "price" | "limits" | "composition" | "change";
      before?: string;
      after?: string;
      a?: string;
      b?: string;
      meta?: string;
    };

export type Article = {
  slug: string;
  title: string;
  /** One phrase of the title set in terracotta italic. Typography only. */
  titleAccent?: string | null;
  format: FormatKey;
  order: number;
  author: string;
  /** Not known yet — the editors will add real publication dates. */
  publishedAt: string | null;
  series?: string | null;
  /** An exact quote from the article, used on cards. */
  excerpt: string;
  cover?: Cover | null;
  /** A documentary photo the editors still need to commission. */
  photo?: { shot: string; brief: string } | null;
  body: Block[];
  sources?: { heading: string; items: string[] };
};

export type Video = {
  slug: string;
  title: string;
  titleAccent?: string;
  format: string;
  order: number;
  duration: string;
  durationIso: string;
  /** An exact quote from the video's script. */
  dek: string;
  poster: string;
  posterAlt: string;
  preview?: string;
  /** Empty until the video is on YouTube. */
  youtubeId: string | null;
  series?: string;
  related?: string;
  script?: string;
  author: string;
};

export type Script = { slug: string; body: { type: "p" | "h3"; text: string }[] };
