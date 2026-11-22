import Link from "next/link";
import type { Story } from "@/content";
import { seriesParts, stories, storyHref } from "@/content";
import { Body, headings } from "@/lib/body";
import { formatDateShort, readingMinutes } from "@/lib/format";
import { site } from "@/lib/site";
import { ShareLinks } from "./share-links";
import { Headline, Kicker, PhotoPlaceholder } from "./story-parts";

/** The reading page shared by articles, analysis and guides. */
export function StoryPage({ story }: { story: Story }) {
  const toc = headings(story.body);
  const parts = story.series ? seriesParts(story.series.name) : [];
  const minutes = readingMinutes(story.body);
  const next =
    parts.find((p) => (p.series?.part ?? 0) === (story.series?.part ?? 0) + 1) ??
    stories.find(
      (s) => s.slug !== story.slug && s.section !== "qollanmalar" && !parts.includes(s),
    ) ??
    stories.find((s) => s.slug !== story.slug);

  return (
    <article>
      {/* Opening */}
      <header className="page pt-14 pb-12 lg:pt-28 lg:pb-16">
        <div className="flex max-w-[70rem] flex-col gap-6 lg:ml-[8%] lg:gap-8">
          <Kicker story={story} />
          <h1 className="text-display-xl m-0">
            <Headline title={story.title} accent={story.accent} />
          </h1>
          <p className="text-dek text-ink-soft m-0 max-w-[51rem] italic">{story.dek}</p>
          <div className="text-small text-ink-soft flex flex-col gap-1 pt-1 font-sans md:flex-row md:flex-wrap md:items-center md:gap-x-9">
            <span>
              <span className="text-ink-muted">Matn:</span> {story.author}
            </span>
            {story.photo && (
              <span>
                <span className="text-ink-muted">Foto:</span> [fotograf]
              </span>
            )}
            <span className="figure text-ink-muted text-[0.8125rem]">
              {formatDateShort(story.publishedAt)} · {minutes} daq
            </span>
            <ShareLinks url={`${site.url}${storyHref(story)}`} title={story.title} />
          </div>
          {story.basedOn && <p className="label m-0 text-[0.6875rem]">{story.basedOn}</p>}
        </div>
      </header>

      {story.photo ? (
        <figure className="m-0">
          <PhotoPlaceholder
            photo={story.photo}
            className="aspect-[4/3] w-full md:aspect-[2.1/1] md:max-h-[45rem] md:px-[var(--spacing-gutter)]"
          />
          <figcaption className="page text-small text-ink-muted pt-3 font-sans md:text-right">
            {story.photo.caption}. Foto: [fotograf] / HAMYON.UZ
          </figcaption>
        </figure>
      ) : (
        <div className="page">
          <hr className="perforation" />
        </div>
      )}

      {/* Body */}
      <div className="page flex flex-col gap-10 pt-12 lg:items-center lg:pt-22 xl:flex-row xl:items-start xl:gap-12 2xl:gap-[4.5rem]">
        <aside className="hidden xl:sticky xl:top-8 xl:block xl:w-[13rem] xl:flex-none 2xl:w-[15rem]">
          {toc.length > 2 && (
            <nav aria-label="Ushbu maqolada" className="flex flex-col gap-3.5">
              <p className="label m-0">Ushbu maqolada</p>
              {toc.map((h, i) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="leader text-[0.95rem] leading-snug no-underline hover:underline"
                >
                  <span>{h.text}</span>
                  <span className="leader-dots" aria-hidden="true" />
                  <span className="figure text-terracotta text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
            </nav>
          )}
        </aside>

        <div className="w-full min-w-0 flex-1 lg:max-w-(--container-reading)">
          {story.keyTakeaway && (
            <div className="border-forest mb-10 flex flex-col gap-2 border-t-2 pt-4 xl:hidden">
              <p className="label text-forest m-0">Asosiy xulosa</p>
              <p className="text-lead m-0 italic">{story.keyTakeaway}</p>
            </div>
          )}
          <Body src={story.body} dropCap={story.section !== "qollanmalar"} />
        </div>

        <aside className="flex w-full flex-col gap-10 lg:max-w-(--container-reading) xl:w-[15rem] xl:flex-none 2xl:w-[17rem]">
          {story.keyTakeaway && (
            <div className="border-forest hidden flex-col gap-3 border-t-2 pt-4 xl:flex">
              <p className="label text-forest m-0">Asosiy xulosa</p>
              <p className="m-0 text-[1.1875rem] leading-snug italic">{story.keyTakeaway}</p>
            </div>
          )}
          {parts.length > 1 && (
            <nav
              aria-label={`Turkum: ${story.series?.name}`}
              className="border-rule flex flex-col gap-3 border-t pt-4"
            >
              <p className="label m-0">Turkum · {story.series?.name}</p>
              {parts.map((p) => {
                const current = p.slug === story.slug;
                return current ? (
                  <p
                    key={p.slug}
                    className="m-0 flex gap-3 text-[1rem] leading-snug"
                    aria-current="page"
                  >
                    <span className="figure text-terracotta pt-0.5 text-xs">
                      {String(p.series?.part).padStart(2, "0")}
                    </span>
                    <span className="italic">{p.title}</span>
                  </p>
                ) : (
                  <Link
                    key={p.slug}
                    href={storyHref(p)}
                    className="flex gap-3 text-[1rem] leading-snug no-underline hover:underline"
                  >
                    <span className="figure text-terracotta pt-0.5 text-xs">
                      {String(p.series?.part).padStart(2, "0")}
                    </span>
                    <span>{p.title}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </aside>
      </div>

      {/* Sources + next */}
      <footer className="page pt-section">
        <hr className="perforation" />
        <div className="flex flex-col gap-12 pt-10 lg:flex-row lg:gap-[4.5rem]">
          {story.sources && story.sources.length > 0 && (
            <section className="flex flex-col gap-3 lg:flex-1" aria-labelledby="manbalar">
              <h2 id="manbalar" className="label m-0">
                Manbalar
              </h2>
              <ol className="flex flex-col gap-2.5">
                {story.sources.map((s, i) => (
                  <li key={i} className="text-small flex gap-3.5 font-sans">
                    <span className="figure text-terracotta">{i + 1}</span>
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-forest no-underline hover:underline"
                        >
                          {s.title}
                        </a>
                      ) : (
                        s.title
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {next && (
            <Link
              href={storyHref(next)}
              className="group flex flex-col gap-3 no-underline lg:flex-1"
            >
              <span className="label">
                {next.series && story.series ? "Turkumdagi keyingi maqola" : "Keyingi maqola"}
              </span>
              <span className="text-h3 group-hover:underline">
                <Headline title={next.title} accent={next.accent} /> →
              </span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
