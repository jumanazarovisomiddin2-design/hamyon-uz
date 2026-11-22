import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-parts";
import { Headline } from "@/components/story-parts";
import { VideoCard, VideoFrame, videoHref } from "@/components/video-parts";
import { videos } from "@/content";

const description =
  "Video-esse va tushuntirishlar: bozor, doʻkon va uyda pul qanday harakatlanadi — hisob-kitob kamera oldida.";

export const metadata: Metadata = { title: "Videolar", description };

export default function Page() {
  const [main, ...rest] = videos;
  return (
    <>
      <SectionHeader title="Videolar" description={description} count={videos.length} tone="dark" />

      <section aria-label={main.title}>
        <Link href={videoHref(main)} className="block no-underline lg:mx-auto lg:max-w-[100rem]">
          <VideoFrame video={main} ratio="aspect-video md:aspect-[21/9]" size="hero" bleed />
        </Link>
        <div className="page flex flex-col gap-6 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4 lg:max-w-[56rem]">
            <p className="label text-sand m-0">{main.format}</p>
            <h2 className="text-h1 m-0">
              <Link href={videoHref(main)} className="link-quiet">
                <Headline title={main.title} accent={main.accent} accentColor="text-sand" />
              </Link>
            </h2>
          </div>
          <p className="text-lead text-stone m-0 lg:max-w-[24rem]">{main.dek}</p>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="page pt-section" aria-labelledby="yana">
          <div className="border-smoke mb-8 border-t pt-7">
            <h2 id="yana" className="text-section m-0">
              Barcha videolar
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            {rest.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
