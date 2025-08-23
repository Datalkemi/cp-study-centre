import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Calendar,
  Phone,
} from "lucide-react";

import { useEnquiryModal } from "../context/EnquiryModalContext";
import Logo from "/assets/logo.png";

/* ---------- Nav config ---------- */
const navItems = [
  { name: "Home", path: "/", icon: null },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen,
    dropdown: [
      { name: "School Tuition", path: "/school-tuition", description: "CBSE, ICSE, State Boards" },
      { name: "Language Prep", path: "/language-prep", description: "IELTS, PTE, OET, German" },
      { name: "Skill Courses", path: "/skill-courses", description: "Coming Soon" },
    ],
  },
  { name: "Events", path: "/webinars", icon: Calendar },
  { name: "About", path: "/about", icon: Users },
  { name: "Contact", path: "/contact", icon: Phone },
];

const menuItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" } }),
  hover: { color: "#8c52ff", transition: { duration: 0.2 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: "easeOut", staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.18 } },
};

function EnrollButton({ block = false, onClick }) {
  const { open } = useEnquiryModal();
  return (
    <button
      type="button"
      onClick={() => { open(); onClick?.(); }}
      className={`bg-gradient-to-r from-[#8c52ff] to-[#7946e0] text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-[#8c52ff]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#8c52ff]/30 hover:scale-105 active:scale-95 border border-white/10 ${block ? "w-full" : ""}`}
    >
      Enroll Now
    </button>
  );
}

/* ---------- Right Drawer (portal) ---------- */
function MobileDrawer({ open, onClose, active, setActive }) {
  if (!open) return null;

  // lock scroll + ESC close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const node = (
    <AnimatePresence>
      <motion.div
        key="mobile-drawer-root"
        className="fixed inset-x-0 bottom-0 top-[76px] z-[100]" // below header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* overlay (click outside to close) */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

        {/* drawer (right side) */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="absolute right-0 top-0 bottom-0 w-[80vw] max-w-[420px] bg-white shadow-2xl rounded-l-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-2.5">
            {navItems.map((item) => (
              <div key={item.name} className="py-1.5">
                {item.dropdown ? (
                  <div className="flex items-center">
                    {/* Clicking the label goes to /courses */}
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex-1 flex items-center space-x-3.5 py-3.5 px-4 rounded-xl hover:bg-neutral-50"
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span className="font-medium">{item.name}</span>
                    </Link>

                    {/* Chevron toggles submenu ONLY */}
                    <button
                      onClick={() => setActive(active === item.name ? null : item.name)}
                      aria-expanded={active === item.name}
                      className={`ml-2 p-2 rounded-lg hover:bg-neutral-50 ${active === item.name ? "text-[#8c52ff]" : ""}`}
                    >
                      <motion.div animate={{ rotate: active === item.name ? 180 : 0 }}>
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center space-x-3.5 py-3.5 px-4 rounded-xl hover:bg-neutral-50"
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}

                {/* Mobile submenu for Courses */}
                <AnimatePresence>
                  {item.dropdown && active === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pl-5 ml-3 border-l-2 border-[#8c52ff]/20 mt-1 mb-1"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={onClose}
                          className="block py-3 px-3.5 mt-2.5 rounded-lg hover:bg-neutral-50"
                        >
                          <div className="font-medium">{sub.name}</div>
                          <div className="text-sm text-neutral-500 mt-0.5">{sub.description}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4">
              <EnrollButton block onClick={onClose} />
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}

/* ---------- Header ---------- */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className={`fixed top-0 w-full z-[120] transition-all duration-300 ${isScrolled ? "bg-white/85 backdrop-blur-md shadow-md border-b border-neutral-100" : "bg-white shadow-md"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-5 md:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo (restored size) */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={Logo} alt="CP Study Center Logo" className="h-[25px] md:h-[40px] w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div
                    onMouseLeave={() => setActiveDropdown(null)}
                    onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}
                  >
                    <div className="flex items-center">
                      {/* Clicking label goes to /courses */}
                      <Link
                        to={item.path}
                        className={`px-4 py-2.5 rounded-l-lg font-medium transition-all duration-200 ${isActive(item.path) ? "text-[#8c52ff] bg-[#8c52ff]/5" : "text-neutral-700 hover:text-[#8c52ff] hover:bg-[#8c52ff]/5"
                          }`}
                      >
                        <motion.span variants={menuItemVariants} custom={index} initial="hidden" animate="visible" whileHover="hover">
                          {item.name}
                        </motion.span>
                      </Link>

                      {/* Chevron toggles dropdown */}
                      <button
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onClick={() => setActiveDropdown((v) => (v === item.name ? null : item.name))}
                        aria-expanded={activeDropdown === item.name}
                        className={`pr-3 pl-2 py-2.5 rounded-r-lg border-l border-neutral-200 ${activeDropdown === item.name ? "text-[#8c52ff] bg-[#8c52ff]/10" : "hover:bg-neutral-50"
                          }`}
                      >
                        <motion.div animate={{ rotate: activeDropdown === item.name ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                    </div>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 border border-neutral-100 z-[95]"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onMouseEnter={() => setActiveDropdown(item.name)}
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block p-3.5 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                            >
                              <div className="font-medium text-neutral-800 hover:text-[#8c52ff] transition-colors">{sub.name}</div>
                              <div className="text-sm text-neutral-500 mt-0.5">{sub.description}</div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${isActive(item.path) ? "text-[#8c52ff] bg-[#8c52ff]/5" : "text-neutral-700 hover:text-[#8c52ff] hover:bg-[#8c52ff]/5"
                      }`}
                  >
                    <motion.span variants={menuItemVariants} custom={index} initial="hidden" animate="visible" whileHover="hover">
                      {item.name}
                    </motion.span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <EnrollButton />
          </div>

          {/* Mobile toggle: rotate + cross-fade to X */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
            className="lg:hidden p-2.5 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors relative"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative w-6 h-6"
            >
              <motion.span className="absolute inset-0" animate={{ opacity: isMenuOpen ? 0 : 1 }}>
                <Menu className="w-6 h-6" />
              </motion.span>
              <motion.span className="absolute inset-0" animate={{ opacity: isMenuOpen ? 1 : 0 }}>
                <X className="w-6 h-6" />
              </motion.span>
            </motion.div>
            <span className="sr-only">Toggle navigation</span>
          </motion.button>
        </nav>
      </div>

      {/* Drawer below header, in a portal */}
      <MobileDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        active={activeDropdown}
        setActive={setActiveDropdown}
      />
    </motion.header>
  );
}
