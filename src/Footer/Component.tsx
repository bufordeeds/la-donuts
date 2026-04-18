import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { DonutMark } from '@/components/DonutMark'

type Hours = {
  schedule?: Array<{
    day: string
    isClosed?: boolean
    openTime?: string
    closeTime?: string
  }>
  soldOutMessage?: string
}

type LocationData = {
  venueName?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  googleMapsUrl?: string
}

type Contact = {
  messengerUrl?: string
  smsPhone?: string
  email?: string
  instagramUrl?: string
  facebookUrl?: string
  tiktokUrl?: string
}

const DAY_ORDER = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

const DAY_LABELS: Record<(typeof DAY_ORDER)[number], string> = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
}

export async function Footer() {
  let hours: Hours | null = null
  let location: LocationData | null = null
  let contact: Contact | null = null

  try {
    hours = (await getCachedGlobal('hours', 0)()) as Hours
    location = (await getCachedGlobal('location', 0)()) as LocationData
    contact = (await getCachedGlobal('contact-links', 0)()) as Contact
  } catch {
    // empty DB on first boot — render defaults
  }

  const year = new Date().getFullYear()

  const schedule = hours?.schedule ?? []
  const scheduleByDay = new Map(schedule.map((d) => [d.day, d]))

  const cityLine = [location?.city, location?.state].filter(Boolean).join(', ')
  const addressLine = [location?.address, cityLine && `${cityLine}${location?.zip ? ` ${location.zip}` : ''}`]
    .filter(Boolean)
    .join(' · ')

  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2 text-muted">
              <DonutMark size={40} className="shrink-0" />
              <span className="text-xl font-black tracking-tight text-foreground">La Donuts</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Fresh handmade donuts every morning in Gillette, Wyoming.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {contact?.messengerUrl && (
                <a
                  href={contact.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Order on Messenger
                </a>
              )}
              {contact?.smsPhone && (
                <a
                  href={`sms:${contact.smsPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
                >
                  <Phone className="size-4" />
                  Text us
                </a>
              )}
            </div>
            {(contact?.facebookUrl || contact?.instagramUrl) && (
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                {contact.facebookUrl && (
                  <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="size-5 transition-colors hover:text-foreground" />
                  </a>
                )}
                {contact.instagramUrl && (
                  <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="size-5 transition-colors hover:text-foreground" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Hours</h3>
            <dl className="mt-3 space-y-1.5 text-sm">
              {DAY_ORDER.map((day) => {
                const entry = scheduleByDay.get(day)
                const label = DAY_LABELS[day]
                let value = 'Closed'
                if (entry && !entry.isClosed) {
                  value = [entry.openTime, entry.closeTime].filter(Boolean).join(' – ') || 'Open'
                }
                const isClosed = !entry || entry.isClosed
                return (
                  <div key={day} className="flex items-center justify-between gap-4">
                    <dt className="font-medium">{label}</dt>
                    <dd className={isClosed ? 'text-muted-foreground' : ''}>{value}</dd>
                  </div>
                )
              })}
            </dl>
            {hours?.soldOutMessage && (
              <p className="mt-4 rounded-lg bg-accent/20 px-3 py-2 text-xs text-accent-foreground">
                {hours.soldOutMessage}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Find us</h3>
            <div className="mt-3 flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                {location?.venueName && <p className="font-medium">{location.venueName}</p>}
                {addressLine && <p className="text-muted-foreground">{addressLine}</p>}
                {location?.googleMapsUrl && (
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Get directions →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} La Donuts. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-foreground">
              Admin
            </Link>
            <a href="mailto:hello@buford.dev" className="hover:text-foreground">
              Website by Buford Eeds
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
