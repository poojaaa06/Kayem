import { defineField, defineType } from 'sanity'

export const yarnFamily = defineType({
    name: 'yarnFamily',
    title: 'Yarn Family',
    type: 'document',
    fields: [
        defineField({
            name: 'familyNum',
            title: 'Family Number (e.g. 01)',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'family',
            title: 'Family Name (e.g. Nylon Yarns)',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'blurb',
            title: 'Short Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'image',
            title: 'Family Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower = shown first. Use 1, 2, 3...',
            validation: (R) => R.required(),
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'family', media: 'image' },
    },
})