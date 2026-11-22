import type { PhotoBrief, Story } from "@/content";
import { formatDateShort, readingMinutes } from "@/lib/format";

/** The headline with its one accent phrase in terracotta italic. */
export function Headline({
  title,
  accent,
  accentColor = "text-terracotta",
}: {
  title: string;
  accent?: string;
  accentColor?: string;
}) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const [before, ...rest] = title.split(accent);
  return (
    <>
      {before}
      <em className={accentColor}>{accent}</em>
      {rest.join(accent)}
    </>
  );
}

/** "Nasiya · Tahlil" */
export function Kicker({ story, className = "" }: { story: Story; className?: string }) {
  return (
    <p className={`kicker m-0 ${className}`}>
      {story.topic} · {story.format}
    </p>
  );
}

/** "Tahririyat  17.11.2026 · 9 daq" */
export function Meta({ story, className = "" }: { story: Story; className?: string }) {
  return (
    <p
      className={`text-small text-ink-muted m-0 flex flex-wrap items-baseline gap-x-3 font-sans ${className}`}
    >
      <span>{story.author}</span>
      <span className="figure text-[0.78rem]">
        {formatDateShort(story.publishedAt)} · {readingMinutes(story.body)} daq
      </span>
    </p>
  );
}

const tones: Record<number, string> = {
  1: "bg-photo-1",
  2: "bg-photo-2",
  3: "bg-photo-3",
  4: "bg-photo-4",
  5: "bg-photo-5",
};

/**
 * A documentary photo that has not been taken yet.
 * Clearly marked as a placeholder, with the brief for the photographer.
 */
export function PhotoPlaceholder({
  photo,
  className = "",
  compact = false,
}: {
  photo: PhotoBrief;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Foto oʻrni: ${photo.brief}`}
      className={`text-paper flex flex-col justify-between ${tones[photo.tone ?? 1]} ${className}`}
    >
      <span className="figure p-3 text-[0.65rem] tracking-[0.12em] opacity-90 md:p-4">
        FOTO KERAK · {photo.shot.toUpperCase()}
      </span>
      {!compact && (
        <span className="text-small max-w-[26rem] p-3 pt-0 font-sans md:p-4 md:pt-0">
          {photo.brief}
        </span>
      )}
    </div>
  );
}
