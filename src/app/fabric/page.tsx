"use client";

import { useRef, type ReactNode, type MouseEvent, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import EnquiryModal from "@/components/EnquiryModal";

// MagneticButton Component
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

// Fabric Data
const fabricData = {
    name: "COTSiLK FABRIC",
    specifications: {
        gsm: "77",
        material: "Cotton Polyamide",
    },
    applications: [
        "Shirts",
        "Kurtas",
        "Pajamas",
        "Women's Garments",
        "Casual & Contemporary Apparel"
    ],
    description: "A premium blend of cotton and polyamide, COTSiLK fabric offers the natural comfort of cotton with the durability and sheen of polyamide. Perfect for modern fashion that demands both style and functionality."
};

export default function FabricPage() {
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

                {/* Hero Section - Background Image */}
                <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden pt-56 md:h-[80vh] md:pt-0">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image
                            src="/images/fabric.jpeg"
                            alt="COTSiLK Fabric"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/70 via-luxury-cream/45 to-luxury-cream" />
                        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                    </div>
                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-16 sm:pb-24 md:px-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mb-4 sm:mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]"
                        >
                            — Premium Fabric
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-luxury-charcoal"
                        >
                            {fabricData.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="mt-6 sm:mt-10 max-w-2xl font-serif text-sm sm:text-base leading-relaxed text-luxury-charcoal/70"
                        >
                            {fabricData.description}
                        </motion.p>
                    </div>
                </section>

                {/* Product Details Section - With Small Image */}
                <section className="relative mx-auto max-w-7xl px-5 sm:px-6 py-20 sm:py-32 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column - Small Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className=" top-32">
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/fabric.jpeg"
                                        alt={fabricData.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A5C1E] font-semibold">
                                        Premium Quality
                                    </p>
                                    <div className="h-px w-12 bg-[#7A5C1E]/30 mx-auto mt-2" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Specifications & Applications */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-8">
                                <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">
                                    — Specifications
                                </p>
                                <h2 className="font-display text-3xl sm:text-4xl font-light text-luxury-charcoal">
                                    Technical <span className="italic text-[#7A5C1E]">details</span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* GSM */}
                                <div className="border-b border-[#7A5C1E]/20 pb-4">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A5C1E] mb-1 font-semibold">
                                        GSM
                                    </p>
                                    <p className="font-display text-3xl text-luxury-charcoal">
                                        {fabricData.specifications.gsm}
                                        <span className="text-sm text-luxury-charcoal/50 ml-2">g/m²</span>
                                    </p>
                                </div>

                                {/* Material Composition */}
                                <div className="border-b border-[#7A5C1E]/20 pb-4">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A5C1E] mb-1 font-semibold">
                                        Material Composition
                                    </p>
                                    <p className="font-serif text-lg text-luxury-charcoal">
                                        {fabricData.specifications.material}
                                    </p>
                                </div>
                            </div>

                            {/* Applications Section */}
                            <div className="mt-12">
                                <div className="mb-6">
                                    <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">
                                        — Applications
                                    </p>
                                    <h2 className="font-display text-3xl sm:text-4xl font-light text-luxury-charcoal">
                                        Perfect <span className="italic text-[#7A5C1E]">for</span>
                                    </h2>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {fabricData.applications.map((app, idx) => (
                                        <motion.span
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="px-5 py-2.5 rounded-full bg-white border border-[#7A5C1E]/30 text-[#7A5C1E] text-sm font-medium hover:bg-[#7A5C1E]/5 transition-colors"
                                        >
                                            {app}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-[#7A5C1E]/20">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A5C1E] mb-3 font-semibold">
                                    Key Features
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-luxury-charcoal/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C1E]" />
                                        Natural comfort of cotton
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-luxury-charcoal/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C1E]" />
                                        Enhanced durability with polyamide
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-luxury-charcoal/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C1E]" />
                                        Beautiful drape and sheen
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-luxury-charcoal/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C1E]" />
                                        Breathable and comfortable
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Connect With Us Section */}
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