'use client';

import { useState } from 'react';
import { TrendingUp, Music, CloudSun, Box, ExternalLink, DollarSign, Disc, Calculator, Zap } from 'lucide-react';
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
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="aero-card p-6 min-h-[500px] flex flex-col"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 z-10 relative">Utilities Dashboard</h2>
        <p className="text-slate-600 mb-6 z-10 relative">Practical tools and resources I use daily</p>
        
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
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {/* --- FINANCE TAB --- */}
              {activeTab === 'finance' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <DollarSign className="text-green-600" /> Market Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-xs text-slate-500 mb-1">S&P 500</div>
                        <div className="text-lg font-bold text-green-600">↑ 4,500</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-xs text-slate-500 mb-1">NASDAQ</div>
                        <div className="text-lg font-bold text-green-600">↑ 14,200</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-xs text-slate-500 mb-1">DOW</div>
                        <div className="text-lg font-bold text-red-600">↓ 35,800</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-xs text-slate-500 mb-1">VIX</div>
                        <div className="text-lg font-bold text-orange-600">15.2</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-700 mb-3">Financial Resources</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Yahoo Finance', url: 'https://finance.yahoo.com' },
                        { name: 'MarketWatch', url: 'https://www.marketwatch.com' },
                        { name: 'ETF.com', url: 'https://www.etf.com' },
                        { name: 'TreasuryDirect', url: 'https://www.treasurydirect.gov' }
                      ].map(link => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:text-aero-ocean flex items-center justify-between transition-all group"
                        >
                          <span className="text-sm font-medium">{link.name}</span>
                          <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-slate-600">
                      <strong>Note:</strong> Track market trends, analyze ETFs, and manage investments efficiently.
                    </p>
                  </div>
                </div>
              )}

              {/* --- MUSIC TAB --- */}
              {activeTab === 'music' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl mb-4 shadow-lg border border-purple-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Disc className="text-white" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Discogs Search Agent</h3>
                        <p className="text-slate-600">AI-Powered Vinyl Discovery</p>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4">
                      Intelligent vinyl record finder that ranks results based on condition, price, and seller ratings.
                    </p>
                    <div className="bg-white/60 p-4 rounded-xl">
                      <div className="text-sm text-slate-600 mb-2">Coming Soon Features:</div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Price comparison
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Condition analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Seller reputation
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Smart recommendations
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
                      <h4 className="font-bold text-lg mb-2">Music Collection</h4>
                      <p className="text-sm text-slate-600">Organize and track your vinyl records</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                      <h4 className="font-bold text-lg mb-2">Wishlist Manager</h4>
                      <p className="text-sm text-slate-600">Keep track of records you want</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TOOLS TAB --- */}
              {activeTab === 'tools' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calculator className="text-green-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Subnet Calculator</h4>
                          <p className="text-sm text-slate-600 mb-3">
                            Calculate IP ranges, subnet masks, and network addresses efficiently.
                          </p>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded">IPv4</span>
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded">CIDR</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-aero-sky"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Zap className="text-aero-sky" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Unit Converter</h4>
                          <p className="text-sm text-slate-600 mb-3">
                            Engineering and Physics unit conversions for technical work.
                          </p>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Length</span>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Mass</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Box className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Base64 Encoder</h4>
                          <p className="text-sm text-slate-600 mb-3">
                            Encode and decode Base64 strings for web development.
                          </p>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">Encode</span>
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">Decode</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <CloudSun className="text-orange-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Color Picker</h4>
                          <p className="text-sm text-slate-600 mb-3">
                            Extract and convert colors between different formats.
                          </p>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded">HEX</span>
                            <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded">RGB</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-slate-600">
                      <strong>Developer Tools:</strong> Essential utilities for web development, networking, and productivity.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
