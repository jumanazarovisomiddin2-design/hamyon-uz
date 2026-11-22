import Link from "next/link";
import { videoHref, type Video } from "@/content";
import { Headline, ShipLabel } from "./editorial";
import { VideoPoster } from "./video-poster";
import { YouTubePlayer } from "./youtube-player";

/** Status shown until a video is on YouTube. */
export function ComingSoon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`bg-paper text-charcoal inline-flex items-center gap-2 px-2.5 py-1 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase ${className}`}
    >
      <span aria-hidden="true" className="bg-terracotta h-1.5 w-1.5 rounded-full" />
      YouTubeʼda tez orada
    </span>
  );
}

export function VideoLabel({ video }: { video: Video }) {
  return (
    <ShipLabel
      tone="dark"
      cells={[
        { k: "Format", v: video.format },
        { k: "Davomiyligi", v: video.duration, mono: true },
      ]}
    />
  );
}

/** The video itself on its page: YouTube when available, otherwise the poster + status. */
export function VideoStage({ video }: { video: Video }) {
  return (
    <div className="bg-film relative aspect-video w-full overflow-hidden">
      {video.youtubeId ? (
        <YouTubePlayer id={video.youtubeId} title={video.title} poster={video.poster} />
      ) : (
        <>
          <VideoPoster video={video} priority sizes="(min-width: 1440px) 1280px, 100vw" />
          <div className="absolute top-3 left-3 md:top-5 md:left-5">
            <ComingSoon />
          </div>
        </>
      )}
    </div>
  );
}

/** Card used on the homepage and in MULTIMEDIA. */
export function VideoCard({ video, large = false }: { video: Video; large?: boolean }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={videoHref(video)}
        className="relative block aspect-video overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <VideoPoster
          video={video}
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 35vw, 100vw"}
        />
        <span className="absolute top-3 left-3">
          <ComingSoon />
        </span>
        <span className="figure bg-charcoal/85 text-paper absolute right-3 bottom-3 px-2 py-0.5 text-[0.75rem]">
          {video.duration}
        </span>
      </Link>
      <VideoLabel video={video} />
      <h3 className={`m-0 font-serif ${large ? "text-h2" : "text-h3"}`}>
        <Link href={videoHref(video)} className="link-quiet">
          <Headline title={video.title} accent={video.titleAccent} accentColor="text-sand" />
        </Link>
      </h3>
      <p className="text-stone m-0 max-w-[34rem] font-serif text-[1.0625rem] leading-relaxed italic">
        «{video.dek}»
      </p>
    </article>
  );
}
