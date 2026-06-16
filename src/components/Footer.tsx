"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";

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

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // REPLACE THESE WITH YOUR ACTUAL VALUES
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrevzrel"; // Replace with your Formspree endpoint
  const RECAPTCHA_SITE_KEY = "6LcngwotAAAAAPmvzE7ajQ-FqMpLkaUyPOttNuc0"; // Replace with your Google Site Key

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
  const [submitError, setSubmitError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const handler = () => setIsModalOpen(true);
    window.addEventListener("open-enquiry-modal", handler);
    return () => window.removeEventListener("open-enquiry-modal", handler);
  }, []);

  // Load reCAPTCHA script when modal opens
  useEffect(() => {
    if (!isModalOpen) return;

    // Load the reCAPTCHA script if not already loaded
    if (!scriptLoadedRef.current && !document.querySelector('#recaptcha-script')) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Wait for grecaptcha to be ready
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
      // Script already loaded, render widget
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

    return () => {
      // Don't cleanup widget when modal closes - keep it for next time
    };
  }, [isModalOpen, RECAPTCHA_SITE_KEY]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
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

        // Reset reCAPTCHA widget
        if (widgetIdRef.current !== null && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
        setCaptchaToken(null);

        setTimeout(() => {
          setSubmitSuccess(false);
          setIsModalOpen(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        if (errorData?.errors?.captcha) {
          setSubmitError("reCAPTCHA verification failed. Please try again.");
          // Reset reCAPTCHA on error
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

  return (
    <>
      <footer id="contact" className="w-full bg-[#0d0b0a] text-luxury-ivory pt-24 pb-12 relative overflow-hidden z-30 border-t border-luxury-gold/10">
        {/* Dynamic Gold Vignette overlay to tie colors */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

          {/* Footer Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-luxury-gold/10">

            {/* Column 1: Contact & Address */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
                CONTACT & VISIT
              </span>
              <ul className="space-y-4 text-xs font-light text-luxury-ivory/60 tracking-luxury">
                <li>
                  <span className="text-luxury-ivory block font-medium mb-1">HEAD OFFICE</span>
                  <a
                    href="https://maps.app.goo.gl/TPiHLauBwo3deBvA8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] block leading-relaxed font-sans hover:text-luxury-gold transition-colors"
                  >
                    A-802, 8th Floor, Swastik Universal, <br />
                    Near Valentine Cinema, Piplod, <br />
                    Surat, Gujarat - 395007
                  </a>
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

            {/* Column 2: INDEX */}
            <div className="lg:col-span-3 flex flex-col space-y-6">
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
                  <a href="/contactus" className="hover:text-luxury-gold transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Send Enquiry Button */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <span className="text-[10px] tracking-luxury text-luxury-gold uppercase block font-semibold">
                SEND ENQUIRY
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 w-full md:w-auto"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
                  Click Here
                </span>
                <ArrowRight size={16} className="text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-luxury-ivory/40 leading-relaxed">
                Fill out our enquiry form and our team will get back to you within 24 hours.
              </p>
            </div>

          </div>

          {/* Footer Bottom Metadata & Large Watermark Logo */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-luxury text-luxury-ivory/40 uppercase font-sans">
            <span>&copy; {new Date().getFullYear()} KAYEM SYNTHETICS. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Giant Watermark Background Wordmark */}
          <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none overflow-hidden h-[15vw] flex items-end justify-center">
            <span className="font-serif text-[18vw] text-luxury-gold/5 leading-none tracking-widest block uppercase">
              KAYEM
            </span>
          </div>

        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0b0a] border border-luxury-gold/20 rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-luxury-gold/20 bg-[#0d0b0a]">
              <div>
                <h3 className="text-xl font-display text-luxury-ivory">Send an Enquiry</h3>
                <p className="text-xs text-luxury-ivory/50 mt-1">Fill in the details below and we'll get back to you</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
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
                  Company Name *
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
                  Company Address *
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

              {/* reCAPTCHA v2 Checkbox Widget */}
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
          </div>
        </div>
      )}
    </>
  );
}