// app/latest-yarns/LatestYarnsClient.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import type { Yarn } from "./page";

// ── Yarn Card (matching AppCard style from Products page) ──
function YarnCard({ yarn, idx }: { yarn: Yarn; idx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const sx = useSpring(mx, { stiffness: 120, damping: 20 });
    const sy = useSpring(my, { stiffness: 120, damping: 20 });
    const rx = useTransform(sy, [0, 1], [6, -6]);
    const ry = useTransform(sx, [0, 1], [-6, 6]);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => { mx.set(0.5); my.set(0.5); };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-[220px] sm:w-[240px] md:w-[260px] flex-shrink-0"
        >
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                className="relative"
            >
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={yarn.img}
                        alt={yarn.name}
                        fill
                        sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, 260px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={yarn.img.startsWith('http')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* "New" badge */}
                    <div className="absolute top-3 left-3 rounded-full bg-[#C9A84C]/90 px-2.5 py-1">
                        <span className="text-[7px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
                            New
                        </span>
                    </div>
                </div>

                {/* Content overlay - matching AppCard style */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                    <p className="font-mono text-[8px] tracking-[0.2em] text-[#C9A84C] mb-0.5">
                        {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-sm sm:text-base text-white leading-tight font-semibold line-clamp-2">
                        {yarn.name}
                    </h3>
                    <p className="text-white/60 text-[8px] sm:text-[9px] mt-0.5 mb-1.5 font-mono uppercase tracking-[0.1em]">
                        Latest Arrival
                    </p>
                    <p className="text-white/70 text-[8px] sm:text-[10px] leading-relaxed line-clamp-2">
                        {yarn.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function LatestYarnsClient({ yarns }: { yarns: Yarn[] }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [mounted, setMounted] = useState(false);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const cardWidth = isMobile ? 220 : 260;
            const gap = isMobile ? 16 : 20;
            const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 20);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && mounted) {
            container.addEventListener('scroll', checkScrollButtons, { passive: true });
            checkScrollButtons();
            window.addEventListener('resize', checkScrollButtons);
            return () => {
                container.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, [mounted, yarns]);

    // Fallback data if no yarns from Sanity
    const displayYarns = yarns.length > 0 ? yarns : [
        {
            slug: "cashmere-silk-blend",
            name: "Cashmere Silk Blend",
            img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=800&fit=crop",
            description: "Premium cashmere and silk blend for elegant winter wear.",
        },
        {
            slug: "organic-cotton-boucle",
            name: "Organic Cotton Bouclé",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop",
            description: "Textured bouclé yarn from 100% organic cotton.",
        },
        {
            slug: "merino-wool-fine",
            name: "Merino Wool Fine",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop",
            description: "Superfine Merino wool with exceptional softness.",
        },
        {
            slug: "linen-hemp-blend",
            name: "Linen Hemp Blend",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop",
            description: "Breathable European linen and hemp blend.",
        },
        {
            slug: "alpaca-silk-lace",
            name: "Alpaca Silk Lace",
            img: "https://images.unsplash.com/photo-1603823557196-b8d78f33cc9c?w=800&h=800&fit=crop",
            description: "Delicate lace-weight yarn combining baby alpaca with silk.",
        },
        {
            slug: "recycled-cotton-slub",
            name: "Recycled Cotton Slub",
            img: "https://images.unsplash.com/photo-1556306535-0f09a537f4a3?w=800&h=800&fit=crop",
            description: "Eco-conscious slub yarn from recycled cotton fibers.",
        },
        {
            slug: "bamboo-cotton-blend",
            name: "Bamboo Cotton Blend",
            img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=800&fit=crop",
            description: "Sustainable bamboo and cotton blend with natural softness.",
        },
        {
            slug: "silk-wool-mix",
            name: "Silk Wool Mix",
            img: "https://images.unsplash.com/photo-1603823557196-b8d78f33cc9c?w=800&h=800&fit=crop",
            description: "Luxurious silk and wool blend for premium textiles.",
        }
    ];

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal overflow-x-hidden">

                {/* ── HERO SECTION (exactly matching Fabric page) ── */}
                <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-56 md:h-[90vh] md:pt-0">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image
                            src="/images/NYLON.JPEG"
                            alt="Latest yarn collections"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/90 via-luxury-cream/50 to-luxury-cream" />
                        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                    </div>
                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-16 sm:pb-24 md:px-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mb-4 sm:mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]"
                        >
                            — The Spinner's Collection
                        </motion.p>
                        <h1 className="max-w-6xl font-display text-[12vw] font-light leading-[0.9] md:text-[7.5vw]">
                            {["Latest", "Yarns"].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block">
                                    <motion.span
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 0 ? "text-luxury-charcoal" : "italic text-[#7A5C1E]"}`}
                                    >
                                        {w}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-6 sm:mt-10 max-w-sm sm:max-w-xl font-serif text-sm sm:text-base leading-relaxed text-luxury-charcoal/70"
                        >
                            Discover our newest arrivals - each thread tells a story of craftsmanship,
                            quality, and sustainable innovation.
                        </motion.p>
                    </div>
                </section>

                {/* ── HORIZONTAL SCROLL SECTION ── */}
                <section className="relative overflow-hidden border-y border-[#7A5C1E]/20 px-5 sm:px-6 py-16 sm:py-20 md:px-16">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-[#7A5C1E]/8 to-[#F5E6D3]/20" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615996001375-c7ef1329443f?w=1600&q=80')] bg-cover bg-center opacity-5" />
                        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="mb-8 sm:mb-12 flex items-end justify-between"
                        >
                            <div>
                                <p className="mb-2 sm:mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">
                                    — Fresh from the Mill
                                </p>
                                <h3 className="max-w-3xl font-display text-3xl sm:text-4xl md:text-6xl font-light leading-[1.05] text-luxury-charcoal">
                                    New <span className="italic text-[#7A5C1E]">Arrivals</span>
                                </h3>
                            </div>

                            {mounted && !isMobile && (
                                <div className="flex flex-shrink-0 gap-2">
                                    <button
                                        onClick={() => scroll('left')}
                                        className={`rounded-full border border-[#7A5C1E]/30 p-2 transition-all duration-300 hover:bg-[#7A5C1E]/10 ${!showLeftArrow ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                            }`}
                                        disabled={!showLeftArrow}
                                        aria-label="Scroll left"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => scroll('right')}
                                        className={`rounded-full border border-[#7A5C1E]/30 p-2 transition-all duration-300 hover:bg-[#7A5C1E]/10 ${!showRightArrow ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                            }`}
                                        disabled={!showRightArrow}
                                        aria-label="Scroll right"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        <div className="relative">
                            {mounted && !isMobile && showLeftArrow && (
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#F5F0E8] to-transparent" />
                            )}
                            {mounted && !isMobile && showRightArrow && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#F5F0E8] to-transparent" />
                            )}

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {displayYarns.map((yarn, idx) => (
                                    <motion.div
                                        key={yarn.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                                    >
                                        <YarnCard yarn={yarn} idx={idx} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-1.5">
                            {displayYarns.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (scrollContainerRef.current) {
                                            const cardWidth = isMobile ? 220 : 260;
                                            const gap = isMobile ? 16 : 20;
                                            scrollContainerRef.current.scrollTo({
                                                left: idx * (cardWidth + gap),
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                    className="h-1.5 rounded-full bg-[#7A5C1E]/30 transition-all duration-300 hover:bg-[#7A5C1E]/60"
                                    style={{ width: idx === 0 ? '20px' : '6px' }}
                                    aria-label={`Scroll to yarn ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CONNECT SECTION ── */}
                <section className="relative overflow-hidden px-5 sm:px-6 py-20 sm:py-32 text-center md:px-16">
                    {!isMobile && (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/15 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                            <div className="absolute top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                        </div>
                    )}
                    <div className="relative mx-auto max-w-3xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                — Let's Create Together
                            </p>
                            <h3 className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl">
                                Looking for a <span className="italic text-[#7A5C1E]">custom yarn?</span>
                            </h3>
                            <div className="mx-auto my-8 h-px w-16 bg-[#7A5C1E]/30" />
                            <p className="mx-auto max-w-md font-serif text-base leading-relaxed text-luxury-charcoal/70">
                                We work with designers and brands to create bespoke yarns tailored to your vision.
                            </p>
                            <div className="mt-10">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group relative inline-flex items-center gap-3 rounded-full bg-[#7A5C1E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-[#694f18] hover:shadow-2xl"
                                >
                                    Send an inquiry
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}