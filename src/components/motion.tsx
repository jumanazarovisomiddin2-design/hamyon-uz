"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Marks its content as "in view" once, so the CSS motion patterns in
 * globals.css (strike, grow, fill, receipt, rise) can run. Nothing moves
 * before that, and nothing moves at all with "reduce motion".
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-anim="" className={`${className} ${inView ? "is-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Counts the number in `value` up from zero when it scrolls into view
 * ("8,9%" → 0,0% … 8,9%). The final text is always exactly `value`;
 * screen readers and "reduce motion" get it straight away.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/\d+(?:[ ]\d{3})*(?:,\d+)?/);
    if (!el || !match || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = match[0];
    const decimals = raw.includes(",") ? raw.split(",")[1].length : 0;
    const target = Number(raw.replace(/ /g, "").replace(",", "."));
    const grouped = raw.includes(" ");
    const fmt = (n: number) => {
      let s = n.toFixed(decimals).replace(".", ",");
      if (grouped) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return value.replace(raw, s);
    };

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(t < 1 ? fmt(target * eased) : value);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setShown(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
