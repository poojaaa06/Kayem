"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Canvas floating particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      opacitySpeed: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial distribution
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = -(Math.random() * 0.5 + 0.2); // upward drift
        this.opacity = Math.random() * 0.5 + 0.1;
        this.opacitySpeed = Math.random() * 0.005 + 0.002;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Oscillate opacity to look like shimmering dust
        this.opacity -= this.opacitySpeed;
        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(223, 207, 183, ${this.opacity})`; // champagne gold particle
        c.fill();
      }
    }

    const particleCount = Math.min(60, Math.floor(width / 30));
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-luxury-charcoal">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none opacity-45 scale-[1.02]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Attempts local file first, then falls back to Vimeo stock luxury silk waving */}
          <source src="/hero.mp4" type="video/mp4" />
          <source
            src="https://player.vimeo.com/external/459389137.sd.mp4?s=89e38d0fc681e51103021504dca060a67ecee01b&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Ambient Volumetric Overlays */}
      {/* Warm Golden radial gradient for vignette & depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15)_0%,rgba(18,16,14,0.85)_100%)] z-10 pointer-events-none" />
      {/* Bottom dark blend to ease transition into next white/ivory section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-luxury-charcoal to-transparent z-10 pointer-events-none" />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Hero Typography & Content */}
      <div className="relative max-w-[1600px] w-full mx-auto px-6 md:px-12 z-30 flex flex-col justify-end h-full pb-24 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="text-[10px] md:text-xs tracking-luxury-widest text-luxury-gold font-light block mb-4 uppercase">
            H A U T E &nbsp; C O U T U R E &nbsp; T E X T I L E S
          </span>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] text-luxury-ivory font-extralight leading-[1.05] tracking-tight mb-8">
            The poetry of <br />
            <span className="italic text-luxury-gold font-light pl-6 md:pl-16">tension & weft</span>
          </h1>

          <p className="text-sm md:text-base font-light text-luxury-ivory/70 max-w-lg leading-relaxed mb-6 font-sans">
            Established in 1994, KAYEM produces the world&apos;s finest organic weaves, intertwining Mongolian cashmere and pure mulberry silk for premium fashion houses.
          </p>
        </motion.div>
      </div>

      {/* Utilities: Sound & Scroll */}
      <div className="absolute bottom-8 left-6 md:left-12 z-30 flex items-center space-x-6">
        <button
          onClick={toggleSound}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-luxury-gold/30 text-luxury-gold/80 hover:text-luxury-ivory hover:border-luxury-ivory transition-all duration-300 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-luxury-gold/60"
        >
          <span className="text-[9px] tracking-luxury font-light uppercase vertical-text mb-3">
            SCROLL TO DISCOVER
          </span>
          <ArrowDown size={14} className="stroke-[1.5]" />
        </motion.div>
      </div>
    </section>
  );
}
