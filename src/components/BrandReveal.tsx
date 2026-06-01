"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1.4, 1, 0.95]);
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    ["0.8em", "0.2em", "0.05em"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [30, 0, -15]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.8], [0, 1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0.3, 0.8, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] md:h-[75vh] bg-luxury-charcoal flex items-center justify-center overflow-hidden z-30"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(18,16,14,0)_70%)] pointer-events-none"
      />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent via-luxury-gold/30 to-transparent" />

      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-4 sm:px-6">

        {/* Main Brand Text with Peginot Font */}
        <motion.div
          style={{
            scale,
            opacity,
            letterSpacing,
            fontFamily: "KayemFont, 'Fraunces', 'Cormorant Garamond', serif"
          }}
          className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[140px] text-luxury-gold font-light tracking-widest text-center select-none z-20"
        >
          KAYEM

          {/* Shadow/Glow Layer */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.5]),
              fontFamily: "KayemFont, 'Fraunces', 'Cormorant Garamond', serif"
            }}
            className="absolute inset-0 text-luxury-gold/30 blur-lg -z-10"
            aria-hidden="true"
          >
            KAYEM
          </motion.div>
        </motion.div>

        {/* Decorative gold underline */}
        <motion.div
          style={{
            width: useTransform(scrollYProgress, [0.4, 0.6, 0.8], ["0%", "15%", "0%"]),
            opacity: useTransform(scrollYProgress, [0.4, 0.55, 0.8], [0, 1, 0])
          }}
          className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent mt-6 mb-4"
        />

        {/* Narrative Subtext */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute bottom-[15%] md:bottom-[20%] text-center z-20 max-w-[90%] md:max-w-md px-4"
        >
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-luxury text-luxury-gold/80 uppercase block mb-3 md:mb-4">
            ESTABLISHED 1985
          </span>
          <p className="font-serif text-sm md:text-base lg:text-lg italic text-luxury-ivory/90 font-light leading-relaxed">
            &ldquo;We do not weave fabric. We spin structural light and tactile time.&rdquo;
          </p>

          {/* Small gold dot decoration */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.5, 0.65, 0.8], [0, 1, 0]) }}
            className="flex justify-center mt-4 md:mt-6"
          >
            <div className="w-1 h-1 rounded-full bg-luxury-gold/60" />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.6], [1, 0.5, 0]) }}
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-luxury-gold/40 uppercase">
            SCROLL
          </span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-luxury-gold/40 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}