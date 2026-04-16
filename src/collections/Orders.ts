import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Orders: CollectionConfig<'orders'> = {
  slug: 'orders',
  access: {
    create: authenticated, // public creation happens via /api/orders/create route with local API
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'pickupType', 'pickupDate', 'status', 'totalCents'],
    listSearchableFields: ['orderNumber', 'customerName', 'customerPhone', 'customerEmail'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated, e.g. LD-000042',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'flavor',
          type: 'relationship',
          relationTo: 'flavors',
          required: true,
        },
        {
          name: 'flavorNameSnapshot',
          type: 'text',
          admin: {
            description: 'Name at time of order (preserved if flavor is later edited or deleted)',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'priceAtOrderCents',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'subtotalCents',
      type: 'number',
      required: true,
    },
    {
      name: 'totalCents',
      type: 'number',
      required: true,
    },
    {
      name: 'pickupType',
      type: 'select',
      required: true,
      options: [
        { label: 'Same-day (today)', value: 'same-day' },
        { label: 'Next-day pre-order', value: 'next-day' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pickupDate',
      type: 'date',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'pickupTime',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Human-readable slot, e.g. "7:00 AM"',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending payment', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Ready for pickup', value: 'ready' },
        { label: 'Picked up', value: 'picked-up' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'squarePaymentId',
      type: 'text',
      index: true,
      admin: {
        description: 'Square Payment ID returned after successful charge.',
      },
    },
    {
      name: 'customerNote',
      type: 'textarea',
      admin: {
        description: 'Note the customer left when ordering.',
      },
    },
    {
      name: 'internalNote',
      type: 'textarea',
      admin: {
        description: 'Internal note — not shown to customer.',
      },
    },
  ],
  timestamps: true,
}
