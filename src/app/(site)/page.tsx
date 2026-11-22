import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articleHref, articles, videoHref, videos } from "@/content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** Homepage: three articles and the videos — picture and title, nothing else. */
export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">HAMYON.UZ — nasiya haqida maqolalar va videolar</h1>

      <section aria-labelledby="maqolalar" className="page pt-10 md:pt-14 lg:pt-20">
        <h2 id="maqolalar" className="text-section m-0 font-serif">
          Maqolalar
        </h2>
        <ul className="m-0 mt-8 grid list-none gap-x-8 gap-y-12 p-0 md:mt-10 md:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link href={articleHref(a)} className="group block no-underline">
                <span className="bg-sand block aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.cover.src}
                    alt=""
                    width={a.cover.width}
                    height={a.cover.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    preload={i === 0}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </span>
                <span className="text-h4 mt-4 block font-serif leading-snug group-hover:underline">
                  {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="videolar" className="page mt-section">
        <h2 id="videolar" className="text-section m-0 font-serif">
          Videolar
        </h2>
        <ul className="m-0 mt-8 grid list-none gap-x-8 gap-y-12 p-0 md:mt-10 md:grid-cols-2">
          {videos.map((v) => (
            <li key={v.slug}>
              <Link href={videoHref(v)} className="group block no-underline">
                <span className="bg-charcoal relative block aspect-video overflow-hidden">
                  <Image
                    src={v.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-paper/90 text-charcoal absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                  >
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                  <span className="figure bg-charcoal/85 text-paper absolute right-3 bottom-3 px-2 py-0.5 text-[0.75rem]">
                    {v.duration}
                  </span>
                </span>
                <span className="text-h4 mt-4 block font-serif leading-snug group-hover:underline">
                  {v.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
