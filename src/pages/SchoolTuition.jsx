import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  Clock,
  Award,
  Target,
  Phone,
  Mail,
} from "lucide-react";

const SchoolTuition = () => {
  const [selectedBoard, setSelectedBoard] = useState("cbse");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    board: "",
    subjects: "",
    mode: "",
  });

  const boards = [
    {
      id: "cbse",
      name: "CBSE",
      description: "Central Board of Secondary Education",
    },
    {
      id: "icse",
      name: "ICSE",
      description: "Indian Certificate of Secondary Education",
    },
    {
      id: "state",
      name: "State Board",
      description: "Various State Education Boards",
    },
  ];

  const modes = [
    {
      title: "Online Group Classes",
      description: "Interactive group sessions with 8-12 students",
      features: [
        "Live Interactive Sessions",
        "Recorded Classes",
        "Group Discussions",
        "Peer Learning",
      ],
      popular: false,
    },
    {
      title: "One-on-One Online",
      description: "Personalized attention with dedicated tutor",
      features: [
        "Individual Focus",
        "Customized Pace",
        "Flexible Timings",
        "Instant Doubt Clearing",
      ],
      popular: true,
    },
    {
      title: "Home Tuition",
      description: "Expert tutors visit your home for personalized teaching",
      features: [
        "At Your Doorstep",
        "Comfortable Environment",
        "Family Involvement",
        "Flexible Schedule",
      ],
      popular: false,
    },
  ];

  const subjects = {
    "classes-6-8": [
      "Mathematics",
      "Science",
      "English",
      "Social Studies",
      "Hindi",
    ],
    "classes-9-10": [
      "Mathematics",
      "Science",
      "English",
      "Social Studies",
      "Hindi",
      "Computer Science",
    ],
    "classes-11-12": [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Computer Science",
      "Economics",
      "Accountancy",
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              School Tuition Programs
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive academic support for CBSE, ICSE, and State Board
              students from Classes 6-12
            </p>
          </motion.div>
        </div>
      </section>

      {/* Boards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Boards We Cover
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert guidance for all major education boards with specialized
              teaching approaches
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  selectedBoard === board.id
                    ? "ring-2 ring-purple-600 shadow-xl"
                    : "hover:shadow-xl"
                }`}
                onClick={() => setSelectedBoard(board.id)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {board.name}
                </h3>
                <p className="text-gray-600">{board.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Mode
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible learning options designed to suit your schedule and
              learning preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  mode.popular ? "ring-2 ring-orange-500" : ""
                }`}
              >
                {mode.popular && (
                  <div className="bg-orange-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {mode.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{mode.description}</p>

                  {/* <div className="text-3xl font-bold text-purple-600 mb-6">
                    {mode.price}
                    <span className="text-sm text-gray-500 font-normal">
                      /month
                    </span>
                  </div> */}

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
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      mode.popular
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-purple-600 text-white hover:bg-purple-700"
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

      {/* Enquiry Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our academic counselor will contact
              you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        Class {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Board *
                  </label>
                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Board</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state">State Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Mode *
                  </label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="online-group">Online Group</option>
                    <option value="one-on-one">One-on-One</option>
                    <option value="home-tuition">Home Tuition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects of Interest
                </label>
                <textarea
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Please specify subjects you need help with..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Submit Enquiry
              </motion.button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">
                    tuition@cpstudycenter.com
                  </span>
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
