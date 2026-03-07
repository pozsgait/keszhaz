import type { GlobalConfig } from 'payload'

export const Rolunk: GlobalConfig = {
  slug: 'rolunk',
  label: 'Rólunk oldal',
  fields: [
    {
      name: 'title',
      label: 'Főcím',
      type: 'text',
      required: true,
      defaultValue: 'Rólunk',
    },
    {
      name: 'subtitle',
      label: 'Alcím',
      type: 'text',
    },
    {
      name: 'intro',
      label: 'Bevezető szöveg',
      type: 'richText',
    },
    {
      name: 'values',
      label: 'Értékeink',
      type: 'array',
      fields: [
        { name: 'title', label: 'Cím', type: 'text', required: true },
        { name: 'description', label: 'Leírás', type: 'textarea' },
      ],
    },
    {
      name: 'team',
      label: 'Csapat',
      type: 'array',
      fields: [
        { name: 'name', label: 'Név', type: 'text', required: true },
        { name: 'role', label: 'Pozíció', type: 'text' },
        { name: 'bio', label: 'Bemutatkozás', type: 'textarea' },
        { name: 'image', label: 'Fotó', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'stats',
      label: 'Számok / statisztikák',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', label: 'Érték', type: 'text', required: true },
        { name: 'label', label: 'Felirat', type: 'text', required: true },
      ],
    },
    {
      name: 'image',
      label: 'Borítókép',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
