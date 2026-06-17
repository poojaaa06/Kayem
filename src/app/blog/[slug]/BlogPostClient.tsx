"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type BodyBlock = {
    _type: string
    text?: string
    attribution?: string
    src?: string
    caption?: string
}

type RelatedPost = {
    slug: string
    img: string
    category: string
    title: string
    excerpt: string
    date: string
    read: string
    author: string
}

type Post = {
    slug: string
    img: string
    category: string
    title: string
    excerpt: string
    date: string
    read: string
    author: string
    body: BodyBlock[]
    related: RelatedPost[]
}

export default function BlogPostClient({ post }: { post: Post }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

    return (
        <>
            <Navbar forceDarkLogo={true} />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* HERO */}
                <section ref={heroRef} className="relative h-[75vh] min-h-[520px] overflow-hidden">
                    <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                        <Image src={post.img} alt={post.title} fill className="object-cover" priority />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/60 via-luxury-charcoal/30 to-luxury-cream" />
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal/30 via-transparent to-transparent" />

                    <motion.div style={{ y: textY }}
                        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-20 md:px-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70"
                        >
                            <Link href="/blog" className="hover:text-white transition-colors">The Kayem Journal</Link>
                            <span className="h-px w-6 bg-white/40" />
                            <span className="text-[#D4AF37]">{post.category}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                            className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-white md:text-6xl"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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

                {/* BODY */}
                <article className="relative mx-auto max-w-3xl px-6 py-20 md:px-8">
                    <div className="absolute left-0 top-20 h-40 w-px bg-gradient-to-b from-transparent via-[#7A5C1E]/30 to-transparent hidden lg:block" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="space-y-8"
                    >
                        {post.body?.map((block, i) => {
                            if (block._type === "lead") {
                                return (
                                    <p key={i} className="font-serif text-xl leading-relaxed text-luxury-charcoal md:text-2xl">
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block._type === "h2") {
                                return (
                                    <h2 key={i} className="pt-6 font-display text-3xl font-light text-luxury-charcoal md:text-4xl">
                                        {block.text}
                                    </h2>
                                );
                            }
                            if (block._type === "p") {
                                return (
                                    <p key={i} className="font-serif leading-[1.85] text-luxury-charcoal/75 text-[1.0625rem]">
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block._type === "blockquote") {
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
                            if (block._type === "bodyImage" && block.src) {
                                return (
                                    <figure key={i} className="my-14 -mx-6 md:-mx-16">
                                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                                            <Image src={block.src} alt={block.caption ?? ""} fill className="object-cover" />
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
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="mt-20 flex items-start gap-5 rounded-2xl border border-[#7A5C1E]/15 bg-white/40 p-6 backdrop-blur-sm"
                    >
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#7A5C1E]/10 flex items-center justify-center text-[#7A5C1E] font-display text-lg font-light">
                            {post.author?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7A5C1E]">Written by</p>
                            <p className="mt-1 font-display text-xl font-light text-luxury-charcoal">{post.author}</p>

                        </div>
                    </motion.div>
                </article>

                {/* RELATED POSTS */}
                {post.related?.length > 0 && (
                    <section className="mx-auto max-w-7xl px-6 pb-32 md:px-16">
                        <div className="mb-12 flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#7A5C1E]/15" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#7A5C1E]">Continue reading</p>
                            <span className="h-px flex-1 bg-[#7A5C1E]/15" />
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {post.related.map((rp, i) => (
                                <Link href={`/blog/${rp.slug}`} key={rp.slug}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="group relative overflow-hidden rounded-2xl bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <Image src={rp.img} alt={rp.title} fill
                                                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
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