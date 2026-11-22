import localFont from "next/font/local";

/**
 * Typefaces, self-hosted from the Fontsource packages (no Google request).
 * next/font preloads them and creates size-matched fallbacks, so text does
 * not jump when the fonts arrive. The Latin files cover everything the site
 * uses, including oʻ gʻ (ʻ U+02BB) and tutuq belgisi (ʼ U+02BC).
 */
export const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-italic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--ff-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: "../../node_modules/@fontsource-variable/commissioner/files/commissioner-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--ff-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const mono = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--ff-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
  adjustFontFallback: false,
});
