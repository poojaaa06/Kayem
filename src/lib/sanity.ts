import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Yarn queries ──────────────────────────────────────────────────────────────

export const YARN_FAMILIES_QUERY = `
  *[_type == "yarnFamily"] | order(order asc) {
    familyNum,
    family,
    blurb,
    image,
    "categories": *[_type == "yarnCategory" && references(^._id)] | order(order asc) {
      index,
      title,
      items
    }
  }
`

// ── Blog queries ──────────────────────────────────────────────────────────────

export const ALL_POSTS_QUERY = `
  *[_type == "blogPost"] | order(date desc) {
    "slug": slug.current,
    "img": img.asset->url,
    category,
    title,
    excerpt,
    "date": date,
    read,
    author,
    featured
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    "slug": slug.current,
    "img": img.asset->url,
    category,
    title,
    excerpt,
    "date": date,
    read,
    author,
    featured,
    body[] {
      _type,
      text,
      attribution,
      "src": src.asset->url,
      caption
    },
    "related": related[]-> {
      "slug": slug.current,
      "img": img.asset->url,
      category,
      title,
      excerpt,
      "date": date,
      read,
      author
    }
  }
`

export const ALL_POST_SLUGS_QUERY = `
  *[_type == "blogPost"] { "slug": slug.current }
`

// ── Fabric queries ────────────────────────────────────────────────────────────

export const ALL_FABRICS_QUERY = `
  *[_type == "fabric"] | order(order asc) {
    name,
    "slug": slug.current,
    tagline,
    description,
    "heroImage": heroImage.asset->url,
    order,
    specifications[] {
      label,
      value,
      unit
    },
    applications,
    features
  }
`