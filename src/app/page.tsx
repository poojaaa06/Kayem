import Navbar from "@/components/Navbar";
import SequenceCanvas from "@/components/SequenceCanvas";
import { Marquee } from "@/components/Marquee";
import BrandReveal from "@/components/BrandReveal";
import Footer from "@/components/Footer";
import { HeroYarnShowcase } from "@/components/YarnShowcase";
import { ProcessPin } from "@/components/ProcessPin";
import { Stats } from "@/components/Stats";
import HeroFabricShowcase from "@/components/FabricShowcase";
import { client, HERO_FABRIC_SHOWCASE_QUERY, HERO_YARN_SHOWCASE_QUERY } from '@/lib/sanity'



export const revalidate = 60
export const dynamic = 'force-dynamic'

interface FabricItem {
  _id: string;
  order: number;
  item: string;
  base: string;
  description: string;
  imagePath: string;
  denier?: string;
  isNew?: boolean;
}

interface YarnItem {
  _id: string;
  order: number;
  name: string;
  desc: string;
  img: string;
}

export default async function Home() {
  const fabrics: FabricItem[] = await client.fetch(HERO_FABRIC_SHOWCASE_QUERY)
  const yarns: YarnItem[] = await client.fetch(HERO_YARN_SHOWCASE_QUERY)

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <SequenceCanvas />
      <Marquee />
      <HeroYarnShowcase yarns={yarns} />
      <Stats />
      <HeroFabricShowcase fabrics={fabrics} />
      <ProcessPin />
      <BrandReveal />
      <Footer />
    </main>
  );
}