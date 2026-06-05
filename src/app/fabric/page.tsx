import { client, ALL_FABRICS_QUERY } from '@/lib/sanity'
import FabricClient from './FabricClient'

export const revalidate = 60

export type FabricProduct = {
    name: string
    slug: string
    tagline: string
    description: string
    heroImage: string
    order: number
    specifications: { label: string; value: string; unit?: string }[]
    applications: string[]
    features: string[]
}

export default async function FabricPage() {
    const fabrics: FabricProduct[] = await client.fetch(ALL_FABRICS_QUERY)
    return <FabricClient fabrics={fabrics} />
}