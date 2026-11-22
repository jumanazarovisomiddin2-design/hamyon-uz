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
    "HAMYON.UZ — nasiya, kredit, qarz va kundalik pul haqida mustaqil maqolalar va videolar.",
  locale: "uz_UZ",
  lang: "uz",

  /** Real address. Set NEXT_PUBLIC_SITE_URL in .env.local / hosting settings. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hamyon.uz",

  /**
   * Search engines are kept out until launch.
   * Set NEXT_PUBLIC_ALLOW_INDEXING=true only when the site goes public.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;

/**
 * Boʻlimlar — the two sections of the site. Addresses are fixed.
 * Formats (Tahlil, Tushuntirish …) are filters inside MAQOLALAR.
 */
export const sections = [
  { key: "maqolalar", label: "Maqolalar", href: "/maqolalar" },
  { key: "multimedia", label: "Multimedia", href: "/multimedia" },
] as const;

export type SectionKey = (typeof sections)[number]["key"];

/** Newsletter block on the homepage (sign-up opens later). */
export const newsletterAnchor = "haftalik-xat";

/**
 * Footer links. "Biz haqimizda" and "Tahririyat tamoyillari" are added
 * when those pages are written.
 */
export const footerLinks = sections;

/**
 * Social media. Add the real address when an account exists —
 * links with an empty address are not shown on the site.
 */
export const socialLinks = [
  { label: "Telegram", href: "" },
  { label: "YouTube", href: "" },
  { label: "Instagram", href: "" },
] as const;
