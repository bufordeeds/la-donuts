import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Site-wide branding + kill-switches for online ordering.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroTagline',
      type: 'text',
      defaultValue: 'Fresh handmade donuts daily',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'Warm, fluffy donuts made fresh every morning — classic favorites, filled donuts, and rotating specialty flavors.',
    },
    {
      name: 'primaryColor',
      type: 'text',
      defaultValue: '#f472b6',
      admin: { description: 'Hex color, e.g. #f472b6 (pink).' },
    },
    {
      name: 'accentColor',
      type: 'text',
      defaultValue: '#fbbf24',
      admin: { description: 'Hex color, e.g. #fbbf24 (amber).' },
    },
    {
      name: 'orderingEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Master kill-switch for online ordering. When off, all "Order" CTAs site-wide link to FB Messenger / SMS instead.',
      },
    },
    {
      name: 'sameDayCutoffMinutesBeforeClose',
      type: 'number',
      defaultValue: 30,
      admin: {
        description:
          'Hide same-day pickup times after this many minutes before closing (to give you time to prep the order).',
      },
    },
  ],
}
