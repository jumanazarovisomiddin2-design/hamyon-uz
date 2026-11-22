import type { Metadata } from "next";
import Link from "next/link";
import {
  articleHref,
  formats,
  getArticle,
  series,
  videoFor,
  videoHref,
  videos,
  type Article,
  type Graphic,
} from "@/content";
import {
  ArticleCover,
  ArticleLabel,
  Headline,
  PhotoPlaceholder,
  SeriesTracker,
} from "@/components/editorial";
import { CompositionBody, GrowthBody, PriceTagBody } from "@/components/graphics";
import { Reveal } from "@/components/motion";
import { VideoCard } from "@/components/video-parts";
import { newsletterAnchor } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** First infographic of a kind in an article. */
function graphicOf<K extends Graphic["kind"]>(a: Article, kind: K) {
  return a.body.find((b) => b.type === "graphic" && b.kind === kind) as
    Extract<Graphic, { kind: K }> | undefined;
}

export default function HomePage() {
  const lead = getArticle("foizsiz-nasiya-yashirin-kredit")!;
  const vitrina = [
    getArticle("2027-yildan-nasiya-bozori")!,
    getArticle("nasiyaning-tort-ming-yillik-yoli")!,
    getArticle("kredit-cheklovlari-va-mikroqarzlar")!,
  ];
  const data = getArticle("aholining-banklar-oldidagi-qarzi")!;
  const leadVideo = videoFor(lead);
  const leadTag = graphicOf(lead, "price");
  const composition = graphicOf(data, "composition");
  const growth = graphicOf(data, "growth");

  return (
    <>
      <h1 className="sr-only">HAMYON.UZ — pul va kundalik hayot haqida mustaqil nashr</h1>

      {/* 1 · Lead story — dominates the page */}
      <section aria-labelledby="bosh-maqola" className="page pt-8 md:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
            <ArticleLabel article={lead} />
            <h2 id="bosh-maqola" className="text-display-long m-0 font-serif">
              <Link href={articleHref(lead)} className="link-quiet">
                <Headline title={lead.title} accent={lead.titleAccent} />
              </Link>
            </h2>
            <p className="text-dek text-ink-soft m-0 max-w-[36rem] font-serif italic">
              {lead.excerpt}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans">
              <Link href={articleHref(lead)} className="btn btn-solid">
                Maqolani oʻqish <span aria-hidden="true">→</span>
              </Link>
              {leadVideo && (
                <Link href={videoHref(leadVideo)} className="text-forest text-ui py-2 font-medium">
                  Video: {leadVideo.title}
                </Link>
              )}
            </div>
            <p className="text-small text-ink-muted m-0 font-sans">{lead.author}</p>
          </div>

          <div className="relative lg:col-span-5">
            {lead.photo && (
              <PhotoPlaceholder
                shot={lead.photo.shot}
                brief={lead.photo.brief}
                className="aspect-[4/3] w-full lg:aspect-[4/5]"
              />
            )}
            {leadTag && (
              <Reveal className="group relative -mt-16 ml-4 max-w-[19rem] sm:ml-8 lg:absolute lg:-bottom-8 lg:-left-6 lg:mt-0 lg:ml-0 xl:bottom-10 xl:-left-16">
                <div className="swing [transform:rotate(-2deg)] shadow-[0_10px_24px_rgba(33,31,27,0.18)] [--tilt:-2deg]">
                  <PriceTagBody g={{ ...leadTag, diff: undefined }} />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 2 · Vitrina — the newest articles, few and spacious */}
      <section aria-labelledby="vitrina" className="page mt-section">
        <hr className="perforation" />
        <div className="flex flex-col gap-5 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="label m-0">Vitrina · maqolalar</p>
            <h2 id="vitrina" className="text-section m-0 font-serif">
              Peshtaxtada <em className="text-terracotta">nima bor</em>
            </h2>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-sans text-[0.8125rem] font-medium">
            <li>
              <Link
                href="/maqolalar"
                className="bg-charcoal text-paper inline-block px-3 py-2 no-underline"
              >
                Hammasi
              </Link>
            </li>
            {formats.map((f) => (
              <li key={f.key}>
                <Link
                  href={`/maqolalar/turi/${f.key}`}
                  className="border-charcoal hover:bg-charcoal hover:text-paper inline-block border px-3 py-[7px] no-underline"
                >
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="-mx-gutter px-gutter mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-12 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
          {vitrina.map((a, i) => (
            <article
              key={a.slug}
              className={`group flex w-[82%] shrink-0 snap-start flex-col gap-4 md:w-auto ${
                i === 0 ? "md:col-span-12 lg:col-span-6" : "md:col-span-6 lg:col-span-3"
              } ${i === 2 ? "lg:mt-24" : ""}`}
            >
              <Link
                href={articleHref(a)}
                tabIndex={-1}
                aria-hidden="true"
                className={`block overflow-hidden ${i === 0 ? "aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/3] lg:aspect-[4/5]"}`}
              >
                {a.cover && (
                  <ArticleCover
                    article={a}
                    big={i === 0}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 82vw"
                  />
                )}
              </Link>
              <ArticleLabel article={a} />
              <h3 className={`m-0 font-serif ${i === 0 ? "text-h2" : "text-h4"}`}>
                <Link href={articleHref(a)} className="link-quiet">
                  <Headline title={a.title} accent={a.titleAccent} />
                </Link>
              </h3>
              {i === 0 && (
                <p className="text-ink-soft m-0 max-w-[34rem] font-serif text-[1.0625rem] leading-relaxed">
                  {a.excerpt}
                </p>
              )}
            </article>
          ))}
        </div>
        <p className="text-small text-ink-muted mt-2 font-sans md:hidden" aria-hidden="true">
          ← surib koʻring →
        </p>
      </section>

      {/* 3 · Data story — numbers from the household-debt article */}
      <section aria-labelledby="raqamlar" className="bg-sand on-sand mt-section py-band">
        <div className="page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <p className="label text-ink-soft m-0">Raqamlar gapiradi</p>
            <h2 id="raqamlar" className="text-h2 m-0 font-serif">
              <Link href={articleHref(data)} className="link-quiet">
                <Headline title={data.title} accent={data.titleAccent} />
              </Link>
            </h2>
            <p className="text-ink-soft m-0 font-serif text-[1.0625rem] leading-relaxed">
              {data.excerpt}
            </p>
            <Link
              href={articleHref(data)}
              className="text-forest text-ui self-start py-2 font-sans font-medium"
            >
              Toʻliq maqola <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex flex-col gap-12 lg:col-span-8">
            {composition && (
              <Reveal>
                <p className="label m-0 mb-4">{composition.title}</p>
                <CompositionBody g={composition} />
              </Reveal>
            )}
            {growth && (
              <Reveal>
                <p className="label m-0 mb-4">{growth.title}</p>
                <GrowthBody g={growth} />
              </Reveal>
            )}
            <p className="text-small text-ink-soft m-0 font-sans">
              Manba: Oʻzbekiston Respublikasi Markaziy banki maʼlumotlari, maqolada keltirilganidek.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Multimedia */}
      <section aria-labelledby="multimedia" className="bg-charcoal text-paper py-band">
        <div className="page flex flex-col gap-10">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="label text-stone m-0">Multimedia</p>
              <h2 id="multimedia" className="text-section m-0 font-serif">
                Pul — <em className="text-sand">ekranda</em>
              </h2>
            </div>
            <Link href="/multimedia" className="text-sand text-ui py-2 font-sans font-medium">
              Barchasi <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {videos.map((v, i) => (
              <div key={v.slug} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-20"}>
                <VideoCard video={v} large={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Series tracking */}
      <section aria-label="Turkum" className="page mt-section">
        <SeriesTracker seriesKey="nasiya-sovga-emas" title={series["nasiya-sovga-emas"].title} />
      </section>

      {/* 6 · Newsletter — a delivery slip; sign-up is not open yet */}
      <section id={newsletterAnchor} aria-labelledby="xat" className="page mt-section">
        <div className="bg-forest text-paper grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <p className="label text-sand m-0">Yetkazib berish varaqasi</p>
            <h2 id="xat" className="text-h2 m-0 font-serif">
              Haftalik xat — <em className="text-sand">tez orada</em>
            </h2>
            <p className="text-stone m-0 font-sans">Obuna hali ochilmagan.</p>
          </div>
          <form className="lg:col-span-6" aria-describedby="xat-holat">
            <fieldset disabled className="m-0 flex flex-col gap-4 border-0 p-0">
              <dl className="border-stone m-0 grid grid-cols-[6rem_1fr] gap-y-2 border-y border-dashed py-4 font-sans text-[0.9375rem]">
                <dt className="text-stone">Kimga</dt>
                <dd className="m-0">Sizga</dd>
                <dt className="text-stone">Nima</dt>
                <dd className="m-0">Yangi maqolalar va videolar</dd>
              </dl>
              <label htmlFor="xat-email" className="sr-only">
                Elektron pochta
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="xat-email"
                  type="email"
                  placeholder="email@manzil.uz"
                  className="border-stone placeholder:text-stone/70 text-paper min-h-11 flex-1 border bg-transparent px-3 font-sans disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  className="btn bg-paper text-forest border-paper disabled:cursor-not-allowed disabled:opacity-80"
                >
                  Obuna boʻlish
                </button>
              </div>
              <p id="xat-holat" className="text-small text-stone m-0 font-sans">
                Obuna ochilganda shu yerda eʼlon qilamiz.
              </p>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
