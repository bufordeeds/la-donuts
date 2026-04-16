import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Location: GlobalConfig = {
  slug: 'location',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'venueName',
      type: 'text',
      defaultValue: 'Advance Auto Parts',
      admin: {
        description: 'Name of the host location / parking lot where the trailer is set up.',
      },
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: '2100 S Douglas Hwy',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      defaultValue: 'Gillette',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      defaultValue: 'WY',
      required: true,
    },
    {
      name: 'zip',
      type: 'text',
      defaultValue: '82718',
      required: true,
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: {
        description: 'Paste a Google Maps link for the "Get directions" button.',
      },
    },
    {
      name: 'parkingNote',
      type: 'text',
      admin: {
        description: 'Optional — e.g. "Look for the pink trailer near the entrance."',
      },
    },
  ],
}
