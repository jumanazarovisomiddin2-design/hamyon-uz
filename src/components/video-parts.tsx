import Link from "next/link";
import type { Video } from "@/content";
import { Headline } from "./story-parts";
import { PlayGlyph, YouTubePlayer } from "./youtube-player";

export function videoHref(v: Pick<Video, "slug">) {
  return `/videolar/${v.slug}`;
}

/** Duration, or "Tez orada" while the video is not published. */
export function VideoBadge({ video }: { video: Video }) {
  return video.status === "chiqdi" && video.duration ? (
    <span className="figure bg-charcoal text-paper px-2 py-0.5 text-[0.78rem]">
      {video.duration}
    </span>
  ) : (
    <span className="bg-sand text-charcoal px-2 py-1 font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
      Tez orada
    </span>
  );
}

/**
 * The video picture. Plays from YouTube once published; until then a clearly
 * marked frame with the shot brief.
 */
export function VideoFrame({
  video,
  ratio = "aspect-video",
  size = "card",
  playable = false,
  bleed = false,
}: {
  video: Video;
  ratio?: string;
  size?: "hero" | "card";
  playable?: boolean;
  /** Full screen width: labels line up with the page margin. */
  bleed?: boolean;
}) {
  const inset = bleed ? "left-gutter" : "left-3 md:left-5";
  const insetRight = bleed ? "right-gutter" : "right-3 md:right-5";
  const hero = size === "hero";
  const live = video.status === "chiqdi" && video.youtubeId;

  return (
    <div className={`bg-film text-paper relative overflow-hidden ${ratio}`}>
      {live && playable ? (
        <YouTubePlayer id={video.youtubeId!} title={video.title} />
      ) : (
        <>
          <span
            className={`figure absolute top-3 ${inset} max-w-[34rem] pr-3 text-[0.65rem] leading-relaxed tracking-[0.1em] opacity-85 md:top-5`}
          >
            {hero ? `KADR KERAK · ${video.frame.brief.replace(/^Kadr:\s*/, "")}` : "KADR KERAK"}
          </span>
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span
              className={`border-paper flex items-center justify-center rounded-full border-[1.5px] ${
                hero ? "h-20 w-20 md:h-28 md:w-28" : "h-14 w-14"
              } ${live ? "" : "opacity-60"}`}
            >
              <PlayGlyph size={hero ? 28 : 18} />
            </span>
          </span>
          <span className={`absolute bottom-3 md:bottom-5 ${insetRight}`}>
            <VideoBadge video={video} />
          </span>
        </>
      )}
    </div>
  );
}

/** Large 16:9 card used in rows on dark sections. */
export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={videoHref(video)} className="group flex flex-col gap-4 no-underline">
      <VideoFrame video={video} />
      <span className="label text-stone">{video.format}</span>
      <span className="text-h4 group-hover:underline">
        <Headline title={video.title} accent={video.accent} accentColor="text-sand" />
      </span>
    </Link>
  );
}
