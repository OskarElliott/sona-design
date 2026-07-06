import Link from 'next/link'

// Branded 404: keeps the visitor on-brand and links back home (also gives
// crawlers a clean internal link off any dead URL). noindex.
export const metadata = {
  title: 'Nie znaleziono strony',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-semibold tracking-tight md:text-8xl">
        404<span className="text-accent">.</span>
      </p>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Tej strony nie ma
      </h1>
      <p className="mt-4 max-w-sm text-muted">
        Link mógł się zestarzeć albo adres jest błędny. Wróćmy na stronę główną.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-pill bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none"
      >
        Wróć na stronę główną
      </Link>
    </main>
  )
}
