import type { Metadata } from "next";
import { SectionHeader, SectionLead, StoryRow } from "@/components/section-parts";
import { sectionInfo, storiesIn } from "@/content";

const info = sectionInfo.maqolalar;

export const metadata: Metadata = { title: info.title, description: info.description };

export default function Page() {
  const [lead, ...rest] = storiesIn("maqolalar");
  return (
    <>
      <SectionHeader
        title={info.title}
        description={info.description}
        count={rest.length + 1}
        tone="paper"
      />
      <div className="page pt-12 lg:pt-16">
        <SectionLead story={lead} />
        {rest.length > 0 && (
          <div className="mt-16 lg:mt-24">
            {rest.map((s) => (
              <StoryRow key={s.slug} story={s} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
