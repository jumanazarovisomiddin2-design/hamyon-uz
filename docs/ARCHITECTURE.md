# Architecture — sections, addresses and content model

This is the plan the site will be built against. Nothing here is built yet beyond the foundation;
it exists so every later stage fits together.

## Sections and web addresses

| Section          | Address               | What lives there                                   |
| ---------------- | --------------------- | -------------------------------------------------- |
| Bosh sahifa      | `/`                   | Editorial front page, curated by the editors       |
| Maqolalar        | `/maqolalar`          | Reported articles, essays, explainers              |
| — single article | `/maqolalar/[slug]`   |                                                    |
| Videolar         | `/videolar`           | Video essays and short videos                      |
| — single video   | `/videolar/[slug]`    |                                                    |
| Tahlil           | `/tahlil`             | Data analysis, statistics, infographics            |
| — single piece   | `/tahlil/[slug]`      |                                                    |
| Qoʻllanmalar     | `/qollanmalar`        | Practical guides and checklists                    |
| — single guide   | `/qollanmalar/[slug]` |                                                    |
| Mavzu (topic)    | `/mavzu/[slug]`       | Everything on one topic, e.g. `/mavzu/nasiya`      |
| Muallif (author) | `/muallif/[slug]`     | An author's profile and their work                 |
| Biz haqimizda    | `/biz-haqimizda`      | About, editorial principles, independence, contact |
| Content editor   | `/studio`             | Sanity Studio — private, for the editorial team    |

`[slug]` is the short, readable name of a piece, e.g. `/maqolalar/nasiya-qanday-ishlaydi`.

## Content model (for the CMS stage)

### Article — `article`

One type covers articles, analysis and guides, distinguished by **format**, so they share one
editor and one set of tools.

- **Format**: Maqola · Tahlil · Qoʻllanma · Tushuntirish (explainer) · Checklist
- Title, slug, lead/dek (one or two sentences under the headline)
- Cover image + caption + photo credit; optional cover style (photo, illustration, typographic)
- Topics (one main topic + optional extra), authors
- Published date, last updated date
- **Body** — rich text with blocks: images, pull quotes, callout boxes, charts/infographics, data
  tables, checklists, embedded video, "key numbers" boxes, footnotes
- Sources list (important for trust)
- SEO overrides (title, description, social image) — optional

### Video — `video`

- Title, slug, lead, format (video essay · short · interview)
- Video link (YouTube to start; self-hosted later if needed), duration
- Cover image, topics, authors, published date
- Description / transcript (rich text — good for search engines and accessibility)
- Related articles

### Supporting types

- **Topic** (`topic`) — name, slug, short description, colour accent. Starting list: Nasiya,
  Kredit va qarz, BNPL, Jamgʻarma, Xarajatlar, Narxlar va inflyatsiya, Isteʼmolchi huquqlari,
  Bozor, Moliyaviy savodxonlik.
- **Author** (`author`) — name, slug, photo, role, short bio, links.
- **Site settings** (`settings`) — homepage curation (lead story, featured pieces), navigation,
  footer text, social links.

## Code structure (as it grows)

```
src/
├── app/            pages and web addresses
├── components/     reusable pieces of the design (header, article card, etc.)
├── lib/            settings and helpers (site.ts, date formatting, etc.)
└── sanity/         CMS connection, content schemas, queries (CMS stage)
```
