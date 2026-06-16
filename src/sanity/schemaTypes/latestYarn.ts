// sanity/schemas/latestYarn.ts
import { defineField, defineType } from 'sanity'

export const latestYarn = defineType({
    name: 'latestYarn',
    title: 'Latest Yarn',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Yarn Name',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'img',
            title: 'Yarn Image',
            type: 'image',
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (R) => R.required(),
        }),
    ],
    preview: {
        select: { title: 'name', media: 'img' },
    },
})