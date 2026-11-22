import type { MetadataRoute } from "next";
import { articleHref, articles, videoHref, videos } from "@/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...articles.map(articleHref), ...videos.map(videoHref)];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
