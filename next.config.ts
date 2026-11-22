import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /** Earlier addresses of the site → the simple version (home, articles, videos). */
  async redirects() {
    const home = (source: string) => ({ source, destination: "/", permanent: true });
    return [
      home("/maqolalar"),
      home("/maqolalar/turi/:format*"),
      home("/maqolalar/aholining-banklar-oldidagi-qarzi"),
      home("/maqolalar/kredit-cheklovlari-va-mikroqarzlar"),
      home("/multimedia"),
      { source: "/multimedia/:slug", destination: "/videolar/:slug", permanent: true },
      home("/videolar"),
      home("/tahlil"),
      { source: "/tahlil/:slug", destination: "/maqolalar/:slug", permanent: true },
      home("/qollanmalar"),
      home("/qollanmalar/:slug"),
      home("/dizayn-tizimi"),
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
