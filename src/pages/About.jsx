import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Star,
  Compass,
  Smile,
  UserCheck,
  Map,
  Globe2,
  Zap,
  Lightbulb,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const About = () => {
  const [openSection, setOpenSection] = useState("Mission");

  const sections = [
    {
      key: "Mission",
      content:
        "Our mission is to empower students with real-world skills, critical thinking, and global opportunities — far beyond the classroom.",
    },
    {
      key: "Vision",
      content:
        "We envision a trusted hybrid learning ecosystem that empowers students, expands meaningful educational access, and inspires a global community of learners.",
    },
    {
      key: "Values",
      content: [
        {
          title: "Curiosity-Led Exploration",
          text: "We fuel inquisitive minds and lifelong learning.",
          icon: Compass,
        },
        {
          title: "Joyful Learning Culture",
          text: "Education that’s engaging, light, and enjoyable.",
          icon: Smile,
        },
        {
          title: "Empowered Student Journeys",
          text: "We inspire every learner’s unique growth path.",
          icon: UserCheck,
        },
        {
          title: "Strength-Based Discovery",
          text: "Uncovering talents, interests, and natural skills.",
          icon: Star,
        },
        {
          title: "Purpose-Driven Career Mapping",
          text: "Linking education to real, meaningful futures.",
          icon: Map,
        },
        {
          title: "Future-Ready Curriculum",
          text: "Aligned with evolving industries and global trends.",
          icon: Globe2,
        },
        {
          title: "Agile, Personalized Pedagogy",
          text: "Flexible teaching that adapts to every learner.",
          icon: Zap,
        },
        {
          title: "Innovation & Design Thinking",
          text: "Problem-solving through creativity and strategic thinking.",
          icon: Lightbulb,
        },
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "CP Study Center helped me jump from a C to an A. The mentoring was practical and motivating.",
      name: "Samira Khan",
      role: "Year 12 · Methods",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      quote:
        "Personalized study plan + weekly check-ins = consistency I never had before.",
      name: "Vikram Singh",
      role: "Undergrad · Data Structures",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      quote:
        "Tutors explain complex ideas in simple steps. I actually enjoy revision now.",
      name: "Fatima Zahra",
      role: "IELTS Prep",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&h=200&fit=crop",
      rating: 4,
    },
    {
      quote:
        "The mock tests and feedback loop were game-changers for my confidence.",
      name: "Daniel Lee",
      role: "Year 11 · Chemistry",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      quote:
        "Loved the hybrid model. Flexible, responsive, and super supportive faculty.",
      name: "Aisha Mohammed",
      role: "Foundation · Academic English",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      quote:
        "Clear roadmaps and bite-sized lessons kept me on track before finals.",
      name: "Noah Carter",
      role: "Undergrad · Calculus",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop",
      rating: 4,
    },
  ];

  // for carousel scroll buttons
  const scrollerRef = useRef(null);
  const scrollByCard = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const gap = 24; // matches gap-6 (6*4)
    const step = card ? card.clientWidth + gap : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16"
    >
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CP Study Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Learn more about our mission, vision, and dedicated team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((sec) => (
            <div
              key={sec.key}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenSection(openSection === sec.key ? "" : sec.key)
                }
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-xl font-semibold text-gray-800">
                  {sec.key}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                    openSection === sec.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSection === sec.key && (
                <div className="px-6 py-4 text-gray-700">
                  {Array.isArray(sec.content) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sec.content.map((item, i) => {
                        const Icon = item.icon ?? Star;
                        return (
                          <div
                            key={i}
                            className="group p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                                <Icon className="w-5 h-5 text-gray-700" />
                              </span>
                              <h3 className="font-semibold text-gray-900">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-gray-600">{item.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="leading-relaxed">{sec.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Team Profiles (unchanged) */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Akshay Biju",
                role: "CEO & Co-founder",
                avatar: "./assets/team/Akshay.png",
                bio: "CEO & Co-Founder of CP Study Center, with 3+ years in language training, communication, and skill development. Trained 1000+ students for global education and career success. Leads impactful programs in test preparation, student mentoring, and career readiness. BCA graduate from Kerala University, focused on real-world learning and impact.",
              },
              {
                name: "Aravind B",
                role: "Co-founder",
                avatar: "./assets/team/Aravind.png",
                bio: "Financial Analyst at JP Morgan with expertise in data modeling, analytics, and financial forecasting. 3+ years of teaching experience in Mathematics and Finance. MBA in Finance (Symbiosis) and B.Tech in EEE (GEC Barton Hill); Alteryx certified. Co-founded a startup and led multiple student initiatives with a focus on real-world problem solving.",
              },
              {
                name: "Arun S",
                role: "Advisory Partner",
                avatar: "./assets/team/Arun.png",
                bio: "M.Phil. from JNU, M.A. from University of Hyderabad, UGC-NET qualified, and UG university rank holder. 7+ years of teaching experience across school, college, and UPSC platforms. Worked as an educator at reputed IAS academies like iLearn and Fortune IAS. Known for clear explanations, student engagement, and modern teaching style.",
              },
            ].map((member) => (
              <div key={member.name} className="relative group">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-60 h-60 rounded-full mx-auto mb-4 object-cover shadow-card"
                />
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center mb-2">{member.role}</p>
                <div className="absolute inset-0 bg-[#8c52ff] bg-opacity-70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                  <p className="text-white text-md ">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel (updated) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Students Say
            </h2>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollByCard(-1)}
                className="p-2 rounded-lg border bg-white hover:bg-gray-50"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                className="p-2 rounded-lg border bg-white hover:bg-gray-50"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Gradient edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

            {/* Scroller */}
            <div
              ref={scrollerRef}
              className="flex overflow-x-auto gap-6 pr-2 pl-2 snap-x snap-mandatory custom-scrollbar"
            >
              {testimonials.map((t, i) => (
                <article
                  key={i}
                  data-card
                  className="flex-none w-80 snap-center bg-gray-50 rounded-2xl shadow-md p-6 border border-gray-100"
                >
                  <MessageSquare className="w-6 h-6 text-purple-600 mb-3" />
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    “{t.quote}”
                  </p>

                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 mr-1 ${
                          idx < t.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        style={{
                          fill: idx < t.rating ? "currentColor" : "none",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 leading-tight">
                        {t.name}
                      </div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Mobile buttons */}
          <div className="mt-6 flex md:hidden justify-center gap-3">
            <button
              onClick={() => scrollByCard(-1)}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              Prev
            </button>
            <button
              onClick={() => scrollByCard(1)}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Scoped scrollbar styles */}
        <style>{`
          .custom-scrollbar {
            scrollbar-color: #cbd5e1 #f8fafc;
            scrollbar-width: thin;
          }
          .custom-scrollbar::-webkit-scrollbar { height: 10px; }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f8fafc; border-radius: 999px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1; border-radius: 999px; border: 2px solid #f8fafc;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}</style>
      </section>
    </motion.div>
  );
};

export default About;
