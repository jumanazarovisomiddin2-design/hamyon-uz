import Link from "next/link";
import { newsletterLink, searchHref } from "@/lib/site";
import { SearchIcon } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { SiteNav } from "./site-nav";
import { Wordmark } from "./wordmark";

/**
 * Site header: wordmark · sections · newsletter + search.
 * `tone="dark"` is for the cinema-style video pages.
 */
export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <header className={dark ? "bg-charcoal text-paper" : "bg-paper text-charcoal"}>
      <div className="page flex items-center justify-between gap-4 py-3.5 lg:pt-6 lg:pb-5">
        <Wordmark tone={tone} />
        <SiteNav tone={tone} />
        <div className="-mr-2.5 flex items-center gap-1">
          <Link href={newsletterLink.href} className="btn mr-2 hidden no-underline xl:inline-flex">
            {newsletterLink.label}
          </Link>
          <Link href={searchHref} className="icon-btn" aria-label="Qidiruv">
            <SearchIcon />
          </Link>
          <MobileMenu />
        </div>
      </div>
      <div className={`border-t ${dark ? "border-smoke" : "border-rule"}`} />
    </header>
  );
}
