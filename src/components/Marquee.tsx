const phrases = [
  "Premium Quality ",
  "Market Leader",
  "Organic Pima",
  "Nylon Yarns",
  "Viscose Yarns",
  "Heritage Weave",
];

export function Marquee() {
  return (
    <div className="relative border-y border-gold/20 py-8 overflow-hidden bg-white/40">
      <div className="flex whitespace-nowrap marquee-track w-max gap-16 text-5xl md:text-7xl font-display font-light">
        {[...phrases, ...phrases, ...phrases, ...phrases].map((p, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className={i % 2 === 0 ? "text-gradient-gold italic" : "text-foreground/30"}>
              {p}
            </span>
            <span
              className="h-2 w-2 rounded-full bg-gold"
              style={{
                boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)",
                backgroundColor: "#D4AF37",
                opacity: 0.9
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}