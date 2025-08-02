import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Target, BookOpen, Heart, Award, Users, TrendingUp, MessageSquare, Star } from 'lucide-react';

const About = () => {
  const [openSection, setOpenSection] = useState('Mission');
  const sections = [
    { key: 'Mission', content: 'Our mission is to empower every student with personalized, world-class education through innovative digital experiences.' },
    { key: 'Vision', content: 'We envision a future where learning is accessible, engaging, and tailored to individual pathways, enabling lifelong success.' },
    { key: 'Values', content: 'Integrity, Innovation, and Inclusion drive our commitment to excellence in education and community impact.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16"
    >
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CP Study Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Learn more about our mission, vision, and dedicated team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((sec) => (
            <div key={sec.key} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === sec.key ? '' : sec.key)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-xl font-semibold text-gray-800">{sec.key}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${openSection === sec.key ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openSection === sec.key && (
                <div className="px-6 py-4 text-gray-700">
                  {sec.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
            {/*
              Team member data should ideally come from a CMS or database
              This is just placeholder data
            */}
            {/*
              Example team member object:
              {
                name: 'Alice Johnson',
                role: 'Founder & CEO',
                avatar: '/path/to/alice.jpg',
                bio: 'Education strategist with 10+ years of experience.'
              }
            */}
            {/*
              Replace the below array with dynamic data
            */}
            {[
              {
                name: 'Akshay Biju',
                role: 'CEO & Co-founder',
                avatar: './assets/team/Akshay.png',
                bio: 'CEO & Co-Founder of CP Study Center, with 3+ years in language training, communication, and skill development. Trained 1000+ students for global education and career success. Leads impactful programs in test preparation, student mentoring, and career readiness. BCA graduate from Kerala University, focused on real-world learning and impact.'
              },

              {
                name: 'Aravind B',
                role: 'Co-founder',
                avatar: './assets/team/Aravind.png',
                bio: 'Financial Analyst at JP Morgan with expertise in data modeling, analytics, and financial forecasting. 3+ years of teaching experience in Mathematics and Finance. MBA in Finance (Symbiosis) and B.Tech in EEE (GEC Barton Hill); Alteryx certified. Co-founded a startup and led multiple student initiatives with a focus on real-world problem solving.'
              },
              {
                name: 'Arun S',
                role: 'Advisory Partner',
                avatar: './assets/team/Arun.png',
                bio: 'M.Phil. from JNU, M.A. from University of Hyderabad, UGC-NET qualified, and UG university rank holder. 7+ years of teaching experience across school, college, and UPSC platforms. Worked as an educator at reputed IAS academies like iLearn and Fortune IAS. Known for clear explanations, student engagement, and modern teaching style.'
              },
            ].map((member) => (
              <div key={member.name} className="relative group">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-60 h-60 rounded-full mx-auto mb-4 object-cover shadow-card"
                />
                <h3 className="text-xl font-semibold text-gray-900 text-center">{member.name}</h3>
                <p className="text-gray-600 text-center mb-2">{member.role}</p>
                <div className="absolute inset-0 bg-[#8c52ff] bg-opacity-70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                  <p className="text-white text-md ">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Students Say</h2>
          <motion.div
            className="flex overflow-x-auto space-x-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/*
              Testimonial data should also come from a CMS or database
              This is just placeholder data
            */}
            {/*
              Example testimonial object:
              {
                quote: 'CP Study Center transformed my grades!',
                name: 'Samira K.',
                avatar: '/path/to/samira.jpg'
              }
            */}
            {/*
              Replace the below array with dynamic data
            */}
            {[
              { quote: 'CP Study Center transformed my grades!', name: 'Samira K.', avatar: '/path/to/samira.jpg' },
              { quote: 'Incredible personalized attention and support.', name: 'Vikram S.', avatar: '/path/to/vikram.jpg' },
              { quote: 'A truly engaging learning experience.', name: 'Fatima Z.', avatar: '/path/to/fatima.jpg' },
            ].map((t, i) => (
              <div key={i} className="flex-none w-80 bg-gray-50 rounded-2xl shadow-lg p-6 text-center">
                <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-700 mb-4 italic">“{t.quote}”</p>
                <div className="flex items-center justify-center space-x-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-semibold text-gray-900">{t.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
