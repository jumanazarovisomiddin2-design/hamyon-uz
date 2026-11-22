import Image from "next/image";
import Link from "next/link";
import {
  articleHref,
  formatLabel,
  plainText,
  seriesParts,
  type Article,
  type Block,
  type CompositionGraphic,
  type SeriesKey,
} from "@/content";
import { readingMinutes } from "@/lib/format";
import { FigureValue } from "./figure-value";
import { compositionTones } from "./graphics";
import { Reveal } from "./motion";

/** The headline with its one accent phrase in terracotta italic. */
export function Headline({
  title,
  accent,
  accentColor = "text-terracotta",
}: {
  title: string;
  accent?: string | null;
  accentColor?: string;
}) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const i = title.indexOf(accent);
  return (
    <>
      {title.slice(0, i)}
      <em className={accentColor}>{accent}</em>
      {title.slice(i + accent.length)}
    </>
  );
}

export const minutesFor = (a: Article) => readingMinutes(plainText(a));

/**
 * Yetkazish yorligʻi — the shipping label: format + reading time.
 * Replaces the old rubric line on every article.
 */
export function ShipLabel({
  cells,
  tone = "light",
  className = "",
}: {
  cells: { k: string; v: string; mono?: boolean }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "dark" ? "border-stone" : "border-charcoal";
  return (
    <span
      className={`inline-flex w-fit shrink-0 border-[1.5px] font-sans text-[0.625rem] leading-[1.15] tracking-[0.1em] uppercase ${line} ${className}`}
    >
      {cells.map((c, i) => (
        <span
          key={c.k}
          className={`flex flex-col gap-0.5 px-2 py-1.5 ${i ? `border-l-[1.5px] ${line}` : ""}`}
        >
          {c.k}
          <b
            className={`text-[0.78rem] tracking-[0.02em] normal-case ${c.mono ? "figure font-medium" : "font-bold"}`}
          >
            {c.v}
          </b>
        </span>
      ))}
    </span>
  );
}

export function ArticleLabel({ article, tone }: { article: Article; tone?: "light" | "dark" }) {
  return (
    <ShipLabel
      tone={tone}
      cells={[
        { k: "Format", v: formatLabel(article.format) },
        { k: "Oʻqish", v: `${minutesFor(article)} daq`, mono: true },
      ]}
    />
  );
}

/* ── Covers ─────────────────────────────────────────────────────────────── */

/**
 * The visual at the top of an article and on its cards: a real frame from the
 * editors' video, or a typographic cover built from numbers in the article.
 */
export function ArticleCover({
  article,
  sizes = "100vw",
  preload = false,
  className = "",
  big = false,
}: {
  article: Article;
  sizes?: string;
  preload?: boolean;
  className?: string;
  big?: boolean;
}) {
  const cover = article.cover;
  if (!cover) return null;
  if (cover.kind === "image") {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes={sizes}
        preload={preload}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  // Sized by the cover's own width (container queries), so a narrow tile never clips.
  const huge = big
    ? "text-[3rem] @[30rem]:text-[4.5rem] @[48rem]:text-[6.5rem]"
    : "text-[2.25rem] @[17rem]:text-[2.75rem] @[24rem]:text-[3.5rem]";
  return (
    <div
      className={`bg-sand on-sand text-charcoal @container relative flex h-full w-full flex-col overflow-hidden ${
        big ? "justify-center gap-6 p-6 md:p-12 lg:p-16" : "justify-between p-5 md:p-7"
      } ${className}`}
      aria-hidden="true"
    >
      <span
        className={`label text-ink-soft ${big ? "absolute top-6 left-6 md:top-8 md:left-12 lg:left-16" : ""}`}
      >
        {cover.meta}
      </span>
      {cover.variant === "price" && (
        <div className="swing bg-tag [transform:rotate(-2deg)] self-start p-4 shadow-[0_8px_20px_rgba(33,31,27,0.15)] [--tilt:-2deg] md:p-5">
          <p className="figure text-ink-muted relative m-0 inline-block text-base md:text-lg">
            <FigureValue value={cover.before ?? ""} />
            <span className="bg-terracotta absolute top-[52%] right-[-3px] left-[-3px] h-[2px]" />
          </p>
          <p
            className={`figure m-0 leading-none font-medium tracking-[-0.04em] ${big ? "mt-2 text-[3.5rem] md:text-[6rem]" : "text-[2.25rem]"}`}
          >
            <FigureValue value={cover.after ?? ""} unitClass="text-[0.45em]" />
          </p>
        </div>
      )}
      {cover.variant === "limits" && (
        <p
          className={`figure m-0 flex flex-wrap items-baseline gap-x-4 leading-none tracking-[-0.05em] ${huge}`}
        >
          <span>
            <FigureValue value={cover.a ?? ""} unitClass="text-[0.4em] tracking-normal" />
          </span>
          <span className="text-terracotta">{cover.b}</span>
        </p>
      )}
      {cover.variant === "change" && (
        <p
          className={`figure m-0 flex flex-wrap items-baseline gap-x-3 leading-none tracking-[-0.05em] ${huge}`}
        >
          <span className="text-ink-muted relative">
            {cover.a}
            <span className="bg-terracotta absolute top-[52%] right-[-3px] left-[-3px] h-[3px]" />
          </span>
          <span className="text-[0.5em]">→</span>
          <span className="text-forest">{cover.b}</span>
        </p>
      )}
      {cover.variant === "composition" && (
        <div className="flex flex-col gap-4">
          <p
            className={`figure m-0 leading-none tracking-[-0.05em] whitespace-nowrap ${big ? huge : "text-[1.75rem] @[17rem]:text-[2.25rem] @[24rem]:text-[2.75rem]"}`}
          >
            {cover.a}
          </p>
          <CompositionStrip article={article} />
        </div>
      )}
    </div>
  );
}

/**
 * Thin stacked bar for a cover — the same data (and colours) as the article's
 * own composition infographic, so the two can never disagree.
 */
function CompositionStrip({ article }: { article: Article }) {
  const g = article.body.find(
    (b): b is Extract<Block, { type: "graphic" }> & CompositionGraphic =>
      b.type === "graphic" && b.kind === "composition",
  );
  if (!g) return null;
  const tones = compositionTones(g.items);
  const sum = g.items.reduce((s, i) => s + i.v, 0);
  return (
    <div className="flex h-5 gap-[2px]">
      {g.items.map((item, i) => (
        <span
          key={item.label}
          className={tones[i]}
          style={{ width: `${(item.v / sum) * 100}%`, minWidth: 3 }}
        />
      ))}
    </div>
  );
}

/** A documentary photo that has not been taken yet — clearly marked. */
export function PhotoPlaceholder({
  shot,
  brief,
  className = "",
}: {
  shot: string;
  brief: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Foto oʻrni: ${brief}`}
      className={`bg-photo-1 text-paper flex flex-col ${className}`}
    >
      <span className="figure p-3 text-[0.65rem] tracking-[0.12em] md:p-4">
        FOTO KERAK · {shot.toUpperCase()}
      </span>
      <span className="text-small max-w-[26rem] p-3 pt-0 font-sans md:p-4 md:pt-0">{brief}</span>
    </div>
  );
}

/* ── Lists ──────────────────────────────────────────────────────────────── */

/** One article in a list: label, headline, excerpt, cover on the side. */
export function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <article className="group border-rule grid gap-6 border-t py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-10 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,22rem)] lg:py-10">
      <span className="figure text-ink-muted hidden pt-1 text-sm lg:block">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-4">
        <ArticleLabel article={article} />
        <h2 className="text-h3 m-0 font-serif">
          <Link href={articleHref(article)} className="link-quiet">
            <Headline title={article.title} accent={article.titleAccent} />
          </Link>
        </h2>
        <p className="text-ink-soft m-0 max-w-[38rem] font-serif text-[1.0625rem] leading-relaxed">
          {article.excerpt}
        </p>
        <p className="text-small text-ink-muted m-0 font-sans">{article.author}</p>
      </div>
      {article.cover && (
        <Link
          href={articleHref(article)}
          tabIndex={-1}
          aria-hidden="true"
          className="order-first block aspect-[16/10] overflow-hidden md:order-none"
        >
          <ArticleCover
            article={article}
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 18rem, 100vw"
          />
        </Link>
      )}
    </article>
  );
}

/* ── Series tracking (buyurtma kuzatuvi) ─────────────────────────────── */

export function SeriesTracker({
  seriesKey,
  title,
  current,
  compact = false,
  tone = "light",
}: {
  seriesKey: SeriesKey;
  title: string;
  current?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const parts = seriesParts(seriesKey);
  const dark = tone === "dark";
  const muted = dark ? "text-stone" : "text-ink-muted";
  return (
    <Reveal className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className={`label m-0 ${dark ? "text-stone" : ""}`}>Turkum holati</p>
        <p className={`figure m-0 text-[0.78rem] ${muted}`}>
          {parts.length}/{parts.length} yetkazildi
        </p>
      </div>
      <p className={`m-0 font-serif ${compact ? "text-h4" : "text-section"}`}>{title}</p>
      <ol
        className={`relative m-0 grid list-none gap-6 p-0 ${compact ? "" : "md:grid-cols-5 md:gap-4"}`}
      >
        {!compact && (
          <>
            <span
              aria-hidden="true"
              className={`absolute top-[9px] right-0 left-0 hidden h-[2px] md:block ${dark ? "bg-smoke" : "bg-rule"}`}
            />
            <span
              aria-hidden="true"
              className={`track-fill absolute ${dark ? "bg-sand" : "bg-forest"} top-[9px] right-0 left-0 hidden h-[2px] md:block`}
            />
          </>
        )}
        {parts.map((p, i) => {
          const here = p.slug === current;
          return (
            <li key={p.slug} className="relative flex gap-3 md:flex-col">
              <span
                aria-hidden="true"
                className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] ${dark ? "bg-sand text-charcoal" : "bg-forest text-paper"} ${here ? `ring-terracotta ring-2 ring-offset-2 ${dark ? "ring-offset-charcoal" : "ring-offset-paper"}` : ""}`}
              >
                ✓
              </span>
              <span className="flex flex-col gap-1">
                <span className={`figure text-[0.7rem] tracking-[0.08em] ${muted}`}>
                  {String(i + 1).padStart(2, "0")} · {p.kind.toUpperCase()}
                  {here ? " · SIZ SHU YERDASIZ" : ""}
                </span>
                {here ? (
                  <span
                    className="text-ui font-sans leading-snug font-semibold"
                    aria-current="page"
                  >
                    {p.title}
                  </span>
                ) : (
                  <Link
                    href={p.href}
                    className="text-ui link-quiet font-sans leading-snug font-medium"
                  >
                    {p.title}
                  </Link>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
