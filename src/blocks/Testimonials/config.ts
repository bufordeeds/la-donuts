import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'What Families Are Saying',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overallRating',
          type: 'number',
          label: 'Overall Rating',
          defaultValue: 4.2,
          min: 0,
          max: 5,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'reviewCount',
          type: 'number',
          label: 'Total Review Count',
          defaultValue: 444,
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Testimonial ID',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Customer Name',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Testimonial Text',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
}