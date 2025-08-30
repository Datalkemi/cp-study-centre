import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle, Phone, Mail, CheckCircle2 } from "lucide-react";

/* ------- Helpers: class → subjects (based on common CBSE/ICSE patterns) -------
   Sources: CBSE secondary & senior secondary curricula list core subjects (IX–X: English, Hindi, Maths, Science, Social Science; electives like Computer Applications, Sanskrit, etc. XI–XII: streams with Physics, Chemistry, Biology, Maths, CS; Commerce & Humanities options) and NCERT subjects for Classes I–VIII. 
   See notes at the bottom for links. */

const subjectsForClass = (cls) => {
  // normalize
  const c = String(cls).toUpperCase();
  if (c === "KG" || c === "LKG" || c === "UKG") {
    return [
      "English (Phonics)", "Numbers", "Rhymes", "Environmental Awareness",
      "Art & Craft"
    ];
  }
  const n = Number(cls);
  if ([1, 2].includes(n)) {
    return [
      "English", "Hindi / Regional Language", "Mathematics", "EVS",
      "Computer Basics", "General Knowledge", "Art & Craft"
    ];
  }
  if ([3, 4, 5].includes(n)) {
    return [
      "English", "Hindi / Regional Language", "Mathematics", "EVS / Science",
      "Computer", "General Knowledge", "Sanskrit (Intro) / Third Language", "Art"
    ];
  }
  if ([6, 7, 8].includes(n)) {
    return [
      "English", "Second Language (Hindi/Regional)", "Mathematics", "Science",
      "Social Science", "Sanskrit / Third Language", "Computer / IT"
    ];
  }
  if ([9, 10].includes(n)) {
    return [
      "English", "Second Language (Hindi/Regional)",
      "Mathematics", "Science", "Social Science",
      "Information Technology", "Sanskrit / Third Language"
    ];
  }
  // 11–12 (offer a broad set across streams)
  return [
    // Core / common
    "English Core", "Mathematics", "Applied Mathematics",
    // Science
    "Physics", "Chemistry", "Biology", "Computer Science", "Informatics Practices",
    // Commerce
    "Accountancy", "Business Studies", "Economics",
    // Humanities
    "History", "Geography", "Political Science", "Sociology", "Psychology",
    // Other common electives seen across boards
    "Physical Education", "Fine Arts", "Legal Studies"
  ];
};

// tiny util for URL-encoded Netlify post
const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

