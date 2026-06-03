import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
import SequenceCanvas from "@/components/SequenceCanvas";
import { Marquee } from "@/components/Marquee";
import MaterialStory from "@/components/MaterialStory";
import FabricShowcase from "@/components/FabricShowcase";
import BrandReveal from "@/components/BrandReveal";
import Footer from "@/components/Footer";
import { YarnShowcase } from "@/components/YarnShowcase";
import { ProcessPin } from "@/components/ProcessPin"
import { Stats } from "@/components/Stats";
import InstagramFeed from "@/components/Instgram";
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      {/* <Hero /> */}
      <SequenceCanvas />
      <Marquee />
      <YarnShowcase />
      <Stats />
      {/* <MaterialStory /> */}
      <FabricShowcase />
      <ProcessPin />
      <InstagramFeed />
      <BrandReveal />

      <Footer />
    </main>
  );
}