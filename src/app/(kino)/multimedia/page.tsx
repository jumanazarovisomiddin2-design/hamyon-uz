import type { Metadata } from "next";
import { VideoCard } from "@/components/video-parts";
import { videos } from "@/content";

export const metadata: Metadata = {
  title: "Multimedia",
  description: "HAMYON.UZ videolari: nasiya, kredit va kundalik pul haqida.",
  alternates: { canonical: "/multimedia" },
};

export default function MultimediaPage() {
  return (
    <div className="page pt-10 md:pt-14 lg:pt-20">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="label text-stone m-0">Boʻlim</p>
          <h1 className="text-display m-0 font-serif">Multimedia</h1>
        </div>
        <p className="text-lead text-stone m-0 max-w-[30rem] font-serif">
          Videolar va vizual hikoyalar. Har bir video yonida — shu mavzudagi maqola va video
          ssenariysi.
        </p>
      </header>

      <div className="mt-12 grid gap-16 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
        {videos.map((v, i) => (
          <div key={v.slug} className={i === 0 ? "lg:col-span-8" : "lg:col-span-6 lg:col-start-7"}>
            <VideoCard video={v} large={i === 0} level="h2" />
          </div>
        ))}
      </div>
    </div>
  );
}
