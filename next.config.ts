import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      { source: "/tahlil", destination: "/maqolalar/turi/tahlil", permanent: true },
      { source: "/tahlil/:slug", destination: "/maqolalar/:slug", permanent: true },
      { source: "/qollanmalar", destination: "/maqolalar", permanent: true },
      { source: "/qollanmalar/:slug", destination: "/maqolalar/:slug", permanent: true },
      { source: "/videolar", destination: "/multimedia", permanent: true },
      { source: "/videolar/:slug", destination: "/multimedia", permanent: true },
      ...gone.map((slug) => ({
        source: `/maqolalar/${slug}`,
        destination: "/maqolalar",
        permanent: false,
      })),
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
