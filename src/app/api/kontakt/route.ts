import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SITE_EMAIL, SITE_NAME } from '@/lib/site'

// Contact form handler. Env vars (set in Vercel):
//   RESEND_API_KEY   — required to actually send
//   CONTACT_TO_EMAIL — inbox that receives enquiries (defaults to SITE_EMAIL)
//   CONTACT_FROM_EMAIL — verified Resend sender. Until the real domain is
//     verified in Resend, use "Sona <onboarding@resend.dev>" (delivers only
//     to the Resend account owner). After domain verification, switch to
//     e.g. "Sona <kontakt@twojadomena.pl>".
//
// Resend is lazy-initialised INSIDE the handler: `new Resend(undefined)`
// throws, which would break the build when the key is absent at build time.

export const runtime = 'nodejs'

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()
  const consent = body.consent === true
  // Honeypot: a hidden field real users never fill. If it has content, it's
  // a bot — pretend success so the bot learns nothing.
  const trap = String(body.company ?? '').trim()

  if (trap) return NextResponse.json({ ok: true })

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Uzupełnij wymagane pola.' }, { status: 400 })
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Podaj poprawny adres e-mail.' }, { status: 400 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'Wymagana jest zgoda na kontakt.' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Wiadomość jest zbyt długa.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Formularz jest chwilowo niedostępny. Napisz na e-mail.' },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO_EMAIL ?? SITE_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? `${SITE_NAME} <onboarding@resend.dev>`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Darmowa wycena: ${name}`,
      text: [
        `Imię: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        '',
        message,
      ]
        .filter((line) => line !== null)
        .join('\n'),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Nie udało się wysłać. Spróbuj ponownie.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return NextResponse.json({ error: 'Nie udało się wysłać. Spróbuj ponownie.' }, { status: 500 })
  }
}
