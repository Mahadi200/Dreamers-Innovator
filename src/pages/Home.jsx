import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Award, Eye, Compass, Shield, Layers, Command, HardDrive, Wifi, Cpu, Navigation, ArrowLeft } from 'lucide-react';

// Project 1 Visualizer: Farming Rover Telemetry
function RoverVisual() {
  const [scanPos, setScanPos] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev > 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Glowing blueprint scanline */}
      <div 
        className="absolute left-0 w-full h-[2px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-100" 
        style={{ top: `${scanPos}%` }}
      />
      
      {/* Wireframe Terrain and Rover Vector Graphic */}
      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center select-none opacity-40">
        <svg viewBox="0 0 400 300" className="w-full h-auto stroke-white fill-none stroke-[0.7] tracking-widest">
          {/* Rover wireframe mockup */}
          <rect x="130" y="140" width="140" height="60" rx="10" />
          <circle cx="160" cy="210" r="25" />
          <circle cx="240" cy="210" r="25" />
          <line x1="200" y1="140" x2="200" y2="80" />
          <path d="M185 80 L215 80 L200 65 Z" />
          {/* Agricultural scanning beams */}
          <line x1="200" y1="140" x2="100" y2="260" strokeDasharray="4,4" />
          <line x1="200" y1="140" x2="300" y2="260" strokeDasharray="4,4" />
          <path d="M 50,260 Q 120,240 200,265 T 350,260" />
          <text x="10" y="30" className="fill-white font-serif text-[8px] tracking-[0.2em]">ROVER TELEMETRY V0.4 // SECTOR: AGRI-09</text>
          <text x="10" y="45" className="fill-white font-serif text-[8px] tracking-[0.2em]">GPS: 23.8103° N, 90.4125° E</text>
        </svg>
      </div>

      {/* Floating high-tech side panels */}
      <div className="absolute right-8 top-24 border border-white/10 p-4 font-serif text-[8px] tracking-widest text-white/50 space-y-2 uppercase hidden lg:block bg-black/40 backdrop-blur-sm">
        <div className="text-white border-b border-white/20 pb-1 mb-2 font-normal">Terrain Analysis</div>
        <div>Moisture: 42.4%</div>
        <div>pH Level: 6.8 (Optimal)</div>
        <div>NPK levels: STABLE</div>
        <div>Path Efficiency: 98.2%</div>
      </div>
    </div>
  );
}

// Project 2 Visualizer: JolJan Sonar Tracker
function JolJanVisual() {
  const [radarAngle, setRadarAngle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Concentric grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Sonar circles */}
      <div className="absolute rounded-full border border-white/5 w-60 h-60" />
      <div className="absolute rounded-full border border-white/10 w-96 h-96" />
      <div className="absolute rounded-full border border-white/5 w-[500px] h-[500px]" />

      {/* Sonar scan arm */}
      <div 
        className="absolute top-1/2 left-1/2 w-80 h-1 bg-gradient-to-r from-white/30 to-transparent origin-left transition-all duration-75"
        style={{ transform: `translate(-50%, -50%) rotate(${radarAngle}deg) translate(50%, 0)` }}
      />

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center select-none opacity-40">
        <svg viewBox="0 0 300 300" className="w-full h-auto stroke-white fill-none stroke-[0.8]">
          <circle cx="150" cy="150" r="100" strokeDasharray="3,3" />
          <circle cx="150" cy="150" r="60" />
          <circle cx="150" cy="150" r="20" />
          <line x1="150" y1="50" x2="150" y2="250" strokeDasharray="10,10" />
          <line x1="50" y1="150" x2="250" y2="150" strokeDasharray="10,10" />
          
          {/* Submarine mock shape */}
          <path d="M130,140 L170,140 L180,150 L170,160 L130,160 L120,150 Z" />
          
          {/* Sonar target blips */}
          <circle cx="100" cy="110" r="4" className="fill-white animate-pulse" />
          <circle cx="210" cy="190" r="3" className="fill-white/70" />
          <text x="10" y="20" className="fill-white font-serif text-[7px] tracking-[0.2em]">ACOUSTIC SONAR // JOLJAN 1.0</text>
          <text x="10" y="32" className="fill-white font-serif text-[7px] tracking-[0.2em]">DEPTH: -14.2 METERS</text>
        </svg>
      </div>

      <div className="absolute left-8 bottom-24 border border-white/10 p-4 font-serif text-[8px] tracking-widest text-white/50 space-y-2 uppercase hidden lg:block bg-black/40 backdrop-blur-sm">
        <div className="text-white border-b border-white/20 pb-1 mb-2 font-normal">Sub-Aquatic Status</div>
        <div>Temp: 18.2 °C</div>
        <div>Pressure: 2.4 ATM</div>
        <div>Turbidity: Low</div>
        <div>Battery: 84.5%</div>
      </div>
    </div>
  );
}

