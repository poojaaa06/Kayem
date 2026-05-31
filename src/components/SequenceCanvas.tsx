"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const headline = ["Essence", "of", "Beautiful", "Fabric"];

export default function SequenceCanvas() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires a user gesture OR this programmatic trigger
    // Setting these attributes at runtime bypasses some autoplay blocks
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => { });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <div id="process" className="relative w-full h-screen">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">

        {/* Poster shown instantly while video loads — prevents black flash */}
        <img
          src="/images/3dtransform_001.png"
          alt=""
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"       // Loads just enough to show first frame fast
          poster="/images/3dtransform-poster.jpg"
          onCanPlay={() => {
            videoRef.current?.play().catch(() => { });
          }}
          onPlaying={() => setVideoLoaded(true)}  // Fade out poster only when actually playing
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        >
          {/* WebM loads ~60% faster than MP4 on supported browsers */}
          <source src="/images/3dtransform.webm" type="video/webm" />
          <source src="/images/3dtransform.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        <div className="pt-4 sm:pt-12 md:pt-16 lg:pt-20" />

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mb-4 sm:mb-5 flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-luxury font-bold"
            >
              <span className="h-px w-6 sm:w-10 bg-luxury-gold/60" />
              <span className="text-[#7A5C1E] dark:text-luxury-gold">Since 1985</span>
              <span className="h-px w-6 sm:w-10 bg-luxury-gold/60" />
            </motion.div>

            <h1 className="font-display text-[12vw] sm:text-[13vw] md:text-[8vw] leading-[0.9] font-light tracking-tight text-luxury-ivory">
              {headline.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.6 + wi * 0.15,
                      duration: 1.1,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className={`inline-block ${wi === 2 ? "italic" : ""}`}
                    style={wi === 2 ? { color: "#7A5C1E" } : undefined}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="font-serif mt-4 sm:mt-5 max-w-md mx-auto text-[12px] sm:text-sm text-luxury-ivory leading-relaxed"
            >
              Specializing in Fancy Yarns across various fibers, lustres, and combinations,
              we create yarns that enhance the beauty, texture, feel, and elegance of fabrics
            </motion.p>
          </div>
        </div>

        <div className="pb-6 sm:pb-8" />
      </div>
    </div>
  );
}