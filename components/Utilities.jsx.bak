'use client';

import { useState } from 'react';
import { TrendingUp, Music, CloudSun, Box, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration for the tabs
const TABS = [
  { id: 'finance', label: 'Finance', icon: TrendingUp },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tools', label: 'Tools', icon: Box },
];

export default function Utilities() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <section id="utilities" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="aero-card p-6 min-h-[500px] flex flex-col">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 z-10 relative">Utilities Dashboard</h2>
        
        {/* Tab Switcher Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 z-10 relative">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-aero-ocean text-white shadow-glow scale-105' 
                : 'bg-white/50 text-slate-600 hover:bg-white'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area - Switches based on activeTab */}
        <div className="flex-1 bg-white/40 rounded-2xl p-6 border border-white/50 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              {/* --- FINANCE TAB --- */}
              {activeTab === 'finance' && (
                <div className="space-y-4">
                  <div className="h-64 rounded-xl overflow-hidden shadow-inner border border-slate-200 bg-white">
                     {/* Note: This is a placeholder iframe for a stock chart */}
                     <div className="w-full h-full flex items-center justify-center text-slate-400">
                        Market Data Visualization Loading...
                     </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Yahoo Finance', 'MarketWatch', 'ETF.com', 'TreasuryDirect'].map(link => (
                      <button key={link} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:text-aero-ocean flex items-center justify-between transition-all">
                        {link} <ExternalLink size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- MUSIC TAB --- */}
              {activeTab === 'music' && (
                <div className="text-center p-10">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-8 rounded-2xl mb-4 shadow-lg">
                    <h3 className="text-2xl font-bold">Discogs Search Agent</h3>
                    <p className="opacity-90">Coming Soon: AI-Ranked Vinyl Finder</p>
                  </div>
                </div>
              )}

              {/* --- TOOLS TAB --- */}
              {activeTab === 'tools' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                     <h4 className="font-bold text-lg">Subnet Calculator</h4>
                     <p className="text-sm text-slate-500">Calculate IP ranges efficiently.</p>
                   </div>
                   <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-aero-sky">
                     <h4 className="font-bold text-lg">Unit Converter</h4>
                     <p className="text-sm text-slate-500">Engineering & Physics conversions.</p>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
