import type { Metadata } from "next";
import { Wordmark } from "@/components/wordmark";

/**
 * Internal living style guide: every colour, type style and reusable piece
 * in one place. Not linked from the site and hidden from search engines.
 */
export const metadata: Metadata = {
  title: "Dizayn tizimi",
  robots: { index: false, follow: false },
};

const colours = [
  {
    name: "Qogʻoz",
    token: "paper",
    hex: "#F6F1E7",
    role: "Asos — har ekranning ~70%",
    cls: "bg-paper border border-rule",
  },
  {
    name: "Koʻmir",
    token: "charcoal",
    hex: "#211F1B",
    role: "Matn; video kino-bloklari",
    cls: "bg-charcoal",
  },
  {
    name: "Oʻrmon",
    token: "forest",
    hex: "#1E3A2C",
    role: "Logotip, havolalar, haftalik xat",
    cls: "bg-forest",
  },
  { name: "Qum", token: "sand", hex: "#E3D4B6", role: "Tahlil bloklari", cls: "bg-sand" },
  {
    name: "Terrakota",
    token: "terracotta",
    hex: "#A9472A",
    role: "Bitta urgʻu: rubrika, kursiv soʻz, raqam",
    cls: "bg-terracotta",
  },
  {
    name: "Jez",
    token: "brass",
    hex: "#9C7D3C",
    role: "Faqat ingichka chiziq va belgi",
    cls: "bg-brass",
  },
  {
    name: "Siyoh (yumshoq)",
    token: "ink-soft",
    hex: "#3A3631",
    role: "Lid va ikkinchi darajali matn",
    cls: "bg-ink-soft",
  },
  {
    name: "Siyoh (xira)",
    token: "ink-muted",
    hex: "#5C5650",
    role: "Meta, izoh, yorliq",
    cls: "bg-ink-muted",
  },
  {
    name: "Chiziq",
    token: "rule",
    hex: "#D6CBB5",
    role: "Qogʻozdagi ajratgichlar",
    cls: "bg-rule",
  },
  {
    name: "Nuqta",
    token: "dots",
    hex: "#8A837A",
    role: "Perforatsiya va nuqtali yoʻlak",
    cls: "bg-dots",
  },
  {
    name: "Tosh",
    token: "stone",
    hex: "#CFC6B4",
    role: "Koʻmir ustidagi ikkinchi matn",
    cls: "bg-stone",
  },
];

