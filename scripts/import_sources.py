#!/usr/bin/env python3
"""
One-time importer: turns the editors' original files into site content.

    python3 scripts/import_sources.py ~/Documents

Reads (never writes) the original .docx/.pdf files and produces:

  content/originals/<slug>.txt      – the original paragraphs, one per line,
                                      exactly as written (the reference copy
                                      `npm run check:content` compares against)
  src/content/articles/<slug>.json  – the article as the site shows it
  src/content/scripts/<slug>.json   – video scripts

The words are never changed. The only edits are typographic:
  o‘ / g‘ → oʻ / gʻ,  ’ → ʼ,  “…” → «…», double spaces → one.
Bold and italic from the original are kept (**bold**, *italic*).
Infographics are added as separate blocks and use only numbers that appear in
the article; the content check fails the build if they don't.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

import docx

ROOT = Path(__file__).resolve().parent.parent
BASE = Path(sys.argv[1] if len(sys.argv) > 1 else "~/Documents").expanduser()

# ── typography (1:1 character replacements, then whitespace) ──────────────


def normalize_chars(s: str) -> str:
    s = s.replace(" ", " ")
    s = re.sub(r"([oOgG])[‘’'`ʼʻ]", r"\1ʻ", s)
    s = re.sub(r"(?<=\w)[‘’'`](?=\w)", "ʼ", s)
    s = s.replace("“", "«").replace("”", "»").replace("„", "«")
    out, open_q = [], True
    for ch in s:
        if ch == '"':
            out.append("«" if open_q else "»")
            open_q = not open_q
        else:
            out.append(ch)
    return "".join(out)


def tidy(s: str) -> str:
    return re.sub(r"[ \t]+", " ", s).strip()


def marked(paragraph) -> str:
    """Paragraph text with **bold** and *italic* marks, typography normalised."""
    runs = [(r.text, bool(r.bold), bool(r.italic)) for r in paragraph.runs if r.text]
    plain = normalize_chars("".join(t for t, _, _ in runs))
    # re-slice the normalised text along the original run lengths (1:1 mapping)
    segs, i = [], 0
    for t, b, it in runs:
        segs.append([plain[i : i + len(t)], b, it])
        i += len(t)
    # merge neighbours with the same style
    merged = []
    for s in segs:
        if merged and merged[-1][1] == s[1] and merged[-1][2] == s[2]:
            merged[-1][0] += s[0]
        else:
            merged.append(s)
    styled = [s for s in merged if s[0].strip()]
    if styled and all(s[1] for s in styled):  # whole paragraph bold → caller decides
        for s in merged:
            s[1] = False
    if styled and all(s[2] for s in styled):
        for s in merged:
            s[2] = False
    out = []
    for text, b, it in merged:
        if not text.strip() or not (b or it):
            out.append(text)
            continue
        lead = text[: len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()) :]
        core = text.strip()
        mark = "**" if b else "*"
        if b and it:
            mark = "**"
        out.append(f"{lead}{mark}{core}{mark}{trail}")
    s = "".join(out)
    s = s.replace("****", "")  # two bold runs separated by nothing
    return tidy(s)


def docx_paragraphs(path: Path):
    d = docx.Document(str(path))
    return [p for p in d.paragraphs if p.text.strip()]


# ── specs ─────────────────────────────────────────────────────────────────

P = "Nasiya"
ARTICLES = [
    {
        "slug": "nasiyaning-tort-ming-yillik-yoli",
        "file": f"{P}/maqola 1.docx",
        "format": "uzun-oqish",
        "order": 1,
        "series": "nasiya-sovga-emas",
        "accent": "toʻrt ming yillik",
        "h2": [2, 10, 15, 25, 30, 36, 39, 44],
        "quote": [20],
        "sources": (48, 67),
        "excerpt": "Bugun butun dunyoda millionlab odamlar nasiya orqali xarid qiladi. Lekin bu odat internet-doʻkonlar va fintech kompaniyalari bilan paydo boʻlmagan.",
        "cover": {
            "kind": "image",
            "src": "/media/maqolalar/nasiya-tarixi-kadr.jpg",
            "alt": "Rasmli kadr: oʻrta asr bozorida savdogarlar tanga va mato bilan savdo qilmoqda",
            "credit": "Kadr: «Nasiya tarixi» videosidan",
            "width": 1600,
            "height": 900,
        },
        "graphics": {
            5: [
                {
                    "kind": "figures",
                    "title": "Mesopotamiyadagi odatiy foiz stavkalari",
                    "items": [
                        {"value": "20%", "label": "kumush evaziga olingan qarzlar"},
                        {"value": "33⅓%", "label": "arpa evaziga olingan qarzlar"},
                    ],
                }
            ],
            18: [
                {
                    "kind": "bars",
                    "title": "Singer tikuv mashinasi va oila daromadi, 1850-yillar",
                    "items": [
                        {"label": "Singer mashinasi", "value": "taxminan 125 dollar", "v": 125, "accent": True},
                        {"label": "Oʻrtacha amerikalik oilaning yillik daromadi", "value": "500 dollar atrofida", "v": 500},
                    ],
                }
            ],
            33: [
                {
                    "kind": "change",
                    "title": "AQShda isteʼmolchilarning boʻlib toʻlash qarzlari",
                    "from": {"when": "1919", "value": "1,9 mlrd dollar"},
                    "to": {"when": "1929", "value": "4,9 mlrd dollar"},
                    "note": "Arthur Wilmarth hisobi",
                }
            ],
            43: [
                {
                    "kind": "schedule",
                    "title": "Klarna «Pay in 4»: 100 dollarlik kurtka",
                    "count": 4,
                    "amount": "25",
                    "unit": "dollar",
                    "first": "dastlab",
                    "cadence": "qolgan uch qismi — har ikki haftada",
                    "total": {"label": "Jami", "value": "100 dollar"},
                }
            ],
            45: [
                {
                    "kind": "timeline",
                    "title": "Nasiyaning yoʻli — maqoladagi sanalar",
                    "items": [
                        {"when": "mil. avv. 2100–2000", "what": "Ur, Mesopotamiya: mixxat yozuvlaridagi qarz hujjatlari"},
                        {"when": "XI asr", "what": "Qohira sinagogasi hujjatlari: Oʻrta yer dengizi savdosi"},
                        {"when": "1840–1890", "what": "Mebel, pianino, qishloq xoʻjaligi texnikasi va tikuv mashinasi"},
                        {"when": "1856", "what": "Singer: ijara-xarid tartibi"},
                        {"when": "1873", "what": "Mark Tven va Charlz Dadli Uorner, «Oltin asr»"},
                        {"when": "1919", "what": "General Motors — GMAC"},
                        {"when": "1950", "what": "Diners Club kartasi"},
                        {"when": "1958", "what": "BankAmericard — aylanma kredit"},
                        {"when": "2005", "what": "Stokgolm: Kreditor kompaniyasi"},
                        {"when": "2012", "what": "Affirm, AQSh"},
                        {"when": "2014", "what": "Afterpay, Melburn"},
                    ],
                }
            ],
        },
    },
    {
        "slug": "foizsiz-nasiya-yashirin-kredit",
        "file": f"{P}/ 2 maqola.docx",
        "format": "tahlil",
        "order": 2,
        "series": "nasiya-sovga-emas",
        "accent": "yashirin qimmat",
        "h2": [7, 12, 21, 27, 38, 45, 50, 54, 59],
        "speech": [3, 5, 11, 31, 35, 58, 67],
        "bold_p": [10],
        "list": [40, 41, 42],
        "excerpt": "Telefonning naqd narxi taxminan 7,5 mln soʻm edi. D. uni 24 oyga oldi va har oy 500 ming soʻm atrofida toʻlaydi.",
        "cover": {
            "kind": "graphic",
            "variant": "price",
            "before": "taxminan 7,5 mln soʻm",
            "after": "12 mln soʻm",
            "meta": "24 oy · har oy 500 ming soʻm atrofida",
        },
        "photo": {
            "shot": "keng plan",
            "brief": "Elektronika doʻkoni vitrinasi, kechqurun: telefonlar ostida muddatli toʻlov yorliqlari.",
        },
        "graphics": {
            4: [
                {
                    "kind": "price",
                    "title": "Hikoyadagi telefon",
                    "before": {"label": "Naqd narx", "value": "taxminan 7,5 mln soʻm"},
                    "after": {"label": "Ikki yilda jami", "value": "12 mln soʻm"},
                    "meta": ["24 oy", "har oy 500 ming soʻm atrofida"],
                    "diff": {"label": "Naqd narxdan koʻp", "value": "4,5 mln soʻm"},
                }
            ],
            8: [
                {
                    "kind": "change",
                    "title": "Nasiya shartnomalari soni",
                    "from": {"when": "2023-yil fevral", "value": "13,5 ming"},
                    "to": {"when": "2024-yil dekabr", "value": "973 ming"},
                    "note": "qariyb 72 barobar oʻsish",
                }
            ],
            23: [
                {
                    "kind": "bars",
                    "title": "Bir kishiga toʻgʻri keladigan oʻrtacha nasiya qarzi",
                    "items": [
                        {"label": "18–25 yoshlilar", "value": "2,9 mln soʻm", "v": 2.9},
                        {"label": "Oʻrtacha", "value": "3,7 mln soʻm", "v": 3.7},
                        {"label": "36–50 yoshlilar", "value": "4,2 mln soʻm", "v": 4.2},
                        {"label": "Toshkent shahri", "value": "5,5 mln soʻm", "v": 5.5, "accent": True},
                    ],
                }
            ],
            42: [
                {
                    "kind": "schedule",
                    "title": "Naqd narxi 3 000 000 soʻm boʻlgan telefon, 12 oyga",
                    "count": 12,
                    "amount": "325 000",
                    "unit": "soʻm",
                    "cadence": "har oy",
                    "total": {"label": "Jami toʻlov", "value": "3 900 000 soʻm"},
                    "extra": {"label": "Ortiqcha toʻlov", "value": "900 000 soʻm · 30%"},
                }
            ],
            48: [
                {
                    "kind": "bars",
                    "title": "Bitta toʻlov jadvali — uch xil oʻlchov",
                    "items": [
                        {"label": "Naqd narxga nisbatan ustama", "value": "30%", "v": 30},
                        {"label": "Nominal yillik stavka", "value": "51,4%", "v": 51.4},
                        {"label": "Samarali yillik stavka", "value": "65,5%", "v": 65.5, "accent": True},
                    ],
                }
            ],
            51: [
                {
                    "kind": "price",
                    "title": "iPhone 16 Pro 128GB, Idea, 6 oy «ortiqcha toʻlovsiz»",
                    "before": {"label": "Bozordagi oʻrtacha narx", "value": "14,4 mln soʻm"},
                    "after": {"label": "Nasiya narxi", "value": "21 990 000 soʻm"},
                    "meta": ["oyiga 3 665 000 soʻm"],
                    "diff": {"label": "Yuqori", "value": "52,4%"},
                }
            ],
            52: [
                {
                    "kind": "receipt",
                    "title": "Naqd chegirma haqida soʻrang",
                    "lines": [
                        {"label": "Nasiya «0%», 12 oy × 250 ming soʻm", "value": "3 mln soʻm"},
                        {"label": "Naqd, 10% chegirma bilan", "value": "2,7 mln soʻm"},
                    ],
                    "total": {"label": "Ortiqcha toʻlov", "value": "300 ming soʻm"},
                    "foot": "Yillik qariyb 22% samarali stavka",
                }
            ],
        },
    },
    {
        "slug": "2027-yildan-nasiya-bozori",
        "file": f"{P}/maqola 3.docx",
        "format": "tushuntirish",
        "order": 3,
        "series": "nasiya-sovga-emas",
        "title": "2027-yildan nasiya bozori qanday oʻzgaradi?",
        "accent": "qanday oʻzgaradi",
        "h2": [5, 9, 13, 19, 35, 41],
        "list": [16, 17],
        "excerpt": "2027-yil 1-yanvardan bunday manzara oʻzgaradi. Prezidentning 2026-yil 14-avgustdagi PQ-294-son qaroriga koʻra, nasiya bozori ilk bor alohida qoidalar bilan tartibga solinmoqda.",
        "cover": {"kind": "graphic", "variant": "limits", "a": "12 oy", "b": "50%", "meta": "PQ-294-son qaror · 2027-yil 1-yanvardan"},
        "graphics": {
            2: [
                {
                    "kind": "price",
                    "title": "Hisense 55E8Q televizori, Texnomart",
                    "before": {"label": "Naqd narx", "value": "6 733 000 soʻm"},
                    "after": {"label": "24 oyda jami", "value": "11 446 104 soʻm"},
                    "meta": ["476 921 soʻm × 24 oy"],
                    "diff": {"label": "Ustama", "value": "70%"},
                }
            ],
            3: [
                {
                    "kind": "bars",
                    "title": "Yillik samarali stavka",
                    "items": [
                        {"label": "Shu muddatli toʻlov jadvali", "value": "taxminan 75%", "v": 75, "accent": True},
                        {"label": "Banklarning mikroqarzlari, 2026-yil noyabr", "value": "27,5% atrofida", "v": 27.5},
                    ],
                }
            ],
            6: [
                {
                    "kind": "composition",
                    "title": "Nasiya bilan bogʻliq kredit portfeli, 2025-yil 1-yanvar",
                    "total": {"label": "Jami", "value": "8,5 trln soʻm"},
                    "items": [
                        {"label": "Banklar", "value": "7%", "v": 7},
                        {"label": "Ikkita mikromoliya tashkiloti", "value": "26%", "v": 26},
                        {"label": "Nasiya platformalari va doʻkonlar", "value": "67% · qariyb 5,7 trln soʻm", "v": 67, "accent": True},
                    ],
                }
            ],
            8: [
                {
                    "kind": "timeline",
                    "title": "Tartibga solish qadamlari",
                    "items": [
                        {"when": "2025-yil iyun", "what": "Timur Ishmetov: bozorni tartibga solish rejalashtirilgan"},
                        {"when": "2026-yil yanvar", "what": "Sanjar Nosirov: alohida qaror va alohida qonun tayyorlanadi"},
                        {"when": "2026-yil 14-avgust", "what": "PQ-294-son qaror imzolandi"},
                        {"when": "2026-yil 1-dekabrgacha", "what": "Markaziy bank va Soliq qoʻmitasi aniqlash tartibini ishlab chiqadi"},
                        {"when": "2027-yil 1-yanvar", "what": "Operator faqat Markaziy bank reyestriga kirgandan keyin ishlaydi"},
                    ],
                }
            ],
            19: [
                {
                    "kind": "figures",
                    "title": "Yangi chegaralar",
                    "items": [
                        {"value": "12 oy", "label": "operator orqali nasiyaning eng uzoq muddati"},
                        {"value": "250 BHM", "label": "tovar narxi chegarasi — 110 mln soʻm"},
                        {"value": "50%", "label": "ustama, jarima va penya — yillik umumiy chegara"},
                    ],
                }
            ],
            28: [
                {
                    "kind": "receipt",
                    "title": "50% chegarasi: oddiy misol",
                    "lines": [
                        {"label": "Tovar narxi", "value": "10 mln soʻm"},
                        {"label": "Muddat", "value": "12 oy"},
                        {"label": "Ustama boʻlsa", "value": "40%"},
                        {"label": "Kechiktirganda yana koʻpi bilan", "value": "10%"},
                    ],
                    "total": {"label": "Qoʻshimcha toʻlov, koʻpi bilan", "value": "5 mln soʻm"},
                }
            ],
        },
    },
    {
        "slug": "aholining-banklar-oldidagi-qarzi",
        "file": "Aholining banklar oldidagi qarzi.docx",
        "format": "yangilik",
        "order": 4,
        "accent": "$20,3 milliardga",
        "h2": [5, 9, 12, 17, 20, 24],
        "excerpt": "Qiziqarlisi, aholi qarzi banklarning umumiy kreditlaridan ham tezroq oʻsmoqda.",
        "cover": {"kind": "graphic", "variant": "composition", "a": "$20,3 mlrd", "meta": "2026-yil 1-avgust holatiga"},
        "graphics": {
            3: [
                {
                    "kind": "figures",
                    "items": [
                        {"value": "239 trln 801 mlrd soʻm", "label": "jismoniy shaxslarga kreditlar qoldigʻi, 2026-yil 1-avgust"},
                        {"value": "$20,3 mlrd", "label": "taxminan; 1 dollar = 11 800 soʻm"},
                        {"value": "+8,9%", "label": "yil boshidan buyon"},
                    ],
                }
            ],
            7: [
                {
                    "kind": "bars",
                    "title": "Yil boshidan buyon oʻsish",
                    "items": [
                        {"label": "Jismoniy shaxslar qarzi", "value": "8,9%", "v": 8.9, "accent": True},
                        {"label": "Banklarning umumiy kredit portfeli", "value": "6,7%", "v": 6.7},
                    ],
                },
                {
                    "kind": "change",
                    "title": "Aholining banklar umumiy kredit portfelidagi ulushi",
                    "from": {"when": "yil boshi", "value": "36,5%"},
                    "to": {"when": "avgust", "value": "37,2%"},
                },
            ],
            10: [
                {
                    "kind": "composition",
                    "title": "Aholi qarzi turlari boʻyicha, 2026-yil 1-avgust",
                    "total": {"label": "Jami", "value": "239 trln 801 mlrd soʻm"},
                    "items": [
                        {"label": "Ipoteka", "value": "88 trln 147 mlrd", "v": 88147, "accent": True},
                        {"label": "Mikroqarzlar", "value": "51 trln 141 mlrd", "v": 51141},
                        {"label": "Mikrokreditlar", "value": "46 trln 744 mlrd", "v": 46744},
                        {"label": "Avtokreditlar", "value": "40 trln 503 mlrd", "v": 40503},
                        {"label": "Taʼlim kreditlari", "value": "6 trln 844 mlrd", "v": 6844},
                        {"label": "Kredit kartalari va overdraftlar", "value": "5 trln 914 mlrd", "v": 5914},
                        {"label": "Isteʼmol kreditlari", "value": "508 mlrd", "v": 508},
                    ],
                }
            ],
            19: [
                {
                    "kind": "growth",
                    "title": "Yil boshidan oʻzgarish, kredit turlari boʻyicha",
                    "items": [
                        {"label": "Kredit kartalari va overdraftlar", "value": "+33,5%", "v": 33.5, "accent": True},
                        {"label": "Mikrokreditlar", "value": "+15,5%", "v": 15.5},
                        {"label": "Ipoteka", "value": "+11%", "v": 11},
                        {"label": "Mikroqarzlar", "value": "+4,7%", "v": 4.7},
                        {"label": "Isteʼmol kreditlari", "value": "+3,3%", "v": 3.3},
                        {"label": "Avtokreditlar", "value": "+2%", "v": 2},
                        {"label": "Taʼlim kreditlari", "value": "−1,3%", "v": -1.3},
                    ],
                }
            ],
            27: [
                {
                    "kind": "change",
                    "title": "Kredit qarzi — har bir kishiga oʻrtacha",
                    "from": {"when": "yil boshi", "value": "$479"},
                    "to": {"when": "avgust", "value": "$521"},
                    "note": "aholi taxminan 39 million kishi deb olinganda",
                }
            ],
        },
    },
    {
        "slug": "kredit-cheklovlari-va-mikroqarzlar",
        "pdf": "Individual topshiriq.pdf",
        "format": "yangilik",
        "order": 5,
        "accent": "mikroqarzlar xavfi",
        "excerpt": "Raqamlar umumiy qarz yuki pasayganini koʻrsatadi, biroq cheklovlar bunga aynan qancha hissa qoʻshganini mavjud maʼlumotlar bilan ajratib boʻlmaydi.",
        "cover": {"kind": "graphic", "variant": "change", "a": "36%", "b": "33%", "meta": "Umumiy DSTI koʻrsatkichi"},
        "graphics": {
            2: [
                {
                    "kind": "change",
                    "title": "Umumiy DSTI koʻrsatkichi",
                    "from": {"when": "2024-yil II yarim yillik", "value": "36%"},
                    "to": {"when": "2025-yil I yarim yillik", "value": "33%"},
                    "note": "qarz toʻlovlarining daromadga nisbati",
                },
                {
                    "kind": "figures",
                    "items": [
                        {"value": "78%", "label": "DSTI 50 foizdan oshmagan qarz oluvchilarga ajratilgan kreditlar ulushi"},
                        {"value": "+18", "label": "foiz band — 2024-yilning mos davriga nisbatan"},
                    ],
                },
            ],
            3: [
                {
                    "kind": "figures",
                    "title": "Mikroqarz oluvchilar, 2025-yil yakunlari",
                    "items": [
                        {"value": "40%", "label": "oʻrtacha DSTI koʻrsatkichi"},
                        {"value": "2,7 mln", "label": "kishi — qariyb"},
                    ],
                }
            ],
        },
    },
]

SCRIPTS = [
    {"slug": "nasiya-tarixi", "file": f"{P}/Nasiya tarixi 1.docx", "headings": "bold"},
    {"slug": "nasiya-qulaylikmi-yoki-qimmat-qarz", "file": f"{P}/Nasya claude.docx", "headings": "none"},
]


def pdf_paragraphs(path: Path):
    text = subprocess.run(["pdftotext", "-layout", str(path), "-"], capture_output=True, text=True).stdout
    blocks, cur = [], []
    for line in text.split("\n"):
        line = line.replace("\x0c", "").strip()
        if not line:
            if cur:
                blocks.append(cur)
                cur = []
            continue
        cur.append(line)
    if cur:
        blocks.append(cur)
    # title = first 3 lines of block 0; rest of block 0 is the first paragraph
    title, first = blocks[0][:3], blocks[0][3:]
    paras = [" ".join(title), " ".join(first)]
    for b in blocks[1:]:
        if re.match(r"^\d+\.\s", b[0]):  # numbered list → one item per line
            paras += [re.sub(r"^\d+\.\s+", "", l) for l in b]
        else:
            paras.append(" ".join(b))
    return paras


def build_article(spec):
    if "pdf" in spec:
        raw = pdf_paragraphs(BASE / spec["pdf"])
        texts = [tidy(normalize_chars(t)) for t in raw]
        # Individual topshiriq: 0 title · 1–4 text · 5 note · 6 "Manbalar:" · 7–9 sources
        types = {5: "note"}
        sources = (6, len(raw) - 1)
    else:
        paras = docx_paragraphs(BASE / spec["file"])
        raw = [p.text for p in paras]
        texts = [marked(p) for p in paras]
        types = {}
        for i in spec.get("h2", []):
            types[i] = "h2"
        for i in spec.get("quote", []):
            types[i] = "quote"
        for i in spec.get("speech", []):
            types[i] = "speech"
        for i in spec.get("list", []):
            types[i] = "li"
        for i in spec.get("bold_p", []):
            texts[i] = f"**{tidy(normalize_chars(raw[i]))}**"
        sources = spec.get("sources")

    for i, t in types.items():
        if t in ("h2", "note"):
            texts[i] = re.sub(r"\*+", "", texts[i])

    end = sources[0] if sources else len(raw)
    blocks = []
    for i in range(1, end):
        t = types.get(i, "p")
        if t == "li":
            if blocks and blocks[-1]["type"] == "list":
                blocks[-1]["items"].append(texts[i])
            else:
                blocks.append({"type": "list", "items": [texts[i]]})
        else:
            blocks.append({"type": t, "text": texts[i]})
        for g in spec.get("graphics", {}).get(i, []):
            blocks.append({"type": "graphic", **g})

    article = {
        "slug": spec["slug"],
        "title": spec.get("title") or re.sub(r"\*+", "", texts[0]),
        "titleAccent": spec.get("accent"),
        "format": spec["format"],
        "order": spec["order"],
        "author": "Tahririyat",
        "publishedAt": None,
        "series": spec.get("series"),
        "excerpt": spec["excerpt"],
        "cover": spec.get("cover"),
        "photo": spec.get("photo"),
        "body": blocks,
    }
    if sources:
        article["sources"] = {
            "heading": re.sub(r"\*+", "", texts[sources[0]]),
            "items": [re.sub(r"\*+", "", t) for t in texts[sources[0] + 1 : sources[1] + 1]],
        }

    (ROOT / "content/originals" / f"{spec['slug']}.txt").write_text("\n".join(tidy(r) for r in raw) + "\n")
    (ROOT / "src/content/articles" / f"{spec['slug']}.json").write_text(
        json.dumps(article, ensure_ascii=False, indent=2) + "\n"
    )
    print("article", spec["slug"], len(blocks), "blocks")


def build_script(spec):
    paras = docx_paragraphs(BASE / spec["file"])
    raw = [p.text for p in paras]
    blocks = []
    for p in paras:
        bold = all(r.bold for r in p.runs if r.text.strip())
        text = tidy(normalize_chars(p.text))
        if spec["headings"] == "bold" and bold:
            blocks.append({"type": "h3", "text": text})
        else:
            blocks.append({"type": "p", "text": text})
    (ROOT / "content/originals" / f"video-{spec['slug']}.txt").write_text("\n".join(tidy(r) for r in raw) + "\n")
    (ROOT / "src/content/scripts" / f"{spec['slug']}.json").write_text(
        json.dumps({"slug": spec["slug"], "body": blocks}, ensure_ascii=False, indent=2) + "\n"
    )
    print("script", spec["slug"], len(blocks), "blocks")


if __name__ == "__main__":
    for a in ARTICLES:
        build_article(a)
    for s in SCRIPTS:
        build_script(s)
