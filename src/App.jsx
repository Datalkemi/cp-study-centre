import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import DailyLearningPopup from "./components/DailyLearningPopup";
import NewsletterPopup from "./components/NewsletterPopup";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import SchoolTuition from "./pages/SchoolTuition";
import LanguagePrep from "./pages/LanguagePrep";
import SkillCourses from "./pages/SkillCourses";
import Webinars from "./pages/Webinars";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DailyLearning from "./pages/DailyLearning";

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

  // NEW: store a queued newsletter trigger if Daily Learning hasn’t been dismissed yet
  const [queuedNewsletter, setQueuedNewsletter] = useState(false);

  // NEW: central close handlers that also persist dismissal
  const closeDailyLearning = () => {
    setShowDailyLearning(false);
    localStorage.setItem("dismissedDailyLearning", "true");

    // If newsletter was queued, show it now (unless already dismissed)
    if (
      queuedNewsletter &&
      localStorage.getItem("dismissedNewsletter") !== "true"
    ) {
      setShowNewsletter(true);
      setQueuedNewsletter(false);
    }
  };

  const closeNewsletter = () => {
    setShowNewsletter(false);
    localStorage.setItem("dismissedNewsletter", "true");
  };

  useEffect(() => {
    const dismissedDL =
      localStorage.getItem("dismissedDailyLearning") === "true";
    const dismissedNL = localStorage.getItem("dismissedNewsletter") === "true";

    let dailyTimer;
    let idleTimer;

    // Show Daily Learning once, 5s after load if not dismissed
    if (!dismissedDL) {
      dailyTimer = setTimeout(() => setShowDailyLearning(true), 5000);
    }

    // Newsletter triggers: on scroll > 70% or idle 15s
    const maybeTriggerNewsletter = () => {
      if (dismissedNL) return;

      const dailyDismissed =
        localStorage.getItem("dismissedDailyLearning") === "true";

      if (dailyDismissed) {
        setShowNewsletter(true);
      } else {
        // Daily isn’t closed yet — queue it to show after Daily closes
        setQueuedNewsletter(true);
      }
    };

    const handleScroll = () => {
      const percent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (percent > 70) {
        maybeTriggerNewsletter();
        window.removeEventListener("scroll", handleScroll); // fire once
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Idle 15s fallback
    if (!dismissedNL) {
      idleTimer = setTimeout(() => {
        maybeTriggerNewsletter();
      }, 15000);
    }

    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          onClose={closeDailyLearning} // changed
        />
        <NewsletterPopup
          isOpen={showNewsletter}
          onClose={closeNewsletter} // changed
        />
      </div>
    </Router>
  );
}

export default App;
