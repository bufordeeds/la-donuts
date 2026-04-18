import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getCachedGlobal } from '@/utilities/getGlobals'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Menu',
  description: 'Every flavor we make — classic favorites, filled donuts, and rotating specialties.',
}

type FlavorDoc = {
  id: string | number
  name: string
  category: 'classic' | 'specialty' | 'filled' | 'seasonal'
  description?: string | null
  image?: { url?: string | null; alt?: string | null } | string | number | null
  priceCents: number
  isSoldOut?: boolean | null
  isOnRotation?: boolean | null
  sortOrder?: number | null
}

type Contact = {
  messengerUrl?: string
  smsPhone?: string
}

const CATEGORY_ORDER: FlavorDoc['category'][] = ['classic', 'filled', 'specialty', 'seasonal']
const CATEGORY_LABELS: Record<FlavorDoc['category'], string> = {
  classic: 'Classic',
  specialty: 'Specialty',
  filled: 'Filled',
  seasonal: 'Seasonal',
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default async function MenuPage() {
  const payload = await getPayload({ config: configPromise })
  const [flavorsRes, contact] = await Promise.all([
    payload
      .find({
        collection: 'flavors',
        limit: 200,
        sort: 'sortOrder',
        where: { isOnRotation: { equals: true } },
        depth: 1,
      })
      .catch(() => ({ docs: [] as FlavorDoc[] })),
    getCachedGlobal('contact-links', 0)().catch(() => null) as Promise<Contact | null>,
  ])

  const flavors = (flavorsRes?.docs ?? []) as FlavorDoc[]
  const byCategory: Record<string, FlavorDoc[]> = {}
  for (const flavor of flavors) {
    if (!byCategory[flavor.category]) byCategory[flavor.category] = []
    byCategory[flavor.category].push(flavor)
  }
  const soldOutCount = flavors.filter((f) => f.isSoldOut).length

  return (
    <main className="flex-1 pb-20">
      <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Home
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Our donuts</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Everything we make when we&apos;re open.{' '}
          {soldOutCount > 0
            ? `Today ${soldOutCount} flavor${soldOutCount === 1 ? ' is' : 's are'} sold out — they&apos;ll be back tomorrow.`
            : 'Come early — we sell out daily.'}
        </p>

        {flavors.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-muted/40 p-10 text-center">
            <p className="text-4xl" aria-hidden>
              🍩
            </p>
            <h2 className="mt-4 text-lg font-bold">Menu coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re still adding flavors. Message us on Facebook or text to see what&apos;s fresh.
            </p>
            {contact?.messengerUrl && (
              <a
                href={contact.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Message us
              </a>
            )}
          </div>
        )}

        {CATEGORY_ORDER.map((cat) => {
          const list = byCategory[cat]
          if (!list?.length) return null
          return (
            <section key={cat} className="mt-12">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((flavor) => {
                  const imageUrl =
                    typeof flavor.image === 'object' && flavor.image && 'url' in flavor.image
                      ? flavor.image.url
                      : null
                  const soldOut = Boolean(flavor.isSoldOut)
                  return (
                    <article
                      key={String(flavor.id)}
                      className={`flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm ${soldOut ? 'opacity-75' : ''}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={flavor.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`object-cover ${soldOut ? 'grayscale' : ''}`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-donut-gradient text-5xl">
                            🍩
                          </div>
                        )}
                        {soldOut && (
                          <>
                            <div className="absolute inset-0 bg-background/30" aria-hidden />
                            <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide text-background shadow">
                              Sold out
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className={`text-base font-bold leading-tight ${soldOut ? 'text-muted-foreground line-through decoration-2' : ''}`}
                          >
                            {flavor.name}
                          </h3>
                          <span
                            className={`shrink-0 text-sm font-semibold ${soldOut ? 'text-muted-foreground' : 'text-primary'}`}
                          >
                            {formatPrice(flavor.priceCents)}
                          </span>
                        </div>
                        {flavor.description && (
                          <p className="text-sm text-muted-foreground">{flavor.description}</p>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}
