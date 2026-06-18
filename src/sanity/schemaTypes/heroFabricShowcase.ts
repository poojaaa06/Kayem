import { defineField, defineType } from 'sanity'

export const heroFabricShowcase = defineType({
    name: 'heroFabricShowcase',
    title: 'Hero Fabric Showcase',
    type: 'document',
    fields: [
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower = shown first',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'item',
            title: 'Item Name',
            type: 'string',
            description: 'e.g. "100 D ZYLO GOLD"',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'base',
            title: 'Base Material',
            type: 'string',
            description: 'e.g. "VISCOSE" or "NYLON"',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'e.g. "Fine denier yarn which gives the fabric a natural gold and tissue look"',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'image',
            title: 'Fabric Image',
            type: 'image',
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'denier',
            title: 'Denier',
            type: 'string',
            description: 'e.g. "100 D"',
        }),
        defineField({
            name: 'isNew',
            title: 'Mark as New',
            type: 'boolean',
            description: 'Show a "New" badge on this fabric',
            initialValue: false,
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: {
            title: 'item',
            subtitle: 'base',
            media: 'image',
        },
    },
})