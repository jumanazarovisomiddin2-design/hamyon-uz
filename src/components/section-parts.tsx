import Link from "next/link";
import type { Story } from "@/content";
import { storyHref } from "@/content";
import { readingMinutes } from "@/lib/format";
import { Headline, Kicker, Meta, PhotoPlaceholder } from "./story-parts";

/** Section opening: name, one-line description, item count. */
export function SectionHeader({
  title,
  description,
  count,
  tone = "paper",
}: {
  title: string;
  description: string;
  count: number;
  tone?: "paper" | "sand" | "dark";
}) {
  const bg = tone === "sand" ? "bg-sand" : tone === "dark" ? "" : "";
  const muted = tone === "dark" ? "text-stone" : "text-ink-soft";
  return (
    <header className={bg}>
      <div className="page flex flex-col gap-6 pt-14 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-24 lg:pb-16">
        <h1 className="text-display m-0">{title}</h1>
        <div className="flex flex-col gap-3 lg:max-w-[28rem] lg:pb-2">
          <p className={`text-lead m-0 italic ${muted}`}>{description}</p>
          <p
            className={`figure m-0 text-[0.8125rem] ${tone === "dark" ? "text-stone" : "text-ink-muted"}`}
          >
            {count} ta material
          </p>
        </div>
      </div>
    </header>
  );
}

/** First story of a section: large, photo beside the text. */
export function SectionLead({ story }: { story: Story }) {
  return (
    <article className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-16">
      <div className="flex flex-col gap-5 lg:flex-[5] lg:pb-2">
        <Kicker story={story} />
        <h2 className="text-h1 m-0">
          <Link href={storyHref(story)} className="link-quiet">
            <Headline title={story.title} accent={story.accent} />
          </Link>
        </h2>
        <p className="text-dek text-ink-soft m-0 italic">{story.dek}</p>
        <Meta story={story} />
      </div>
      {story.photo && (
        <PhotoPlaceholder
          photo={story.photo}
          className="aspect-[4/3] lg:aspect-[5/4] lg:flex-[6]"
        />
      )}
    </article>
  );
}

/** A story in a section list: text left, photo right; rules between rows. */
export function StoryRow({ story }: { story: Story }) {
  return (
    <article className="border-rule grid gap-5 border-t py-8 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-10">
      <div className="flex flex-col gap-3.5">
        <Kicker story={story} />
        <h3 className="text-h3 m-0">
          <Link href={storyHref(story)} className="link-quiet">
            <Headline title={story.title} accent={story.accent} accentColor="" />
          </Link>
        </h3>
        <p className="text-lead text-ink-soft m-0 max-w-[40rem]">{story.dek}</p>
        <Meta story={story} />
      </div>
      {story.photo && (
        <PhotoPlaceholder
          photo={story.photo}
          compact
          className="order-first aspect-[3/2] md:order-none"
        />
      )}
    </article>
  );
}

/** Guide line: number, headline, format ······ minutes. */
export function GuideRow({ story, index }: { story: Story; index: number }) {
  return (
    <li className="border-rule border-t">
      <Link
        href={storyHref(story)}
        className="group grid grid-cols-[2.5rem_1fr] gap-4 py-7 no-underline md:grid-cols-[3.5rem_1fr]"
      >
        <span className="figure text-terracotta pt-1.5 text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex flex-col gap-3">
          <span className="text-h3 group-hover:underline">
            <Headline title={story.title} accent={story.accent} accentColor="" />
          </span>
          <span className="text-lead text-ink-soft">{story.dek}</span>
          <span className="leader text-small text-ink-muted max-w-[34rem] font-sans">
            <span>{story.format}</span>
            <span className="leader-dots" aria-hidden="true" />
            <span className="figure">{readingMinutes(story.body)} daq</span>
          </span>
        </span>
      </Link>
    </li>
  );
}
