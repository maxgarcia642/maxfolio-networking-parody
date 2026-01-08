"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Effect hook to keep the clock updated every second
  useEffect(() => {
    const updateTime = () => {
      // Get Central Time (US) for that authentic Wii experience
      const ct = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date());
      setTime(ct);
    };
    updateTime();
    // Update every 10 seconds to save on system "resources"
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Audio control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      // Try to autoplay (may be blocked by browser)
      audioRef.current.play().catch(() => {
        // Autoplay was prevented, user needs to interact first
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const channels = [
    { title: "Main Menu", icon: "🏠", desc: "System Core", onClick: () => window.location.href = '/' },
    { title: "Explore", icon: "🌐", desc: "Corporate Network", onClick: () => window.location.href = '/explore?tab=users' },
    { title: "Users", icon: "👥", desc: "Active Registry", onClick: () => window.location.href = '/explore?tab=users' },
    { title: "Create Account", icon: "🧙‍♂️", desc: "Profile Wizard", onClick: () => window.location.href = '/create' },
    { title: "Sign In", icon: "🔐", desc: "Mainframe Audit", onClick: () => window.location.href = '/explore?tab=signin' },
    { title: "Jobs", icon: "💼", desc: "Available Jobs", onClick: () => window.location.href = '/explore?tab=jobs' },
    { title: "Matchmaker", icon: "❤️", desc: "The Void Loves You", onClick: () => window.location.href = '/explore?tab=matchmaker' },
    { title: "The Markets", icon: "💹", desc: "Market 5,000", onClick: () => window.location.href = '/explore?tab=economy' },
    { title: "Musicianship", icon: "🎹", desc: "Sonic Creator", onClick: () => window.location.href = '/explore?tab=artist' },
    { title: "Help", icon: "❓", desc: "External Docs", onClick: () => window.location.href = 'https://maxgarcia642.github.io/' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.stocktune.com/free-music/track/ethereal-aero-4659-18855.mp3"
      />
      
      {/* Floating Clouds */}
      <div className="frutiger-clouds">
        <div className="cloud" style={{ width: '200px', height: '80px', top: '10%', animationDuration: '45s' }}></div>
        <div className="cloud" style={{ width: '150px', height: '60px', top: '5%', animationDuration: '60s', animationDelay: '-20s' }}></div>
        <div className="cloud" style={{ width: '180px', height: '70px', top: '15%', animationDuration: '55s', animationDelay: '-30s' }}></div>
        <div className="cloud" style={{ width: '120px', height: '50px', top: '8%', animationDuration: '70s', animationDelay: '-10s' }}></div>
      </div>

      {/* Music Credit - Bottom Left */}
      <div className="music-credit">
        🎵 Music: <a href="https://stocktune.com/free-music/ethereal-aero-4659-18855" target="_blank" rel="noopener noreferrer">Ethereal Aero</a> by StockTune
        <button 
          onClick={toggleMute}
          className="ml-2 px-2 py-0.5 bg-white/20 rounded hover:bg-white/40 transition-colors"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="w-full max-w-5xl aspect-[4/3] bg-[#eef2f3]/95 rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border-[16px] border-[#d9dfe1] relative overflow-hidden flex flex-col p-12 backdrop-blur-sm">
        {/* Wii background accents */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full border-[30px] border-blue-200"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full border-[30px] border-blue-200"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-5xl font-black text-[#5a5e62] tracking-tighter italic drop-shadow-sm hover:text-blue-500 hover:scale-105 transition-all cursor-default">
                        Maxfolio<span className="text-[#00a0e9]">Adventurer</span>
                    </div>
                    <div className="text-sm font-bold text-gray-400 mt-1 ml-1 tracking-widest uppercase hover:text-gray-600 transition-colors cursor-default">
                        Welcome to the Void
                    </div>
                </div>
                <div className="bg-white/80 px-8 py-3 rounded-full text-xl font-black text-gray-500 border-2 border-white shadow-inner hover:shadow-lg hover:text-blue-400 transition-all cursor-wait">
                    {time || '--:-- --'}
                </div>
            </div>

            {/* Updated grid: 5 columns, 2 rows for 10 items */}
            <div className="grid grid-cols-5 grid-rows-2 gap-4 flex-1 px-2">
                {channels.map((ch, idx) => (
                    <div 
                        key={idx}
                        onClick={ch.onClick}
                        className={`
                            relative bg-gradient-to-br from-white to-[#f0f3f5] rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] 
                            border-2 border-white/80 flex flex-col items-center justify-center p-3 cursor-pointer
                            hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden active:scale-95
                            ${idx === 8 ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200' : ''}
                        `}
                    >
                        <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{ch.icon}</div>
                        <div className="text-[10px] font-black text-gray-700 text-center leading-tight uppercase tracking-tighter group-hover:text-blue-500 transition-colors">{ch.title}</div>
                        <div className="text-[8px] text-gray-400 mt-0.5 font-bold group-hover:text-gray-600 transition-colors">{ch.desc}</div>
                        <div className="absolute top-0 left-0 w-full h-[45%] bg-white/40 rounded-t-2xl"></div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 group cursor-pointer" onClick={() => window.location.reload()}>
                 <div className="w-32 h-10 bg-cyan-100/60 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:bg-cyan-200/80 transition-all active:scale-95 group overflow-hidden relative">
                    {/* Frutiger Aero Glossy Overlay */}
                    <div className="absolute top-0 left-0 w-full h-[40%] bg-white/40 rounded-t-full"></div>
                    <div className="w-4 h-4 bg-cyan-400 rounded-sm animate-pulse group-hover:scale-125 transition-transform flex items-center justify-center border border-cyan-300">
                        <div className="w-2 h-2 bg-white rounded-xs opacity-80"></div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Wii Menu Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400/20 via-transparent to-blue-400/20"></div>
      </div>
    </div>
  );
}
