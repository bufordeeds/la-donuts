import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Button } from '@/components/ui/button'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const dynamic = 'force-dynamic'

type FlavorDoc = {
  id: string | number
  name: string
  category: 'classic' | 'specialty' | 'filled' | 'seasonal'
  description?: string | null
  image?: { url?: string | null; alt?: string | null } | null | string | number
  priceCents: number
  isAvailableToday?: boolean | null
  isOnRotation?: boolean | null
  sortOrder?: number | null
}

type Hours = {
  schedule?: Array<{ day: string; isClosed?: boolean; openTime?: string; closeTime?: string }>
  soldOutMessage?: string
}

type LocationData = {
  venueName?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  googleMapsUrl?: string
  parkingNote?: string
}

type Contact = {
  messengerUrl?: string
  smsPhone?: string
}

type SiteSettings = {
  heroTagline?: string
  heroSubtitle?: string
  orderingEnabled?: boolean
}

const CATEGORY_LABELS: Record<FlavorDoc['category'], string> = {
  classic: 'Classic',
  specialty: 'Specialty',
  filled: 'Filled',
  seasonal: 'Seasonal',
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

async function loadContent() {
  const payload = await getPayload({ config: configPromise })

  const [flavorsRes, hours, location, contact, settings] = await Promise.all([
    payload
      .find({
        collection: 'flavors',
        limit: 100,
        sort: 'sortOrder',
        where: { isOnRotation: { equals: true } },
        depth: 1,
      })
      .catch(() => ({ docs: [] as FlavorDoc[] })),
    getCachedGlobal('hours', 0)().catch(() => null) as Promise<Hours | null>,
    getCachedGlobal('location', 0)().catch(() => null) as Promise<LocationData | null>,
    getCachedGlobal('contact-links', 0)().catch(() => null) as Promise<Contact | null>,
    getCachedGlobal('site-settings', 1)().catch(() => null) as Promise<SiteSettings | null>,
  ])

  return {
    flavors: (flavorsRes?.docs ?? []) as FlavorDoc[],
    hours,
    location,
    contact,
    settings,
  }
}

function OrderCTAButtons({
  contact,
  settings,
  size = 'lg',
  className = '',
}: {
  contact: Contact | null
  settings: SiteSettings | null
  size?: 'lg' | 'default' | 'sm'
  className?: string
}) {
  const orderingOn = Boolean(settings?.orderingEnabled)
  const messengerHref = contact?.messengerUrl
  const smsHref = contact?.smsPhone ? `sms:${contact.smsPhone.replace(/\D/g, '')}` : undefined

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      {orderingOn ? (
        <Button asChild size={size} className="rounded-full px-6">
          <Link href="/order">
            Reserve donuts
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      ) : messengerHref ? (
        <Button asChild size={size} className="rounded-full px-6">
          <a href={messengerHref} target="_blank" rel="noopener noreferrer">
            Order on Messenger
            <ArrowRight className="ml-1 size-4" />
          </a>
        </Button>
      ) : null}
      {smsHref && (
        <Button asChild size={size} variant="outline" className="rounded-full px-6">
          <a href={smsHref}>Text us to order</a>
        </Button>
      )}
      <Button asChild size={size} variant="ghost" className="rounded-full px-6">
        <Link href="/menu">See the menu</Link>
      </Button>
    </div>
  )
}

function FlavorCard({ flavor }: { flavor: FlavorDoc }) {
  const imageUrl =
    typeof flavor.image === 'object' && flavor.image && 'url' in flavor.image
      ? flavor.image.url
      : null
  const imageAlt =
    typeof flavor.image === 'object' && flavor.image && 'alt' in flavor.image
      ? flavor.image.alt || flavor.name
      : flavor.name

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || flavor.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-donut-gradient text-5xl">
            🍩
          </div>
        )}
        {flavor.isAvailableToday && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
            Available today
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-tight">{flavor.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-primary">
            {formatPrice(flavor.priceCents)}
          </span>
        </div>
        {flavor.description && (
          <p className="text-sm text-muted-foreground">{flavor.description}</p>
        )}
      </div>
    </article>
  )
}

