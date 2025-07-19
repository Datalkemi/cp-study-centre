import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate form handler with CMS & notifications
    console.log(formData);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our educational consultants
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                name: 'name',
                type: 'text',
                placeholder: 'Your Name',
                icon: MapPin,
              },
              {
                name: 'email',
                type: 'email',
                placeholder: 'Your Email',
                icon: Mail,
              },
              {
                name: 'whatsapp',
                type: 'tel',
                placeholder: 'WhatsApp Number',
                icon: Phone,
              },
              {
                name: 'message',
                type: 'textarea',
                placeholder: 'Your Message',
                icon: MessageSquare,
              },
            ].map((field) => (
              <div key={field.name} className="relative">
                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600" />
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                    rows={4}
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-all duration-300"
            >
              <span>Send Message</span>
            </button>
          </form>
          <div className="mt-12 space-y-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>123 CP Street, Learning City</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <a
                href="tel:+911234567890"
                className="hover:text-primary transition"
              >
                +91 12345 67890
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href="mailto:info@cpstudycenter.com"
                className="hover:text-primary transition"
              >
                info@cpstudycenter.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
