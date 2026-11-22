# Architecture — sections, addresses and content model

Concept v2 (approved 2026-11-22): the site has **two sections**. Formats are filters inside
MAQOLALAR, not separate sections. The content model is implemented in `src/content/types.ts`.

## Sections and web addresses

| Page             | Address                    | What lives there                                                            |
| ---------------- | -------------------------- | --------------------------------------------------------------------------- |
| Bosh sahifa      | `/`                        | Six blocks: lead story, Vitrina, data story, Multimedia, series, newsletter |
| Maqolalar        | `/maqolalar`               | All written content                                                         |
| — by format      | `/maqolalar/turi/[format]` | `tahlil`, `tushuntirish`, `uzun-oqish`, `yangilik`                          |
| — single article | `/maqolalar/[slug]`        |                                                                             |
| Multimedia       | `/multimedia`              | Videos (later: motion, shorts, visual stories)                              |
| — single video   | `/multimedia/[slug]`       | Poster, status, script, related article                                     |
| Content editor   | `/studio`                  | Sanity Studio — CMS stage                                                   |
| Style guide      | `/dizayn-tizimi`           | Internal, not linked, not indexed                                           |

Old addresses redirect: `/tahlil` → `/maqolalar/turi/tahlil`, `/qollanmalar` → `/maqolalar`,
`/videolar` → `/multimedia` (see `next.config.ts`). `Biz haqimizda` and `Tahririyat tamoyillari`
are added to the footer once those pages are written.

## Content integrity (non-negotiable)

- Article texts are the authors' originals, word for word. Only typography changes
  (oʻ gʻ ʼ « », spaces). Bold/italic from the original file are kept.
- `content/originals/*.txt` is the reference copy of each original. `npm run check:content`
  (runs automatically before every build) fails if any sentence differs, is added or removed,
  if an infographic shows a number that is not in its article, or if an excerpt is not an exact
  quote.
- Infographics sit **beside** the text and never replace it.
- Missing information is shown as a visible placeholder (e.g. the expert's name in article 2).
- Video scripts are labelled as scripts, not transcripts.
- `scripts/import_sources.py` turned the original .docx/.pdf files into site content (one-time).

## Content model (for the CMS stage)

### Article — `article` (today: `src/content/articles/*.json`)

One type covers all written content, distinguished by **format**.

- **Format**: Tahlil · Tushuntirish · Uzun oʻqish · Yangilik
- Title (+ one accent phrase), slug, excerpt (an exact quote from the text)
- Cover image + caption + photo credit; optional cover style (photo, illustration, typographic)
- Topics (one main topic + optional extra), authors
- Published date, last updated date
- **Body** — paragraphs, headings, quotes, speech, lists, notes, and infographic blocks:
  price tag, payment schedule, bars, growth, composition, timeline, figures, before→after, receipt
- Sources list (important for trust)
- SEO overrides (title, description, social image) — optional

### Video — `video` (today: `src/content/videos.json`)

- Title, slug, lead, format (video essay · short · interview)
- Video link (YouTube to start; self-hosted later if needed), duration
- Cover image, topics, authors, published date
- Description (an exact quote from the script) and the script, labelled as a script
- Related articles

### Supporting types

- **Topic** (`topic`) — name, slug, short description, colour accent. Starting list: Nasiya,
  Kredit va qarz, BNPL, Jamgʻarma, Xarajatlar, Narxlar va inflyatsiya, Isteʼmolchi huquqlari,
  Bozor, Moliyaviy savodxonlik.
- **Author** (`author`) — name, slug, photo, role, short bio, links.
- **Site settings** (`settings`) — homepage curation (lead story, featured pieces), navigation,
  footer text, social links.

## Code structure

```
content/originals/  reference copies of the authors' texts (for the content check)
scripts/            import_sources.py (one-time importer), check-content.mjs (guard)
public/media/       video posters, 6-second silent previews, article covers
src/
├── app/(site)/     paper pages: home, MAQOLALAR
├── app/(kino)/     dark pages: MULTIMEDIA
├── components/     header, footer, graphics, article body, cards, motion
├── content/        articles/*.json, scripts/*.json, videos.json, types, helpers
├── lib/            site settings and small helpers
└── sanity/         CMS connection (CMS stage)
```
