import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Flavors: CollectionConfig<'flavors'> = {
  slug: 'flavors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'priceCents', 'isSoldOut', 'isOnRotation'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'classic',
      options: [
        { label: 'Classic', value: 'classic' },
        { label: 'Specialty', value: 'specialty' },
        { label: 'Filled', value: 'filled' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'priceCents',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in cents (e.g. 350 = $3.50). Must match your Square catalog price.',
      },
    },
    {
      name: 'squareCatalogId',
      type: 'text',
      admin: {
        description:
          'Square catalog item ID. Used to link online orders to your Square POS. Paste from Square dashboard.',
      },
    },
    {
      name: 'isSoldOut',
      label: 'Sold out',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Turn this on when you run out of a flavor. It stays on the menu but shows a "Sold out" badge. Turn off the next morning.',
        position: 'sidebar',
      },
    },
    {
      name: 'isOnRotation',
      label: 'On the menu',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Show this flavor on the public menu. Uncheck to retire it entirely (without deleting).',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first.',
      },
    },
    ...slugField('name'),
  ],
}
