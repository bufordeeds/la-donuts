import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Hours: GlobalConfig = {
  slug: 'hours',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Weekly operating hours. "Sold out daily" message lives here too.',
  },
  fields: [
    {
      name: 'schedule',
      type: 'array',
      minRows: 0,
      maxRows: 7,
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: [
            { label: 'Sunday', value: 'sunday' },
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
          ],
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'openTime',
          type: 'text',
          admin: { description: 'e.g. "6:30 AM"', condition: (_, siblingData) => !siblingData?.isClosed },
        },
        {
          name: 'closeTime',
          type: 'text',
          admin: {
            description: 'e.g. "until sold out" or "12:00 PM"',
            condition: (_, siblingData) => !siblingData?.isClosed,
          },
        },
      ],
    },
    {
      name: 'soldOutMessage',
      type: 'text',
      defaultValue: 'We sell out daily — come early or message ahead to reserve!',
    },
  ],
}
