"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The two sections. The current one gets an underline. */
export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname();
  const accent = tone === "dark" ? "decoration-sand" : "decoration-terracotta";

  return (
    <nav aria-label="Asosiy boʻlimlar">
      <ul className="lg:text-ui m-0 flex list-none items-center gap-x-5 p-0 font-sans text-[0.9375rem] font-medium sm:gap-x-8">
        {sections.map((s) => {
          const active = isActive(pathname, s.href);
          return (
            <li key={s.key}>
              <Link
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={`inline-block py-3 underline-offset-[7px] ${
                  active ? `underline decoration-2 ${accent}` : "no-underline hover:underline"
                }`}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
