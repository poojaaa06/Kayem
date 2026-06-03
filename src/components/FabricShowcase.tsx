"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import { motion } from "framer-motion";

export default function FabricShowcase() {
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
              Luxury Yarns.<br />
              <span className="italic text-luxury-gold">Crafted with precision </span>
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
          {/* Left Panel: Two simple divs for Item and Base */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Item div */}
            <div className="text-left p-6 rounded-2xl border border-luxury-gold/30 bg-white/50 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.3em] text-[#7A5C1E] font-semibold block mb-2 uppercase">
                Item
              </span>
              <span className="font-display text-xl md:text-2xl text-luxury-charcoal font-light block">
                Aurelia Brocade
              </span>
            </div>

            {/* Base div */}
            <div className="text-left p-6 rounded-2xl border border-luxury-gold/30 bg-white/50 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.3em] text-[#7A5C1E] font-semibold block mb-2 uppercase">
                Base
              </span>
              <span className="font-display text-xl md:text-2xl text-luxury-charcoal font-light block">
                Lumiere Organza
              </span>
            </div>

            {/* Description Section */}
            <div className="pt-6 border-t border-luxury-gold/20">
              <div className="space-y-4">
                <p className="text-sm font-light text-luxury-charcoal/70 leading-relaxed font-serif">
                  An opulent, highly structured textile utilizing real gold wire. Designed to catch light dynamically, this double-faced brocade displays deep champagne topography, creating a stunning metallic sheen for evening wear.
                </p>
              </div>
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
              {/* Single Image */}
              <img
                src="/images/fabric_brocade.png"
                alt="Aurelia Brocade Fabric"
                className="h-full w-full select-none object-cover"
              />

              {/* Magnifying Glass Lens overlay */}
              {isZoomActive && containerRef.current && (
                <div
                  className="pointer-events-none absolute select-none rounded-full border-2 border-luxury-gold/60 bg-no-repeat shadow-2xl"
                  style={{
                    left: `${zoomPos.x - 90}px`,
                    top: `${zoomPos.y - 90}px`,
                    width: "180px",
                    height: "180px",
                    backgroundImage: `url(/images/fabric_brocade.png)`,
                    backgroundSize: `${containerRef.current.clientWidth * 2.5}px ${containerRef.current.clientHeight * 2.5}px`,
                    backgroundPosition: `-${zoomPos.x * 2.5 - 90}px -${zoomPos.y * 2.5 - 90}px`,
                  }}
                />
              )}

              {/* Lens Instructions */}
              <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-luxury-charcoal/40 backdrop-blur-md px-3 py-1.5 border border-luxury-gold/10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-[9px] tracking-[0.2em] text-luxury-ivory uppercase font-semibold">
                  {isMobile ? "TAP & HOLD TO INSPECT" : "HOVER TO INSPECT WEAVE"}
                </span>
              </div>

              {/* Mobile touch instruction overlay */}
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