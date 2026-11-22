<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## HAMYON.UZ — project rules

- Independent Uzbek media site about personal finance and everyday economic life. Editorial
  magazine, **not** a fintech/SaaS template. Read `docs/` before making changes.
- Owner is a beginner: do the work, explain simply, recommend one option.
- UI text is Uzbek (Latin). Use ʻ (U+02BB) for oʻ/gʻ and ʼ (U+02BC) for the tutuq belgisi — never `'`.
- Colours, fonts and spacing come only from the tokens in `src/app/globals.css`. No ad-hoc hex values.
- Approved identity: Direction A "Chek" refined (see docs/DECISIONS.md). Serif = headlines + text,
  Commissioner = UI, Plex Mono = numbers only. Receipt hints max two per screen. Check `/dizayn-tizimi`.
- Avoid: rounded-card grids, gradients, glassmorphism, stock-photo look, decorative animation.
- Site name, sections and addresses live in `src/lib/site.ts`. Addresses are fixed — don't rename.
- Record significant decisions in `docs/DECISIONS.md`; update `docs/ROADMAP.md` when a stage finishes.
- Run `npm run check` and `npm run build` before finishing any change.
