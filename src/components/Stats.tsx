"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
    { v: 40, suffix: "+", label: "Years of expertise" },
    { v: 150, suffix: "+", label: "Products Variants" },

    { v: 400, suffix: "+", label: "Trusted Customers" },
];

function Counter({ to, suffix, onComplete }: { to: number; suffix: string; onComplete?: () => void }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const inView = useInView(ref, { once: false, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.floor(v).toString());

    useEffect(() => {
        if (inView) {
            setHasAnimated(true);
            count.set(0);
            const controls = animate(count, to, {
                duration: 2.2,
                ease: [0.2, 0.8, 0.2, 1],
                onComplete: () => {
                    onComplete?.();
                }
            });
            return controls.stop;
        }
    }, [inView, to, count, onComplete]);

    return (
        <span ref={ref} className="inline-flex items-baseline">
            <motion.span className="tabular-nums">{rounded}</motion.span>
            <span className="text-[#7A5C1E] ml-1 text-3xl md:text-4xl">{suffix}</span>
        </span>
    );
}

export function Stats() {
    return (
        <section className="relative py-28 px-6 md:px-12 overflow-hidden">
            {/* Rich gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/8 via-luxury-cream to-[#7A5C1E]/5" />
                <div className="absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#7A5C1E]/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
            </div>

            {/* Subtle top and bottom borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7A5C1E]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7A5C1E]/30 to-transparent" />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="font-display text-6xl md:text-7xl font-light text-luxury-charcoal relative">
                                <Counter to={s.v} suffix={s.suffix} />
                                {/* Decorative line that appears on hover */}
                                <div className="absolute -bottom-3 left-1/2 w-0 h-px bg-[#7A5C1E]/40 transition-all duration-500 group-hover:w-12 group-hover:left-1/2 group-hover:-translate-x-1/2" />
                            </div>
                            <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-luxury-charcoal/60 font-semibold group-hover:text-[#7A5C1E] transition-colors duration-300">
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}