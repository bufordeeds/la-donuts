'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type NoteSection = {
  title: string
  status: 'question' | 'suggestion' | 'guideline' | 'demo' | 'plan'
  items: string[]
}

const notes: NoteSection[] = [
  {
    title: 'Next Demo Meeting (Date TBD)',
    status: 'demo',
    items: [
      'Promotional Popup — how to update seasonal announcements with images, text, and call-to-action buttons (Globals > Promotional Popup)',
      'Payload Admin Dashboard — walkthrough of editing pages, managing content blocks, uploading media, and using the "Refresh Home + Reviews" button',
      'Newsletter Management — managing subscribers and sending campaigns via Listmonk at email.buford.dev',
    ],
  },
  {
    title: 'Questions for Megan',
    status: 'question',
    items: [
      'Turbify: What are the login credentials for your Turbify (Yahoo Small Business) account? We need access to unlock the domain and get the transfer authorization code.',
    ],
  },
  {
    title: 'Pricing Strategy (Resolved)',
    status: 'guideline',
    items: [
      'Admission prices (cash at the door) are shown tax-inclusive and rounded: Sunday $11, Thursday $8, Friday $13, Saturday $13',
      'Party package prices are shown pre-tax to match the PCS Party booking system, which adds 8.25% sales tax at checkout',
      'Food add-on prices are also pre-tax to match PCS Party (e.g. pizza $15, hotdogs $3.50)',
    ],
  },
  {
    title: 'Domain Transfer Plan — myskatelandwest.com',
    status: 'plan',
    items: [
      'Current setup: myskatelandwest.com is registered and hosted at Turbify (formerly Yahoo Small Business) with an older WordPress site',
      'Plan: Transfer the domain to Cloudflare (~$10/year vs Turbify\'s bundled pricing) and point it to your new site on our private server',
      'Step 1: Log into Turbify, unlock the domain, and get the authorization code',
      'Step 2: Initiate transfer at Cloudflare — takes 5-7 days to complete, no downtime during transfer',
      'Step 3: Once transferred, update DNS to point to the new site — your site goes live at myskatelandwest.com',
      'Email is unaffected — you use Gmail (skatelandwest74@gmail.com), not Turbify email',
      'We\'ll keep the old WordPress site accessible during the transition for reference',
      'After everything is confirmed working, cancel Turbify to stop recurring charges',
    ],
  },
  {
    title: 'Promotional Popup Image Guidelines',
    status: 'guideline',
    items: [
      'Recommended image size: 800x600 pixels (4:3 ratio) or 800x800 (square)',
      'Keep important text/faces in the center — edges may be cropped on mobile',
      'The popup overlays your title and description on the bottom of the image with a dark gradient, so bright/busy bottoms may clash with the text',
      'Best results: photos with a clear subject and lighter/simpler bottom half',
      'File format: JPG or PNG, under 1MB for fast loading',
      'To update: go to Globals > Promotional Popup > upload a new image',
    ],
  },
  {
    title: 'Customer Feedback Form',
    status: 'suggestion',
    items: [
      'Add a simple feedback form to the website where customers can share their experience',
      'This gives unhappy customers a private channel to voice concerns instead of leaving a public negative review',
      'Actionable feedback helps identify real issues (cleanliness, staff, music, pricing) that can be addressed',
      'Happy customers who fill out the form can be encouraged to leave a Google review, gradually raising the overall rating (currently 3.9/5 from 932 reviews)',
      'The form could collect: name (optional), visit date, rating (1-5), what they enjoyed, what could be improved',
      'Submissions would appear in the admin under Form Submissions for easy review',
    ],
  },
  {
    title: 'Google Review Rating Strategy',
    status: 'suggestion',
    items: [
      'Current rating: 3.9/5 from 932 reviews — raising this to 4.2+ would significantly boost visibility in Google Maps searches',
      'Idea: place a small sign or QR code at the exit or snack bar that says "Loved your visit? Leave us a review!" linking directly to the Google review page',
      'The website could include a "Leave a Review" link in the footer or on a thank-you page after booking',
      'Respond to negative reviews on Google — a thoughtful reply shows future customers you care and can turn a negative into a positive impression',
      'Track recurring complaints from the feedback form and address them — fewer bad experiences = fewer bad reviews',
    ],
  },
]

const statusColors: Record<NoteSection['status'], { bg: string; label: string }> = {
  demo: { bg: '#7c3aed', label: 'Demo' },
  question: { bg: '#e3a008', label: 'Questions' },
  plan: { bg: '#0891b2', label: 'Plan' },
  guideline: { bg: '#16a34a', label: 'Guidelines' },
  suggestion: { bg: '#2563eb', label: 'Suggestion' },
}

export const AdminNotes: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        marginTop: '1rem',
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
        <span>Notes &amp; Suggestions from Buford</span>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div style={{ padding: '1.5rem' }}>
          <p style={{ marginTop: 0, color: 'var(--theme-elevation-600)', fontSize: '0.9rem' }}>
            Questions, suggestions, and guidelines for the website. Updated as new items come up.
          </p>

          {notes.map((section, i) => {
            const status = statusColors[section.status]
            return (
              <div
                key={i}
                style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom:
                    i < notes.length - 1 ? '1px solid var(--theme-elevation-150)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      color: 'white',
                      background: status.bg,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {status.label}
                  </span>
                  <strong style={{ fontSize: '1rem' }}>{section.title}</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.35rem',
                        color: 'var(--theme-elevation-800)',
                        lineHeight: '1.4',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
