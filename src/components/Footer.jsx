import React from 'react';
import { Cpu, ArrowUp } from 'lucide-react';

export default function Footer({ onNavigate, onNavigateProject }) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProject = (projId) => {
    onNavigateProject(projId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white/50 pt-16 pb-8 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Vision */}
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="/logo.jpeg" 
                alt="Logo" 
                className="w-9 h-9 rounded-full object-cover border border-white/20 group-hover:border-white/80 transition-all duration-500" 
              />
              <span className="font-serif tracking-[0.25em] text-[15px] text-white uppercase font-light">
                Dreamers Innovator
              </span>
            </div>
            <p className="font-serif text-[12px] tracking-wider leading-relaxed text-white/40 max-w-[240px] uppercase">
              CREATING AUTONOMOUS EMBEDDED SYSTEMS AND ADVANCED ROBOTICS TO SHAPE NEXT-GEN ENGINEERING.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-[13px] text-white uppercase tracking-[0.25em]">Navigation</h4>
            <ul className="space-y-2 text-[12px] font-serif uppercase tracking-[0.15em] font-light">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors duration-300">Home</button>
              </li>
              <li>
                <button onClick={() => handleNav('media')} className="hover:text-white transition-colors duration-300">Media Showcase</button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors duration-300">Blog & Articles</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors duration-300">Contact</button>
              </li>
            </ul>
          </div>

          {/* Project Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-[13px] text-white uppercase tracking-[0.25em]">Our Projects</h4>
            <ul className="space-y-2 text-[12px] font-serif uppercase tracking-[0.15em] font-light">
              <li>
                <button onClick={() => handleProject('farming-rover')} className="hover:text-white transition-colors duration-300">Farming Rover</button>
              </li>
              <li>
                <button onClick={() => handleProject('joljan')} className="hover:text-white transition-colors duration-300">JolJan 1.0 & Mini</button>
              </li>
              <li>
                <button onClick={() => handleProject('hexacopter')} className="hover:text-white transition-colors duration-300">Multipurpose Hexacopter</button>
              </li>
            </ul>
          </div>

          {/* Social Links & Top Button */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-[13px] text-white uppercase tracking-[0.25em] mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/80 hover:bg-white/5 hover:text-white transition-all duration-300">
                  {/* GitHub Custom SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/80 hover:bg-white/5 hover:text-white transition-all duration-300">
                  {/* LinkedIn Custom SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/80 hover:bg-white/5 hover:text-white transition-all duration-300">
                  {/* Twitter / X Custom SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/80 hover:bg-white/5 hover:text-white transition-all duration-300">
                  {/* YouTube Custom SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                    <polygon points="10 15 15 12 10 9" />
                  </svg>
                </a>
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 font-serif text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 self-start mt-6 md:mt-0"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright info */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-serif uppercase tracking-[0.2em] text-white/35">
          <span>&copy; {new Date().getFullYear()} DREAMERS INNOVATOR – ATBKHS. ALL RIGHTS RESERVED.</span>
          <span>
            WEBSITE MADE BY:{' '}
            <a 
              href="https://www.facebook.com/mhs.shurov" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-glow transition-all"
            >
              MAHADI HASSAN SHUROV
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
