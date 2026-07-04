// ── SCAFFOLD / TOKEN REVIEW PAGE ─────────────────────────────────────────────
// Temporary preview of palette, radii, fonts and theming. NOT a site section —
// it gets replaced once real sections start. Wordmark + theme toggle now live
// in the navbar (step 4).

const swatches: { name: string; className: string; textClass?: string }[] = [
  { name: 'paper', className: 'bg-paper border border-line', textClass: 'text-ink' },
  { name: 'ink', className: 'bg-ink', textClass: 'text-paper' },
  { name: 'muted', className: 'bg-muted', textClass: 'text-paper' },
  { name: 'accent', className: 'bg-accent', textClass: 'text-white' },
  { name: 'accent-soft', className: 'bg-accent-soft', textClass: 'text-accent' },
  { name: 'line', className: 'bg-line', textClass: 'text-ink' },
]

export default function TokenPreview() {
  return (
    <main className="mx-auto max-w-content px-6 pb-16 pt-28">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Steps 1–4 · tokens, fonts, theme, navbar
        </p>
      </header>

      {/* Colour swatches */}
      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Colour
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {swatches.map((s) => (
            <div
              key={s.name}
              className={`flex h-24 items-end rounded-card p-3 ${s.className}`}
            >
              <span className={`font-mono text-xs ${s.textClass ?? 'text-ink'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Type — Overused Grotesk glyph audit (brief §1: alpha font, every
          Polish diacritic must pass at huge AND small sizes) */}
      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Type · Overused Grotesk diacritics audit
        </h2>

        {/* Huge */}
        <p className="mt-6 font-display text-8xl font-semibold tracking-tight">
          Zażółć gęślą jaźń
        </p>
        <p className="mt-2 font-display text-8xl font-semibold tracking-tight">
          Jak to działa
        </p>
        <p className="mt-4 font-display text-7xl font-medium">
          ą ć ę ł ń ó ś ź ż
        </p>
        <p className="mt-2 font-display text-7xl font-medium">
          Ą Ć Ę Ł Ń Ó Ś Ź Ż
        </p>

        {/* Small */}
        <p className="mt-6 font-display text-sm">
          Zażółć gęślą jaźń · Jak to działa · ą ć ę ł ń ó ś ź ż · Ą Ć Ę Ł Ń Ó Ś Ź Ż
        </p>

        {/* Weight range of the variable axis */}
        <div className="mt-6 space-y-1 font-display text-3xl">
          <p className="font-light">Wycena 300 · zażółć jaźń</p>
          <p className="font-normal">Wycena 400 · zażółć jaźń</p>
          <p className="font-semibold">Wycena 600 · zażółć jaźń</p>
          <p className="font-black">Wycena 900 · zażółć jaźń</p>
        </div>

        {/* Body + mono */}
        <p className="mt-6 font-sans text-lg text-muted">
          Geist body · Więcej telefonów, więcej zleceń · ą ć ę ł ń ó ś ź ż · Ą Ć Ę Ł Ń Ó Ś Ź Ż
        </p>
        <p className="mt-2 font-mono text-sm uppercase tracking-widest text-muted">
          od 1499 zł · jak to działa
        </p>
      </section>

      {/* Geometry */}
      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Geometry
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="rounded-pill bg-accent px-5 py-2 text-sm text-white">
            pill
          </span>
          <div className="rounded-card border border-line bg-paper p-6 shadow-card">
            card · 22px
          </div>
          <div className="rounded-card-lg border border-line bg-paper p-6 shadow-island">
            island · 24px
          </div>
        </div>
      </section>
    </main>
  )
}
