"use client";

import { useState } from "react";

/**
 * Loads YouTube only after the reader presses play — the page stays fast
 * and no YouTube cookies are set before that (youtube-nocookie.com).
 */
export function YouTubePlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Videoni ijro etish: ${title}`}
      className="absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="border-paper bg-charcoal/40 relative flex h-24 w-24 items-center justify-center rounded-full border-[1.5px]">
        <PlayGlyph size={30} />
      </span>
    </button>
  );
}

export function PlayGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5l12 7-12 7z" fill="currentColor" />
    </svg>
  );
}
