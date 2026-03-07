import type { CollectionConfig } from 'payload'

export const Houses: CollectionConfig = {
  slug: 'houses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'area', 'rooms', 'priceFrom', 'status'],
  },
  fields: [
    // --- ALAP ---
    {
      name: 'name',
      label: 'Ház neve / modell',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'pl. napfeny-120 – automatikusan generálható',
      },
    },
    {
      name: 'shortDescription',
      label: 'Rövid leírás',
      type: 'textarea',
      admin: {
        description: 'Lista nézetben megjelenő rövid szöveg',
      },
    },
    {
      name: 'description',
      label: 'Részletes leírás',
      type: 'richText',
    },

    // --- KÉPEK ---
    {
      name: 'images',
      label: 'Képek / látványtervek',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Felirat',
          type: 'text',
        },
      ],
    },
    {
      name: 'floorPlans',
      label: 'Alaprajzok',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          label: 'Szint neve',
          type: 'text',
          admin: {
            description: 'pl. Földszint, Emelet',
          },
        },
      ],
    },

    // --- MÉRET / ELRENDEZÉS ---
    {
      type: 'row',
      fields: [
        {
          name: 'area',
          label: 'Alapterület (m²)',
          type: 'number',
          required: true,
        },
        {
          name: 'builtArea',
          label: 'Beépített terület (m²)',
          type: 'number',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'floors',
          label: 'Emeletek száma',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'rooms',
          label: 'Szobák száma',
          type: 'number',
          required: true,
        },
        {
          name: 'bathrooms',
          label: 'Fürdők száma',
          type: 'number',
          defaultValue: 1,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'masterBathroom',
          label: 'Szülői fürdő',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'wardrobe',
          label: 'Gardrób',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'chimney',
          label: 'Kémény',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'terraceSize',
      label: 'Terasz mérete (m²)',
      type: 'number',
    },

    // --- MŰSZAKI ---
    {
      name: 'roofType',
      label: 'Tető típusa',
      type: 'select',
      options: [
        { label: 'Nyeregtető', value: 'gable' },
        { label: 'Sátortető', value: 'hip' },
        { label: 'Lapostető', value: 'flat' },
        { label: 'Kontyolt tető', value: 'hipped' },
        { label: 'Egyéb', value: 'other' },
      ],
    },
    {
      name: 'wallStructure',
      label: 'Falszerkezet',
      type: 'select',
      options: [
        { label: 'Tégla', value: 'brick' },
        { label: 'Poroton', value: 'poroton' },
        { label: 'Könnyűszerkezet', value: 'lightweight' },
        { label: 'Beton', value: 'concrete' },
        { label: 'Egyéb', value: 'other' },
      ],
    },
    {
      name: 'heating',
      label: 'Fűtés módja',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Gáz', value: 'gas' },
        { label: 'Hőszivattyú', value: 'heat_pump' },
        { label: 'Elektromos', value: 'electric' },
        { label: 'Fa / Pellet', value: 'wood' },
        { label: 'Napkollektor', value: 'solar' },
      ],
    },
    {
      name: 'cooling',
      label: 'Hűtés módja',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Klíma', value: 'ac' },
        { label: 'Hőszivattyú', value: 'heat_pump' },
        { label: 'Természetes szellőzés', value: 'natural' },
        { label: 'Nincs', value: 'none' },
      ],
    },
    {
      name: 'energyRating',
      label: 'Energetikai besorolás',
      type: 'select',
      options: ['AA++', 'AA+', 'AA', 'A+', 'A', 'B', 'C', 'D'].map((v) => ({
        label: v,
        value: v,
      })),
    },

    // --- TELEK ---
    {
      type: 'row',
      fields: [
        {
          name: 'minPlotSize',
          label: 'Minimális telekméret (m²)',
          type: 'number',
        },
        {
          name: 'minPlotWidth',
          label: 'Minimális telekszélesség (m)',
          type: 'number',
        },
      ],
    },

    // --- ÁRAZÁS ---
    {
      type: 'row',
      fields: [
        {
          name: 'priceFrom',
          label: 'Ár tól (Ft)',
          type: 'number',
        },
        {
          name: 'priceCategory',
          label: 'Árkategória',
          type: 'select',
          options: [
            { label: 'Gazdaságos', value: 'budget' },
            { label: 'Középkategória', value: 'mid' },
            { label: 'Prémium', value: 'premium' },
            { label: 'Luxus', value: 'luxury' },
          ],
        },
      ],
    },

    // --- KATEGORIZÁLÁS ---
    {
      name: 'style',
      label: 'Stílus',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Modern', value: 'modern' },
        { label: 'Klasszikus', value: 'classic' },
        { label: 'Mediterrán', value: 'mediterranean' },
        { label: 'Skandináv', value: 'scandinavian' },
        { label: 'Rusztikus', value: 'rustic' },
      ],
    },
    {
      name: 'category',
      label: 'Kategória',
      type: 'select',
      options: [
        { label: 'Kis ház (–100 m²)', value: 'small' },
        { label: 'Családi ház (100–150 m²)', value: 'family' },
        { label: 'Nagy ház (150–200 m²)', value: 'large' },
        { label: 'Villa (200 m² felett)', value: 'villa' },
        { label: 'Emeletes', value: 'twostorey' },
      ],
    },

    // --- STÁTUSZ ---
    {
      name: 'featured',
      label: 'Kiemelt / népszerű',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      label: 'Státusz',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktív', value: 'active' },
        { label: 'Archív', value: 'archived' },
      ],
    },
  ],
}