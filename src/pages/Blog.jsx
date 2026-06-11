import React from 'react';
import { Calendar, User, ArrowRight, BookOpen, PenTool } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    category: 'Research',
    date: 'June 02, 2026',
    author: 'ATBKHS LABS',
    title: 'Acoustic Sonar Tuning under Hydrostatic Pressure gradients',
    desc: 'Analyzing ultrasonic transducer performance variations under deep-water pressure cells and calibrating temperature-depth algorithms.',
    readTime: '8 min read'
  },
  {
    id: 2,
    category: 'Competition',
    date: 'May 18, 2026',
    author: 'TEAM DREAMERS',
    title: 'Agri-Robotics National Championship: Engineering Review',
    desc: 'An in-depth log of how our Farming Rover overcame sudden moisture sensor spikes and electrical noise to score a perfect soil mapping run.',
    readTime: '12 min read'
  },
  {
    id: 3,
    category: 'Update',
    date: 'April 29, 2026',
    author: 'AERO WING',
    title: 'Hexacopter structural shear stress tests at 20 m/s wind velocities',
    desc: 'A compilation of telemetry results analyzing folding carbon boom deflection, rotor vibration fatigue, and Pixhawk motor balance logs.',
    readTime: '6 min read'
  },
  {
    id: 4,
    category: 'Innovation',
    date: 'April 10, 2026',
    author: 'EMBEDDED DEVS',
    title: 'Implementing real-time SLAM algorithms on ultra-low-power STM32 microcontrollers',
    desc: 'Exploring spatial localization math shortcuts, custom matrix solvers, and flash storage partitioning for autonomous tracking.',
    readTime: '15 min read'
  }
];

const FEATURED_ARTICLE = {
  category: 'Featured Research',
  date: 'June 10, 2026',
  author: 'DR. ATBKHS & TEAM',
  title: 'Autonomous Navigation in Dynamic mud terrain: The Soil-Probe Pathing Model',
  desc: 'This paper documents the design of a stepper-motor-driven crawler that balances torque, track slip coefficients, and dynamic soil penetrometer loads to compute high-efficiency traversal paths in agricultural sectors.',
  readTime: '20 min read'
};

export default function Blog() {
  return (
    <div className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/50 block">LAB DIARIES & PAPERS</span>
          <h1 className="text-4xl md:text-5xl font-serif text-glow uppercase tracking-widest">Innovation Stories</h1>
          <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-white/45 max-w-xl">
            Read engineering writeups, research journals, post-competition analysis, and system hardware updates from our development team.
          </p>
        </div>

        {/* FEATURED ARTICLE HERO CARD */}
        <div className="border border-white/10 rounded-sm overflow-hidden bg-neutral-950 p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:border-white/20 transition-all duration-500 relative">
          {/* Subtle blueprint tech lines behind featured */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_20px] pointer-events-none" />
          
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[9px] font-serif uppercase tracking-[0.25em] text-white/45">
                <span className="border border-white/20 px-2.5 py-0.5 rounded-sm bg-white/5">{FEATURED_ARTICLE.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {FEATURED_ARTICLE.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {FEATURED_ARTICLE.author}</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-serif text-white tracking-widest uppercase text-glow leading-snug">
                {FEATURED_ARTICLE.title}
              </h2>
              
              <p className="text-[12px] uppercase tracking-wider leading-relaxed text-white/50 font-serif max-w-3xl">
                {FEATURED_ARTICLE.desc}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-[9px] font-serif uppercase tracking-widest text-white/40">
              <span>Time: {FEATURED_ARTICLE.readTime}</span>
              <button className="flex items-center gap-1.5 text-white hover:text-glow transition-colors font-medium">
                Read Publication <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Abstract visual on the right */}
          <div className="lg:col-span-4 border border-white/5 bg-white/[0.01] p-6 rounded-sm flex flex-col justify-between hidden lg:flex font-serif text-white/30 text-[8px] tracking-widest">
            <div className="flex justify-between uppercase">
              <span>ESTIMATED DYNAMICS</span>
              <span>FIGURE 1.2</span>
            </div>
            {/* Draw a mathematical curve or vector graph */}
            <svg viewBox="0 0 100 50" className="w-full h-auto stroke-white/20 fill-none stroke-[0.6] my-6">
              <path d="M5,45 Q20,5 50,25 T95,5" />
              <line x1="5" y1="45" x2="95" y2="45" />
              <line x1="5" y1="5" x2="5" y2="45" />
              <circle cx="50" cy="25" r="2" className="fill-white/40 stroke-none" />
              <line x1="50" y1="25" x2="50" y2="45" strokeDasharray="1,1" />
            </svg>
            <div className="uppercase">
              X-AXIS: CRAWLER SLIPRATIO<br />
              Y-AXIS: TRANSLATIONAL TORQUE
            </div>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="space-y-6">
          <h2 className="font-serif text-[13px] uppercase tracking-[0.25em] text-white/50 border-b border-white/5 pb-2">
            Recent Publications & Project Logs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                className="glass-panel p-8 flex flex-col justify-between min-h-[280px] border border-white/5 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[8px] font-serif uppercase tracking-widest text-white/40">
                    <span className="text-white/60 font-medium">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  
                  <h3 className="font-serif text-[14px] uppercase tracking-wider text-white leading-snug group-hover:text-glow transition-all">
                    {art.title}
                  </h3>
                  
                  <p className="text-[10px] uppercase tracking-wider leading-relaxed text-white/45 font-serif line-clamp-3">
                    {art.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/5 text-[8.5px] font-serif uppercase tracking-widest text-white/40">
                  <span>{art.readTime}</span>
                  <button className="flex items-center gap-1 text-white group-hover:text-glow transition-colors font-medium">
                    Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
