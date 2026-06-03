import { client, YARN_FAMILIES_QUERY, urlFor } from '@/lib/sanity'
import ProductsClient from './ProductsClient'

export const revalidate = 60

type RawFamily = {
    familyNum: string
    family: string
    blurb: string
    image?: any
    categories: { index: string; title: string; items: string[] }[]
}

export default async function ProductsPage() {
    const rawFamilies: RawFamily[] = await client.fetch(YARN_FAMILIES_QUERY)

    const families = rawFamilies.map((fam) => ({
        familyNum: fam.familyNum,
        family: fam.family,
        blurb: fam.blurb,
        img: fam.image ? urlFor(fam.image).width(600).url() : '/images/NYLON.jpeg',
        categories: fam.categories ?? [],
    }))

    return <ProductsClient families={families} />
}