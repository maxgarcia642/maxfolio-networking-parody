'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/maxgarcia642',
    color: 'from-gray-700 to-gray-900',
    description: 'Check out my code repositories'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/maximiliano-garcia',
    color: 'from-blue-600 to-blue-800',
    description: 'Connect with me professionally'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:max@example.com',
    color: 'from-aero-sky to-aero-ocean',
    description: 'Send me a message'
  },
  {
    name: 'Resume',
    icon: FileText,
    url: '/assets/resume.pdf',
    color: 'from-green-600 to-green-800',
    description: 'Download my resume'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Contact() {
  return (
    <section id="connect" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="aero-card p-8 md:p-12 bg-gradient-to-br from-white/60 to-blue-50/60"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-aero-ocean to-aero-sky mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden"
            >
              <div className="aero-card p-6 h-full bg-white/80 hover:bg-white transition-all">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow`}>
                  <link.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                  {link.name}
                  <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                </h3>
                <p className="text-sm text-slate-600">{link.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form Section (Optional Enhancement) */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/60 rounded-2xl p-6 md:p-8 border border-white/80"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Quick Message
          </h3>
          <form className="space-y-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-aero-sky focus:ring-2 focus:ring-aero-sky/20 transition-all outline-none bg-white/80"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-aero-sky focus:ring-2 focus:ring-aero-sky/20 transition-all outline-none bg-white/80"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-aero-sky focus:ring-2 focus:ring-aero-sky/20 transition-all outline-none resize-none bg-white/80"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-full font-bold shadow-lg hover:shadow-glow hover:scale-105 transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-slate-600 text-sm"
        >
          <p>Based in [Your Location] • Available for opportunities</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
