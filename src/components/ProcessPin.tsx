"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const steps = [
    {
        n: "01",
        t: "POY",
        subtitle: "Partially Oriented Yarn",
        img: "/images/poy.png",
        d: "The journey starts with premium nylon chips, carefully processed into POY. This is the foundation of every yarn we create — engineered for strength, consistency, and superior quality.",
    },
    {
        n: "02",
        t: "ATY",
        subtitle: "Air Texturising Yarn",
        img: "/images/aty.png",
        d: "Using high-pressure air texturising techniques, the yarn gains softness, texture, volume, and a natural fabric-like feel. This is where the yarn comes alive.",
    },
    {
        n: "03",
        t: "Weaving",
        subtitle: "Where Threads Become Fabric",
        img: "/images/weaving.png",
        d: "Thousands of threads interlace with precision and artistry. Every weave carries durability, elegance, and the identity of quality craftsmanship.",
    },
    {
        n: "04",
        t: "Finishing",
        subtitle: "Colour. Finish. Perfection.",
        img: "/images/finishing.png",
        d: "The fabric is dyed, treated, and perfected in a spectrum of vibrant colours. The result is a fabric ready to inspire fashion, movement, and everyday life.",
    },
];

export function ProcessPin() {
    const stripRef = useRef<HTMLDivElement>(null);

    return (
        <section id="process" className="relative bg-luxury-cream py-20 md:py-28 overflow-hidden">
            {/* Section BG */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1586495777744-4e6232bf23e3?w=1600&q=70"
                    alt="" aria-hidden fill
                    className="object-cover opacity-10"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/80 via-transparent to-luxury-cream/60" />
            </div>

            {/* Header */}
            <div className="relative z-10 mx-auto mb-12 md:mb-16 px-10">
                <p className="text-[12px] uppercase tracking-[0.4em] text-[#7A5C1E] mb-3">
                    From Yarn to Fabric
                </p>
                <div className="flex items-end justify-between gap-8">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-luxury-charcoal max-w-2xl">
                        The journey of{" "}
                        <span className="text-[#7A5C1E] italic">craftsmanship.</span>
                    </h2>
                    <p className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-luxury-charcoal/40 pb-1 shrink-0">
                        Scroll to explore
                        <span className="inline-block h-px w-10 bg-luxury-charcoal/20" />
                    </p>
                </div>
            </div>

            {/* Horizontal scroll strip */}
            <div
                ref={stripRef}
                className="relative z-10 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
            >
                {/* Leading spacer */}
                <div className="shrink-0 w-6 md:w-12 lg:w-16" aria-hidden />

                {steps.map((step, i) => (
                    <StepCard key={step.n} step={step} index={i} />
                ))}

                {/* Trailing spacer */}
                <div className="shrink-0 w-6 md:w-12 lg:w-16" aria-hidden />
            </div>

            {/* Mobile hint */}
            <p className="relative z-10 md:hidden text-center text-xs uppercase tracking-[0.25em] text-luxury-charcoal/30 mt-6">
                Swipe to explore
            </p>
        </section>
    );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative shrink-0 snap-start flex flex-col rounded-3xl overflow-hidden shadow-xl bg-white/40 backdrop-blur-sm group"
            style={{
                width: "clamp(360px, 80vw, 560px)",
                height: "clamp(520px, 70vh, 640px)",
            }}
        >
            {/* Image — fixed 60% height for equal image sizes */}
            <div className="relative overflow-hidden" style={{ height: "60%" }}>
                <Image
                    src={step.img}
                    alt={step.t}
                    fill
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    sizes="560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Stage badge */}
                <div className="absolute top-5 left-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] font-bold text-white bg-[#7A5C1E]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        Stage {step.n}
                    </span>
                </div>

                {/* Shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent transition-transform duration-[1.2s] group-hover:translate-x-full" />
            </div>

            {/* Content — fixed 40% height */}
            <div className="flex flex-col justify-between flex-1 p-7 md:p-8" style={{ height: "40%" }}>
                <div>
                    <p className="font-serif text-[11px] italic text-[#7A5C1E] mb-2 tracking-wide">
                        {step.subtitle}
                    </p>
                    <h3 className="font-display text-4xl md:text-5xl font-light leading-none text-luxury-charcoal mb-3">
                        {step.t}
                    </h3>
                    <p className="font-serif text-sm md:text-base leading-relaxed text-luxury-charcoal/65 line-clamp-3">
                        {step.d}
                    </p>
                </div>

                {/* Bottom rule with step number */}
                <div className="flex items-center justify-between pt-4 border-t border-[#7A5C1E]/15 mt-3">
                    <span className="font-mono text-[32px] font-light text-[#7A5C1E]/20 leading-none">
                        {step.n}
                    </span>
                    <span className="inline-block h-px w-8 bg-[#7A5C1E]/30" />
                </div>
            </div>
        </motion.div>
    );
}