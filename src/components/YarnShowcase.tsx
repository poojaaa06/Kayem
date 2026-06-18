"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import Image from "next/image";

interface YarnItem {
    _id: string;
    order: number;
    name: string;
    desc: string;
    img: string;
}

function YarnCard({ y, idx }: { y: YarnItem; idx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const sx = useSpring(rx, { stiffness: 150, damping: 18 });
    const sy = useSpring(ry, { stiffness: 150, damping: 18 });
    const tiltX = useTransform(sy, [-50, 50], [10, -10]);
    const tiltY = useTransform(sx, [-50, 50], [-10, 10]);
    const lightX = useTransform(sx, [-50, 50], [20, 80]);
    const lightY = useTransform(sy, [-50, 50], [20, 80]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set(e.clientX - r.left - r.width / 2);
        ry.set(e.clientY - r.top - r.height / 2);
    };
    const onLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ perspective: 1200 }}
            className="w-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl bg-luxury-ivory"
            >
                <Image
                    src={y.img}
                    alt={`${y.name} yarn — ${y.desc}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* dynamic light reflection */}
                <motion.div
                    aria-hidden
                    style={{
                        background: useTransform(
                            [lightX, lightY] as never,
                            ([x, y]: number[]) =>
                                `radial-gradient(circle at ${x}% ${y}%, rgba(212, 175, 55, 0.3), transparent 50%)`,
                        ),
                    }}
                    className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-luxury-ivory via-luxury-ivory/80 to-transparent">
                    <h3 className="font-display text-2xl text-luxury-charcoal">{y.name}</h3>
                    <p className="mt-2 text-sm text-luxury-charcoal/60 leading-relaxed">{y.desc}</p>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-luxury-gold/0 group-hover:ring-luxury-gold/30 transition-all duration-500" />
            </motion.div>
        </motion.div>
    );
}

export function HeroYarnShowcase({ yarns }: { yarns: YarnItem[] }) {
    const displayYarns = yarns || [];

    return (
        <section id="collection" className="relative py-32 px-6 md:px-12 overflow-hidden">
            {/* Rich gradient background */}
            <div className="absolute inset-0 bg-luxury-cream" />

            <div className="relative max-w-7xl mx-auto">
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
                            The Collection
                        </p>
                        <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.95] text-luxury-charcoal">
                            Our Yarn Range.<br />
                            <span className="italic text-[#7A5C1E] " style={{ fontVariantNumeric: "lining-nums" }}>40D — 1100D</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-luxury-charcoal/70 leading-relaxed font-serif text-md">
                        Our product range includes premium NYLON, VISCOSE, and POLYESTER yarns,
                        crafted for excellence in every thread.
                    </p>
                </motion.div>

                {displayYarns.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-luxury-charcoal/50 font-serif text-lg">
                            No yarns available yet. Add some in Sanity Studio.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {displayYarns.map((y, i) => (
                            <YarnCard key={y._id} y={y} idx={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}