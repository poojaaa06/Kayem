import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (R) => R.required(),
        }),
        // REMOVED: category field completely
        defineField({
            name: 'img',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'date',
            title: 'Publish Date',
            type: 'date',
            options: { dateFormat: 'MMMM DD, YYYY' },
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'read',
            title: 'Read Time (e.g. "6 min read")',
            type: 'string',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post?',
            type: 'boolean',
            description: 'Only one post should be featured at a time',
            initialValue: false,
        }),
        defineField({
            name: 'related',
            title: 'Related Posts',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
            validation: (R) => R.max(2),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'lead',
                    title: 'Lead Paragraph',
                    fields: [
                        defineField({ name: 'text', type: 'text', title: 'Text', rows: 3 }),
                    ],
                    preview: { select: { title: 'text' }, prepare: ({ title }: any) => ({ title: '↳ Lead: ' + title?.slice(0, 60) }) },
                },
                {
                    type: 'object',
                    name: 'h2',
                    title: 'Heading (H2)',
                    fields: [
                        defineField({ name: 'text', type: 'string', title: 'Heading Text' }),
                    ],
                    preview: { select: { title: 'text' }, prepare: ({ title }: any) => ({ title: 'H2: ' + title }) },
                },
                {
                    type: 'object',
                    name: 'p',
                    title: 'Paragraph',
                    fields: [
                        defineField({ name: 'text', type: 'text', title: 'Text', rows: 4 }),
                    ],
                    preview: { select: { title: 'text' }, prepare: ({ title }: any) => ({ title: '¶ ' + title?.slice(0, 60) }) },
                },
                {
                    type: 'object',
                    name: 'blockquote',
                    title: 'Blockquote',
                    fields: [
                        defineField({ name: 'text', type: 'text', title: 'Quote Text', rows: 3 }),
                        defineField({ name: 'attribution', type: 'string', title: 'Attribution' }),
                    ],
                    preview: { select: { title: 'text' }, prepare: ({ title }: any) => ({ title: '" ' + title?.slice(0, 60) }) },
                },
                {
                    type: 'object',
                    name: 'bodyImage',
                    title: 'Image',
                    fields: [
                        defineField({ name: 'src', type: 'image', title: 'Image', options: { hotspot: true } }),
                        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    ],
                    preview: { select: { title: 'caption' }, prepare: ({ title }: any) => ({ title: '🖼 ' + (title ?? 'Image') }) },
                },
            ],
        }),
    ],
    orderings: [
        { title: 'Publish Date (Newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    ],
    preview: {
        select: { title: 'title', media: 'img' }, // Removed subtitle: 'category'
    },
})