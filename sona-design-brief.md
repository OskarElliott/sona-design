# Sona — Design Brief (v2)

A warm, premium web-design studio for local Polish businesses (trades first:
electricians, plumbers, mechanics). Positioning: **Shape's presentation +
transparent pricing, rendered with adream's boldness, aimed at tradespeople.**
Warm and human, fairly-priced (middle, not floor), proof-forward. Polish-language.

The site *is* the portfolio, so its own craft is the entire pitch.

---

## 1. Design tokens

### Colour — warm black + refined red (single accent)
Deliberately **not** pure `#000` + magenta (that's adream's look and the generic
"dark agency" AI-default), and **not** cream + terracotta (the other AI-default).
Warm near-black + a warm scarlet that drives the call-to-action.

| Token           | Light      | Dark       | Use |
|-----------------|------------|------------|-----|
| `--paper`       | `#FCFBF9`  | `#141210`  | page background (clean warm white / warm near-black) |
| `--ink`         | `#15120F`  | `#F0EBE3`  | primary text |
| `--muted`       | `#6E675E`  | `#9A9187`  | secondary text, captions |
| `--accent`      | `#E5322B`  | `#EE3B31`  | CTAs, the wordmark period, key highlights |
| `--accent-soft` | `#FBE3E0`  | `#3A1E1B`  | pill fills, tags, chips |
| `--glow`        | `#E5322B` @ ~12% | `#EE3B31` @ ~18% | the single hero radial glow |
| `--line`        | `#EAE5DD`  | `#2A2620`  | hairline dividers, card borders |

- **Default first paint = light mode** (approachable for a nervous buyer,
  differentiates from every dark agency site). Dark mode is the toggle.
- Accent is ONE token — red↔blue is a 5-min swap if ever needed. Committed: red.
- Red is for fills/large accents, never small body text (contrast).

### Type — display + safe Polish body
- **Display — Overused Grotesk** (GitHub: RandomMaerks, OFL-1.1, variable
  300–900 + italics). Characterful neo-grotesk. Headlines/section headers, big.
  ⚠️ **ALPHA (v0.5-alpha.2). Full Latin diacritics still on roadmap.** Before
  committing, test `Zażółć gęślą jaźń` + `Jak to działa` at huge AND small sizes
  and inspect every one of: ą ć ę ł ń ó ś ź ż. Any broken glyph = dealbreaker.
- **Body — a font with GUARANTEED full Polish coverage** (Geist or General Sans).
  Use for all paragraph + UI text. Hedges the alpha risk. If Overused Grotesk's
  diacritics pass at body size too, collapse to a single-font system later.
- **Utility — a mono** (JetBrains Mono / Space Mono), small/tracked/uppercase,
  for prices + eyebrows + labels. Reinforces the "honest, transparent" feel.

### Geometry — the signature
**Conversational geometry.** Everything is a soft speech-bubble / pill: floating
navbar, CTAs, tags, price chip. The page should feel like a friendly person
talking — ties the wave-emoji greeting to the visual language.
- Pills/chips/buttons: fully rounded. Cards / media frames: ~20–24px.

### Background
Clean solid `--paper` + **one signature red radial glow** behind the hero
headline (adream's one-light-source trick, disciplined — NOT a full gradient).
Optional very faint dot-grid confined to the "Jak to działa" section only.

---

## 2. Hero — Shape structure × adream boldness

```
┌──────────────────────────────────────────────────────────┐
│  [ floating island navbar ]                              │
│                                                          │
│   ● Cześć, tu Sona 👋                                    │
│                                                          │
│   Strony internetowe            ·  soft red glow behind  │
│   dla lokalnych firm               the headline          │
│   (Overused Grotesk, oversized)                          │
│                                                          │
│   Więcej telefonów, więcej zleceń.                       │
│                                                          │
│   [ od 1499 zł ]  ← mono chip                            │
│   ( Darmowa wycena → )   ( Zobacz realizacje )           │
│   ★ 5.0 w Google · realne projekty                       │
│                                                          │
│              S o n a .   ← huge low-opacity wordmark      │
│                            bleeding off bottom-right      │
└──────────────────────────────────────────────────────────┘
```

Shape's *content* (eyebrow 👋 → headline → outcome → price → 2 CTAs → trust
line), adream's *boldness* (oversized type, single glow, a giant faint "Sona."
wordmark as a background type layer). No client screenshot. Transparent price is
the differentiator vs a Shape-clone — keep it.

Placeholder copy (Polish):
- Eyebrow: `Cześć, tu Sona 👋`
- Headline: `Strony internetowe dla lokalnych firm`
- Sub: `Więcej telefonów, więcej zleceń.`
- Price chip: `od 1499 zł`  ·  CTAs: `Darmowa wycena` / `Zobacz realizacje`

---

## 3. Sections & build order

Build tokens + theme first so everything downstream inherits them.

1. **Tokens + Tailwind config** — colours, fonts, radii.
2. **Fonts** — self-host Overused Grotesk variable `.woff2` via `next/font/local`,
   subset Latin + Latin-Extended (Polish). Body font same approach.
3. **Theme provider** — `next-themes`, `darkMode: 'class'`, light default.
4. **Navbar (floating island)** — full-width transparent → detached shadowed pill
   on scroll. ONE scroll source (see §4). Mobile: hamburger → sheet.
5. **Hero** — as above.
6. **Projekty** — scroll-stack (pinned sticky cards). Two projects now, built for
   n-cards (PlumbingCraft = #3 soon).
7. **O mnie** — your face + name (you are the trust signal). Fold in the Google
   rating / one real review here — keep proof without a separate section.
8. **Jak to działa** — 3 calm steps (Rozmowa → Projekt → Publikacja), reflecting
   payment-before-publish. Optional faint dot-grid background here only.
9. **Ceny** — transparent tiers. This is the whole edge. Never "contact for quote."
10. **Kontakt** — free-quote form + final CTA.
11. **Footer.**

---

## 4. Technical notes (Next.js 14 / TS / Tailwind / Framer Motion)

- **One scroll system.** reactbits ScrollStack drives its effect with Lenis
  (smooth-scroll) which hijacks native scroll and will fight the island navbar's
  scroll listener. Recommendation: **rebuild the stack natively in Framer Motion
  with `position: sticky` cards — skip Lenis.** Use reactbits only as visual ref.
- **Island navbar:** Framer Motion `useScroll` + `useMotionValueEvent` to toggle a
  "scrolled" state; animate max-width / padding / radius / background / shadow on a
  `motion.nav`. Gate behind `prefers-reduced-motion`.
- **Scroll-stack fallback:** on mobile + reduced-motion, degrade to a plain
  vertical list of project cards. No scroll-jacking on phones.
- **Fonts:** self-host both (Overused Grotesk isn't on any CDN). `next/font/local`,
  variable woff2, subset for Polish, `display: swap`.
- **Wave emoji:** `<span role="img" aria-label="pozdrowienie">👋</span>`; optional
  single wave-on-load, nothing more.
- **Wordmark:** `Sona<span style="color:var(--accent)">.</span>`
- **Quality floor:** mobile-first, visible keyboard focus, reduced-motion honoured,
  amber... red never as small body text, check red-on-paper contrast for any text.

---

## 5. Two things not to let slip

- **Keep the transparent pricing (Ceny) block.** It's why Sona beats a Shape-clone.
- **Warmth comes from copy + the wave + speech-bubble geometry + your face** — not
  from making it cheap, and not lost to the bold dark palette.
