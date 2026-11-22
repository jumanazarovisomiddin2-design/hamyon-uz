# Decisions

A record of the important choices, so nobody has to remember why things are the way they are.
Newest decisions go at the bottom.

---

## 2026-11-22 — Technology stack

**Next.js 16 + TypeScript + Tailwind CSS 4**, content in **Sanity**, hosted on **Vercel**.

- **Next.js** builds pages ahead of time, so articles load instantly and are easy for Google to
  read. It handles images, SEO tags, sitemaps and social-media previews out of the box. It is the
  most common choice for modern news and magazine sites, so help and documentation are easy to find.
- **TypeScript** catches many mistakes before the site is even run. Important on a project that
  will grow for years.
- **Tailwind CSS** keeps the whole visual system (colours, type, spacing) in one file of
  _design tokens_ (`src/app/globals.css`), so the design stays consistent and is easy to change.
  It does not dictate a look — every layout is designed by hand.
- **Sanity** (chosen for the CMS stage) gives a proper editorial dashboard: drafts, scheduled
  publishing, image cropping, video embeds, multiple authors, and rich article bodies with charts,
  checklists and callouts. It is hosted for us — no database or server to maintain — and the free
  plan is enough for a starting media project. The editor will live at `/studio` on our own site.
  - _Considered:_ WordPress (heavier, harder to make look distinctive, needs a server and
    constant security updates); Payload CMS (excellent, but needs its own database and hosting —
    more to maintain for a beginner); file-based editors like Decap/Keystatic (too limited for
    video, multiple authors and scheduled publishing).
- **Vercel** is made by the Next.js team: connects to GitHub and publishes every change
  automatically, with a free tier and a global network that serves Central Asia well.

## 2026-11-22 — Where the code lives

- Working copy: `~/Documents/hamyon-uz` on the owner's Mac.
- **Next:** a private GitHub repository will become the main home of the code (full history,
  backups, and automatic deployment to Vercel). Requires connecting GitHub to Claude.

## 2026-11-22 — Language and addresses

- The site is in **Uzbek (Latin script)**, `lang="uz"`. Cyrillic support is kept in mind when
  choosing fonts so it can be added later.
- Correct Uzbek characters are used everywhere: **ʻ** (U+02BB) in oʻ / gʻ, and **ʼ** (U+02BC)
  for the tutuq belgisi (isteʼmol). Not the plain apostrophe `'`.
- Web addresses are short, Uzbek, and use only plain Latin letters (no special characters), e.g.
  `/qollanmalar`, `/biz-haqimizda`. Decided now so links never break after launch.

## 2026-11-22 — Search engines blocked until launch

The site tells Google not to index it until `NEXT_PUBLIC_ALLOW_INDEXING=true` is set on launch
day. This prevents an unfinished site from appearing in search results.

## 2026-11-22 — Palette (starting values)

Paper `#F6F1E7` · Sand `#E3D4B6` · Forest `#1E3A2C` · Terracotta `#A9472A` · Brass `#9C7D3C` ·
Charcoal `#211F1B`. All text colours pass accessibility contrast on paper, except **brass**, which
is reserved for lines, icons and large text. To be refined in the visual identity stage.

## 2026-11-22 — Visual identity approved: Direction A "Chek", refined

Chosen from three explorations (A Chek, B Bozor, C Panjara), then refined with C's whitespace
and rhythm. Design canvas: https://claude.ai/artifact/4oPhCSTSR2svKs4CLDLK4V

- **Typefaces** (self-hosted, all verified for oʻ gʻ ʼ and ў қ ғ ҳ):
  Source Serif 4 — headlines (weight 500, italic for one accent word) and reading text;
  Commissioner — menus, labels, buttons, captions; IBM Plex Mono — numbers only.
- **Receipt hints, used sparingly** (max two per screen): dashed "perforation" line between
  major sections · dotted leaders in lists/contents/chapters · mono figures · ".uz" in the logo.
  No receipt boxes, zigzag edges or barcodes.
- **Colour proportion**: paper ~70%, charcoal text, forest for the wordmark and links, sand for
  Tahlil, terracotta as a single accent. Video sections are dark ("cinema") charcoal.
- **Uzbek identity** is carried by documentary photography (real places, unstaged, everyday
  details) — not by ornament.

## 2026-11-22 — Design system implemented (stage 2)

