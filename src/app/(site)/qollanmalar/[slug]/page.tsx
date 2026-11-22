import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryPage } from "@/components/story-page";
import { getStory, storiesIn } from "@/content";

export function generateStaticParams() {
  return storiesIn("qollanmalar").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/qollanmalar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory("qollanmalar", slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.dek,
    openGraph: {
      type: "article",
      title: story.title,
      description: story.dek,
      publishedTime: story.publishedAt,
    },
  };
}

export default async function Page({ params }: PageProps<"/qollanmalar/[slug]">) {
  const { slug } = await params;
  const story = getStory("qollanmalar", slug);
  if (!story) notFound();
  return <StoryPage story={story} />;
}
