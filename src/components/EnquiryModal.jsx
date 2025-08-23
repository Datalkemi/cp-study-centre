// src/components/EnquiryModal.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

// util: url-encode for Netlify form POST
function encode(data) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([k, v]) => params.append(k, String(v ?? "")));
    return params.toString();
}

const DEFAULTS = {
    name: "",
    email: "",
    phone: "",
    courseType: "",
    subCategory: "",
    syllabus: "",
    class: "",
    stream: "",
};

const focusableSelector =
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export default function EnquiryModal({
    isOpen,
    onClose,
    prefill = null,
    // choose one:
    submitMode = "netlify", // "netlify" | "api"
    netlifyFormName = "enquiry",
    netlifyHoneypot = "bot-field",
    apiEndpoint = "/api/enquiry",
    onSuccess, // optional callback(data)
    onError,   // optional callback(error)
}) {
    const prefersReducedMotion = useReducedMotion();
    const [formData, setFormData] = useState(DEFAULTS);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const nameRef = useRef(null);
    const modalRef = useRef(null);
    const lastFocusedRef = useRef(null);

    // apply prefill whenever it changes (on open or when caller passes values)
    useEffect(() => {
        if (isOpen) {
            setFormData((p) => ({ ...DEFAULTS, ...(prefill || {}) }));
        } else {
            setSubmitting(false);
            setErrorMsg("");
        }
    }, [isOpen, prefill]);

    // scroll lock + remember last focused element
    useEffect(() => {
        if (!isOpen) return;
        lastFocusedRef.current = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // ESC handler
        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
            if (e.key === "Tab") {
                // focus trap
                const nodes = modalRef.current?.querySelectorAll(focusableSelector);
                if (!nodes || nodes.length === 0) return;
                const list = Array.from(nodes);
                const first = list[0];
                const last = list[list.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };
        window.addEventListener("keydown", onKey);

        // focus first input
        setTimeout(() => nameRef.current?.focus(), 0);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            // restore focus
            if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
                lastFocusedRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleCourseTypeChange = (e) => {
        const value = e.target.value;
        setFormData((p) => ({
            ...p,
            courseType: value,
            subCategory: "",
            syllabus: "",
            class: "",
            stream: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        try {
            if (submitMode === "netlify") {
                // Post to current origin (Netlify captures it)
                const payload = {
                    "form-name": netlifyFormName,
                    ...formData,
                };
                const res = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: encode(payload),
                });
                if (!res.ok) throw new Error("Netlify form submit failed");
            } else {
                // JSON to your API/DB
                const res = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) throw new Error("API submit failed");
            }

            onSuccess?.(formData);
            setFormData(DEFAULTS);
            onClose?.();
        } catch (err) {
            console.error(err);
            setErrorMsg("Something went wrong. Please try again.");
            onError?.(err);
        } finally {
            setSubmitting(false);
        }
    };

    // quick validity checks (UI only)
    const valid = useMemo(() => {
        const { name, email, phone, courseType } = formData;
        if (!name || !email || !phone || !courseType) return false;
        if (courseType === "school") {
            if (!formData.syllabus || !formData.class) return false;
            if ((formData.class === "11" || formData.class === "12") && !formData.stream) return false;
        }
        if (courseType === "language" && !formData.subCategory) return false;
        if (courseType === "skill" && !formData.subCategory) return false;
        return true;
    }, [formData]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="enquiry-title"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-1.5 hover:bg-black/20 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6 text-black" />
                            </button>
                            <h3 id="enquiry-title" className="text-2xl font-bold mb-2">Enroll Now</h3>
                            <p className="text-black/90">Fill out the form below and our team will get in touch shortly.</p>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-6">
                            {/* Netlify needs these present in markup for detection */}
                            {submitMode === "netlify" && (
                                <>
                                    <form name={netlifyFormName} data-netlify="true" netlify-honeypot={netlifyHoneypot} hidden>
                                        <input name="name" />
                                        <input name="email" />
                                        <input name="phone" />
                                    </form>
                                </>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                name={submitMode === "netlify" ? netlifyFormName : undefined}
                                data-netlify={submitMode === "netlify" ? "true" : undefined}
                                netlify-honeypot={submitMode === "netlify" ? netlifyHoneypot : undefined}
                            >
                                {/* hidden for Netlify processing */}
                                {submitMode === "netlify" && (
                                    <>
                                        <input type="hidden" name="form-name" value={netlifyFormName} />
                                        <p className="hidden">
                                            <label>
                                                Don’t fill this out if you're human:
                                                <input name={netlifyHoneypot} onChange={() => { }} />
                                            </label>
                                        </p>
                                    </>
                                )}

                                {/* Basic Info */}
                                <div className="space-y-4 md:col-span-2">
                                    <h4 className="font-medium text-lg text-[#8c52ff] mb-2">Your Information</h4>

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                                            Full Name*
                                        </label>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                                                WhatsApp Number*
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                pattern="^[0-9+\- ()]{7,}$"
                                                title="Please enter a valid phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Course Type */}
                                <div className="md:col-span-2">
                                    <h4 className="font-medium text-lg text-neutral-800 mb-2">Course Interest</h4>
                                    <div className="mb-4">
                                        <label htmlFor="courseType" className="block text-sm font-medium text-neutral-700 mb-1">
                                            What type of course are you interested in?*
                                        </label>
                                        <select
                                            id="courseType"
                                            name="courseType"
                                            value={formData.courseType}
                                            onChange={handleCourseTypeChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                        >
                                            <option value="">Select Course Type</option>
                                            <option value="school">School Tuition</option>
                                            <option value="language">Language Preparation</option>
                                            <option value="skill">Skill Course</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Conditional Fields */}
                                {formData.courseType === "school" && (
                                    <>
                                        <div>
                                            <label htmlFor="syllabus" className="block text-sm font-medium text-neutral-700 mb-1">
                                                Syllabus*
                                            </label>
                                            <select
                                                id="syllabus"
                                                name="syllabus"
                                                value={formData.syllabus}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                            >
                                                <option value="">Select Syllabus</option>
                                                <option value="cbse">CBSE</option>
                                                <option value="icse">ICSE</option>
                                                <option value="state-malayalam">State - Malayalam</option>
                                                <option value="state-english">State - English</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="class" className="block text-sm font-medium text-neutral-700 mb-1">
                                                Class*
                                            </label>
                                            <select
                                                id="class"
                                                name="class"
                                                value={formData.class}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                            >
                                                <option value="">Select Class</option>
                                                <option value="kg">KG</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i + 1} value={String(i + 1)}>
                                                        Class {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {(formData.class === "11" || formData.class === "12") && (
                                            <div className="md:col-span-2">
                                                <label htmlFor="stream" className="block text-sm font-medium text-neutral-700 mb-1">
                                                    Stream*
                                                </label>
                                                <select
                                                    id="stream"
                                                    name="stream"
                                                    value={formData.stream}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                                >
                                                    <option value="">Select Stream</option>
                                                    <option value="cs">Computer Science</option>
                                                    <option value="biomath">Bio-Math</option>
                                                    <option value="commerce">Commerce</option>
                                                    <option value="humanities">Humanities</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                {formData.courseType === "language" && (
                                    <div className="md:col-span-2">
                                        <label htmlFor="subCategory" className="block text-sm font-medium text-neutral-700 mb-1">
                                            Language Course*
                                        </label>
                                        <select
                                            id="subCategory"
                                            name="subCategory"
                                            value={formData.subCategory}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                        >
                                            <option value="">Select Language Course</option>
                                            <option value="ielts">IELTS</option>
                                            <option value="pte">PTE</option>
                                            <option value="oet">OET</option>
                                            <option value="german">German</option>
                                        </select>
                                    </div>
                                )}

                                {formData.courseType === "skill" && (
                                    <div className="md:col-span-2">
                                        <label htmlFor="subCategory" className="block text-sm font-medium text-neutral-700 mb-1">
                                            Skill Course*
                                        </label>
                                        <select
                                            id="subCategory"
                                            name="subCategory"
                                            value={formData.subCategory}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                                        >
                                            <option value="">Select Skill Course</option>
                                            <option value="data-analytics">Data Analytics</option>
                                            <option value="data-science">Data Science</option>
                                            <option value="python">Python Programming</option>
                                            <option value="communication">Communication Skills</option>
                                        </select>
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="md:col-span-2 pt-2">
                                    {errorMsg && (
                                        <div className="mb-3 rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
                                            {errorMsg}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={!valid || submitting}
                                        className="w-full py-4 bg-[#8c52ff] hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                    >
                                        {submitting ? "Submitting..." : "Submit Enquiry"}
                                    </button>
                                    <p className="text-xs text-neutral-500 text-center mt-4 pb-1.5">
                                        By submitting this form, you agree to our{" "}
                                        <a href="/privacy-policy" className="text-[#8c52ff] hover:underline">
                                            privacy policy
                                        </a>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
