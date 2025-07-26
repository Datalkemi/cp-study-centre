import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Star,
  CheckCircle,
  Play,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Lightbulb,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Shield,
  BookMarked,
  Languages,
  Laptop,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const bgImages = [
  '/assets/hero-scroll/image1.webp',
  '/assets/hero-scroll/image2.webp',
  '/assets/hero-scroll/image3.webp',
];


const Home = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseType: '',
    subCategory: '',
    syllabus: '',
    class: '',
    stream: '',
  });

  // Scroll animation references
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseTypeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      courseType: value,
      subCategory: '',
      syllabus: '',
      class: '',
      stream: '',
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // Then show a success message and reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      courseType: '',
      subCategory: '',
      syllabus: '',
      class: '',
      stream: '',
    });
    setShowEnquiryForm(false);
  };

  // Premium services data
  const services = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: 'School Tuition',
      description: 'CBSE, ICSE, and State boards support for classes 6-12',
      features: [
        'Expert teachers for all subjects',
        'Small batch sizes (6-8 students)',
        'Regular assessments & feedback',
        'Homework assistance & doubt clearing',
      ],
      path: '/school-tuition',
      color: 'from-blue-600 to-indigo-700',
      iconBg: 'bg-blue-500',
    },
    {
      icon: <Languages className="w-8 h-8 text-white" />,
      title: 'Language Prep',
      description: 'IELTS, PTE, OET, and German language courses',
      features: [
        'Native-level instructors',
        'Practice tests & mock interviews',
        'Focused speaking & writing sessions',
        'Guaranteed score improvement',
      ],
      path: '/language-prep',
      color: 'from-purple-600 to-primary',
      iconBg: 'bg-primary',
    },
    {
      icon: <Laptop className="w-8 h-8 text-white" />,
      title: 'Skill Courses',
      description: 'Future-ready skills for career advancement',
      features: [
        'Industry-relevant curriculum',
        'Hands-on project work',
        'Certification programs',
        'Placement assistance',
      ],
      path: '/skill-courses',
      color: 'from-amber-500 to-accent',
      iconBg: 'bg-accent',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Aditya Kumar',
      role: 'CBSE Grade 10 Student',
      content:
        'The teaching approach at CP Study Center helped me secure 95% in my board exams. The personalized attention from teachers made complex subjects easy to understand.',
      image: '/public/images/testimonial1.jpg',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'IELTS Student',
      content:
        'I achieved a band score of 7.5 in IELTS after just 6 weeks of training. The mock tests and speaking sessions were incredibly helpful in building my confidence.',
      image: '/public/images/testimonial2.jpg',
      rating: 5,
    },
    {
      name: 'Rahul Menon',
      role: 'Parent',
      content:
        'My daughter has shown remarkable improvement in her academics since joining CP Study Center. The regular progress reports and parent-teacher meetings keep us informed about her development.',
      image: '/public/images/testimonial3.jpg',
      rating: 4,
    },
  ];

  // Stats
  const stats = [
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
    { value: '5000+', label: 'Students Trained', icon: Users },
    { value: '120+', label: 'Expert Tutors', icon: Award },
    { value: '15+', label: 'Years Experience', icon: Clock },
  ];

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.05)',
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 10px 25px rgba(140, 82, 255, 0.15)',
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

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgImages[currentBgIndex]}
            className="absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: `url(${bgImages[currentBgIndex]})`,
            }}
          />
        </AnimatePresence>
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl"
            animate={{
              x: [20, -20, 20],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute top-40 left-10 w-72 h-72 rounded-full bg-accent/10 filter blur-3xl"
            animate={{
              x: [-20, 20, -20],
              y: [20, 0, 20],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero Content */}
            <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
              <motion.div
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainerVariants}
              >
                <motion.div
                  variants={fadeInUpVariants}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Excellence in Education Since 2015</span>
                </motion.div>

                <motion.h1
                  variants={fadeInUpVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight"
                >
                  <span className="block">Unlock Your</span>
                  <span className="text-[#8c52ff] bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Academic Potential
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUpVariants}
                  className="text-lg text-neutral-600 max-w-lg"
                >
                  Expert-led, personalized education for school students,
                  language learners, and skill development. Join a community
                  where success is the standard.
                </motion.p>

                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8c52ff] hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20"
                    onClick={() => setShowEnquiryForm(true)}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <Link to="/webinars">
                    <motion.button
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-neutral-200 hover:border-primary/30 hover:bg-primary/5 text-neutral-800 rounded-xl font-medium transition-all duration-200"
                    >
                      <Play className="w-4 h-4 text-primary" />
                      <span>Join Free Webinar</span>
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-wrap gap-6 pt-6 items-center"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 flex items-center justify-center text-xs font-bold text-primary"
                      >
                        {i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600">
                      +
                    </div>
                  </div>
                  <div className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-800">
                      5,000+
                    </span>{' '}
                    students trust us
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3 scale-105 blur-lg"></div>
                <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-premium border border-neutral-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Course card 1 */}
                    <motion.div
                      className="bg-gradient-to-b from-neutral-50 to-white p-5 rounded-xl border border-neutral-100 shadow-subtle"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-800">
                            School Tuition
                          </h3>
                          <p className="text-xs text-neutral-500 mt-1">
                            CBSE, ICSE, State boards
                          </p>
                          <div className="mt-3 flex items-center text-xs text-neutral-500">
                            <Star
                              className="w-4 h-4 text-amber-400 mr-1"
                              fill="#FBBF24"
                            />
                            <span className="font-medium text-neutral-800">
                              4.9
                            </span>
                            <span className="mx-1">•</span>
                            <span>250+ Students</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Course card 2 */}
                    <motion.div
                      className="bg-gradient-to-b from-neutral-50 to-white p-5 rounded-xl border border-neutral-100 shadow-subtle"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Languages className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-800">
                            Language Prep
                          </h3>
                          <p className="text-xs text-neutral-500 mt-1">
                            IELTS, PTE, German
                          </p>
                          <div className="mt-3 flex items-center text-xs text-neutral-500">
                            <Star
                              className="w-4 h-4 text-amber-400 mr-1"
                              fill="#FBBF24"
                            />
                            <span className="font-medium text-neutral-800">
                              4.8
                            </span>
                            <span className="mx-1">•</span>
                            <span>180+ Students</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Achievement card */}
                    <motion.div
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-xl border border-primary/20 shadow-subtle md:col-span-2"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-600 text-sm">
                            Top Results
                          </div>
                          <h3 className="font-bold text-neutral-800 text-xl mt-0.5">
                            95% Success Rate
                          </h3>
                          <p className="text-xs text-neutral-600 mt-1">
                            Students achieving their target scores & grades
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={targetRef} className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ opacity, y, scale }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Premium Educational Services
            </h2>
            <p className="text-neutral-600">
              Comprehensive learning solutions designed to meet your educational
              goals, delivered by experts who care about your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                className="bg-white rounded-2xl shadow-card overflow-hidden border border-neutral-100 flex flex-col h-full"
              >
                {/* Service Header */}
                <div
                  className={`bg-gradient-to-r ${service.color} p-6 text-white`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${service.iconBg} flex items-center justify-center bg-opacity-30 backdrop-blur-sm`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-white/90">{service.description}</p>
                </div>

                {/* Service Features */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service CTA */}
                <div className="p-6 pt-0">
                  <Link to={service.path}>
                    <motion.button
                      variants={buttonVariants}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 hover:bg-primary hover:text-white rounded-xl font-medium transition-all duration-300 text-neutral-800"
                    >
                      <span>Explore {service.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-neutral-600">
              Real experiences from students who transformed their academic
              journey with CP Study Center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-card border border-neutral-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating
                        ? 'text-amber-400'
                        : 'text-neutral-200'
                        }`}
                      fill={i < testimonial.rating ? '#FBBF24' : '#E5E7EB'}
                    />
                  ))}
                </div>

                <p className="text-neutral-600">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="md:w-2/3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Start Your Learning Journey?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/90 max-w-xl"
              >
                Join CP Study Center today and experience the difference our
                expert-led, personalized approach can make in your academic
                success.
              </motion.p>
            </div>
            <div className="md:w-1/3 flex flex-col md:items-end">
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-white text-primary rounded-xl font-medium shadow-xl shadow-primary-dark/20 inline-flex items-center justify-center gap-2"
                onClick={() => setShowEnquiryForm(true)}
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {showEnquiryForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEnquiryForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative">
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold mb-2">Enquire Now</h3>
                <p className="text-white/90">
                  Fill out the form below and our team will get in touch with
                  you shortly
                </p>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <form
                  onSubmit={handleFormSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Basic Info */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="font-medium text-lg text-neutral-800 mb-2">
                      Your Information
                    </h4>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Full Name*
                      </label>
                      <input
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
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
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
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          WhatsApp Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
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
                    <h4 className="font-medium text-lg text-neutral-800 mb-2">
                      Course Interest
                    </h4>
                    <div className="mb-4">
                      <label
                        htmlFor="courseType"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
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
                  {formData.courseType === 'school' && (
                    <>
                      <div>
                        <label
                          htmlFor="syllabus"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
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
                          <option value="state-malayalam">
                            State - Malayalam
                          </option>
                          <option value="state-english">State - English</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="class"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
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
                      </div>
                      {(formData.class === '11' || formData.class === '12') && (
                        <div className="md:col-span-2">
                          <label
                            htmlFor="stream"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                          >
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

                  {formData.courseType === 'language' && (
                    <div className="md:col-span-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
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

                  {formData.courseType === 'skill' && (
                    <div className="md:col-span-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
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
                        <option value="communication">
                          Communication Skills
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="md:col-span-2 pt-4">
                    <motion.button
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    >
                      Submit Enquiry
                    </motion.button>
                    <p className="text-xs text-neutral-500 text-center mt-4">
                      By submitting this form, you agree to our{' '}
                      <Link
                        to="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
