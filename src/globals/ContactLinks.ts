import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ContactLinks: GlobalConfig = {
  slug: 'contact-links',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description:
      'Contact & social links shown across the site (header CTA, footer, order confirmation).',
  },
  fields: [
    {
      name: 'messengerUrl',
      type: 'text',
      admin: {
        description: 'Facebook Messenger m.me link for DM orders.',
      },
    },
    {
      name: 'smsPhone',
      type: 'text',
      admin: {
        description: 'Phone number for SMS orders, e.g. "210-336-0450".',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'facebookUrl',
      type: 'text',
    },
    {
      name: 'tiktokUrl',
      type: 'text',
    },
  ],
}
