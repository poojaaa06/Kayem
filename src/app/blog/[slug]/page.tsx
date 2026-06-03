import { client, POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

export const revalidate = 60

export async function generateStaticParams() {
    const slugs: { slug: string }[] = await client.fetch(ALL_POST_SLUGS_QUERY)
    return slugs.map((s) => ({ slug: s.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug })

    if (!post) notFound()

    // Format date
    const formatted = {
        ...post,
        date: post.date
            ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : '',
        related: (post.related ?? []).map((r: any) => ({
            ...r,
            date: r.date
                ? new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : '',
        })),
    }

    return <BlogPostClient post={formatted} />
}