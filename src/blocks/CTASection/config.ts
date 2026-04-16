import type { Block } from 'payload'

export const CTASection: Block = {
  slug: 'ctaSection',
  interfaceName: 'CTASectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Ready to Create Magical Memories?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Join thousands of San Antonio families who have trusted us with their special celebrations.',
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Book Your Party Now',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          defaultValue: '/birthday-parties',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            {
              label: 'None',
              value: '',
            },
            {
              label: 'Calendar',
              value: 'calendar',
            },
            {
              label: 'Phone',
              value: 'phone',
            },
          ],
          defaultValue: 'calendar',
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Call: (210) 523-9664',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL (if not phone)',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number (if phone button)',
          defaultValue: '(210) 523-9664',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            {
              label: 'None',
              value: '',
            },
            {
              label: 'Calendar',
              value: 'calendar',
            },
            {
              label: 'Phone',
              value: 'phone',
            },
          ],
          defaultValue: 'phone',
        },
      ],
    },
    {
      name: 'gradient',
      type: 'checkbox',
      label: 'Use Gradient Background',
      defaultValue: true,
    },
  ],
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
}