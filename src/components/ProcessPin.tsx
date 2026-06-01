"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const worlds = [
    {
        n: "01",
        label: "Sarees",
        tag: "Elegance",
        img: "/images/sarees.jpg",
        desc: "Luxurious yarns that drape perfectly, creating sarees with exceptional fall, lustre, and timeless beauty for every occasion.",
    },
    {
        n: "02",
        label: "Dress Materials",
        tag: "Fashion",
        img: "/images/dressmaterial.jpg",
        desc: "Versatile fancy yarns that bring life to contemporary dresses, offering unique textures, vibrant colors, and superior comfort.",
    },
    {
        n: "03",
        label: "Curtains",
        tag: "Home",
        img: "/images/curtain.jpg",
        desc: "Durable yet elegant yarns for window treatments that combine functionality with aesthetics, enhancing every living space.",
    },
    {
        n: "04",
        label: "Upholstery",
        tag: "Luxury Living",
        img: "/images/upholsetry.jpg",
        desc: "Heavy-duty premium yarns designed for furniture that demands both resilience and refined elegance in every fiber.",
    },
];

export function ProcessPin() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="relative bg-[#F5F0E8] py-16 sm:py-20 md:py-28 overflow-hidden"
        >
            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "150px",
                }}
            />

            {/* Decorative watermark number */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden sm:block"
                aria-hidden
            >
                <span
                    className="font-display text-[15vw] sm:text-[20vw] font-light text-[#7A5C1E]/[0.04] leading-none"
                    style={{ letterSpacing: "-0.05em" }}
                >
                    {worlds[active].n}
                </span>
            </div>

            <div className="relative z-10 mx-auto px-4 sm:px-5 md:px-10 lg:px-16 max-w-[1400px]">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
                >
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#7A5C1E] mb-2 sm:mb-3">
                        Our Expertise
                    </p>
                    <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05] text-luxury-charcoal max-w-3xl mx-auto">
                        Crafted for{" "}
                        <span className="italic text-[#7A5C1E]">Every Texture</span>
                    </h2>
                </motion.div>

                {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                {isMobile ? (
                    // Mobile: Horizontal Scroll - No ring, no hover effects
                    <div className="overflow-x-auto pb-4 -mx-4 px-4 mb-8 sm:mb-12">
                        <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                            {worlds.map((w, i) => (
                                <div
                                    key={w.n}
                                    className="relative flex-shrink-0 w-[260px] overflow-hidden rounded-xl shadow-md"
                                >
                                    <div className="relative h-[320px] overflow-hidden bg-[#e8e3d8]">
                                        <Image
                                            src={w.img}
                                            alt={w.label}
                                            fill
                                            className="object-cover"
                                            sizes="260px"
                                        />
                                        {/* Content at bottom with semi-transparent background */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F5F0E8]/95 to-[#F5F0E8]/70 p-4">
                                            <div className="inline-flex items-center gap-2 mb-2">
                                                <span className="text-[#7A5C1E] font-mono text-[10px] tracking-wider">
                                                    {w.n}
                                                </span>
                                                <span className="w-4 h-px bg-[#7A5C1E]/50" />
                                                <span className="text-luxury-charcoal/50 text-[8px] uppercase tracking-wider font-mono">
                                                    {w.tag}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-xl font-light text-luxury-charcoal leading-tight mb-2">
                                                {w.label}
                                            </h3>
                                            <p className="text-luxury-charcoal/70 text-[10px] leading-relaxed font-serif line-clamp-3">
                                                {w.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Desktop: 2x2 Grid with click to expand
                    <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12 sm:mb-16">
                        {worlds.map((w, i) => {
                            const isActive = active === i;
                            const isHovered = hoveredIndex === i;

                            return (
                                <motion.button
                                    key={w.n}
                                    onClick={() => setActive(i)}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={visible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`group relative overflow-hidden rounded-2xl transition-all duration-500 text-left ${isActive
                                        ? "ring-2 ring-[#7A5C1E] shadow-xl"
                                        : "hover:ring-1 hover:ring-[#7A5C1E]/30 shadow-md"
                                        }`}
                                >
                                    <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#e8e3d8]">
                                        <Image
                                            src={w.img}
                                            alt={w.label}
                                            fill
                                            className={`object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"
                                                }`}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* No gradient overlay - clean image */}

                                        {/* Content at bottom with semi-transparent background */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F5F0E8]/90 to-[#F5F0E8]/60 p-6 md:p-8">
                                            <div className={`inline-flex items-center gap-2 mb-2 sm:mb-3 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"
                                                }`}>
                                                <span className="text-[#7A5C1E] font-mono text-xs tracking-wider">
                                                    {w.n}
                                                </span>
                                                <span className="w-6 h-px bg-[#7A5C1E]/50" />
                                                <span className="text-luxury-charcoal/60 text-[10px] uppercase tracking-wider font-mono">
                                                    {w.tag}
                                                </span>
                                            </div>

                                            <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl font-light text-luxury-charcoal leading-none mb-2 sm:mb-3 transition-all duration-300 ${isActive ? "tracking-normal" : "tracking-tight"
                                                }`}>
                                                {w.label}
                                            </h3>

                                            <div className={`overflow-hidden transition-all duration-500 ${isActive
                                                ? "max-h-40 opacity-100 mt-2 sm:mt-4"
                                                : "max-h-0 opacity-0"
                                                }`}>
                                                <p className="text-luxury-charcoal/70 text-sm md:text-base leading-relaxed font-serif">
                                                    {w.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-[#7A5C1E] transition-transform duration-500 origin-left ${isActive ? "scale-x-100" : "scale-x-0"
                                            }`} />
                                    </div>

                                    <div className={`absolute inset-0 border-2 border-[#7A5C1E]/0 rounded-2xl transition-all duration-500 pointer-events-none ${isHovered && !isActive ? "border-[#7A5C1E]/20" : ""
                                        }`} />
                                </motion.button>
                            );
                        })}
                    </div>
                )}

                {/* Active Section Details Panel - Desktop only */}
                {!isMobile && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#7A5C1E]/20"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                        <div className="w-6 sm:w-8 h-px bg-[#7A5C1E]/40" />
                                        <span className="text-[#7A5C1E] text-xs uppercase tracking-wider font-mono">
                                            Application Focus
                                        </span>
                                    </div>
                                    <p className="text-luxury-charcoal/60 text-sm md:text-base max-w-2xl leading-relaxed font-serif">
                                        {worlds[active].desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 sm:gap-8">
                                    <div className="text-center">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-display font-light text-[#7A5C1E]">
                                            {worlds[active].n}
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-luxury-charcoal/40 mt-1 font-mono">
                                            Category
                                        </div>
                                    </div>
                                    <div className="w-px h-6 sm:h-8 bg-[#7A5C1E]/20" />
                                    <div className="text-center">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-display font-light text-[#7A5C1E]">
                                            100+
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-luxury-charcoal/40 mt-1 font-mono">
                                            Variants
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Bottom Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-12 sm:mt-16 md:mt-20 flex items-center justify-center gap-3 sm:gap-6"
                >
                    <span className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#7A5C1E]/25" />
                    <p className="font-serif italic text-xs sm:text-sm text-luxury-charcoal/40 text-center px-2">
                        Sarees · Dress Materials · Curtains · Upholstery Fabrics
                    </p>
                    <span className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#7A5C1E]/25" />
                </motion.div>
            </div>

        </section>
    );
}