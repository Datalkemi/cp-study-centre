import React, { useEffect, useState } from "react";
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

// NEW: Global Enquiry Modal
import { EnquiryModalProvider } from "./context/EnquiryModalContext";
import EnquiryModalRoot from "./components/EnquiryModalRoot";

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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const main = document.querySelector("main");
      if (main && typeof main.scrollTo === "function") {
        main.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, [pathname]);
  return null;
};

function AppInner() {
  const [showDailyLearning, setShowDailyLearning] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [queuedNewsletter, setQueuedNewsletter] = useState(false);

  const closeDailyLearning = () => {
    setShowDailyLearning(false);
    localStorage.setItem("dismissedDailyLearning", "true");

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

    if (!dismissedDL) {
      dailyTimer = setTimeout(() => setShowDailyLearning(true), 5000);
    }

    const maybeTriggerNewsletter = () => {
      if (dismissedNL) return;

      const dailyDismissed =
        localStorage.getItem("dismissedDailyLearning") === "true";

      if (dailyDismissed) {
        setShowNewsletter(true);
      } else {
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
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

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

      {/* Existing popups */}
      <DailyLearningPopup isOpen={showDailyLearning} onClose={closeDailyLearning} />
      <NewsletterPopup isOpen={showNewsletter} onClose={closeNewsletter} />

      {/* NEW: Global Enquiry Modal mounted once */}
      <EnquiryModalRoot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <EnquiryModalProvider>
        <ScrollToTop />
        <AppInner />
      </EnquiryModalProvider>
    </Router>
  );
}
