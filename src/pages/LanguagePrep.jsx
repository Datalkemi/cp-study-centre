import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Cpu,
  Headphones,
  MessageSquare,
  Languages,
  Mic,
  PenTool,
  FileText,
  GraduationCap,
  Star,
} from "lucide-react";
import EnquiryModal from "../components/EnquiryModal";

/* ---------- Data ---------- */
const courses = [
  {
    id: "ielts",
    title: "IELTS (Academic & General Training)",
    blurb:
      "Our IELTS training is designed to make cracking the test simple and stress-free. Each student receives personalized, one-to-one guidance with a flexible schedule. With unlimited practice tests, AI-powered scoring, and targeted feedback, we help you steadily improve in all four modules and confidently achieve your target band.",
    highlights: [
      { icon: CheckCircle2, text: "Personalised 1-to-1 guidance" },
      { icon: Cpu, text: "AI-powered scoring & analytics" },
      { icon: BookOpen, text: "Unlimited full & sectional mocks" },
      { icon: Headphones, text: "Speaking interviews with feedback" },
    ],
    essentials: [
      { label: "Formats", value: "Academic & General Training" },
      { label: "Duration", value: "4–8 weeks (typical)" },
      { label: "Mode", value: "Online or On-campus" },
      { label: "Class Size", value: "1-to-1 / Small Group" },
    ],
    modules: ["Listening", "Reading", "Writing Task 1 & 2", "Speaking"],
    note: "Curriculum is customised to your band target after a diagnostic test.",
  },
  {
    id: "pte",
    title: "PTE (Academic, Core & UKVI)",
    blurb:
      "We provide a tech-driven PTE learning experience with advanced AI evaluation and a massive pool of practice materials. Attempt unlimited sectionals and full-length mocks while our trainers create a structured plan based on your skills. Whether it’s Academic, Core, or UKVI, our real-time performance tracking makes success achievable.",
    highlights: [
      { icon: Cpu, text: "Real-time AI evaluation" },
      { icon: FileText, text: "Huge bank of scored questions" },
      { icon: Star, text: "Targeted templates & strategies" },
      { icon: Clock, text: "Flexible timings & fast prep" },
    ],
    essentials: [
      { label: "Versions", value: "Academic • Core • UKVI" },
      { label: "Duration", value: "3–6 weeks (typical)" },
      { label: "Mode", value: "Online or On-campus" },
      { label: "Practice", value: "Unlimited mocks with feedback" },
    ],
    modules: ["Speaking & Writing", "Reading", "Listening"],
  },
  {
    id: "oet",
    title: "OET (Occupational English Test)",
    blurb:
      "Tailored for healthcare professionals, our OET program focuses on clinical tasks and real-world communication. Get individualized coaching, regular mock tests, and scenario-based practice that builds confidence in all four sub-tests and prepares you for day-to-day professional interactions abroad.",
    highlights: [
      { icon: MessageSquare, text: "Role-plays & scenario training" },
      { icon: BookOpen, text: "Healthcare-specific material" },
      { icon: CheckCircle2, text: "Individualised feedback loops" },
      { icon: Headphones, text: "Speaking drills for profession" },
    ],
    essentials: [
      { label: "For", value: "Doctors • Nurses • Dentists • Allied Health" },
      { label: "Duration", value: "4–8 weeks (typical)" },
      { label: "Mode", value: "Online or On-campus" },
      { label: "Assessment", value: "Weekly mocks + review" },
    ],
    modules: ["Listening", "Reading", "Writing (profession-specific)", "Speaking (profession-specific)"],
    note: "Lesson plans reflect your profession’s tasks and documentation style.",
  },
  {
    id: "german",
    title: "German Language Training (A1–B2)",
    blurb:
      "Our German program blends practical communication with exam preparation. Covering A1 to B2, we use real-life scenarios, speaking practice, grammar drills, and exam strategies so you build confidence for everyday use and certification success.",
    highlights: [
      { icon: Languages, text: "Communicative, real-life focus" },
      { icon: Mic, text: "Speaking & pronunciation labs" },
      { icon: PenTool, text: "Grammar made practical" },
      { icon: BookOpen, text: "Goethe/ÖSD exam strategies" },
    ],
    essentials: [
      { label: "Levels", value: "A1 • A2 • B1 • B2" },
      { label: "Pace", value: "Standard or Fast-track" },
      { label: "Mode", value: "Online or On-campus" },
      { label: "Practice", value: "Regular tests + projects" },
    ],
    modules: ["Vocabulary & Grammar", "Listening & Reading", "Speaking & Writing", "Exam Techniques"],
  },
  {
    id: "spoken-english",
    title: "Spoken & Communicative English",
    blurb:
      "This course builds real-world fluency—not just textbook English. After a level check, we create a roadmap to improve grammar, vocabulary, and confident conversation through role-plays and practical scenarios for daily life, academics, and work.",
    highlights: [
      { icon: MessageSquare, text: "Conversation-first sessions" },
      { icon: CheckCircle2, text: "Level-based personalised plan" },
      { icon: Headphones, text: "Accent clarity & listening" },
      { icon: BookOpen, text: "Business & academic contexts" },
    ],
    essentials: [
      { label: "Tracks", value: "General • Academic • Workplace" },
      { label: "Duration", value: "Ongoing / Module-wise" },
      { label: "Mode", value: "Online or On-campus" },
      { label: "Format", value: "1-to-1 or Small Group" },
    ],
    modules: ["Fluency & Confidence", "Vocabulary Building", "Grammar in Use", "Presentations & Interviews"],
  },
];

