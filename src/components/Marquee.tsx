const phrases = [
  "Premium Quality ",
  "Market Leader",
  "Polyester Catonic Yarns",
  "Nylon Yarns",
  "Viscose Yarns"
];

export function Marquee() {
  return (
    <div className="relative border-y border-gold/20 py-4 md:py-8 overflow-hidden bg-white/40">
      <div className="flex whitespace-nowrap marquee-track w-max gap-8 md:gap-16 text-3xl md:text-7xl font-display font-light">
        {[...phrases, ...phrases, ...phrases, ...phrases].map((p, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-16">
            <span
              className={i % 2 === 0
                ? "text-[#D4AF37] italic"
                : "text-black"
              }
            >
              {p}
            </span>
            <span
              className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D4AF37] flex-shrink-0"
              style={{
                boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)",
                opacity: 0.9
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}