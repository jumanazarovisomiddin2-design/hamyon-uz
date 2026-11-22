import type { Story } from "../types";

/* Matn: tahririyat. Tahrirlash uchun faqat qoʻshtirnoq ichidagi matnni oʻzgartiring. */
export const story: Story = {
  ...{
    slug: "foizsiz-nasiyani-tekshirish",
    section: "qollanmalar",
    format: "Qoʻllanma",
    topic: "Narxlar",
    title: "«Foizsiz» nasiyani bir daqiqada qanday tekshirish mumkin",
    accent: "bir daqiqada",
    dek: "Naqd chegirma haqida bitta savol «0%» yozuvi ortidagi haqiqiy narxni koʻrsatadi.",
    author: "Tahririyat",
    publishedAt: "2026-11-22",
    keyTakeaway: "Naqd toʻlovga chegirma bormi? Boʻlsa, «foizsiz» nasiya aslida foizli.",
    sources: [
      {
        title:
          "S. Agzamov. «Haqiqatdan ham nasiya bozori foizsizmi? Oʻzbekistonda nasiya bozori tahlili». Oʻzbekiston Respublikasi Markaziy banki, Statistika va tadqiqotlar departamenti, 2025 (muallif fikri; Markaziy bankning rasmiy pozitsiyasi bilan mos tushmasligi mumkin)",
      },
      {
        title: "«Nasiya foizsiz xaridmi yoki yashirin qimmat kredit?» — HAMYON.UZ tahlili asosida",
      },
    ],
  },
  body: `
Oʻzbekistonda «foizsiz» yozuvi ortida koʻpincha oshirilgan narx turadi. Foiz yoʻq, lekin narx boshqacha boʻlishi mumkin. Buni bir daqiqada tekshirishning oddiy usuli bor — sotuvchidan naqd chegirma haqida soʻrang.

## Naqd chegirmani soʻrang

Faraz qilaylik, 3 mln soʻmlik telefon 12 oyga, oyiga 250 ming soʻmdan, «0%» bilan sotilmoqda. Agar oʻsha doʻkon naqd toʻlovga 10% chegirma bersa, telefonning haqiqiy narxi 2,7 mln soʻm.

:::calc «0%» nasiya · namuna
Naqd narx (10% chegirma bilan) | 2 700 000 soʻm
Nasiya: 250 000 soʻm × 12 oy | 3 000 000 soʻm
---
= Ortiqcha toʻlov | 300 000 soʻm
= Samarali yillik stavka | ≈ 22%
:::

## Bozordagi narx bilan solishtiring

Markaziy bank keltirgan misolda Idea doʻkonida iPhone 16 Pro 128GB 6 oylik «ortiqcha toʻlovsiz» nasiyaga 21 990 000 soʻmdan (oyiga 3 665 000 soʻm) taklif qilingan. Regulyator hisobiga koʻra, bu narx bozordagi oʻrtacha 14,4 mln soʻmdan 52,4% yuqori boʻlgan.

## Qachon foizsiz nasiya haqiqatan foydali

Agar naqd narx bilan nasiya narxi haqiqatan ham bir xil boʻlsa va boshqa toʻlovlar boʻlmasa, foizsiz nasiya xaridor uchun foydali boʻlishi mumkin: siz pulni keyinroq toʻlaysiz, inflyatsiya esa kelajakdagi toʻlovlarning real qiymatini biroz kamaytiradi.
`,
};
