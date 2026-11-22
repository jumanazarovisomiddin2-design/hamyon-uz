import type { Metadata } from "next";
import { ArticleIndex } from "@/components/article-index";

export const metadata: Metadata = {
  title: "Maqolalar",
  description:
    "Nasiya, kredit va kundalik pul haqida tahlillar, tushuntirishlar, uzun oʻqishlar va yangiliklar.",
  alternates: { canonical: "/maqolalar" },
};

export default function ArticlesPage() {
  return <ArticleIndex />;
}
