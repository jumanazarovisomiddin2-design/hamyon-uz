/**
 * The shape of HAMYON.UZ content.
 * Articles: src/content/articles/*.json · Videos: src/content/videos.json
 */

export type Block =
  | { type: "p" | "h2" | "h3" | "quote" | "speech" | "note"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  /** Display order on the homepage (1 = first). */
  order: number;
  /** An exact quote from the article — used as the page description for search engines. */
  excerpt: string;
  cover: {
    kind: "image";
    src: string;
    alt: string;
    credit?: string;
    width: number;
    height: number;
  };
  /** The authors' text, word for word. */
  body: Block[];
  sources?: { heading: string; items: string[] };
};

export type Video = {
  slug: string;
  title: string;
  order: number;
  duration: string;
  durationIso: string;
  /** The full video file in public/media/videolar. */
  src: string;
  poster: string;
  posterAlt: string;
};
