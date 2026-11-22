/**
 * Temporary holding page. The real homepage is built in stage 3.
 */
export default function Home() {
  return (
    <section className="page pt-band pb-8">
      <div className="flex max-w-[60rem] flex-col gap-7">
        <p className="kicker m-0">Tayyorlanmoqda</p>
        <h1 className="text-display m-0">
          Pulni <em className="text-terracotta">tushunish</em> — erkinlik
        </h1>
        <p className="text-dek text-ink-soft m-0 max-w-[38rem] italic">
          Nasiya, qarz, jamgʻarma va kundalik xaridlar haqida mustaqil jurnal. Tez orada shu yerda.
        </p>
      </div>
    </section>
  );
}
