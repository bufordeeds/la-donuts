'use client'

import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export const RefreshHomeButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleRefresh = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/update-home', { method: 'POST' })
      const data = await response.json()

      if (response.ok) {
        setMessage(`Updated! ${data.reviewsFromGoogle} reviews from Google (${data.overallRating}/5 rating)`)
      } else {
        setMessage(`Error: ${data.message || 'Failed to update'}`)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
      <button
        onClick={handleRefresh}
        disabled={loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: loading ? 'var(--theme-elevation-300)' : 'var(--theme-elevation-500)',
          color: 'white',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'wait' : 'pointer',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          whiteSpace: 'nowrap',
        }}
      >
        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Updating...' : 'Refresh Home + Reviews'}
      </button>
      {message && (
        <span style={{ fontSize: '0.8rem', color: message.startsWith('Error') ? 'red' : 'green' }}>
          {message}
        </span>
      )}
    </div>
  )
}
