import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kayem Synthetics Pvt Ltd",
  description:
    "Kayem Synthetics Pvt Ltd - Premium textile manufacturing, weaving, and fabric solutions.",
  icons: {
    icon: "images/kayemlogo.jpeg",
    shortcut: "images/kayemlogo.jpeg",
    apple: "images/kayemlogo.jpeg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-luxury-ivory text-luxury-charcoal">
        {/* Add Google reCAPTCHA v3 script */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LcngwotAAAAAPmvzE7ajQ-FqMpLkaUyPOttNuc0"
          strategy="afterInteractive"
        />

        <div className="film-grain" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}