// Project 3 Visualizer: Flight HUD (Hexacopter)
function CopterVisual() {
  const [pitch, setPitch] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight flight variance
      setPitch(Math.sin(Date.now() / 1500) * 8);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Crosshairs HUD overlay */}
      <div className="absolute rounded-full border border-white/10 w-72 h-72 border-double" />
      <div className="absolute w-12 h-[1px] bg-white/40 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      <div className="absolute h-12 w-[1px] bg-white/40 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />

      {/* Flight pitch ladder */}
      <div 
        className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center select-none opacity-40 transition-transform duration-100"
        style={{ transform: `rotate(${pitch}deg)` }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-auto stroke-white fill-none stroke-[0.8]">
          {/* Pitch markings */}
          <path d="M110,120 L130,120 L130,125" />
          <path d="M190,120 L170,120 L170,125" />
          <text x="140" y="118" className="fill-white font-serif text-[6px] tracking-wider text-center">10</text>
          
          <path d="M100,150 L120,150" />
          <path d="M200,150 L180,150" />
          
          <path d="M110,180 L130,180 L130,175" />
          <path d="M190,180 L170,180 L170,175" />
          <text x="139" y="184" className="fill-white font-serif text-[6px] tracking-wider text-center">-10</text>

          {/* Hexacopter silhouette */}
          <circle cx="150" cy="150" r="10" />
          {/* 6 rotors */}
          {Array.from({ length: 6 }).map((_, idx) => {
            const angle = (idx * 360) / 6;
            const rad = (angle * Math.PI) / 180;
            const rx = 150 + 45 * Math.cos(rad);
            const ry = 150 + 45 * Math.sin(rad);
            return (
              <g key={idx}>
                <line x1="150" y1="150" x2={rx} y2={ry} />
                <ellipse cx={rx} cy={ry} rx="12" ry="4" strokeDasharray="2,2" />
              </g>
            );
          })}
          
          <text x="10" y="25" className="fill-white font-serif text-[7px] tracking-[0.2em]">FLIGHT PROTOCOL // HEXA-COPTER</text>
          <text x="10" y="37" className="fill-white font-serif text-[7px] tracking-[0.2em]">ALTITUDE: 120.4 FT // GS: 14.5 KT</text>
        </svg>
      </div>

      <div className="absolute right-8 bottom-24 border border-white/10 p-4 font-serif text-[8px] tracking-widest text-white/50 space-y-2 uppercase hidden lg:block bg-black/40 backdrop-blur-sm">
        <div className="text-white border-b border-white/20 pb-1 mb-2 font-normal">Vector Control</div>
        <div>Pitch: {pitch.toFixed(1)}°</div>
        <div>Roll: 1.2°</div>
        <div>Wind: 4.8 KT NW</div>
        <div>Status: AUTO-HOVER</div>
      </div>
    </div>
  );
}

