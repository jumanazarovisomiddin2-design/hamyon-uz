import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /** Old addresses from the first version of the site → the two sections. */
  async redirects() {
    const gone = [
      "bitta-telefon-15-ta-nasiya",
      "nasiya-mijozi-kim",
      "nasiyadan-oldin-5-savol",
      "foizsiz-nasiyani-tekshirish",
      "bir-nechta-nasiya-qaysi-birinchi",
      "2027-nasiya-xaridor-uchun-5-qoida",
    ];
    return [
      // pieces that no longer exist → straight to the article list (one hop)
      ...gone.flatMap((slug) =>
        ["maqolalar", "tahlil", "qollanmalar"].map((section) => ({
          source: `/${section}/${slug}`,
          destination: "/maqolalar",
          permanent: true,
        })),
      ),
      { source: "/tahlil", destination: "/maqolalar/turi/tahlil", permanent: true },
      { source: "/tahlil/:slug", destination: "/maqolalar/:slug", permanent: true },
      { source: "/qollanmalar", destination: "/maqolalar", permanent: true },
      { source: "/qollanmalar/:slug", destination: "/maqolalar/:slug", permanent: true },
      { source: "/videolar", destination: "/multimedia", permanent: true },
      { source: "/videolar/:slug", destination: "/multimedia", permanent: true },
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
