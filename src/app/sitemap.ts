import type { MetadataRoute } from "next";
import { articleHref, articles, formats, videoHref, videos } from "@/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/maqolalar",
    ...formats.map((f) => `/maqolalar/turi/${f.key}`),
    ...articles.map(articleHref),
    "/multimedia",
    ...videos.map(videoHref),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
