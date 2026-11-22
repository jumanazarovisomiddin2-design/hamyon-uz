import { site } from "@/lib/site";

/**
 * Temporary holding page while the site is being built.
 * Replaced by the real homepage in a later stage.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-page) flex-1 flex-col justify-end px-6 py-16 sm:px-10">
      <p className="text-ink-muted font-mono text-xs tracking-[0.2em] uppercase">Tayyorlanmoqda</p>
      <h1 className="font-display text-forest mt-4 text-5xl leading-none tracking-tight sm:text-8xl">
        {site.name}
      </h1>
      <p className="text-charcoal mt-6 max-w-(--container-reading) text-lg">{site.tagline}.</p>
      <div className="border-rule mt-12 border-t" aria-hidden="true" />
    </main>
  );
}
