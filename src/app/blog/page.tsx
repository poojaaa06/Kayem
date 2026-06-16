import { client, ALL_POSTS_QUERY } from '@/lib/sanity'
import BlogClient from './BlogClient'

export const revalidate = 60

export type Post = {
    slug: string
    img: string
    // category: string
    title: string
    excerpt: string
    date: string
    read: string
    author: string
    featured?: boolean
}

export default async function BlogPage() {
    const posts: Post[] = await client.fetch(ALL_POSTS_QUERY)

    // Format date from "2026-05-24" → "May 24, 2026"
    const formatted = posts.map((p) => ({
        ...p,
        date: p.date
            ? new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : '',
    }))

    const featured = formatted.find((p) => p.featured) ?? formatted[0] ?? null
    const rest = formatted.filter((p) => p.slug !== featured?.slug)

    return <BlogClient featured={featured} posts={rest} />
}