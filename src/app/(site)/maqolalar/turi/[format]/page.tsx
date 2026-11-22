import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleIndex } from "@/components/article-index";
import { formats, type FormatKey } from "@/content";

export function generateStaticParams() {
  return formats.map((f) => ({ format: f.key }));
}

export async function generateMetadata({
  params,
}: PageProps<"/maqolalar/turi/[format]">): Promise<Metadata> {
  const { format } = await params;
  const f = formats.find((x) => x.key === format);
  if (!f) return {};
  return {
    title: `${f.plural} — Maqolalar`,
    description: `HAMYON.UZ maqolalari: ${f.plural.toLowerCase()}.`,
    alternates: { canonical: `/maqolalar/turi/${f.key}` },
  };
}

export default async function FormatPage({ params }: PageProps<"/maqolalar/turi/[format]">) {
  const { format } = await params;
  if (!formats.some((f) => f.key === format)) notFound();
  return <ArticleIndex active={format as FormatKey} />;
}
