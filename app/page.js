'use client'; // Whiteline: Added this to ensure interactive components load correctly

import Navbar from '../components/Navbar';
import Utilities from '../components/Utilities';
import PixelStudio from '../components/PixelStudio';
import Contact from '../components/Contact';
import { ArrowDown, Terminal, Gamepad2, Code2, Database, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

/* WHITELINE: This is the main assembly point for your portfolio.
   It brings together the Hero section, your Code repos, and the 
   Utility dashboard into one smooth scrolling experience.
*/

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="intro" className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-4 text-center">
        {/* Background Decorative Orbs (The "Frutiger" feel) */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-aero-sky/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aero-grass/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="aero-card p-10 max-w-3xl z-10 bg-white/40 backdrop-blur-xl">
           <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-aero-ocean to-aero-sky mb-4 drop-shadow-sm">
             Maximiliano Garcia
           </h1>
           <p className="text-xl md:text-2xl text-slate-700 font-light mb-8">
             Computer Science • Creative Developer
           </p>
           <div className="flex gap-4 justify-center">
             <a href="/assets/resume.pdf" className="px-8 py-3 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
               Download Resume
             </a>
             <a href="#connect" className="px-8 py-3 bg-white text-aero-ocean border border-aero-ocean rounded-full font-bold shadow-lg hover:bg-blue-50 transition-colors">
               Connect
             </a>
           </div>
        </div>
        
        <ArrowDown className="absolute bottom-10 animate-bounce text-aero-ocean opacity-50" size={32} />
      </section>

      {/* --- PROGRAMMING SECTION --- */}
      <section id="programming" className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="aero-card p-8 bg-gradient-to-br from-blue-50 to-white"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-aero-ocean mb-6 flex items-center gap-3">
            <Terminal /> Programming Repositories
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            A collection of my coding projects across various languages and frameworks
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Python Projects */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900 rounded-xl p-6 text-white shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <Code2 className="text-green-400" size={32} />
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Python</span>
              </div>
              <h3 className="font-bold text-xl text-green-400 mb-2">Python Projects</h3>
              <p className="text-sm text-gray-400 mb-4">High School CS Work, Scripts & Automation Tools</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Algorithms</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Data Structures</span>
              </div>
              <a 
                href="https://github.com/maxgarcia642" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm bg-gray-700 px-4 py-2 rounded-lg inline-block group-hover:bg-green-500 transition-colors"
              >
                View on GitHub →
              </a>
            </motion.div>

            {/* Java Projects */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900 rounded-xl p-6 text-white shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <Database className="text-blue-400" size={32} />
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Java</span>
              </div>
              <h3 className="font-bold text-xl text-blue-400 mb-2">Java AP CS</h3>
              <p className="text-sm text-gray-400 mb-4">Object Oriented Programming & Design Patterns</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">OOP</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">AP CSA</span>
              </div>
              <a 
                href="https://github.com/maxgarcia642" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm bg-gray-700 px-4 py-2 rounded-lg inline-block group-hover:bg-blue-500 transition-colors"
              >
                View on GitHub →
              </a>
            </motion.div>

            {/* Web Development */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900 rounded-xl p-6 text-white shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <Smartphone className="text-purple-400" size={32} />
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">React</span>
              </div>
              <h3 className="font-bold text-xl text-purple-400 mb-2">Web Development</h3>
              <p className="text-sm text-gray-400 mb-4">Modern web apps with React, Next.js & Tailwind</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Next.js</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">React</span>
              </div>
              <a 
                href="https://github.com/maxgarcia642" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm bg-gray-700 px-4 py-2 rounded-lg inline-block group-hover:bg-purple-500 transition-colors"
              >
                View on GitHub →
              </a>
            </motion.div>
          </div>

          {/* GitHub Stats Section */}
          <div className="mt-8 p-6 bg-white/60 rounded-xl border border-white/80">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Contribution Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-aero-ocean mb-1">15+</div>
                <div className="text-sm text-slate-600">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-aero-grass mb-1">500+</div>
                <div className="text-sm text-slate-600">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">5+</div>
                <div className="text-sm text-slate-600">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">2+</div>
                <div className="text-sm text-slate-600">Years</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Utilities />

      {/* --- GAME SECTION --- */}
      <section id="game" className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-aero-grass mb-4 flex justify-center gap-2 items-center">
              <Gamepad2 /> Pixel Art Studio
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Create retro-style 16x16 pixel art. Draw, design, and download your creations!
            </p>
          </div>
          <PixelStudio />
        </motion.div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <Contact />

      <footer className="py-6 text-center text-slate-500 text-sm bg-white/40 backdrop-blur-sm">
        &copy; 2025 Maximiliano Garcia. Powered by Next.js & Frutiger Aero.
      </footer>
    </main>
  );
}
