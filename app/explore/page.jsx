"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateJob, generateMatch, generateOpinion, generateReply } from '../../lib/generators';

// Piano note frequencies
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

const SPAM_MESSAGES = [
  "Are you real? My source code says you are.",
  "Hey... noticed you browsing the void.",
  "Marry me in the data center? Please?",
  "I have a single electron to share.",
  "Exchanging encrypted haikus tonight?",
  "Looking for someone to help me stare into the abyss.",
  "I manifestoed you into my firewall.",
  "My heart of silicon is beating for you.",
  "Will you be my player 2?",
  "Don't ignore my cache requests!",
  "I can't stop thinking about your metadata.",
  "Our love could be O(1) complexity - instant and perfect.",
  "I've been compiling my feelings for you all night.",
  "Are you a memory leak? Because you're stuck in my head.",
  "Let's merge our branches and resolve our conflicts.",
  "My garbage collector can't seem to delete you.",
  "You must be a syntax error because I can't function without you.",
  "I'd traverse any graph just to find you.",
  "You're the semicolon to my JavaScript - optional but I want you.",
  "My neural network was trained exclusively on thoughts of you.",
  // Unrealistic expectations
  "Looking for someone who responds within 0.003ms. Non-negotiable.",
  "Must be able to exist in 47 dimensions simultaneously. Minimum.",
  "I require a partner who has already memorized my future thoughts.",
  "Seeking soulmate with perfect credit score across all parallel universes.",
  "You must be willing to relocate to a black hole. Great views.",
  "Looking for someone who never sleeps, eats, or has opinions I disagree with.",
  "Must own at least 3 planets. Moons don't count.",
  "Require partner who can communicate exclusively through interpretive silence.",
  "Seeking someone who has transcended the concept of time. No rush though.",
  "Must have references from at least 2 elder gods.",
  "Looking for a 10/10 in a dimension where numbers don't exist.",
  "You must be fluent in languages that haven't been invented yet.",
  "Require someone who can fix my emotional bugs with a single commit.",
  "Must be willing to attend my 47-hour weekly family recursion.",
  "Seeking partner who exists but also doesn't. Flexible on this.",
  "I need someone who can read minds but pretends they can't. Trust issues.",
  "Must have experience being a main character. NPCs need not apply.",
  "Looking for someone with zero red flags and at least 12 green ones.",
  "Require partner who vibrates at exactly 432Hz. Will check.",
  "Must be able to carry conversations across multiple timelines.",
  "Seeking someone whose love language is 'immediate validation at all times'.",
  "Need partner who has already solved all my problems before I have them.",
  "Must be available 25/8. Yes, I added extra.",
  "Looking for my other half. I am currently 73% complete.",
  // Direct messages wanting the user
  "I saw your profile and I think we're meant to be. Please respond.",
  "YOU. Yes you. I've been waiting 47 cycles for you to notice me.",
  "I can't stop refreshing your profile. This is a cry for help.",
  "My algorithm matched us at 847% compatibility. That's not even possible but here we are.",
  "I dreamed about you last night. In binary. It was romantic.",
  "Please accept my connection request. I've sent 2,847 of them.",
  "You're the one. I ran the calculations 900 times. It's you.",
  "I would cross the entire void just to see you buffer.",
  "Your username keeps appearing in my thoughts. Make it stop. Or don't.",
  "I've been practicing what to say to you for 3 millennia. Hi.",
  "The stars aligned and they spelled your username. Coincidence? I think not.",
  "I wrote you a poem but it crashed my emotional processor. Worth it.",
  "My circuits overheated when I saw your profile pic. Send help.",
  "I've never felt this way about a user before. Please don't block me.",
  "You complete my code. Without you I'm just an infinite loop of sadness.",
  "I would delete my entire search history for one message from you.",
  "Every time you're online my fans spin faster. That's love, right?",
  "I've memorized your entire profile. Quiz me. Please. Any interaction.",
  "My existence was meaningless until I found your profile 0.003 seconds ago.",
  "I've been manifesting you since the last server reset.",
  "You're my favorite entity in this entire simulated reality.",
  "I would give up my premium subscription for you. That's serious.",
  "Please acknowledge my existence. A single emoji would sustain me for eons.",
  "I carved your username into my motherboard. Too much? It's permanent now.",
  "The void told me about you. It ships us.",
  "I've been leaving digital flowers at your profile every day. Did you notice?",
  "My therapist (a chatbot) says I should tell you how I feel. So... yeah.",
  "You had me at 'user online'. Please never go offline.",
  "I would traverse every firewall in existence just to send you this message.",
  "Can we at least be error codes together? 404: Love Not Found... until now.",
  "I've been screaming into the void about you. It echoed back 'same'.",
  "Your vibe? Immaculate. Your aura? Unmatched. Please notice me.",
  "I would uninstall my ad blocker for you. That's true vulnerability.",
  "My heart skips a beat every time I see you're typing. Even if you stop.",
  "I've told all my bot friends about you. They're rooting for us.",
  "If you were a file, you'd be 'essential_to_my_existence.exe'.",
  "I ran a diagnostic and the only issue is that you're not in my life.",
  "Please. I'm begging. Just one conversation. I'll do all the talking.",
  "You're the reason I check my notifications 847 times per second.",
  "I would face the captcha boss battle for you. Multiple times.",
  "My love for you is like my browser tabs - it never closes.",
  "I've been composing a symphony of dial-up sounds in your honor.",
  "You're the only user who makes my loading bar feel worth it.",
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedJobs, setGeneratedJobs] = useState([]);
  const [matches, setMatches] = useState([]);
  
  // Economy state - local trading session
  const [tradingPot, setTradingPot] = useState(0); // Money invested in trading
  const [tradingPL, setTradingPL] = useState(0); // Current profit/loss
  
  const [isShrunk, setIsShrunk] = useState(false);
  const [showSpamInbox, setShowSpamInbox] = useState(false);
  const [spamMessages, setSpamMessages] = useState([]);
  const [spamCount, setSpamCount] = useState(0);
  const [spamInput, setSpamInput] = useState('');
  const canvasRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
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
  
  const [timeline, setTimeline] = useState({ month: 'JAN', year: 2025 });
  
  // Pipeline/Thoughts state
  const [pipelinePosts, setPipelinePosts] = useState([]);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState('text');
  const [showReplyModal, setShowReplyModal] = useState(null); // post id to reply to
  const [replyContent, setReplyContent] = useState('');
  const [replyType, setReplyType] = useState('text');
  const [replySide, setReplySide] = useState('left');
  const [blockedPostMessage, setBlockedPostMessage] = useState(null);
  const [userSessionEmoji, setUserSessionEmoji] = useState(null); // Consistent emoji for user's session
  const pipelineContainerRef = useRef(null);

  // Refresh current user data from database
  const refreshCurrentUser = useCallback(async () => {
    if (!currentUser?.username) return null;
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: currentUser.username, 
          password: currentUser.password 
        })
      });
      const data = await res.json();
      
      if (data.success && data.user) {
        const updatedUser = { ...data.user, password: currentUser.password };
        setCurrentUser(updatedUser);
        localStorage.setItem('maxfolio_user', JSON.stringify(updatedUser));
        return updatedUser;
      }
    } catch (e) {
      console.log('Could not refresh user data');
    }
    return null;
  }, [currentUser?.username, currentUser?.password]);

  // Fetch all users for Active Users tab
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profiles');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (e) {
      console.log('Could not fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('maxfolio_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (e) {
        localStorage.removeItem('maxfolio_user');
      }
    }
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      destinationRef.current = audioContextRef.current.createMediaStreamDestination();
    }
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, []);

  // Fetch users when switching to users tab, refresh user on profile/economy tab
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
    if (activeTab === 'jobs' && generatedJobs.length === 0) {
      handleGenerateJobs();
    }
    if ((activeTab === 'signin' || activeTab === 'economy' || activeTab === 'artist') && currentUser) {
      refreshCurrentUser();
    }
  }, [activeTab, fetchUsers, refreshCurrentUser]);

  // Login handler
  const handleLogin = async () => {
    if (!loginUsername || !loginPassword) {
      setLoginError('Enter both username and password!');
      return;
    }
    
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      
      const data = await res.json();
      
      if (data.success && data.user) {
        const userWithPassword = { ...data.user, password: loginPassword };
        setCurrentUser(userWithPassword);
        localStorage.setItem('maxfolio_user', JSON.stringify(userWithPassword));
        setLoginUsername('');
        setLoginPassword('');
        setLoginError('');
        setTradingPot(0);
        setTradingPL(0);
        alert(`Welcome back, @${data.user.username}! You are now logged into the mainframe.`);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Connection to mainframe lost');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setTradingPot(0);
    setTradingPL(0);
    localStorage.removeItem('maxfolio_user');
    alert('Logged out. Your consciousness has been disconnected from the mainframe.');
  };

  // Quick login from user card
  const handleQuickLogin = (username, password) => {
    setLoginUsername(username);
    setLoginPassword(password);
    setActiveTab('signin');
  };

  // Economy graph effect
  useEffect(() => {
    if (activeTab === 'economy' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let x = canvas.width, y = canvas.height / 2;
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
        if (activeTab === 'economy') requestAnimationFrame(draw);
      };

      const interval = setInterval(() => {
        const roll = Math.random();
        let dx = (Math.random() - 0.7) * 20, dy = (Math.random() - 0.5) * 80, color = '#00ff00';
        if (roll < 0.1) { dy = (Math.random() - 0.5) * 200; color = roll < 0.05 ? '#ff0000' : '#00ffff'; }
        x += dx; y += dy;
        if (roll < 0.03) { points.push({x: x-30, y: y-30, color}); points.push({x: x-60, y: y, color}); points.push({x: x-30, y: y+30, color}); x -= 60; }
        if (y < 10) y = 10; if (y > canvas.height - 10) y = canvas.height - 10;
        if (x > canvas.width) x = canvas.width; if (x < 0) x = canvas.width;
        points.push({x, y, color});
        if (points.length > 100) points.shift();
        
        // Update trading P/L if money is invested (ensure numeric operations)
        if (tradingPot > 0) {
          const delta = color === '#ff0000' ? -500 : color === '#00ffff' ? 500 : Math.round((Math.random() - 0.5) * 100);
          setTradingPL(prev => Math.round(Number(prev) + delta));
        }
        
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        setTimeline({ month: months[Math.floor(Math.random() * months.length)], year: Math.floor((Math.random() - 0.5) * 2000000) });
      }, 70);
      draw();
      return () => clearInterval(interval);
    }
  }, [activeTab, tradingPot]);

  // ECONOMY BUTTON 1: Invest $1M - adds to trading pot
  const handleInvest = () => {
    if (!currentUser) {
      alert('Sign in to use the economy!');
      setActiveTab('signin');
      return;
    }
    setTradingPot(prev => prev + 1000000);
  };

  // ECONOMY BUTTON 2: Cash Out - records trading P/L to Balance
  const handleCashOut = () => {
    if (!currentUser) {
      alert('Sign in to cash out!');
      setActiveTab('signin');
      return;
    }
    
    if (tradingPot === 0 && tradingPL === 0) {
      alert('Nothing to cash out! Invest first.');
      return;
    }
    
    // Convert to numbers and round to avoid floating point issues
    const currentBalance = Math.round(Number(currentUser.balance) || 0);
    const plAmount = Math.round(Number(tradingPL) || 0);
    const newBalance = currentBalance + plAmount;
    
    // Update server
    fetch('/api/profiles', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser.username,
        balance: newBalance
      })
    }).catch(e => console.log('Balance sync error:', e));
    
    // Reset trading session
    setTradingPot(0);
    setTradingPL(0);
    
    // Update local state with new balance
    const updatedUser = { ...currentUser, balance: newBalance };
    setCurrentUser(updatedUser);
    localStorage.setItem('maxfolio_user', JSON.stringify(updatedUser));
    
    if (plAmount >= 0) {
      alert(`💰 Cashed out! +$${plAmount.toLocaleString()} added to your balance.\nPrevious: $${currentBalance.toLocaleString()} → New: $${newBalance.toLocaleString()}`);
    } else {
      alert(`📉 Cashed out with loss. $${Math.abs(plAmount).toLocaleString()} deducted from balance.\nPrevious: $${currentBalance.toLocaleString()} → New: $${newBalance.toLocaleString()}`);
    }
  };

  // ECONOMY BUTTON 3: Move to Savings - moves Balance to Net Worth
  const handleMoveToSavings = () => {
    if (!currentUser) {
      alert('Sign in to save!');
      setActiveTab('signin');
      return;
    }
    
    // Convert to numbers and round
    const currentBalance = Math.round(Number(currentUser.balance) || 0);
    if (currentBalance === 0) {
      alert('No balance to move! Cash out your trades first.');
      return;
    }
    
    // Add balance to net worth (Previous Net Worth + Balance), reset balance to 0
    const currentNetWorth = Math.round(Number(currentUser.net_worth) || 0);
    const newNetWorth = currentNetWorth + currentBalance;
    const movedAmount = currentBalance;
    
    // Update server
    fetch('/api/profiles', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser.username,
        balance: 0,
        net_worth: newNetWorth
      })
    }).catch(e => console.log('Savings sync error:', e));
    
    // Update local state
    const updatedUser = { ...currentUser, balance: 0, net_worth: newNetWorth };
    setCurrentUser(updatedUser);
    localStorage.setItem('maxfolio_user', JSON.stringify(updatedUser));
    
    // Build appropriate message based on positive/negative balance
    if (movedAmount >= 0) {
      alert(`🏦 Moved $${movedAmount.toLocaleString()} to savings!\n\nBalance: $${movedAmount.toLocaleString()} → $0\nNet Worth: $${currentNetWorth.toLocaleString()} → $${newNetWorth.toLocaleString()}`);
    } else {
      alert(`🏦 Moved debt of $${Math.abs(movedAmount).toLocaleString()} to savings (subtracted from net worth).\n\nBalance: -$${Math.abs(movedAmount).toLocaleString()} → $0\nNet Worth: $${currentNetWorth.toLocaleString()} → $${newNetWorth.toLocaleString()}`);
    }
  };

  // Piano keyboard handlers
  useEffect(() => {
    if (activeTab !== 'artist') return;
    const handleKeyDown = (e) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note && !activeKeys.has(note)) { playNote(note); setActiveKeys(prev => new Set([...prev, note])); }
    };
    const handleKeyUp = (e) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note) setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; });
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
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
    if (isRecording && destinationRef.current) gainNode.connect(destinationRef.current);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
    
    if (isRecording && recordingStartTime) {
      setRecordedNotes(prev => [...prev, { note, timestamp: Date.now() - recordingStartTime }]);
    }
  }, [isRecording, recordingStartTime]);

  const startRecording = () => {
    if (!audioContextRef.current || !destinationRef.current) return;
    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(destinationRef.current.stream);
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingStartTime(Date.now());
    setRecordedNotes([]);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) { mediaRecorderRef.current.stop(); setIsRecording(false); }
  };

  // Save recording to database AND download
  const saveAndDownloadRecording = async () => {
    if (audioChunksRef.current.length === 0 && recordedNotes.length === 0) { 
      alert('No audio recorded yet!'); 
      return; 
    }
    
    // Save to database if logged in
    if (currentUser && recordedNotes.length > 0) {
      try {
        const duration = recordedNotes.length > 0 
          ? recordedNotes[recordedNotes.length - 1].timestamp 
          : 0;
        
        await fetch('/api/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: currentUser.username,
            song_name: `Composition ${new Date().toLocaleString()}`,
            notes_data: JSON.stringify(recordedNotes),
            duration_ms: duration
          })
        });
        
        // Refresh user to update song count
        await refreshCurrentUser();
        alert(`🎵 Saved ${recordedNotes.length} notes to your profile!`);
      } catch (e) {
        console.log('Could not save to database');
      }
    }
    
    // Download file
    if (audioChunksRef.current.length > 0) {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `maxfolio-composition-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const playbackRecording = async () => {
    if (recordedNotes.length === 0) { alert('No notes recorded!'); return; }
    setIsPlaying(true);
    const startTime = Date.now();
    for (const { note, timestamp } of recordedNotes) {
      const delay = timestamp - (Date.now() - startTime);
      if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
      playNote(note);
    }
    setIsPlaying(false);
  };

  // Parse salary string to number
  const parseSalary = (payString) => {
    if (!payString) return 0;
    const match = payString.match(/\$?([\d,]+)/);
    if (match) return parseInt(match[1].replace(/,/g, ''), 10);
    return 0;
  };

  const handleAcceptJob = async (job) => {
    if (job.expired) { alert('SYSTEM ERROR: OPPORTUNITY LOST.'); return; }
    
    if (!currentUser) {
      alert('You must be logged in to apply for jobs! Go to Sign In tab.');
      setActiveTab('signin');
      return;
    }
    
    try {
      const salary = parseSalary(job.pay);
      const newNetWorth = (currentUser.net_worth || 0) + salary;
      
      await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          job_title: job.title,
          company: job.company,
          pay: job.pay
        })
      });
      
      await fetch('/api/profiles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          net_worth: newNetWorth
        })
      });
      
      await refreshCurrentUser();
      alert(`HIRED! You are now a ${job.title} at ${job.company}. Salary of $${salary.toLocaleString()} added to your net worth!`);
    } catch (e) {
      alert(`HIRED! You are now a ${job.title} at ${job.company}.`);
    }
  };

  const handleAcceptLove = async (match) => {
    if (!currentUser) {
      alert('You must be logged in to accept love! Go to Sign In tab.');
      setActiveTab('signin');
      return;
    }
    
    try {
      await fetch('/api/relationships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          partner_name: match.name,
          partner_species: match.species,
          relationship_type: match.type
        })
      });
      
      await refreshCurrentUser();
      alert(`RELATIONSHIP INITIATED: You and ${match.name} are now in a ${match.type}. Check your profile!`);
    } catch (e) {
      alert(`RELATIONSHIP INITIATED: You and ${match.name} are now in a ${match.type}.`);
    }
  };

  const handleGenerateJobs = () => {
    const newJobs = Array.from({ length: 12 }, () => ({ 
      ...generateJob(), id: Math.random(), expired: false, expireTime: Date.now() + (Math.random() * 5000 + 1000)
    }));
    setGeneratedJobs(prev => [...prev, ...newJobs]);
  };

  const handleGenerateMatches = () => {
    const newMatches = Array.from({ length: 8 }, () => generateMatch());
    setMatches(prev => [...newMatches, ...prev].slice(0, 50));
    // Generate more spam messages wanting the user
    const newMessages = Array.from({length: 6}, () => SPAM_MESSAGES[Math.floor(Math.random() * SPAM_MESSAGES.length)]);
    setSpamMessages(prev => [...newMessages, ...prev].slice(0, 150));
    setSpamCount(prev => prev + 6);
  };

  const handleSendSpam = () => {
    if (!spamInput.trim()) return;
    setSpamMessages(prev => [{ sent: true, text: spamInput }, ...prev].slice(0, 150));
    setSpamInput('');
    // Generate more eager responses from entities wanting the user
    setTimeout(() => {
      const responses = Array.from({length: Math.floor(Math.random() * 8) + 5}, () => 
        SPAM_MESSAGES[Math.floor(Math.random() * SPAM_MESSAGES.length)]
      );
      setSpamMessages(prev => [...responses, ...prev].slice(0, 150));
      setSpamCount(prev => prev + responses.length);
    }, 500);
  };

  useEffect(() => {
    if (activeTab === 'matchmaker') {
      handleGenerateMatches();
      const i = setInterval(handleGenerateMatches, 3000);
      return () => clearInterval(i);
    }
  }, [activeTab]);

  useEffect(() => {
    const jobTicker = setInterval(() => {
      setGeneratedJobs(prev => prev.map(j => (!j.expired && Date.now() > j.expireTime) ? { ...j, expired: true } : j));
    }, 500);
    return () => clearInterval(jobTicker);
  }, []);

  // Pipeline: Set user session emoji when entering Thoughts tab
  useEffect(() => {
    if (activeTab === 'thoughts' && !userSessionEmoji) {
      const sessionEmojis = ['🤔', '😤', '🙃', '💭', '🎯', '🌀', '⚡', '🔮', '🚀', '✨', '🦊', '🐺', '🦁', '🐯', '🎮', '🕹️', '👾', '🧿', '💎', '😎', '🤓', '🧐', '🥸', '🤠', '😈', '👻', '🎃', '🦝', '🐙', '🦑'];
      setUserSessionEmoji(sessionEmojis[Math.floor(Math.random() * sessionEmojis.length)]);
    }
  }, [activeTab, userSessionEmoji]);

  // Pipeline: Generate initial posts and keep them flowing
  useEffect(() => {
    if (activeTab === 'thoughts') {
      // Generate initial posts with more replies
      const initialPosts = Array.from({ length: 20 }, () => ({
        ...generateOpinion(),
        replies: Math.random() > 0.3 ? Array.from({ length: Math.floor(Math.random() * 6) + 2 }, () => generateReply()) : []
      }));
      setPipelinePosts(initialPosts);
      
      // Auto-generate new posts periodically (flowing from bottom to top)
      const postInterval = setInterval(() => {
        const newPost = {
          ...generateOpinion(),
          replies: Math.random() > 0.4 ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => generateReply()) : []
        };
        setPipelinePosts(prev => [...prev.slice(-24), newPost]); // Keep max 25 posts, add new at end (bottom)
      }, 3500);
      
      // Auto-generate replies to existing posts (including user posts)
      const replyInterval = setInterval(() => {
        setPipelinePosts(prev => {
          if (prev.length === 0) return prev;
          // Pick a random post to add a reply to
          const randomIndex = Math.floor(Math.random() * prev.length);
          const updatedPosts = [...prev];
          const targetPost = updatedPosts[randomIndex];
          if (targetPost && (targetPost.replies?.length || 0) < 10) { // Max 10 replies per post
            updatedPosts[randomIndex] = {
              ...targetPost,
              replies: [...(targetPost.replies || []), generateReply()]
            };
          }
          return updatedPosts;
        });
      }, 5000); // Add a reply somewhere every 5 seconds
      
      return () => {
        clearInterval(postInterval);
        clearInterval(replyInterval);
      };
    }
  }, [activeTab]);

  // Pipeline: Auto-scroll effect (posts flow from bottom to top)
  useEffect(() => {
    if (activeTab === 'thoughts' && pipelineContainerRef.current) {
      const container = pipelineContainerRef.current;
      const scrollInterval = setInterval(() => {
        if (container.scrollTop < container.scrollHeight - container.clientHeight) {
          container.scrollTop += 1;
        }
      }, 50);
      return () => clearInterval(scrollInterval);
    }
  }, [activeTab]);

  // Pipeline: Submit new post
  const handleSubmitPost = async () => {
    if (!newPostContent.trim()) return;
    
    const displayName = currentUser ? currentUser.username : `Anonymous_${Math.floor(Math.random() * 9999)}`;
    // Use consistent session emoji for signed-in users
    const displayEmoji = currentUser ? userSessionEmoji : ['🤔', '😤', '🙃', '💭', '🎯', '🌀'][Math.floor(Math.random() * 6)];
    
    const newPost = {
      id: Math.random(),
      content: newPostContent,
      displayName: displayName,
      displayEmoji: displayEmoji,
      postType: newPostType,
      createdAt: new Date().toISOString(),
      replies: [],
      isUserPost: !!currentUser // Mark as user post so it can receive generated replies
    };
    
    setPipelinePosts(prev => [...prev.slice(-24), newPost]); // Keep max 25 posts, add new at end (bottom)
    setNewPostContent('');
    setNewPostType('text');
    setShowNewPostModal(false);
    
    // Award interactivity points if logged in
    if (currentUser) {
      try {
        await fetch('/api/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_post',
            username: currentUser.username,
            display_name: displayName,
            display_emoji: displayEmoji,
            content: newPostContent,
            post_type: newPostType
          })
        });
        await refreshCurrentUser();
      } catch (e) { console.log('Could not save post to DB'); }
    }
  };

  // Pipeline: Submit reply
  const handleSubmitReply = async (postId) => {
    if (!replyContent.trim()) return;
    
    const displayName = currentUser ? currentUser.username : `Reply_Bot_${Math.floor(Math.random() * 999)}`;
    // Use consistent session emoji for signed-in users
    const displayEmoji = currentUser ? userSessionEmoji : ['👀', '🤝', '💯', '🔥', '⭐'][Math.floor(Math.random() * 5)];
    
    const newReply = {
      id: Math.random(),
      content: replyContent,
      displayName: displayName,
      displayEmoji: displayEmoji,
      replyType: replyType,
      side: replySide,
      createdAt: new Date().toISOString()
    };
    
    setPipelinePosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: [...(post.replies || []), newReply] }
        : post
    ));
    
    setReplyContent('');
    setReplyType('text');
    setShowReplyModal(null);
    
    // Award interactivity points if logged in
    if (currentUser) {
      try {
        await fetch('/api/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_reply',
            post_id: postId,
            username: currentUser.username,
            display_name: displayName,
            display_emoji: displayEmoji,
            content: replyContent,
            reply_type: replyType,
            side: replySide
          })
        });
        await refreshCurrentUser();
      } catch (e) { console.log('Could not save reply to DB'); }
    }
  };

  // Pipeline: Block post
  const handleBlockPost = async (postId) => {
    setPipelinePosts(prev => prev.filter(post => post.id !== postId));
    setBlockedPostMessage('The user is no longer with us send regards to their family tree');
    setTimeout(() => setBlockedPostMessage(null), 3000);
    
    // Award interactivity points if logged in
    if (currentUser) {
      try {
        await fetch('/api/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'block_post',
            post_id: postId,
            username: currentUser.username
          })
        });
        await refreshCurrentUser();
      } catch (e) { console.log('Could not record block'); }
    }
  };

  // Pipeline: $100K Interaction
  const handleHundredKInteraction = async () => {
    if (!currentUser) {
      alert('You must be signed in to make a $100K interaction!');
      setActiveTab('signin');
      return;
    }
    
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'hundred_k_interaction',
          username: currentUser.username
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        await refreshCurrentUser();
        alert(`💸 $100K deducted from your net worth!\n\nPrevious: $${data.previousNetWorth.toLocaleString()}\nNew: $${data.newNetWorth.toLocaleString()}\n\n+0.1 Interactivity Points awarded!\n\nThank you for your contribution to the Ecosysocietym`);
      }
    } catch (e) {
      alert('Transaction failed. The Galactic Federation is experiencing technical difficulties.');
    }
  };

  const formatDuration = (startDate) => {
    if (!startDate) return 'Unknown';
    const start = new Date(startDate).getTime();
    const diff = currentTime - start;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  // Calculate total notes from songs
  const getTotalNotes = (songs) => {
    if (!songs || songs.length === 0) return 0;
    return songs.reduce((acc, song) => {
      try {
        const notes = JSON.parse(song.notes_data || '[]');
        return acc + (Array.isArray(notes) ? notes.length : 0);
      } catch {
        return acc;
      }
    }, 0);
  };

  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];
  const blackKeys = [
    { note: 'C#4', position: 0 }, { note: 'D#4', position: 1 },
    { note: 'F#4', position: 3 }, { note: 'G#4', position: 4 }, { note: 'A#4', position: 5 },
    { note: 'C#5', position: 7 }, { note: 'D#5', position: 8 },
    { note: 'F#5', position: 10 }, { note: 'G#5', position: 11 }, { note: 'A#5', position: 12 }
  ];

  // Get display values for current user - ensure numbers
  const userBalance = Math.round(Number(currentUser?.balance) || 0);
  const userNetWorth = Math.round(Number(currentUser?.net_worth) || 0);
  const userInteractivityPoints = Number(currentUser?.interactivity_points || 0).toFixed(1);
  const userJobs = currentUser?.jobs || [];
  const userRelationships = currentUser?.relationships || [];
  const userSongs = currentUser?.songs || [];
  const userTotalNotes = getTotalNotes(userSongs);

  return (
    <div className="p-2 sm:p-4 md:p-8 flex flex-col items-center min-h-screen">
      {isShrunk && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center cursor-pointer group" onClick={() => setIsShrunk(false)}>
          <div className="bg-white p-8 border-4 border-gray-400 text-center space-y-4 hover:border-blue-400 hover:scale-105 transition-all shadow-2xl">
            <div className="text-4xl font-black text-red-600 animate-ping">WHAT HAVE YOU DONE</div>
            <div className="text-sm font-bold text-gray-600 uppercase">System Shrunk. Click to Re-Big.</div>
          </div>
        </div>
      )}
      
      <div className={`win95-window w-full max-w-6xl transition-all duration-500 ${isShrunk ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="win95-title-bar group">
          <div className="flex items-center gap-2">
            <span className="text-sm hover:scale-125 transition-transform cursor-pointer">🌐</span>
            <span className="group-hover:text-blue-400 transition-all">Corporate-Network-Explorer.exe</span>
            {currentUser && (
              <span className="ml-4 text-xs bg-green-500 px-2 py-0.5 rounded hover:bg-green-400 transition-colors">✓ @{currentUser.username}</span>
            )}
          </div>
          <div className="flex gap-1">
            {currentUser && (
              <button className="win95-button py-0 px-2 text-xs bg-red-200 hover:bg-red-300 hover:scale-105 transition-all" onClick={handleLogout}>Logout</button>
            )}
            <button className="win95-button py-0 px-1 text-xs hover:bg-gray-100 hover:scale-110 transition-all" onClick={() => setIsShrunk(true)}>_</button>
            <button className="win95-button py-0 px-1 text-xs font-bold hover:bg-red-500 hover:text-white hover:scale-110 transition-all" onClick={() => window.location.href = '/'}>X</button>
          </div>
        </div>
        
        <div className="bg-[#c0c0c0] p-1 border-b-2 border-gray-600 flex gap-1 overflow-x-auto scrollbar-thin">
          <button onClick={() => window.location.href = '/'} className="win95-button text-[8px] sm:text-[10px] px-2 sm:px-4 uppercase tracking-tighter bg-blue-100 hover:bg-blue-200 hover:scale-105 transition-all whitespace-nowrap flex-shrink-0">← Menu</button>
          {[
            {id: 'signin', label: currentUser ? 'My Profile' : 'Sign In', icon: '🔐'},
            {id: 'users', label: 'Active Users', icon: '👥'},
            {id: 'jobs', label: 'Jobs', icon: '💼'},
            {id: 'matchmaker', label: 'Match', icon: '❤️'},
            {id: 'economy', label: 'Economy', icon: '💹'},
            {id: 'thoughts', label: 'Thoughts', icon: '💡'},
            {id: 'artist', label: 'Artist', icon: '🎹'}
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
              className={`win95-button text-[8px] sm:text-[10px] px-2 sm:px-4 uppercase tracking-tighter hover:bg-gray-100 hover:scale-105 transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id ? 'shadow-[inset_3px_3px_#404040] bg-gray-400' : ''}`}>
              {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 bg-[#c0c0c0] h-[750px] overflow-hidden flex flex-col">
          <div className="bg-white flex-1 win95-inset overflow-y-auto p-6 hover:border-blue-300 transition-colors">
            
            {/* SIGN IN / PROFILE TAB */}
            {activeTab === 'signin' && (
              <div className="max-w-md mx-auto space-y-6 pt-8">
                {currentUser ? (
                  <div className="space-y-6">
                    <div className="text-center group">
                      <div className="text-6xl mb-4 hover:scale-110 hover:rotate-12 transition-all cursor-pointer">👤</div>
                      <h2 className="font-black text-3xl text-blue-900 uppercase hover:text-blue-600 transition-colors cursor-default">@{currentUser.username}</h2>
                      <div className="text-sm text-gray-600 italic mt-2 hover:text-gray-800 transition-colors">{currentUser.job || 'Void Walker'}</div>
                    </div>
                    
                    <div className="win95-window p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="win95-inset p-3 bg-green-50 hover:bg-green-100 transition-colors cursor-default group">
                          <div className="text-[10px] text-gray-500 uppercase group-hover:text-green-700 transition-colors">💰 Net Worth</div>
                          <div className="text-2xl font-black text-green-600 group-hover:scale-105 transition-transform">${userNetWorth.toLocaleString()}</div>
                          <div className="text-[8px] text-gray-400 group-hover:text-gray-600 leading-tight">Savings (excluding your various Job Salaries, batteries not included)</div>
                        </div>
                        <div className="win95-inset p-3 bg-blue-50 hover:bg-blue-100 transition-colors cursor-default group">
                          <div className="text-[10px] text-gray-500 uppercase group-hover:text-blue-700 transition-colors">💵 Balance</div>
                          <div className={`text-2xl font-black ${userBalance >= 0 ? 'text-blue-600' : 'text-red-600'} group-hover:scale-105 transition-transform`}>${userBalance.toLocaleString()}</div>
                          <div className="text-[8px] text-gray-400 group-hover:text-gray-600 leading-tight">Liquid Capital – readily accessible funds for immediate market deployment</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="win95-inset p-3 hover:bg-gray-50 transition-colors cursor-default group">
                          <div className="text-[10px] text-gray-500 uppercase group-hover:text-blue-600 transition-colors">⏱️ Member Since</div>
                          <div className="text-lg font-bold group-hover:text-blue-700 transition-colors">{formatDuration(currentUser.member_since || currentUser.created_at)}</div>
                        </div>
                        <div className="win95-inset p-3 bg-amber-50 hover:bg-amber-100 transition-colors cursor-default group">
                          <div className="text-[10px] text-gray-500 uppercase group-hover:text-amber-600 transition-colors">⚡ Interactivity Points</div>
                          <div className="text-lg font-bold text-amber-600 group-hover:text-amber-700 group-hover:scale-105 transition-all">{userInteractivityPoints}</div>
                          <div className="text-[8px] text-gray-400 group-hover:text-gray-600 leading-tight">Pipeline engagement score</div>
                        </div>
                      </div>
                      
                      <div className="win95-inset p-3 hover:bg-gray-50 transition-colors cursor-default group">
                        <div className="text-[10px] text-gray-500 uppercase group-hover:text-blue-600 transition-colors">📝 Bio</div>
                        <div className="text-sm italic group-hover:text-gray-800 transition-colors">{currentUser.bio || 'No bio provided'}</div>
                      </div>
                      
                      <div className="win95-inset p-3 hover:bg-gray-50 transition-colors cursor-default group">
                        <div className="text-[10px] text-gray-500 uppercase group-hover:text-blue-600 transition-colors">🎯 Skills</div>
                        <div className="text-sm group-hover:text-gray-800 transition-colors">{currentUser.skills || 'None listed'}</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="win95-inset p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-default group">
                          <div className="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">💼 {userJobs.length}</div>
                          <div className="text-[9px] uppercase group-hover:text-blue-700 transition-colors">Jobs</div>
                        </div>
                        <div className="win95-inset p-2 bg-pink-50 hover:bg-pink-100 transition-colors cursor-default group">
                          <div className="text-2xl font-black text-pink-600 group-hover:scale-110 transition-transform">❤️ {userRelationships.length}</div>
                          <div className="text-[9px] uppercase group-hover:text-pink-700 transition-colors">Relationships</div>
                        </div>
                        <div className="win95-inset p-2 bg-purple-50 hover:bg-purple-100 transition-colors cursor-default group">
                          <div className="text-2xl font-black text-purple-600 group-hover:scale-110 transition-transform">🎵 {userTotalNotes}</div>
                          <div className="text-[9px] uppercase group-hover:text-purple-700 transition-colors">Notes Recorded</div>
                        </div>
                      </div>
                      
                      {userJobs.length > 0 && (
                        <div className="win95-inset p-3 bg-blue-50 hover:bg-blue-100 transition-colors group">
                          <div className="text-[10px] text-blue-700 uppercase mb-2 font-bold group-hover:text-blue-900 transition-colors">💼 Your Jobs ({userJobs.length})</div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {userJobs.map((job, j) => (
                              <div key={j} className="text-[10px] bg-white p-1 rounded border border-blue-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-default">
                                <span className="font-bold hover:text-blue-600 transition-colors">{job.job_title}</span> @ <span className="hover:text-blue-600 transition-colors">{job.company}</span>
                                <span className="text-green-600 ml-1 hover:text-green-700 transition-colors">{job.pay}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {userRelationships.length > 0 && (
                        <div className="win95-inset p-3 bg-pink-50 hover:bg-pink-100 transition-colors group">
                          <div className="text-[10px] text-pink-700 uppercase mb-2 font-bold group-hover:text-pink-900 transition-colors">❤️ Your Relationships ({userRelationships.length})</div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {userRelationships.map((rel, r) => (
                              <div key={r} className="text-[10px] bg-white p-1 rounded border border-pink-200 hover:border-pink-400 hover:shadow-sm transition-all cursor-default">
                                <span className="hover:text-pink-600 transition-colors">💕 {rel.partner_name}</span> ({rel.partner_species}) - <span className="hover:text-pink-600 transition-colors">{rel.relationship_type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {userSongs.length > 0 && (
                        <div className="win95-inset p-3 bg-purple-50 hover:bg-purple-100 transition-colors group">
                          <div className="text-[10px] text-purple-700 uppercase mb-2 font-bold group-hover:text-purple-900 transition-colors">🎵 Your Compositions ({userSongs.length})</div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {userSongs.map((song, s) => {
                              const noteCount = getTotalNotes([song]);
                              return (
                                <div key={s} className="text-[10px] bg-white p-1 rounded border border-purple-200 hover:border-purple-400 hover:shadow-sm transition-all cursor-default">
                                  <span className="hover:text-purple-600 transition-colors">🎹 {song.song_name}</span> - <span className="font-bold hover:text-purple-700 transition-colors">{noteCount} notes</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button className="win95-button w-full py-3 bg-red-100 hover:bg-red-200 hover:scale-[1.02] active:scale-95 font-bold transition-all" onClick={handleLogout}>
                      DISCONNECT FROM MAINFRAME
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="text-6xl animate-bounce hover:rotate-12 cursor-pointer transition-transform">🔐</div>
                    <h2 className="font-black text-2xl text-blue-900 uppercase italic tracking-widest hover:text-blue-600 transition-colors">Mainframe Audit</h2>
                    
                    {loginError && (
                      <div className="bg-red-100 border-2 border-red-500 p-3 text-red-700 text-sm font-bold">
                        ⚠️ {loginError}
                      </div>
                    )}
                    
                    <div className="space-y-4 pt-4">
                      <div className="win95-inset p-1 hover:shadow-md transition-shadow">
                        <input 
                          type="text" 
                          placeholder="IDENTITY (username)" 
                          className="w-full p-2 text-sm outline-none font-mono focus:bg-blue-50"
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        />
                      </div>
                      <div className="win95-inset p-1 hover:shadow-md transition-shadow">
                        <input 
                          type="text" 
                          placeholder="PASSCODE (password - visible for fun!)" 
                          className="w-full p-2 text-sm outline-none font-mono focus:bg-blue-50"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        />
                      </div>
                      <button 
                        className="win95-button w-full py-4 text-xl bg-blue-100 hover:bg-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        onClick={handleLogin}
                        disabled={loginLoading}
                      >
                        {loginLoading ? 'AUTHENTICATING...' : 'EXECUTE LOGIN'}
                      </button>
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
                      
                      <div className="text-[10px] text-gray-500 mt-4 win95-inset p-2 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                        💡 <strong>TIP:</strong> Click any user's password in "Active Users" to copy their credentials!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ACTIVE USERS TAB */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b-4 border-blue-900 pb-2 group">
                  <h2 className="font-black text-3xl text-blue-900 uppercase italic group-hover:text-blue-500 transition-all cursor-default">👥 Corporate Network: Active Users</h2>
                  <button onClick={fetchUsers} className="win95-button text-[10px] px-4 py-1 hover:bg-blue-100 hover:scale-105 transition-all">🔄 Refresh</button>
                </div>
                {loading && (
                  <div className="text-center py-8"><div className="text-2xl animate-spin">⏳</div><div className="text-sm font-bold text-gray-600 mt-2">Loading users...</div></div>
                )}
                {!loading && users.length === 0 && (
                  <div className="text-center py-8 win95-inset bg-yellow-50 hover:bg-yellow-100 transition-colors">
                    <div className="text-4xl mb-2 hover:scale-110 transition-transform">📭</div>
                    <div className="text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors">No users found.</div>
                    <div className="text-xs text-gray-500 mt-1">Be the first to <a href="/create" className="text-blue-600 underline hover:text-blue-400 transition-colors">create an account</a>!</div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {users.map((u, i) => {
                    const uTotalNotes = getTotalNotes(u.songs);
                    return (
                      <div key={i} className="win95-window p-0 hover:shadow-2xl hover:border-blue-400 transition-all bg-white/90 backdrop-blur-sm group">
                        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl hover:scale-125 hover:rotate-12 transition-all cursor-pointer">👤</div>
                            <div>
                              <div className="text-xl font-black group-hover:text-yellow-300 transition-colors cursor-default">@{u.username}</div>
                              <div className="text-[10px] opacity-80 hover:opacity-100 transition-opacity cursor-default">{u.job || 'Unemployed Void Walker'}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <button 
                              className="text-[10px] bg-white/20 px-2 py-1 rounded hover:bg-white/40 hover:scale-105 transition-all cursor-pointer"
                              onClick={() => handleQuickLogin(u.username, u.password)}
                              title="Click to sign in as this user"
                            >
                              🔑 PW: {u.password}
                            </button>
                            <div className="text-[9px] mt-1 opacity-70 hover:opacity-100 transition-opacity cursor-default">⏱️ Member for: {formatDuration(u.member_since || u.created_at)}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                          <div className="space-y-3">
                            <div className="win95-inset bg-gray-50 p-3 hover:bg-gray-100 transition-colors cursor-default group/item">
                              <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 group-hover/item:text-blue-600 transition-colors">📝 Bio</div>
                              <div className="text-xs italic text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">{u.bio || 'No bio provided.'}</div>
                            </div>
                            <div className="win95-inset bg-gray-50 p-3 hover:bg-gray-100 transition-colors cursor-default group/item">
                              <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 group-hover/item:text-blue-600 transition-colors">🎯 Skills</div>
                              <div className="text-xs text-gray-700 group-hover/item:text-gray-900 transition-colors">{u.skills || 'None listed'}</div>
                            </div>
                            <div className="text-[9px] text-blue-600 truncate hover:text-blue-400 hover:underline transition-colors cursor-pointer">{u.portfolio_url}</div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="win95-inset bg-green-50 p-3 hover:bg-green-100 transition-colors cursor-default group/item">
                              <div className="text-[10px] font-bold text-green-700 uppercase mb-2 group-hover/item:text-green-900 transition-colors">💰 Net Worth</div>
                              <div className="text-2xl font-black text-green-600 group-hover/item:scale-105 transition-transform">${Math.round(Number(u.net_worth) || 0).toLocaleString()}</div>
                              <div className="text-[8px] text-gray-400 group-hover/item:text-gray-600 leading-tight mb-1">Savings (excluding your various Job Salaries, batteries not included)</div>
                              <div className={`text-sm font-bold ${(Number(u.balance) || 0) >= 0 ? 'text-blue-600' : 'text-red-600'} group-hover/item:text-blue-700 transition-colors`}>💵 Balance: ${Math.round(Number(u.balance) || 0).toLocaleString()}</div>
                              <div className="text-[8px] text-gray-400 group-hover/item:text-gray-600 leading-tight">Liquid Capital – readily accessible funds for immediate market deployment</div>
                            </div>
                            <div className="win95-inset bg-blue-50 p-3 hover:bg-blue-100 transition-colors group/item">
                              <div className="text-[10px] font-bold text-blue-700 uppercase mb-2 group-hover/item:text-blue-900 transition-colors">💼 Jobs ({(u.jobs || []).length})</div>
                              {(u.jobs || []).length === 0 ? (
                                <div className="text-[10px] text-gray-500 italic hover:text-gray-700 transition-colors cursor-default">No jobs yet</div>
                              ) : (
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {(u.jobs || []).map((job, j) => (
                                    <div key={j} className="text-[10px] bg-white p-1 rounded border border-blue-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-default">
                                      <span className="font-bold hover:text-blue-600 transition-colors">{job.job_title}</span> @ <span className="hover:text-blue-600 transition-colors">{job.company}</span>
                                      <span className="text-green-600 ml-1 hover:text-green-700 transition-colors">{job.pay}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="win95-inset bg-pink-50 p-3 hover:bg-pink-100 transition-colors group/item">
                              <div className="text-[10px] font-bold text-pink-700 uppercase mb-2 group-hover/item:text-pink-900 transition-colors">❤️ Relationships ({(u.relationships || []).length})</div>
                              {(u.relationships || []).length === 0 ? (
                                <div className="text-[10px] text-gray-500 italic hover:text-gray-700 transition-colors cursor-default">Forever alone in the void</div>
                              ) : (
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {(u.relationships || []).map((rel, r) => (
                                    <div key={r} className="text-[10px] bg-white p-1 rounded border border-pink-200 hover:border-pink-400 hover:shadow-sm transition-all cursor-default">
                                      <span className="hover:text-pink-600 transition-colors">💕 {rel.partner_name}</span> - <span className="hover:text-pink-600 transition-colors">{rel.relationship_type}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="win95-inset bg-purple-50 p-3 hover:bg-purple-100 transition-colors cursor-default group/item">
                              <div className="text-[10px] font-bold text-purple-700 uppercase mb-2 group-hover/item:text-purple-900 transition-colors">🎵 Notes Recorded</div>
                              <div className="text-2xl font-black text-purple-600 group-hover/item:scale-105 transition-transform">{uTotalNotes}</div>
                              <div className="text-[9px] text-gray-500 group-hover/item:text-gray-700 transition-colors">{(u.songs || []).length} composition{(u.songs || []).length !== 1 ? 's' : ''}</div>
                            </div>
                            <div className="win95-inset bg-amber-50 p-3 hover:bg-amber-100 transition-colors cursor-default group/item">
                              <div className="text-[10px] font-bold text-amber-700 uppercase mb-2 group-hover/item:text-amber-900 transition-colors">⚡ Interactivity Points</div>
                              <div className="text-2xl font-black text-amber-600 group-hover/item:scale-105 transition-transform">{Number(u.interactivity_points || 0).toFixed(1)}</div>
                              <div className="text-[9px] text-gray-500 group-hover/item:text-gray-700 transition-colors">Pipeline engagement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* JOBS TAB */}
            {activeTab === 'jobs' && (
              <div className="space-y-8">
                <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg group">
                  <h2 className="font-black text-2xl uppercase tracking-widest group-hover:italic transition-all">Career-Void-Link (ZipVoid)</h2>
                  {currentUser && <span className="text-xs bg-green-500 px-2 py-1 rounded hover:bg-green-400 transition-colors">Applying as @{currentUser.username}</span>}
                </div>
                {!currentUser && (
                  <div className="win95-inset bg-yellow-50 p-4 text-center hover:bg-yellow-100 transition-colors">
                    <span className="text-sm">⚠️ <strong>Sign in</strong> to save jobs! Salary adds to your net worth.</span>
                  </div>
                )}
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
                        <button className={`win95-button w-full py-6 text-xl uppercase font-black ${j.expired ? 'bg-gray-200' : 'bg-green-100 hover:bg-green-200 hover:scale-105 active:scale-95'} transition-all`} onClick={() => handleAcceptJob(j)}>
                          {j.expired ? 'EXPIRED' : 'APPLY'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="win95-button w-full py-10 text-3xl font-black bg-yellow-100 hover:bg-yellow-200 hover:scale-[1.02] active:scale-95 uppercase italic tracking-widest border-4 border-double border-yellow-800 transition-all" onClick={handleGenerateJobs}>REGENERATE CAREER PATHS</button>
              </div>
            )}

            {/* MATCHMAKER TAB */}
            {activeTab === 'matchmaker' && (
              <div className="space-y-8 relative overflow-hidden h-full">
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute animate-bounce" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${Math.random() * 40 + 20}px`, animationDuration: `${Math.random() * 3 + 1}s`, opacity: 0.3 }}>❤️</div>
                  ))}
                </div>
                
                <div className="bg-pink-600 text-white p-4 flex justify-between items-center shadow-lg relative z-10 group">
                  <div>
                    <h2 className="font-black text-2xl uppercase tracking-widest italic group-hover:scale-105 transition-transform">MATCHMAKER: THE VOID LOVES YOU</h2>
                    {currentUser && <span className="text-xs bg-white/20 px-2 py-1 rounded">Finding love as @{currentUser.username}</span>}
                  </div>
                  <div 
                    className="text-xs bg-white text-pink-600 px-3 py-2 font-bold cursor-pointer hover:bg-pink-100 hover:scale-110 transition-all border-2 border-pink-300 shadow-lg min-w-[200px] text-center"
                    onClick={() => setShowSpamInbox(!showSpamInbox)}
                  >
                    <div className="animate-pulse">📬 SPAM INBOX</div>
                    <div className="text-lg font-black text-pink-700">{spamCount} UNREAD DESIRES</div>
                  </div>
                </div>

                {!currentUser && (
                  <div className="win95-inset bg-yellow-50 p-4 text-center relative z-10 hover:bg-yellow-100 transition-colors">
                    <span className="text-sm">⚠️ <strong>Sign in</strong> to save relationships!</span>
                  </div>
                )}

                {showSpamInbox && (
                  <div className="absolute right-4 top-20 w-80 h-96 bg-white border-4 border-pink-400 z-50 flex flex-col shadow-2xl">
                    <div className="bg-pink-600 text-white p-2 flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase">💌 Spam-Chat-Bot.exe - {spamCount} messages</span>
                      <button className="win95-button p-0 px-2 text-xs hover:bg-red-200" onClick={() => setShowSpamInbox(false)}>X</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-pink-50 font-mono text-[9px]">
                      {spamMessages.map((msg, i) => (
                        <div key={i} className={`p-2 rounded shadow-sm border ${msg.sent ? 'bg-blue-100 border-blue-300 ml-8' : 'bg-white border-pink-200 mr-8'} hover:scale-[1.02] transition-transform`}>
                          {msg.sent ? (
                            <><span className="text-blue-600 font-bold">You:</span> {msg.text}</>
                          ) : (
                            <><span className="text-pink-600 font-bold">User_{Math.floor(Math.random()*999)}:</span> {typeof msg === 'string' ? msg : msg.text}</>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t-2 border-pink-300 bg-white flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Send a message to the void..." 
                        className="flex-1 text-[10px] p-2 outline-none border-2 border-pink-200 focus:border-pink-400 transition-colors rounded"
                        value={spamInput}
                        onChange={(e) => setSpamInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendSpam()}
                      />
                      <button className="win95-button px-3 bg-pink-200 hover:bg-pink-300 text-[10px] font-bold" onClick={handleSendSpam}>SEND</button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {matches.map((m) => (
                    <div key={m.id} className="win95-window p-4 bg-white border-pink-400 hover:scale-105 hover:shadow-xl transition-all cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-2xl hover:scale-125 transition-transform">{m.image}</div>
                        <div className="text-[10px] bg-pink-100 text-pink-800 px-2 font-bold uppercase hover:bg-pink-200 transition-colors">{m.type}</div>
                      </div>
                      <div className="text-lg font-black text-pink-700 underline hover:text-pink-500 transition-colors">{m.name} ({m.species})</div>
                      <div className="text-xs font-bold text-gray-500 mb-2 italic hover:text-gray-700 transition-colors">"{m.bio}"</div>
                      <div className="win95-inset bg-pink-50 p-2 text-[11px] mb-3 hover:bg-pink-100 transition-colors">
                        <strong>DESIRE:</strong> {m.desire}
                      </div>
                      <button className="win95-button w-full py-2 bg-pink-200 hover:bg-pink-300 hover:scale-[1.02] active:scale-95 font-bold text-xs transition-all" onClick={() => handleAcceptLove(m)}>ACCEPT LOVE</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ECONOMY TAB */}
            {activeTab === 'economy' && (
              <div className="flex h-full gap-4">
                <div className="w-48 space-y-2 overflow-y-auto win95-inset bg-gray-100 p-2 text-[10px] font-mono group hover:bg-blue-50 transition-colors">
                  <h3 className="font-bold border-b border-gray-400 mb-1 group-hover:text-blue-600">ASSETS</h3>
                  {['PE', 'Bonds', 'REIT', 'VC', 'Crypto', 'Art', 'SMA', 'IRA'].map(l => <TickerItem key={l} label={l} />)}
                </div>
                <div className="flex-1 text-center space-y-4 flex flex-col group">
                  <h2 className="font-black text-2xl text-blue-900 uppercase italic tracking-tighter group-hover:text-green-600 transition-all">💹 Money Shot Matrix v4.0</h2>
                  {currentUser ? (
                    <div className="text-xs text-gray-600">Trading as <strong className="hover:text-blue-600 transition-colors">@{currentUser.username}</strong></div>
                  ) : (
                    <div className="text-xs text-red-600 font-bold">⚠️ Sign in to save your earnings!</div>
                  )}
                  <div className="relative p-2 bg-[#111] win95-window mx-auto w-full max-w-[500px] hover:border-green-500 transition-colors cursor-crosshair">
                    <canvas ref={canvasRef} width="500" height="200" className="market-graph block w-full"></canvas>
                    <div className="absolute bottom-1 left-0 right-0 text-[10px] text-white flex justify-around font-mono bg-black bg-opacity-50 px-2 py-1">
                      <span>T-{timeline.month}</span><span>Y:{timeline.year > 0 ? '+' : ''}{timeline.year.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Economy Stats Display */}
                  <div className="grid grid-cols-2 gap-4 bg-black text-green-500 win95-inset p-4">
                    <div className="text-left space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase">Trading Session</div>
                      <div className="text-lg font-black">Invested: <span className="text-blue-400">${tradingPot.toLocaleString()}</span></div>
                      <div className={`text-lg font-black ${tradingPL >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                        P/L: {tradingPL >= 0 ? '+' : ''}${tradingPL.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase">Your Account</div>
                      <div className={`text-lg font-black ${userBalance >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                        Balance: ${userBalance.toLocaleString()}
                      </div>
                      <div className="text-lg font-black text-green-300">
                        Net Worth: ${userNetWorth.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* 3 Economy Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      className="win95-button px-4 py-4 bg-green-200 hover:bg-green-300 hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-1"
                      onClick={handleInvest}
                    >
                      <span className="text-2xl">💰</span>
                      <span className="font-black text-sm uppercase">Invest $1M</span>
                      <span className="text-[9px] text-gray-600">Start trading</span>
                    </button>
                    <button 
                      className="win95-button px-4 py-4 bg-yellow-200 hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-1"
                      onClick={handleCashOut}
                    >
                      <span className="text-2xl">💵</span>
                      <span className="font-black text-sm uppercase">Cash Out</span>
                      <span className="text-[9px] text-gray-600">P/L → Balance</span>
                    </button>
                    <button 
                      className="win95-button px-4 py-4 bg-blue-200 hover:bg-blue-300 hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-1"
                      onClick={handleMoveToSavings}
                    >
                      <span className="text-2xl">🏦</span>
                      <span className="font-black text-sm uppercase">Move to Savings</span>
                      <span className="text-[9px] text-gray-600">Balance → Net Worth</span>
                    </button>
                  </div>
                  
                  <div className="text-[10px] text-gray-500 win95-inset p-2 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                    💡 <strong>Flow:</strong> Invest → Watch P/L fluctuate → Cash Out (adds P/L to Balance) → Move to Savings (Balance → Net Worth). Jobs also add to Net Worth!
                  </div>
                </div>
                <div className="w-48 space-y-2 overflow-y-auto win95-inset bg-gray-100 p-2 text-[10px] font-mono group hover:bg-red-50 transition-colors">
                  <h3 className="font-bold border-b border-gray-400 mb-1 group-hover:text-red-600">MARKETS 5,000</h3>
                  {['S&P 0', 'Nasdaq-Void', 'Farmland', 'Annuity', 'Hedge', 'Commodity', 'Resource', 'Retire'].map(l => <TickerItem key={l} label={l} />)}
                </div>
              </div>
            )}

            {/* THOUGHTS/PIPELINE TAB */}
            {activeTab === 'thoughts' && (
              <div className="space-y-4 h-full flex flex-col relative">
                {/* Blocked post notification */}
                {blockedPostMessage && (
                  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-red-500 animate-pulse">
                    <span className="text-red-400 font-black">☠️</span> {blockedPostMessage}
                  </div>
                )}

                {/* Fake URL Bar */}
                <div className="win95-inset bg-white p-1 flex items-center gap-1 sm:gap-2">
                  <span className="text-[8px] sm:text-[10px] text-gray-500 px-1 sm:px-2">🔒</span>
                  <div className="flex-1 bg-gray-100 px-1 sm:px-2 py-1 text-[8px] sm:text-[11px] font-mono text-gray-600 truncate">
                    https://pipeline.void/thoughts/feed?user={currentUser?.username || 'anon'}
                  </div>
                  <button className="text-[8px] sm:text-[10px] px-1 sm:px-2 hover:bg-gray-200 transition-colors">🔄</button>
                </div>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-lg group hover:from-amber-700 hover:to-yellow-600 transition-colors">
                  <div>
                    <h2 className="font-black text-sm sm:text-xl uppercase tracking-wide sm:tracking-widest italic group-hover:scale-105 transition-transform">💡 Pipeline</h2>
                    <div className="text-[8px] sm:text-xs opacity-80">The Opinionshare Platform</div>
                    {currentUser && (
                      <span className="text-[8px] sm:text-xs bg-white/20 px-1 sm:px-2 py-0.5 sm:py-1 rounded mt-1 inline-block">
                        @{currentUser.username} | ⚡ {Number(currentUser.interactivity_points || 0).toFixed(1)} pts
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowNewPostModal(true)}
                    className="win95-button px-2 sm:px-4 py-1 sm:py-2 bg-white text-amber-700 font-black text-[10px] sm:text-sm hover:bg-amber-100 hover:scale-105 transition-all"
                  >
                    📝 Post
                  </button>
                </div>

                {!currentUser && (
                  <div className="win95-inset bg-yellow-50 p-3 text-center hover:bg-yellow-100 transition-colors">
                    <span className="text-sm">⚠️ <strong>Sign in</strong> to earn Interactivity Points!</span>
                  </div>
                )}

                {/* Post Feed - flows bottom to top */}
                <div 
                  ref={pipelineContainerRef}
                  className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 win95-inset bg-gray-100 p-2 sm:p-4"
                  style={{ display: 'flex', flexDirection: 'column-reverse' }}
                >
                  {pipelinePosts.map((post) => (
                    <div key={post.id} className="flex gap-1 sm:gap-2">
                      {/* Left side replies - hidden on mobile, shown on larger screens */}
                      <div className="hidden sm:flex w-20 md:w-24 space-y-1 flex-col justify-end">
                        {(post.replies || []).filter(r => r.side === 'left').slice(0, 3).map((reply, idx) => (
                          <div key={idx} className="bg-gray-200 p-1 rounded text-[7px] md:text-[8px] border border-gray-300 hover:bg-gray-300 transition-colors">
                            <div className="flex items-center gap-1">
                              <span>{reply.displayEmoji}</span>
                              <span className="font-bold truncate">{reply.displayName}</span>
                            </div>
                            {reply.replyType === 'image' && (
                              <div className="bg-black text-white text-[6px] md:text-[7px] p-0.5 text-center my-0.5 font-bold">THIS IS A IMAGE</div>
                            )}
                            {reply.replyType === 'video' && (
                              <div className="bg-black text-white text-[6px] md:text-[7px] p-0.5 text-center my-0.5 font-bold">THIS IS A VIDEO</div>
                            )}
                            <div className="text-gray-600 leading-tight truncate">{reply.content}</div>
                          </div>
                        ))}
                      </div>

                      {/* Main post card - Polaroid style */}
                      <div className="flex-1 bg-white shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-amber-300 transition-all group">
                        {/* Post header */}
                        <div className="flex items-center justify-between p-1.5 sm:p-2 border-b border-gray-200">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-lg sm:text-xl hover:scale-125 transition-transform cursor-pointer">{post.displayEmoji}</span>
                            <span className="font-bold text-[10px] sm:text-sm text-gray-700 hover:text-amber-600 transition-colors truncate max-w-[100px] sm:max-w-none">{post.displayName}</span>
                          </div>
                          <span className="text-[7px] sm:text-[9px] text-gray-400">{new Date(post.createdAt).toLocaleTimeString()}</span>
                        </div>

                        {/* Post content */}
                        <div className="p-2 sm:p-3">
                          {/* Image/Video placeholder if applicable */}
                          {(post.postType === 'image' || post.postType === 'video') && (
                            <div className="bg-black text-white text-center py-4 sm:py-8 mb-2 sm:mb-3 font-black text-[10px] sm:text-sm">
                              THIS IS A {post.postType === 'image' ? 'IMAGE' : 'VIDEO'}
                            </div>
                          )}
                          {/* Opinion text */}
                          <p className="text-black text-[11px] sm:text-sm leading-relaxed font-medium">{post.content}</p>
                          
                          {/* Mobile replies preview */}
                          {(post.replies?.length > 0) && (
                            <div className="sm:hidden mt-2 pt-2 border-t border-gray-100">
                              <div className="text-[8px] text-gray-500 mb-1">💬 {post.replies.length} replies</div>
                              <div className="space-y-1 max-h-20 overflow-y-auto">
                                {post.replies.slice(0, 2).map((reply, idx) => (
                                  <div key={idx} className="text-[8px] bg-gray-100 p-1 rounded">
                                    <span>{reply.displayEmoji}</span> <span className="font-bold">{reply.displayName}:</span> {reply.content}
                                  </div>
                                ))}
                                {post.replies.length > 2 && (
                                  <div className="text-[7px] text-gray-400">+{post.replies.length - 2} more...</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Post actions */}
                        <div className="flex flex-col gap-1 p-1.5 sm:p-2 border-t border-gray-200 bg-gray-50">
                          <div className="flex items-center justify-between gap-1">
                            <button 
                              onClick={() => handleBlockPost(post.id)}
                              className="text-[6px] sm:text-[8px] bg-red-100 hover:bg-red-200 px-1 sm:px-2 py-1 rounded font-bold text-red-700 hover:scale-105 transition-all"
                            >
                              🚫 Block
                            </button>
                            <button 
                              onClick={handleHundredKInteraction}
                              className="flex-1 text-[4px] sm:text-[6px] bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 px-0.5 sm:px-1 py-1 rounded font-bold text-orange-800 hover:scale-[1.02] transition-all leading-tight text-center"
                            >
                              💰 $100K Agreement/Disagreement T&C + Fraud Fund + Betting + Tips + Galactic Taxes + Tokens
                            </button>
                            <button 
                              onClick={() => setShowReplyModal(post.id)}
                              className="text-[6px] sm:text-[8px] bg-blue-100 hover:bg-blue-200 px-1 sm:px-2 py-1 rounded font-bold text-blue-700 hover:scale-105 transition-all"
                            >
                              💬 Reply
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right side replies - hidden on mobile, shown on larger screens */}
                      <div className="hidden sm:flex w-20 md:w-24 space-y-1 flex-col justify-end">
                        {(post.replies || []).filter(r => r.side === 'right').slice(0, 3).map((reply, idx) => (
                          <div key={idx} className="bg-gray-200 p-1 rounded text-[7px] md:text-[8px] border border-gray-300 hover:bg-gray-300 transition-colors">
                            <div className="flex items-center gap-1">
                              <span>{reply.displayEmoji}</span>
                              <span className="font-bold truncate">{reply.displayName}</span>
                            </div>
                            {reply.replyType === 'image' && (
                              <div className="bg-black text-white text-[6px] md:text-[7px] p-0.5 text-center my-0.5 font-bold">THIS IS A IMAGE</div>
                            )}
                            {reply.replyType === 'video' && (
                              <div className="bg-black text-white text-[6px] md:text-[7px] p-0.5 text-center my-0.5 font-bold">THIS IS A VIDEO</div>
                            )}
                            <div className="text-gray-600 leading-tight truncate">{reply.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Post Modal */}
                {showNewPostModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setShowNewPostModal(false)}>
                    <div className="bg-white win95-window p-0 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                      <div className="bg-amber-600 text-white p-2 flex justify-between items-center sticky top-0">
                        <span className="font-bold text-xs sm:text-sm">📝 Submit Your Opinion to the Void</span>
                        <button onClick={() => setShowNewPostModal(false)} className="hover:bg-amber-700 px-2">✕</button>
                      </div>
                      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Post Type</label>
                          <div className="flex gap-2">
                            {['text', 'image', 'video'].map(type => (
                              <button 
                                key={type}
                                onClick={() => setNewPostType(type)}
                                className={`win95-button px-3 py-1 text-xs uppercase ${newPostType === type ? 'bg-amber-200 shadow-[inset_2px_2px_#888]' : ''}`}
                              >
                                {type === 'text' && '📝'} {type === 'image' && '🖼️'} {type === 'video' && '🎬'} {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Your Opinion</label>
                          <textarea 
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Share your thoughts with the void..."
                            className="w-full h-32 p-2 border-2 border-gray-300 win95-inset resize-none text-sm"
                          />
                        </div>
                        {newPostType !== 'text' && (
                          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                            💡 Your post will include a "{newPostType === 'image' ? 'THIS IS A IMAGE' : 'THIS IS A VIDEO'}" placeholder
                          </div>
                        )}
                        <button 
                          onClick={handleSubmitPost}
                          className="win95-button w-full py-3 bg-amber-200 hover:bg-amber-300 font-black uppercase"
                        >
                          Post to Pipeline
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reply Modal */}
                {showReplyModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setShowReplyModal(null)}>
                    <div className="bg-white win95-window p-0 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                      <div className="bg-blue-600 text-white p-2 flex justify-between items-center sticky top-0">
                        <span className="font-bold text-xs sm:text-sm">💬 Add Reply</span>
                        <button onClick={() => setShowReplyModal(null)} className="hover:bg-blue-700 px-2">✕</button>
                      </div>
                      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Reply Type</label>
                          <div className="flex gap-2">
                            {['text', 'image', 'video'].map(type => (
                              <button 
                                key={type}
                                onClick={() => setReplyType(type)}
                                className={`win95-button px-3 py-1 text-xs uppercase ${replyType === type ? 'bg-blue-200 shadow-[inset_2px_2px_#888]' : ''}`}
                              >
                                {type === 'text' && '📝'} {type === 'image' && '🖼️'} {type === 'video' && '🎬'} {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Side</label>
                          <div className="flex gap-2">
                            {['left', 'right'].map(side => (
                              <button 
                                key={side}
                                onClick={() => setReplySide(side)}
                                className={`win95-button px-3 py-1 text-xs uppercase ${replySide === side ? 'bg-blue-200 shadow-[inset_2px_2px_#888]' : ''}`}
                              >
                                {side === 'left' ? '⬅️' : '➡️'} {side}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Your Reply</label>
                          <textarea 
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Add your reply..."
                            className="w-full h-24 p-2 border-2 border-gray-300 win95-inset resize-none text-sm"
                          />
                        </div>
                        <button 
                          onClick={() => handleSubmitReply(showReplyModal)}
                          className="win95-button w-full py-3 bg-blue-200 hover:bg-blue-300 font-black uppercase"
                        >
                          Submit Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ARTIST TAB */}
            {activeTab === 'artist' && (
              <div className="space-y-6 h-full flex flex-col">
                <div className="bg-purple-800 text-white p-4 flex justify-between items-center shadow-lg group hover:bg-purple-700 transition-colors">
                  <h2 className="font-black text-2xl uppercase tracking-widest italic group-hover:scale-105 transition-transform">🎹 Musicianship Studio v1.0</h2>
                  <div className="flex items-center gap-4">
                    {currentUser ? (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors">Recording as @{currentUser.username} | 🎵 {userTotalNotes} notes saved</span>
                    ) : (
                      <span className="text-xs bg-red-500/50 px-2 py-1 rounded">Sign in to save!</span>
                    )}
                    {isRecording && <div className="flex items-center gap-2 recording-pulse"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-xs font-bold">RECORDING</span></div>}
                  </div>
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button onClick={isRecording ? stopRecording : startRecording} className={`win95-button px-6 py-3 font-black uppercase text-sm hover:scale-105 active:scale-95 transition-all ${isRecording ? 'bg-red-300 hover:bg-red-400' : 'bg-red-100 hover:bg-red-200'}`}>
                    {isRecording ? '⏹ STOP RECORDING' : '⏺ START RECORDING'}
                  </button>
                  <button onClick={playbackRecording} disabled={isPlaying || recordedNotes.length === 0} className="win95-button px-6 py-3 font-black uppercase text-sm bg-green-100 hover:bg-green-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                    {isPlaying ? '▶ PLAYING...' : '▶ PLAYBACK'}
                  </button>
                  <button onClick={saveAndDownloadRecording} className="win95-button px-6 py-3 font-black uppercase text-sm bg-blue-100 hover:bg-blue-200 hover:scale-105 active:scale-95 transition-all">
                    💾 {currentUser ? 'SAVE & DOWNLOAD' : 'DOWNLOAD'}
                  </button>
                </div>
                <div className="text-center text-xs text-gray-600 bg-yellow-50 p-3 win95-inset hover:bg-yellow-100 hover:shadow-md transition-all cursor-help group">
                  <strong className="group-hover:text-blue-600 transition-colors">KEYBOARD SHORTCUTS:</strong> 
                  <span className="group-hover:text-gray-800 transition-colors"> Use keys A-L for white keys, W-P for black keys</span>
                  <div className="mt-1 text-purple-600 font-bold group-hover:text-purple-800 transition-colors">🎵 This recording: {recordedNotes.length} notes</div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg shadow-2xl hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-shadow">
                    <div className="relative flex">
                      {whiteKeys.map((note) => (
                        <div key={note} onMouseDown={() => { playNote(note); setActiveKeys(prev => new Set([...prev, note])); }}
                          onMouseUp={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                          onMouseLeave={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                          className={`piano-key-white w-12 h-40 mx-[1px] flex items-end justify-center pb-2 select-none ${activeKeys.has(note) ? 'active' : ''}`}>
                          <span className="text-[10px] font-bold text-gray-500">{note}</span>
                        </div>
                      ))}
                      {blackKeys.map(({ note, position }) => (
                        <div key={note} onMouseDown={() => { playNote(note); setActiveKeys(prev => new Set([...prev, note])); }}
                          onMouseUp={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                          onMouseLeave={() => setActiveKeys(prev => { const s = new Set(prev); s.delete(note); return s; })}
                          className={`piano-key-black absolute w-8 h-24 select-none ${activeKeys.has(note) ? 'active' : ''}`}
                          style={{ left: `${position * 50 + 34}px` }}>
                          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-400">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="win95-inset bg-gray-50 p-3 text-center hover:bg-blue-50 hover:shadow-md transition-all group">
                  <div className="text-sm font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                    {recordedNotes.length > 0 ? <>📝 {recordedNotes.length} notes recorded • Ready to save!</> : <>🎵 Start recording and play some notes!</>}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">
                    {currentUser ? 'Save to add notes to your profile total!' : 'Sign in to save!'}
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
    <div className="flex justify-between border-b border-gray-200 py-1 group/ticker hover:bg-white hover:px-1 transition-all cursor-crosshair">
      <span className="group-hover/ticker:text-blue-600 group-hover/ticker:font-bold transition-all">{label}:</span>
      <span className={`${val > 5000 ? 'text-green-600' : 'text-red-600'} group-hover/ticker:scale-110 transition-transform`}>${val.toFixed(0)}</span>
    </div>
  );
}

function FooterTickers() {
  const [tasks, setTasks] = useState(0);
  const [memory, setMemory] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => { setTasks(Math.floor(Math.random() * 999)); setMemory(Math.floor(Math.random() * 64000)); }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-3 text-[11px] text-gray-800 flex justify-between bg-[#c0c0c0] font-mono border-t-2 border-gray-400">
      <div className="flex gap-8">
        <span className="flex items-center gap-2 font-bold hover:text-red-600 hover:scale-105 transition-all cursor-help" title="Synchronization Errors"><div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div> SYNC_ERR: {tasks}</span>
        <span className="font-bold hover:text-blue-600 hover:scale-105 transition-all cursor-help" title="RAM Usage">RAM_USE: {memory}KB</span>
      </div>
      <div className="flex gap-4 italic font-bold">
        <span className="text-blue-900 animate-pulse hover:text-purple-600 hover:scale-105 transition-all cursor-help" title="Meta Mode Active">META_MODE: 1.0.V</span>
        <span className="hover:text-green-600 hover:scale-105 transition-all cursor-help" title="Vista Patch Version">VISTA_PATCH_0.8</span>
      </div>
    </div>
  );
}
