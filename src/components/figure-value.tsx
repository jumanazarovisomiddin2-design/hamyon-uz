/**
 * A number with its unit: digits in the mono face (receipt hint), unit words
 * such as "soʻm", "oy", "mln" in the text face — the mono font spaces the ʻ widely.
 */
export function FigureValue({ value, unitClass = "" }: { value: string; unitClass?: string }) {
  const tokens = value.split(/(\s+)/);
  return (
    <>
      {tokens.map((t, i) =>
        /[a-zʻʼ]/i.test(t) || /^\s+$/.test(t) ? (
          <span key={i} className={`font-serif tracking-normal ${unitClass}`}>
            {t}
          </span>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  );
}
