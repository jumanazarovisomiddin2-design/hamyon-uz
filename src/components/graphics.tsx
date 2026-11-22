import type { ReactNode } from "react";
import type {
  BarsGraphic,
  ChangeGraphic,
  CompositionGraphic,
  FiguresGraphic,
  Graphic,
  GrowthGraphic,
  PriceGraphic,
  ReceiptGraphic,
  ScheduleGraphic,
  TimelineGraphic,
} from "@/content";
import { FigureValue } from "./figure-value";
import { CountUp, Reveal } from "./motion";

/**
 * Editorial infographics — the "bozor tili" elements. Every one uses only
 * numbers that appear in its article (checked by `npm run check:content`).
 * They sit beside the text; they never replace it.
 */

const kindLabel: Record<Graphic["kind"], string> = {
  price: "Narx yorligʻi",
  schedule: "Toʻlov jadvali",
  bars: "Taqqoslash",
  growth: "Oʻzgarish",
  composition: "Tarkib",
  timeline: "Sanalar",
  figures: "Raqamlar",
  change: "Oldin → keyin",
  receipt: "Hisob-kitob",
};

function Frame({
  graphic,
  children,
  tone = "light",
  caption = true,
  wide = false,
}: {
  graphic: Graphic;
  children: ReactNode;
  tone?: "light" | "dark";
  caption?: boolean;
  wide?: boolean;
}) {
  const muted = tone === "dark" ? "text-stone" : "text-ink-muted";
  return (
    <Reveal as="figure" className={`graphic ${wide ? "is-wide" : ""}`}>
      <div
        className={`mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t pt-3 ${
          tone === "dark" ? "border-stone" : "border-charcoal"
        }`}
      >
        <span className={`label ${tone === "dark" ? "text-sand" : "text-terracotta"}`}>
          {kindLabel[graphic.kind]}
        </span>
        {graphic.title && (
          <span className="text-ui font-sans leading-snug font-semibold">{graphic.title}</span>
        )}
      </div>
      {children}
      {caption && (
        <figcaption className={`text-small mt-4 font-sans ${muted}`}>
          Raqamlar maqola matnidan olingan.
        </figcaption>
      )}
    </Reveal>
  );
}

