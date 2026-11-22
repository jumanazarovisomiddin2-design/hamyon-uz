import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="asosiy" className="flex-1">
        <section className="page pt-band">
          <div className="flex max-w-[48rem] flex-col gap-6">
            <p className="figure text-terracotta m-0 text-sm">404</p>
            <h1 className="text-h1 m-0">
              Bu sahifa <em className="text-terracotta">hali</em> yoʻq
            </h1>
            <p className="text-lead text-ink-soft m-0">
              Manzil notoʻgʻri yozilgan yoki sahifa hali tayyorlanmoqda.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/" className="btn no-underline">
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
