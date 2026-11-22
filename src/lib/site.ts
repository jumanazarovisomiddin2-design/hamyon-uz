/**
 * Saytning asosiy sozlamalari — bitta joyda.
 * Site-wide settings in one place: name, address, sections, links.
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
 * Boʻlimlar — the main sections and their web addresses.
 * Addresses are fixed so links never have to change after launch.
 */
export const sections = [
  { key: "articles", label: "Maqolalar", href: "/maqolalar" },
  { key: "videos", label: "Videolar", href: "/videolar" },
  { key: "analysis", label: "Tahlil", href: "/tahlil" },
  { key: "guides", label: "Qoʻllanmalar", href: "/qollanmalar" },
] as const;

export type SectionKey = (typeof sections)[number]["key"];

/** Shown after the sections in the menu, in a quieter colour. */
export const aboutLink = { label: "Biz haqimizda", href: "/biz-haqimizda" } as const;

/** Newsletter sign-up lives on the homepage (built in stage 3). */
export const newsletterLink = { label: "Haftalik xat", href: "/#haftalik-xat" } as const;

/** Search page (planned). */
export const searchHref = "/qidiruv";

/** Footer links. */
export const footerLinks = [
  { label: "Tahririyat tamoyillari", href: "/biz-haqimizda#tamoyillar" },
  { label: "Biz haqimizda", href: "/biz-haqimizda" },
  { label: "Aloqa", href: "/biz-haqimizda#aloqa" },
] as const;

/**
 * Social media. Add the real address when an account exists —
 * links with an empty address are not shown on the site.
 */
export const socialLinks = [
  { label: "Telegram", href: "" },
  { label: "YouTube", href: "" },
  { label: "Instagram", href: "" },
] as const;
