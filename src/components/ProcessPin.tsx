"use client";

import { useRef } from "react";
import Image from "next/image";

const steps = [
    {
        n: "01", t: "Source",
        img: "/images/source.png",
        d: "Long-staple Nylon and Viscose fibres, hand-graded for length, lustre and consistency before a single spindle turns.",
    },
    {
        n: "02", t: "Spin",
        img: "/images/spin.png",
        d: "Compact ring spinning at 18,000 rpm. Every bobbin counted. Every twist calibrated to the micron for uniform denier.",
    },
    {
        n: "03", t: "Dye",
        img: "/images/dye.png",
        d: "Reactive low-impact dyes in soft water, recirculated. Colours that hold against sun, salt and season after season.",
    },
    {
        n: "04", t: "Finish",
        img: "/images/finish.png",
        d: "Air-jet texturising paired with precision winding. The final touch that gives each spool its signature hand and drape.",
    },
    {
        n: "05", t: "Fabric",
        img: "/images/fabric.png",
        d: "The finished yarn, wound and ready — destined for sarees, dress materials, curtains, carpets and upholstery worldwide.",
    },
];

export function ProcessPin() {
    const stripRef = useRef<HTMLDivElement>(null);

    return (
        <section id="process" className="relative bg-luxury-cream py-20 overflow-hidden">

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

            {/* Header — both lines share the same px-6 md:px-16 gutter */}
            <div className="relative z-10 px-6 md:px-16 mb-10">
                <p className="text-[12px] uppercase tracking-[0.4em] text-[#7A5C1E] mb-3 flex items-center gap-2">
                    The Process
                </p>
                <div className="flex items-end justify-between">
                    <h2 className="font-display text-4xl md:text-6xl font-light leading-[0.92] text-luxury-charcoal">
                        From fibre to{" "}
                        <span className="text-[#7A5C1E] italic">fabric</span>.
                    </h2>
                    <p className="hidden md:block text-xs uppercase tracking-[0.25em] text-luxury-charcoal/40 pb-1">
                        Scroll to explore →
                    </p>
                </div>
            </div>

            {/* Scroll strip — first card has same left offset as the header text */}
            <div
                ref={stripRef}
                className="relative z-10 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
                style={{
                    scrollbarWidth: "none",
                    paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
                    paddingRight: "clamp(1.5rem, 4vw, 4rem)",
                }}
            >
                {steps.map((s, i) => (
                    <div
                        key={s.n}
                        className="relative shrink-0 w-[82vw] md:w-[50vw] rounded-3xl overflow-hidden shadow-xl snap-start"
                        style={{ height: "clamp(240px, 38vh, 380px)" }}
                    >
                        <Image
                            src={s.img}
                            alt={s.t}
                            fill
                            sizes="55vw"
                            className="object-cover"
                            priority={i === 0}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70 font-semibold">
                                    Stage {s.n}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display text-6xl md:text-7xl font-light text-white mb-3">
                                    {s.t}
                                </h3>
                                <p className="max-w-md font-serif text-sm leading-relaxed text-white/80 md:text-base">
                                    {s.d}
                                </p>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 hover:ring-white/20" />
                    </div>
                ))}

                {/* Trailing spacer so last card doesn't hug the right edge */}
                <div className="shrink-0 w-6 md:w-12" />
            </div>

        </section>
    );
}