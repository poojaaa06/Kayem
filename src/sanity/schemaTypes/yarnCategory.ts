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
        // ✅ Category-level "New" flag
        defineField({
            name: 'isNew',
            title: 'Mark Category as New',
            type: 'boolean',
            description: 'Show a "New" badge on this entire category',
            initialValue: false,
        }),
        // ✅ Keep items as strings (NO MIGRATION!)
        defineField({
            name: 'items',
            title: 'Deniers / Variants',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each entry = one denier tag',
        }),
        // ✅ NEW: Store which deniers are "New" (by their value)
        // Simplified - just a text array without dropdown
        defineField({
            name: 'newDeniers',
            title: 'New Deniers',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Type the denier names that should show a "New" badge (must match exactly from the items list)',
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'title', subtitle: 'family.family' },
    },
})