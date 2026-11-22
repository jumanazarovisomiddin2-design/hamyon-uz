/**
 * Saytning asosiy sozlamalari — bitta joyda.
 * Site-wide settings in one place: name, address, sections.
 * Change things here instead of hunting through the code.
 */

export const site = {
  name: "HAMYON.UZ",
  shortName: "Hamyon",
  tagline: "Pul va kundalik hayot haqida mustaqil nashr",
  description:
    "HAMYON.UZ — nasiya, kredit, qarz, jamgʻarma va isteʼmol madaniyati haqida maqolalar, videolar, tahlillar va amaliy qoʻllanmalar.",
  locale: "uz_UZ",
  lang: "uz",

  /** Real address. Set NEXT_PUBLIC_SITE_URL in .env.local / hosting settings. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Search engines are kept out until launch.
   * Set NEXT_PUBLIC_ALLOW_INDEXING=true only when the site goes public.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;

/**
 * Boʻlimlar — the planned sections and their web addresses.
 * Pages for these are built in later stages; the addresses are fixed now
 * so links never have to change after launch.
 */
export const sections = [
  { key: "articles", label: "Maqolalar", href: "/maqolalar" },
  { key: "videos", label: "Videolar", href: "/videolar" },
  { key: "analysis", label: "Tahlil", href: "/tahlil" },
  { key: "guides", label: "Qoʻllanmalar", href: "/qollanmalar" },
  { key: "about", label: "Biz haqimizda", href: "/biz-haqimizda" },
] as const;

export type SectionKey = (typeof sections)[number]["key"];
