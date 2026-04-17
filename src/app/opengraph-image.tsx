import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'La Donuts — fresh handmade donuts in Gillette, WY'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(135deg, #fce7f3 0%, #fef3c7 50%, #fed7aa 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          <div style={{ fontSize: 200, lineHeight: 1, marginBottom: 20 }}>🍩</div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#831843',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            La Donuts
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#7c2d12',
              marginTop: 24,
              fontWeight: 600,
            }}
          >
            Fresh handmade donuts · Gillette, WY
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            fontSize: 24,
            color: '#831843',
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          la-donuts.com
        </div>
      </div>
    ),
    { ...size },
  )
}
