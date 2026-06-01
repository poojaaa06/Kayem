"use client";

import { useRef, type ReactNode, type MouseEvent, useEffect, useState, FormEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, X } from "lucide-react";

// MagneticButton Component (embedded)
function MagneticButton({ children, className = "", variant = "primary", onClick }: {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "ghost";
    onClick?: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });
    const rotate = useTransform(sx, [-30, 30], [-4, 4]);

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        x.set(mx * 0.35);
        y.set(my * 0.35);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    const base =
        variant === "primary"
            ? "bg-[#7A5C1E] text-white shadow-lg hover:shadow-2xl hover:bg-[#694f18]"
            : "border border-[#7A5C1E]/40 text-luxury-charcoal hover:border-[#7A5C1E] hover:bg-[#7A5C1E]/5";

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: sx, y: sy, rotate }}
            className={`relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${base} ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

// Contact Modal Component - Same as Footer Form
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const ACCESS_KEY = "d41237a7-74d8-484e-be57-97c81194f8ae";
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        officeAddress: "",
        requirement: "",
        additionalMessage: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleContactSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formObject = {
                access_key: ACCESS_KEY,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                office_name: formData.officeName,
                office_address: formData.officeAddress,
                requirement: formData.requirement,
                additional_message: formData.additionalMessage,
                subject: "New Kayem Enquiry",
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitSuccess(true);
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    officeName: "",
                    officeAddress: "",
                    requirement: "",
                    additionalMessage: "",
                });

                setTimeout(() => {
                    setSubmitSuccess(false);
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send enquiry.");
        }

        setIsSubmitting(false);
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0b0a] border border-luxury-gold/20 rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-luxury-gold/20 bg-[#0d0b0a]">
                                <div>
                                    <h3 className="text-xl font-display text-luxury-ivory">Send an Enquiry</h3>
                                    <p className="text-xs text-luxury-ivory/50 mt-1">Fill in the details below and we'll get back to you</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-luxury-ivory/50 hover:text-luxury-gold transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body - Form */}
                            <form onSubmit={handleContactSubmit} className="p-6 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                        Office / Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="officeName"
                                        required
                                        value={formData.officeName}
                                        onChange={handleInputChange}
                                        className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                        Office Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="officeAddress"
                                        required
                                        value={formData.officeAddress}
                                        onChange={handleInputChange}
                                        className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                        placeholder="Complete office address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                        Requirement / Product Interest *
                                    </label>
                                    <input
                                        type="text"
                                        name="requirement"
                                        required
                                        value={formData.requirement}
                                        onChange={handleInputChange}
                                        className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                        placeholder="e.g., Nylon Yarns, Viscose Yarns, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase mb-2">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="additionalMessage"
                                        rows={4}
                                        value={formData.additionalMessage}
                                        onChange={handleInputChange}
                                        className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
                                        placeholder="Tell us more about your requirements..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 bg-luxury-gold/20 border border-luxury-gold/40 rounded-full hover:bg-luxury-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="text-sm uppercase tracking-luxury text-luxury-gold">
                                                Sending...
                                            </span>
                                        ) : submitSuccess ? (
                                            <span className="text-sm uppercase tracking-luxury text-green-500">
                                                Sent Successfully!
                                            </span>
                                        ) : (
                                            <span className="text-sm uppercase tracking-luxury text-luxury-gold">
                                                Submit Enquiry
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

const team = [
    {
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        name: "Kishore Mehta",
        role: "Founder & Chairman",
        quote: "Yarn is memory. Every twist holds the patience of the hands that made it.",
    },
    {
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        name: "Aanya Mehta",
        role: "Director, Innovation",
        quote: "We don't follow trends — we engineer the textures the next decade will wear.",
    },
    {
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        name: "Ramesh Iyer",
        role: "Master of Looms",
        quote: "A great yarn whispers before the loom even begins to sing.",
    },
];

function Section({
    eyebrow,
    title,
    body,
    align = "left",
    delay = 0,
}: {
    eyebrow: string;
    title: React.ReactNode;
    body: string;
    align?: "left" | "right";
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
            className={`max-w-2xl ${align === "right" ? "md:ml-auto" : ""}`}
        >
            <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                — {eyebrow}
            </p>
            <h2 className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl">
                {title}
            </h2>
            <p className="mt-8 font-serif text-base leading-relaxed text-luxury-charcoal/80 md:text-lg">
                {body}
            </p>
        </motion.div>
    );
}

export default function About() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 100]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, isMobile ? 1.05 : 1.1]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-luxury-cream text-luxury-charcoal">
                {/* HERO */}
                <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden pt-56 md:h-[90vh] md:pt-0">
                    <motion.div
                        style={!isMobile ? { y: imgY, scale: imgScale } : {}}
                        className="absolute inset-0"
                    >
                        <Image
                            src="/images/aboutus.png"
                            alt="Atmospheric view of the KAYEM mill"
                            fill
                            priority
                            sizes="100vw"
                            quality={85}
                            className="object-cover"
                            loading="eager"
                        />
                    </motion.div>

                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/90 via-luxury-cream/50 to-luxury-cream" />
                        {!isMobile && (
                            <>
                                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/20 blur-3xl" />
                                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                            </>
                        )}
                    </div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-24 md:px-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]"
                        >
                            — Since 1985
                        </motion.p>
                        <h1 className="max-w-5xl font-display text-[12vw] font-light leading-[0.9] md:text-[8vw]">
                            {["The", "house", "behind", "the", "thread."].map((w, i) => (
                                <span key={i} className="mr-[0.25em] inline-block ">
                                    <motion.span
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.12, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                                        className={`inline-block ${i === 3 ? "italic text-[#7A5C1E]" : "text-luxury-charcoal"}`}
                                    >
                                        {w}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-10 max-w-xl font-serif leading-relaxed text-luxury-charcoal/70"
                        >
                            Forty years of spinning excellence. Three generations of mastery. One yarn at a time.
                        </motion.p>
                    </div>
                </section>

                {/* STORY SECTION */}
                <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-16">
                    {!isMobile && (
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/8 blur-3xl" />
                        </div>
                    )}

                    <Section
                        eyebrow="About Us"
                        title={
                            <>
                                Forty years of <span className="italic text-[#7A5C1E]">spinning</span> beauty into being.
                            </>
                        }
                        body="Founded in 1985, KAYEM Synthetics Pvt. Ltd. has built a strong reputation for delivering exceptional quality, innovation, and trusted business values in the textile industry. Over the years, KAYEM has emerged as one of India's leading manufacturers and processors of Speciality & Fancy Yarns in Nylon and Viscose. Our yarns cater to sarees, dress materials, curtains, carpets, and upholstery fabrics — present in every major yarn-consuming centre in the country."
                    />

                    {/* Mission Section */}
                    <div className="my-32 grid items-center gap-10 md:grid-cols-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                            className="relative overflow-hidden rounded-2xl shadow-xl md:col-span-7"
                        >
                            <div className="relative h-[60vh] w-full">
                                <Image
                                    src="/images/saree1.png"
                                    alt="Macro view of silk yarn forming sweeping waves"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={80}
                                    loading="lazy"
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                        <div className="md:col-span-5">
                            <Section
                                eyebrow="Our Mission"
                                title={<>Engineer the <span className="italic text-[#7A5C1E]">unseen</span> craft.</>}
                                body="To consistently deliver premium-quality Speciality & Fancy Yarns that meet the evolving needs of the textile industry — through uncompromising standards, technical mastery, and customised yarn developments built on long-term relationships."
                            />
                        </div>
                    </div>

                    {/* Vision Section */}
                    <div className="grid items-center gap-10 md:grid-cols-12">
                        <div className="md:order-2 md:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                                className="relative overflow-hidden rounded-2xl shadow-xl"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#D4AF37]/20 via-[#7A5C1E]/10 to-luxury-ivory">
                                    <Image
                                        src="/images/saree2.png"
                                        alt="2030 Vision"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                        <div className="md:order-1 md:col-span-7">
                            <Section
                                eyebrow="Our Vision"
                                title={<>Set the <span className="italic text-[#7A5C1E]">benchmark</span> for tomorrow's fibres.</>}
                                body="To be recognised as a global leader in Speciality & Fancy Yarns — redefining textile possibilities through advanced yarn technologies, creative product development, and sustainable growth practices that inspire beautiful fabrics worldwide."
                            />
                        </div>
                    </div>
                </section>

                {/* VISIONARY TEAM SECTION */}
                <section className="relative border-t border-[#7A5C1E]/20 bg-gradient-to-br from-luxury-ivory via-[#F5E6D3]/30 to-luxury-ivory px-6 py-32 md:px-16">
                    {!isMobile && (
                        <div className="absolute inset-0">
                            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
                            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#7A5C1E]/8 blur-3xl" />
                        </div>
                    )}

                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                        >
                            <div>
                                <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                    — The Visionaries
                                </p>
                                <h2 className="font-display text-5xl font-light leading-[0.95] text-luxury-charcoal md:text-7xl">
                                    Hands that shape <br />
                                    <span className="italic text-[#7A5C1E]">the loom.</span>
                                </h2>
                            </div>
                            <p className="max-w-md font-serif leading-relaxed text-luxury-charcoal/80">
                                Three generations. One obsession. Meet the people quietly engineering the
                                fabrics the world will soon wear.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {team.map((member, i) => (
                                <motion.article
                                    key={member.name}
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 1, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                            src={member.img}
                                            alt={`${member.name}, ${member.role} at KAYEM`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                            quality={75}
                                            loading="lazy"
                                            className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-7">
                                        <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A5C1E]">
                                            {member.role}
                                        </p>
                                        <h3 className="font-display text-3xl text-luxury-charcoal">{member.name}</h3>
                                        <p className="mt-4 max-h-0 font-serif text-sm italic leading-relaxed text-luxury-charcoal/80 opacity-0 transition-all duration-700 ease-out group-hover:max-h-40 group-hover:opacity-100">
                                            "{member.quote}"
                                        </p>
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#7A5C1E]/0 transition-all duration-500 group-hover:ring-[#7A5C1E]/30" />
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONNECT WITH US SECTION */}
                <section className="relative overflow-hidden px-6 py-32 md:px-16">
                    {!isMobile && (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/15 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7A5C1E]/15 blur-3xl" />
                            <div className="absolute top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                        </div>
                    )}

                    <div className="relative mx-auto max-w-3xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                — Connect With Us
                            </p>
                            <h3 className="font-display text-4xl font-light leading-[1.05] text-luxury-charcoal md:text-6xl">
                                Let's weave your <span className="italic text-[#7A5C1E]">next chapter.</span>
                            </h3>
                            <div className="mx-auto my-8 h-px w-16 bg-[#7A5C1E]/30" />
                            <p className="mx-auto max-w-md font-serif text-base leading-relaxed text-luxury-charcoal/70">
                                Have a project in mind? Looking for custom yarn solutions?<br />
                                We'd love to hear from you.
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <MagneticButton onClick={() => setIsModalOpen(true)}>
                                    Send an inquiry
                                </MagneticButton>
                                <a
                                    href="mailto:info@kayem.in"
                                    className="group flex items-center gap-2 rounded-full border border-[#7A5C1E]/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-luxury-charcoal transition-all hover:border-[#7A5C1E] hover:bg-[#7A5C1E]/5"
                                >
                                    <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    info@kayem.in
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Contact Modal - Same as Footer Form */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}