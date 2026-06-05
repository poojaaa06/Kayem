"use client";

import { useRef, type ReactNode, type MouseEvent, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { ChevronDown } from "lucide-react";
import type { FabricProduct } from "./page";

// ── MagneticButton ─────────────────────────────────────────────────────────────
function MagneticButton({ children, className = "", variant = "primary", onClick }: {
    children: ReactNode; className?: string; variant?: "primary" | "ghost"; onClick?: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0); const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });
    const rotate = useTransform(sx, [-30, 30], [-4, 4]);
    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };
    const base = variant === "primary"
        ? "bg-[#7A5C1E] text-white shadow-lg hover:shadow-xl hover:bg-[#694f18]"
        : "border border-[#7A5C1E]/40 text-luxury-charcoal hover:border-[#7A5C1E] hover:bg-[#7A5C1E]/5";
    return (
        <motion.button ref={ref} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave}
            style={{ x: sx, y: sy, rotate }}
            className={`relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-5 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${base} ${className}`}>
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

// ── Expandable Spec Row ────────────────────────────────────────────────────────
function ExpandableSpec({ fabric }: { fabric: FabricProduct }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#7A5C1E]/15 last:border-b-0">
            {/* Header row — mirrors ExpandableCategory from products */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group w-full flex items-center justify-between py-5 sm:py-6 text-left gap-3 hover:bg-[#7A5C1E]/3 transition-colors duration-200 px-4 sm:px-6"
            >
                <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7A5C1E]/10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#7A5C1E]">
                        {String(fabric.order).padStart(2, '0')}
                    </span>
                    <span className={`font-display text-base sm:text-xl md:text-2xl transition-colors duration-300 ${isOpen ? "text-[#7A5C1E]" : "text-[#2C2418]"}`}>
                        {fabric.name}
                    </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="hidden sm:block text-[14px] font-medium text-[#7A5C1E]/70 bg-[#7A5C1E]/8 px-2.5 py-1.5 rounded-full">
                        {fabric.specifications?.length ?? 0} specs
                    </span>
                    <span className="sm:hidden text-[10px] font-medium text-[#7A5C1E]/60 bg-[#7A5C1E]/8 px-2 py-1 rounded-full">
                        {fabric.specifications?.length ?? 0}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#7A5C1E]/30 flex items-center justify-center bg-white shadow-sm group-hover:border-[#7A5C1E]/60 transition-colors"
                    >
                        <ChevronDown size={14} className="text-[#7A5C1E]" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 sm:pb-8 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Specs */}
                            {fabric.specifications?.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-px w-12 bg-gradient-to-r from-[#7A5C1E]/40 to-transparent" />
                                        <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#7A5C1E]/50 font-sans uppercase">Specifications</span>
                                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A5C1E]/10" />
                                    </div>
                                    <div className="space-y-3">
                                        {fabric.specifications.map((spec, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-baseline justify-between border-b border-[#7A5C1E]/10 pb-2"
                                            >
                                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5C1E]/60 font-semibold">
                                                    {spec.label}
                                                </span>
                                                <span className="font-display text-xl text-[#2C2418]">
                                                    {spec.value}
                                                    {spec.unit && (
                                                        <span className="text-xs text-luxury-charcoal/40 ml-1">{spec.unit}</span>
                                                    )}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Applications + Features */}
                            <div className="space-y-6">
                                {fabric.applications?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-px w-12 bg-gradient-to-r from-[#7A5C1E]/40 to-transparent" />
                                            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#7A5C1E]/50 font-sans uppercase">Applications</span>
                                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A5C1E]/10" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {fabric.applications.map((app, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.04 }}
                                                    className="text-[11px] sm:text-[12px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#F5F0E8] border border-[#7A5C1E]/20 text-[#3D2E10] hover:border-[#7A5C1E]/50 hover:bg-white hover:shadow-sm transition-all duration-200"
                                                >
                                                    {app}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {fabric.features?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-px w-12 bg-gradient-to-r from-[#7A5C1E]/40 to-transparent" />
                                            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#7A5C1E]/50 font-sans uppercase">Key Features</span>
                                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A5C1E]/10" />
                                        </div>
                                        <ul className="space-y-2">
                                            {fabric.features.map((feat, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.04 }}
                                                    className="flex items-center gap-2.5 text-sm text-luxury-charcoal/75"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C1E] flex-shrink-0" />
                                                    {feat}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FabricClient({ fabrics }: { fabrics: FabricProduct[] }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* ── HERO ── */}
                <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-56 md:h-[90vh] md:pt-0">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image
                            src="/images/fabric.jpeg"
                            alt="Premium fabric collection"
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
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mb-4 sm:mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]"
                        >
                            — The Fabric Collection
                        </motion.p>
                        <h1 className="max-w-6xl font-display text-[12vw] font-light leading-[0.9] md:text-[7.5vw]">
                            {["Woven", "with", "quiet", "precision."].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block">
                                    <motion.span
                                        initial={{ y: "110%" }} animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 2 ? "italic text-[#7A5C1E]" : "text-luxury-charcoal"}`}
                                    >
                                        {w}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-6 sm:mt-10 max-w-sm sm:max-w-xl font-serif text-sm sm:text-base leading-relaxed text-luxury-charcoal/70"
                        >
                            Premium fabric blends engineered for drape, durability, and the quiet luxury of finished cloth.
                        </motion.p>
                    </div>
                </section>

                {/* ── FABRIC PRODUCTS ── */}
                <section className="relative mx-auto max-w-7xl space-y-24 sm:space-y-36 md:space-y-48 px-5 sm:px-6 pt-12 sm:pt-16 pb-24 sm:pb-32 md:px-16">
                    {fabrics.length === 0 && (
                        <div className="text-center py-24 text-luxury-charcoal/40 font-serif text-lg">
                            No fabrics published yet. Add one in Sanity Studio.
                        </div>
                    )}

                    {fabrics.map((fab, fi) => (
                        <div key={fab.slug} className="relative">
                            {/* Family header — mirrors yarn families layout */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                                className="mb-10 sm:mb-12 grid items-end gap-6 sm:gap-8 md:grid-cols-12"
                            >
                                {/* Image */}
                                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl md:col-span-4 w-full max-w-[260px] sm:max-w-none">
                                    <Image
                                        src={fab.heroImage}
                                        alt={fab.name}
                                        fill
                                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/50 via-transparent to-transparent" />
                                </div>

                                {/* Text */}
                                <div className="md:col-span-8">
                                    <p className="mb-3 sm:mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                        — {fab.tagline || 'Premium Fabric'}
                                    </p>
                                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95] text-luxury-charcoal">
                                        {fab.name.split(" ")[0]}{" "}
                                        <span className="italic text-[#7A5C1E]">{fab.name.split(" ").slice(1).join(" ")}</span>
                                    </h2>
                                    <p className="mt-4 sm:mt-6 max-w-xl font-serif text-sm sm:text-base leading-relaxed text-luxury-charcoal/70">
                                        {fab.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Expandable detail panel — mirrors yarn accordion */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.8, delay: 0.15 }}
                                className="rounded-2xl border border-[#7A5C1E]/15 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
                            >
                                <ExpandableSpec fabric={fab} />
                            </motion.div>
                        </div>
                    ))}
                </section>

                {/* ── CONNECT WITH US ── */}
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
                                — Connect With Us
                            </p>
                            <h3 className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl">
                                Let's weave your <span className="italic text-[#7A5C1E]">next chapter.</span>
                            </h3>
                            <div className="mx-auto my-8 h-px w-16 bg-[#7A5C1E]/30" />
                            <p className="mx-auto max-w-md font-serif text-base leading-relaxed text-luxury-charcoal/70">
                                Have a project in mind? Looking for custom fabric solutions?<br />
                                We'd love to hear from you.
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <MagneticButton onClick={() => setIsModalOpen(true)}>
                                    Send an inquiry
                                </MagneticButton>
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