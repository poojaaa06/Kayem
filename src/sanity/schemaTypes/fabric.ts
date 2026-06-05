import { defineField, defineType } from 'sanity'

export const fabric = defineType({
    name: 'fabric',
    title: 'Fabric',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Fabric Name (e.g. COTSiLK FABRIC)',
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
            name: 'tagline',
            title: 'Tagline (e.g. Premium Fabric)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero / Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower = shown first',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            description: 'Add each spec as a row e.g. GSM: 77, Material: Cotton Polyamide',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', title: 'Label (e.g. GSM)', type: 'string' }),
                        defineField({ name: 'value', title: 'Value (e.g. 77)', type: 'string' }),
                        defineField({ name: 'unit', title: 'Unit (optional, e.g. g/m²)', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                        prepare: ({ title, subtitle }: any) => ({ title: `${title}: ${subtitle}` }),
                    },
                },
            ],
        }),
        defineField({
            name: 'applications',
            title: 'Applications',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Shirts, Kurtas, Pajamas',
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Natural comfort of cotton',
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'name', media: 'heroImage' },
    },
})