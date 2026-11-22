import Link from "next/link";
import { Headline, Kicker, Meta, PhotoPlaceholder } from "@/components/story-parts";
import { VideoFrame, VideoBadge, videoHref } from "@/components/video-parts";
import { frontPage, seriesParts, storiesIn, storyHref, videos } from "@/content";
import { readingMinutes } from "@/lib/format";

export default function Home() {
  const { lead, weekly, numberOfTheWeek: n } = frontPage;
  const series = seriesParts("Nasiya sovgʻa emas");
  const guides = storiesIn("qollanmalar");
  const [mainVideo, ...moreVideos] = videos;
  const offsets = ["", "lg:mt-36", "lg:mt-14"];
  const ratios = ["aspect-[4/3] md:aspect-[4/5]", "aspect-[4/3] md:aspect-square", "aspect-[3/2]"];

  return (
    <>
      <h1 className="sr-only">HAMYON.UZ — pul va kundalik hayot haqida mustaqil nashr</h1>

      {/* Lead story */}
      <section className="page pt-12 lg:pt-24">
        <article className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-[4.5rem]">
          <div className="flex flex-col gap-6 lg:flex-[6] lg:gap-7 lg:pb-3">
            <Kicker story={lead} />
            <h2 className={`m-0 ${lead.title.length > 40 ? "text-display-long" : "text-display"}`}>
              <Link href={storyHref(lead)} className="link-quiet">
                <Headline title={lead.title} accent={lead.accent} />
              </Link>
            </h2>
            <p className="text-dek text-ink-soft m-0 max-w-[33rem] italic">{lead.dek}</p>
            <Meta story={lead} />
          </div>
          {lead.photo && (
            <figure className="m-0 flex flex-col gap-3 lg:flex-[6]">
              <PhotoPlaceholder
                photo={lead.photo}
                className="h-[26rem] md:h-[34rem] lg:h-[42rem]"
              />
              <figcaption className="text-small text-ink-muted font-sans">
                {lead.photo.caption}. Foto: [fotograf] / HAMYON.UZ
              </figcaption>
            </figure>
          )}
        </article>
      </section>

      {/* The series */}
      <section className="page pt-20 lg:pt-28" aria-labelledby="turkum">
        <hr className="perforation" />
        <div className="flex flex-col gap-2 pt-6 md:flex-row md:items-baseline md:justify-between">
          <h2 id="turkum" className="label m-0">
            Turkum · Nasiya sovgʻa emas
          </h2>
          <p className="text-small text-ink-muted m-0 font-sans">
            Uch maqola: tarix, yashirin ustama va 2027-yil qoidalari
          </p>
        </div>
        <ol className="grid md:grid-cols-3">
          {series.map((s, i) => (
            <li
              key={s.slug}
              className={`border-rule border-b md:border-b-0 ${i > 0 ? "md:border-l md:pl-8" : ""} ${
                i < series.length - 1 ? "md:pr-8" : ""
              }`}
            >
              <Link
                href={storyHref(s)}
                className="group flex h-full flex-col gap-3.5 py-7 no-underline"
              >
                <span className="figure text-terracotta text-[0.8125rem]">
                  {String(s.series?.part).padStart(2, "0")}
                </span>
                <span className="text-h4 group-hover:underline">
                  <Headline title={s.title} accent={s.accent} accentColor="" />
                </span>
                <span className="leader text-small text-ink-muted mt-auto font-sans">
                  <span>{s.format}</span>
                  <span className="leader-dots" aria-hidden="true" />
                  <span className="figure">{readingMinutes(s.body)} daq</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* This week */}
      <section className="page pt-section" aria-labelledby="bu-hafta">
        <div className="mb-10 flex items-baseline justify-between gap-4 lg:mb-12">
          <h2 id="bu-hafta" className="text-section m-0">
            Bu hafta
          </h2>
          <Link href="/maqolalar" className="text-ui text-forest font-sans font-medium">
            Barcha maqolalar →
          </Link>
        </div>
        <div className="flex flex-col gap-14 md:flex-row md:flex-wrap md:items-start lg:flex-nowrap lg:gap-16">
          {weekly.map((s, i) => (
            <article
              key={s.slug}
              className={`flex flex-col gap-4 md:flex-[1_1_18rem] lg:basis-0 ${offsets[i]} ${i === 0 ? "lg:grow-[1.15]" : ""}`}
            >
              {s.photo && <PhotoPlaceholder photo={s.photo} className={ratios[i]} />}
              <Kicker story={s} />
              <h3 className="text-h3 m-0">
                <Link href={storyHref(s)} className="link-quiet">
                  <Headline title={s.title} accent={s.accent} accentColor="" />
                </Link>
              </h3>
              <p className="text-lead text-ink-soft m-0">{s.dek}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Video — cinema */}
      <section
        className="bg-charcoal text-paper mt-section pt-20 pb-24 lg:pt-22 lg:pb-28"
        aria-labelledby="videolar"
      >
        <div className="page mb-8 flex flex-wrap items-baseline justify-between gap-4 lg:mb-10">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 id="videolar" className="text-section m-0">
              Videolar
            </h2>
            <p className="text-ui text-stone m-0 font-sans">Hisob-kitob — kamera oldida</p>
          </div>
          <Link href="/videolar" className="text-ui text-sand font-sans font-medium">
            Barcha videolar →
          </Link>
        </div>
        <Link
          href={videoHref(mainVideo)}
          className="block no-underline lg:mx-auto lg:max-w-[100rem]"
        >
          <VideoFrame video={mainVideo} ratio="aspect-video md:aspect-[21/9]" size="hero" bleed />
        </Link>
        <div className="page flex flex-col gap-6 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4 lg:max-w-[56rem]">
            <p className="label text-sand m-0">{mainVideo.format}</p>
            <h3 className="text-h1 m-0">
              <Link href={videoHref(mainVideo)} className="link-quiet">
                <Headline
                  title={mainVideo.title}
                  accent={mainVideo.accent}
                  accentColor="text-sand"
                />
              </Link>
            </h3>
          </div>
          <p className="text-lead text-stone m-0 lg:max-w-[24rem]">{mainVideo.dek}</p>
        </div>
        {moreVideos.map((v) => (
          <div key={v.slug} className="page pt-16 lg:pt-20">
            <Link
              href={videoHref(v)}
              className="group grid gap-6 no-underline md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-10"
            >
              <VideoFrame video={v} />
              <span className="flex flex-col gap-4">
                <span className="label text-stone">{v.format}</span>
                <span className="text-h3 group-hover:underline">
                  <Headline title={v.title} accent={v.accent} accentColor="text-sand" />
                </span>
                <span className="text-lead text-stone">{v.dek}</span>
                <span className="self-start">
                  <VideoBadge video={v} />
                </span>
              </span>
            </Link>
          </div>
        ))}
      </section>

      {/* Number of the week + analysis */}
      <section className="bg-sand py-20 lg:py-24" aria-labelledby="haftaning-raqami">
        <div className="page flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-col gap-4 lg:flex-1">
            <h2 id="haftaning-raqami" className="label text-ink-soft m-0">
              Haftaning raqami
            </h2>
            <p className="figure text-forest m-0 text-[5.5rem] leading-[0.85] tracking-[-0.06em] md:text-[8.5rem] lg:text-[11.25rem]">
              {n.value.split(",")[0]}
              <span className="-mx-[0.12em]">,</span>
              {n.value.split(",")[1]}
              <span className="text-[0.4em]">{n.unit}</span>
            </p>
            <p className="text-ink-soft m-0 max-w-[30rem] font-sans text-[0.9375rem] leading-relaxed">
              {n.label}
            </p>
            <p className="text-small text-ink-soft m-0 font-sans">{n.source}</p>
          </div>
          <article className="flex flex-col gap-5 lg:flex-1">
            <Kicker story={n.story} />
            <h3 className="text-h2 m-0">
              <Link href={storyHref(n.story)} className="link-quiet">
                <Headline title={n.story.title} accent={n.story.accent} accentColor="" />
              </Link>
            </h3>
            <p className="text-lead text-ink-soft m-0">{n.story.dek}</p>
            <Link
              href={storyHref(n.story)}
              className="text-ui text-forest py-2 font-sans font-semibold"
            >
              Tahlilni oʻqish →
            </Link>
          </article>
        </div>
      </section>

      {/* Guides */}
      <section
        className="page pt-section flex flex-col gap-10 lg:flex-row lg:gap-20"
        aria-labelledby="qollanmalar"
      >
        <div className="flex flex-col gap-3.5 lg:flex-1">
          <h2 id="qollanmalar" className="text-section m-0">
            Qoʻllanmalar
          </h2>
          <p className="text-lead text-ink-soft m-0 italic">
            Qaror oldidan oʻqiladigan qisqa, amaliy matnlar.
          </p>
          <Link href="/qollanmalar" className="text-ui text-forest mt-2 font-sans font-medium">
            Barcha qoʻllanmalar →
          </Link>
        </div>
        <ul className="grid md:grid-cols-2 md:gap-x-14 lg:flex-[2]">
          {guides.map((g) => (
            <li key={g.slug} className="border-rule border-t">
              <Link href={storyHref(g)} className="group flex flex-col gap-2.5 py-6 no-underline">
                <span className="text-h4 group-hover:underline">
                  <Headline title={g.title} accent={g.accent} accentColor="" />
                </span>
                <span className="leader text-small text-ink-muted font-sans">
                  <span>{g.format}</span>
                  <span className="leader-dots" aria-hidden="true" />
                  <span className="figure">{readingMinutes(g.body)} daq</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter */}
      <section id="haftalik-xat" className="page pt-section scroll-mt-8" aria-labelledby="xat">
        <div className="bg-forest text-paper flex flex-col gap-10 px-6 py-12 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-[4.5rem] lg:py-16">
          <div className="flex flex-col gap-3.5 lg:flex-1">
            <p className="label text-sand m-0">Haftalik xat · har yakshanba</p>
            <h2 id="xat" className="text-h2 m-0">
              Hafta haqida — <em>bitta xatda</em>
            </h2>
            <p className="text-lead text-sand m-0">
              Eng muhim maqolalar, bitta raqam va bitta maslahat. Reklamasiz.
            </p>
          </div>
          <form className="flex flex-col gap-2 font-sans lg:flex-1" aria-describedby="xat-holati">
            <fieldset disabled className="m-0 flex flex-col gap-2 border-0 p-0">
              <label htmlFor="xat-email" className="text-small font-medium">
                Elektron pochta
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
                <input
                  id="xat-email"
                  type="email"
                  placeholder="ism@pochta.uz"
                  className="border-paper text-paper placeholder:text-stone h-[3.25rem] min-w-0 flex-1 border bg-transparent px-4 text-base disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  className="bg-paper text-forest h-[3.25rem] cursor-not-allowed border-0 px-6 text-[0.9375rem] font-semibold"
                >
                  Obuna boʻlish
                </button>
              </div>
            </fieldset>
            <p id="xat-holati" className="text-small text-sand m-0">
              Obuna hali ochilmagan — tez orada.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
