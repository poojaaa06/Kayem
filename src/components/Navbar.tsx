"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ forceDarkLogo = false }: { forceDarkLogo?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileUpdatesOpen, setMobileUpdatesOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "ABOUT US", href: "/about" },
    {
      name: "PRODUCTS",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "YARN", href: "/products", tag: null },
        { name: "FABRIC", href: "/fabric", tag: "NEW LAUNCH" }
      ]
    },
    {
      name: "LATEST UPDATES",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "BLOG POSTS", href: "/blog", tag: null },
        { name: "LATEST YARNS", href: "/latest-yarns", tag: null }
      ]
    },
    { name: "CONTACT US", href: "/contactus" },
  ];

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
                className="h-24 w-auto object-contain lg:hidden"
                style={{
                  filter: forceDarkLogo || isScrolled ? "brightness(0) invert(1)" : "brightness(0) invert(0)",
                }}
              />
              <img
                src="/images/newlogo.png"
                alt="Logo"
                className="hidden lg:block h-12 md:h-14 w-auto object-contain"
                style={{
                  filter: forceDarkLogo || isScrolled ? "brightness(0) invert(1)" : "brightness(0) invert(0)",
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground font-serif">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => {
                  if (link.name === "PRODUCTS") setIsProductsOpen(true);
                  if (link.name === "LATEST UPDATES") setIsUpdatesOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.name === "PRODUCTS") setIsProductsOpen(false);
                  if (link.name === "LATEST UPDATES") setIsUpdatesOpen(false);
                }}
              >
                {link.hasDropdown ? (
                  <>
                    <button className="relative group transition-colors hover:text-foreground">
                      {link.name}
                      <ChevronDown size={12} className="inline-block ml-1" />
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
                    </button>

                    <AnimatePresence>
                      {(link.name === "PRODUCTS" ? isProductsOpen : isUpdatesOpen) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-4 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#7A5C1E]/20 overflow-hidden"
                        >
                          {link.dropdownItems?.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center justify-between px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-luxury-charcoal hover:bg-[#7A5C1E]/5 transition-colors group"
                            >
                              <span>{item.name}</span>
                              {item.tag && (
                                <span className="text-[8px] bg-[#7A5C1E] text-white px-2 py-0.5 rounded-full">
                                  {item.tag}
                                </span>
                              )}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a href={link.href} className="relative group transition-colors hover:text-foreground">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-20 h-8 w-8 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-300"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`} />
            <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
              } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`} />
            <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              } ${forceDarkLogo || isScrolled ? "bg-white" : "bg-black"}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
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
                  <span className="font-display text-5xl tracking-tight text-[#D4AF37]">KAYEM</span>
                  <div className="mt-4 h-px w-12 bg-[#D4AF37]/40 mx-auto" />
                </div>
                <nav className="flex flex-col items-center gap-6 w-full">
                  {navLinks.map((link, index) => (
                    <div key={link.name} className="w-full text-center">
                      {link.hasDropdown ? (
                        <>
                          <button
                            onClick={() => {
                              if (link.name === "PRODUCTS") setMobileProductsOpen(!mobileProductsOpen);
                              if (link.name === "LATEST UPDATES") setMobileUpdatesOpen(!mobileUpdatesOpen);
                            }}
                            className="text-2xl font-light tracking-wide text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center justify-center gap-2 w-full"
                          >
                            {link.name}
                            <motion.div
                              animate={{ rotate: (link.name === "PRODUCTS" ? mobileProductsOpen : mobileUpdatesOpen) ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {(link.name === "PRODUCTS" ? mobileProductsOpen : mobileUpdatesOpen) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-4"
                              >
                                <div className="flex flex-col gap-4 items-center">
                                  {link.dropdownItems?.map((item, idx) => (
                                    <motion.a
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (link.name === "PRODUCTS") setMobileProductsOpen(false);
                                        if (link.name === "LATEST UPDATES") setMobileUpdatesOpen(false);
                                      }}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="relative group flex items-center justify-center gap-3 text-base font-light tracking-wide text-white/50 hover:text-[#D4AF37] transition-colors duration-300"
                                    >
                                      {item.name}
                                      {item.tag && (
                                        <span className="text-[8px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">
                                          {item.tag}
                                        </span>
                                      )}
                                    </motion.a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <motion.a
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
                      )}
                    </div>
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
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Since 1985</span>
                    <span className="h-px w-8 bg-[#D4AF37]/40" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronDown({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}