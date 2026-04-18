'use client'

import React from 'react'

import { DonutMark } from '@/components/DonutMark'

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
      title="Visit La Donuts website"
    >
      <DonutMark size={40} />
      <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>La Donuts</span>
    </a>
  )
}

export default Logo
