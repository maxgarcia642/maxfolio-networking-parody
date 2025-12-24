import Navbar from '@/components/Navbar';
import Utilities from '@/components/Utilities';
import { ArrowDown, Terminal, Gamepad2 } from 'lucide-react';

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
             {/* Main Call to Action Button */}
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

      {/* --- PROGRAMMING SECTION (Simplified for Reliability) --- */}
      <section id="programming" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="aero-card p-8 bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-3xl font-extrabold text-aero-ocean mb-6 flex items-center gap-3">
            <Terminal /> Programming Repositories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Cards */}
            <div className="bg-gray-900 rounded-xl p-4 text-white shadow-xl hover:scale-105 transition-transform">
              <h3 className="font-bold text-green-400 mb-2">Python Projects</h3>
              <p className="text-sm text-gray-400 mb-4">High School CS Work & Scripts</p>
              <a href="https://github.com/maxgarcia642" target="_blank" className="text-xs bg-gray-700 px-2 py-1 rounded">View on GitHub</a>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-white shadow-xl hover:scale-105 transition-transform">
              <h3 className="font-bold text-blue-400 mb-2">Java AP CS</h3>
              <p className="text-sm text-gray-400 mb-4">Object Oriented Programming</p>
              <a href="https://github.com/maxgarcia642" target="_blank" className="text-xs bg-gray-700 px-2 py-1 rounded">View on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- UTILITIES DASHBOARD (Imported Component) --- */}
      <Utilities />

      {/* --- GAME SECTION --- */}
      <section id="game" className="py-20 px-4 text-center">
         <div className="aero-card max-w-2xl mx-auto p-10 bg-white">
            <h2 className="text-3xl font-bold text-aero-grass mb-4 flex justify-center gap-2 items-center">
              <Gamepad2 /> Pixel Studio
            </h2>
            <p className="text-slate-600 mb-8">
              A dedicated space for pixel art and retro gaming. (Interactive module loading...)
            </p>
            <div className="w-full h-64 bg-gray-100 rounded-xl border-4 border-dashed border-gray-300 flex items-center justify-center">
               <span className="text-slate-400 font-mono">Game Canvas Initializing</span>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-6 text-center text-slate-500 text-sm bg-white/40 backdrop-blur-sm">
        &copy; 2025 Maximiliano Garcia. Powered by Next.js & Frutiger Aero.
      </footer>
    </main>
  );
}
