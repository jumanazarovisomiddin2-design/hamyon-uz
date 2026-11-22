import { Fragment, type ReactNode } from "react";
import { FigureValue } from "@/components/figure-value";
import { slugify } from "./format";

/*
 * Article text format (simple and readable — replaced by the CMS editor in stage 4)
 *
 *   Paragraph text with **bold**, *italic* and [links](https://…)
 *   ## Section heading            ### Sub-heading
 *   > Quoted words                > — Who said it
 *   >> Pull quote (large, set apart)
 *   - Bullet item                 1. Numbered item
 *   :::calc Title                 label | value      ---  (perforation)    = total | value
 *   :::table Caption              first row = column names; "src: …" = source line
 *   :::figures                    value | what it means
 *   :::checklist                  one item per line
 *   :::note                       short side note
 *   :::                           (closes a block)
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "pull"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | {
      type: "calc";
      title: string;
      rows: ({ label: string; value: string; total?: boolean } | "rule")[];
    }
  | { type: "table"; caption: string; head: string[]; rows: string[][]; source?: string }
  | { type: "figures"; items: { value: string; label: string }[] }
  | { type: "checklist"; items: string[] }
  | { type: "note"; text: string };

export function parseBody(src: string): Block[] {
  const lines = src.trim().split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith(":::")) {
      const [kind, ...rest] = line.slice(3).split(" ");
      const title = rest.join(" ").trim();
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        if (lines[i].trim()) inner.push(lines[i].trim());
        i++;
      }
      i++; // closing :::
      const cells = (l: string) => l.split("|").map((c) => c.trim());

      if (kind === "calc") {
        blocks.push({
          type: "calc",
          title,
          rows: inner.map((l) => {
            if (l === "---") return "rule";
            const total = l.startsWith("=");
            const [label, value] = cells(total ? l.slice(1) : l);
            return { label, value, total };
          }),
        });
      } else if (kind === "table") {
        const source = inner
          .find((l) => l.startsWith("src:"))
          ?.slice(4)
          .trim();
        const rows = inner.filter((l) => !l.startsWith("src:")).map(cells);
        blocks.push({ type: "table", caption: title, head: rows[0], rows: rows.slice(1), source });
      } else if (kind === "figures") {
        blocks.push({
          type: "figures",
          items: inner.map((l) => {
            const [value, label] = cells(l);
            return { value, label };
          }),
        });
      } else if (kind === "checklist") {
        blocks.push({ type: "checklist", items: inner });
      } else if (kind === "note") {
        blocks.push({ type: "note", text: inner.join(" ") });
      }
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3);
      blocks.push({ type: "h2", text, id: slugify(text) });
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith(">> ")) {
      blocks.push({ type: "pull", text: line.slice(3) });
    } else if (line.startsWith("> ")) {
      const parts: string[] = [];
      let cite: string | undefined;
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        const t = lines[i].trim().slice(2);
        if (t.startsWith("— ")) cite = t.slice(2);
        else parts.push(t);
        i++;
      }
      blocks.push({ type: "quote", text: parts.join(" "), cite });
      continue;
    } else if (/^(- |1\. )/.test(line)) {
      const ordered = line.startsWith("1. ");
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (/^(- |1\. )/.test(t)) items.push(t.replace(/^(- |1\. )/, ""));
        else if (t !== "") break;
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    } else {
      blocks.push({ type: "p", text: line });
    }
    i++;
  }
  return blocks;
}

export function headings(src: string) {
  return parseBody(src).filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
}

/** **bold**, *italic*, [text](url) → React nodes. Everything else stays plain text. */
export function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1])
      parts.push(
        <strong key={k++} className="font-semibold">
          {m[1]}
        </strong>,
      );
    else if (m[2]) parts.push(<em key={k++}>{m[2]}</em>);
    else if (m[3])
      parts.push(
        <a key={k++} href={m[4]} className="text-forest underline">
          {m[3]}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, idx) => <Fragment key={idx}>{p}</Fragment>);
}

/** Renders article text. `dropCap` gives the first paragraph a large initial. */
export function Body({ src, dropCap = false }: { src: string; dropCap?: boolean }) {
  const blocks = parseBody(src);
  const first = blocks.findIndex((b) => b.type === "p");
  // No large initial when the text opens with initials such as "D. Y."
  const opensWithInitial = first >= 0 && /^\S\.\s/.test((blocks[first] as { text: string }).text);
  const dropCapAt = dropCap && !opensWithInitial ? first : -1;

  return (
    <div className="article-body">
      {blocks.map((b, idx) => {
        switch (b.type) {
          case "p":
            return (
              <p key={idx} className={idx === dropCapAt ? "dropcap" : undefined}>
                {inline(b.text)}
              </p>
            );
          case "h2":
            return (
              <h2 key={idx} id={b.id}>
                {inline(b.text)}
              </h2>
            );
          case "h3":
            return <h3 key={idx}>{inline(b.text)}</h3>;
          case "quote":
            return (
              <blockquote key={idx} className="quote">
                <p>«{inline(b.text)}»</p>
                {b.cite && <footer>— {b.cite}</footer>}
              </blockquote>
            );
          case "pull":
            return (
              <blockquote key={idx} className="pull">
                <p>
                  <span className="text-terracotta">«</span>
                  {inline(b.text)}
                  <span className="text-terracotta">»</span>
                </p>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={idx}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            );
          case "calc":
            return (
              <figure key={idx} className="calc">
                {b.title && <figcaption className="label text-charcoal">{b.title}</figcaption>}
                <dl>
                  {b.rows.map((r, j) =>
                    r === "rule" ? (
                      <hr key={j} className="perforation my-1.5" />
                    ) : (
                      <div key={j} className={`leader ${r.total ? "font-semibold" : ""}`}>
                        <dt>{inline(r.label)}</dt>
                        <span className="leader-dots" aria-hidden="true" />
                        <dd className={`figure m-0 ${r.total ? "text-terracotta" : ""}`}>
                          <FigureValue value={r.value} />
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </figure>
            );
          case "table":
            return (
              <figure key={idx} className="data-table">
                <figcaption className="label text-charcoal">{b.caption}</figcaption>
                <p className="swipe-hint">Jadvalni yon tomonga suring →</p>
                <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={b.caption}>
                  <table>
                    <thead>
                      <tr>
                        {b.head.map((h, j) => (
                          <th key={j} scope="col">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, j) => (
                        <tr key={j} className={r[0] === "Bank" ? "is-bank" : undefined}>
                          {r.map((c, k) => (
                            <td key={k} className={k >= 2 ? "figure" : undefined}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.source && <p className="source">{b.source}</p>}
              </figure>
            );
          case "figures":
            return (
              <div key={idx} className="key-figures">
                {b.items.map((f, j) => (
                  <div key={j}>
                    <p className="figure value">
                      <FigureValue value={f.value} unitClass="unit" />
                    </p>
                    <p className="what">{f.label}</p>
                  </div>
                ))}
              </div>
            );
          case "checklist":
            return (
              <ol key={idx} className="checklist">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <label>
                      <input type="checkbox" />
                      <span>{inline(it)}</span>
                    </label>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={idx} className="note">
                <p>{inline(b.text)}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
