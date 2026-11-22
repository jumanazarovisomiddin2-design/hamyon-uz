import type { Metadata } from "next";
import { GuideRow, SectionHeader } from "@/components/section-parts";
import { sectionInfo, storiesIn } from "@/content";

const info = sectionInfo.qollanmalar;

export const metadata: Metadata = { title: info.title, description: info.description };

export default function Page() {
  const guides = storiesIn("qollanmalar");
  return (
    <>
      <SectionHeader title={info.title} description={info.description} count={guides.length} />
      <div className="page pt-4 lg:pt-8">
        <ol className="max-w-[60rem]">
          {guides.map((g, i) => (
            <GuideRow key={g.slug} story={g} index={i} />
          ))}
        </ol>
      </div>
    </>
  );
}
