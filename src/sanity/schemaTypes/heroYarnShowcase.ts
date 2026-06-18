import { defineField, defineType } from 'sanity'

export const heroYarnShowcase = defineType({
    name: 'heroYarnShowcase',
    title: 'Hero Yarn Showcase',
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
            name: 'name',
            title: 'Yarn Name',
            type: 'string',
            description: 'e.g. "Nylon Yarn"',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'desc',
            title: 'Description',
            type: 'text',
            rows: 2,
            description: 'e.g. "Premium nylon yarn with excellent coverage, bulk, and soft hand feel."',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'img',
            title: 'Yarn Image',
            type: 'image',
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'desc',
            media: 'img',
        },
    },
})