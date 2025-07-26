import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  ChevronRight,
  Globe,
  Clock,
  Calendar,
  Sparkles,
} from 'lucide-react';

import LogoWithBG from '/assets/logo_with_bg.png';
import Logo from '/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Webinars', path: '/webinars' },
    { name: 'Daily Learning', path: '/daily-learning' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const courses = [
    { name: 'School Tuition (CBSE)', path: '/school-tuition' },
    { name: 'School Tuition (State)', path: '/school-tuition' },
    { name: 'IELTS Preparation', path: '/language-prep' },
    { name: 'PTE Coaching', path: '/language-prep' },
    { name: 'OET Training', path: '/language-prep' },
    { name: 'German Language', path: '/language-prep' },
    { name: 'Skill Courses', path: '/skill-courses' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+91 9876543210', href: 'tel:+919876543210' },
    {
      icon: Mail,
      text: 'info@cpstudycenter.com',
      href: 'mailto:info@cpstudycenter.com',
    },
    {
      icon: MapPin,
      text: 'CP Study Center, Main Street, City',
      href: 'https://maps.google.com',
    },
    {
      icon: Globe,
      text: 'www.cpstudycenter.com',
      href: 'https://www.cpstudycenter.com',
    },
    { icon: Clock, text: 'Mon-Sat: 9AM - 7PM', href: null },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#',
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: '#8c52ff',
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-neutral-900 text-white pt-20 pb-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"
        />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to="/" className="flex items-center space-x-4 group">
              <img src={Logo} alt="CP Study Center Logo" className="w-auto bg-white rounded-xl" />
            </Link>

            <p className="text-neutral-300">
              Empowering students with quality education and personalized
              learning experiences since 2015. Our mission is to help every
              student achieve academic excellence.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 ${social.color} rounded-full flex items-center justify-center transition-transform shadow-md`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 font-medium px-5 py-2.5 bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white rounded-lg transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-xl hover:shadow-[#8c52ff]/30 border border-[#9a69ff]/20"
              >
                <span>Enroll Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg text-white font-bold mb-7 flex items-center">
              <span className="w-8 h-[3px] bg-[#8c52ff] rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover="hover">
                  <Link
                    to={link.path}
                    className="flex items-center text-neutral-300 hover:text-[#8c52ff] transition-colors group"
                  >
                    <motion.span variants={linkVariants} className="flex items-center">
                      <ChevronRight
                        size={16}
                        className="mr-2.5 text-neutral-500 group-hover:text-[#8c52ff] transition-colors"
                      />
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg text-white font-bold mb-7 flex items-center">
              <span className="w-8 h-[3px] bg-[#8c52ff] rounded-full mr-3"></span>
              Our Courses
            </h3>
            <ul className="space-y-3.5">
              {courses.map((course) => (
                <motion.li key={course.name} whileHover="hover">
                  <Link
                    to={course.path}
                    className="flex items-center text-neutral-300 hover:text-[#8c52ff] transition-colors group"
                  >
                    <motion.span variants={linkVariants}
                      className="flex items-center">
                      <ChevronRight
                        size={16}
                        className="mr-2.5 text-neutral-500 group-hover:text-[#8c52ff] transition-colors"
                      />
                      {course.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg text-white font-bold mb-7 flex items-center">
              <span className="w-8 h-[3px] bg-[#8c52ff] rounded-full mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-4.5">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className={`flex items-center text-neutral-300 hover:text-white ${!item.href && 'pointer-events-none'
                      }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mr-3.5 text-[#8c52ff]">
                      <item.icon size={18} />
                    </div>
                    <span>{item.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>


          </motion.div>
        </div>
        {/* Newsletter mini form */}
        <div className="mt-8 bg-neutral-800/50 p-5 rounded-xl border border-neutral-700/50 min-w-[400px] max-w-md mx-auto">
          <h4 className="text-white text-sm font-medium mb-3.5">
            Subscribe to our newsletter
          </h4>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2.5 text-sm bg-neutral-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8c52ff] text-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#8c52ff] to-[#7946e0] hover:from-[#9a69ff] hover:to-[#8351f8] px-4 py-2.5 rounded-r-lg transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 text-neutral-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © {currentYear} CP Study Center. All rights reserved.
          </div>

          <div className="flex space-x-8">
            <Link
              to="/privacy-policy"
              className="hover:text-[#8c52ff] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-[#8c52ff] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-[#8c52ff] transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8c52ff] via-[#ff6b00] to-[#8c52ff]"></div>
    </motion.footer>
  );
};

export default Footer;
