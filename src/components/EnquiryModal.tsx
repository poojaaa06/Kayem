// components/EnquiryModal.tsx
"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { X } from "lucide-react";

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

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// ── Validation helpers ──────────────────────────────────────────────────────
const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
    // Remove spaces, dashes, parentheses
    const cleaned = phone.replace(/[\s\-()]/g, '');
    // Must start with +91 and then exactly 10 digits
    return /^\+91\d{10}$/.test(cleaned);
};

const validateRequired = (value: string): boolean => value.trim().length > 0;

// ── Input formatter for phone ──────────────────────────────────────────────
const formatPhoneInput = (value: string): string => {
    // Only digits and '+' are allowed
    const cleaned = value.replace(/[^+\d]/g, '');
    // Ensure '+' only at the start
    if (cleaned.startsWith('+')) {
        return '+' + cleaned.slice(1).replace(/[^0-9]/g, '');
    } else {
        // If no '+', strip everything except digits
        return cleaned.replace(/[^0-9]/g, '');
    }
};

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrevzrel";
    const RECAPTCHA_SITE_KEY = "6LcngwotAAAAAPmvzE7ajQ-FqMpLkaUyPOttNuc0";

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        officeAddress: "",
        requirement: "",
        additionalMessage: "",
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

    // ── Validators per field ──────────────────────────────────────────────
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

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        // Special handling for phone: format input
        if (name === "phone") {
            newValue = formatPhoneInput(value);
        }

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        if (touched[name as keyof typeof touched]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name as keyof typeof touched]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            officeName: "",
            officeAddress: "",
            requirement: "",
            additionalMessage: "",
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

        // Validate all fields before submission
        const newErrors = {
            name: validateField("name", formData.name),
            phone: validateField("phone", formData.phone),
            email: validateField("email", formData.email),
            officeName: validateField("officeName", formData.officeName),
            officeAddress: validateField("officeAddress", formData.officeAddress),
            requirement: validateField("requirement", formData.requirement),
        };
        setErrors(newErrors);

        // Mark all fields as touched to show errors
        setTouched({
            name: true,
            phone: true,
            email: true,
            officeName: true,
            officeAddress: true,
            requirement: true,
        });

        const hasErrors = Object.values(newErrors).some((err) => err !== "");
        if (hasErrors) {
            const firstErrorField = document.querySelector(".field-error");
            if (firstErrorField) firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
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

                setTimeout(() => {
                    setSubmitSuccess(false);
                    onClose();
                }, 2000);
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
        if (!isOpen) return;

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
    }, [isOpen, RECAPTCHA_SITE_KEY]);

    useEffect(() => {
        if (!isOpen) {
            if (widgetIdRef.current !== null && window.grecaptcha) {
                window.grecaptcha.reset(widgetIdRef.current);
            }
            setCaptchaToken(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // ── Render field ────────────────────────────────────────────────────────
    const renderField = <K extends keyof typeof formData>(
        label: string,
        name: K,
        type: "text" | "tel" | "email" = "text",
        placeholder: string,
        required: boolean = true,
        rows?: number
    ) => {
        const value = formData[name];
        const error = errors[name as keyof typeof errors];
        const isTouched = touched[name as keyof typeof touched];
        const showError = isTouched && error;

        return (
            <div className="space-y-1.5">
                <label className="block text-[10px] tracking-luxury text-luxury-gold uppercase">
                    {label} {required && "*"}
                </label>
                {rows ? (
                    <textarea
                        name={name as string}
                        rows={rows}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full bg-luxury-ivory/5 border rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none transition-colors resize-none ${showError
                                ? "border-red-500 focus:border-red-500"
                                : "border-luxury-gold/20 focus:border-luxury-gold/50"
                            }`}
                    />
                ) : (
                    <input
                        type={type}
                        name={name as string}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full bg-luxury-ivory/5 border rounded-lg px-4 py-2.5 text-sm text-luxury-ivory focus:outline-none transition-colors ${showError
                                ? "border-red-500 focus:border-red-500"
                                : "border-luxury-gold/20 focus:border-luxury-gold/50"
                            }`}
                    />
                )}
                {showError && (
                    <p className="text-red-400 text-xs mt-1 field-error">{error}</p>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0b0a] border border-luxury-gold/20 rounded-2xl shadow-2xl">
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

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            </div>
        </div>
    );
}