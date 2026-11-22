import type { Story, StorySection } from "./types";
import { story as historyArticle } from "./stories/nasiyaning-tort-ming-yillik-yoli";
import { story as hiddenCost } from "./stories/foizsiz-nasiya-yashirin-kredit";
import { story as rules2027 } from "./stories/2027-yildan-nasiya-bozori";
import { story as fifteenOffers } from "./stories/bitta-telefon-15-ta-nasiya";
import { story as whoUses } from "./stories/nasiya-mijozi-kim";
import { story as fiveQuestions } from "./stories/nasiyadan-oldin-5-savol";
import { story as checkZero } from "./stories/foizsiz-nasiyani-tekshirish";
import { story as severalLoans } from "./stories/bir-nechta-nasiya-qaysi-birinchi";
import { story as rules2027Guide } from "./stories/2027-nasiya-xaridor-uchun-5-qoida";

export * from "./types";
export { videos, getVideo } from "./videos";

/** Every published story, newest first. */
export const stories: Story[] = [
  historyArticle,
  hiddenCost,
  rules2027,
  fifteenOffers,
  whoUses,
  fiveQuestions,
  checkZero,
  severalLoans,
  rules2027Guide,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Homepage choices — what the editors put first. */
export const frontPage = {
  lead: hiddenCost,
  weekly: [rules2027, fifteenOffers, historyArticle],
  numberOfTheWeek: {
    value: "72,6",
    unit: "×",
    label:
      "Nasiya shartnomalari soni ikki yilda shuncha baravar oshdi: 2023-yil fevralidagi 13,5 mingtadan 2024-yil dekabrida 973 mingtaga.",
    source: "Manba: Markaziy bank",
    story: whoUses,
  },
};

export const sectionInfo: Record<
  StorySection,
  { title: string; accent: string; description: string }
> = {
  maqolalar: {
    title: "Maqolalar",
    accent: "Maqolalar",
    description:
      "Nasiya, qarz va kundalik xaridlar haqida reportaj, tarix va tushuntirishlar — raqamlar bilan, sodda tilda.",
  },
  tahlil: {
    title: "Tahlil",
    accent: "Tahlil",
    description:
      "Rasmiy maʼlumotlar, narxlar va shartnomalar hisob-kitobi. Har bir raqamning manbasi koʻrsatiladi.",
  },
  qollanmalar: {
    title: "Qoʻllanmalar",
    accent: "Qoʻllanmalar",
    description: "Qaror oldidan oʻqiladigan qisqa, amaliy matnlar va checklistlar.",
  },
};

export function getStory(section: StorySection, slug: string) {
  return stories.find((s) => s.section === section && s.slug === slug);
}

export function storiesIn(section: StorySection) {
  return stories.filter((s) => s.section === section);
}

export function storyHref(s: Pick<Story, "section" | "slug">) {
  return `/${s.section}/${s.slug}`;
}

/** The numbered series these stories belong to, in reading order. */
export function seriesParts(name: string) {
  return stories
    .filter((s) => s.series?.name === name)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));
}
