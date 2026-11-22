import { authorsLine } from "@/lib/site";
import { Wordmark } from "./wordmark";

/** Footer: wordmark and the authors. */
export function SiteFooter() {
  return (
    <footer className="bg-paper text-charcoal mt-section">
      <div className="page">
        <hr className="perforation" />
        <div className="flex flex-col gap-4 py-10 md:flex-row md:items-end md:justify-between">
          <Wordmark size="lg" />
          <p className="text-small text-ink-soft m-0 font-sans">
            <span className="text-ink-muted">Mualliflar: </span>
            {authorsLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
