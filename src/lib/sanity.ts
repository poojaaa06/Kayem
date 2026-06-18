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
      isNew,        // ← Category-level "New" flag
      items,        // ← Still strings!
      newDeniers    // ← Which deniers are "New"
    }
  }
`

// ── Latest Yarns queries ──────────────────────────────────────────────────────

export const LATEST_YARNS_QUERY = `
  *[_type == "latestYarn"] | order(_createdAt desc) {
    "slug": slug.current,
    "img": img.asset->url,
    name,
    description
  }
`

export const LATEST_YARN_BY_SLUG_QUERY = `
  *[_type == "latestYarn" && slug.current == $slug][0] {
    "slug": slug.current,
    "img": img.asset->url,
    name,
    description
  }
`

export const ALL_LATEST_YARN_SLUGS_QUERY = `
  *[_type == "latestYarn"] { "slug": slug.current }
`

// ── Blog queries ──────────────────────────────────────────────────────────────

export const ALL_POSTS_QUERY = `
  *[_type == "blogPost"] | order(date desc) {
    "slug": slug.current,
    "img": img.asset->url,
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

export const HERO_FABRIC_SHOWCASE_QUERY = `
  *[_type == "heroFabricShowcase"] | order(order asc) {
    _id,
    order,
    item,
    base,
    description,
    "imagePath": image.asset->url,
    denier,
    isNew
  }
`
export const HERO_YARN_SHOWCASE_QUERY = `
  *[_type == "heroYarnShowcase"] | order(order asc) {
    _id,
    order,
    name,
    desc,
    "img": img.asset->url
  }
`