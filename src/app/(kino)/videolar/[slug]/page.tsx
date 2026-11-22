import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareLinks } from "@/components/share-links";
import { Headline } from "@/components/story-parts";
import { VideoCard, VideoFrame, videoHref } from "@/components/video-parts";
import { getStory, getVideo, storyHref, videos } from "@/content";
import { formatDateShort } from "@/lib/format";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/videolar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return {};
  return { title: video.title, description: video.dek };
}

export default async function Page({ params }: PageProps<"/videolar/[slug]">) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();
  const related = video.related ? getStory(video.related.section, video.related.slug) : undefined;
  const others = videos.filter((v) => v.slug !== video.slug);
  const published = video.status === "chiqdi";

  return (
    <article>
      <div className="page pt-6 lg:pt-8">
        <VideoFrame video={video} size="hero" playable />
      </div>

      <div className="page flex flex-col gap-12 pt-10 pb-4 lg:flex-row lg:items-start lg:gap-20 lg:pt-14">
        <header className="flex flex-col gap-5 lg:flex-[2] lg:gap-6">
          <p className="label text-sand m-0">
            {video.format} · {video.topic}
          </p>
          <h1 className="text-h1 m-0">
            <Headline title={video.title} accent={video.accent} accentColor="text-sand" />
          </h1>
          <p className="text-lead text-stone m-0 max-w-[45rem]">{video.description}</p>
          <div className="text-small text-stone flex flex-col gap-1 font-sans md:flex-row md:flex-wrap md:items-center md:gap-x-8">
            {video.credits?.map((c) => (
              <span key={c.role}>
                {c.role}: {c.name}
              </span>
            ))}
            <span className="figure text-[0.8125rem]">
              {published && video.duration
                ? `${formatDateShort(video.publishedAt)} · ${video.duration}`
                : "Video tayyorlanmoqda"}
            </span>
            <span className="[&_a]:text-sand [&_button]:text-sand">
              <ShareLinks url={`${site.url}${videoHref(video)}`} title={video.title} />
            </span>
          </div>
        </header>

        <aside className="flex flex-col gap-8 lg:flex-1">
          <div className="flex flex-col gap-3.5">
            <p className="label text-stone m-0">{video.chapters ? "Boblar" : "Videoda"}</p>
            {video.chapters
              ? video.chapters.map((c) => (
                  <p key={c.time} className="leader m-0 font-sans text-[0.9375rem]">
                    <span>{c.title}</span>
                    <span className="leader-dots border-smoke" aria-hidden="true" />
                    <span className="figure text-sand text-[0.8125rem]">{c.time}</span>
                  </p>
                ))
              : video.covers.map((c, i) => (
                  <p key={c} className="leader m-0 font-sans text-[0.9375rem]">
                    <span>{c}</span>
                    <span className="leader-dots border-smoke" aria-hidden="true" />
                    <span className="figure text-sand text-[0.8125rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                ))}
          </div>
          {related && (
            <div className="border-smoke flex flex-col gap-3 border-t pt-6">
              <p className="label text-stone m-0">
                Mavzuga oid {related.section === "tahlil" ? "tahlil" : "maqola"}
              </p>
              <Link href={storyHref(related)} className="text-h4 no-underline hover:underline">
                <Headline title={related.title} accent={related.accent} accentColor="text-sand" /> →
              </Link>
            </div>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="page pt-section" aria-labelledby="yana">
          <div className="border-smoke mb-8 flex items-baseline justify-between border-t pt-7">
            <h2 id="yana" className="text-section m-0">
              Yana koʻring
            </h2>
            <Link href="/videolar" className="text-ui text-sand font-sans font-medium">
              Barcha videolar →
            </Link>
          </div>
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            {others.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
