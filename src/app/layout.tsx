import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";

// Typefaces — self-hosted (no Google request), with Uzbek Latin + Cyrillic.
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "@fontsource-variable/commissioner/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: site.name,
    description: site.description,
  },
  robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

/** The page frame shared by every page. Header and footer live in the group layouts. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#asosiy"
          className="bg-forest text-paper sr-only z-[60] px-4 py-3 font-sans focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Asosiy matnga oʻtish
        </a>
        {children}
      </body>
    </html>
  );
}
