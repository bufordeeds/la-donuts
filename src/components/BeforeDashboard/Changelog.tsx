'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type ChangelogEntry = {
  date: string
  title: string
  items: string[]
}

const changelog: ChangelogEntry[] = [
  {
    date: 'March 22, 2026',
    title: 'Icon Library & Popup Image',
    items: [
      'Replaced all emoji icons with a professional icon library across the site',
      'Service card icons are now selectable from a dropdown in the admin',
      'Added Easter bunny image to the promotional popup with text overlay',
      'Popup no longer requires scrolling — text displays over the image',
    ],
  },
  {
    date: 'March 21, 2026',
    title: 'Content Polish & Navigation',
    items: [
      'Removed the large neon "SKATELAND WEST" banner from all pages except the homepage',
      'Updated Schedule page with real prices (tax included) and policies from the old site',
      'Added clickable links — "Schedule page" and "Private Events page" now link to the right pages',
      'Added Pricing and FAQ to the main navigation menu',
      'Updated the Promotional Popup with Easter Break & Viva Fiesta 2026 schedule',
      'Added Newsletter Signup section to the homepage — connected to your mailing list',
    ],
  },
  {
    date: 'March 18, 2026',
    title: 'New Pages & Features',
    items: [
      'Added FAQ page with common questions and answers',
      'Added Contact Us page with location, phone, email, and hours',
      'Added Pricing page with all admission prices and policies',
      'Added Fitness Facts section to the About page',
      'Added Privacy Policy and Terms of Service pages',
    ],
  },
  {
    date: 'March 15, 2026',
    title: 'Newsletter & Promotions',
    items: [
      'Built Newsletter Signup block — visitors can subscribe to your mailing list for coupons and specials',
      'Connected newsletter to Listmonk (your mailing list manager)',
      'Built Promotional Popup system — show seasonal announcements to first-time visitors',
      'You can update the popup content, image, and button from the admin under Globals > Promotional Popup',
    ],
  },
  {
    date: 'March 8, 2026',
    title: 'Party Booking & UX Improvements',
    items: [
      'Linked all "Book a Party" buttons to your PCS Party online booking system',
      'Fixed header size and contrast for better readability',
      'Fixed spacing between sections for a cleaner look',
      'Improved mobile layout — stats, buttons, and text all fit properly on phones',
    ],
  },
  {
    date: 'February 2026',
    title: 'Deployment & Infrastructure',
    items: [
      'Moved website from Vercel to your own private server for better performance and control',
      'Set up automatic deployments — changes go live automatically when code is updated',
      'Set up media storage — all uploaded images are stored securely on your server',
      'Website is now live at skateland.buford.dev',
    ],
  },
  {
    date: 'January 2026',
    title: 'Website Launch',
    items: [
      'Built the Skateland West website from scratch using Payload CMS and Next.js',
      'Custom retro neon homepage design with animated hero section',
      'Google Reviews integration — pulls your latest rating and review count automatically',
      'Schedule cards showing daily skating sessions with prices',
      'Birthday Parties page with package details',
      'Private Events page with rental information',
      'Learn to Skate page with lesson details',
      'About page with rink history and info',
      'Custom admin dashboard with quick start guide',
      '"Refresh Home + Reviews" button to pull latest Google reviews on demand',
    ],
  },
]

export const Changelog: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        marginTop: '2rem',
        border: '1px solid var(--theme-elevation-200)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          background: 'var(--theme-elevation-50)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: 'var(--theme-text)',
        }}
      >
        <span>Website Changelog</span>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div style={{ padding: '1.5rem' }}>
          <p style={{ marginTop: 0, color: 'var(--theme-elevation-600)', fontSize: '0.9rem' }}>
            A summary of all updates and improvements made to your website.
          </p>

          {changelog.map((entry, i) => (
            <div
              key={i}
              style={{
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom:
                  i < changelog.length - 1 ? '1px solid var(--theme-elevation-150)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--theme-elevation-500)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {entry.date}
                </span>
                <strong style={{ fontSize: '1rem' }}>{entry.title}</strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {entry.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: '0.9rem',
                      marginBottom: '0.25rem',
                      color: 'var(--theme-elevation-800)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
