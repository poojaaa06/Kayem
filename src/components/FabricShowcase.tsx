"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FabricItem {
  id: number;
  item: string;
  base: string;
  description: string;
  imagePath: string;
  denier: string;
  fullTitle: string;
}

const fabricItems: FabricItem[] = [
  {
    id: 1,
    item: "100 D ZYLO GOLD",
    base: "VISCOSE",
    description: "Fine denier yarn which gives the fabric a natural gold and tissue look",
    imagePath: "/images/zylo.png",
    denier: "100 D",
    fullTitle: "100 D ZYLO GOLD",
  },
  {
    id: 2,
    item: "150 D VISCO CREPE",
    base: "VISCOSE",
    description: "Viscose sheen crepe with natural wrinkle for best feel and fall",
    imagePath: "/images/viscosecrepe.png",
    denier: "150 D",
    fullTitle: "150 D VISCO CREPE",
  },
  {
    id: 3,
    item: "138 D SILKY TASPA",
    base: "NYLON",
    description: "Linen taspa look with soft feel and shine fabric",
    imagePath: "/images/sikly.png",
    denier: "138 D",
    fullTitle: "138 D SILKY TASPA",
  },
];

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export default function FabricShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);
  // Covers phones AND tablets — anything with a touch screen
  const [isTouch, setIsTouch] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef(0);
  const [direction, setDirection] = useState(0);
  const isMouseInsideRef = useRef(false);

  const currentFabric = fabricItems[currentIndex];
  const totalItems = fabricItems.length;

  useEffect(() => {
    const allImagePaths = fabricItems.map((item) => item.imagePath);
    preloadImages(allImagePaths);
    allImagePaths.forEach((path) => {
      const img = new Image();
      img.onload = () => setImagesLoaded((prev) => ({ ...prev, [path]: true }));
      img.src = path;
    });
  }, []);

  useEffect(() => {
    // Touch detection: covers phones, iPads, Android tablets, Surface, etc.
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Non-passive touch listener so preventDefault() actually blocks scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!isZoomActive) return;
      e.preventDefault(); // blocks page scroll while zooming

      const touch = e.touches[0];
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(width, touch.clientX - left));
      const y = Math.max(0, Math.min(height, touch.clientY - top));
      setZoomPos({ x, y });
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [isZoomActive]);

  const handleNext = () => {
    directionRef.current = 1;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    directionRef.current = -1;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const container = containerRef.current;
    if (!container || !isZoomActive) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, e.clientX - left));
    const y = Math.max(0, Math.min(height, e.clientY - top));
    setZoomPos({ x, y });
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!isTouch) return;
    setIsZoomActive(true);

    // Capture initial position immediately on touch start too
    const container = containerRef.current;
    if (!container) return;
    const touch = e.touches[0];
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, touch.clientX - left));
    const y = Math.max(0, Math.min(height, touch.clientY - top));
    setZoomPos({ x, y });
  };

  const handleTouchEnd = () => {
    if (isTouch) setIsZoomActive(false);
  };

  const handleMouseEnter = () => {
    if (!isTouch) {
      isMouseInsideRef.current = true;
      setIsZoomActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      isMouseInsideRef.current = false;
      setIsZoomActive(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
  };

  const textVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <section id="fabrics" className="relative py-32 px-6 md:px-12 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto">
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
            {isTouch
              ? "Tap and hold on the image to magnify the weft structure."
              : "Hover over the showcase image to magnify the weft structure."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`item-${currentIndex}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-left p-6 rounded-2xl border border-luxury-gold/30 bg-white/50 backdrop-blur-sm">
                  <span className="text-[10px] tracking-[0.3em] text-[#7A5C1E] font-semibold block mb-2 uppercase">
                    Item
                  </span>
                  <span className="font-display text-xl md:text-2xl text-luxury-charcoal font-light block" style={{ fontVariantNumeric: "lining-nums" }}>
                    {currentFabric.item}
                  </span>
                </div>

                <div className="text-left p-6 rounded-2xl border border-luxury-gold/30 bg-white/50 backdrop-blur-sm">
                  <span className="text-[10px] tracking-[0.3em] text-[#7A5C1E] font-semibold block mb-2 uppercase">
                    Base
                  </span>
                  <span className="font-display text-xl md:text-2xl text-luxury-charcoal font-light block">
                    {currentFabric.base}
                  </span>
                </div>

                <div className="pt-6 border-t border-luxury-gold/20">
                  <p className="text-md font-light text-luxury-charcoal/70 leading-relaxed font-serif">
                    {currentFabric.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 pt-8">
              {fabricItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    directionRef.current = idx > currentIndex ? 1 : -1;
                    setDirection(directionRef.current);
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex
                      ? "w-8 h-2 bg-luxury-gold"
                      : "w-2 h-2 bg-luxury-gold/30 hover:bg-luxury-gold/60"
                    }`}
                  aria-label={`Go to fabric ${idx + 1}`}
                />
              ))}
            </div>

            {/* Mobile/Tablet Arrows */}
            <div className="flex items-center justify-center gap-4 lg:hidden pt-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-luxury-gold/30 bg-white/50 hover:bg-luxury-gold/10 transition-colors"
                aria-label="Previous fabric"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-luxury-charcoal/50 font-serif">
                {currentIndex + 1} / {totalItems}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-luxury-gold/30 bg-white/50 hover:bg-luxury-gold/10 transition-colors"
                aria-label="Next fabric"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel: Image + Magnifier */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="group relative aspect-[4/3] w-full cursor-crosshair overflow-hidden rounded-2xl border border-luxury-gold/20 bg-luxury-ivory shadow-xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            // onTouchMove intentionally omitted — handled via non-passive useEffect above
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={`image-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  src={currentFabric.imagePath}
                  alt={currentFabric.item}
                  className={`h-full w-full select-none object-cover transition-opacity duration-300 ${imagesLoaded[currentFabric.imagePath] ? "opacity-100" : "opacity-0"
                    }`}
                  onLoad={() => {
                    setImagesLoaded((prev) => ({ ...prev, [currentFabric.imagePath]: true }));
                  }}
                />
              </AnimatePresence>

              {!imagesLoaded[currentFabric.imagePath] && (
                <div className="absolute inset-0 flex items-center justify-center bg-luxury-ivory">
                  <div className="w-8 h-8 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
                </div>
              )}

              {isZoomActive && containerRef.current && imagesLoaded[currentFabric.imagePath] && (
                <div
                  className="pointer-events-none absolute select-none rounded-full border-2 border-luxury-gold/60 bg-no-repeat shadow-2xl"
                  style={{
                    left: `${zoomPos.x - 90}px`,
                    top: `${zoomPos.y - 90}px`,
                    width: "180px",
                    height: "180px",
                    backgroundImage: `url(${currentFabric.imagePath})`,
                    backgroundSize: `${containerRef.current.clientWidth * 2.5}px ${containerRef.current.clientHeight * 2.5}px`,
                    backgroundPosition: `-${zoomPos.x * 2.5 - 90}px -${zoomPos.y * 2.5 - 90}px`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}

              <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-luxury-charcoal/40 backdrop-blur-md px-3 py-1.5 border border-luxury-gold/10 transition-opacity duration-300 group-hover:opacity-50">
                <span className="text-[9px] tracking-[0.2em] text-luxury-ivory uppercase font-semibold">
                  {isTouch ? "TAP & HOLD TO INSPECT" : "HOVER TO INSPECT WEAVE"}
                </span>
              </div>

              {/* Desktop Arrow Overlays */}
              <div className="absolute inset-y-0 left-0 right-0 z-10">
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-luxury-charcoal/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:bg-luxury-gold/70 hover:scale-110 focus:outline-none"
                  aria-label="Previous fabric"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-luxury-charcoal/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:bg-luxury-gold/70 hover:scale-110 focus:outline-none"
                  aria-label="Next fabric"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full z-10">
                <span className="text-[10px] text-white/80 font-mono">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}