"use client";

import { useRef, type ReactNode, type MouseEvent, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = { index: string; title: string; items: string[] }
type Family = { familyNum: string; family: string; img: string; blurb: string; categories: Category[] }

// ── MagneticButton ────────────────────────────────────────────────────────────
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

// ── Accordion Category ────────────────────────────────────────────────────────
function ExpandableCategory({ index, title, items }: {
    index: string; title: string; items: string[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#7A5C1E]/15 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group w-full flex items-center justify-between py-5 sm:py-6 text-left gap-3 hover:bg-[#7A5C1E]/3 transition-colors duration-200 px-4 sm:px-6"
            >
                <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7A5C1E]/10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#7A5C1E]">
                        {index}
                    </span>
                    <span className={`font-display text-base sm:text-xl md:text-2xl transition-colors duration-300 ${isOpen ? "text-[#7A5C1E]" : "text-[#2C2418]"}`}>
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="hidden sm:block text-[16px] sm:text-[16px] font-medium text-[#7A5C1E]/70 bg-[#7A5C1E]/8 px-2.5 py-1.5 rounded-full">
                        {items.length} variants
                    </span>
                    <span className="sm:hidden text-[10px] font-medium text-[#7A5C1E]/60 bg-[#7A5C1E]/8 px-2 py-1 rounded-full">
                        {items.length}
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
                        <div className="pb-6 sm:pb-8 px-4 sm:px-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-12 bg-gradient-to-r from-[#7A5C1E]/40 to-transparent" />
                                <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#7A5C1E]/50 font-sans uppercase">Available deniers</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A5C1E]/10" />
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {items.map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.01 }}
                                        className="text-[11px] sm:text-[12px] md:text-[13px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#F5F0E8] border border-[#7A5C1E]/20 text-[#3D2E10] hover:border-[#7A5C1E]/50 hover:bg-white hover:shadow-sm transition-all duration-200"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Application Card with Description ──────────────────────────────────────────
function AppCard({ index, title, tag, description, image, alt }: {
    index: string; title: string; tag: string; description: string; image: string; alt: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={image} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#C9A84C] mb-1">{index}</p>
                <p className="font-display text-base sm:text-lg text-white leading-tight font-semibold">{title}</p>
                <p className="text-[#C9A84C]/70 text-[8px] sm:text-[10px] mt-0.5 mb-2">{tag}</p>
                <p className="text-white/70 text-[9px] sm:text-[11px] leading-relaxed line-clamp-3">{description}</p>
            </div>
        </motion.div>
    );
}

// ── Static data with descriptions ─────────────────────────────────────────────
const applications = [
    {
        index: "01",
        title: "Sarees",
        tag: "Drape & lustre",
        description: "Premium yarns that create sarees with elegant drape, rich texture, and lasting beauty.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
        alt: "Vibrant saree"
    },
    {
        index: "02",
        title: "Dress Materials",
        tag: "Texture & flow",
        description: "Versatile yarns engineered for comfort, softness, and superior fabric performance.",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
        alt: "Dress fabric"
    },
    {
        index: "03",
        title: "Curtains",
        tag: "Weight & fall",
        description: "High-quality yarns delivering excellent fall, durability, and refined aesthetics.",
        image: "/images/curtain.jpg",
        alt: "Curtains"
    },
    {
        index: "04",
        title: "Upholstery",
        tag: "Strength & finish",
        description: "Strong and resilient yarns designed for furniture fabrics with lasting strength and finish.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        alt: "Sofa"
    },
    {
        index: "05",
        title: "Carpets",
        tag: "Pile & resilience",
        description: "Durable yarns crafted to provide texture, resilience, and long-term wear resistance.",
        image: "/images/carpet.jpg",
        alt: "Carpet"
    },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductsClient({ families }: { families: Family[] }) {
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
                        <Image src="/images/producthero.jpeg" alt="Colourful yarn cones in a textile mill" fill className="object-cover" priority />
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
                            — The Library · 40D to 1100D
                        </motion.p>
                        <h1 className="max-w-6xl font-display text-[12vw] font-light leading-[0.9] md:text-[7.5vw]">
                            {["A", "spectrum", "of", "speciality", "yarn."].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block">
                                    <motion.span
                                        initial={{ y: "110%" }} animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 3 ? "italic text-[#7A5C1E]" : "text-luxury-charcoal"}`}
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
                            Complete range of Nylon, Viscose & Specialty yarns. Custom developments on request — every yarn tuned for hand, drape, and the quiet luxury of finished fabric.
                        </motion.p>
                    </div>
                </section>

                {/* ── YARN FAMILIES (from Sanity) ── */}
                <section className="relative mx-auto max-w-7xl space-y-24 sm:space-y-36 md:space-y-48 px-5 sm:px-6 pt-12 sm:pt-16 pb-24 sm:pb-32 md:px-16">
                    {families.length === 0 && (
                        <div className="text-center py-24 text-luxury-charcoal/40 font-serif text-lg">
                            No yarn families published yet. Add one in Sanity Studio.
                        </div>
                    )}
                    {families.map((fam, fi) => (
                        <div key={fam.family} className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                                className="mb-10 sm:mb-12 grid items-end gap-6 sm:gap-8 md:grid-cols-12"
                            >
                                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl md:col-span-4 w-full max-w-[260px] sm:max-w-none">
                                    <Image
                                        src={fam.img}
                                        alt={`${fam.family} yarn`}
                                        fill
                                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/50 via-transparent to-transparent" />
                                </div>

                                <div className="md:col-span-8">
                                    <p className="mb-3 sm:mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                        — Family {fam.familyNum}
                                    </p>
                                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95] text-luxury-charcoal">
                                        {fam.family.split(" ")[0]}{" "}
                                        <span className="italic text-[#7A5C1E]">{fam.family.split(" ").slice(1).join(" ")}</span>
                                    </h2>
                                    <p className="mt-4 sm:mt-6 max-w-xl font-serif text-sm sm:text-base leading-relaxed text-luxury-charcoal/70">
                                        {fam.blurb}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.8, delay: 0.15 }}
                                className="rounded-2xl border border-[#7A5C1E]/15 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
                            >
                                {fam.categories.map((cat) => (
                                    <ExpandableCategory
                                        key={cat.index}
                                        index={cat.index}
                                        title={cat.title}
                                        items={cat.items ?? []}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </section>

                {/* ── APPLICATIONS with descriptions ── */}
                <section className="relative overflow-hidden border-y border-[#7A5C1E]/20 px-5 sm:px-6 py-20 sm:py-32 md:px-16">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-[#7A5C1E]/8 to-[#F5E6D3]/20" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615996001375-c7ef1329443f?w=1600&q=80')] bg-cover bg-center opacity-5" />
                        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                    </div>
                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 1 }}
                            className="mb-10 sm:mb-16"
                        >
                            <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">— Applications</p>
                            <h3 className="max-w-3xl font-display text-3xl sm:text-4xl md:text-6xl font-light leading-[1.05] text-luxury-charcoal">
                                Crafted for <span className="italic text-[#7A5C1E]">versatile</span> applications.
                            </h3>
                        </motion.div>

                        {isMobile ? (
                            <div className="overflow-x-auto pb-4 -mx-5 px-5">
                                <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                                    {applications.map((app) => (
                                        <div key={app.title} className="w-[220px]">
                                            <AppCard {...app} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-5 gap-5">
                                {applications.map((app, i) => (
                                    <motion.div
                                        key={app.title}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}
                                    >
                                        <AppCard {...app} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
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
                                Have a project in mind? Looking for custom yarn solutions?<br />
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