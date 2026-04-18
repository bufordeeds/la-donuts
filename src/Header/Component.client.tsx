'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DonutMark } from '@/components/DonutMark'

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Order', href: '/order' },
  { label: 'Visit', href: '/#visit' },
] as const

interface HeaderClientProps {
  messengerUrl?: string
  smsPhone?: string
  orderingEnabled?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  messengerUrl,
  smsPhone,
  orderingEnabled,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // When ordering is off, the primary CTA links to Messenger (preferred) or SMS
  const orderHref = orderingEnabled
    ? '/order'
    : messengerUrl || (smsPhone ? `sms:${smsPhone.replace(/\D/g, '')}` : '/order')
  const orderIsExternal = !orderingEnabled && !!(messengerUrl || smsPhone)

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors ${
        scrolled
          ? 'bg-background/90 backdrop-blur border-b border-border/60'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-tight text-background"
          onClick={() => setMobileOpen(false)}
        >
          <DonutMark size={36} className="shrink-0" />
          <span className="text-lg text-foreground sm:text-xl">La Donuts</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-full px-5">
            {orderIsExternal ? (
              <a href={orderHref} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            ) : (
              <Link href={orderHref}>Order Now</Link>
            )}
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 text-foreground md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-2 w-full rounded-full">
              {orderIsExternal ? (
                <a href={orderHref} target="_blank" rel="noopener noreferrer">
                  Order Now
                </a>
              ) : (
                <Link href={orderHref}>Order Now</Link>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
