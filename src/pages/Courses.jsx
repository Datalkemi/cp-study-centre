import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Globe,
  TrendingUp,
  ChevronRight,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  Target,
  Calendar,
  CheckCircle,
  Sparkles,
  Languages,
  Laptop,
  ArrowRight,
} from 'lucide-react';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('school-tuition');

  const tabs = [
    { id: 'school-tuition', name: 'School Tuition', icon: GraduationCap },
    { id: 'language-prep', name: 'Language Preparation', icon: Languages },
    { id: 'skill-courses', name: 'Skill Courses', icon: Laptop },
  ];

  const courseData = {
    'school-tuition': {
      title: 'School Tuition Programs',
      description:
        "Expert-led academic support tailored to each student's learning style and curriculum needs",
      courses: [
        {
          title: 'CBSE Tuition',
          description:
            'Comprehensive NCERT-based teaching to excel in CBSE examinations',
          features: [
            'Qualified subject experts',
            'Regular mock tests',
            'Weekly progress reports',
            'Doubt clearing sessions',
          ],
          duration: '1 Academic Year',
          students: '2000+',
          rating: 4.9,
          price: '₹15,000',
          link: '/school-tuition',
          image: '/public/images/cbse.jpg',
          color: 'from-blue-600 to-indigo-700',
          highlight: 'Featured',
        },
        {
          title: 'ICSE Tuition',
          description:
            'Holistic approach to master the application-based ICSE curriculum',
          features: [
            'Concept-based learning',
            'Project assistance',
            'Language skill development',
            'Small batch sizes (6-8)',
          ],
          duration: '1 Academic Year',
          students: '1200+',
          rating: 4.8,
          price: '₹16,500',
          link: '/school-tuition',
          image: '/public/images/icse.jpg',
          color: 'from-teal-600 to-emerald-700',
        },
        {
          title: 'State Board - English',
          description:
            'Specialized coaching aligned with state syllabus in English medium',
          features: [
            'Subject-wise tutoring',
            'Exam-oriented practice',
            'Bilingual explanations',
            'Study material provided',
          ],
          duration: '1 Academic Year',
          students: '1800+',
          rating: 4.7,
          price: '₹14,000',
          link: '/school-tuition',
          image: '/public/images/state-english.jpg',
          color: 'from-cyan-600 to-blue-700',
        },
        {
          title: 'State Board - Malayalam',
          description:
            'Expert coaching in Malayalam medium with specialized subject teachers',
          features: [
            'Native language instruction',
            'Question bank solutions',
            'Regular assessment',
            'Parent-teacher meetings',
          ],
          duration: '1 Academic Year',
          students: '1500+',
          rating: 4.8,
          price: '₹14,000',
          link: '/school-tuition',
          image: '/public/images/state-malayalam.jpg',
          color: 'from-green-600 to-teal-700',
        },
      ],
    },
    'language-prep': {
      title: 'Language Preparation Courses',
      description:
        'Accelerate your language proficiency with our specialized training programs for international tests and language acquisition',
      courses: [
        {
          title: 'IELTS Preparation',
          description:
            'Comprehensive training for all modules - Listening, Reading, Writing and Speaking',
          features: [
            'Band score targeting',
            'Mock tests with feedback',
            'Individual speaking sessions',
            'Vocabulary enhancement',
          ],
          duration: '8 Weeks',
          students: '1500+',
          rating: 4.9,
          price: '₹18,000',
          link: '/language-prep',
          image: '/public/images/ielts.jpg',
          color: 'from-primary to-indigo-700',
          highlight: 'Most Popular',
        },
        {
          title: 'PTE Academic',
          description:
            'Computer-based test preparation focusing on all PTE formats and question types',
          features: [
            'Computer-based practice',
            'Score improvement strategies',
            'Time management techniques',
            'Personalized feedback',
          ],
          duration: '6 Weeks',
          students: '950+',
          rating: 4.8,
          price: '₹16,000',
          link: '/language-prep',
          image: '/public/images/pte.jpg',
          color: 'from-amber-600 to-accent',
        },
        {
          title: 'OET Training',
          description:
            'Healthcare-specific English test preparation for medical professionals',
          features: [
            'Medical terminology focus',
            'Role-play practice',
            'Healthcare communications',
            'Exam strategies',
          ],
          duration: '8 Weeks',
          students: '700+',
          rating: 4.7,
          price: '₹19,500',
          link: '/language-prep',
          image: '/public/images/oet.jpg',
          color: 'from-blue-500 to-primary',
        },
        {
          title: 'German Language',
          description:
            'Structured German language training from A1 to B2 levels',
          features: [
            'Native German teachers',
            'Interactive sessions',
            'Cultural insights',
            'Goethe exam preparation',
          ],
          duration: '12 Weeks per level',
          students: '600+',
          rating: 4.7,
          price: '₹16,000 per level',
          link: '/language-prep',
          image: '/public/images/german.jpg',
          color: 'from-neutral-700 to-neutral-900',
        },
      ],
    },
    'skill-courses': {
      title: 'Skill Development Courses',
      description:
        'Future-ready professional skills to enhance your career prospects in the digital economy',
      isComingSoon: true,
      courses: [
        {
          title: 'Data Analytics',
          description:
            'Learn to analyze complex datasets and derive valuable insights for business decisions',
          features: [
            'Excel & Power BI',
            'SQL fundamentals',
            'Data visualization',
            'Statistical analysis',
          ],
          duration: '12 Weeks',
          students: 'Coming Soon',
          rating: null,
          price: 'To be announced',
          link: '/skill-courses',
          image: '/public/images/data-analytics.jpg',
          color: 'from-blue-600 to-primary',
          locked: true,
        },
        {
          title: 'Data Science',
          description:
            'Comprehensive program covering Python, machine learning, and predictive modeling',
          features: [
            'Python programming',
            'Machine learning',
            'Data cleaning & preprocessing',
            'Model deployment',
          ],
          duration: '16 Weeks',
          students: 'Coming Soon',
          rating: null,
          price: 'To be announced',
          link: '/skill-courses',
          image: '/public/images/data-science.jpg',
          color: 'from-purple-700 to-primary',
          locked: true,
        },
        {
          title: 'Python Programming',
          description:
            'From basics to advanced concepts in Python with real-world applications',
          features: [
            'Object-oriented programming',
            'Web development with Django',
            'Data structures & algorithms',
            'Automation scripts',
          ],
          duration: '10 Weeks',
          students: 'Coming Soon',
          rating: null,
          price: 'To be announced',
          link: '/skill-courses',
          image: '/public/images/python.jpg',
          color: 'from-blue-500 to-teal-700',
          locked: true,
        },
        {
          title: 'Communication Skills',
          description:
            'Enhance your professional communication for career advancement',
          features: [
            'Business writing',
            'Public speaking',
            'Presentation skills',
            'Interpersonal communication',
          ],
          duration: '8 Weeks',
          students: 'Coming Soon',
          rating: null,
          price: 'To be announced',
          link: '/skill-courses',
          image: '/public/images/communication.jpg',
          color: 'from-accent to-red-600',
          locked: true,
        },
      ],
    },
  };

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const currentCourses = courseData[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16 px-6 md:px-8"
    >
      <div className="container-custom">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative inline-block">
            Our Educational Programs
            <motion.span
              className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-[#8c52ff] to-[#ff6b00]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover our range of specialized courses designed to help you excel
            academically and develop skills for future success.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemTransition} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                variants={tabVariants}
                initial="inactive"
                animate={activeTab === tab.id ? 'active' : 'inactive'}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white shadow-lg shadow-[#8c52ff]/30 border border-[#9a69ff]/20'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-[#8c52ff]/30 hover:shadow-md'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Course Content */}
        <motion.div variants={itemTransition} className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Title & Description */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  {currentCourses.title}
                </h2>
                <p className="text-lg text-neutral-600">
                  {currentCourses.description}
                </p>
              </div>

              {/* Coming Soon Banner for Skill Courses */}
              {currentCourses.isComingSoon && (
                <div className="bg-gradient-to-r from-[#8c52ff]/15 to-[#ff6b00]/15 border border-[#8c52ff]/20 rounded-2xl p-8 mb-12 text-center max-w-3xl mx-auto shadow-lg">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8c52ff]/20 rounded-full mb-5 shadow-inner">
                    <Calendar className="w-10 h-10 text-[#8c52ff]" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                    Coming Soon!
                  </h3>
                  <p className="text-neutral-600 mb-6 text-lg">
                    Our skill development courses are currently being finalized.
                    Register your interest to get early access and special
                    discounts.
                  </p>
                  <Link to="/contact">
                    <motion.button
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white rounded-xl font-medium transition-all duration-200 shadow-md shadow-[#8c52ff]/20 border border-[#9a69ff]/20"
                    >
                      <span>Register Interest</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {currentCourses.courses.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={course.locked ? {} : 'hover'}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100 flex flex-col h-full relative ${
                      course.locked ? 'opacity-80' : ''
                    }`}
                  >
                    {/* Course Header */}
                    <div
                      className={`bg-gradient-to-r ${course.color} p-7 text-white relative overflow-hidden`}
                    >
                      {course.highlight && (
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                          {course.highlight}
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-2.5 relative z-10">
                        {course.title}
                      </h3>
                      <p className="text-white/90 text-sm relative z-10">
                        {course.description}
                      </p>

                      {/* Background Pattern */}
                      <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <circle
                            cx="75"
                            cy="75"
                            r="25"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <circle
                            cx="75"
                            cy="75"
                            r="15"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <circle cx="75" cy="75" r="5" fill="white" />
                        </svg>
                      </div>
                    </div>

                    {/* Course Features */}
                    <div className="p-7 flex-grow">
                      <ul className="space-y-3 mb-6">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-[#8c52ff] mr-2.5 shrink-0 mt-0.5" />
                            <span className="text-neutral-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Course Meta */}
                      <div className="space-y-3.5 text-sm">
                        <div className="flex items-center text-neutral-600">
                          <Clock className="w-4.5 h-4.5 mr-2.5 text-neutral-400" />
                          <span>Duration: {course.duration}</span>
                        </div>

                        <div className="flex items-center text-neutral-600">
                          <Users className="w-4.5 h-4.5 mr-2.5 text-neutral-400" />
                          <span>Students: {course.students}</span>
                        </div>

                        {course.rating && (
                          <div className="flex items-center">
                            <div className="flex mr-2.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4.5 h-4.5 ${
                                    i < course.rating
                                      ? 'text-amber-400'
                                      : 'text-neutral-200'
                                  }`}
                                  fill={
                                    i < course.rating ? '#FBBF24' : '#E5E7EB'
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-neutral-700 font-medium">
                              {course.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="p-7 pt-0 border-t border-neutral-100 mt-5">
                      <div className="flex items-center justify-between mb-5">
                        <div className="text-neutral-800 font-bold text-lg">
                          {course.price}
                        </div>
                        <div className="text-xs bg-[#8c52ff]/10 text-[#8c52ff] px-3 py-1.5 rounded-full font-medium">
                          {course.locked ? 'Coming Soon' : 'Available Now'}
                        </div>
                      </div>

                      <Link to={course.link}>
                        <motion.button
                          variants={buttonVariants}
                          initial="rest"
                          whileHover={course.locked ? {} : 'hover'}
                          whileTap={course.locked ? {} : 'tap'}
                          disabled={course.locked}
                          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                            course.locked
                              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white shadow-md shadow-[#8c52ff]/20 hover:shadow-lg hover:shadow-[#8c52ff]/30 border border-[#9a69ff]/20'
                          }`}
                        >
                          <span>
                            {course.locked ? 'Coming Soon' : 'Know More'}
                          </span>
                          {!course.locked && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </motion.button>
                      </Link>
                    </div>

                    {/* Locked Overlay */}
                    {course.locked && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center p-8 bg-white/40 rounded-2xl shadow-lg max-w-[80%]">
                          <Sparkles className="w-14 h-14 text-[#8c52ff] mx-auto mb-5 opacity-80" />
                          <h3 className="font-bold text-neutral-800 text-xl mb-3">
                            Coming Soon
                          </h3>
                          <p className="text-neutral-600 mb-5">
                            We're preparing something amazing for you!
                          </p>
                          <Link to="/contact">
                            <button className="px-5 py-2.5 bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-[#9a69ff]/20">
                              Get Notified
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemTransition}
          className="bg-gradient-to-r from-[#8c52ff] to-[#ff6b00] rounded-2xl p-8 md:p-12 text-white overflow-hidden relative"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Not sure which course is right for you?
              </h3>
              <p className="text-white/90 mb-4 max-w-xl">
                Our education counselors can help you find the perfect program
                based on your goals, learning style, and schedule.
              </p>
            </div>
            <div className="md:w-1/3 flex md:justify-end">
              <Link to="/contact">
                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 bg-white text-[#8c52ff] rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <circle cx="75" cy="25" r="50" stroke="white" strokeWidth="0.5" />
              <circle cx="75" cy="25" r="30" stroke="white" strokeWidth="0.5" />
              <circle cx="75" cy="25" r="15" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <circle cx="20" cy="80" r="60" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="80" r="40" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="80" r="20" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Courses;
