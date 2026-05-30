"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Shared post data ────────────────────────────────────────────────────────
// In a real app, move this to lib/posts.ts and import everywhere
export const allPosts = [
    {
        slug: "anatomy-of-a-thread",
        img: "https://images.unsplash.com/photo-1617470703223-e1e3e4e3f0db?w=1200&q=80",
        category: "Material Study",
        title: "The Anatomy of a Thread: Light, Twist, and the Geometry of Touch",
        excerpt:
            "Long before a fabric drapes, the yarn decides how it will move. A meditation on denier, lustre, and the quiet engineering inside every filament we spin in Surat.",
        date: "May 24, 2026",
        read: "8 min read",
        author: "Kishore Mehta",
        body: [
            {
                type: "lead",
                text: "Hold a single filament of 30-denier trilobal polyester up to morning light and watch what it does. It doesn't merely reflect — it refracts, bends the spectrum, fragments gold into a dozen quieter colours. That is not accident. It is geometry.",
            },
            {
                type: "h2",
                text: "What denier actually measures",
            },
            {
                type: "p",
                text: "Denier is weight per length: the mass in grams of 9,000 metres of a single filament. A lower number means a finer thread. A 15-denier filament is gossamer — roughly the diameter of a fine human hair, though far more uniform. At 70 denier you begin to feel the yarn between your fingertips as something with presence, with memory. Beyond 150 denier the fibre starts to carry structure rather than drape.",
            },
            {
                type: "p",
                text: "The denier decision is the first aesthetic decision a mill makes. Everything downstream — how a saree falls, whether a dupatta holds its pleat, how a shawl drapes from the shoulder — traces back to this single number chosen before a single spindle turns.",
            },
            {
                type: "image",
                src: "https://images.unsplash.com/photo-1617470703223-e1e3e4e3f0db?w=1200&q=80",
                caption: "Cross-sections of trilobal, round, and hollow filaments under polarised light — each profile bends incident light differently.",
            },
            {
                type: "h2",
                text: "The geometry of lustre",
            },
            {
                type: "p",
                text: "Round fibres are mirrors. Light strikes, reflects at a single angle, creates a hard highlight. This is the cold shine of commodity yarn — the kind that reads as synthetic from across a room. Trilobal fibres are prisms. Three flat faces intercept light at three different angles simultaneously. The result is a softer, more complex shimmer — closer to the way silk catches light because silk itself is roughly triangular in cross-section.",
            },
            {
                type: "blockquote",
                text: "We spent fourteen months perfecting the trilobal die geometry before we were satisfied. The difference between a 56° and a 60° included angle in the filament cross-section is invisible to any instrument we own — but your eye knows immediately.",
                attribution: "Kishore Mehta, on developing the Kayem Silk-Touch filament",
            },
            {
                type: "h2",
                text: "Twist and the architecture of touch",
            },
            {
                type: "p",
                text: "Twist per metre — TPI in the old imperial measure — determines how a yarn feels under the hand and how it behaves under tension. Low twist produces a soft, almost crumbling hand: the fibres lie parallel, compress easily, feel like down. High twist produces a hard, wiry yarn that springs back, holds its structure, sounds faintly crisp when rubbed. Weave engineers at the fabric mills we supply speak of twist the way musicians speak of key — the same melody played in a different key becomes a different emotional experience.",
            },
            {
                type: "p",
                text: "For our fancy yarns — the slub constructions, the air-textured multifilaments — twist is less a parameter and more a composition. A slub yarn contains zones of near-zero twist where the roving was allowed to billow before being captured, alternating with tight-twisted bridges that hold the structure. Under the right light, a fabric woven from slub yarn shows its rhythm. You can read the yarn's biography in the cloth.",
            },
        ],
        related: ["four-decades-of-spindle-memory", "why-drape-begins-at-70-denier"],
    },
    {
        slug: "four-decades-of-spindle-memory",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
        category: "Inside the Mill",
        title: "Four Decades of Spindle Memory",
        excerpt:
            "Inside our Surat facility, where 1985 machinery hums alongside the newest air-texturising lines.",
        date: "May 10, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        body: [
            {
                type: "lead",
                text: "The oldest draw-texturising machine on our floor was commissioned in 1985. It is also, by some measures, the most reliable piece of equipment we own.",
            },
            {
                type: "p",
                text: "Walk into the main hall at the Surat facility and you move through three eras simultaneously. On the west wall: rows of original Barmag machines, their housings painted the particular shade of industrial cream that was fashionable in the mid-eighties. In the centre: a generation of machines from the late nineties, upgraded with digital tension sensors but still bearing their original mechanical hearts. Along the east wall: the new air-texturising lines, silent and precise, watched over by a single operator where once six would have stood.",
            },
            {
                type: "h2",
                text: "What the old machines know",
            },
            {
                type: "p",
                text: "There is a certain category of knowledge that lives in mechanical systems and nowhere else. The 1985 Barmag machines have been maintained, adjusted, and coaxed back from the edge of failure so many times that the engineers who work them have developed an almost tactile understanding of what they can and cannot do. They know, by sound, when the false-twist spindle is approaching the temperature at which yarn break frequency rises. They know, by vibration felt through a hand resting on the housing, when the feed rollers need attention.",
            },
            {
                type: "blockquote",
                text: "You cannot write down what forty years of listening teaches you. It lives in the hands. When a new engineer joins the line, I put their palm flat on the machine and say — feel that. That is what healthy sounds like.",
                attribution: "Suresh Patel, Senior Machine Operator, Kayem Surat",
            },
        ],
        related: ["anatomy-of-a-thread", "the-yarn-inspectors-quiet-hour"],
    },
    {
        slug: "why-drape-begins-at-70-denier",
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
        category: "Craft",
        title: "Why Drape Begins at 70 Denier",
        excerpt:
            "A close read on the relationship between fibre weight, fall, and the architecture of a saree's pleat.",
        date: "April 28, 2026",
        read: "5 min",
        author: "Studio Notes",
        body: [
            {
                type: "lead",
                text: "The pleat of a saree is not just folding fabric. It is a structural decision encoded at the spinning stage, months before the cloth is woven.",
            },
            {
                type: "p",
                text: "Ask a drape specialist what separates a saree that falls well from one that merely hangs, and the answer will rarely begin with weave structure or fibre content. It will begin with weight. Specifically: the weight of the constituent filaments, and whether that weight is distributed as stiffness or as fall.",
            },
        ],
        related: ["anatomy-of-a-thread", "dyeing-in-the-dark"],
    },
    {
        slug: "dyeing-in-the-dark",
        img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80",
        category: "Colour",
        title: "Dyeing in the Dark: The Search for Burgundy",
        excerpt:
            "Three years, eleven baths, one impossible red — the story behind our dope-dyed signature.",
        date: "April 12, 2026",
        read: "7 min",
        author: "Rishabh Mehta",
        body: [
            {
                type: "lead",
                text: "Burgundy is not a colour. It is a negotiation between red and darkness, and the terms shift with every batch of polymer, every change in humidity, every degree of temperature variation in the bath.",
            },
            {
                type: "p",
                text: "We began trying to match a swatch in 2021. The client — a heritage saree house in Banaras — had been buying the same burgundy for thirty years from a mill that had closed. They brought us three metres of the original. Under fluorescent light it read almost purple. In daylight it was a deep wine. In candlelight it came alive as something close to oxblood. We needed all three simultaneously.",
            },
        ],
        related: ["why-drape-begins-at-70-denier", "toward-a-greener-fancy-yarn"],
    },
    {
        slug: "the-yarn-inspectors-quiet-hour",
        img: "https://images.unsplash.com/photo-1586495777744-4e6232bf4803?w=900&q=80",
        category: "Hands",
        title: "The Yarn Inspector's Quiet Hour",
        excerpt:
            "What machines still cannot feel — a portrait of the people who finger-read every cone before it ships.",
        date: "March 30, 2026",
        read: "4 min",
        author: "Studio Notes",
        body: [
            {
                type: "lead",
                text: "Before any cone leaves the facility, a person holds it. Not to scan it, not to weigh it — to feel it.",
            },
            {
                type: "p",
                text: "The inspection station is a long table under a bank of full-spectrum fluorescent lights, positioned at the end of the packaging line. The inspectors — six of them on the day shift — stand rather than sit. They say you feel more standing up. The fingertips are more alert.",
            },
        ],
        related: ["four-decades-of-spindle-memory", "anatomy-of-a-thread"],
    },
    {
        slug: "toward-a-greener-fancy-yarn",
        img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80",
        category: "Futures",
        title: "Toward a Greener Fancy Yarn",
        excerpt:
            "Closed-loop water, recycled polymer, and a frank look at where speciality textiles need to go next.",
        date: "March 14, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        body: [
            {
                type: "lead",
                text: "The speciality yarn industry has a problem it has been comfortable not naming. We are going to name it.",
            },
            {
                type: "p",
                text: "A tonne of dyed polyester yarn requires, on average, between 80 and 150 litres of water per kilogram in conventional dyeing processes. For a mill our size, running at full capacity, that number becomes consequential very quickly. The Tapi river, which runs through the district that made Surat the textile city it is, is not an infinite resource.",
            },
        ],
        related: ["dyeing-in-the-dark", "anatomy-of-a-thread"],
    },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function getPost(slug: string) {
    return allPosts.find((p) => p.slug === slug) ?? null;
}

