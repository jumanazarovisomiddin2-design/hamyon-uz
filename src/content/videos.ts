import type { Video } from "./types";

/**
 * Videos. Both are planned in the "Nasiya sovgʻa emas" project and not yet
 * published — the site shows them as "Tez orada" (coming soon).
 * When a video is on YouTube: set status to "chiqdi", add youtubeId,
 * duration and chapters.
 */
export const videos: Video[] = [
  {
    slug: "nasiya-aslida-qancha-turadi",
    format: "Video-esse",
    topic: "Nasiya",
    title: "Nasiya aslida qancha turadi?",
    accent: "aslida",
    dek: "Talaba 7,5 mln soʻmlik telefonni 24 oyga oldi va 12 mln soʻm toʻlaydi. «30% ustama» qanday qilib yillik 65% ga aylanishini kamerada bosqichma-bosqich hisoblaymiz.",
    description:
      "Qahramonimiz — universitetda oʻqiydigan va oʻquv markazida dars beradigan talaba. Telefoni buzilgach, yangisini zudlik bilan nasiyaga oldi. Videoda uning shartnomasini, naqd narx, nasiya va bank krediti farqini hamda ustamaning yillik stavkaga qanday aylanishini koʻrsatamiz.",
    status: "tez-orada",
    publishedAt: "2026-11-22",
    covers: [
      "Qahramon: telefonni 24 oyga olgan talaba",
      "Naqd, nasiya va kredit: farqi nimada",
      "30% ustamadan 65,5% samarali stavkagacha",
      "Nasiya qachon oʻzini oqlaydi",
    ],
    frame: {
      shot: "Portret",
      tone: 2,
      brief:
        "Kadr: talaba oʻquv markazidagi stol ortida, qoʻlida telefon va nasiya shartnomasi. Kechki deraza yorugʻi.",
    },
    related: { section: "tahlil", slug: "foizsiz-nasiya-yashirin-kredit" },
  },
  {
    slug: "2027-yildan-nasiya-12-oy-50-foiz",
    format: "Tushuntirish",
    topic: "Isteʼmolchi huquqlari",
    title: "2027-yildan nasiya: 12 oy va 50% chegara",
    accent: "12 oy va 50%",
    dek: "PQ-294-son qaror nasiya bozorida nimani oʻzgartiradi: muddat, narx chegarasi, ustama va jarimalar, kredit byurosi — narx yorligʻi misolida.",
    description:
      "Yangi qoidalarni elektronika doʻkonidagi haqiqiy narx yorligʻi va shartnoma ustida tushuntiramiz: qaysi nasiya endi kredit hisoblanadi, ustama va jarimalar qanday cheklanadi va xaridor nimani soʻrashi kerak.",
    status: "tez-orada",
    publishedAt: "2026-11-22",
    covers: [
      "Nega tartib kerak boʻldi",
      "Kim operator hisoblanadi",
      "Sakkizta asosiy oʻzgarish",
      "Xaridor 2027-yilda nimaga eʼtibor berishi kerak",
    ],
    frame: {
      shot: "Detal",
      tone: 4,
      brief:
        "Kadr: doʻkon peshtaxtasidagi narx yorligʻi — katta oylik toʻlov va mayda naqd narx; qoʻl ularni bir-biriga solishtirmoqda.",
    },
    related: { section: "maqolalar", slug: "2027-yildan-nasiya-bozori" },
  },
];

export function getVideo(slug: string) {
  return videos.find((v) => v.slug === slug);
}
