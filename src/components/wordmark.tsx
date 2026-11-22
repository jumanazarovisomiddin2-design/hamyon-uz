import Link from "next/link";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { word: string; uz: string }> = {
  sm: { word: "text-2xl", uz: "text-[0.625rem]" }, // small
  md: {
    word: "text-[1.625rem] sm:text-[1.875rem] md:text-[2.5rem]",
    uz: "text-[0.6875rem] md:text-sm",
  }, // site header
  lg: { word: "text-[2.75rem] md:text-[3.5rem]", uz: "text-sm md:text-base" }, // footer
};

/**
 * The HAMYON.UZ wordmark: "Hamyon" in the serif, ".uz" in mono —
 * like the code printed at the bottom of a receipt.
 */
export function Wordmark({
  size = "md",
  tone = "light",
  href = "/",
}: {
  size?: Size;
  tone?: "light" | "dark";
  href?: string;
}) {
  const s = sizes[size];
  return (
    <Link
      href={href}
      aria-label="HAMYON.UZ — bosh sahifa"
      className="inline-flex items-baseline gap-1 leading-none no-underline"
    >
      <span
        className={`font-serif font-semibold tracking-[-0.04em] ${s.word} ${
          tone === "dark" ? "text-paper" : "text-forest"
        }`}
      >
        Hamyon
      </span>
      <span className={`figure ${s.uz} ${tone === "dark" ? "text-sand" : "text-terracotta"}`}>
        .uz
      </span>
    </Link>
  );
}
