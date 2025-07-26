import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Calendar,
  Phone,
  Sparkles,
} from 'lucide-react';

import Logo from '/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: null },
    {
      name: 'Courses',
      path: '/courses',
      icon: BookOpen,
      dropdown: [
        {
          name: 'School Tuition',
          path: '/school-tuition',
          description: 'CBSE, ICSE, State Boards',
        },
        {
          name: 'Language Prep',
          path: '/language-prep',
          description: 'IELTS, PTE, OET, German',
        },
        {
          name: 'Skill Courses',
          path: '/skill-courses',
          description: 'Coming Soon',
        },
      ],
    },
    { name: 'Webinars', path: '/webinars', icon: Calendar },
    { name: 'About', path: '/about', icon: Users },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  // Premium animations
  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      color: '#8c52ff',
      transition: {
        duration: 0.2,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-100'
        : 'bg-transparent'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-5 md:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="bg-gradient-to-br rounded-xl flex items-center justify-center"
            >
              <img src={Logo} alt="CP Study Center Logo" className="h-25" />
            </motion.div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div>
                    <motion.button
                      className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${isActive(item.path)
                        ? 'text-[#8c52ff] bg-[#8c52ff]/5'
                        : 'text-neutral-700 hover:text-[#8c52ff] hover:bg-[#8c52ff]/5'
                        }`}
                      onClick={() => handleDropdownToggle(item.name)}
                      variants={menuItemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 border border-neutral-100"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeMenu}
                              className="block p-3.5 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                            >
                              <div className="font-medium text-neutral-800 hover:text-[#8c52ff] transition-colors">
                                {subItem.name}
                              </div>
                              <div className="text-sm text-neutral-500 mt-0.5">
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${isActive(item.path)
                      ? 'text-[#8c52ff] bg-[#8c52ff]/5'
                      : 'text-neutral-700 hover:text-[#8c52ff] hover:bg-[#8c52ff]/5'
                      }`}
                  >
                    <motion.span
                      variants={menuItemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="hidden lg:block"
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-[#8c52ff]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#8c52ff]/30 hover:scale-105 active:scale-95 border border-white/10"
            >
              Enroll Now
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden overflow-hidden flex flex-col bg-white pt-[76px]"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2.5">
                  {navItems.map((item, index) => (
                    <div key={item.name} className="py-1.5">
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className={`w-full flex items-center justify-between py-3.5 px-5 rounded-xl ${isActive(item.path)
                              ? 'bg-[#8c52ff]/5 text-[#8c52ff] shadow-sm'
                              : 'hover:bg-neutral-50'
                              }`}
                          >
                            <div className="flex items-center space-x-3.5">
                              {item.icon && <item.icon className="w-5 h-5" />}
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <motion.div
                              animate={{
                                rotate: activeDropdown === item.name ? 180 : 0,
                              }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden pl-5 ml-3 border-l-2 border-[#8c52ff]/20 mt-1 mb-1"
                              >
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    onClick={closeMenu}
                                    className="block py-3 px-4 mt-2.5 rounded-lg hover:bg-neutral-50"
                                  >
                                    <div className="font-medium">
                                      {subItem.name}
                                    </div>
                                    <div className="text-sm text-neutral-500 mt-0.5">
                                      {subItem.description}
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={closeMenu}
                          className={`flex items-center space-x-3.5 py-3.5 px-5 rounded-xl ${isActive(item.path)
                            ? 'bg-[#8c52ff]/5 text-[#8c52ff] shadow-sm'
                            : 'hover:bg-neutral-50'
                            }`}
                        >
                          {item.icon && <item.icon className="w-5 h-5" />}
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile CTA */}
                  <div className="mt-8 px-4">
                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className="block w-full py-3.5 px-5 bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white text-center rounded-xl font-medium shadow-md shadow-[#8c52ff]/20 hover:shadow-lg hover:shadow-[#8c52ff]/30 transition-all duration-300 border border-white/10"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
