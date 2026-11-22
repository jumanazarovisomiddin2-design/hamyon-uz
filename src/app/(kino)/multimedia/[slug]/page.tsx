import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover, Headline, SeriesTracker } from "@/components/editorial";
import { VideoLabel, VideoStage } from "@/components/video-parts";
import {
  articleHref,
  getArticle,
  getScript,
  getVideo,
  series,
  videoHref,
  videos,
  type SeriesKey,
} from "@/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/multimedia/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return {};
  return {
    title: v.title,
    description: v.dek,
    alternates: { canonical: videoHref(v) },
    openGraph: {
      type: "video.other",
      title: v.title,
      description: v.dek,
      images: [{ url: v.poster }],
    },
  };
}

export default async function VideoPage({ params }: PageProps<"/multimedia/[slug]">) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const related = video.related ? getArticle(video.related) : undefined;
  const script = getScript(video.script);
  const seriesKey = video.series as SeriesKey | undefined;
  const other = videos.filter((v) => v.slug !== video.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.dek,
    thumbnailUrl: `${site.url}${video.poster}`,
    duration: video.durationIso,
    inLanguage: "uz",
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page pt-6 md:pt-10">
        <VideoStage video={video} />
      </div>

      <header className="page mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <VideoLabel video={video} />
          <h1 className="text-h1 m-0 font-serif">
            <Headline title={video.title} accent={video.titleAccent} accentColor="text-sand" />
          </h1>
          <p className="text-dek text-stone m-0 max-w-[40rem] font-serif italic">«{video.dek}»</p>
          <p className="text-small m-0 font-sans">
            <span className="text-stone">Muallif: </span>
            <span className="font-medium">{video.author}</span>
          </p>
        </div>
        <dl className="border-smoke m-0 grid grid-cols-[8rem_1fr] content-start gap-y-3 border-t pt-4 font-sans text-[0.9375rem] lg:col-span-4">
          <dt className="text-stone">Holati</dt>
          <dd className="m-0">YouTubeʼda tez orada</dd>
          <dt className="text-stone">Davomiyligi</dt>
          <dd className="figure m-0">{video.duration}</dd>
          {seriesKey && (
            <>
              <dt className="text-stone">Turkum</dt>
              <dd className="m-0">{series[seriesKey].title}</dd>
            </>
          )}
        </dl>
      </header>

      {related && (
        <section aria-labelledby="maqola" className="page mt-band">
          <div className="border-smoke grid gap-6 border-t pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-10">
            <div className="flex flex-col gap-4">
              <p className="label text-sand m-0">Shu mavzuda maqola</p>
              <h2 id="maqola" className="text-h3 m-0 font-serif">
                <Link href={articleHref(related)} className="link-quiet">
                  <Headline
                    title={related.title}
                    accent={related.titleAccent}
                    accentColor="text-sand"
                  />
                </Link>
              </h2>
              <p className="text-stone m-0 max-w-[36rem] font-serif text-[1.0625rem] leading-relaxed">
                {related.excerpt}
              </p>
            </div>
            {related.cover && (
              <Link
                href={articleHref(related)}
                tabIndex={-1}
                aria-hidden="true"
                className="block aspect-[16/10] overflow-hidden"
              >
                <ArticleCover article={related} sizes="22rem" />
              </Link>
            )}
          </div>
        </section>
      )}

      {script && (
        <section aria-labelledby="ssenariy" className="page mt-band">
          <details className="border-smoke group border-t pt-8">
            <summary className="flex cursor-pointer list-none flex-col gap-3 md:flex-row md:items-baseline md:justify-between [&::-webkit-details-marker]:hidden">
              <span className="flex flex-col gap-2">
                <span className="label text-sand">Video ssenariysi</span>
                <span id="ssenariy" className="text-h3 font-serif">
                  Ssenariy matni
                </span>
              </span>
              <span className="btn self-start text-[0.875rem] md:self-auto">
                <span className="group-open:hidden">Matnni ochish</span>
                <span className="hidden group-open:inline">Matnni yopish</span>
              </span>
            </summary>
            <div className="max-w-reading mt-8">
              <p className="text-small border-smoke text-stone m-0 mb-8 border border-dashed p-4 font-sans">
                Bu — video uchun yozilgan ssenariy, transkript emas. Videoda aytilgan soʻzlar undan
                farq qilishi mumkin.
              </p>
              <div className="flex flex-col gap-5 font-serif text-[1.0625rem] leading-[1.7] md:text-[1.125rem]">
                {script.body.map((b, i) =>
                  b.type === "h3" ? (
                    <h3 key={i} className="text-h4 m-0 mt-6 font-sans font-semibold">
                      {b.text}
                    </h3>
                  ) : (
                    <p key={i} className="m-0">
                      {b.text}
                    </p>
                  ),
                )}
              </div>
            </div>
          </details>
        </section>
      )}

      {seriesKey && (
        <section aria-label="Turkum" className="page mt-band">
          <SeriesTracker
            seriesKey={seriesKey}
            title={series[seriesKey].title}
            current={video.slug}
            tone="dark"
          />
        </section>
      )}

      {other.length > 0 && (
        <nav aria-label="Boshqa videolar" className="page mt-section">
          <hr className="perforation border-smoke" />
          {other.map((v) => (
            <Link
              key={v.slug}
              href={videoHref(v)}
              className="group flex flex-col gap-3 pt-8 no-underline md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <span className="label text-stone">Keyingi video</span>
              <span className="text-h3 max-w-[48rem] font-serif group-hover:underline">
                {v.title}
              </span>
              <span aria-hidden="true" className="text-h3 text-sand hidden md:block">
                →
              </span>
            </Link>
          ))}
        </nav>
      )}
    </article>
  );
}
