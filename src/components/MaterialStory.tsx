"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12 bg-luxury-ivory"
    >
      <div className="max-w-6xl mx-auto">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-16 h-px bg-luxury-gold/60 mb-12"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold">
            About KAYEM
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-luxury-charcoal mt-4 leading-[1.1]">
            The Essence of
            <br />
            <span className="italic text-luxury-gold">Beautiful Fabric</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="font-serif text-lg md:text-xl text-luxury-charcoal/80 leading-relaxed">
              Founded in <span className="text-luxury-gold font-medium">1985</span>,{" "}
              <strong className="text-luxury-charcoal font-medium">
                KAYEM SYNTHETICS PVT. LTD.
              </strong>{" "}
              has built a strong reputation for delivering exceptional quality, innovation,
              and trusted business values in the textile industry.
            </p>

            <p className="text-sm md:text-base text-luxury-charcoal/60 leading-relaxed">
              Over the years, KAYEM has emerged as one of India's leading manufacturers and
              processors of Speciality &amp; Fancy Yarns in Nylon and Viscose. Our products
              cater to a wide range of applications including sarees, dress materials,
              curtains, carpets, and upholstery fabrics.
            </p>

            <p className="text-sm md:text-base text-luxury-charcoal/60 leading-relaxed">
              With a strong presence across major yarn-consuming centers in India, KAYEM
              continues to strengthen its position through continuous innovation, advanced
              processing techniques, and a dedicated workforce.
            </p>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-l-2 border-luxury-gold/50 pl-6 py-2 mt-8"
            >
              <p className="font-serif text-lg md:text-xl italic text-luxury-charcoal/70 leading-relaxed">
                Specializing in Fancy Yarns across various fibers, lustres, and combinations,
                we create yarns that enhance the beauty, texture, feel, and elegance of fabrics.
              </p>
              <footer className="mt-3 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold">
                — The Essence of Beautiful Fabric
              </footer>
            </motion.div>
          </motion.div>

          {/* Right - Image collage */}
          <motion.div
            style={{ y, opacity }}
            className="relative h-[500px] lg:h-[550px]"
          >
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80"
                alt="Colorful yarn spools"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-ivory/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-luxury-ivory shadow-xl rounded-xl px-5 py-3 border border-luxury-gold/20"
            >
              <p className="font-display text-2xl text-luxury-gold font-light">40+</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-charcoal/50">
                Years of Excellence
              </p>
            </motion.div>

            {/* Small tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-luxury-gold/90 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-ivory font-semibold">
                Pan India Presence
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxury-gold/10 rounded-2xl overflow-hidden mt-20 border border-luxury-gold/10"
        >
          {[
            { value: "1985", label: "Established" },
            { value: "40+", label: "Years of Excellence" },
            { value: "500+", label: "Products" },
            { value: "Pan India", label: "Presence" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-luxury-ivory/80 backdrop-blur-sm px-6 py-8 text-center"
            >
              <p className="font-display text-3xl md:text-4xl text-luxury-gold font-light">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal/50">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex items-center gap-6"
        >
          <span className="h-px flex-1 max-w-[100px] bg-luxury-gold/30" />
          <p className="font-serif text-xs italic text-luxury-charcoal/40 tracking-wide">
            Gujarat, India — Crafting Excellence Since 1985
          </p>
        </motion.div>
      </div>
    </section>
  );
}