import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
      admin: {
        description: 'Full-screen background image for the hero section',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        placeholder: "San Antonio's Premier Family Skating Experience",
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        placeholder: 'Creating magical memories for families since 1985...',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
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
          label: 'Review Count',
          defaultValue: 444,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'yearsInBusiness',
          type: 'number',
          label: 'Years in Business',
          defaultValue: 38,
        },
        {
          name: 'partiesHosted',
          type: 'text',
          label: 'Parties Hosted',
          defaultValue: '10K',
        },
        {
          name: 'happyFamilies',
          type: 'text',
          label: 'Happy Families',
          defaultValue: '50K',
        },
      ],
    },
    {
      name: 'ctaPrimaryLabel',
      type: 'text',
      label: 'Primary CTA Button Label',
      defaultValue: 'Book Your Party Today',
    },
    {
      name: 'ctaPrimaryUrl',
      type: 'text',
      label: 'Primary CTA Button URL',
      defaultValue: '/birthday-parties',
    },
    {
      name: 'ctaSecondaryLabel',
      type: 'text',
      label: 'Secondary CTA Button Label',
      defaultValue: 'Call Now: (210) 523-9664',
    },
    {
      name: 'ctaSecondaryPhone',
      type: 'text',
      label: 'Secondary CTA Phone Number',
      defaultValue: '(210) 523-9664',
    },
    {
      name: 'specialOffer',
      type: 'group',
      label: 'Special Offer Box',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Offer Title',
          defaultValue: "This Week's Special!",
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Offer Description',
          defaultValue:
            'Book any birthday party package and get a FREE photo session with our professional photographer.',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Claim This Offer',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Button URL',
          defaultValue: '/birthday-parties',
        },
      ],
    },
  ],
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
}