const typeStyles = [
  {
    token: "text-display-xl",
    spec: "Serif 500 · 46→112",
    sample: "Nasiya qanday qilib odatga aylandi",
    cls: "text-display-xl",
  },
  {
    token: "text-display",
    spec: "Serif 500 · 48→100",
    sample: "Pulni tushunish — erkinlik",
    cls: "text-display",
  },
  {
    token: "text-h1",
    spec: "Serif 500 · 38→76",
    sample: "Malika bozorida bir kun",
    cls: "text-h1",
  },
  {
    token: "text-h2",
    spec: "Serif 500 · 30→56",
    sample: "Bir yilda bozor savati qanday oʻzgardi",
    cls: "text-h2",
  },
  { token: "text-section", spec: "Serif 500 · 30→44", sample: "Bu hafta", cls: "text-section" },
  {
    token: "text-h3",
    spec: "Serif 500 · 23→34",
    sample: "Jamgʻarishni nimadan boshlash kerak",
    cls: "text-h3",
  },
  {
    token: "text-h4",
    spec: "Serif 500 · 20→26",
    sample: "Nasiya shartnomasini birga oʻqiymiz",
    cls: "text-h4",
  },
  {
    token: "text-dek",
    spec: "Serif kursiv · 19→28",
    sample: "Bu qulaylikmi yoki yangi qarz madaniyati?",
    cls: "text-dek italic text-ink-soft",
  },
  {
    token: "text-body",
    spec: "Serif 400 · 18.5→21 / 1.65",
    sample:
      "Toshkentdagi istalgan elektronika doʻkoniga kiring: narx yorligʻidan oldin koʻzingizga oylik toʻlov tushadi. Ўзбекча: қарз, ғалла, ҳамён.",
    cls: "text-body max-w-(--container-reading)",
  },
  {
    token: "text-ui",
    spec: "Commissioner 500 · 15.5",
    sample: "Maqolalar · Videolar · Tahlil · Qoʻllanmalar",
    cls: "text-ui font-sans font-medium",
  },
  {
    token: "text-small",
    spec: "Commissioner · 13.5",
    sample: "Foto: [fotograf] / HAMYON.UZ",
    cls: "text-small font-sans text-ink-muted",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-band">
      <h2 className="text-section m-0 mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="page pt-band">
      <p className="label m-0">Ichki sahifa · qidiruv tizimlariga koʻrinmaydi</p>
      <h1 className="text-h1 mt-5 mb-5">
        Dizayn <em className="text-terracotta">tizimi</em>
      </h1>
      <p className="text-dek text-ink-soft m-0 max-w-[40rem] italic">
        «Chek» yoʻnalishi: jurnal tipografikasi, keng boʻshliq, chekdan olingan nozik ishoralar.
      </p>

      <Section title="Ranglar">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {colours.map((c) => (
            <li key={c.token} className="flex flex-col gap-2 font-sans">
              <div className={`h-20 ${c.cls}`} />
              <span className="text-ui font-semibold">{c.name}</span>
              <span className="figure text-ink-muted text-xs">
                {c.token} · {c.hex}
              </span>
              <span className="text-small text-ink-soft">{c.role}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografika">
        <ul className="flex flex-col">
          {typeStyles.map((t) => (
            <li
              key={t.token}
              className="border-rule grid gap-3 border-t py-7 lg:grid-cols-[14rem_1fr] lg:gap-10"
            >
              <div className="flex flex-col gap-1">
                <span className="figure text-sm">{t.token}</span>
                <span className="text-small text-ink-muted font-sans">{t.spec}</span>
              </div>
              <p className={`m-0 ${t.cls}`}>{t.sample}</p>
            </li>
          ))}
          <li className="border-rule grid gap-3 border-t py-7 lg:grid-cols-[14rem_1fr] lg:gap-10">
            <div className="flex flex-col gap-1">
              <span className="figure text-sm">kicker · label</span>
              <span className="text-small text-ink-muted font-sans">
                Commissioner 600 · 12 · katta harf
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <span className="kicker">Nasiya · Katta maqola</span>
              <span className="label">Ushbu maqolada</span>
            </div>
          </li>
          <li className="border-rule grid gap-3 border-t py-7 lg:grid-cols-[14rem_1fr] lg:gap-10">
            <div className="flex flex-col gap-1">
              <span className="figure text-sm">figure</span>
              <span className="text-small text-ink-muted font-sans">
                IBM Plex Mono · faqat raqamlar
              </span>
            </div>
            <span className="figure text-xl">4 999 000 soʻm · 18:24 · 22.11.2026 · 9 daq</span>
          </li>
        </ul>
      </Section>

      <Section title="Chek izlari — kam-kam, bir ekranda ikkitadan koʻp emas">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="label">1 · Perforatsiya — yirik boʻlimlar orasida</span>
            <hr className="perforation mt-4" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">2 · Nuqtali yoʻlak — roʻyxat, mundarija, boblar</span>
            <p className="leader text-h4 m-0 mt-2">
              <span>«Foizsiz» nasiyaning haqiqiy narxi</span>
              <span className="leader-dots" aria-hidden="true" />
              <span className="figure text-ink-muted text-sm">6 daq</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">3 · Mono raqamlar</span>
            <span className="figure text-[2rem]">
              24 <span className="text-ink-muted text-base">oy</span> × 208 292
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">4 · «.uz» — logotipda</span>
            <Wordmark />
          </div>
        </div>
      </Section>

      <Section title="Komponentlar">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="label">Sarlavha bloki</span>
            <span className="kicker">Isteʼmolchi huquqlari</span>
            <a href="#" className="text-h3 link-quiet">
              Kafolat muddatida buzilgan tovar: <em>nima qilish kerak</em>
            </a>
            <p className="text-lead text-ink-soft m-0">
              Doʻkon «bizda qaytarilmaydi» desa, qonun nima deydi.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="label">Tugmalar</span>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn">
                Haftalik xat
              </button>
              <button type="button" className="btn btn-solid">
                Obuna boʻlish
              </button>
            </div>
            <div className="bg-charcoal text-paper mt-2 flex flex-wrap gap-3 p-6">
              <button type="button" className="btn">
                Matnini oʻqish
              </button>
              <button
                type="button"
                className="btn bg-paper text-charcoal border-paper font-semibold"
              >
                Ulashish
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="label">Logotip</span>
            <div className="flex flex-wrap items-end gap-10">
              <Wordmark size="lg" />
              <Wordmark />
              <Wordmark size="sm" />
            </div>
            <div className="bg-charcoal p-6">
              <Wordmark tone="dark" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="label">Maket</span>
            <p className="text-small text-ink-soft m-0 font-sans">
              Eng keng kenglik 1440 px. Yon chekkalar telefonda 20 px, kompyuterda 80 px. Yirik
              boʻlimlar orasida 72–150 px boʻshliq. Maqola matni 700 px dan kengaymaydi.
            </p>
            <div className="border-dots text-ink-muted flex h-24 items-center justify-center border border-dashed font-sans text-sm">
              page · px-gutter · py-section · max-w-reading
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