const SchoolTuition = () => {
  const [selectedBoard, setSelectedBoard] = useState("cbse");
  const [ok, setOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    board: "",
    subjects: [],       // <-- now an array
    mode: "",
  });

  const formRef = useRef(null);

  const boards = [
    { id: "cbse", name: "CBSE", description: "Central Board of Secondary Education" },
    { id: "icse", name: "ICSE", description: "Indian Certificate of Secondary Education" },
    { id: "state", name: "State Board", description: "Various State Education Boards" },
  ];

  const modes = [
    {
      value: "online-group",
      title: "Online Group Classes",
      description: "Interactive group sessions with 8–12 students",
      features: ["Live Interactive Sessions", "Recorded Classes", "Group Discussions", "Peer Learning"],
      popular: false,
    },
    {
      value: "one-on-one",
      title: "One-on-One Online",
      description: "Personalized attention with dedicated tutor",
      features: ["Individual Focus", "Customized Pace", "Flexible Timings", "Instant Doubt Clearing"],
      popular: true,
    },
    {
      value: "home-tuition",
      title: "Home Tuition",
      description: "Expert tutors visit your home for personalized teaching",
      features: ["At Your Doorstep", "Comfortable Environment", "Family Involvement", "Flexible Schedule"],
      popular: false,
    },
  ];

  const subjectOptions = useMemo(
    () => subjectsForClass(formData.class || "KG"),
    [formData.class]
  );

  const handleInputChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const toggleSubject = (subject) =>
    setFormData((s) => {
      const has = s.subjects.includes(subject);
      const next = has ? s.subjects.filter((x) => x !== subject) : [...s.subjects, subject];
      return { ...s, subjects: next };
    });

  // choose-mode button
  const handleChooseMode = (modeValue) => {
    setFormData((s) => ({ ...s, mode: modeValue }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (formRef.current) {
      formRef.current.classList.add("ring-2", "ring-violet-500/60");
      setTimeout(() => formRef.current?.classList.remove("ring-2", "ring-violet-500/60"), 1200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Netlify expects fields; convert subjects[] to comma string
      const payload = {
        "form-name": "tuition-enquiry",
        ...formData,
        subjects: formData.subjects.join(", "),
      };
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      setOk(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        class: "",
        board: "",
        subjects: [],
        mode: "",
      });
    } catch (err) {
      console.error(err);
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen">
      {/* Hero Section (rectangular box) */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-[#8c52ff] rounded-2xl shadow-xl p-10 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School Tuition Programs</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Comprehensive academic support for CBSE, ICSE, and State Board students from KG–12
            </p>
          </motion.div>
        </div>
      </section>

      {/* Boards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Boards We Cover</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert guidance for all major education boards with specialized teaching approaches
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer transition-all duration-300 ${selectedBoard === board.id ? "ring-2 ring-purple-600 shadow-xl" : "hover:shadow-xl"
                  }`}
                onClick={() => setSelectedBoard(board.id)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{board.name}</h3>
                <p className="text-gray-600">{board.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Mode</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible learning options designed to suit your schedule and learning preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modes.map((mode, index) => (
              <motion.div
                key={mode.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${mode.popular ? "ring-2 ring-orange-500" : ""}`}
              >
                {mode.popular && <div className="bg-orange-500 text-white text-center py-2 text-sm font-medium">Most Popular</div>}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.title}</h3>
                  <p className="text-gray-600 mb-4">{mode.description}</p>

                  <ul className="space-y-3 mb-8">
                    {mode.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChooseMode(mode.value)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${mode.popular ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                  >
                    Choose This Mode
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form (Netlify-recognisable) */}
      <section className="py-16 bg-gray-50" id="enquiry">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our academic counselor will contact you within 24 hours
            </p>
          </motion.div>

          {/* success banner */}
          {ok && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800" role="alert">
              <CheckCircle2 className="w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold">Thanks! Your enquiry has been received.</div>
                <div className="text-sm">We’ll reach out shortly to schedule your free 3-day session.</div>
              </div>
            </div>
          )}

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form
              name="tuition-enquiry"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* required for Netlify Forms */}
              <input type="hidden" name="form-name" value="tuition-enquiry" />
              <p className="hidden">
                <label>Don’t fill this out: <input name="bot-field" onChange={() => { }} /></label>
              </p>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  />
                </div>
              </div>

              {/* Phone & Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                  <select
                    name="class" value={formData.class} onChange={(e) => {
                      const val = e.target.value;
                      setFormData((s) => ({ ...s, class: val, subjects: [] })); // reset selected subjects on class change
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  >
                    <option value="">Select Class</option>
                    <option value="KG">KG</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>{num === 1 ? "Class 1" : `Class ${num}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Board & Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board *</label>
                  <select
                    name="board" value={formData.board} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  >
                    <option value="">Select Board</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state">State Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Mode *</label>
                  <select
                    name="mode" value={formData.mode} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required
                  >
                    <option value="">Select Mode</option>
                    <option value="online-group">Online Group</option>
                    <option value="one-on-one">One-on-One</option>
                    <option value="home-tuition">Home Tuition</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Subjects (checkbox chips) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects *</label>
                {!formData.class ? (
                  <p className="text-sm text-gray-500">Select a class to see subjects.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((subj) => {
                      const active = formData.subjects.includes(subj);
                      return (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => toggleSubject(subj)}
                          className={`px-3 py-2 rounded-full text-sm border transition-all
                            ${active ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-700 border-gray-300 hover:border-violet-400"}`}
                          aria-pressed={active}
                        >
                          {subj}
                        </button>
                      );
                    })}
                  </div>
                )}
                <input type="hidden" name="subjects" value={formData.subjects.join(", ")} />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                disabled={submitting}
                className={`w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${submitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                  }`}
              >
                {submitting ? "Submitting..." : "Enroll for a free 3-day session"}
              </motion.button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">+91 80757 57437</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">cp.edu.in@gmail.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default SchoolTuition;
