import React from "react";
import { motion } from "framer-motion";
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

// very quick spring
const SPRING = { type: "spring", stiffness: 700, damping: 40, mass: 0.6 };

const fade = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
};

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
        <div
          key={idx}
          className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm"
        >
          <div className="text-xs uppercase tracking-wide text-gray-500">{it.label}</div>
          <div className="mt-1 text-sm font-semibold text-gray-800">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function CourseSection({ course, index }) {
  const isEven = index % 2 === 0;

  // 1st section renders with NO animation (instant)
  if (index === 0) {
    return (
      <section className="py-14" id={course.id}>
        <CourseInner course={course} isEven={isEven} />
      </section>
    );
  }

  // Others animate quickly when they enter view
  return (
    <motion.section
      initial={fade.initial}
      whileInView={fade.whileInView}
      viewport={fade.viewport}
      transition={{ ...SPRING, delay: index * 0.02 }}
      className="py-14 will-change-transform"
      id={course.id}
    >
      <CourseInner course={course} isEven={isEven} />
    </motion.section>
  );
}

function CourseInner({ course, isEven }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Text */}
        <div className={isEven ? "" : "lg:order-2"}>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>
              <GraduationCap className="mr-1 h-3.5 w-3.5" /> Language Prep
            </Badge>
            <Badge>
              <Clock className="mr-1 h-3.5 w-3.5" /> Flexible Schedule
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{course.title}</h2>
          <p className="mt-4 text-gray-700">{course.blurb}</p>

          {/* Highlights */}
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {course.highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <span className="mt-1 rounded-lg bg-purple-100 p-2 text-purple-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-gray-800">{h.text}</span>
                </li>
              );
            })}
          </ul>

          {/* Essentials */}
          <InfoRow items={course.essentials} />

          {/* Modules */}
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wide text-gray-500">Modules Covered</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {course.modules.map((m, i) => (
                <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
                  {m}
                </span>
              ))}
            </div>
            {course.note && <p className="mt-3 text-sm text-gray-600">{course.note}</p>}
          </div>
        </div>

        {/* Visual */}
        <div className={isEven ? "" : "lg:order-1"}>
          <div className="relative">
            {/* removed big blur for performance */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">What you’ll get</div>
                  <div className="text-sm text-gray-600">Structured plan, practice, and feedback</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-800">Unlimited Practice</div>
                  <p className="mt-1 text-sm text-gray-600">
                    Full & sectional mocks, instant scoring, detailed analytics.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-800">Personal Coaching</div>
                  <p className="mt-1 text-sm text-gray-600">
                    One-to-one sessions with targeted improvement plans.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-800">Resources</div>
                  <p className="mt-1 text-sm text-gray-600">
                    Strategy sheets, question banks, model answers & recordings.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-800">Progress Tracking</div>
                  <p className="mt-1 text-sm text-gray-600">
                    Band/Score tracking and weekly reviews to keep you on target.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  Beginner-friendly
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                  Exam-oriented
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                  <Star className="mr-1 h-3.5 w-3.5" />
                  Results-focused
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LanguagePrep() {
  // No animation wrapper at all → instant paint
  return (
    <div className="min-h-screen pt-16">
      {/* Hero — no motion, renders immediately */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Language Test Preparation</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-2xl">
            Master IELTS, PTE, OET, and German with our expert coaching programs
          </p>
        </div>
      </section>

      {/* Courses */}
      {courses.map((c, i) => (
        <CourseSection key={c.id} course={c} index={i} />
      ))}

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-[#C7A5FF]">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  Ready to Start Your Learning Journey?
                </h3>
                <p className="mt-2 text-white/90">
                  Join CP Study Center today and experience the difference our expert-led,
                  personalized approach can make in your success.
                </p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition hover:shadow-xl"
                >
                  Get Started Today
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
