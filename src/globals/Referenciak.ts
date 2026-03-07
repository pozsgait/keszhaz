import type { GlobalConfig } from 'payload'

export const Referenciak: GlobalConfig = {
  slug: 'referenciak',
  label: 'Referenciák oldal',
  fields: [
    {
      name: 'title',
      label: 'Főcím',
      type: 'text',
      defaultValue: 'Referenciáink',
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
      name: 'items',
      label: 'Referenciák',
      type: 'array',
      fields: [
        { name: 'title', label: 'Projekt neve', type: 'text', required: true },
        { name: 'location', label: 'Helyszín', type: 'text' },
        { name: 'year', label: 'Év', type: 'number' },
        { name: 'description', label: 'Leírás', type: 'textarea' },
        {
          name: 'images',
          label: 'Képek',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', label: 'Felirat', type: 'text' },
          ],
        },
        {
          name: 'houseType',
          label: 'Háztípus',
          type: 'text',
          admin: { description: 'pl. Mediterrán 145' },
        },
      ],
    },
  ],
}
