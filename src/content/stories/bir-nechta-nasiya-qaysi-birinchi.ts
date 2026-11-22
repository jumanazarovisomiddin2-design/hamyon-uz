import type { Story } from "../types";

/* Matn: tahririyat. Tahrirlash uchun faqat qoʻshtirnoq ichidagi matnni oʻzgartiring. */
export const story: Story = {
  ...{
    slug: "bir-nechta-nasiya-qaysi-birinchi",
    section: "qollanmalar",
    format: "Qoʻllanma",
    topic: "Kredit va qarz",
    title: "Bir nechta nasiya: qaysi qarzni birinchi yopish kerak?",
    accent: "birinchi",
    dek: "«Qor toʻpi» yoki avval eng qimmati — ikki usul, ikki xil natija.",
    author: "Tahririyat",
    publishedAt: "2026-11-19",
    keyTakeaway:
      "Usulni tanlashdan oldin har bir qarzning jami toʻlovi va yillik stavkasini yozib chiqing.",
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
Bir vaqtning oʻzida ikki, uch yoki undan koʻp nasiya — bugun odatiy holat. Markaziy bank maʼlumotiga koʻra, 2024-yilda bir kishiga oʻrtacha uchta nasiya shartnomasi toʻgʻri kelgan. Qarzlardan qutulishning ikki asosiy usuli bor.

## 1. «Qor toʻpi»: avval eng kichigi

Ekspertimiz avval eng kichik qarzni toʻliq yopishni tavsiya qiladi:

> Bitta kreditdan boʻlsa ham qutulsa, bu psixologik motivatsiya beradi. Keyin qolganlarini oyma-oy toʻlab borishni yoʻlga qoʻyadi.
> — Ekspertimiz

Qolgan qarzlar boʻyicha minimal toʻlovlarni davom ettirasiz, ortiqcha pulni esa eng kichik qarzga yoʻnaltirasiz. U yopilgach — keyingisiga.

## 2. Avval eng qimmati

Muqobil usul — avval yillik stavkasi eng yuqori qarzni yopish. Bu usul jami ortiqcha toʻlovni koʻproq kamaytiradi, ammo natijasi kechroq seziladi.

## Qaysi birini tanlash kerak

Qaysi biri qulayligi odamning oʻziga bogʻliq. Lekin ikkala holatda ham avval har bir qarzning haqiqiy narxini bilish kerak: har bir shartnoma uchun jami toʻlovni va yillik stavkani yozib chiqing.

:::note
Nasiyani muddatidan oldin yopish har doim ham tejamaydi: hozirgi amaliyotda ustama boshidan belgilanadi. 2027-yildan muddatidan oldin toʻlash jarimasiz boʻladi, lekin ustama qayta hisoblanishini shartnomadan aniqlang.
:::
`,
};
