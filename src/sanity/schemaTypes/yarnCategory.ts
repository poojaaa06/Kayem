import { defineField, defineType } from 'sanity'

export const yarnCategory = defineType({
    name: 'yarnCategory',
    title: 'Yarn Category',
    type: 'document',
    fields: [
        defineField({
            name: 'index',
            title: 'Index (e.g. 01)',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'title',
            title: 'Category Title (e.g. Nylon Plain ATY)',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'family',
            title: 'Parent Family',
            type: 'reference',
            to: [{ type: 'yarnFamily' }],
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order within Family',
            type: 'number',
            description: 'Lower = shown first',
        }),
        defineField({
            name: 'items',
            title: 'Deniers / Variants',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each entry = one denier tag e.g. "110 D Slub"',
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'title', subtitle: 'family.family' },
    },
})