function getRelatedPosts(slugs: string[]) {
    return slugs.map((s) => allPosts.find((p) => p.slug === s)).filter(Boolean) as typeof allPosts;
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
    if (!post) notFound();

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

    const related = getRelatedPosts(post.related);

    return (
        <>
            <Navbar forceDarkLogo={true} />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* ── HERO ── */}
                <section ref={heroRef} className="relative h-[75vh] min-h-[520px] overflow-hidden">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image src={post.img} alt={post.title} fill className="object-cover" priority />
                    </motion.div>

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/60 via-luxury-charcoal/30 to-luxury-cream" />
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal/30 via-transparent to-transparent" />

                    <motion.div
                        style={{ y: textY }}
                        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-20 md:px-16"
                    >
                        {/* Breadcrumb */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70"
                        >
                            <Link href="/blog" className="hover:text-white transition-colors">
                                The Kayem Journal
                            </Link>
                            <span className="h-px w-6 bg-white/40" />
                            <span className="text-[#D4AF37]">{post.category}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                            className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-white md:text-6xl"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="mt-8 flex flex-wrap items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60"
                        >
                            <span className="text-white/90">{post.author}</span>
                            <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                            <span>{post.date}</span>
                            <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                            <span>{post.read}</span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── BODY ── */}
                <article className="relative mx-auto max-w-3xl px-6 py-20 md:px-8">
                    {/* Decorative left rule */}
                    <div className="absolute left-0 top-20 h-40 w-px bg-gradient-to-b from-transparent via-[#7A5C1E]/30 to-transparent hidden lg:block" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="space-y-8"
                    >
                        {post.body.map((block, i) => {
                            if (block.type === "lead") {
                                return (
                                    <p key={i} className="font-serif text-xl leading-relaxed text-luxury-charcoal md:text-2xl">
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block.type === "h2") {
                                return (
                                    <h2 key={i} className="pt-6 font-display text-3xl font-light text-luxury-charcoal md:text-4xl">
                                        {block.text}
                                    </h2>
                                );
                            }
                            if (block.type === "p") {
                                return (
                                    <p key={i} className="font-serif leading-[1.85] text-luxury-charcoal/75 text-[1.0625rem]">
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block.type === "blockquote") {
                                return (
                                    <figure key={i} className="my-12 pl-8 border-l-2 border-[#7A5C1E]/40">
                                        <blockquote className="font-serif text-xl italic leading-relaxed text-luxury-charcoal/80 md:text-2xl">
                                            "{block.text}"
                                        </blockquote>
                                        {block.attribution && (
                                            <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]/70">
                                                — {block.attribution}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            if (block.type === "image") {
                                return (
                                    <figure key={i} className="my-14 -mx-6 md:-mx-16">
                                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                                            <Image src={block.src!} alt={block.caption ?? ""} fill className="object-cover" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="mt-4 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-luxury-charcoal/40 md:px-16">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </motion.div>

                    {/* Author card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-20 flex items-start gap-5 rounded-2xl border border-[#7A5C1E]/15 bg-white/40 p-6 backdrop-blur-sm"
                    >
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#7A5C1E]/10 flex items-center justify-center text-[#7A5C1E] font-display text-lg font-light">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">Written by</p>
                            <p className="mt-1 font-display text-xl font-light text-luxury-charcoal">{post.author}</p>
                            <p className="mt-1 font-serif text-sm text-luxury-charcoal/60">
                                Studio voice from the Kayem mill floor, Surat.
                            </p>
                        </div>
                    </motion.div>
                </article>

                {/* ── RELATED POSTS ── */}
                {related.length > 0 && (
                    <section className="mx-auto max-w-7xl px-6 pb-32 md:px-16">
                        <div className="mb-12 flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#7A5C1E]/15" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#7A5C1E]">
                                Continue reading
                            </p>
                            <span className="h-px flex-1 bg-[#7A5C1E]/15" />
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {related.map((rp, i) => (
                                <Link href={`/blog/${rp.slug}`} key={rp.slug}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="group relative overflow-hidden rounded-2xl bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <Image
                                                src={rp.img}
                                                alt={rp.title}
                                                fill
                                                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-cream via-luxury-cream/20 to-transparent" />
                                            <div className="absolute left-4 top-4 rounded-full bg-[#7A5C1E]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                                                {rp.category}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-display text-2xl font-light leading-tight text-luxury-charcoal transition-colors group-hover:text-[#7A5C1E]">
                                                {rp.title}
                                            </h3>
                                            <p className="mt-3 font-serif text-sm leading-relaxed text-luxury-charcoal/60 line-clamp-2">
                                                {rp.excerpt}
                                            </p>
                                            <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7A5C1E]">
                                                Read essay
                                                <span className="inline-block h-px w-6 bg-[#7A5C1E] transition-all duration-500 group-hover:w-10" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <Footer />
            </main>
        </>
    );
}