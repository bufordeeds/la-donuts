'use client'

import React from 'react'

const Logo: React.FC = () => {
  return (
    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        color: 'inherit',
      }}
      title="Visit Skateland West Website"
    >
      <img
        src="/pink-skates-icon.png"
        alt="Skateland West"
        style={{
          width: '40px',
          height: '40px',
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Skateland West
      </span>
    </a>
  )
}

export default Logo
