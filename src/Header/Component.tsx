import React from 'react'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Header() {
  // Fetch contact info so the header CTA can deep-link to Messenger / SMS
  // when online ordering is disabled. Fails softly if globals are empty.
  let messengerUrl: string | undefined
  let smsPhone: string | undefined
  let orderingEnabled = false

  try {
    const contact = (await getCachedGlobal('contact-links', 0)()) as {
      messengerUrl?: string
      smsPhone?: string
    } | null
    messengerUrl = contact?.messengerUrl
    smsPhone = contact?.smsPhone

    const settings = (await getCachedGlobal('site-settings', 0)()) as {
      orderingEnabled?: boolean
    } | null
    orderingEnabled = Boolean(settings?.orderingEnabled)
  } catch {
    // Empty DB on first boot — use defaults
  }

  return (
    <HeaderClient
      messengerUrl={messengerUrl}
      smsPhone={smsPhone}
      orderingEnabled={orderingEnabled}
    />
  )
}
