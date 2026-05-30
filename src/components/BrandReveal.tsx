"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monitor Scroll Progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to scale, letter spacing, and opacity
  // When starting to scroll into view: large scale, wide tracking
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1.8, 1, 0.9]);
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    ["1.2em", "0.3em", "0.15em"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  // Subtle subtitle animations
  const textY = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [40, 0, -20]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.8], [0, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150vh] bg-luxury-charcoal flex items-center justify-center overflow-hidden z-30"
    >
      {/* Volumetric Gold lighting backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.08)_0%,rgba(18,16,14,1)_80%)] pointer-events-none" />

      {/* Sticky Reveal Wrapper */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">

        {/* Floating background noise filter */}
        <div className="absolute inset-0 bg-transparent pointer-events-none select-none z-10" />

        {/* Animated Brand Typography */}
        <motion.div
          style={{ scale, opacity, letterSpacing }}
          className="font-serif text-6xl sm:text-8xl md:text-[140px] text-luxury-gold font-light tracking-widest text-center select-none z-20 pl-[1.2em]" // offset left padding for letter-spacing centering
        >
          KAYEM
        </motion.div>

        {/* Animated Narrative Subtext */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute bottom-[20%] text-center px-6 z-20 max-w-md"
        >
          <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block mb-3">
            ESTABLISHED 1985
          </span>
          <p className="font-serif text-lg italic text-luxury-ivory font-light">
            &ldquo;We do not weave fabric. We spin structural light and tactile time.&rdquo;
          </p>
        </motion.div>

      </div>
    </div>
  );
}
