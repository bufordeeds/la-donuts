import { ImageResponse } from 'next/og'

// Browser tab favicon — rendered at 32x32 via next/og. Reuses the same
// visual as <DonutMark> so the browser icon matches the header mark.

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fdf5ec',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="30" height="30">
          <circle cx="20" cy="20" r="17" fill="#d89b6a" />
          <path
            d="M5.2 18.5 C 5.2 10 12 4 20 4 C 28 4 34.8 10 34.8 18.5 C 33.5 21 31 23 28 23 C 25 23 23.5 21 21.5 21 C 19.5 21 18 23 15 23.5 C 12 24 9 22.5 7 22 C 6 21.5 5.5 20 5.2 18.5 Z"
            fill="#ea4c89"
          />
          <path
            d="M28.5 22.8 C 28.5 25 29.4 26 30.4 26 C 31.4 26 32 25 32 22.8 Z"
            fill="#ea4c89"
          />
          <circle cx="20" cy="20" r="5.5" fill="#fdf5ec" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
