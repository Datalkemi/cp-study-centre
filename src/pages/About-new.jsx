import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Target,
  BookOpen,
  Heart,
  Award,
  Users,
  TrendingUp,
  Star,
} from 'lucide-react';

const About = () => {
  const [openSection, setOpenSection] = useState('mission');

  const sections = [
    {
      key: 'mission',
      title: 'Our Mission',
      content:
        'To empower every student with personalized, world-class education through innovative digital experiences that foster critical thinking, creativity, and lifelong learning.',
      icon: Target,
    },
    {
      key: 'vision',
      title: 'Our Vision',
      content:
        'To be the leading educational platform that transforms learning by making it accessible, engaging, and tailored to individual pathways, enabling success for students worldwide.',
      icon: BookOpen,
    },
    {
      key: 'values',
      title: 'Our Values',
      content:
        'Integrity, Innovation, and Inclusion drive our commitment to excellence in education. We believe in transparency, cutting-edge teaching methods, and creating an inclusive environment for all learners.',
      icon: Heart,
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=200&h=200&fit=crop&crop=face',
      bio: 'Education strategist with 15+ years of experience in academic excellence and student success.',
      expertise: [
        'Educational Leadership',
        'Curriculum Design',
        'Student Psychology',
      ],
    },
    {
      name: 'Prof. Rajesh Patel',
      role: 'Head of Academics',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Expert educator and curriculum designer with specialization in STEM education.',
      expertise: ['Mathematics', 'Science', 'Test Preparation'],
    },
    {
      name: 'Maria Rodriguez',
      role: 'Technology Director',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Focused on building seamless digital learning experiences and educational technology.',
      expertise: ['EdTech', 'Digital Learning', 'Platform Development'],
    },
    {
      name: 'David Chen',
      role: 'Student Success Manager',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Dedicated to guiding students towards their academic and career goals.',
      expertise: [
        'Career Counseling',
        'Student Mentoring',
        'Academic Planning',
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        'CP Study Center completely transformed my approach to learning. The personalized attention and innovative teaching methods helped me achieve my academic goals.',
      name: 'Priya Sharma',
      role: 'CBSE Class 12 Student',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      quote:
        'The IELTS preparation program was exceptional. I scored 8.5 overall and got admission to my dream university in Canada.',
      name: 'Ahmed Ali',
      role: 'IELTS Student',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      quote:
        'The teachers are incredibly supportive and the learning environment is perfect for focused study. Highly recommended!',
      name: 'Sneha Patel',
      role: 'Language Prep Student',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Students', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '50+', label: 'Expert Teachers', icon: Award },
    { number: '10+', label: 'Years Experience', icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-accent py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              About CP Study Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Empowering minds, shaping futures through personalized education
              and innovative learning experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on strong principles that guide our commitment to
              educational excellence
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setOpenSection(
                      openSection === section.key ? '' : section.key
                    )
                  }
                  className="w-full flex items-center justify-between px-8 py-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                      openSection === section.key ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openSection === section.key ? 'auto' : 0,
                    opacity: openSection === section.key ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 pt-2">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated educators and professionals committed to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real success stories from our amazing students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their
              lives with our programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300"
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
