"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateJob, generateMatch } from '../../lib/generators';

// Piano note frequencies (A4 = 440Hz standard tuning)
const NOTE_FREQUENCIES = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
  'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
  'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50
};

const KEYBOARD_MAP = {
  'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4', 'f': 'F4',
  't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4',
  'k': 'C5', 'o': 'C#5', 'l': 'D5', 'p': 'D#5', ';': 'E5'
};

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
  
  // Piano/Artist state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const destinationRef = useRef(null);
  
  // Chaotic Timeline State
  const [timeline, setTimeline] = useState({ month: 'JAN', year: 2025 });

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      destinationRef.current = audioContextRef.current.createMediaStreamDestination();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

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
      
      const draw = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
        for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
        ctx.stroke();

        ctx.lineWidth = 3;
        for(let i=1; i<points.length; i++) {
            ctx.strokeStyle = points[i].color;
            ctx.beginPath();
            ctx.moveTo(points[i-1].x, points[i-1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.fillRect(x-4, y-4, 8, 8);

        if (activeTab === 'economy') {
            requestAnimationFrame(draw);
        }
      };

      const interval = setInterval(() => {
        const roll = Math.random();
        let dx = (Math.random() - 0.7) * 20;
        let dy = (Math.random() - 0.5) * 80;
        let color = '#00ff00';

        if (roll < 0.1) { 
            dy = (Math.random() - 0.5) * 200;
            color = roll < 0.05 ? '#ff0000' : '#00ffff';
        }

        x += dx;
        y += dy;
        
        if (roll < 0.03) {
            points.push({x: x-30, y: y-30, color});
            points.push({x: x-60, y: y, color});
            points.push({x: x-30, y: y+30, color});
            x -= 60;
        }

        if (y < 10) y = 10;
        if (y > canvas.height - 10) y = canvas.height - 10;
        if (x > canvas.width) x = canvas.width;
        if (x < 0) x = canvas.width;

        points.push({x, y, color});
        
        if (points.length > 100) points.shift();
        
        const delta = color === '#ff0000' ? -500 : color === '#00ffff' ? 500 : (Math.random() - 0.5) * 100;
        setProfit(p => p + delta);

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

  // Piano keyboard event handlers
  useEffect(() => {
    if (activeTab !== 'artist') return;
    
    const handleKeyDown = (e) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note && !activeKeys.has(note)) {
        playNote(note);
        setActiveKeys(prev => new Set([...prev, note]));
      }
    };
    
    const handleKeyUp = (e) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note) {
        setActiveKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(note);
          return newSet;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeTab, activeKeys, isRecording]);

  const playNote = useCallback((note) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(NOTE_FREQUENCIES[note], ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Also connect to media stream for recording
    if (isRecording && destinationRef.current) {
      gainNode.connect(destinationRef.current);
    }
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
    
    // Record the note if recording
    if (isRecording && recordingStartTime) {
      const timestamp = Date.now() - recordingStartTime;
      setRecordedNotes(prev => [...prev, { note, timestamp }]);
    }
  }, [isRecording, recordingStartTime]);

  const startRecording = () => {
    if (!audioContextRef.current || !destinationRef.current) return;
    
    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(destinationRef.current.stream);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingStartTime(Date.now());
    setRecordedNotes([]);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (audioChunksRef.current.length === 0) {
      alert('No audio recorded yet! Play some notes while recording.');
      return;
    }
    
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maxfolio-composition-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const playbackRecording = async () => {
    if (recordedNotes.length === 0) {
      alert('No notes recorded! Record something first.');
      return;
    }
    
    setIsPlaying(true);
    const startTime = Date.now();
    
    for (const { note, timestamp } of recordedNotes) {
      const delay = timestamp - (Date.now() - startTime);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      playNote(note);
    }
    
    setIsPlaying(false);
  };

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

  // Piano keys layout
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];
  const blackKeys = [
    { note: 'C#4', position: 0 }, { note: 'D#4', position: 1 },
    { note: 'F#4', position: 3 }, { note: 'G#4', position: 4 }, { note: 'A#4', position: 5 },
    { note: 'C#5', position: 7 }, { note: 'D#5', position: 8 },
    { note: 'F#5', position: 10 }, { note: 'G#5', position: 11 }, { note: 'A#5', position: 12 }
  ];

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
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
              {id: 'economy', label: 'Economy', icon: '💹'},
              {id: 'artist', label: 'Artist', icon: '🎹'}
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
                            <div className="text-[9px] text-blue-600 truncate hover:underline hover:text-blue-400 mb-2">{u.portfolio_url}</div>
                            
                            {/* Balance Display */}
                            <div className="flex justify-between items-center border-t border-gray-300 pt-2 mt-auto">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 border border-green-300 hover:bg-green-200 transition-colors">
                                  💰 ${(u.balance || 1000).toLocaleString()}
                                </span>
                              </div>
                              {u.audio_url && (
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 border border-purple-300 hover:bg-purple-200 transition-colors cursor-pointer" title="Has recorded audio">
                                    🎵 Audio
                                  </span>
                                </div>
                              )}
                            </div>
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

                {activeTab === 'artist' && (
                    <div className="space-y-6 h-full flex flex-col">
                        <div className="bg-purple-800 text-white p-4 flex justify-between items-center shadow-lg group">
                            <h2 className="font-black text-2xl uppercase tracking-widest text-white italic group-hover:scale-105 transition-transform">🎹 Musicianship Studio v1.0</h2>
                            <div className="flex items-center gap-2">
                                {isRecording && (
                                    <div className="flex items-center gap-2 recording-pulse">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-xs font-bold">RECORDING</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            <button 
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`win95-button px-6 py-3 font-black uppercase text-sm hover:scale-105 active:scale-95 transition-all ${isRecording ? 'bg-red-300 hover:bg-red-400' : 'bg-red-100 hover:bg-red-200'}`}
                            >
                                {isRecording ? '⏹ STOP RECORDING' : '⏺ START RECORDING'}
                            </button>
                            <button 
                                onClick={playbackRecording}
                                disabled={isPlaying || recordedNotes.length === 0}
                                className="win95-button px-6 py-3 font-black uppercase text-sm bg-green-100 hover:bg-green-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isPlaying ? '▶ PLAYING...' : '▶ PLAYBACK'}
                            </button>
                            <button 
                                onClick={downloadRecording}
                                className="win95-button px-6 py-3 font-black uppercase text-sm bg-blue-100 hover:bg-blue-200 hover:scale-105 active:scale-95 transition-all"
                            >
                                💾 SAVE TO COMPUTER
                            </button>
                        </div>

                        {/* Keyboard instructions */}
                        <div className="text-center text-xs text-gray-600 bg-yellow-50 p-2 win95-inset">
                            <strong>KEYBOARD SHORTCUTS:</strong> Use keys A-L for white keys, W-P for black keys • Click keys or use keyboard to play
                        </div>

                        {/* Piano Keyboard */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg shadow-2xl">
                                <div className="relative flex">
                                    {/* White keys */}
                                    {whiteKeys.map((note, idx) => (
                                        <div
                                            key={note}
                                            onMouseDown={() => { playNote(note); setActiveKeys(prev => new Set([...prev, note])); }}
                                            onMouseUp={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                                            onMouseLeave={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                                            className={`piano-key-white w-12 h-40 mx-[1px] flex items-end justify-center pb-2 select-none ${activeKeys.has(note) ? 'active' : ''}`}
                                        >
                                            <span className="text-[10px] font-bold text-gray-500">{note}</span>
                                        </div>
                                    ))}
                                    
                                    {/* Black keys */}
                                    {blackKeys.map(({ note, position }) => (
                                        <div
                                            key={note}
                                            onMouseDown={() => { playNote(note); setActiveKeys(prev => new Set([...prev, note])); }}
                                            onMouseUp={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                                            onMouseLeave={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                                            className={`piano-key-black absolute w-8 h-24 select-none ${activeKeys.has(note) ? 'active' : ''}`}
                                            style={{ left: `${position * 50 + 34}px` }}
                                        >
                                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-400">{note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recording info */}
                        <div className="win95-inset bg-gray-50 p-3 text-center">
                            <div className="text-sm font-bold text-gray-700">
                                {recordedNotes.length > 0 ? (
                                    <>📝 {recordedNotes.length} notes recorded • Ready to save or playback</>
                                ) : (
                                    <>🎵 Start recording and play some notes to create your masterpiece!</>
                                )}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">
                                Your compositions will be tied to your profile and available as a shareable audio URL
                            </div>
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
