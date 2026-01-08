"use client";
import React, { useState, useEffect, useRef } from 'react';
import { generateJob, generateMatch } from '../../lib/generators';

export default function Explore() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedJobs, setGeneratedJobs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [investment, setInvestment] = useState(0);
  const [profit, setProfit] = useState(0);
  const [balance, setBalance] = useState(1000); 
  const [isShrunk, setIsShrunk] = useState(false);
  const [showSpamInbox, setShowSpamInbox] = useState(false);
  const [spamMessages, setSpamMessages] = useState([]);
  const canvasRef = useRef(null);
  
  // Chaotic Timeline State
  const [timeline, setTimeline] = useState({ month: 'JAN', year: 2025 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      setLoading(true);
      fetch('/api/profiles')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setUsers(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    if (activeTab === 'jobs' && generatedJobs.length === 0) {
      handleGenerateJobs();
    }
  }, [activeTab]);

  // Effect hook to initialize and manage the economy graph
  useEffect(() => {
    if (activeTab === 'economy' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let x = canvas.width;
      let y = canvas.height / 2;
      let points = [{x, y, color: '#00ff00'}];
      
      /**
       * Core drawing function for the canvas.
       * Handles background, grid lines, and the main jittery graph line.
       */
      const draw = () => {
        // Clear background with deep black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines for that vintage terminal look
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
        for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
        ctx.stroke();

        // Draw the main graph line based on accumulated points
        ctx.lineWidth = 3;
        for(let i=1; i<points.length; i++) {
            ctx.strokeStyle = points[i].color;
            ctx.beginPath();
            ctx.moveTo(points[i-1].x, points[i-1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }

        // Draw the "active" pixel tracker
        ctx.fillStyle = '#fff';
        ctx.fillRect(x-4, y-4, 8, 8);

        // Recursive call for smooth animation
        if (activeTab === 'economy') {
            requestAnimationFrame(draw);
        }
      };

      /**
       * Interval for calculating the chaotic movement.
       * Uses left-leaning bias and random spikes for volatility.
       */
      const interval = setInterval(() => {
        const roll = Math.random();
        let dx = (Math.random() - 0.7) * 20; // Bias towards left movement
        let dy = (Math.random() - 0.5) * 80; // High vertical squiggling
        let color = '#00ff00';

        // 360-style vertical shoot (Moon shot or Rug pull)
        if (roll < 0.1) { 
            dy = (Math.random() - 0.5) * 200;
            color = roll < 0.05 ? '#ff0000' : '#00ffff';
        }

        x += dx;
        y += dy;
        
        // Loop-de-loop logic for that specific "scribble" request
        if (roll < 0.03) {
            points.push({x: x-30, y: y-30, color});
            points.push({x: x-60, y: y, color});
            points.push({x: x-30, y: y+30, color});
            x -= 60;
        }

        // Boundary enforcement (keep it in the viewport)
        if (y < 10) y = 10;
        if (y > canvas.height - 10) y = canvas.height - 10;
        if (x > canvas.width) x = canvas.width;
        if (x < 0) x = canvas.width; // Wrap around if it goes off left

        points.push({x, y, color});
        
        // Limit point count to prevent memory leaks/slowdowns
        if (points.length > 100) points.shift();
        
        // Update profit based on the last movement's intensity
        const delta = color === '#ff0000' ? -500 : color === '#00ffff' ? 500 : (Math.random() - 0.5) * 100;
        setProfit(p => p + delta);

        // Update Chaotic Timeline X-Axis
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        setTimeline(prev => {
            const nextMonth = months[Math.floor(Math.random() * months.length)];
            const nextYear = Math.floor((Math.random() - 0.5) * 2000000); 
            return { month: nextMonth, year: nextYear };
        });
      }, 70); 

      draw();
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const handleAcceptJob = (job) => {
    if (job.expired) {
      alert('SYSTEM ERROR: OPPORTUNITY LOST.');
      return;
    }
    alert(`HIRED! You are now a ${job.title} at ${job.company}.`);
  };

  const handleGenerateJobs = () => {
    const newJobs = Array.from({ length: 12 }, () => ({ 
        ...generateJob(), 
        id: Math.random(), 
        expired: false,
        expireTime: Date.now() + (Math.random() * 5000 + 1000) 
    }));
    setGeneratedJobs(prev => [...prev, ...newJobs]);
  };

  const handleGenerateMatches = () => {
    const newMatches = Array.from({ length: 8 }, () => generateMatch());
    setMatches(prev => [...newMatches, ...prev].slice(0, 50));
    
    // Generate some spam messages for the chat box
    const messages = [
        "Are you real? My source code says you are.",
        "Hey... noticed you browsing the void.",
        "Marry me in the data center? Please?",
        "I have a single electron to share.",
        "Exchanging encrypted haikus tonight?",
        "Looking for someone to help me stare into the abyss.",
        "I manifestoed you into my firewall.",
        "My heart of silicon is beating for you.",
        "Will you be my player 2?",
        "Don't ignore my cache requests!"
    ];
    setSpamMessages(prev => [...Array.from({length: 3}, () => messages[Math.floor(Math.random()*messages.length)]), ...prev].slice(0, 100));
  };

  useEffect(() => {
    if (activeTab === 'matchmaker') {
        handleGenerateMatches();
        const i = setInterval(handleGenerateMatches, 2000);
        return () => clearInterval(i);
    }
  }, [activeTab]);

  useEffect(() => {
      const jobTicker = setInterval(() => {
          setGeneratedJobs(prev => prev.map(j => {
              if (!j.expired && Date.now() > j.expireTime) {
                  return { ...j, expired: true };
              }
              return j;
          }));
      }, 500);
      return () => clearInterval(jobTicker);
  }, []);

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-[#008080]">
      {isShrunk && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center cursor-pointer group"
            onClick={() => setIsShrunk(false)}
        >
            <div className="bg-white p-8 border-4 border-gray-400 text-center space-y-4 hover:border-blue-400 hover:scale-105 transition-all shadow-2xl">
                <div className="text-4xl font-black text-red-600 animate-ping group-hover:text-red-400 transition-colors">WHAT HAVE YOU DONE</div>
                <div className="text-sm font-bold text-gray-600 uppercase group-hover:text-blue-600 transition-colors">System Shrunk to Sub-Atomic Levels. Click to Re-Big.</div>
            </div>
        </div>
      )}
      <div className={`win95-window w-full max-w-6xl transition-all duration-500 ${isShrunk ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="win95-title-bar group">
          <div className="flex items-center gap-2">
            <span className="text-sm">🌐</span>
            <span className="group-hover:text-blue-400 group-hover:scale-[1.01] transition-all">Corporate-Network-Explorer.exe</span>
          </div>
          <div className="flex gap-1">
            <button className="win95-button py-0 px-1 text-xs hover:bg-gray-100 transition-colors" onClick={() => setIsShrunk(true)}>_</button>
            <button className="win95-button py-0 px-1 text-xs font-bold hover:bg-red-500 hover:text-white transition-all" onClick={() => window.location.href = '/'}>X</button>
          </div>
        </div>
        
        <div className="bg-[#c0c0c0] p-1 border-b-2 border-gray-600 flex gap-1 flex-wrap">
          <button 
            onClick={() => window.location.href = '/'}
            className="win95-button text-[10px] px-4 uppercase tracking-tighter bg-blue-100 hover:bg-blue-200 hover:scale-105 transition-all"
          >
            ← Main Menu
          </button>
          {[
              {id: 'signin', label: 'Sign In', icon: '🔐'},
              {id: 'users', label: 'Active Users', icon: '👥'},
              {id: 'jobs', label: 'Available Jobs', icon: '💼'},
              {id: 'matchmaker', label: 'Matchmaker', icon: '❤️'},
              {id: 'economy', label: 'Economy', icon: '💹'}
          ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`win95-button text-[10px] px-4 uppercase tracking-tighter hover:bg-gray-100 hover:scale-105 transition-all ${activeTab === tab.id ? 'shadow-[inset_3px_3px_#404040] bg-gray-400' : ''}`}
              >
                {tab.icon} {tab.label}
              </button>
          ))}
        </div>

        <div className="p-4 bg-[#c0c0c0] h-[750px] overflow-hidden flex flex-col">
            <div className="bg-white flex-1 win95-inset overflow-y-auto p-6 hover:border-blue-300 transition-colors">
                {activeTab === 'signin' && (
                    <div className="max-w-sm mx-auto space-y-6 pt-20 text-center">
                    <div className="text-6xl animate-bounce hover:rotate-12 cursor-pointer transition-transform">🔐</div>
                    <h2 className="font-black text-2xl text-blue-900 uppercase italic tracking-widest hover:text-blue-600 transition-colors">Mainframe Audit</h2>
                    <div className="space-y-4 pt-4">
                        <div className="win95-inset p-1 hover:shadow-md transition-shadow"><input type="text" placeholder="IDENTITY" className="w-full p-2 text-sm outline-none font-mono focus:bg-blue-50" /></div>
                        <div className="win95-inset p-1 hover:shadow-md transition-shadow"><input type="password" placeholder="PASSCODE" className="w-full p-2 text-sm outline-none font-mono focus:bg-blue-50" /></div>
                        <button className="win95-button w-full py-4 text-xl bg-blue-100 hover:bg-blue-200 hover:scale-[1.02] active:scale-95 transition-all">EXECUTE LOGIN</button>
                        <div className="flex items-center gap-2 pt-2">
                            <div className="flex-1 h-[2px] bg-gray-300"></div>
                            <span className="text-[10px] font-bold text-gray-400">OR</span>
                            <div className="flex-1 h-[2px] bg-gray-300"></div>
                        </div>
                        <button 
                            className="win95-button w-full py-2 text-sm bg-yellow-50 hover:bg-yellow-100 hover:scale-[1.02] active:scale-95 transition-all font-black uppercase italic"
                            onClick={() => window.location.href = '/create'}
                        >
                            Create Account
                        </button>
                    </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="space-y-6">
                    <div className="flex justify-between items-end border-b-4 border-blue-900 pb-2 group">
                        <h2 className="font-black text-3xl text-blue-900 uppercase italic group-hover:text-blue-500 group-hover:translate-x-1 transition-all">Corporate Network: Active Users</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((u, i) => (
                                <div key={i} className="win95-window p-4 flex flex-col hover:scale-105 hover:shadow-xl hover:border-blue-400 transition-all cursor-help bg-white/80 backdrop-blur-sm group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-lg font-black text-blue-800 underline hover:text-blue-500 transition-colors group-hover:animate-pulse">@{u.username}</div>
                                <div className="text-[8px] bg-red-100 border border-red-800 px-1 font-mono uppercase text-red-900 hover:bg-red-200 transition-colors">PW: {u.password}</div>
                            </div>
                            <div className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-tighter hover:bg-yellow-50 transition-colors inline-block group-hover:translate-x-1">{u.job}</div>
                            <div className="text-[9px] font-bold text-gray-600 mb-2 hover:text-gray-900 transition-colors">SKILLS: {u.skills}</div>
                            <div className="win95-inset bg-gray-50 p-2 text-[10px] flex-1 mb-3 italic text-gray-700 leading-tight hover:bg-white hover:shadow-inner transition-all">
                                {u.bio}
                            </div>
                            <div className="text-[9px] text-blue-600 truncate hover:underline hover:text-blue-400">{u.portfolio_url}</div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div className="space-y-8">
                    <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg group">
                        <h2 className="font-black text-2xl uppercase tracking-widest text-white group-hover:italic group-hover:scale-105 transition-all">Career-Void-Link (ZipVoid)</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                    {generatedJobs.map((j) => (
                        <div key={j.id} className={`win95-window p-6 relative flex flex-col md:flex-row gap-6 ${j.expired ? 'grayscale opacity-30' : 'hover:border-blue-600 bg-white shadow-md'}`}>
                            {j.expired && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><span className="text-red-700 font-black text-6xl rotate-12 border-4 border-red-700 px-4 opacity-50 uppercase">Position Filled</span></div>}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="text-blue-800 text-2xl font-black uppercase tracking-tight">{j.title}</div>
                                    <div className="text-lg font-bold text-gray-600 italic">at {j.company}</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div className="space-y-2">
                                        <p><strong>Responsibilities:</strong> {j.responsibility}</p>
                                        <p><strong>Quals:</strong> {j.quals}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p><strong>Perks:</strong> {j.benefits}</p>
                                        <p><strong>Compensation:</strong> <span className="bg-green-100 text-green-900 font-bold px-2">{j.pay}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-48 flex flex-col justify-center">
                                <button className={`win95-button w-full py-6 text-xl uppercase font-black ${j.expired ? 'bg-gray-200' : 'bg-green-100'}`} onClick={() => handleAcceptJob(j)}>
                                    {j.expired ? 'EXPIRED' : 'APPLY'}
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className="win95-button w-full py-10 text-3xl font-black bg-yellow-100 hover:bg-yellow-200 uppercase italic tracking-widest border-4 border-double border-yellow-800" onClick={handleGenerateJobs}>REGENERATE CAREER PATHS</button>
                    </div>
                )}

                {activeTab === 'matchmaker' && (
                    <div className="space-y-8 relative overflow-hidden h-full">
                        {/* Flying Hearts */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="absolute animate-bounce" style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    fontSize: `${Math.random() * 40 + 20}px`,
                                    animationDuration: `${Math.random() * 3 + 1}s`,
                                    opacity: 0.3
                                }}>❤️</div>
                            ))}
                        </div>
                        
                        <div className="bg-pink-600 text-white p-4 flex justify-between items-center shadow-lg relative z-10 group">
                            <h2 className="font-black text-2xl uppercase tracking-widest text-white italic group-hover:scale-105 transition-transform">MATCHMAKER: THE VOID LOVES YOU</h2>
                            <div 
                                className="text-xs bg-white text-pink-600 px-2 py-1 font-bold animate-pulse cursor-pointer hover:bg-pink-100 hover:scale-110 transition-all"
                                onClick={() => setShowSpamInbox(!showSpamInbox)}
                            >
                                SPAM INBOX: {matches.length} UNREAD DESIRES
                            </div>
                        </div>

                        {showSpamInbox && (
                            <div className="absolute right-4 top-16 w-64 h-80 bg-white border-4 border-pink-400 z-50 flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                                <div className="bg-pink-600 text-white p-2 flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase">Spam-Chat-Bot.exe</span>
                                    <button className="win95-button p-0 px-1 text-xs" onClick={() => setShowSpamInbox(false)}>X</button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-pink-50 font-mono text-[9px]">
                                    {spamMessages.map((msg, i) => (
                                        <div key={i} className="bg-white p-2 rounded shadow-sm border border-pink-200">
                                            <span className="text-pink-600 font-bold">User_{Math.floor(Math.random()*999)}:</span> {msg}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-pink-200 bg-white">
                                    <input type="text" placeholder="REPLY TO LOVE..." className="w-full text-[9px] p-1 outline-none border border-pink-100" readOnly />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                            {matches.map((m) => (
                                <div key={m.id} className="win95-window p-4 bg-white border-pink-400 hover:scale-105 transition-transform cursor-heart">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-2xl">{m.image}</div>
                                        <div className="text-[10px] bg-pink-100 text-pink-800 px-2 font-bold uppercase">{m.type}</div>
                                    </div>
                                    <div className="text-lg font-black text-pink-700 underline">{m.name} ({m.species})</div>
                                    <div className="text-xs font-bold text-gray-500 mb-2 italic">"{m.bio}"</div>
                                    <div className="win95-inset bg-pink-50 p-2 text-[11px] mb-3">
                                        <strong>DESIRE:</strong> {m.desire}
                                    </div>
                                    <button className="win95-button w-full py-2 bg-pink-200 hover:bg-pink-300 font-bold text-xs" onClick={() => alert(`RELATIONSHIP INITIATED: You and ${m.name} are now in a ${m.type}. This is now your identity.`)}>ACCEPT LOVE</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'economy' && (
                    <div className="flex h-full gap-4">
                        <div className="w-48 space-y-2 overflow-y-auto win95-inset bg-gray-100 p-2 text-[10px] font-mono group hover:bg-blue-50 transition-colors">
                            <h3 className="font-bold border-b border-gray-400 mb-1 group-hover:text-blue-600">ASSETS</h3>
                            <TickerItem label="PE" />
                            <TickerItem label="Bonds" />
                            <TickerItem label="REIT" />
                            <TickerItem label="VC" />
                            <TickerItem label="Crypto" />
                            <TickerItem label="Art" />
                            <TickerItem label="SMA" />
                            <TickerItem label="IRA" />
                        </div>

                        <div className="flex-1 text-center space-y-4 flex flex-col group">
                            <h2 className="font-black text-2xl text-blue-900 uppercase italic tracking-tighter group-hover:text-green-600 group-hover:scale-105 transition-all">Money Shot Matrix v4.0</h2>
                            <div className="relative p-2 bg-[#111] win95-window mx-auto w-full max-w-[500px] hover:border-green-500 transition-colors cursor-crosshair">
                                <canvas ref={canvasRef} width="500" height="250" className="market-graph block w-full"></canvas>
                                <div className="absolute bottom-1 left-0 right-0 text-[10px] text-white flex justify-around font-mono bg-black bg-opacity-50 px-2 py-1 group-hover:text-green-400 transition-colors">
                                    <span>T-{timeline.month}</span>
                                    <span>Y:{timeline.year > 0 ? '+' : ''}{timeline.year.toLocaleString()}</span>
                                    <span>T-{timeline.month}</span>
                                    <span>Y:{timeline.year > 0 ? '+' : ''}{timeline.year.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 py-4 bg-black text-green-500 win95-inset hover:bg-gray-900 transition-colors">
                                <div className="flex justify-around items-center font-black text-3xl">
                                    <div className={`${profit >= 0 ? 'text-green-400' : 'text-red-500'} hover:scale-110 transition-transform`}>
                                        Value: {profit >= 0 ? '+' : ''}${profit.toLocaleString()}
                                    </div>
                                    <div className="text-blue-500 underline decoration-double hover:text-blue-400 transition-colors">INV: ${investment.toLocaleString()}</div>
                                </div>
                                <div className="text-yellow-400 text-4xl font-black border-t border-gray-800 pt-2 shadow-sm hover:text-yellow-300 transition-colors">
                                    BALANCE: ${balance.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button className="win95-button px-8 py-3 bg-green-200 hover:bg-green-300 font-black uppercase text-lg hover:scale-105 active:scale-95 transition-all" onClick={() => { setInvestment(i => i + 1000000); setBalance(b => b - 1000000); }}>INF_INVEST +$1M</button>
                                <button className="win95-button px-8 py-3 bg-red-200 hover:bg-red-300 font-black uppercase text-lg hover:scale-105 active:scale-95 transition-all" onClick={() => { setBalance(b => b + profit + investment); setInvestment(0); setProfit(0); }}>CASH OUT ALL</button>
                            </div>
                            <p className="text-[10px] text-gray-500 italic mt-2 hover:text-gray-400 transition-colors cursor-help">Unlimited Investment Protocol Active. Timeline Destabilized.</p>
                        </div>

                        <div className="w-48 space-y-2 overflow-y-auto win95-inset bg-gray-100 p-2 text-[10px] font-mono group hover:bg-red-50 transition-colors">
                            <h3 className="font-bold border-b border-gray-400 mb-1 group-hover:text-red-600">MARKETS 5,000</h3>
                            <TickerItem label="S&P 0" />
                            <TickerItem label="Nasdaq-Void" />
                            <TickerItem label="Farmland" />
                            <TickerItem label="Annuity" />
                            <TickerItem label="Hedge" />
                            <TickerItem label="Commodity" />
                            <TickerItem label="Resource" />
                            <TickerItem label="Retire" />
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <FooterTickers />
      </div>
    </div>
  );
}

function TickerItem({ label }) {
    const [val, setVal] = useState(Math.random() * 10000);
    useEffect(() => {
        const i = setInterval(() => setVal(v => v + (Math.random() - 0.5) * 500), 150);
        return () => clearInterval(i);
    }, []);
    return (
        <div className="flex justify-between border-b border-gray-200 py-1 group/ticker hover:bg-white transition-colors cursor-crosshair">
            <span className="group-hover/ticker:text-blue-600 transition-colors">{label}:</span>
            <span className={`${val > 5000 ? 'text-green-600' : 'text-red-600'} group-hover/ticker:scale-110 transition-transform`}>${val.toFixed(0)}</span>
        </div>
    );
}

function FooterTickers() {
  const [tasks, setTasks] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(Math.floor(Math.random() * 999));
      setMemory(Math.floor(Math.random() * 64000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 text-[11px] text-gray-800 flex justify-between bg-[#c0c0c0] font-mono border-t-2 border-gray-400">
      <div className="flex gap-8">
        <span className="flex items-center gap-2 font-bold"><div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div> SYNC_ERR: {tasks}</span>
        <span className="font-bold">RAM_USE: {memory}KB</span>
      </div>
      <div className="flex gap-4 italic font-bold">
        <span className="text-blue-900 animate-pulse">META_MODE: 1.0.V</span>
        <span>VISTA_PATCH_0.8</span>
      </div>
    </div>
  );
}
