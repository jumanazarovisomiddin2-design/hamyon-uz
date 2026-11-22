import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideo, videoHref, videos } from "@/content";
import { authors, authorsLine, site } from "@/lib/site";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/videolar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return {};
  return {
    title: v.title,
    description: `${v.title} — HAMYON.UZ videosi (${v.duration}).`,
    authors: authors.map((name) => ({ name })),
    alternates: { canonical: videoHref(v) },
    openGraph: {
      type: "video.other",
      title: v.title,
      images: [{ url: v.poster }],
      videos: [{ url: v.src }],
    },
  };
}

export default async function VideoPage({ params }: PageProps<"/videolar/[slug]">) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.title,
    thumbnailUrl: `${site.url}${video.poster}`,
    contentUrl: `${site.url}${video.src}`,
    duration: video.durationIso,
    inLanguage: "uz",
    author: authors.map((name) => ({ "@type": "Person", name })),
  };

  return (
    <article className="page pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[64rem]">
        <Link href="/" className="text-small text-forest font-sans font-medium">
          ← Bosh sahifa
        </Link>
        <h1 className="text-h1 m-0 mt-6 font-serif">{video.title}</h1>
        <p className="text-small m-0 mt-5 font-sans">
          <span className="text-ink-muted">Mualliflar: </span>
          <span className="font-medium">{authorsLine}</span>
        </p>

        {/* The full video. It never starts by itself; the viewer presses play. */}
        <video
          className="bg-charcoal mt-8 block aspect-video w-full md:mt-10"
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={video.title}
        >
          <a href={video.src}>{video.title} — videoni yuklab olish</a>
        </video>
        <p className="text-small text-ink-muted m-0 mt-3 font-sans">
          Davomiyligi: <span className="figure">{video.duration}</span>
        </p>
      </div>
    </article>
  );
}
