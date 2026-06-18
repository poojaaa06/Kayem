"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (element: HTMLElement, options: {
                sitekey: string;
                callback: (token: string) => void;
                'expired-callback'?: () => void;
            }) => number;
            reset: (widgetId?: number) => void;
        };
    }
}

// ── Validation helpers ──────────────────────────────────────────────────────
const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^\+91\d{10}$/.test(cleaned);
};

const validateRequired = (value: string): boolean => value.trim().length > 0;

const formatPhoneInput = (value: string): string => {
    const cleaned = value.replace(/[^+\d]/g, '');
    if (cleaned.startsWith('+')) {
        return '+' + cleaned.slice(1).replace(/[^0-9]/g, '');
    } else {
        return cleaned.replace(/[^0-9]/g, '');
    }
};

export default function Contact() {
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrevzrel";
    const RECAPTCHA_SITE_KEY = "6LcngwotAAAAAPmvzE7ajQ-FqMpLkaUyPOttNuc0";

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        officeAddress: "",
        requirement: "",
        additionalMessage: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        officeAddress: "",
        requirement: "",
    });

    const [touched, setTouched] = useState({
        name: false,
        phone: false,
        email: false,
        officeName: false,
        officeAddress: false,
        requirement: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState(false);

    const recaptchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);
    const scriptLoadedRef = useRef(false);

    // ── Validators ──────────────────────────────────────────────────────────
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "name":
                return validateRequired(value) ? "" : "Full name is required.";
            case "phone":
                if (!validateRequired(value)) return "Phone number is required.";
                if (!validatePhone(value)) return "Enter a valid Indian phone number: +91 followed by 10 digits (e.g., +91 98765 43210).";
                return "";
            case "email":
                if (!validateRequired(value)) return "Email address is required.";
                if (!validateEmail(value)) return "Enter a valid email address.";
                return "";
            case "officeName":
                return validateRequired(value) ? "" : "Company name is required.";
            case "officeAddress":
                return validateRequired(value) ? "" : "Company address is required.";
            case "requirement":
                return validateRequired(value) ? "" : "Please tell us your requirement.";
            default:
                return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "phone") {
            newValue = formatPhoneInput(value);
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));

        if (touched[name as keyof typeof touched]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, newValue) }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name as keyof typeof touched]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            officeName: "",
            officeAddress: "",
            requirement: "",
            additionalMessage: ""
        });
        setErrors({
            name: "",
            phone: "",
            email: "",
            officeName: "",
            officeAddress: "",
            requirement: "",
        });
        setTouched({
            name: false,
            phone: false,
            email: false,
            officeName: false,
            officeAddress: false,
            requirement: false,
        });
        setSubmitSuccess(false);
        setSubmitError("");
        if (widgetIdRef.current !== null && window.grecaptcha) {
            window.grecaptcha.reset(widgetIdRef.current);
        }
        setCaptchaToken(null);
        setCaptchaError(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateField("name", formData.name),
            phone: validateField("phone", formData.phone),
            email: validateField("email", formData.email),
            officeName: validateField("officeName", formData.officeName),
            officeAddress: validateField("officeAddress", formData.officeAddress),
            requirement: validateField("requirement", formData.requirement),
        };
        setErrors(newErrors);
        setTouched({
            name: true,
            phone: true,
            email: true,
            officeName: true,
            officeAddress: true,
            requirement: true,
        });

        const hasErrors = Object.values(newErrors).some(err => err !== "");
        if (hasErrors) {
            const firstError = document.querySelector(".field-error");
            if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        if (!captchaToken) {
            setCaptchaError(true);
            alert("Please verify that you're not a robot.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");
        setCaptchaError(false);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("office_name", formData.officeName);
            formDataToSend.append("office_address", formData.officeAddress);
            formDataToSend.append("requirement", formData.requirement);
            formDataToSend.append("additional_message", formData.additionalMessage);
            formDataToSend.append("g-recaptcha-response", captchaToken);

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formDataToSend,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setSubmitSuccess(true);
                resetForm();
                setTimeout(() => setSubmitSuccess(false), 3000);
            } else {
                const errorData = await response.json();
                if (errorData?.errors?.captcha) {
                    setSubmitError("reCAPTCHA verification failed. Please try again.");
                    if (widgetIdRef.current !== null && window.grecaptcha) {
                        window.grecaptcha.reset(widgetIdRef.current);
                    }
                    setCaptchaToken(null);
                } else {
                    setSubmitError("Failed to send enquiry. Please try again.");
                }
            }
        } catch (error) {
            console.error(error);
            setSubmitError("Failed to send enquiry. Please check your connection.");
        }

        setIsSubmitting(false);
    };

    // ── Load reCAPTCHA ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!scriptLoadedRef.current && !document.querySelector('#recaptcha-script')) {
            scriptLoadedRef.current = true;
            const script = document.createElement('script');
            script.id = 'recaptcha-script';
            script.src = 'https://www.google.com/recaptcha/api.js';
            script.async = true;
            script.defer = true;

            script.onload = () => {
                const checkGrecaptcha = setInterval(() => {
                    if (window.grecaptcha) {
                        clearInterval(checkGrecaptcha);
                        if (recaptchaRef.current && window.grecaptcha) {
                            window.grecaptcha.ready(() => {
                                if (recaptchaRef.current && window.grecaptcha) {
                                    widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
                                        sitekey: RECAPTCHA_SITE_KEY,
                                        callback: (token: string) => {
                                            setCaptchaToken(token);
                                            setCaptchaError(false);
                                        },
                                        'expired-callback': () => {
                                            setCaptchaToken(null);
                                            setCaptchaError(true);
                                        },
                                    });
                                }
                            });
                        }
                    }
                }, 100);
                setTimeout(() => clearInterval(checkGrecaptcha), 10000);
            };
            document.body.appendChild(script);
        } else if (window.grecaptcha && recaptchaRef.current && widgetIdRef.current === null) {
            window.grecaptcha.ready(() => {
                if (recaptchaRef.current && window.grecaptcha && widgetIdRef.current === null) {
                    widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
                        sitekey: RECAPTCHA_SITE_KEY,
                        callback: (token: string) => {
                            setCaptchaToken(token);
                            setCaptchaError(false);
                        },
                        'expired-callback': () => {
                            setCaptchaToken(null);
                            setCaptchaError(true);
                        },
                    });
                }
            });
        }
    }, [RECAPTCHA_SITE_KEY]);

    // ── Helper to render form fields ──────────────────────────────────────
    const renderField = (label: string, name: string, type: string, placeholder: string, required: boolean = true, rows?: number) => {
        const value = formData[name as keyof typeof formData];
        const error = errors[name as keyof typeof errors];
        const isTouched = touched[name as keyof typeof touched];
        const showError = isTouched && error;

        return (
            <div className="space-y-1.5">
                <label className="block text-[10px] tracking-widest text-luxury-gold uppercase">
                    {label} {required && "*"}
                </label>
                {rows ? (
                    <textarea
                        name={name}
                        rows={rows}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full bg-luxury-ivory/5 border rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none transition-colors resize-none ${showError
                                ? "border-red-500 focus:border-red-500"
                                : "border-luxury-gold/20 focus:border-luxury-gold/50"
                            }`}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full bg-luxury-ivory/5 border rounded-xl px-4 py-3 text-sm text-luxury-ivory focus:outline-none transition-colors ${showError
                                ? "border-red-500 focus:border-red-500"
                                : "border-luxury-gold/20 focus:border-luxury-gold/50"
                            }`}
                    />
                )}
                {showError && <p className="text-red-400 text-xs mt-1 field-error">{error}</p>}
            </div>
        );
    };

    const InstagramIcon = () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7A5C1E]"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );

    const contactInfo = [
        {
            icon: MapPin,
            title: "CORPORATE OFFICE",
            details: ["A-802, 8th Floor, Swastik Universal,", "Near Valentine Cinema, Piplod,", "Surat - 395007, Gujarat, India"],
            link: "https://maps.app.goo.gl/TPiHLauBwo3deBvA8?g_st=aw",
            linkText: "Open in Maps →"
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
            icon: InstagramIcon,
            title: "INSTAGRAM",
            details: ["@kayem_synthetics"],
            link: "https://instagram.com/kayem_synthetics",
            isSocial: true
        },
        {
            icon: Clock,
            title: "BUSINESS HOURS",
            details: ["Monday - Saturday", "11:00 AM - 6:30 PM"],
            link: null
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-luxury-cream text-luxury-charcoal">

                {/* Hero Section */}
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
                                or want to discuss a partnership - we'd love to hear from you.
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
                                {contactInfo.map((info) => (
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
                                            {info.link && info.linkText ? (
                                                <>
                                                    {info.details.map((line, i) => (
                                                        <p key={i} className="text-sm md:text-base text-luxury-charcoal/80 leading-relaxed">
                                                            {line}
                                                        </p>
                                                    ))}
                                                    <a
                                                        href={info.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-1 text-xs text-[#7A5C1E] hover:text-[#7A5C1E]/70 transition-colors"
                                                    >
                                                        {info.linkText}
                                                    </a>
                                                </>
                                            ) : info.link ? (
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
                                        {renderField("Full Name", "name", "text", "Your full name")}
                                        {renderField("Phone Number", "phone", "tel", "+91 98765 43210")}
                                    </div>

                                    {renderField("Email Address", "email", "email", "your@email.com")}
                                    {renderField("Company Name", "officeName", "text", "Your company name")}
                                    {renderField("Company Address", "officeAddress", "text", "Complete office address")}
                                    {renderField("Requirement / Product Interest", "requirement", "text", "e.g., Nylon Yarns, Viscose Yarns, etc.")}
                                    {renderField("Additional Message", "additionalMessage", "text", "Tell us more about your requirements...", false, 4)}

                                    <div className="flex justify-center py-2">
                                        <div ref={recaptchaRef}></div>
                                    </div>

                                    {captchaError && (
                                        <p className="text-red-500 text-xs text-center">
                                            Please verify that you're not a robot.
                                        </p>
                                    )}

                                    {submitError && (
                                        <p className="text-red-500 text-xs text-center">{submitError}</p>
                                    )}

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