- All tokens live in `src/app/globals.css`: colours (Tailwind's default palette is switched off),
  fluid type scale `text-display-xl … text-small` (phone 390 px → desktop 1440 px), spacing
  `gutter` / `section` / `band`, widths `page` (1440) and `reading` (700).
- Reusable styles: `page`, `kicker`, `label`, `perforation`, `leader` + `leader-dots`, `figure`,
  `link-quiet`, `btn`, `btn-solid`, `icon-btn`.
- Components in `src/components/`: `Wordmark`, `SiteHeader` (light/dark), `SiteNav`,
  `MobileMenu`, `SiteFooter`, `icons`.
- Living style guide at `/dizayn-tizimi` (hidden from search engines).
- Social links are configured in `src/lib/site.ts` and only appear once a real address is added.
- Note: a spacing token must not be called `block` — it clashes with Tailwind's `inline-block`.

## 2026-11-22 — Stage 3: pages and sample content

- **Content lives in `src/content/`** until the CMS (stage 4): one file per story in
  `src/content/stories/`, videos in `src/content/videos.ts`, homepage choices in
  `src/content/index.ts` (`frontPage`). Types in `src/content/types.ts` — the CMS will use the
  same fields.
- **Sample content is real**, from the owner's "Nasiya sovgʻa emas" project: three full articles
  (history, hidden cost, 2027 rules) as a numbered series; two analysis pieces and four guides
  built only from those drafts and the Central Bank study (S. Agzamov, CBU, 2025), with sources
  listed. No invented figures.
- **Clearly marked placeholders**: "FOTO KERAK" boxes with a photographer brief; video frames
  marked "KADR KERAK" and "Tez orada" (the two videos are planned, not published); expert name
  "[ekspert ismi]" and photographer "[fotograf]"; the newsletter form is shown but disabled
  ("Obuna hali ochilmagan").
- **Article text format** (`src/lib/body.tsx`): headings, quotes, pull quotes, and three
  receipt-style blocks — `:::calc` (calculation with dotted leaders), `:::table`, `:::figures` —
  plus `:::checklist` and `:::note`.
- **Page groups**: `app/(site)` = paper pages; `app/(kino)` = dark cinema pages (videos).
- **Article layout**: three columns (contents · text · key takeaway/series) from 1280 px; single
  centred reading column below that. Text column never wider than 700 px.
- **Videos** load YouTube only when the reader presses play (youtube-nocookie.com).
- Not built yet (outside stage 3): "Biz haqimizda" page and search (`/qidiruv`).

## Concept v2 implementation (2026-11-22)

- **Two sections**: MAQOLALAR (`/maqolalar`, formats as filters at `/maqolalar/turi/[format]`) and
  MULTIMEDIA (`/multimedia`). Tahlil, Qoʻllanmalar and Videolar addresses redirect.
- **Content is verbatim.** The six pieces Claude had written earlier were removed, and so were
  Claude's deks, key-takeaway boxes and edits inside the authors' texts. Original typos are kept.
  Typography only: oʻ gʻ ʼ « ». Guarded by `npm run check:content` before every build.
- **Five articles** from the authors' files (3 Nasiya articles, household debt, credit limits) and
  **two videos** (1.mp4 "Nasiya tarixi", 2.mp4 "Nasiya: qulaylikmi yoki qimmat qarz?").
- Byline "Tahririyat". No publication dates are shown until the editors supply real ones.
- The expert's name in article 2 ("…..") is shown as a visible placeholder.
- Video posters and 6-second silent previews are frames from the finished videos (no interview
  footage). Videos show "YouTubeʼda tez orada" until links exist. Scripts are labelled as scripts.
- Header has just the two section links on every screen size, so the hidden mobile menu was removed.
  The search icon was removed until search exists.
- Motion: six patterns (count-up, price strike, bars grow, tracking fill, receipt slide, tag swing),
  once in view, ≤900 ms, transform/opacity, off with "reduce motion"; reading progress uses CSS
  scroll timelines (no JavaScript).

## Final audit (2026-11-22)

- **Real 404s**: `src/proxy.ts` answers unknown article, format and video addresses with status 404
  (streamed pages would otherwise say "200 OK" while showing the not-found page).
- **Fonts through `next/font/local`** (same Fontsource files, Latin subsets): preloaded, with
  size-matched fallbacks, so the page no longer jumps when fonts arrive (layout shift 0.18 → 0).
  The Latin files cover every character on the site, including ʻ and ʼ. Cyrillic (only on the
  internal style guide) now falls back to system fonts.
- **Loan-type cover** reads the article's own composition data (no hand-typed numbers).
- **Content guard** also checks that every bar length matches its printed number and that
  composition parts add up to the total.
- Old addresses redirect in one hop (308). Removed pieces go straight to `/maqolalar`.
- Default share image `src/app/opengraph-image.png`; articles without a photo use their video's
  poster or this image. Canonical URLs on every page; `site.url` defaults to `https://hamyon.uz`.
- Contrast: small terracotta text on sand uses `terracotta-deep` (#8f3a20) to meet WCAG AA.
- Copy-link button has a fallback for browsers that block the clipboard.
- Browser testing: automated in Chromium only (Firefox/WebKit downloads are blocked in the build
  environment). Code reviewed for Safari 16.4+/Firefox 128+ (Tailwind 4's baseline); the
  scroll-linked progress bar is feature-guarded.

## Simple version (2026-11-22, owner's final instruction)

The owner found the full Concept v2 site too complex and asked for: 3 articles (homepage shows only
picture + title), the videos with titles, the full videos playing on the site, and the authors
Isomiddin Jumanazarov and Shohzodaxon Muzaffarova — nothing else.

- Homepage = 3 Nasiya articles + 2 videos. Article and video pages only. All other sections,
  filters, infographics, motion, series tracker, newsletter and the style guide were removed (they
  remain in git history; the two news articles and scripts are kept in `content/archive/`).
- Only two finished videos exist (1.mp4, 2.mp4). The raw interviews were not used (earlier
  instruction; the hero is anonymous in the article). A third video can be added in `videos.json`.
- Videos are self-hosted, re-encoded to 720p H.264/AAC (full length, with sound), never autoplay.
- Article pictures: real frames from the authors' own "Nasiya tarixi" video (no faces, no text).
- Article texts remain word for word; the content check still runs before every build.
