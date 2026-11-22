"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { aboutLink, sections } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation. The current section gets a terracotta underline. */
export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname();
  const quiet = tone === "dark" ? "text-stone" : "text-ink-muted";
  const accent = tone === "dark" ? "decoration-sand" : "decoration-terracotta";

  return (
    <nav aria-label="Asosiy boʻlimlar" className="hidden lg:block">
      <ul className="text-ui flex items-center gap-x-8 font-sans font-medium xl:gap-x-9">
        {sections.map((s) => {
          const active = isActive(pathname, s.href);
          return (
            <li key={s.key}>
              <Link
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={`py-3 underline-offset-[7px] ${
                  active ? `underline decoration-2 ${accent}` : "no-underline hover:underline"
                }`}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={aboutLink.href}
            aria-current={isActive(pathname, aboutLink.href) ? "page" : undefined}
            className={`py-3 no-underline hover:underline ${quiet}`}
          >
            {aboutLink.label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
