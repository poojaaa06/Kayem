"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const headline = ["Essence", "of", "Beautiful", "Fabric"];

export default function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number>(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    videoRef.current = video;

    video.src = "/images/3dtransform-compressed.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.preload = "metadata";

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = () => {
      if (video.readyState >= 2) {
        const { videoWidth, videoHeight } = video;
        const canvasW = canvas.width;
        const canvasH = canvas.height;

        // Cover logic — same as object-cover
        const scale = Math.max(canvasW / videoWidth, canvasH / videoHeight);
        const drawW = videoWidth * scale;
        const drawH = videoHeight * scale;
        const offsetX = (canvasW - drawW) / 2;
        const offsetY = (canvasH - drawH) / 2;

        ctx.drawImage(video, offsetX, offsetY, drawW, drawH);
      }
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const handleCanPlay = () => {
      video.play().then(() => {
        setVideoLoaded(true);
        drawFrame();
      }).catch(() => { });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.load();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
      video.pause();
      video.src = "";
    };
  }, []);

  return (
    <div id="process" className="relative w-full h-screen">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">

        {/* Poster image — fades out once canvas is drawing */}
        <img
          src="/images/3dtransform-poster.jpg"
          alt=""
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        />

        {/* Canvas — iOS never shows play button over this */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

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