# HAMYON.UZ

An independent Uzbek-language media platform about money and everyday financial life in Uzbekistan:
nasiya, loans and debt, savings, spending, prices and consumer culture.

This folder is the website's source code. Claude does most of the building; this page explains
the basics so you always know what is here.

---

## What the site is built with

| Part                   | Tool                        | In plain words                                                                           |
| ---------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| Website                | **Next.js 16** (with React) | The engine that builds the pages. Very fast, good for Google, used by large media sites. |
| Language               | **TypeScript**              | JavaScript with built-in spell-checking for code. Catches mistakes early.                |
| Styling                | **Tailwind CSS 4**          | How colours, fonts and layout are applied. Our brand colours live in one file.           |
| Content editor (later) | **Sanity**                  | A writing dashboard at `hamyon.uz/studio` where you publish without touching code.       |
| Hosting (later)        | **Vercel**                  | Puts the site on the internet and updates it automatically.                              |

Why these were chosen: see [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Folder map

```
hamyon-uz/
├── src/
│   ├── app/            ← pages of the site (each folder = a web address)
│   │   ├── layout.tsx  ← the frame shared by every page (language, title, SEO)
│   │   ├── page.tsx    ← the homepage (currently a "coming soon" placeholder)
│   │   ├── not-found.tsx ← the "page not found" page
│   │   ├── robots.ts   ← tells Google what it may index (blocked until launch)
│   │   └── globals.css ← brand colours, fonts, spacing (design tokens)
│   └── lib/
│       └── site.ts     ← site name, description, section names and addresses
├── public/             ← images and files served as-is (logo, icons — later)
├── docs/               ← project decisions, structure plan and roadmap
├── .env.example        ← template for private settings
└── package.json        ← list of tools the project uses + shortcut commands
```

## Running the site on your Mac (optional, one-time setup)

You don't need this to keep working with Claude, but it lets you see the site on your own computer.

1. Install **Node.js 22 (LTS)** from <https://nodejs.org> — download the macOS installer and click through it.
2. Open the **Terminal** app (press ⌘ + Space, type "Terminal", press Enter).
3. Paste these lines one at a time, pressing Enter after each:

   ```
   cd ~/Documents/hamyon-uz
   npm install
   npm run dev
   ```

4. Open <http://localhost:3000> in your browser. To stop the site, go back to Terminal and press Control + C.

`npm install` downloads the tools (only needed the first time, or after Claude adds a new tool).

## Shortcut commands

| Command          | What it does                                                     |
| ---------------- | ---------------------------------------------------------------- |
| `npm run dev`    | Runs the site on your computer, updating live as files change.   |
| `npm run build`  | Builds the final, optimised version (what goes on the internet). |
| `npm run check`  | Checks the code for mistakes and formatting problems.            |
| `npm run format` | Tidies the formatting of all files.                              |

## Project documents

- [`docs/DECISIONS.md`](docs/DECISIONS.md) — what was decided and why
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — sections, web addresses and the content model
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — the build stages and where we are now
