// app/latest-yarns/page.tsx
import { client, LATEST_YARNS_QUERY } from '@/lib/sanity'
import LatestYarnsClient from './LatestYarnsClient'

export const revalidate = 60

export type Yarn = {
    slug: string
    name: string
    img: string
    description: string
}

export default async function LatestYarnsPage() {
    const yarns: Yarn[] = await client.fetch(LATEST_YARNS_QUERY)
    return <LatestYarnsClient yarns={yarns} />
}