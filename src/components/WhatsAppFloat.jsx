import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Sparkles } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show WhatsApp float after 3 seconds or 100px scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+919876543210'; // Replace with actual number
    const message =
      "Hi! I'm interested in learning more about CP Study Center courses. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+919876543210', '_self');
  };

  // Premium animations
  const floatButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
        duration: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(140, 82, 255, 0.3)',
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

  const expandButtonVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: 0.8,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    }),
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Expanded Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Call Button */}
                <motion.button
                  key="call"
                  variants={expandButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCallClick}
                  className="flex items-center gap-2 bg-[#8c52ff] text-white px-5 py-3 rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">Call Us</span>
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  key="whatsapp"
                  variants={expandButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Chat with Us</span>
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            variants={floatButtonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#8c52ff] to-[#ff6b00] text-white shadow-xl shadow-[#8c52ff]/30 border border-white/20"
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Sparkles className="w-6 h-6" />
                  <motion.span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff6b00] rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute bottom-16 right-0 bg-white px-3 py-3 rounded-lg shadow-md w-[180px] text-center text-sm text-neutral-700 font-medium border border-neutral-100"
              >
                Need help? Tap to connect with us!
                <div className="absolute bottom-[-6px] right-[18px] w-3 h-3 bg-white rotate-45 border-r border-b border-neutral-100"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
