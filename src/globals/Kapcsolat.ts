import type { GlobalConfig } from 'payload'

export const Kapcsolat: GlobalConfig = {
  slug: 'kapcsolat',
  label: 'Kapcsolat oldal',
  fields: [
    {
      name: 'title',
      label: 'Főcím',
      type: 'text',
      defaultValue: 'Kapcsolat',
    },
    {
      name: 'subtitle',
      label: 'Alcím',
      type: 'text',
    },
    {
      name: 'intro',
      label: 'Bevezető szöveg',
      type: 'textarea',
    },
    {
      name: 'phone',
      label: 'Telefonszám',
      type: 'text',
    },
    {
      name: 'email',
      label: 'E-mail cím',
      type: 'email',
    },
    {
      name: 'address',
      label: 'Cím',
      type: 'text',
    },
    {
      name: 'openingHours',
      label: 'Nyitvatartás',
      type: 'array',
      fields: [
        { name: 'days', label: 'Napok', type: 'text', required: true },
        { name: 'hours', label: 'Időpont', type: 'text', required: true },
      ],
    },
    {
      name: 'mapUrl',
      label: 'Google Maps embed URL',
      type: 'text',
      admin: {
        description: 'Google Maps iframe src URL',
      },
    },
  ],
}
