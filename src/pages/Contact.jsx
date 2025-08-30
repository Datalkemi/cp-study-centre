import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [ok, setOk] = useState(false);

  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { "form-name": "contact", ...formData };
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      setOk(true);
      setFormData({ name: "", email: "", whatsapp: "", message: "" });
    } catch (err) {
      console.error(err);
      setOk(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center mt-16 sm:mb-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold inline-block relative text-neutral-900">
          Contact Us
          <motion.span
            className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-orange-500"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          />
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto mt-4">
          Get in touch with our educational consultants
        </p>
      </motion.div>

      {/* Two-column layout */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* LEFT: Contact details */}
          <aside className="lg:col-span-4 sm:mt-10">
            <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 bg-[#8c52ff] text-white ring-1 ring-white/10 shadow-xl lg:sticky lg:top-28">
              <h3 className="text-2xl text-white font-bold mb-4">Contact Details</h3>
              <p className="text-white/90 text-sm mb-6">
                We're happy to answer questions about courses, schedules, and
                admissions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-white/90 text-sm">
                      CP Study Center, Ponkunnam, Kottayam
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a
                      href="tel:+918075757437"
                      className="text-white/90 text-sm hover:underline"
                    >
                      +91 80757 57437
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href="mailto:cp.edu.in@gmail.com"
                      className="text-white/90 text-sm hover:underline"
                    >
                      cp.edu.in@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
              <div className="mt-6 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs ring-1 ring-white/20">
                Typically replies within 24 hours
              </div>
            </div>
          </aside>

          {/* RIGHT: Form */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              Get In Touch
            </h2>

            {/* Success message */}
            {ok && (
              <div
                className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
                role="alert"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5" />
                <div>
                  <div className="font-semibold">Message sent!</div>
                  <div className="text-sm">
                    Thanks for reaching out. We’ll get back to you shortly.
                  </div>
                </div>
              </div>
            )}

            {/* Netlify form */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-600 w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 focus:border-violet-600/60 placeholder:text-neutral-400"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-600 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 focus:border-violet-600/60 placeholder:text-neutral-400"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-600 w-5 h-5" />
                <input
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp Number"
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 focus:border-violet-600/60 placeholder:text-neutral-400"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 text-violet-600 w-5 h-5" />
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 focus:border-violet-600/60 placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#8c52ff] hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-violet-600/20 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
