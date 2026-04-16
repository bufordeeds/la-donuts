'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants'

interface HeaderNavProps {
  data: HeaderType
  position?: 'desktop' | 'mobile'
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data: _data, position = 'mobile' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  if (position === 'mobile') {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white hover:text-white hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 top-14 z-40 bg-slate-900/95 backdrop-blur-lg lg:hidden">
            <nav className="container py-8">
              <div className="flex flex-col gap-4">
                {NAVIGATION_ITEMS.map(({ label, href }, i) => {
                  const isActive = pathname === href
                  return (
                    <Link
                      key={i}
                      href={href}
                      className={`text-lg font-bold transition-colors py-2 ${
                        isActive ? 'text-cyan-300' : 'text-white hover:text-cyan-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  )
                })}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-skate hover:opacity-90 text-white font-bold"
                    asChild
                  >
                    <a href={SITE_CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer">Book a Party</a>
                  </Button>
                </div>
                <Link
                  href="/search"
                  className="flex items-center gap-2 text-lg font-medium text-white hover:text-cyan-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon className="size-5" />
                  Search
                </Link>
              </div>
            </nav>
          </div>
        )}
      </>
    )
  }

  return (
    <nav className="flex gap-8 items-center">
      {NAVIGATION_ITEMS.map(({ label, href }, i) => {
        const isActive = pathname === href
        return (
          <Link
            key={i}
            href={href}
            className={`font-semibold transition-colors relative group drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
              isActive ? 'text-cyan-300' : 'text-white hover:text-cyan-300'
            }`}
          >
            {label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-skate transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
        )
      })}
      <Link
        href="/search"
        className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="size-5" />
      </Link>
    </nav>
  )
}
