import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Guarantee } from '@/components/guarantee'
import { Hero } from '@/components/hero'
import { Pricing } from '@/components/pricing'
import { Process } from '@/components/process'
import { Projects } from '@/components/projects'
import { Testimonials } from '@/components/testimonials'

// Token/type review scaffold lives at /tokens.
export default function Home() {
  return (
    <main>
      <Hero />

      {/* The payment promise, stated straight after the pitch. */}
      <Guarantee />

      <Projects />

      {/* Renders nothing until there are real testimonials to show. */}
      <Testimonials />

      <About />

      <Process />

      {/* Pricing also renders Comparison + Faq. */}
      <Pricing />

      <Contact />

      <Footer />
    </main>
  )
}
