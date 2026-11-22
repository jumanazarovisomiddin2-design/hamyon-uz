import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-page) flex-1 flex-col justify-center px-6 py-16 sm:px-10">
      <p className="text-ink-muted font-mono text-xs tracking-[0.2em] uppercase">404</p>
      <h1 className="font-display text-forest mt-4 text-5xl leading-tight">Sahifa topilmadi</h1>
      <p className="mt-4 text-lg">
        Bu manzilda hech narsa yoʻq.{" "}
        <Link href="/" className="text-terracotta underline underline-offset-4">
          Bosh sahifaga qaytish
        </Link>
      </p>
    </main>
  );
}
