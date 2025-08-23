import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Users,
  Star,
  CheckCircle,
  Play,
  Award,
  TrendingUp,
  Clock as ClockIcon,
  Languages,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEnquiryModal } from '../context/EnquiryModalContext';

// ✅ Import images so Vite bundles/optimizes them (fixes slow/404 in builds)
import hero1 from '../assets/hero-scroll/image1.webp';
import hero2 from '../assets/hero-scroll/image2.webp';
import hero3 from '../assets/hero-scroll/image3.webp';
import hero4 from '../assets/hero-scroll/image4.webp';

const bgImages = [hero1, hero2, hero3, hero4];

const Home = () => {
  const prefersReducedMotion = useReducedMotion();

  // ✅ use global modal instead of local state/form
  const { open } = useEnquiryModal();

  // Scroll animation references
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]); // slightly smaller travel for less jank
  const y = useTransform(scrollYProgress, [0, 0.5], [24, 0]);

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
      color: 'from-blue-600 to-indigo-400',
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
      color: 'from-purple-600 to-pink-300',
      iconBg: 'bg-purple-500',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: 'Skill Courses',
      description: 'Future-ready skills for career advancement',
      features: [
        'Industry-relevant curriculum',
        'Hands-on project work',
        'Certification programs',
        'Placement assistance',
      ],
      path: '/skill-courses',
      color: 'from-amber-600 to-yellow-400',
      iconBg: 'bg-amber-500',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Nancy',
      role: 'IELTS Student',
      content:
        'Myself Nancy, I am here to share my experience regarding the IELTS class that I  have decided to enroll in the  class  after seeing their great reviews  from online about CP study center. My tutor, Akshay Sir , was incredibly helpful. He broke down the writing tasks ...',
      image: '#',
      rating: 5,
    },
    {
      name: 'Sahil',
      role: 'IELTS Student',
      content:
        'Thank you Akshay sir for your class. I learned so much from this course, the instructor was engaging and knowledgeable, and i feel much more confidence in my abilities.',
      image: '#',
      rating: 5,
    },
    {
      name: 'Geethu',
      role: 'Student',
      content:
        'The best thing of this institute are the experienced faculties, who always try to motivate students,they take care of all the students and  they take extra care about the students  those basic is not good.',
      image: '#',
      rating: 5,
    },
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const avatarColors = ['bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400'];
  const getColor = (index) => avatarColors[index % avatarColors.length];

  // Stats
  const stats = [
    { value: '98%', label: 'Success Rate', icon: TrendingUp },
    { value: '1000+', label: 'Students Trained', icon: Users },
    { value: '20+', label: 'Expert Tutors', icon: Award },
    { value: '5+', label: 'Years Experience', icon: ClockIcon },
  ];

  // Animation variants (snappier)
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.28,
        ease: 'easeOut',
      },
    }),
  };

  const staggerContainerVariants = {
    hidden: { opacity: 1 }, // keep at 1 to avoid flash of invisible content
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: '0 5px 15px rgba(0,0,0,0.05)' },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 25px rgba(140, 82, 255, 0.15)',
      transition: { type: 'spring', stiffness: 300, damping: 16 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.04, transition: { type: 'spring', stiffness: 380, damping: 16 } },
    tap: { scale: 0.96 },
  };

  // ✅ Slideshow: preload + start after first image is ready, pause when tab hidden
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let loaded = 0;
    bgImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => { }) // avoid throwing on some browsers
        .finally(() => {
          loaded += 1;
          if (loaded === 1) setHeroReady(true); // start once first is ready
        });
    });
  }, []);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!heroReady || paused || prefersReducedMotion) return;
    const interval = setInterval(
      () => setCurrentBgIndex((prev) => (prev + 1) % bgImages.length),
      4000
    );
    return () => clearInterval(interval);
  }, [heroReady, paused, prefersReducedMotion]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Subtle background gradients (no heavy filters) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-16 -right-16 w-[36rem] h-[36rem] rounded-full bg-primary/10" />
          <div className="absolute top-1/3 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/10" />
        </div>

        {/* Slideshow Background */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {heroReady && (
              <motion.img
                key={bgImages[currentBgIndex]}
                src={bgImages[currentBgIndex]}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: prefersReducedMotion ? 0.35 : 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'linear' }}
                className="w-full h-full object-cover absolute inset-0"
                alt="Hero background"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-white/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero Content */}
            <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
              {prefersReducedMotion ? (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-primary text-md font-medium shadow-sm mb-4">
                    <span>Excellence in Education Since 2015</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight mb-4">
                    <span className="block">Learning Beyond Limits, </span>
                    <span className="text-[#8c52ff] bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Growing Beyond Grades.
                    </span>
                  </h1>
                  <p className="text-lg text-black max-w-lg md:max-w-2xl font-medium leading-relaxed">
                    Empowering students through expert tuition, international language training, and career-ready skill courses — all under one roof.
                  </p>
                </>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainerVariants}
                >
                  <motion.div
                    variants={fadeInUpVariants}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-primary text-md font-medium shadow-sm mb-4"
                  >
                    <span>Excellence in Education Since 2015</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeInUpVariants}
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight mb-4"
                  >
                    <span className="block">Learning Beyond Limits, </span>
                    <span className="text-[#8c52ff] bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Growing Beyond Grades.
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeInUpVariants}
                    className="text-lg text-black max-w-lg md:max-w-2xl font-medium leading-relaxed"
                  >
                    Empowering students through expert tuition, international language training, and career-ready skill courses — all under one roof.
                  </motion.p>

                  <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
                    {/* 🔧 route fixed to /contact */}
                    <Link to="/contact">
                      <motion.button
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8c52ff] hover:bg-primary-dark text-white rounded-xl font-medium transition-all shadow-lg shadow-primary/20"
                      >
                        <span>Enquire Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>

                    <motion.button
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-neutral-200 hover:border-primary/30 hover:bg-primary/5 text-neutral-800 rounded-xl font-medium transition-all duration-200"
                      onClick={() => open({ courseType: 'language' })} // ✅ open global modal with optional prefill
                    >
                      <Play className="w-4 h-4 text-primary" />
                      <span>Join Our <strong>Free</strong> 3 Day Class</span>
                    </motion.button>
                  </motion.div>

                  <motion.div variants={fadeInUpVariants} className="flex flex-wrap gap-6 pt-6 items-center">
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
                      <span className="font-semibold text-neutral-800">1,000+</span>{' '}
                      students trust us
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="relative bg-white/85 p-6 md:p-8 rounded-2xl shadow-premium border border-neutral-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Course card 1 */}
                    <motion.div
                      className="bg-gradient-to-b from-neutral-50 to-white p-5 rounded-xl border border-neutral-100 shadow-subtle"
                      whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-800">School Tuition</h3>
                          <p className="text-xs text-neutral-500 mt-1">CBSE, ICSE, State boards</p>
                          <div className="mt-3 flex items-center text-xs text-neutral-500">
                            <Star className="w-4 h-4 text-amber-400 mr-1" fill="#FBBF24" />
                            <span className="font-medium text-neutral-800">4.9</span>
                            <span className="mx-1">•</span>
                            <span>250+ Students</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Course card 2 */}
                    <motion.div
                      className="bg-gradient-to-b from-neutral-50 to-white p-5 rounded-xl border border-neutral-100 shadow-subtle"
                      whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Languages className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-800">Language Prep</h3>
                          <p className="text-xs text-neutral-500 mt-1">IELTS, PTE, German</p>
                          <div className="mt-3 flex items-center text-xs text-neutral-500">
                            <Star className="w-4 h-4 text-amber-400 mr-1" fill="#FBBF24" />
                            <span className="font-medium text-neutral-800">4.8</span>
                            <span className="mx-1">•</span>
                            <span>180+ Students</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Achievement card */}
                    <motion.div
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-xl border border-[#8c52ff] shadow-subtle md:col-span-2"
                      whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-[#8c52ff]">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-600 text-sm">Top Results</div>
                          <h3 className="font-bold text-[#8c52ff] text-xl mt-0.5">98% Success Rate</h3>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            style={prefersReducedMotion ? undefined : { opacity, y, scale }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Premium Educational Services</h2>
            <p className="text-neutral-600">
              Comprehensive learning solutions designed to meet your educational goals, delivered by experts who care about your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                className="bg-white rounded-2xl shadow-card overflow-hidden border border-neutral-100 flex flex-col h-full"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${service.iconBg} flex items-center justify-center bg-opacity-30 backdrop-blur-sm`}>
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 hover:bg-[#8c52ff] hover:text-white rounded-xl font-medium transition-all duration-300 text-neutral-800"
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
      <section className="py-16 bg-[#8c52ff]/60 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.28, ease: 'easeOut' }}
                className="text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-primary mb-2 bg-white">
                  <stat.icon className="w-10 h-10 text-[#8c52ff]" />
                </div>
                <h3 className="text-4xl font-extrabold text-black mb-1">{stat.value}</h3>
                <p className="text-neutral-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-neutral-700 text-3xl md:text-5xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-neutral-600">
              Real experiences from students who transformed their academic journey with CP Study Center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.28, ease: 'easeOut' }}
                className="bg-white p-6 rounded-2xl shadow-card border border-neutral-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                    <div className={`w-full h-full flex items-center justify-center text-white font-semibold ${getColor(index)}`}>
                      {getInitials(testimonial.name)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400' : 'text-neutral-200'}`}
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
      <section className="py-20 text-white bg-[#8c52ff]/60 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-6 w-full">
            <div className="w-full lg:w-3/4">
              <h2 className="text-3xl lg:text-4xl text-white font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-white">
                Join CP Study Center today and experience the difference our expert-led, personalized approach can make in your academic success.
              </p>
            </div>

            <div className="w-full lg:w-1/4 flex justify-center lg:justify-end mt-6 lg:mt-0">
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-white text-[#8c52ff] rounded-xl font-medium shadow-xl shadow-primary-dark/20 inline-flex items-center justify-center gap-2"
                onClick={() => open()} // ✅ open global modal
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
