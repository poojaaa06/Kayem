"use client";

import { useEffect, useState } from "react";

export default function InstagramFeed() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
            const script = document.createElement("script");
            script.src = "https://elfsightcdn.com/platform.js";
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => setIsLoaded(true);
        } else {
            setIsLoaded(true);
        }
    }, []);

    return (
        <section className="w-full py-16 bg-luxury-ivory">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                {/* Simple Header */}
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl text-black">
                        Discover Our World on Instagram
                    </h2>
                    <p className="text-black/40 text-sm mt-2">@kayem_synthetics</p>
                </div>

                {/* Feed Container */}
                {!isLoaded && (
                    <div className="min-h-[300px] flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
                    </div>
                )}

                <div
                    className={`elfsight-app-8802bd08-a75a-4448-b023-1a469c0ba78b transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    data-elfsight-app-lazy
                />
            </div>
        </section>
    );
}