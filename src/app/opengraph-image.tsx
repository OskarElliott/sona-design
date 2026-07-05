import { ImageResponse } from 'next/og'
import { SITE_URL } from '@/lib/site'

// Branded link preview (WhatsApp / Messenger / LinkedIn), generated from
// code at build time: no binary asset to maintain. Uses the display face
// as TTF because the OG renderer (satori) cannot parse woff2.
// Edge runtime on purpose: the nodejs build of @vercel/og resolves its
// wasm assets through fileURLToPath, which explodes on this repo's
// space-containing Windows path ("Sona%20Design"). The edge bundle
// inlines assets and sidesteps that.
export const runtime = 'edge'
export const alt = 'Sona. Strony internetowe, przez które dzwoni telefon.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const display = await fetch(
    new URL('../fonts/OverusedGrotesk-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FCFBF9',
          padding: 72,
          fontFamily: 'Overused Grotesk',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: 60,
            width: 640,
            height: 460,
            background:
              'radial-gradient(closest-side, rgba(229,50,43,0.14), rgba(229,50,43,0))',
          }}
        />
        <div style={{ display: 'flex', fontSize: 44, color: '#15120F' }}>
          Sona<span style={{ color: '#E5322B' }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 78,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#6E675E' }}>Strony internetowe,</span>
          <span style={{ color: '#15120F' }}>przez które dzwoni telefon.</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
          }}
        >
          <span
            style={{
              display: 'flex',
              backgroundColor: '#E5322B',
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: 999,
            }}
          >
            od 799 PLN
          </span>
          <span style={{ color: '#6E675E' }}>{SITE_URL.replace('https://', '')}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Overused Grotesk', data: display, weight: 600 }] }
  )
}
