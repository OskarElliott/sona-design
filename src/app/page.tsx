import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Pricing } from '@/components/pricing'
import { Process } from '@/components/process'
import { Projects } from '@/components/projects'

// Token/type review scaffold now lives at /tokens.
export default function Home() {
  return (
    <main>
      <Hero />

      <Projects />

      <About />

      <Process />

      <Pricing />

      <Contact />

      <Footer />
    </main>
  )
}
