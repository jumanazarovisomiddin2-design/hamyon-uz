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
