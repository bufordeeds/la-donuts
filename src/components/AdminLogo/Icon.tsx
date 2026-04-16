'use client'

import React from 'react'

const Icon: React.FC = () => {
  return (
    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Visit Skateland West Website"
    >
      <img
        src="/pink-skates-icon.png"
        alt="Skateland West"
        style={{
          width: '24px',
          height: '24px',
          objectFit: 'contain',
        }}
      />
    </a>
  )
}

export default Icon
