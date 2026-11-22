import Link from "next/link";
import { footerLinks, socialLinks } from "@/lib/site";
import { Wordmark } from "./wordmark";

/** Site footer: perforation line, large wordmark, links, copyright. */
export function SiteFooter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const socials = socialLinks.filter((s) => s.href);
  const dark = tone === "dark";
  const year = 2026; // update yearly, or replace with the build year

  return (
    <footer className="page mt-section pb-14">
      <hr className={`perforation ${dark ? "border-smoke" : ""}`} />
      <div className="flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between">
        <Wordmark size="lg" tone={tone} />
        <nav aria-label="Qoʻshimcha havolalar">
          <ul className="flex flex-wrap gap-x-7 gap-y-1 font-sans text-[0.90625rem] font-medium">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block py-2 whitespace-nowrap no-underline hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {socials.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="inline-block py-2 whitespace-nowrap no-underline hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={`figure m-0 text-[0.78125rem] ${dark ? "text-stone" : "text-ink-muted"}`}>
          © {year} · Mustaqil nashr
        </p>
      </div>
    </footer>
  );
}
