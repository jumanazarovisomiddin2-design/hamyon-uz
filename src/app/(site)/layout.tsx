import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Paper pages: home and MAQOLALAR. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="asosiy" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
