import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, Star, Sparkles, Check } from 'lucide-react';

const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubscribed(true);

        // Close after success message is shown
        setTimeout(() => {
          onClose();
        }, 2500);
      }, 1000);
    }
  };

  // Premium animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        bounce: 0.3,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  const successVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const formInputVariants = {
    rest: {
      boxShadow: '0 0 0 rgba(140, 82, 255, 0)',
    },
    focus: {
      boxShadow: '0 0 0 3px rgba(140, 82, 255, 0.3)',
    },
  };

  const buttonVariants = {
    rest: {
      backgroundColor: '#8c52ff',
    },
    hover: {
      backgroundColor: '#6d3fcc',
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      y: 0,
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
    submitting: {
      backgroundColor: '#8c52ff',
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5,
      },
    },
  };

  const benefits = [
    'Weekly study techniques and productivity tips',
    'Exclusive access to practice materials',
    'Early notification for free webinars',
    'Academic success stories for inspiration',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.div key="subscribe-form">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#8c52ff] to-[#ff6b00] p-8 text-white relative overflow-hidden">
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-center relative z-10"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="inline-block mb-3"
                      >
                        <Gift className="w-10 h-10 mx-auto" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl font-bold mb-2"
                      >
                        Get Weekly Study Tips!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-white/90"
                      >
                        Join our newsletter for exclusive study materials, tips,
                        and upcoming webinar alerts.
                      </motion.p>
                    </motion.div>

                    {/* Background elements */}
                    <motion.div
                      className="absolute top-5 right-6 opacity-20"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Sparkles className="w-24 h-24" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 left-8 opacity-20"
                      animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                      <Star className="w-16 h-16" />
                    </motion.div>
                  </div>

                  {/* Form */}
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6 pt-5"
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-neutral-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff]/30 focus:border-[#8c52ff] focus:outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      <motion.button
                        variants={buttonVariants}
                        initial="rest"
                        whileHover={isSubmitting ? {} : 'hover'}
                        whileTap={isSubmitting ? {} : 'tap'}
                        animate={isSubmitting ? 'submitting' : 'rest'}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium text-base transition-all duration-200 ${
                          isSubmitting
                            ? 'bg-[#8c52ff] cursor-not-allowed opacity-80'
                            : 'bg-[#8c52ff] hover:bg-[#6d3fcc] shadow-md shadow-[#8c52ff]/20 hover:shadow-lg hover:shadow-[#8c52ff]/30'
                        }`}
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                      </motion.button>
                    </form>

                    <div className="mt-4 text-center text-sm text-neutral-500">
                      We respect your privacy. Unsubscribe anytime.
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial="hidden"
                  animate="visible"
                  className="p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-green-600" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl font-bold text-neutral-800 mb-2"
                  >
                    Thank You for Subscribing!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-neutral-600 mb-4"
                  >
                    We've sent a confirmation email to your inbox. Please check
                    to complete your subscription.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
