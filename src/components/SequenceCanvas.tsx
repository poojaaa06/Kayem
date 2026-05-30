"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const headline = ["Essence", "of", "Beautiful", "Fabric"];

export default function SequenceCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalFrames = 96;

  const getImagePath = (index: number): string => {
    const frameNumber = String(index).padStart(3, "0");
    return `/3dtransform_frames/3dtransform_frames/3dtransform_${frameNumber}.png`;
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames
  useEffect(() => {
    let active = true;

    const preloadImages = async () => {
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = getImagePath(i);
        promises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img);
          })
        );
      }

      const results = await Promise.all(promises);
      if (!active) return;

      imagesRef.current = results as HTMLImageElement[];
      setIsLoaded(true);

      setTimeout(() => {
        drawFrame(0);
      }, 50);
    };

    preloadImages();

    return () => {
      active = false;
    };
  }, []);

  // Handle canvas sizing and resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (imagesRef.current.length > 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];

    if (!img || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    const grad1 = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad1.addColorStop(0, "rgba(18, 16, 14, 0.5)");
    grad1.addColorStop(0.4, "rgba(18, 16, 14, 0.1)");
    grad1.addColorStop(0.6, "rgba(18, 16, 14, 0.1)");
    grad1.addColorStop(1, "rgba(18, 16, 14, 0.6)");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  useEffect(() => {
    if (!isLoaded) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const target = Math.min(
        totalFrames - 1,
        Math.max(0, scrollYProgress.get() * (totalFrames - 1))
      );
      currentFrameRef.current = lerp(currentFrameRef.current, target, 0.12);
      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoaded]);

  return (
    <div id="process" ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

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
                <span
                  className="text-[#7A5C1E] dark:text-luxury-gold"

                >
                  Since 1985 — Gujarat, India
                </span>
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
                Specializing in Fancy Yarns across various fibers, lustres, and combinations, we create yarns that enhance the beauty, texture, feel, and elegance of fabrics
              </motion.p>
            </div>
          </div>

          <div className="pb-6 sm:pb-8" />
        </div>
      </div>
    </div>
  );
}