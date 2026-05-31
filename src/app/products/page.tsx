"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// MagneticButton Component (embedded)
function MagneticButton({ children, className = "", variant = "primary", onClick }: {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "ghost";
    onClick?: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });
    const rotate = useTransform(sx, [-30, 30], [-4, 4]);

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        x.set(mx * 0.35);
        y.set(my * 0.35);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    const base =
        variant === "primary"
            ? "bg-[#7A5C1E] text-white shadow-lg hover:shadow-2xl hover:bg-[#694f18]"
            : "border border-[#7A5C1E]/40 text-luxury-charcoal hover:border-[#7A5C1E] hover:bg-[#7A5C1E]/5";

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: sx, y: sy, rotate }}
            className={`relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${base} ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

type Item = { code: string; name: string; desc: string };

const families: {
    family: string;
    tag: string;
    img: string;
    bgGradient: string;
    blurb: string;
    items: Item[];
}[] = [
        {
            family: "Nylon Yarns",
            tag: "Series N",
            img: "/images/NYLON.jpeg",
            bgGradient: "from-[#1a1a2e]/5 via-[#16213e]/3 to-transparent",
            blurb: "Resilient, lustrous, and engineered for movement — the workhorse of fancy fabric.",
            items: [
                { code: "N—01", name: "Nylon Plain ATY", desc: "Air-textured nylon with soft, balanced hand." },
                { code: "N—02", name: "Nylon Slub ATY", desc: "Calibrated slubs for organic surface character." },
                { code: "N—03", name: "Nylon Fancy", desc: "Twisted multi-filament with sculpted texture." },
                { code: "N—04", name: "Nylon Crepe", desc: "High-twist crepe for fluid drape and dry touch." },
            ],
        },
        {
            family: "Viscose Yarns",
            tag: "Series V",
            img: "/images/viscous.png",
            bgGradient: "from-[#2d1b0e]/5 via-[#3d2b1a]/3 to-transparent",
            blurb: "Soft, breathable, deeply absorbent of dye — the fibre of poetry and saree silk.",
            items: [
                { code: "V—01", name: "Viscose ATY", desc: "Air-textured viscose with silk-like fall." },
                { code: "V—02", name: "Viscose Fancy", desc: "Boucle, loop and slub constructions on demand." },
            ],
        },
        {
            family: "Other Yarns",
            tag: "Series K",
            img: "/images/dopedyed.jpeg",
            bgGradient: "from-[#0f0f0f]/5 via-[#1a1a1a]/3 to-transparent",
            blurb: "From dope-dyed polyester to dyed cationic — colour, character, and depth on request.",
            items: [
                { code: "K—01", name: "Polyester Dope Dyed", desc: "Solution-dyed for fastness and saturation." },
                { code: "K—02", name: "Cationic Fancy Grey", desc: "Undyed cationic ready for deep-shade dyeing." },
                { code: "K—03", name: "Cationic Fancy Dyed", desc: "Pre-dyed cationic in bespoke colour cards." },
            ],
        },
    ];

function YarnTile({ item, idx }: { item: Item; idx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const sx = useSpring(rx, { stiffness: 150, damping: 18 });
    const sy = useSpring(ry, { stiffness: 150, damping: 18 });
    const tiltX = useTransform(sy, [-50, 50], [6, -6]);
    const tiltY = useTransform(sx, [-50, 50], [-6, 6]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set(e.clientX - r.left - r.width / 2);
        ry.set(e.clientY - r.top - r.height / 2);
    };
    const onLeave = () => { rx.set(0); ry.set(0); };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
                className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7A5C1E]/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                <div className="flex items-start justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A5C1E]">
                    <span>{item.code}</span>
                    <span className="font-mono text-luxury-charcoal/60">50–500D</span>
                </div>
                <h4 className="mt-5 font-display text-2xl text-luxury-charcoal">{item.name}</h4>
                <p className="mt-3 font-serif text-sm leading-relaxed text-luxury-charcoal/70">{item.desc}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#7A5C1E]/40 via-luxury-charcoal/10 to-transparent" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-luxury-charcoal/50">
                    Sarees · Dress · Curtains · Upholstery
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function Products() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">
                {/* HERO - With background image and parallax like About page */}
                <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-56 md:h-[90vh] md:pt-0">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image
                            src="/images/product-hero.png"
                            alt="Colourful yarn cones in a textile mill"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Rich multi-layered gradients */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/90 via-luxury-cream/50 to-luxury-cream" />
                        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                    </div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-24 md:px-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]"
                        >
                            — The Library · 50D to 500D
                        </motion.p>
                        <h1 className="max-w-6xl font-display text-[12vw] font-light leading-[0.9] md:text-[7.5vw]">
                            {["A", "spectrum", "of", "speciality", "yarn."].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block">
                                    <motion.span
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 3 ? "italic text-[#7A5C1E]" : "text-luxury-charcoal"}`}
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
                            className="mt-10 max-w-xl font-serif leading-relaxed text-luxury-charcoal/70"
                        >
                            Three families. Nine signatures. Custom developments on request — every yarn
                            tuned for hand, drape, and the quiet luxury of finished fabric.
                        </motion.p>
                    </div>
                </section>

                {/* FAMILIES - Each family has unique background */}
                <section className="relative mx-auto max-w-7xl space-y-48 px-6 pb-32 md:px-16 mt-6">
                    {families.map((fam, fi) => (
                        <div key={fam.family} className="relative">
                            {/* Family-specific background */}
                            <div className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${fam.bgGradient} opacity-50`} />

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                                className="mb-12 grid items-end gap-8 md:grid-cols-12"
                            >
                                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl md:col-span-4">
                                    <Image
                                        src={fam.img}
                                        alt={`${fam.family} reference yarn cone`}
                                        fill
                                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A5C1E]">
                                            {fam.tag}
                                        </span>
                                        <span className="font-mono text-xs text-luxury-charcoal/50">
                                            0{fi + 1}/0{families.length}
                                        </span>
                                    </div>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                        — Family 0{fi + 1}
                                    </p>
                                    <h2 className="font-display text-4xl font-light leading-[0.95] text-luxury-charcoal md:text-7xl">
                                        {fam.family.split(" ")[0]}{" "}
                                        <span className="italic text-[#7A5C1E]">{fam.family.split(" ").slice(1).join(" ")}</span>
                                    </h2>
                                    <p className="mt-6 max-w-xl font-serif leading-relaxed text-luxury-charcoal/70">
                                        {fam.blurb}
                                    </p>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                                {fam.items.map((it, i) => (
                                    <YarnTile key={it.code} item={it} idx={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* APPLICATIONS - Rich textured background */}
                <section className="relative overflow-hidden border-y border-[#7A5C1E]/20 px-6 py-32 md:px-16">
                    {/* Beautiful fabric texture background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-[#7A5C1E]/8 to-[#F5E6D3]/20" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615996001375-c7ef1329443f?w=1600&q=80')] bg-cover bg-center opacity-5" />
                        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-7xl">
                        <motion.h3
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl"
                        >
                            Woven into <span className="italic text-[#7A5C1E]">every</span> corner of the home & wardrobe.
                        </motion.h3>
                        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-5">
                            {["Sarees", "Dress Materials", "Curtains", "Carpets", "Upholstery"].map((app, i) => (
                                <motion.div
                                    key={app}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.08 }}
                                    className="group rounded-xl bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-2xl"
                                >
                                    <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-[#7A5C1E]">
                                        0{i + 1}
                                    </span>
                                    <p className="mt-3 font-display text-xl text-luxury-charcoal transition-all group-hover:scale-105">
                                        {app}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA - Elegant gradient section */}
                <section className="relative overflow-hidden px-6 py-32 text-center md:px-16">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#7A5C1E]/20 blur-3xl" />
                        <div className="absolute top-0 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-3xl">
                        <motion.h3
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl"
                        >
                            Request a <span className="italic text-[#7A5C1E]">sample card.</span>
                        </motion.h3>
                        <p className="mt-6 font-serif text-luxury-charcoal/70">
                            Tell us the fabric you imagine — we'll engineer the yarn that gets you there.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <MagneticButton>Request samples</MagneticButton>
                            <MagneticButton variant="ghost">info@kayem.in</MagneticButton>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}