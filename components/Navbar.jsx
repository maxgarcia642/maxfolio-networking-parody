'use client'; // Required for animations and interaction

import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { id: 'intro', label: 'Home', desc: 'Back to start' },
  { id: 'programming', label: 'Code', desc: 'Github Repos' },
  { id: 'utilities', label: 'Utils', desc: 'Finance & Tools' },
  { id: 'game', label: 'Game', desc: 'Pixel Studio' },
  { id: 'connect', label: 'Connect', desc: 'Social Links' },
];

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  return (
    // Animation: Slides down from top when page loads
    <motion.header 
      initial={{ y: -100 }} animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="aero-card !rounded-full px-4 py-2 flex gap-1 sm:gap-4 shadow-2xl bg-white/60">
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            <a 
              href={`#${item.id}`}
              className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-aero-ocean transition-all duration-200 relative z-10 block"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.label}
            </a>
            
            {/* Logic: If hovered, show the blue glow background */}
            {hovered === item.id && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute inset-0 bg-white/80 rounded-full -z-0 shadow-glow"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Tooltip: Shows description on hover */}
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max">
              <div className="bg-aero-ocean text-white text-xs px-3 py-1 rounded-full shadow-lg">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.header>
  );
}
