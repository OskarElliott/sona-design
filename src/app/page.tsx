import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { Pricing } from '@/components/pricing'
import { Projects } from '@/components/projects'

// Token/type review scaffold now lives at /tokens.
export default function Home() {
  return (
    <main>
      <Hero />

      <Projects />

      {/* O mnie (step 7) + Jak to działa (step 8) land here */}
      <div aria-hidden className="h-[20vh]" />

      <Pricing />

      <Contact />

      {/* Footer (step 11) lands here */}
      <div aria-hidden className="h-[10vh]" />
    </main>
  )
}
