// src/pages/Courses.jsx
import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Languages, Laptop } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import the existing pages to embed:
import SchoolTuition from "./SchoolTuition";
import LanguagePrep from "./LanguagePrep";
import SkillCourses from "./SkillCourses";

// Tabs config: id ↔ label ↔ icon ↔ component
const TABS = [
  { id: "school-tuition", label: "School Tuition", Icon: GraduationCap, Component: SchoolTuition },
  { id: "language-prep", label: "Language Preparation", Icon: Languages, Component: LanguagePrep },
  { id: "skill-courses", label: "Skill Courses", Icon: Laptop, Component: SkillCourses },
];

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Courses() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const currentId = params.get("tab") || "school-tuition";
  const active = TABS.find((t) => t.id === currentId) || TABS[0];

  // Normalize URL if no tab specified
  useEffect(() => {
    if (!params.get("tab")) {
      const p = new URLSearchParams(params);
      p.set("tab", active.id);
      setParams(p, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabClick = (id) => {
    if (id === currentId) return;
    const p = new URLSearchParams(params);
    p.set("tab", id);
    setParams(p, { replace: true });
    // scroll to top on tab change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16">
      {/* Page header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold inline-block relative text-neutral-900">
          Our Educational Programs
          <motion.span
            className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-[#8c52ff] to-[#ff6b00]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          />
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto mt-4">
          Choose a category below to view the full page right here.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap justify-center gap-3">
          {TABS.map(({ id, label, Icon }) => {
            const selected = id === active.id;
            return (
              <button
                key={id}
                onClick={() => onTabClick(id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border transition-all
                  ${selected
                    ? "bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white border-[#9a69ff]/30 shadow-lg shadow-[#8c52ff]/30"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-[#8c52ff]/40 hover:shadow-md"}`}
                aria-current={selected ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded page (kept exactly as your standalone pages) */}
      <div className="relative">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-neutral-500">
              Loading…
            </div>
          }
        >
          <active.Component />
        </Suspense>
      </div>
    </motion.div>
  );
}
