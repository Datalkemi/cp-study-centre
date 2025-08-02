import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import DailyLearningPopup from './components/DailyLearningPopup';
import NewsletterPopup from './components/NewsletterPopup';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import SchoolTuition from './pages/SchoolTuition';
import LanguagePrep from './pages/LanguagePrep';
import SkillCourses from './pages/SkillCourses';
import Webinars from './pages/Webinars';
import About from './pages/About';
import Contact from './pages/Contact';
import DailyLearning from './pages/DailyLearning';

// Animated page transitions
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [showDailyLearning, setShowDailyLearning] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show daily learning popup after 3 seconds
    const dailyTimer = setTimeout(() => {
      if (!hasInteracted) {
        setShowDailyLearning(true);
      }
    }, 3000);

    // Track scroll for newsletter popup
    let hasScrolled70 = false;
    let idleTimer;

    const handleScroll = () => {
      setHasInteracted(true);

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > 70 && !hasScrolled70) {
        hasScrolled70 = true;
        setShowNewsletter(true);
      }
    };

    const handleMouseMove = () => {
      setHasInteracted(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!hasScrolled70 && !showDailyLearning) {
          setShowNewsletter(true);
        }
      }, 8000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Start idle timer
    idleTimer = setTimeout(() => {
      if (!hasScrolled70 && !hasInteracted) {
        setShowNewsletter(true);
      }
    }, 15000);

    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasInteracted, showDailyLearning]);

  return (
    <Router>
      <div className="App min-h-screen bg-white flex flex-col">
        <Header />

        <main className="flex-grow pt-[76px]">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/courses"
              element={
                <PageTransition>
                  <Courses />
                </PageTransition>
              }
            />
            <Route
              path="/school-tuition"
              element={
                <PageTransition>
                  <SchoolTuition />
                </PageTransition>
              }
            />
            <Route
              path="/language-prep"
              element={
                <PageTransition>
                  <LanguagePrep />
                </PageTransition>
              }
            />
            <Route
              path="/skill-courses"
              element={
                <PageTransition>
                  <SkillCourses />
                </PageTransition>
              }
            />
            <Route
              path="/webinars"
              element={
                <PageTransition>
                  <Webinars />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/daily-learning"
              element={
                <PageTransition>
                  <DailyLearning />
                </PageTransition>
              }
            />
          </Routes>
        </main>

        <Footer />
        <WhatsAppFloat />

        {/* Popups */}
        <DailyLearningPopup
          isOpen={showDailyLearning}
          onClose={() => setShowDailyLearning(false)}
        />
        <NewsletterPopup
          isOpen={showNewsletter}
          onClose={() => setShowNewsletter(false)}
        />
      </div>
    </Router>
  );
}

export default App;
