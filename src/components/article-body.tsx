import type { ReactNode } from "react";
import type { Article, Block } from "@/content";
import { slugify } from "@/lib/format";
import { GraphicBlock } from "./graphics";

/** The placeholder the authors left for the expert's name: "….." */
const MISSING = "…..";

type TextBlock = Extract<Block, { text: string }>;

/**
 * Inline text: **bold** and *italic* exactly as in the original file.
 * A missing name ("…..") is shown as a visible editorial placeholder.
 */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|…\.\.|https?:\/\/[^\s;]+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = out.length;
    if (m[1] !== undefined)
      out.push(
        <strong key={k}>
          <Inline text={m[1]} />
        </strong>,
      );
    else if (m[2] !== undefined)
      out.push(
        <em key={k}>
          <Inline text={m[2]} />
        </em>,
      );
    else if (m[0] === MISSING)
      out.push(
        <span
          key={k}
          className="placeholder"
          title="Tahririyat ekspertning ismi va lavozimini qoʻshadi"
        >
          <span aria-hidden="true">{MISSING}</span>
          <span>ekspert ismi va lavozimi kiritilmagan</span>
        </span>,
      );
    else
      out.push(
        <a key={k} href={m[0]} rel="noopener noreferrer" target="_blank" className="break-all">
          {m[0]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function headings(article: Article) {
  return article.body
    .filter((b) => b.type === "h2")
    .map((b) => {
      const text = (b as TextBlock).text;
      return { id: slugify(text), text };
    });
}

/** Renders the article exactly as written, with infographics in between. */
export function ArticleBody({ article }: { article: Article }) {
  // Drop cap on the first paragraph — unless it opens with initials ("D. Y.")
  const first = article.body.findIndex((b) => b.type === "p");
  const firstText = first >= 0 ? (article.body[first] as { text: string }).text : "";
  const dropCapAt = /^\S\.\s/.test(firstText) || firstText.startsWith("*") ? -1 : first;
  return (
    <div className="article-body">
      {article.body.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "quote":
            return (
              <blockquote key={i} className="quote m-0">
                <p>
                  <Inline text={b.text} />
                </p>
              </blockquote>
            );
          case "speech":
            return (
              <p key={i} className="speech">
                <Inline text={b.text} />
              </p>
            );
          case "note":
            return (
              <p key={i} className="note">
                <Inline text={b.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((t) => (
                  <li key={t}>
                    <Inline text={t} />
                  </li>
                ))}
              </ul>
            );
          case "graphic":
            return <GraphicBlock key={i} g={b} />;
          default: {
            if (i !== dropCapAt) {
              return (
                <p key={i}>
                  <Inline text={b.text} />
                </p>
              );
            }
            // "Oʻ" and "Gʻ" are one letter in Uzbek — keep them together in the drop cap
            const letter = b.text.match(/^\p{L}[ʻʼ]?/u)?.[0] ?? "";
            return (
              <p key={i}>
                <span className="dropcap">{letter}</span>
                <Inline text={b.text.slice(letter.length)} />
              </p>
            );
          }
        }
      })}
    </div>
  );
}
