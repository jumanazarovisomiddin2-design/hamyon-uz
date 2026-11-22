import { SiteNav } from "./site-nav";
import { Wordmark } from "./wordmark";

/**
 * Site header: wordmark + the two sections. The two links are visible on
 * every screen size, so there is no hidden menu.
 * `tone="dark"` is for MULTIMEDIA pages.
 */
export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <header className={dark ? "bg-charcoal text-paper" : "bg-paper text-charcoal"}>
      <div className="page flex items-center justify-between gap-4 py-3 lg:pt-6 lg:pb-5">
        <Wordmark tone={tone} />
        <SiteNav tone={tone} />
      </div>
      <div className={`border-t ${dark ? "border-smoke" : "border-rule"}`} />
    </header>
  );
}
