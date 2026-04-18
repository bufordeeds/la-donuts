import React from 'react'

type Props = {
  className?: string
  /** Pixel size — sets both width and height. Default 32. */
  size?: number
  /** Controls SVG aria-label. Defaults to hidden-from-AT (decorative). */
  title?: string
}

/**
 * La Donuts brand mark — a hand-drawn looking donut with pink icing and
 * a golden brown body. Inline SVG so it stays crisp at any size and has
 * true transparency (no baked-in checker like the generated logo PNG).
 */
export const DonutMark: React.FC<Props> = ({ className, size = 32, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Donut body (golden brown) */}
      <circle cx="20" cy="20" r="17" fill="#d89b6a" />
      {/* Pink icing blob covering roughly the top 60% */}
      <path
        d="M5.2 18.5
           C 5.2 10 12 4 20 4
           C 28 4 34.8 10 34.8 18.5
           C 33.5 21 31 23 28 23
           C 25 23 23.5 21 21.5 21
           C 19.5 21 18 23 15 23.5
           C 12 24 9 22.5 7 22
           C 6 21.5 5.5 20 5.2 18.5 Z"
        fill="#ea4c89"
      />
      {/* Little drip */}
      <path
        d="M28.5 22.8 C 28.5 25 29.4 26 30.4 26 C 31.4 26 32 25 32 22.8 Z"
        fill="#ea4c89"
      />
      {/* Sprinkles */}
      <rect x="11" y="11" width="2.2" height="0.8" rx="0.4" fill="#ffd166" transform="rotate(-25 12 11)" />
      <rect x="17" y="9" width="2.2" height="0.8" rx="0.4" fill="#fff" transform="rotate(20 18 9)" />
      <rect x="23" y="12" width="2.2" height="0.8" rx="0.4" fill="#6cd5c0" transform="rotate(-10 24 12)" />
      <rect x="26" y="17" width="2.2" height="0.8" rx="0.4" fill="#ffd166" transform="rotate(45 27 17)" />
      {/* Hole */}
      <circle cx="20" cy="20" r="5.5" fill="currentColor" />
    </svg>
  )
}

export default DonutMark
