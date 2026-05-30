"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Fabric {
  id: string;
  name: string;
  type: string;
  imageSrc: string;
  density: string;
  composition: string;
  loom: string;
  pattern: string;
  description: string;
}

const FABRICS: Fabric[] = [
  {
    id: "brocade",
    name: "Aurelia Brocade",
    type: "Item",
    imageSrc: "/images/fabric_brocade.png",
    density: "420 g/m²",
    composition: "85% Mulberry Silk, 15% 24k Gold Thread",
    loom: "Electronic Jacquard Loom",
    pattern: "Aurelia Relief Brocade",
    description: "An opulent, highly structured textile utilizing real gold wire. Designed to catch light dynamically, this double-faced brocade displays deep champagne topography, creating a stunning metallic sheen for evening wear.",
  },
  {
    id: "organza",
    name: "Lumière Organza",
    type: "Base",
    imageSrc: "/images/fabric_organza.png",
    density: "45 g/m²",
    composition: "100% Organically Spun Mulberry Silk",
    loom: "Precision Shuttle Loom",
    pattern: "Sheer Plain Weave",
    description: "Ultra-lightweight, crisp, and translucent. The Lumière Organza possesses a natural structural stiffness that holds shape, reflecting a soft pearlescent glow while remaining completely weightless.",
  },
  {
    id: "cashmere",
    name: "Premium Twill Cashmere",
    type: "Beam",
    imageSrc: "/images/raw_cashmere.png",
    density: "310 g/m²",
    composition: "100% Pure Mongolian Cashmere",
    loom: "Traditional Under-tension Loom",
    pattern: "Fine Micro-twill Structure",
    description: "Spun from combed undercoat fibers. The Zephyr Cashmere features a subtle, diagonal twill texture that yields an exceptionally soft loftiness, providing thermal efficiency with an organic matte finish.",
  },
];

export default function FabricShowcase() {
  const [selectedId, setSelectedId] = useState(FABRICS[0].id);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeFabric = FABRICS.find((f) => f.id === selectedId) || FABRICS[0];

  // Detect mobile on client side only to avoid hydration mismatch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, e.clientX - left));
    const y = Math.max(0, Math.min(height, e.clientY - top));

    setZoomPos({ x, y });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !containerRef.current) return;
    e.preventDefault();

    const container = containerRef.current;
    const touch = e.touches[0];
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, touch.clientX - left));
    const y = Math.max(0, Math.min(height, touch.clientY - top));

    setZoomPos({ x, y });
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setIsZoomActive(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsZoomActive(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsZoomActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsZoomActive(false);
    }
  };

  return (
    <section id="fabrics" className="relative py-32 px-6 md:px-12 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="text-[12px] uppercase tracking-[0.4em] text-[#7A5C1E] font-semibold mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#7A5C1E] inline-block" />
              THE CATALOGUE
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.95] text-luxury-charcoal">
              Luxury Weaves.<br />
              <span className="italic text-luxury-gold">Explore the Texture</span>
            </h2>
          </div>
          <p className="max-w-md text-luxury-charcoal/60 leading-relaxed font-serif text-md">
            {isMobile
              ? "Tap and hold on the image to magnify the weft structure."
              : "Hover over the showcase image to magnify the weft structure."}
          </p>
        </motion.div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Selector List */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {FABRICS.map((fabric) => (
              <button
                key={fabric.id}
                onClick={() => setSelectedId(fabric.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-500 focus:outline-none ${selectedId === fabric.id
                  ? "bg-luxury-ivory border-luxury-gold/30 shadow-xl"
                  : "bg-transparent border-transparent hover:border-luxury-gold/20"
                  }`}
              >
                <span className="text-[10px] tracking-[0.3em] text-[#7A5C1E] font-semibold block mb-2 uppercase">
                  {fabric.type}
                </span>
                <span className="font-display text-xl md:text-2xl text-luxury-charcoal font-light block">
                  {fabric.name}
                </span>
              </button>
            ))}

            {/* Selected Fabric Narrative */}
            <div className="pt-6 border-t border-luxury-gold/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <p className="text-sm font-light text-luxury-charcoal/70 leading-relaxed font-serif">
                    {activeFabric.description}
                  </p>

                  {/* Specifications Table */}
                  <div className="grid grid-cols-2 gap-4 pt-4 text-[10px] md:text-xs tracking-luxury text-luxury-charcoal/80 uppercase">
                    <div>
                      <span className="text-[#7A5C1E] font-medium">DENSITY</span>
                      <span className="font-sans font-light text-[11px] block mt-1">{activeFabric.density}</span>
                    </div>
                    <div>
                      <span className="text-[#7A5C1E] block font-medium">LOOM</span>
                      <span className="font-sans font-light text-[11px] block mt-1">{activeFabric.loom}</span>
                    </div>
                    <div className="col-span-2 border-t border-luxury-gold/10 pt-2">
                      <span className="text-[#7A5C1E] block font-medium">COMPOSITION</span>
                      <span className="font-sans font-light text-[11px] block mt-1 normal-case">{activeFabric.composition}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Interactive Image with Magnifier */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="group relative aspect-[4/3] w-full cursor-crosshair overflow-hidden rounded-2xl border border-luxury-gold/20 bg-luxury-ivory shadow-xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Fade Active Image Transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedId}
                  src={activeFabric.imageSrc}
                  alt={activeFabric.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="h-full w-full select-none object-cover"
                />
              </AnimatePresence>

              {/* Magnifying Glass Lens overlay */}
              {isZoomActive && containerRef.current && (
                <div
                  className="pointer-events-none absolute select-none rounded-full border-2 border-luxury-gold/60 bg-no-repeat shadow-2xl"
                  style={{
                    left: `${zoomPos.x - 90}px`,
                    top: `${zoomPos.y - 90}px`,
                    width: "180px",
                    height: "180px",
                    backgroundImage: `url(${activeFabric.imageSrc})`,
                    backgroundSize: `${containerRef.current.clientWidth * 2.5}px ${containerRef.current.clientHeight * 2.5
                      }px`,
                    backgroundPosition: `-${zoomPos.x * 2.5 - 90}px -${zoomPos.y * 2.5 - 90
                      }px`,
                  }}
                />
              )}

              {/* Lens Instructions - changes based on device */}
              <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-luxury-charcoal/40 backdrop-blur-md px-3 py-1.5 border border-luxury-gold/10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-[9px] tracking-[0.2em] text-luxury-ivory uppercase font-semibold">
                  {isMobile ? "TAP & HOLD TO INSPECT" : "HOVER TO INSPECT WEAVE"}
                </span>
              </div>

              {/* Mobile touch instruction overlay - only show on client */}
              {isMobile && !isZoomActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 opacity-0 group-active:opacity-100 transition-opacity duration-300">
                  <span className="text-xs uppercase tracking-[0.2em] text-white bg-black/50 px-4 py-2 rounded-full">
                    Touch and hold to zoom
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}