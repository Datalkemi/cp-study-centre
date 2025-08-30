import React from 'react';
import { motion } from 'framer-motion';

const SkillCourses = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >

      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white 
                       bg-[#8c52ff]
                       rounded-2xl shadow-xl p-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Skill Development Courses
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Future-ready skills for the digital age - Coming Soon
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-lg text-gray-600">
            Exciting skill development programs launching soon
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default SkillCourses;
