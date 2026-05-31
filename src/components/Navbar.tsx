"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar({ forceDarkLogo = false }: { forceDarkLogo?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll(); // Check initial scroll position
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT US", href: "/about" },
    { name: "BLOGS", href: "/blog" },
    { name: "PRODUCTS", href: "/products" },
    { name: "CONTACT US", href: "#contact" },
  ];

  // Don't render animations until mounted to prevent layout shift
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 h-16 md:h-20 flex items-center bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="z-20">
            <a href="/" className="block">
              <img
                src="/images/l.png"
                alt="Logo"
                className="h-24 md:h-28 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 transition-all duration-300 h-16 md:h-20 flex items-center ${isScrolled ? "border-b border-white/10 backdrop-blur-md bg-black/20 text-white" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <div className="z-20">
            <a href="/" className="block">
              <img
                src="/images/l.png"
                alt="Logo"
                className="h-24 md:h-28 w-auto object-contain"
                style={{ filter: forceDarkLogo || isScrolled ? "brightness(0) invert(1)" : "brightness(0) invert(0)" }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group transition-colors hover:text-foreground"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-20 h-8 w-8 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-300 "
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-40 h-full w-full max-w-sm bg-gradient-to-b from-luxury-charcoal via-luxury-charcoal/95 to-black/90 backdrop-blur-xl lg:hidden shadow-2xl"
            >
              <div className="flex flex-col items-center justify-center min-h-full px-8 py-24">
                <div className="mb-12 text-center">
                  <span className="font-display text-5xl tracking-tight text-[#D4AF37]">
                    KAYEM
                  </span>
                  <div className="mt-4 h-px w-12 bg-[#D4AF37]/40 mx-auto" />
                </div>

                <nav className="flex flex-col items-center gap-8 w-full">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group text-2xl font-light tracking-wide text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.name}
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-12 left-0 right-0 text-center"
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="h-px w-8 bg-[#D4AF37]/40" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">
                      Since 1985
                    </span>
                    <span className="h-px w-8 bg-[#D4AF37]/40" />
                  </div>
                  <p className="text-xs text-white/40">Surat, India</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}