import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Share2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DailyLearningPopup = ({ isOpen, onClose }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const learningTips = [
    {
      icon: BookOpen,
      title: 'Study Tip of the Day',
      content:
        'Use the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents mental fatigue.',
      category: 'Study Technique',
    },
    {
      icon: TrendingUp,
      title: 'Academic Insight',
      content:
        'Did you know? Students who practice active recall (testing themselves) retain 50% more information than those who just re-read their notes.',
      category: 'Learning Science',
    },
    {
      icon: Clock,
      title: 'Time Management',
      content:
        'Create a priority matrix: Urgent & Important tasks first, then Important but not Urgent. This helps you focus on what truly matters.',
      category: 'Productivity',
    },
  ];

  const navigateTip = (direction) => {
    if (direction === 'next') {
      setCurrentTip((prev) =>
        prev === learningTips.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentTip((prev) =>
        prev === 0 ? learningTips.length - 1 : prev - 1
      );
    }
  };

  const shareTip = () => {
    const tip = learningTips[currentTip];
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: `${tip.title}: ${tip.content}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${tip.title}: ${tip.content}`);
      // Could show a toast notification here
    }
  };

  const currentLearningTip = learningTips[currentTip];
  const IconComponent = currentLearningTip.icon;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const navButtonVariants = {
    rest: {
      scale: 1,
      backgroundColor: 'rgba(140, 82, 255, 0.1)',
      color: '#8c52ff',
    },
    hover: {
      scale: 1.1,
      backgroundColor: '#8c52ff',
      color: '#ffffff',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tip content */}
            <div className="relative overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#8c52ff] to-[#6d3fcc] p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold tracking-tight">Daily Learning</h3>
                    <div className="text-xs font-medium text-white/80">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <div className="mb-1.5">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8c52ff]/10 text-[#8c52ff]">
                    {currentLearningTip.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {currentLearningTip.title}
                </h3>
                <p className="text-neutral-600">{currentLearningTip.content}</p>
              </div>

              {/* Navigation and actions */}
              <div className="flex items-center justify-between p-4 border-t border-neutral-100">
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateTip('prev')}
                    className="p-2 rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateTip('next')}
                    className="p-2 rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareTip}
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>

                  <Link to="/daily-learning">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-[#8c52ff] hover:bg-[#6d3fcc] text-white text-sm rounded-lg shadow-md shadow-[#8c52ff]/20 font-medium transition-all duration-300"
                    >
                      View All Tips
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Decorative element */}
              <motion.div
                className="absolute top-14 right-4 opacity-10 pointer-events-none"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                  duration: 10,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-32 h-32 text-[#8c52ff]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DailyLearningPopup;
