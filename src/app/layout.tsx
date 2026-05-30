import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",  // ← match your CSS
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",  // ← match your CSS
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KAYEM | Haute Couture Luxury Textiles & Weaving",
  description: "Experience the cinematic journey of KAYEM haute couture textiles. Witness the smooth transition from raw organic fibers and spun yarn to complex weaving and fine luxury fabrics. Established 1994.",
  keywords: ["KAYEM", "luxury textiles", "couture fabrics", "high-end weaving", "cashmere", "mulberry silk", "editorial fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-luxury-ivory text-luxury-charcoal">

        <div className="film-grain" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
