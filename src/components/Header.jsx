import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cpu } from 'lucide-react';

export default function Header({ activePage, activeProject, onNavigate, onNavigateProject }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    { id: 'farming-rover', name: 'Farming Rover' },
    { id: 'joljan', name: 'JolJan 1.0 & Mini' },
    { id: 'hexacopter', name: 'Multipurpose Hexacopter' }
  ];

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleProjectClick = (projectId) => {
    onNavigateProject(projectId);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/60 border-b border-white/5 backdrop-blur-md py-4' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/logo.jpeg" 
            alt="Logo" 
            className="w-9 h-9 rounded-full object-cover border border-white/20 group-hover:border-white/80 transition-all duration-500" 
          />
          <span className="font-serif tracking-[0.25em] text-[15px] font-light text-white uppercase group-hover:text-glow transition-all duration-500">
            Dreamers Innovator
          </span>
        </div>

        {/* Right Side: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className={`font-serif text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white ${
              activePage === 'home' ? 'text-white border-b border-white/40 pb-1' : 'text-white/50'
            }`}
          >
            Home
          </button>

          {/* About Projects Dropdown Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              className={`font-serif text-[13px] uppercase tracking-[0.2em] flex items-center gap-1 transition-colors duration-300 hover:text-white ${
                activePage === 'project' ? 'text-white' : 'text-white/50'
              }`}
            >
              About Projects
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Options */}
            <div className={`absolute left-0 mt-2 w-56 rounded-md glass-panel shadow-2xl transition-all duration-300 origin-top-left ${
              isDropdownOpen 
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <div className="py-2 px-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleProjectClick(proj.id)}
                    className={`w-full text-left font-serif text-[12px] uppercase tracking-[0.15em] px-4 py-3 rounded-sm transition-colors duration-300 hover:bg-white/5 hover:text-white ${
                      activePage === 'project' && activeProject === proj.id 
                        ? 'text-white bg-white/5 font-normal' 
                        : 'text-white/65'
                    }`}
                  >
                    {proj.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => handleNavClick('media')}
            className={`font-serif text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white ${
              activePage === 'media' ? 'text-white border-b border-white/40 pb-1' : 'text-white/50'
            }`}
          >
            Media
          </button>
          
          <button 
            onClick={() => handleNavClick('blog')}
            className={`font-serif text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white ${
              activePage === 'blog' ? 'text-white border-b border-white/40 pb-1' : 'text-white/50'
            }`}
          >
            Blog
          </button>
          
          <button 
            onClick={() => handleNavClick('contact')}
            className={`font-serif text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white ${
              activePage === 'contact' ? 'text-white border-b border-white/40 pb-1' : 'text-white/50'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Hamburguer Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors duration-300 focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-4/5 bg-black border-l border-white/10 z-50 flex flex-col justify-center p-8 transition-transform duration-500 ${
        isMobileMenuOpen ? 'translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'translate-x-full'
      }`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white/60 hover:text-white"
        >
          <X className="w-7 h-7" />
        </button>

        <nav className="flex flex-col gap-6 text-left">
          <button 
            onClick={() => handleNavClick('home')}
            className={`font-serif text-[15px] uppercase tracking-[0.25em] py-2 text-left ${
              activePage === 'home' ? 'text-white font-normal' : 'text-white/50'
            }`}
          >
            Home
          </button>
          
          <div className="border-t border-b border-white/5 py-3">
            <span className="font-serif text-[12px] text-white/30 uppercase tracking-[0.2em] block mb-2 px-2">Projects</span>
            <div className="flex flex-col gap-3 pl-4">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => handleProjectClick(proj.id)}
                  className={`font-serif text-[13px] uppercase tracking-[0.2em] py-1 text-left ${
                    activePage === 'project' && activeProject === proj.id ? 'text-white font-normal' : 'text-white/50'
                  }`}
                >
                  {proj.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => handleNavClick('media')}
            className={`font-serif text-[15px] uppercase tracking-[0.25em] py-2 text-left ${
              activePage === 'media' ? 'text-white font-normal' : 'text-white/50'
            }`}
          >
            Media
          </button>
          
          <button 
            onClick={() => handleNavClick('blog')}
            className={`font-serif text-[15px] uppercase tracking-[0.25em] py-2 text-left ${
              activePage === 'blog' ? 'text-white font-normal' : 'text-white/50'
            }`}
          >
            Blog
          </button>
          
          <button 
            onClick={() => handleNavClick('contact')}
            className={`font-serif text-[15px] uppercase tracking-[0.25em] py-2 text-left ${
              activePage === 'contact' ? 'text-white font-normal' : 'text-white/50'
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
      
      {/* Background overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        />
      )}
    </header>
  );
}