export default function Home({ onNavigate, onNavigateProject }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'farming-rover',
      title: 'Farming Rover',
      tagline: 'Autonomous Agribusiness Sensor Vehicle.',
      description: 'Equipped with soil analyzer kits, NPK chemical sensors, smart pathway planning, and multispectral vision for precision agriculture.',
      visual: <RoverVisual />
    },
    {
      id: 'joljan',
      title: 'JolJan 1.0 & Mini',
      tagline: 'Deep Diving Sub-Aquatic Explorer.',
      description: 'Built for water turbidity analysis, pressure logging, underwater videography, and autonomous sonar mapping in high-risk zones.',
      visual: <JolJanVisual />
    },
    {
      id: 'hexacopter',
      title: 'Multipurpose Hexacopter',
      tagline: 'Heavy Lift Autonomous Drone System.',
      description: 'Featuring 6-rotor brushless thrust vectors, dual-axis camera gimbals, smart safety landing modules, and emergency medical cargo drops.',
      visual: <CopterVisual />
    }
  ];

  // Auto-carousel transition every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full bg-black min-h-screen">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-screen w-full select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Visualizer Background */}
            {slides[currentSlide].visual}

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-serif uppercase tracking-[0.4em] text-[10px] text-white/50"
                >
                  Featured Project // 0{currentSlide + 1}
                </motion.div>
                
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-[0.1em] leading-none text-glow uppercase"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-lg md:text-xl font-light text-white/80 max-w-xl italic font-serif leading-relaxed"
                >
                  "{slides[currentSlide].tagline}"
                </motion.p>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.5 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-xs md:text-sm font-light text-white/60 max-w-2xl leading-relaxed uppercase tracking-wider hidden md:block"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex gap-4 pt-4"
                >
                  <button 
                    onClick={() => onNavigateProject(slides[currentSlide].id)}
                    className="group border border-white/80 bg-white text-black px-6 py-3 font-serif text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    Explore Project
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => onNavigate('media')}
                    className="border border-white/10 bg-white/5 backdrop-blur-sm text-white px-6 py-3 font-serif text-[10px] uppercase tracking-[0.2em] hover:border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    Watch Media
                    <Play className="w-3 h-3 text-white fill-white" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="absolute right-6 md:right-16 bottom-8 flex items-center gap-6 z-20">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-[2px] transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all text-white"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. INFORMATION SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        
        {/* About Dreamers Innovator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-[12px] uppercase tracking-[0.3em] text-white/45">Philosophy // 01</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-widest uppercase">About Dreamers Innovator</h2>
            <p className="font-serif text-[12px] uppercase tracking-widest leading-relaxed text-white/40 font-light">
              Dreamers Innovator is a proud sister concern of <strong className="text-white border-b border-white/20 pb-0.5">Dreams of Bangladesh</strong>, dedicated to pioneering robotics research and advanced mechanical engineering.
            </p>
            <div className="w-12 h-[1px] bg-white/40" />
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-sm space-y-3 hover:border-white/25 transition-colors duration-500">
              <Compass className="w-6 h-6 text-white/80 mb-2" />
              <h3 className="font-serif text-[15px] tracking-widest text-white uppercase">Vision</h3>
              <p className="text-[14px] uppercase leading-relaxed text-white/45 font-light font-serif">
                To spearhead engineering boundaries, designing autonomous robotics and intelligent cyber-physical systems that integrate seamlessly into research, heavy industry, and agriculture.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-sm space-y-3 hover:border-white/25 transition-colors duration-500">
              <Eye className="w-6 h-6 text-white/80 mb-2" />
              <h3 className="font-serif text-[15px] tracking-widest text-white uppercase">Mission</h3>
              <p className="text-[14px] uppercase leading-relaxed text-white/45 font-light font-serif">
                To build, iterate, and field-test robust aerial, sub-aquatic, and terrain vehicles. We resolve core environmental and mechanical problems through embedded telemetry, IoT, and custom payloads.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-sm space-y-3 md:col-span-2 hover:border-white/25 transition-colors duration-500">
              <Shield className="w-6 h-6 text-white/80 mb-2" />
              <h3 className="font-serif text-[15px] tracking-widest text-white uppercase">Innovation Goals</h3>
              <p className="text-[14px] uppercase leading-relaxed text-white/45 font-light font-serif">
                Pioneering high-precision agricultural analysis systems, modular deepwater probes, and structural UAV configurations. We optimize structural efficiency, code robustness, and sensor calibration to exceed international standards.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/45">Milestones // 02</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-widest uppercase">Key Achievements</h2>
            <div className="w-12 h-[1px] bg-white/40" />
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/15 p-6 space-y-3 bg-white/[0.01]">
              <Award className="w-5 h-5 text-white/80" />
              <div className="text-2xl font-serif tracking-widest text-white font-light">1ST PLACE</div>
              <div className="font-serif text-[10px] uppercase tracking-wider text-white/70">Robo-Agri Challenge</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-serif leading-relaxed">
                Awarded for Farming Rover's automated soil analysis algorithm and chemical injection mechanical assembly.
              </p>
            </div>
            
            <div className="border border-white/15 p-6 space-y-3 bg-white/[0.01]">
              <Award className="w-5 h-5 text-white/80" />
              <div className="text-2xl font-serif tracking-widest text-white font-light">FINALIST</div>
              <div className="font-serif text-[10px] uppercase tracking-wider text-white/70">Sub-Marine Robotics Cup</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-serif leading-relaxed">
                JolJan 1.0 logged 2+ hours of autonomous deep-pool operation under variable hydrostatic pressures.
              </p>
            </div>
            
            <div className="border border-white/15 p-6 space-y-3 bg-white/[0.01]">
              <Award className="w-5 h-5 text-white/80" />
              <div className="text-2xl font-serif tracking-widest text-white font-light">INVENTOR</div>
              <div className="font-serif text-[10px] uppercase tracking-wider text-white/70">UAV Logistics Summit</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-serif leading-relaxed">
                Hexacopter demonstrated 8kg cargo payload capacity and smart autonomous obstacle bypass.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/45">Tech Stack // 03</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-widest uppercase">Technologies Used</h2>
            <div className="w-12 h-[1px] bg-white/40" />
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: <Command className="w-5 h-5" />, title: "Robotics", desc: "Kinematics & Microcontrollers" },
              { icon: <Wifi className="w-5 h-5" />, title: "IoT Hub", desc: "MQTT Telemetry & Realtime Dashboard" },
              { icon: <Cpu className="w-5 h-5" />, title: "AI Vision", desc: "YOLO Object Detection & Mapping" },
              { icon: <HardDrive className="w-5 h-5" />, title: "Embedded", desc: "C++, RTOS, STM32 & ESP32" },
              { icon: <Navigation className="w-5 h-5" />, title: "Drones", desc: "ArduPilot & Hexacopter Dynamics" },
              { icon: <Layers className="w-5 h-5" />, title: "Autonomous", desc: "LIDAR Integration & SLAM Maps" }
            ].map((tech, idx) => (
              <div key={idx} className="glass-panel-light p-6 flex flex-col justify-between h-40 hover:bg-white/5 hover:border-white/20 transition-all duration-300">
                <div className="text-white/80">{tech.icon}</div>
                <div>
                  <h4 className="font-serif text-[12px] text-white uppercase tracking-wider">{tech.title}</h4>
                  <p className="text-[9px] uppercase tracking-wider text-white/35 font-serif mt-1">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
