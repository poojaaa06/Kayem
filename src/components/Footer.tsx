"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#0d0b0a] text-luxury-ivory pt-24 pb-12 relative overflow-hidden z-30 border-t border-luxury-gold/10">

      {/* Dynamic Gold Vignette overlay to tie colors */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-luxury-gold/10">

          {/* Column 1: Editorial Newsletter signup */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
              JOIN THE ARCHIVE
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-luxury-ivory font-light max-w-sm leading-snug">
              Receive private collection releases and loom journals.
            </h3>

            <form onSubmit={handleSubmit} className="relative w-full max-w-md pt-2">
              {subscribed ? (
                <span className="text-xs tracking-luxury text-luxury-gold block py-3">
                  YOUR EMAIL HAS BEEN REGISTERED. THANK YOU.
                </span>
              ) : (
                <div className="flex items-center border-b border-luxury-gold/30 focus-within:border-luxury-gold transition-colors duration-500 py-2">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs tracking-luxury text-luxury-ivory placeholder-luxury-ivory/30 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="text-luxury-gold hover:text-luxury-ivory p-1 transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={18} className="stroke-[1.25]" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Column 2: Contact & Address */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
              CONTACT & VISIT
            </span>
            <ul className="space-y-4 text-xs font-light text-luxury-ivory/60 tracking-luxury">
              <li>
                <span className="text-luxury-ivory block font-medium mb-1">HEAD OFFICE</span>
                <span className="text-[11px] block leading-relaxed font-sans">
                  A-802, 8th Floor, Swastik Universal, <br />
                  Near Valentine Cinema, Piplod, <br />
                  Surat, Gujarat - 395007
                </span>
              </li>
              <li>
                <span className="text-luxury-ivory block font-medium mb-1">PHONE</span>
                <a href="tel:+919152727565" className="text-[11px] block font-sans hover:text-luxury-gold transition-colors">
                  +91 91527 27565
                </a>
              </li>
              <li>
                <span className="text-luxury-ivory block font-medium mb-1">EMAIL</span>
                <a href="mailto:info@kayem.in" className="text-[11px] block font-sans hover:text-luxury-gold transition-colors">
                  info@kayem.in
                </a>
              </li>
              <li>
                <span className="text-luxury-ivory block font-medium mb-1">INSTAGRAM</span>
                <a
                  href="https://instagram.com/kayem_synthetics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] block font-sans hover:text-luxury-gold transition-colors"
                >
                  @kayem_synthetics
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections / Index */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
              INDEX
            </span>
            <ul className="space-y-3 text-[11px] font-light text-luxury-ivory/60 tracking-luxury uppercase">
              <li>
                <a href="/about" className="hover:text-luxury-gold transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-luxury-gold transition-colors duration-300">
                  Products
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-luxury-gold transition-colors duration-300">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-luxury-gold transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
              FOLLOW
            </span>
            <ul className="space-y-3 text-[11px] font-light text-luxury-ivory/60 tracking-luxury uppercase">
              <li>
                <a
                  href="https://instagram.com/kayem_synthetics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                  Facebook
                </a>
              </li> */}
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata & Large Watermark Logo */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-luxury text-luxury-ivory/40 uppercase font-sans">
          <span>&copy; {new Date().getFullYear()} KAYEM SYNTHETICS. ALL RIGHTS RESERVED.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-luxury-ivory transition-colors">PRIVACY POLICY</a>
            <span>/</span>
            <a href="#" className="hover:text-luxury-ivory transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>

        {/* Giant Watermark Background Wordmark */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none overflow-hidden h-[15vw] flex items-end justify-center">
          <span className="font-serif text-[18vw] text-luxury-gold/5 leading-none tracking-widest block uppercase">
            KAYEM
          </span>
        </div>

      </div>
    </footer>
  );
}