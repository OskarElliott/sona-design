import { Pricing } from '@/components/pricing'
import { Projects } from '@/components/projects'

// Token/type review scaffold now lives at /tokens.
export default function Home() {
  return (
    <main>
      {/* Hero — deliberately empty. Owner designs it after reviewing the
          components (brief §2 has the target layout). The marker text is
          scaffold, not design; delete freely. */}
      <section id="hero" className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          hero wkrótce
        </p>
      </section>

      <Projects />

      {/* O mnie (step 7) + Jak to działa (step 8) land here */}
      <div aria-hidden className="h-[20vh]" />

      <Pricing />

      {/* Kontakt (step 10) + footer land here */}
      <div aria-hidden className="h-[30vh]" />
    </main>
  )
}
