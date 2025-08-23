import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEnquiryModal } from "../context/EnquiryModalContext";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    courseType: "",
    subCategory: "",
    syllabus: "",
    class: "",
    stream: "",
};

const classes11or12 = new Set(["11", "12"]);

export default function EnquiryModalRoot() {
    const prefersReducedMotion = useReducedMotion();
    const { isOpen, close, initialData } = useEnquiryModal();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const firstFieldRef = useRef(null);

    // Reset form whenever the modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({ ...initialForm, ...(initialData || {}) }));
            setErrors({});
            setTouched({});
            setSubmitted(false);
            // next tick focus
            setTimeout(() => firstFieldRef.current?.focus(), 50);
            // lock scroll
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => (document.body.style.overflow = prev);
        }
    }, [isOpen, initialData]);

    const update = (name, value) => {
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleCourseTypeChange = (value) => {
        // reset dependent fields
        setFormData((p) => ({
            ...p,
            courseType: value,
            subCategory: "",
            syllabus: "",
            class: "",
            stream: "",
        }));
    };

    const phoneDigits = useMemo(
        () => (formData.phone || "").replace(/[^\d]/g, ""),
        [formData.phone]
    );

    // ---------- Validation ----------
    const validate = (values) => {
        const e = {};
        const emailOk = /^\S+@\S+\.\S+$/.test(values.email || "");
        const nameOk = (values.name || "").trim().length >= 2;

        // name/email/phone basic
        if (!nameOk) e.name = "Please enter your full name.";
        if (!emailOk) e.email = "Enter a valid email address.";
        if (phoneDigits.length < 7 || phoneDigits.length > 15)
            e.phone = "Enter a valid phone number (7–15 digits).";

        // course
        if (!values.courseType) e.courseType = "Please select a course type.";

        // conditional requirements
        if (values.courseType === "school") {
            if (!values.syllabus) e.syllabus = "Select a syllabus.";
            if (!values.class) e.class = "Select a class.";
            if (classes11or12.has(values.class) && !values.stream)
                e.stream = "Select a stream.";
        }
        if (values.courseType === "language" && !values.subCategory) {
            e.subCategory = "Select a language course.";
        }
        if (values.courseType === "skill" && !values.subCategory) {
            e.subCategory = "Select a skill course.";
        }

        return e;
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors(validate(formData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate(formData);
        setTouched({
            name: true,
            email: true,
            phone: true,
            courseType: true,
            subCategory: true,
            syllabus: true,
            class: true,
            stream: true,
        });
        setErrors(v);

        if (Object.keys(v).length === 0) {
            // ✅ DEMO: pretend submission succeeded
            setSubmitted(true);

            // Optionally auto-close after a short delay
            // setTimeout(() => close(), 1600);
        }
    };

    // ---------- UI ----------
    const inputBase =
        "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all";
    const borderOk = (field) =>
        touched[field] && errors[field]
            ? "border-red-400"
            : "border-neutral-300";
    const helper = (field) =>
        touched[field] && errors[field] ? (
            <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
        ) : null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[120] p-4 sm:p-8"
                    onClick={close}
                >
                    <motion.div
                        initial={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: prefersReducedMotion ? 1 : 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative">
                            <button
                                onClick={close}
                                className="absolute top-4 right-4 p-1.5 hover:bg-black/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-black" />
                            </button>
                            <h3 className="text-2xl font-bold mb-2">Enroll Now</h3>
                            <p className="text-black/90">
                                Fill out the form below and our team will get in touch shortly.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-6">
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Section */}
                                    <div className="space-y-4 md:col-span-2">
                                        <h4 className="font-medium text-lg text-[#8c52ff] mb-2">
                                            Your Information
                                        </h4>

                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                                                Full Name*
                                            </label>
                                            <input
                                                ref={firstFieldRef}
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => update("name", e.target.value)}
                                                onBlur={handleBlur}
                                                className={`${inputBase} ${borderOk("name")}`}
                                            />
                                            {helper("name")}
                                        </div>

                                        {/* Email + Phone */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                                    Email Address*
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => update("email", e.target.value)}
                                                    onBlur={handleBlur}
                                                    className={`${inputBase} ${borderOk("email")}`}
                                                />
                                                {helper("email")}
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                                                    WhatsApp Number*
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    inputMode="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => update("phone", e.target.value)}
                                                    onBlur={handleBlur}
                                                    className={`${inputBase} ${borderOk("phone")}`}
                                                />
                                                {helper("phone")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Interest */}
                                    <div className="md:col-span-2">
                                        <h4 className="font-medium text-lg text-neutral-800 mb-2">
                                            Course Interest
                                        </h4>

                                        <div className="mb-4">
                                            <label htmlFor="courseType" className="block text-sm font-medium text-neutral-700 mb-1">
                                                What type of course are you interested in?*
                                            </label>
                                            <select
                                                id="courseType"
                                                name="courseType"
                                                value={formData.courseType}
                                                onChange={(e) => handleCourseTypeChange(e.target.value)}
                                                onBlur={handleBlur}
                                                className={`${inputBase} ${borderOk("courseType")}`}
                                            >
                                                <option value="">Select Course Type</option>
                                                <option value="school">School Tuition</option>
                                                <option value="language">Language Preparation</option>
                                                <option value="skill">Skill Course</option>
                                            </select>
                                            {helper("courseType")}
                                        </div>
                                    </div>

                                    {/* Conditional groups */}
                                    {formData.courseType === "school" && (
                                        <>
                                            <div>
                                                <label htmlFor="syllabus" className="block text-sm font-medium text-neutral-700 mb-1">
                                                    Syllabus*
                                                </label>
                                                <select
                                                    id="syllabus"
                                                    value={formData.syllabus}
                                                    onChange={(e) => update("syllabus", e.target.value)}
                                                    onBlur={handleBlur}
                                                    className={`${inputBase} ${borderOk("syllabus")}`}
                                                >
                                                    <option value="">Select Syllabus</option>
                                                    <option value="cbse">CBSE</option>
                                                    <option value="icse">ICSE</option>
                                                    <option value="state-malayalam">State - Malayalam</option>
                                                    <option value="state-english">State - English</option>
                                                </select>
                                                {helper("syllabus")}
                                            </div>

                                            <div>
                                                <label htmlFor="class" className="block text-sm font-medium text-neutral-700 mb-1">
                                                    Class*
                                                </label>
                                                <select
                                                    id="class"
                                                    value={formData.class}
                                                    onChange={(e) => update("class", e.target.value)}
                                                    onBlur={handleBlur}
                                                    className={`${inputBase} ${borderOk("class")}`}
                                                >
                                                    <option value="">Select Class</option>
                                                    <option value="kg">KG</option>
                                                    <option value="1">Class 1</option>
                                                    <option value="2">Class 2</option>
                                                    <option value="3">Class 3</option>
                                                    <option value="4">Class 4</option>
                                                    <option value="5">Class 5</option>
                                                    <option value="6">Class 6</option>
                                                    <option value="7">Class 7</option>
                                                    <option value="8">Class 8</option>
                                                    <option value="9">Class 9</option>
                                                    <option value="10">Class 10</option>
                                                    <option value="11">Class 11</option>
                                                    <option value="12">Class 12</option>
                                                </select>
                                                {helper("class")}
                                            </div>

                                            {classes11or12.has(formData.class) && (
                                                <div className="md:col-span-2">
                                                    <label htmlFor="stream" className="block text-sm font-medium text-neutral-700 mb-1">
                                                        Stream*
                                                    </label>
                                                    <select
                                                        id="stream"
                                                        value={formData.stream}
                                                        onChange={(e) => update("stream", e.target.value)}
                                                        onBlur={handleBlur}
                                                        className={`${inputBase} ${borderOk("stream")}`}
                                                    >
                                                        <option value="">Select Stream</option>
                                                        <option value="cs">Computer Science</option>
                                                        <option value="biomath">Bio-Math</option>
                                                        <option value="commerce">Commerce</option>
                                                        <option value="humanities">Humanities</option>
                                                    </select>
                                                    {helper("stream")}
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
                                                value={formData.subCategory}
                                                onChange={(e) => update("subCategory", e.target.value)}
                                                onBlur={handleBlur}
                                                className={`${inputBase} ${borderOk("subCategory")}`}
                                            >
                                                <option value="">Select Language Course</option>
                                                <option value="ielts">IELTS</option>
                                                <option value="pte">PTE</option>
                                                <option value="oet">OET</option>
                                                <option value="german">German</option>
                                            </select>
                                            {helper("subCategory")}
                                        </div>
                                    )}

                                    {formData.courseType === "skill" && (
                                        <div className="md:col-span-2">
                                            <label htmlFor="subCategorySkill" className="block text-sm font-medium text-neutral-700 mb-1">
                                                Skill Course*
                                            </label>
                                            <select
                                                id="subCategorySkill"
                                                value={formData.subCategory}
                                                onChange={(e) => update("subCategory", e.target.value)}
                                                onBlur={handleBlur}
                                                className={`${inputBase} ${borderOk("subCategory")}`}
                                            >
                                                <option value="">Select Skill Course</option>
                                                <option value="data-analytics">Data Analytics</option>
                                                <option value="data-science">Data Science</option>
                                                <option value="python">Python Programming</option>
                                                <option value="communication">Communication Skills</option>
                                            </select>
                                            {helper("subCategory")}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <div className="md:col-span-2 pt-4">
                                        {/* show a compact banner when there are errors after submit */}
                                        {Object.keys(errors).length > 0 && Object.values(touched).some(Boolean) && (
                                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                                                Please correct the highlighted fields.
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-[#8c52ff] hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                        >
                                            Submit Enquiry
                                        </button>
                                        <p className="text-xs text-neutral-500 text-center mt-4 pb-5">
                                            By submitting this form, you agree to our{" "}
                                            <Link to="/privacy-policy" className="text-[#8c52ff] hover:underline">
                                                privacy policy
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </form>
                            ) : (
                                // ✅ Success state (no networking)
                                <div className="py-12 text-center">
                                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-neutral-800">Thanks! We received your enquiry.</h3>
                                    <p className="text-neutral-600 mt-2">
                                        Our team will get in touch with you shortly at{" "}
                                        <span className="font-medium text-neutral-800">{formData.email}</span>.
                                    </p>
                                    <div className="mt-8 flex items-center justify-center gap-3 pb-8">
                                        <button
                                            className="px-5 py-3 rounded-lg border border-neutral-300 hover:bg-neutral-50"
                                            onClick={close}
                                        >
                                            Close
                                        </button>
                                        <Link
                                            to="/contact"
                                            onClick={close}
                                            className="px-5 py-3 rounded-lg bg-[#8c52ff] text-white hover:bg-primary-dark"
                                        >
                                            Contact us
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
