# Architecture — pages and content

**Simple version (approved 2026-11-22):** a homepage with 3 articles and the videos (picture +
title), an article page and a video page. Nothing else.

| Page        | Address             | What it shows                                   |
| ----------- | ------------------- | ----------------------------------------------- |
| Bosh sahifa | `/`                 | 3 articles and the videos: picture + title      |
| Article     | `/maqolalar/[slug]` | Title, authors, picture, the full original text |
| Video       | `/videolar/[slug]`  | Title, authors, the full video (press play)     |

Authors (in `src/lib/site.ts`): Isomiddin Jumanazarov, Shohzodaxon Muzaffarova.
Earlier addresses (`/maqolalar`, `/multimedia/…`, `/tahlil`, `/qollanmalar`, `/videolar`, format
pages, the two news articles) redirect to the homepage or the matching page (`next.config.ts`).
Unknown article/video addresses return a real 404 (`src/proxy.ts`).

## Content integrity (non-negotiable)

- Article texts are the authors' originals, word for word. Only typography changes
  (oʻ gʻ ʼ « », spaces). Bold/italic from the original file are kept.
- `content/originals/*.txt` is the reference copy of each original. `npm run check:content`
  (runs automatically before every build) fails if any sentence differs, is added or removed,
  if an infographic shows a number that is not in its article, or if an excerpt is not an exact
  quote.
- Missing information is shown as a visible placeholder (e.g. the expert's name in article 2).
- Video scripts are labelled as scripts, not transcripts.
- `scripts/import_sources.py` turned the original .docx/.pdf files into site content (one-time).

## Content

- Articles: `src/content/articles/*.json` (title, picture, text blocks, sources).
- Videos: `src/content/videos.json` + files in `public/media/videolar/` (H.264/AAC 720p,
  "faststart" so they start quickly; 54 MB and 32 MB).
- `content/archive/` keeps material not on the site now (two news articles, video scripts).

## Code structure

```
content/originals/  reference copies of the authors' texts (for the content check)
content/archive/    material kept for later, not shown on the site
public/media/       article pictures, video files and posters
scripts/            check-content.mjs (guard), import_sources.py (one-time importer)
src/app/(site)/     homepage, article page, video page
src/components/     header, footer, wordmark, article text
src/content/        articles, videos.json, types
src/lib/site.ts     site name, address, authors
```
