"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        officeAddress: "",
        requirement: "",
        additionalMessage: ""
    });

    const ACCESS_KEY = "d41237a7-74d8-484e-be57-97c81194f8ae";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
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
                subject: "Contact Form Enquiry - Kayem Synthetics",
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
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send enquiry. Please try again.");
        }

        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "HEAD OFFICE",
            details: ["A-802, 8th Floor, Swastik Universal,", "Near Valentine Cinema, Piplod,", "Surat, Gujarat - 395007"],
            link: null
        },
        {
            icon: Phone,
            title: "PHONE",
            details: ["+91 91527 27565"],
            link: "tel:+919152727565"
        },
        {
            icon: Mail,
            title: "EMAIL",
            details: ["info@kayem.in"],
            link: "mailto:info@kayem.in"
        },
        {
            icon: Camera,
            title: "INSTAGRAM",
            details: ["@kayem_synthetics"],
            link: "https://instagram.com/kayem_synthetics",
            isSocial: true
        },
        {
            icon: Clock,
            title: "BUSINESS HOURS",
            details: ["Monday - Saturday", "10:00 AM - 7:00 PM"],
            link: null
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* Hero Section - Simple */}
                <section className="pt-32 pb-16 md:pt-40 md:pb-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="max-w-3xl">
                            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7A5C1E]">
                                — Get in Touch
                            </p>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-luxury-charcoal">
                                Let's start a <span className="italic text-[#7A5C1E]">conversation.</span>
                            </h1>
                            <p className="mt-6 font-serif text-base md:text-lg text-luxury-charcoal/70 max-w-2xl">
                                Whether you're looking for custom yarn solutions, have a question about our products,
                                or want to discuss a partnership — we'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Grid */}
                <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left Side - Contact Info */}
                        <div>
                            <div className="mb-8">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A5C1E] mb-2">Reach out</p>
                                <h2 className="font-display text-3xl md:text-4xl font-light text-luxury-charcoal">
                                    We'd love to <span className="italic text-[#7A5C1E]">hear from you.</span>
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((info, idx) => (
                                    <div
                                        key={info.title}
                                        className="group flex items-start gap-5 p-5 rounded-2xl bg-white/50 border border-[#7A5C1E]/10 hover:border-[#7A5C1E]/25 hover:bg-white transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7A5C1E]/10 flex items-center justify-center group-hover:bg-[#7A5C1E]/20 transition-colors">
                                            <info.icon size={18} className="text-[#7A5C1E]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A5C1E] mb-1">
                                                {info.title}
                                            </h3>
                                            {info.link ? (
                                                <a href={info.link} target={info.isSocial ? "_blank" : undefined} rel={info.isSocial ? "noopener noreferrer" : undefined} className="block text-sm md:text-base text-luxury-charcoal/80 hover:text-[#7A5C1E] transition-colors">
                                                    {info.details[0]}
                                                </a>
                                            ) : (
                                                info.details.map((line, i) => (
                                                    <p key={i} className="text-sm md:text-base text-luxury-charcoal/80 leading-relaxed">
                                                        {line}
                                                    </p>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-[#7A5C1E]/20 to-transparent" />
                                <span className="text-[9px] tracking-[0.3em] text-luxury-charcoal/30 font-sans">CONNECT WITH US</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-[#7A5C1E]/20 to-transparent" />
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-[#0d0b0a] rounded-2xl border border-luxury-gold/20 shadow-xl overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-display text-luxury-ivory">Send an Enquiry</h3>
                                    <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-2 mb-3" />
                                    <p className="text-xs text-luxury-ivory/50">Fill in the details below and we'll get back to you</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                                placeholder="Your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                            Office / Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="officeName"
                                            required
                                            value={formData.officeName}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                            Office Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="officeAddress"
                                            required
                                            value={formData.officeAddress}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="Complete office address"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                            Requirement / Product Interest *
                                        </label>
                                        <input
                                            type="text"
                                            name="requirement"
                                            required
                                            value={formData.requirement}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                            placeholder="e.g., Nylon Yarns, Viscose Yarns, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-widest text-luxury-gold uppercase mb-2">
                                            Additional Message
                                        </label>
                                        <textarea
                                            name="additionalMessage"
                                            rows={4}
                                            value={formData.additionalMessage}
                                            onChange={handleInputChange}
                                            className="w-full bg-luxury-ivory/5 border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
                                            placeholder="Tell us more about your requirements..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 bg-luxury-gold/20 border border-luxury-gold/40 rounded-full hover:bg-luxury-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? (
                                            <span className="text-sm uppercase tracking-widest text-luxury-gold">Sending...</span>
                                        ) : submitSuccess ? (
                                            <span className="text-sm uppercase tracking-widest text-green-400">Sent Successfully!</span>
                                        ) : (
                                            <span className="text-sm uppercase tracking-widest text-luxury-gold inline-flex items-center gap-2">
                                                Submit Enquiry
                                                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}