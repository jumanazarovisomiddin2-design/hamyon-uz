import Link from "next/link";
import { articles, articlesIn, formats, type FormatKey } from "@/content";
import { ArticleRow } from "./editorial";

/**
 * MAQOLALAR: every written piece in one place.
 * Formats are filter chips — square, never rounded.
 */
export function ArticleIndex({ active }: { active?: FormatKey }) {
  const list = active ? articlesIn(active) : articles;
  const current = formats.find((f) => f.key === active);
  const chip = "inline-flex items-baseline gap-1.5 px-3 py-2 no-underline";

  return (
    <div className="page pt-10 md:pt-14 lg:pt-20">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="label m-0">Boʻlim</p>
          <h1 className="text-display m-0 font-serif">
            {current ? (
              <>
                Maqolalar: <em className="text-terracotta">{current.plural.toLowerCase()}</em>
              </>
            ) : (
              "Maqolalar"
            )}
          </h1>
        </div>
        <p className="text-lead text-ink-soft m-0 max-w-[30rem] font-serif">
          Tahlillar, tushuntirishlar, uzun oʻqishlar va yangiliklar — barchasi bir joyda.
        </p>
      </header>

      <nav aria-label="Format boʻyicha saralash" className="mt-10 md:mt-14">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-sans text-[0.875rem] font-medium">
          <li>
            <Link
              href="/maqolalar"
              aria-current={!active ? "page" : undefined}
              className={`${chip} ${!active ? "bg-charcoal text-paper" : "border-charcoal hover:bg-charcoal hover:text-paper border"}`}
            >
              Hammasi <span className="figure text-[0.75rem] opacity-70">{articles.length}</span>
            </Link>
          </li>
          {formats.map((f) => {
            const on = f.key === active;
            return (
              <li key={f.key}>
                <Link
                  href={`/maqolalar/turi/${f.key}`}
                  aria-current={on ? "page" : undefined}
                  className={`${chip} ${on ? "bg-charcoal text-paper" : "border-charcoal hover:bg-charcoal hover:text-paper border"}`}
                >
                  {f.label}{" "}
                  <span className="figure text-[0.75rem] opacity-70">
                    {articlesIn(f.key).length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 md:mt-12">
        {list.map((a, i) => (
          <ArticleRow key={a.slug} article={a} index={i} />
        ))}
        <hr className="perforation" />
      </div>
    </div>
  );
}
