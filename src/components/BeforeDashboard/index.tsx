import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'
import { RefreshHomeButton } from './RefreshHomeButton'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your La Donuts Dashboard!</h4>
      </Banner>

      <div
        style={{
          background: 'var(--theme-elevation-100)',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--theme-elevation-200)',
        }}
      >
        <p style={{ margin: 0, fontSize: '1rem' }}>
          Website built by <strong>Buford Eeds</strong> &mdash;{' '}
          <a href="mailto:hello@buford.dev">hello@buford.dev</a>
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontSize: '1.1rem', margin: 0, flex: 1 }}>
          This is your admin panel. Update flavors, hours, orders, and site content here.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <RefreshHomeButton />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'var(--theme-success-500)',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
            }}
          >
            View Website &rarr;
          </a>
        </div>
      </div>

      <h3>Daily tasks</h3>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Flavors:</strong> Each morning, open &quot;Flavors&quot; and toggle{' '}
          <em>Available Today</em> on for what you&apos;re selling. Uncheck when you sell out.
        </li>
        <li>
          <strong>Orders:</strong> Check &quot;Orders&quot; for pre-orders and same-day
          reservations. Mark <em>Ready</em> once prepped, <em>Picked up</em> when handed off.
        </li>
      </ul>

      <h3>Setup & content</h3>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Flavors:</strong> Add new flavors (photo, description, price, Square catalog ID).
          Uncheck &quot;On Rotation&quot; to retire a flavor without deleting it.
        </li>
        <li>
          <strong>Hours / Location / Contact Links:</strong> Under &quot;Globals&quot;, update
          operating hours, address, and social / messaging links.
        </li>
        <li>
          <strong>Site Settings:</strong> Logo, brand colors, hero copy, and the{' '}
          <em>Ordering Enabled</em> kill-switch (turn off to hide all online-order CTAs).
        </li>
        <li>
          <strong>Pages:</strong> Edit the home page and any other public pages.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
