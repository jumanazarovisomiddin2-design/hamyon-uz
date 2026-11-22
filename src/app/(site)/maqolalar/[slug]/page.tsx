import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody, headings, Inline } from "@/components/article-body";
import {
  ArticleCover,
  Headline,
  minutesFor,
  SeriesTracker,
  ShipLabel,
} from "@/components/editorial";
import { ShareLinks } from "@/components/share-links";
import {
  articleHref,
  articles,
  formatLabel,
  getArticle,
  series,
  videoFor,
  videoHref,
  type SeriesKey,
} from "@/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/maqolalar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  // Share image: the article's own frame, else its video's poster, else the site image.
  const image =
    a.cover?.kind === "image" ? a.cover.src : (videoFor(a)?.poster ?? "/opengraph-image.png");
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: articleHref(a) },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      url: articleHref(a),
      images: [{ url: image }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/maqolalar/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = headings(article);
  const video = videoFor(article);
  const seriesKey = article.series as SeriesKey | undefined;
  const index = articles.indexOf(article);
  const next = articles[(index + 1) % articles.length];
  const url = `${site.url}${articleHref(article)}`;
  const long = article.title.length > 60;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    inLanguage: "uz",
    author: { "@type": "Organization", name: `${site.name} tahririyati` },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
    ...(article.cover?.kind === "image" ? { image: `${site.url}${article.cover.src}` } : {}),
  };

  return (
    <article>
      <div
        aria-hidden="true"
        className="read-progress bg-forest fixed top-0 right-0 left-0 z-50 h-[3px]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Opening */}
      <header className="page pt-8 md:pt-12 lg:pt-16">
        <div className="flex max-w-[64rem] flex-col gap-6 md:gap-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ShipLabel
              cells={[
                { k: "Format", v: formatLabel(article.format) },
                { k: "Oʻqish", v: `${minutesFor(article)} daq`, mono: true },
              ]}
            />
            {seriesKey && (
              <span className="text-small text-ink-muted font-sans">
                Turkum: <span className="text-charcoal font-medium">{series[seriesKey].title}</span>
              </span>
            )}
          </div>
          <h1 className={`m-0 font-serif ${long ? "text-h1" : "text-display-long"}`}>
            <Headline title={article.title} accent={article.titleAccent} />
          </h1>
          <p className="text-small m-0 font-sans">
            <span className="text-ink-muted">Muallif: </span>
            <span className="font-medium">{article.author}</span>
          </p>
        </div>
      </header>

      {article.cover && (
        <figure className="page mt-8 md:mt-12">
          <div
            className={`overflow-hidden ${article.cover.kind === "image" ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[5/2] xl:aspect-[3/1]"}`}
          >
            <ArticleCover article={article} preload big sizes="(min-width: 1440px) 1280px, 100vw" />
          </div>
          {article.cover.kind === "image" && article.cover.credit && (
            <figcaption className="text-small text-ink-muted mt-3 font-sans">
              {article.cover.credit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Body with contents (left) and related material (right) on wide screens */}
      <div className="page mt-band grid gap-y-14 xl:grid-cols-[12rem_minmax(0,43.75rem)_15rem] xl:justify-between xl:gap-x-12 2xl:grid-cols-[14rem_minmax(0,43.75rem)_17rem]">
        <nav aria-label="Maqola mundarijasi" className="hidden xl:block">
          {toc.length > 0 && (
            <div className="sticky top-8">
              <p className="label m-0 mb-4">Mundarija</p>
              <ol className="m-0 flex list-none flex-col gap-3 p-0 font-sans text-[0.875rem] leading-snug">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="link-quiet text-ink-soft hover:text-charcoal">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </nav>

        <div className="max-w-reading mx-auto w-full xl:mx-0">
          <ArticleBody article={article} />

          {article.sources && (
            <section aria-labelledby="manbalar" className="border-charcoal mt-16 border-t pt-6">
              <h2 id="manbalar" className="label m-0 mb-5">
                {article.sources.heading}
              </h2>
              <ol className="text-small text-ink-soft m-0 flex flex-col gap-3 pl-5 font-sans [overflow-wrap:anywhere]">
                {article.sources.items.map((s) => (
                  <li key={s}>
                    <Inline text={s} />
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="border-rule mt-14 flex flex-col gap-4 border-t pt-6 font-sans sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small m-0">
              <span className="text-ink-muted">Muallif: </span>
              <span className="font-medium">{article.author}</span>
            </p>
            <div className="text-small flex items-center gap-4">
              <span className="text-ink-muted">Ulashish:</span>
              <ShareLinks url={url} title={article.title} />
            </div>
          </div>
        </div>

        <aside aria-label="Shu mavzuda" className="flex flex-col gap-12">
          {video && (
            <div className="flex flex-col gap-3">
              <p className="label m-0">Shu mavzuda video</p>
              <Link
                href={videoHref(video)}
                className="group relative block aspect-video overflow-hidden"
              >
                <Image
                  src={video.poster}
                  alt={video.posterAlt}
                  fill
                  sizes="(min-width: 1280px) 17rem, 100vw"
                  className="object-cover"
                />
                <span className="figure bg-charcoal/85 text-paper absolute right-2 bottom-2 px-1.5 py-0.5 text-[0.7rem]">
                  {video.duration}
                </span>
              </Link>
              <Link href={videoHref(video)} className="text-h4 link-quiet font-serif">
                {video.title}
              </Link>
              <p className="text-small text-ink-muted m-0 font-sans">YouTubeʼda tez orada</p>
            </div>
          )}
          {seriesKey && (
            <div className="xl:sticky xl:top-8">
              <SeriesTracker
                seriesKey={seriesKey}
                title={series[seriesKey].title}
                current={article.slug}
                compact
              />
            </div>
          )}
        </aside>
      </div>

      {/* Next article */}
      {next && next.slug !== article.slug && (
        <nav aria-label="Keyingi maqola" className="page mt-section">
          <hr className="perforation" />
          <Link
            href={articleHref(next)}
            className="group flex flex-col gap-3 pt-8 no-underline md:flex-row md:items-baseline md:justify-between md:gap-10"
          >
            <span className="label">Keyingi maqola</span>
            <span className="text-h3 max-w-[48rem] font-serif group-hover:underline">
              <Headline title={next.title} accent={next.titleAccent} />
            </span>
            <span aria-hidden="true" className="text-h3 text-terracotta hidden md:block">
              →
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
