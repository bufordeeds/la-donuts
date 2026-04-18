'use client'

import React from 'react'

import { DonutMark } from '@/components/DonutMark'

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
      title="Visit La Donuts website"
    >
      <DonutMark size={28} />
    </a>
  )
}

export default Icon
