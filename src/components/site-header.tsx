import { Wordmark } from "./wordmark";

/** Site header: just the wordmark, which links to the homepage. */
export function SiteHeader() {
  return (
    <header className="bg-paper text-charcoal">
      <div className="page flex items-center py-4 lg:py-6">
        <Wordmark />
      </div>
      <div className="border-rule border-t" />
    </header>
  );
}