export default async function HomePage() {
  const { flavors, hours, location, contact, settings } = await loadContent()

  const availableToday = flavors.filter((f) => f.isAvailableToday)
  const byCategory = flavors.reduce<Record<string, FlavorDoc[]>>((acc, f) => {
    if (!acc[f.category]) acc[f.category] = []
    acc[f.category].push(f)
    return acc
  }, {})

  const tagline = settings?.heroTagline || 'Fresh handmade donuts daily'
  const subtitle =
    settings?.heroSubtitle ||
    'Warm, fluffy donuts made fresh every morning — classic favorites, filled donuts, and rotating specialty flavors.'

  const openDays = hours?.schedule?.filter((d) => !d.isClosed) ?? []
  const openDayRange =
    openDays.length > 0
      ? (() => {
          const first = openDays[0]
          const last = openDays[openDays.length - 1]
          const dayShort = (d: string) => d.charAt(0).toUpperCase() + d.slice(1, 3)
          return first === last ? dayShort(first.day) : `${dayShort(first.day)} – ${dayShort(last.day)}`
        })()
      : 'Tue – Sat'
  const firstOpen = openDays[0]
  const openHoursText = firstOpen
    ? [firstOpen.openTime, firstOpen.closeTime].filter(Boolean).join(' – ')
    : '6:30 AM until sold out'

  const cityLine = [location?.city, location?.state].filter(Boolean).join(', ')

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="relative overflow-hidden bg-donut-gradient">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-background/70 px-3 py-1 text-xs font-semibold tracking-wide text-primary shadow-sm backdrop-blur">
                Gillette, Wyoming
              </span>
              <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {tagline}
                <span aria-hidden className="ml-2 inline-block">🍩</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-foreground/80 sm:text-lg">{subtitle}</p>

              <div className="mt-8">
                <OrderCTAButtons contact={contact} settings={settings} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/70">
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  {openDayRange} · {openHoursText}
                </span>
                {location?.address && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    {location.address}
                    {cityLine && `, ${cityLine}`}
                  </span>
                )}
              </div>
            </div>

            <div className="relative hidden aspect-square w-full max-w-md lg:block">
              <div className="absolute inset-0 rounded-full bg-donut-gradient-deep opacity-30 blur-3xl" />
              <div className="animate-float relative flex h-full items-center justify-center text-[14rem] leading-none">
                🍩
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S MENU — only shown if she's marked any flavor available today */}
      {availableToday.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 sm:pt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Today</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                Fresh out of the fryer
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                What&apos;s available for pickup today. We sell out daily — come early.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Full menu <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableToday.map((flavor) => (
              <FlavorCard key={String(flavor.id)} flavor={flavor} />
            ))}
          </div>
        </section>
      )}

      {/* MENU BY CATEGORY — fallback when nothing is marked "today" */}
      {availableToday.length === 0 && flavors.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 sm:pt-20">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">The menu</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            Our handmade donuts
          </h2>
          {Object.entries(byCategory).map(([cat, list]) => (
            <div key={cat} className="mt-8">
              <h3 className="text-lg font-bold text-foreground/80">
                {CATEGORY_LABELS[cat as FlavorDoc['category']] || cat}
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((flavor) => (
                  <FlavorCard key={String(flavor.id)} flavor={flavor} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EMPTY STATE */}
      {flavors.length === 0 && (
        <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
          <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-10">
            <p className="text-4xl" aria-hidden>
              🍩
            </p>
            <h2 className="mt-4 text-xl font-bold">Menu coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re still adding flavors. In the meantime, message us on Facebook or send a text
              to see what&apos;s fresh today.
            </p>
            <div className="mt-6 flex justify-center">
              <OrderCTAButtons contact={contact} settings={settings} size="default" />
            </div>
          </div>
        </section>
      )}

      {/* VISIT — hours + location combined */}
      <section id="visit" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="grid gap-10 rounded-3xl border border-border/60 bg-card p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Visit us</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Find the trailer</h2>
            <div className="mt-5 flex items-start gap-3 text-sm">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                {location?.venueName && <p className="text-base font-bold">{location.venueName}</p>}
                <p className="text-muted-foreground">
                  {location?.address || '2100 S Douglas Hwy'}
                  <br />
                  {cityLine ? `${cityLine} ${location?.zip || ''}`.trim() : 'Gillette, WY 82718'}
                </p>
                {location?.parkingNote && (
                  <p className="mt-2 text-sm text-foreground/80">{location.parkingNote}</p>
                )}
                {location?.googleMapsUrl && (
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Get directions <ArrowRight className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Hours</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Open daily</h2>
            <dl className="mt-5 divide-y divide-border/60 text-sm">
              {(hours?.schedule ?? []).map((entry) => (
                <div key={entry.day} className="flex items-center justify-between py-2">
                  <dt className="font-semibold capitalize">{entry.day}</dt>
                  <dd className={entry.isClosed ? 'text-muted-foreground' : ''}>
                    {entry.isClosed
                      ? 'Closed'
                      : [entry.openTime, entry.closeTime].filter(Boolean).join(' – ') || 'Open'}
                  </dd>
                </div>
              ))}
              {(!hours?.schedule || hours.schedule.length === 0) && (
                <p className="py-2 text-muted-foreground">
                  Tue – Sat · 6:30 AM until sold out
                </p>
              )}
            </dl>
            {hours?.soldOutMessage && (
              <p className="mt-4 rounded-xl bg-accent/20 px-4 py-3 text-sm text-accent-foreground">
                ⚡ {hours.soldOutMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-donut-gradient-deep px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            Come find the donut trailer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:text-base">
            Reserve ahead by text or Messenger — or roll by early before we sell out.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {contact?.messengerUrl && (
              <a
                href={contact.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow hover:bg-white/95"
              >
                Order on Messenger
              </a>
            )}
            {contact?.smsPhone && (
              <a
                href={`sms:${contact.smsPhone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Text {contact.smsPhone}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
