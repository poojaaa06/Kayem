"use client";

import { useRef, type ReactNode, type MouseEvent, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

// MagneticButton Component
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

type Post = {
    slug: string;
    img: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    read: string;
    author: string;
};

const featured: Post = {
    slug: "anatomy-of-a-thread",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
    category: "Material Study",
    title: "The Anatomy of a Thread: Light, Twist, and the Geometry of Touch",
    excerpt: "Long before a fabric drapes, the yarn decides how it will move. A meditation on denier, lustre, and the quiet engineering inside every filament we spin in Surat.",
    date: "May 24, 2026",
    read: "8 min read",
    author: "Kishore Mehta",
};

const posts: Post[] = [
    {
        slug: "four-decades-of-spindle-memory",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
        category: "Inside the Mill",
        title: "Four Decades of Spindle Memory",
        excerpt: "Inside our Surat facility, where 1985 machinery hums alongside the newest air-texturising lines.",
        date: "May 10, 2026",
        read: "6 min",
        author: "Aanya Mehta",
    },
    {
        slug: "why-drape-begins-at-70-denier",
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
        category: "Craft",
        title: "Why Drape Begins at 70 Denier",
        excerpt: "A close read on the relationship between fibre weight, fall, and the architecture of a saree's pleat.",
        date: "April 28, 2026",
        read: "5 min",
        author: "Studio Notes",
    },
    {
        slug: "dyeing-in-the-dark",
        img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80",
        category: "Colour",
        title: "Dyeing in the Dark: The Search for Burgundy",
        excerpt: "Three years, eleven baths, one impossible red — the story behind our dope-dyed signature.",
        date: "April 12, 2026",
        read: "7 min",
        author: "Rishabh Mehta",
    },
    {
        slug: "the-yarn-inspectors-quiet-hour",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
        category: "Hands",
        title: "The Yarn Inspector's Quiet Hour",
        excerpt: "What machines still cannot feel — a portrait of the people who finger-read every cone before it ships.",
        date: "March 30, 2026",
        read: "4 min",
        author: "Studio Notes",
    },
    {
        slug: "toward-a-greener-fancy-yarn",
        img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80",
        category: "Futures",
        title: "Toward a Greener Fancy Yarn",
        excerpt: "Closed-loop water, recycled polymer, and a frank look at where speciality textiles need to go next.",
        date: "March 14, 2026",
        read: "6 min",
        author: "Aanya Mehta",
    },
];

const categories = ["All", "Material Study", "Inside the Mill", "Craft", "Colour", "Hands", "Futures"];

export default function Blog() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* ── HERO ── */}
                <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-56 md:h-[90vh] md:pt-0">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image
                            src="/images/bloghero.jpeg"
                            alt="Yarn and textile journal"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/70 via-luxury-cream/25 to-luxury-cream" />
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
                            — The Kayem Journal
                        </motion.p>

                        <h1 className="max-w-6xl font-display text-[12vw] font-light leading-[0.9] md:text-[7.5vw]">
                            {["Field", "notes", "on", "fibre", "&", "light."].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block ">
                                    <motion.span
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.08, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 2 || i === 5 ? "italic text-[#7A5C1E]" : "text-luxury-charcoal"}`}
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
                            Essays, studio diaries, and quiet observations from four decades of
                            making speciality yarn — written by the hands behind the spindle.
                        </motion.p>
                    </div>
                </section>

                {/* ── FEATURED POST ── */}
                <section className="relative mx-auto max-w-7xl px-6 py-20 md:px-16">
                    <FeaturedCard post={featured} />
                </section>

                {/* ── FILTER CHIPS ── */}
                <section className="relative mx-auto max-w-7xl px-6 pb-12 md:px-16">
                    <div className="flex flex-wrap items-center gap-3">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className={`relative px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] rounded-full border transition-all duration-500 ${active === c
                                    ? "border-[#7A5C1E]/50 text-[#7A5C1E] bg-[#7A5C1E]/5 shadow-md"
                                    : "border-[#7A5C1E]/20 text-luxury-charcoal/60 hover:text-[#7A5C1E] hover:border-[#7A5C1E]/30"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── POSTS GRID ── */}
                <section className="relative mx-auto max-w-7xl px-6 pb-32 md:px-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((post, i) => (
                            <PostCard key={post.slug} post={post} idx={i} />
                        ))}
                    </div>
                </section>

                {/* ── CONNECT WITH US SECTION ── */}
                <section className="relative overflow-hidden px-6 py-32 md:px-16">
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

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 20 });
    const sy = useSpring(my, { stiffness: 80, damping: 20 });
    const tx = useTransform(sx, [-1, 1], [-20, 20]);
    const ty = useTransform(sy, [-1, 1], [-20, 20]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
            <div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="group relative grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-white/50 p-6 shadow-xl backdrop-blur-sm lg:grid-cols-12 lg:gap-16 md:p-10"
            >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-7">
                    <motion.div style={{ x: tx, y: ty, scale: 1.1 }} className="relative h-full w-full">
                        <Image src={post.img} alt={post.title} fill className="object-cover" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-luxury-cream/70 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-[#7A5C1E]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg">
                        Featured
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-5">
                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                        <span className="h-px w-8 bg-[#7A5C1E]/50" />
                        {post.category}
                    </div>
                    <h2 className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-5xl">
                        {post.title}
                    </h2>
                    <p className="font-serif leading-relaxed text-luxury-charcoal/70">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-charcoal/50">
                        <span>{post.author}</span>
                        <span className="h-1 w-1 rounded-full bg-[#7A5C1E]/60" />
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-[#7A5C1E]/60" />
                        <span>{post.read}</span>
                    </div>
                    <div className="mt-4">
                        <Link href={`/blog/${post.slug}`}>
                            <MagneticButton className="rounded-full border border-[#7A5C1E]/40 px-7 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-[#7A5C1E]/10">
                                Read the essay
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post, idx }: { post: Post; idx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const sx = useSpring(mx, { stiffness: 120, damping: 20 });
    const sy = useSpring(my, { stiffness: 120, damping: 20 });
    const rx = useTransform(sy, [0, 1], [6, -6]);
    const ry = useTransform(sx, [0, 1], [-6, 6]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ perspective: 1200 }}
        >
            <Link href={`/blog/${post.slug}`} className="block h-full">
                <motion.div
                    ref={ref}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                    style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white/50 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                >
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={post.img}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-cream via-luxury-cream/30 to-transparent opacity-90" />
                        <div className="absolute left-4 top-4 rounded-full bg-[#7A5C1E]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-md">
                            {post.category}
                        </div>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                        <h3 className="font-display text-2xl font-light leading-tight text-luxury-charcoal transition-colors group-hover:text-[#7A5C1E]">
                            {post.title}
                        </h3>
                        <p className="line-clamp-3 font-serif text-sm leading-relaxed text-luxury-charcoal/60">
                            {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-[#7A5C1E]/20 pt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/40">
                            <span>{post.date}</span>
                            <span className="flex items-center gap-2">
                                {post.read}
                                <span className="inline-block h-px w-6 bg-[#7A5C1E]/60 transition-all duration-500 group-hover:w-10" />
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.article>
    );
}