/* ---------- UI bits ---------- */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-200">
      {children}
    </span>
  );
}

function InfoRow({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm">
          <div className="text-xs uppercase tracking-wide text-gray-500">{it.label}</div>
          <div className="mt-1 text-sm font-semibold text-gray-800">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Tabs ---------- */
const COURSE_IDS = courses.map((c) => c.id);
const isValidId = (id) => COURSE_IDS.includes(id);

function useTabFromHash(defaultId) {
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.replace("#", "");
    return isValidId(h) ? h : defaultId;
  });

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (isValidId(h)) setTab(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const set = (id) => {
    if (!isValidId(id)) return;
    setTab(id);
    // update hash so we can deep-link
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
    // scroll to top of the tab panel
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [tab, set];
}

/* ---------- Main ---------- */
export default function LanguagePrep() {
  const [activeId, setActiveId] = useTabFromHash("ielts");

  // enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);

  // map course id → EnquiryModal prefill
  const prefillByCourse = useMemo(
    () => ({
      ielts: { courseType: "language", subCategory: "ielts" },
      pte: { courseType: "language", subCategory: "pte" },
      oet: { courseType: "language", subCategory: "oet" },
      german: { courseType: "language", subCategory: "german" },
      "spoken-english": { courseType: "language", subCategory: "spoken english" },
    }),
    []
  );

  const openEnroll = (courseId) => {
    setPrefill(prefillByCourse[courseId] || { courseType: "language", subCategory: "" });
    setIsEnquiryOpen(true);
  };

  const activeCourse = courses.find((c) => c.id === activeId) || courses[0];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Language Test Preparation</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-2xl">
            Master IELTS, PTE, OET, and German with our expert coaching programs
          </p>
        </div>
      </section>

      {/* Tabs header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div
          role="tablist"
          aria-label="Language prep tabs"
          className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
        >
          {courses.map((c) => {
            const selected = c.id === activeId;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                id={`tab-${c.id}`}
                onClick={() => setActiveId(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selected
                  ? "bg-[#8c52ff] text-white shadow"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {c.title.split(" ")[0] /* short label: IELTS/PTE/OET/German/Spoken */}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab panel */}
      <section
        id={`panel-${activeCourse.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeCourse.id}`}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
      >
        <CoursePanel course={activeCourse} onEnroll={() => openEnroll(activeCourse.id)} />
      </section>

      {/* Modal — Enquiry */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        prefill={prefill}
        // submitMode="netlify"  // default is netlify; switch to "api" when your backend is ready
        onSuccess={() => console.log("Enquiry submitted")}
        onError={(e) => console.error(e)}
      />
    </div>
  );
}

/* ---------- Panel content ---------- */
function CoursePanel({ course, onEnroll }) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      {/* Text side */}
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>
            <GraduationCap className="mr-1 h-3.5 w-3.5" /> Language Prep
          </Badge>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {course.title}
        </h2>

        <p className="mt-4 text-gray-700">{course.blurb}</p>

        {/* Highlights */}
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {course.highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <span className="mt-1 rounded-lg bg-purple-100 p-2 text-purple-700">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {h.text}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Essentials */}
        <InfoRow items={course.essentials} />

        {/* Modules */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Modules Covered
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {course.modules.map((m, i) => (
              <span
                key={i}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700"
              >
                {m}
              </span>
            ))}
          </div>
          {course.note && (
            <p className="mt-3 text-sm text-gray-600">{course.note}</p>
          )}
        </div>
      </div>

      {/* Visual / Info card with the ONLY CTA */}
      <div>
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                What you’ll get
              </div>
              <div className="text-sm text-gray-600">
                Structured plan, practice, and feedback
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-800">
                Unlimited Practice
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Full & sectional mocks, instant scoring, detailed analytics.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-800">
                Personal Coaching
              </div>
              <p className="mt-1 text-sm text-gray-600">
                One-to-one sessions with targeted improvement plans.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-800">
                Resources
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Strategy sheets, question banks, model answers & recordings.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-800">
                Progress Tracking
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Band/Score tracking and weekly reviews to keep you on target.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full rounded-xl bg-[#8c52ff] px-4 py-3 text-white font-semibold shadow-md transition hover:bg-[#7741f6]"
              onClick={onEnroll}
              aria-label="Enroll now for a free 3-day session"
            >
              Enroll Now for a free 3-day Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
