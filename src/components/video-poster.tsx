"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Video } from "@/content";

/**
 * A real frame from the video. On computers, a 6-second silent preview plays
 * while the pointer is over it — never automatically, never with sound, and
 * not at all with "reduce motion".
 */
export function VideoPoster({
  video,
  sizes,
  priority = false,
}: {
  video: Video;
  sizes: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  const canPreview = () =>
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  function start() {
    const v = ref.current;
    if (!v || !canPreview()) return;
    v.hidden = false;
    v.play().catch(() => {});
  }
  function stop() {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.hidden = true;
  }

  return (
    <span className="absolute inset-0 block" onPointerEnter={start} onPointerLeave={stop}>
      <Image
        src={video.poster}
        alt={video.posterAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {video.preview && (
        <video
          ref={ref}
          src={video.preview}
          muted
          loop
          playsInline
          preload="none"
          hidden
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}