/* 1 · Price tag: old price crossed out → what you really pay */
export function PriceTagBody({ g, size = "md" }: { g: PriceGraphic; size?: "md" | "lg" }) {
  const big = size === "lg" ? "text-[2.5rem] md:text-[3.25rem]" : "text-[2rem] md:text-[2.5rem]";
  return (
    <div className="bg-tag relative flex flex-col gap-5 p-5 shadow-[0_1px_0_var(--color-rule)] md:p-7">
      <span
        aria-hidden="true"
        className="border-rule bg-paper absolute top-4 right-4 h-3.5 w-3.5 rounded-full border"
      />
      <div>
        <p className="label m-0">{g.before.label}</p>
        <p className="figure text-ink-muted relative m-0 mt-1.5 inline-block text-lg md:text-xl">
          <FigureValue value={g.before.value} />
          <span
            aria-hidden="true"
            className="strike-line bg-terracotta absolute top-[52%] right-[-3px] left-[-3px] h-[2px]"
          />
        </p>
      </div>
      <div className="after-price">
        <p className="label m-0">{g.after.label}</p>
        <p className={`figure m-0 mt-1 leading-none font-medium tracking-[-0.03em] ${big}`}>
          <FigureValue value={g.after.value} unitClass="text-[0.5em]" />
        </p>
      </div>
      {(g.meta?.length || g.diff) && (
        <div className="border-dots flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-dashed pt-4">
          {g.meta && (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {g.meta.map((m) => (
                <li
                  key={m}
                  className="border-charcoal text-small figure border px-2 py-0.5 text-[0.8rem]"
                >
                  <FigureValue value={m} />
                </li>
              ))}
            </ul>
          )}
          {g.diff && (
            <p className="m-0 text-right font-sans">
              <span className="text-small text-ink-muted block">{g.diff.label}</span>
              <span className="figure text-terracotta text-xl font-medium">
                +<FigureValue value={g.diff.value} />
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Price({ g }: { g: PriceGraphic }) {
  return (
    <Frame graphic={g}>
      <div className="max-w-[30rem]">
        <PriceTagBody g={g} />
      </div>
    </Frame>
  );
}

/* 4 · Payment schedule: months × payment = total */
function Schedule({ g }: { g: ScheduleGraphic }) {
  const cells = Array.from({ length: g.count }, (_, i) => i);
  return (
    <Frame graphic={g}>
      <div className="flex flex-wrap items-stretch gap-0">
        <span className="figure border-charcoal border px-3 py-2 text-xl md:text-2xl">
          {g.count} ×
        </span>
        <span className="figure border-charcoal border border-l-0 px-3 py-2 text-xl md:text-2xl">
          {g.amount} <span className="font-serif text-[0.6em]">{g.unit}</span>
        </span>
        {g.cadence && (
          <span className="text-small text-ink-muted self-center pl-4 font-sans">{g.cadence}</span>
        )}
      </div>
      <ol
        className="m-0 mt-6 grid list-none gap-1 p-0"
        style={{ gridTemplateColumns: `repeat(${g.count}, minmax(0, 1fr))` }}
        aria-label={`${g.count} ta toʻlov, har biri ${g.amount} ${g.unit}`}
      >
        {cells.map((i) => (
          <li key={i} className="flex flex-col items-center gap-1.5">
            <span
              className="rise bg-forest block h-14 w-full md:h-20"
              style={{ ["--i" as string]: i }}
            />
            <span className="figure text-ink-muted text-[0.7rem]">
              {i === 0 && g.first ? g.first : i + 1}
            </span>
          </li>
        ))}
      </ol>
      <div className="border-dots mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-dashed pt-4 font-sans">
        <p className="m-0">
          <span className="text-small text-ink-muted mr-3">{g.total.label}</span>
          <span className="figure text-xl font-medium">
            <FigureValue value={g.total.value} />
          </span>
        </p>
        {g.extra && (
          <p className="m-0">
            <span className="text-small text-ink-muted mr-3">{g.extra.label}</span>
            <span className="figure text-terracotta text-xl font-medium">
              <FigureValue value={g.extra.value} />
            </span>
          </p>
        )}
      </div>
    </Frame>
  );
}

/* 3 · Price-tag bars */
export function BarsBody({
  g,
  tone = "light",
}: {
  g: BarsGraphic | Pick<BarsGraphic, "items">;
  tone?: "light" | "dark";
}) {
  const max = Math.max(...g.items.map((i) => Math.abs(i.v)));
  const base = tone === "dark" ? "bg-stone" : "bg-charcoal";
  return (
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {g.items.map((item, i) => (
        <li key={item.label}>
          <div className="text-small mb-1.5 flex items-baseline justify-between gap-4 font-sans">
            <span>{item.label}</span>
            <span className={`figure shrink-0 ${item.accent ? "text-terracotta font-medium" : ""}`}>
              <FigureValue value={item.value} />
            </span>
          </div>
          <span
            className={`block h-4 grow ${item.accent ? "bg-terracotta" : base}`}
            style={{
              width: `${Math.max(2, (Math.abs(item.v) / max) * 100)}%`,
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
              ["--i" as string]: i,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

function Bars({ g }: { g: BarsGraphic }) {
  return (
    <Frame graphic={g}>
      <BarsBody g={g} />
    </Frame>
  );
}

/* Growth: bars to the right for increases, to the left for decreases */
export function GrowthBody({
  g,
  tone = "light",
}: {
  g: Pick<GrowthGraphic, "items">;
  tone?: "light" | "dark";
}) {
  const max = Math.max(...g.items.map((i) => Math.abs(i.v)));
  const neg = Math.max(0, ...g.items.map((i) => -i.v));
  const zero = (neg / (max + neg)) * 100; // where the zero line sits
  const base = tone === "dark" ? "bg-stone" : "bg-charcoal";
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {g.items.map((item, i) => {
        const w = (Math.abs(item.v) / (max + neg)) * 100;
        return (
          <li
            key={item.label}
            className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_4.5rem] items-center gap-3 font-sans md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_5rem]"
          >
            <span className="text-small leading-tight">{item.label}</span>
            <span className="relative block h-4">
              <span
                aria-hidden="true"
                className={`absolute top-[-4px] bottom-[-4px] w-px ${tone === "dark" ? "bg-smoke" : "bg-rule"}`}
                style={{ left: `${zero}%` }}
              />
              <span
                className={`absolute top-0 h-4 grow ${item.v < 0 ? "grow-neg bg-brass" : item.accent ? "bg-terracotta" : base}`}
                style={{
                  left: item.v < 0 ? `${zero - w}%` : `${zero}%`,
                  width: `${Math.max(1, w)}%`,
                  ["--i" as string]: i,
                }}
              />
            </span>
            <span
              className={`figure text-right text-[0.85rem] ${item.accent ? "text-terracotta font-medium" : ""}`}
            >
              {item.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Growth({ g }: { g: GrowthGraphic }) {
  return (
    <Frame graphic={g}>
      <GrowthBody g={g} />
    </Frame>
  );
}

/* Composition: one stacked bar + a legend with dotted leaders */
const segmentTones = ["bg-forest", "bg-brass", "bg-ink-soft", "bg-dots", "bg-photo-3", "bg-stone"];

/** Segment colours: the accent item is terracotta, the rest take the neutral tones in order. */
export function compositionTones(items: { accent?: boolean }[]) {
  let n = 0;
  return items.map((item) =>
    item.accent ? "bg-terracotta" : segmentTones[n++ % segmentTones.length],
  );
}

export function CompositionBody({
  g,
  tone = "light",
}: {
  g: Pick<CompositionGraphic, "items" | "total">;
  tone?: "light" | "dark";
}) {
  const sum = g.items.reduce((s, i) => s + i.v, 0);
  const colours = compositionTones(g.items);
  return (
    <div>
      <p className="m-0 mb-3 flex items-baseline justify-between gap-4 font-sans">
        <span className="text-small">{g.total.label}</span>
        <span className="figure text-lg font-medium">
          <FigureValue value={g.total.value} />
        </span>
      </p>
      <div className="flex h-11 w-full gap-[2px] md:h-14" aria-hidden="true">
        {g.items.map((item, i) => (
          <span
            key={item.label}
            className={`block h-full grow ${colours[i]}`}
            style={{ width: `${(item.v / sum) * 100}%`, minWidth: 3, ["--i" as string]: i }}
          />
        ))}
      </div>
      <ul className="m-0 mt-5 grid list-none gap-x-10 gap-y-2.5 p-0 font-sans md:grid-cols-2">
        {g.items.map((item, i) => (
          <li key={item.label} className="leader text-small">
            <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 self-center ${colours[i]}`} />
            <span className={item.accent ? "font-semibold" : ""}>{item.label}</span>
            <span className={`leader-dots ${tone === "dark" ? "border-smoke" : ""}`} />
            <span
              className={`figure shrink-0 text-[0.8rem] ${item.accent ? "text-terracotta font-medium" : ""}`}
            >
              <FigureValue value={item.value} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Composition({ g }: { g: CompositionGraphic }) {
  return (
    <Frame graphic={g} wide>
      <CompositionBody g={g} />
    </Frame>
  );
}

/* Timeline: a tracking line through the dates in the article */
function Timeline({ g }: { g: TimelineGraphic }) {
  return (
    <Frame graphic={g}>
      <ol className="relative m-0 list-none p-0">
        <span
          aria-hidden="true"
          className="bg-rule absolute top-2 bottom-2 left-[0.3125rem] w-[2px]"
        />
        <span
          aria-hidden="true"
          className="track-fill-y bg-forest absolute top-2 bottom-2 left-[0.3125rem] w-[2px]"
        />
        {g.items.map((item) => (
          <li
            key={item.when + item.what}
            className="relative grid gap-x-6 pb-5 pl-8 last:pb-0 md:grid-cols-[11rem_1fr]"
          >
            <span
              aria-hidden="true"
              className="bg-forest border-paper absolute top-[0.35rem] left-0 h-3 w-3 rounded-full border-2"
            />
            <span className="figure text-forest text-[0.85rem] font-medium">{item.when}</span>
            <span className="text-small font-sans md:text-[0.95rem]">{item.what}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* Big figures */
export function FiguresBody({
  g,
  tone = "light",
}: {
  g: Pick<FiguresGraphic, "items">;
  tone?: "light" | "dark";
}) {
  return (
    <dl className="m-0 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
      {g.items.map((item) => (
        <div key={item.value + item.label} className="flex flex-col-reverse gap-2">
          <dt
            className={`text-small font-sans ${tone === "dark" ? "text-stone" : "text-ink-soft"}`}
          >
            {item.label}
          </dt>
          <dd
            className={`figure m-0 leading-none tracking-[-0.04em] ${
              item.value.length > 12
                ? "text-[1.625rem] leading-tight md:text-[2rem]"
                : "text-[2.25rem] md:text-[2.75rem]"
            } ${tone === "dark" ? "text-paper" : "text-forest"}`}
          >
            {item.value.length <= 8 ? (
              <CountUp value={item.value} />
            ) : (
              <FigureValue value={item.value} unitClass="text-[0.5em]" />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Figures({ g }: { g: FiguresGraphic }) {
  return (
    <Frame graphic={g}>
      <FiguresBody g={g} />
    </Frame>
  );
}

/* Before → after */
export function ChangeBody({
  g,
  tone = "light",
}: {
  g: Pick<ChangeGraphic, "from" | "to" | "note">;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-stone" : "text-ink-muted";
  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 md:gap-x-10">
        <div>
          <p className={`figure m-0 text-[0.8rem] ${muted}`}>{g.from.when}</p>
          <p
            className={`figure m-0 mt-1 text-[2rem] leading-none tracking-[-0.03em] md:text-[2.5rem] ${muted}`}
          >
            <FigureValue value={g.from.value} unitClass="text-[0.5em]" />
          </p>
        </div>
        <span
          aria-hidden="true"
          className="track-fill mb-4 block h-[2px] w-14 bg-current md:w-24"
        />
        <div className="after-price">
          <p className={`figure m-0 text-[0.8rem] ${muted}`}>{g.to.when}</p>
          <p
            className={`figure m-0 mt-1 text-[2.5rem] leading-none font-medium tracking-[-0.03em] md:text-[3.25rem] ${
              tone === "dark" ? "text-paper" : "text-forest"
            }`}
          >
            <FigureValue value={g.to.value} unitClass="text-[0.5em]" />
          </p>
        </div>
      </div>
      {g.note && <p className={`text-small m-0 mt-4 font-sans ${muted}`}>{g.note}</p>}
    </div>
  );
}

function Change({ g }: { g: ChangeGraphic }) {
  return (
    <Frame graphic={g}>
      <ChangeBody g={g} />
    </Frame>
  );
}

/* 5 · Receipt */
function Receipt({ g }: { g: ReceiptGraphic }) {
  return (
    <Frame graphic={g}>
      <div className="overflow-hidden">
        <div className="receipt bg-tag receipt-edge max-w-[26rem] px-5 pt-5 font-sans md:px-6">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {g.lines.map((l) => (
              <li key={l.label} className="leader text-small">
                <span>{l.label}</span>
                <span className="leader-dots" />
                <span className="figure shrink-0 text-[0.85rem]">
                  <FigureValue value={l.value} />
                </span>
              </li>
            ))}
          </ul>
          <hr className="perforation my-4" />
          <p className="leader m-0">
            <span className="font-semibold">{g.total.label}</span>
            <span className="leader-dots" />
            <span className="figure text-terracotta shrink-0 text-lg font-medium">
              <FigureValue value={g.total.value} />
            </span>
          </p>
          {g.foot && <p className="text-small text-ink-muted m-0 mt-3">{g.foot}</p>}
        </div>
      </div>
    </Frame>
  );
}

export function GraphicBlock({ g }: { g: Graphic }) {
  switch (g.kind) {
    case "price":
      return <Price g={g} />;
    case "schedule":
      return <Schedule g={g} />;
    case "bars":
      return <Bars g={g} />;
    case "growth":
      return <Growth g={g} />;
    case "composition":
      return <Composition g={g} />;
    case "timeline":
      return <Timeline g={g} />;
    case "figures":
      return <Figures g={g} />;
    case "change":
      return <Change g={g} />;
    case "receipt":
      return <Receipt g={g} />;
  }
}
