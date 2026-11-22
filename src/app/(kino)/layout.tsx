import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Dark "cinema" pages: MULTIMEDIA. */
export default function CinemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-charcoal text-paper flex flex-1 flex-col">
      <SiteHeader tone="dark" />
      <main id="asosiy" className="flex-1">
        {children}
      </main>
      <SiteFooter tone="dark" />
    </div>
  );
}
