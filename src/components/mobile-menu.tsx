"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { aboutLink, newsletterLink, searchHref, sections } from "@/lib/site";
import { CloseIcon, MenuIcon, SearchIcon } from "./icons";
import { isActive } from "./site-nav";
import { Wordmark } from "./wordmark";

/**
 * Full-screen menu for phones and tablets.
 * Opens over the page; closes with the × button, the Escape key,
 * or by choosing a link.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close when the address changes (a link was chosen).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      // Give focus back to the menu button after closing.
      if (wasOpen.current) openButton.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={openButton}
        type="button"
        className="icon-btn lg:hidden"
        aria-label="Menyuni ochish"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menyu"
        hidden={!open}
        className="bg-paper text-charcoal fixed inset-0 z-50 overflow-y-auto lg:hidden"
      >
        <div className="page flex items-center justify-between py-3.5">
          <Wordmark />
          <button
            ref={closeButton}
            type="button"
            className="icon-btn -mr-2.5"
            aria-label="Menyuni yopish"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="border-rule border-t" />

        <nav aria-label="Asosiy boʻlimlar" className="page pt-8 pb-12">
          <ul>
            {sections.map((s, i) => {
              const active = isActive(pathname, s.href);
              return (
                <li key={s.key} className="border-rule border-b">
                  <Link
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className="leader py-5 no-underline"
                  >
                    <span
                      className={`font-serif text-[2.25rem] leading-none font-medium tracking-[-0.03em] ${
                        active ? "text-terracotta italic" : ""
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="leader-dots" aria-hidden="true" />
                    <span className="figure text-terracotta text-sm" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 font-sans">
            <Link
              href={aboutLink.href}
              className="text-ui text-ink-muted py-2 no-underline hover:underline"
            >
              {aboutLink.label}
            </Link>
            <Link
              href={searchHref}
              className="text-ui inline-flex items-center gap-2 py-2 no-underline hover:underline"
            >
              <SearchIcon size={18} /> Qidiruv
            </Link>
            <Link href={newsletterLink.href} className="btn btn-solid mt-4 self-start">
              {newsletterLink.label}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
