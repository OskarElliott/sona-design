import { SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_DISPLAY } from '@/lib/site'

// Footer (step 11) — Shape's inverted floating card (ink island on paper,
// flips to cream in dark like the Firma pricing card), KOTA's email-as-
// hero, adream's crawlable link column. The giant wordmark bookends the
// hero's 4% ghost at full volume. Server component: every animation here
// is CSS (roll-hover links, underline-draw email, arrow nudges).

const LINKS = [
  { href: '#projekty', label: 'Projekty' },
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#ceny', label: 'Ceny' },
  { href: '#faq', label: 'Częste pytania' },
  { href: '#kontakt', label: 'Kontakt' },
]

const ROLL_EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-block text-sm text-paper/70 transition-colors hover:text-paper motion-reduce:transition-none"
    >
      <span className="relative block overflow-hidden">
        <span
          className={`block transition-transform duration-300 ${ROLL_EASE} group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute left-0 top-full block transition-transform duration-300 ${ROLL_EASE} group-hover:-translate-y-full motion-reduce:hidden`}
        >
          {label}
        </span>
      </span>
    </a>
  )
}

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[96rem] overflow-hidden rounded-card-lg bg-ink px-6 pb-8 pt-14 text-paper md:px-12 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr,0.8fr,1.2fr]">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Podoba Ci się to, co widzisz?
            </p>
            <a
              href="#kontakt"
              className="mt-6 inline-block rounded-pill bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none"
            >
              Darmowa wycena
            </a>
            <p className="mt-4 text-sm text-paper/60">Bez zaliczek. Płatność przy publikacji.</p>
          </div>

          <nav aria-label="Stopka">
            <p className="text-sm text-paper/50">Na skróty</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <RollLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:text-right">
            <p className="text-sm text-paper/50">Napisz do mnie</p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="group relative mt-4 inline-block break-all pb-1 font-display text-xl font-medium tracking-tight md:text-2xl"
            >
              {SITE_EMAIL}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-paper transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </a>
            <p className="mt-6 text-sm text-paper/70">
              <a href={`tel:${SITE_PHONE}`} className="hover:text-paper">
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-1 text-sm text-paper/60">Odpowiadam zwykle tego samego dnia.</p>
          </div>
        </div>

        {/* The bookend: the hero whispers this wordmark at 4%, here it
            speaks at full volume. */}
        <p
          aria-hidden
          className="pointer-events-none mt-14 select-none text-center font-display text-[clamp(5rem,20vw,18rem)] font-semibold leading-none tracking-tight"
        >
          Sona<span className="text-accent">.</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME} · Strony internetowe · Kraków i okolice
          </p>
          <a
            href="#hero"
            className="group inline-flex items-center gap-1.5 text-paper/70 transition-colors hover:text-paper motion-reduce:transition-none"
          >
            Zjechałeś za daleko? Wróć na górę
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
