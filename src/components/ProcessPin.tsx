"use client";

import { useRef } from "react";
import Image from "next/image";

const steps = [
    {
        n: "01",
        t: "POY",
        subtitle: "Partially Oriented Yarn",
        img: "/images/poy.png",
        d: "The journey starts with premium nylon chips, carefully processed into POY. This is the foundation of every yarn we create.",
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
        <section id="process" className="relative bg-luxury-cream py-12 md:py-28 overflow-hidden">
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
            <div className="relative z-10 mx-auto mb-8 md:mb-16 px-5 md:px-10">
                <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#7A5C1E] mb-2 md:mb-3">
                    From Yarn to Fabric
                </p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-6xl font-light leading-[1.2] md:leading-[1.05] text-luxury-charcoal max-w-2xl">
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
                className="relative z-10 flex gap-4 md:gap-6 overflow-x-auto pb-6 md:pb-8 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
            >
                {/* Leading spacer */}
                <div className="shrink-0 w-4 md:w-12 lg:w-16" aria-hidden />

                {steps.map((step, i) => (
                    <StepCard key={step.n} step={step} />
                ))}

                {/* Trailing spacer */}
                <div className="shrink-0 w-4 md:w-12 lg:w-16" aria-hidden />
            </div>

            {/* Mobile hint */}
            <p className="relative z-10 md:hidden text-center text-[10px] uppercase tracking-[0.25em] text-luxury-charcoal/40 mt-4">
                Swipe to explore →
            </p>
        </section>
    );
}

function StepCard({ step }: { step: typeof steps[0] }) {
    return (
        <div className="relative shrink-0 snap-start flex flex-col rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white/40 backdrop-blur-sm group"
            style={{
                width: "clamp(280px, 85vw, 560px)",
                height: "clamp(460px, 65vh, 640px)",
            }}
        >
            {/* Image — responsive height */}
            <div className="relative overflow-hidden" style={{ height: "clamp(240px, 55%, 380px)" }}>
                <Image
                    src={step.img}
                    alt={step.t}
                    fill
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

                {/* Stage badge */}
                <div className="absolute top-4 md:top-5 left-4 md:left-5">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.35em] font-bold text-white bg-[#7A5C1E]/80 backdrop-blur-sm px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
                        Stage {step.n}
                    </span>
                </div>

                {/* Shimmer on hover - hidden on mobile for performance */}
                <div className="hidden md:block absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent transition-transform duration-[1.2s] group-hover:translate-x-full" />
            </div>

            {/* Content — responsive padding and spacing */}
            <div className="flex flex-col justify-between flex-1 p-5 md:p-8">
                <div>
                    <p className="font-serif text-[10px] md:text-[11px] italic text-[#7A5C1E] mb-1.5 md:mb-2 tracking-wide">
                        {step.subtitle}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] md:leading-none text-luxury-charcoal mb-2 md:mb-3">
                        {step.t}
                    </h3>
                    <p className="font-serif text-xs md:text-sm lg:text-base leading-relaxed text-luxury-charcoal/65 line-clamp-4 md:line-clamp-3">
                        {step.d}
                    </p>
                </div>
            </div>
        </div>
    );
}