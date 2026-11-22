/**
 * Saytning asosiy sozlamalari — bitta joyda.
 * Site-wide settings in one place: name, address, authors.
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

/** The authors of every article and video on the site. */
export const authors = ["Isomiddin Jumanazarov", "Shohzodaxon Muzaffarova"] as const;
export const authorsLine = authors.join(", ");
