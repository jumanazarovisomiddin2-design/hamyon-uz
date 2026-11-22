/**
 * All site content. To add an article: put a JSON file in ./articles and
 * import it below. To add a video: put the file in public/media/videolar and
 * add an entry to videos.json.
 */
import type { Article, Video } from "./types";

import a1 from "./articles/nasiyaning-tort-ming-yillik-yoli.json";
import a2 from "./articles/foizsiz-nasiya-yashirin-kredit.json";
import a3 from "./articles/2027-yildan-nasiya-bozori.json";
import videoList from "./videos.json";

export * from "./types";

export const articles: Article[] = ([a1, a2, a3] as Article[]).sort((a, b) => a.order - b.order);
export const videos: Video[] = (videoList as Video[]).sort((a, b) => a.order - b.order);

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getVideo = (slug: string) => videos.find((v) => v.slug === slug);

export const articleHref = (a: Pick<Article, "slug">) => `/maqolalar/${a.slug}`;
export const videoHref = (v: Pick<Video, "slug">) => `/videolar/${v.slug}`;
