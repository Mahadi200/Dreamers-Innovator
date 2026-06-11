import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Shield, Award, Calendar, Layers, MapPin, Download, Mail, ArrowRight, Video } from 'lucide-react';

const PROJECT_DATA = {
  'farming-rover': {
    title: "Farming Rover",
    tagline: "Autonomous Agriculture Analysis Vehicle",
    visualClass: "bg-gradient-to-br from-neutral-900 via-neutral-950 to-stone-900 border-b border-white/5",
    intro: "A rugged terrain rover designed to automate soil chemical analysis, mapping agricultural acreage, and applying precision micro-fertilizers.",
    problem: "Traditional soil testing involves manual core sampling, shipping to centralized laboratories, and waiting weeks for reports. This delays vital crop nutrition decisions, leading to either overuse of fertilizer or under-nourishment.",
    solution: "The Farming Rover crawls fields autonomously using LIDAR and GPS. It deploys an automated hydraulic probe to measure soil NPK (Nitrogen, Phosphorus, Potassium) and pH values in-situ, mapping results to an IoT dashboard for immediate farm planning.",
    features: [
      { title: "Spectroscopic NPK Sensor", desc: "Measures nitrogen, phosphorus, and potassium levels in real-time without chemical reagents." },
      { title: "Smart Path Navigation", desc: "Integrates GPS waypoint guidance with 2D LIDAR obstacle avoidance for safe, unmonitored field operations." },
      { title: "Hybrid Power Management", desc: "Uses monocrystalline solar arrays to charge lithium-iron-phosphate (LiFePO4) power cells, enabling 8+ hours of daylight runtimes." },
      { title: "Precision Drip Dispenser", desc: "Features a stepper-motor-driven pump to inject precise nutrient micro-doses directly to deficient roots." }
    ],
    specs: {
      "System Processor": "STM32F407 Cortex-M4 (Real-time controls) + ESP32-WROOM-32E (Cloud IoT & telemetry)",
      "Locomotion System": "4x NEMA 23 Stepper Motors with 10:1 planetary gearboxes, high-grip rubber tracks",
      "Sensor Array": "Hydraulic NPK probe, pH sensor, DHT22 Temp/Humidity, RPLIDAR A1",
      "Telemetry Link": "LoRaWAN 915MHz + Wi-Fi mesh node network",
      "Chassis Material": "Anodized T6-6061 Aluminum & 3K Carbon Fiber plating",
      "Total Weight / Load": "18.5 kg / Max payload payload 10.0 kg"
    },
    components: [
      "STM32 microcontroller core",
      "Custom 12V hydraulic actuator",
      "Monocrystalline 50W solar panel",
      "RPLIDAR laser scanner unit",
      "LoRa telemetry transceiver",
      "NPK optical spectrometer module"
    ],
    achievements: [
      { title: "1st Place Winner", desc: "Awarded top engineering achievement at the Robo-Agri National Expo for automated soil mapping." },
      { title: "Research Publication", desc: "Featured in the International Journal of Agricultural Robotics on 'In-Situ Chemical Soil Estimation'." }
    ]
  },
  'joljan': {
    title: "JolJan 1.0 & Mini",
    tagline: "High-Stability Sub-Aquatic Sonar Probe",
    visualClass: "bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900 border-b border-white/5",
    intro: "A dual-shell autonomous submarine crafted for deep water quality profiling, underwater wreckage tracking, and sonar-based reservoir depth mapping.",
    problem: "Lakes, ports, and industrial reservoirs suffer from invisible pollutants, sedimentation, and structural collapses. Manual diving surveys are expensive, dangerous, and limited by poor underwater visibility.",
    solution: "JolJan uses a high-frequency sonar transducer to map underwater terrain irrespective of turbidity. Its balanced dual-hull chamber handles hydrostatic pressures down to 40 meters, telemetry-feeding real-time water data to the shore.",
    features: [
      { title: "High-Frequency Active Sonar", desc: "Maps sub-aquatic structures, sedimentation levels, and maps bottom contours in muddy water." },
      { title: "Dual-Hull Compression Tube", desc: "Outer acrylic shell for impact protection; inner structural metal frame to seal electronics against moisture." },
      { title: "Precision Vector Thrust", desc: "4x brushless thrusters arranged in a vector grid, offering 4-DOF underwater translation (pitch, roll, heave, yaw)." },
      { title: "Water Quality Loggers", desc: "Measures dissolved oxygen, thermal layers, turbidity coefficients, and electrical conductivity." }
    ],
    specs: {
      "Onboard Processor": "Raspberry Pi 4 Model B (Sonar processing) + Arduino Mega 2560 (Thruster vectoring)",
      "Propulsion System": "4x T200 Brushless Thrusters with ESC controllers",
      "Depth Rating": "Tested and rated for 30m depth (3.0 ATM pressure)",
      "Sensor Array": "Active sonar scanner, MS5837 pressure sensor, leak detection arrays, 1080p low-light camera",
      "Battery Module": "14.8V 10000mAh LiPo flight battery with safety fuses",
      "Chassis Material": "Acrylic pressure tube, CNC machined POM end caps, aluminum structural rods"
    },
    components: [
      "Raspberry Pi 4 computing block",
      "T200 marine thruster units",
      "CNC aluminum chassis endcaps",
      "Sonar transceiver card",
      "MS5837 pressure sensor",
      "Internal water leakage sensors"
    ],
    achievements: [
      { title: "Deepwater Log Certification", desc: "Successfully logged 120 continuous hours of autonomous depth mapping in Kaptai Lake." },
      { title: "Innovator of Year Award", desc: "Honored by the National Maritime Institute for developing low-cost sonar mapping alternatives." }
    ]
  },
  'hexacopter': {
    title: "Multipurpose Hexacopter",
    tagline: "Heavy-Lift Autonomous Flight System",
    visualClass: "bg-gradient-to-br from-neutral-900 via-stone-950 to-neutral-950 border-b border-white/5",
    intro: "A high-payload multi-rotor UAV designed to carry diagnostic cameras, emergency medical payloads, and perform remote structural mapping.",
    problem: "Deploying logistics and high-end sensors in disaster zones or industrial sites is limited by payload weights, battery life, and flight instability under heavy wind shear.",
    solution: "A carbon-fiber hexacopter with an advanced Pixhawk flight controller running autonomous navigation routines. It supports an 8 kg payload, stabilized by a custom 3-axis brushless gimbal.",
    features: [
      { title: "Heavy Thrust Platform", desc: "6x high-efficiency brushless motors driving 18-inch carbon fiber props for heavy lift stability." },
      { title: "Emergency Release Rig", desc: "Features a servo-actuated electromagnetic hook for remote payload drop-off in emergency zones." },
      { title: "Triple-Gimbal Stabilizer", desc: "Ensures vibration-free 4K thermal and optical footage during structural inspections." },
      { title: "RTK-GPS Navigation", desc: "Achieves centimeter-level localization precision for close-quarters building inspection." }
    ],
    specs: {
      "Flight Controller": "Pixhawk 6C Autopilot (Running PX4 Firmware) + Raspberry Pi 4 companion computer",
      "Motor / Propeller": "6x T-Motor 400KV brushless motors, 18-inch carbon fiber props",
      "Max Payload Weight": "Rated for 8.0 kg max payload; 12.5 kg total takeoff weight",
      "Telemetry Link": "900MHz digital datalink + 5.8GHz HD video downlink",
      "Battery system": "2x 22.2V 6S 16000mAh LiPo batteries in parallel",
      "Chassis Material": "Toray 3K carbon fiber tubes and CNC aluminum brackets"
    },
    components: [
      "Pixhawk 6C flight processor",
      "T-Motor brushless power core",
      "RTK GPS receiver module",
      "Carbon fiber folding frames",
      "Electromagnetic drop payload mechanism",
      "Thermal mapping imaging rig"
    ],
    achievements: [
      { title: "Disaster Drill Success", desc: "Successfully dropped 5kg medical packets to isolated mountain teams in simulated storm winds." },
      { title: "Outstanding Design Prize", desc: "Awarded by the Aeronautical Design League for structural stress optimization." }
    ]
  }
};

export default function ProjectLanding({ projectId, onNavigate, onNavigateProject }) {
  const data = PROJECT_DATA[projectId] || PROJECT_DATA['farming-rover'];
  const [activeTab, setActiveTab] = useState('specs'); // specs, components
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className={`${data.visualClass} relative min-h-[70vh] flex items-center px-6 md:px-12 py-20 overflow-hidden`}>
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/50 block">PROJECT PROFILE // DOCUMENTATION</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase text-glow leading-tight">{data.title}</h1>
            <p className="font-serif text-lg md:text-xl italic text-white/80 max-w-xl">"{data.tagline}"</p>
            <div className="w-16 h-[1px] bg-white/40" />
            <p className="text-white/60 text-xs md:text-sm leading-relaxed uppercase tracking-wider max-w-lg font-light">
              {data.intro}
            </p>
          </div>
          
          {/* Schematic visual container */}
          <div className="border border-white/10 p-8 rounded-sm glass-panel aspect-video flex flex-col justify-between hover:border-white/25 transition-all duration-500">
            <div className="flex justify-between items-center text-[8px] font-serif tracking-widest text-white/40 uppercase">
              <span>SYSTEM CAD DIAGRAM</span>
              <span className="animate-pulse">STATUS: ONLINE</span>
            </div>
            
            {/* Draw schematic vectors based on project */}
            <div className="my-8 flex justify-center opacity-70">
              {projectId === 'farming-rover' && (
                <svg viewBox="0 0 100 60" className="w-48 h-auto stroke-white fill-none stroke-[0.8]">
                  <rect x="20" y="20" width="60" height="25" rx="3" />
                  <circle cx="35" cy="48" r="8" />
                  <circle cx="65" cy="48" r="8" />
                  <line x1="50" y1="20" x2="50" y2="8" />
                  <circle cx="50" cy="8" r="2" />
                </svg>
              )}
              {projectId === 'joljan' && (
                <svg viewBox="0 0 100 60" className="w-48 h-auto stroke-white fill-none stroke-[0.8]">
                  <ellipse cx="50" cy="30" rx="35" ry="18" />
                  <line x1="30" y1="30" x2="70" y2="30" strokeDasharray="2,2" />
                  <path d="M15,30 L10,25 L10,35 Z" />
                  <circle cx="50" cy="18" r="3" />
                </svg>
              )}
              {projectId === 'hexacopter' && (
                <svg viewBox="0 0 100 60" className="w-48 h-auto stroke-white fill-none stroke-[0.8]">
                  <circle cx="50" cy="30" r="10" />
                  <line x1="15" y1="30" x2="85" y2="30" />
                  <line x1="32.5" y1="15" x2="67.5" y2="45" />
                  <line x1="32.5" y1="45" x2="67.5" y2="15" />
                  <circle cx="15" cy="30" r="3" />
                  <circle cx="85" cy="30" r="3" />
                  <circle cx="32.5" cy="15" r="3" />
                  <circle cx="67.5" cy="45" r="3" />
                  <circle cx="32.5" cy="45" r="3" />
                  <circle cx="67.5" cy="15" r="3" />
                </svg>
              )}
            </div>

            <div className="flex justify-between items-end">
              <div className="font-serif text-[7px] tracking-widest text-white/30 uppercase">
                MODEL: {projectId.toUpperCase()}_v1.0.4<br />
                SCALE: 1:15 // UNIT: MM
              </div>
              <button 
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-1.5 font-serif text-[8px] tracking-widest border border-white/20 px-3 py-1.5 rounded-sm hover:bg-white hover:text-black transition-all uppercase"
              >
                <Download className="w-2.5 h-2.5" />
                System Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW: PROBLEM & SOLUTION */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/10">
        <div className="space-y-4">
          <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-white/40">Challenge // 01</span>
          <h2 className="text-2xl font-serif tracking-widest uppercase text-white">Problem Statement</h2>
          <div className="w-8 h-[1px] bg-white/20" />
          <p className="text-white/60 font-light text-xs md:text-sm leading-relaxed uppercase tracking-wider font-serif">
            {data.problem}
          </p>
        </div>

        <div className="space-y-4 border-l border-white/10 pl-0 md:pl-12">
          <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-white/40">Resolution // 02</span>
          <h2 className="text-2xl font-serif tracking-widest uppercase text-white">Proposed Solution</h2>
          <div className="w-8 h-[1px] bg-white/20" />
          <p className="text-white/60 font-light text-xs md:text-sm leading-relaxed uppercase tracking-wider font-serif">
            {data.solution}
          </p>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12 border-b border-white/10">
        <div className="space-y-2">
          <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-white/40">Capabilities // 03</span>
          <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-white">System Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.features.map((feat, idx) => (
            <div key={idx} className="glass-panel p-8 flex flex-col justify-between h-48 border border-white/5 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center font-serif text-[10px] text-white/60">
                  {idx + 1}
                </div>
                <h3 className="font-serif text-[13px] tracking-widest uppercase text-white">{feat.title}</h3>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-white/45 font-serif leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL SPECIFICATIONS TABS */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex gap-8 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`font-serif text-[11px] uppercase tracking-[0.25em] pb-2 ${
              activeTab === 'specs' ? 'text-white border-b border-white' : 'text-white/40'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`font-serif text-[11px] uppercase tracking-[0.25em] pb-2 ${
              activeTab === 'components' ? 'text-white border-b border-white' : 'text-white/40'
            }`}
          >
            Hardware Components
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(data.specs).map(([key, val], idx) => (
              <div key={idx} className="flex flex-col md:flex-row justify-between py-4 border-b border-white/5 text-[10px] font-serif uppercase tracking-widest">
                <span className="text-white/40">{key}</span>
                <span className="text-white text-right font-light mt-1 md:mt-0">{val}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.components.map((comp, idx) => (
              <div key={idx} className="glass-panel-light p-6 rounded-sm border border-white/5 flex items-center gap-3">
                <Cpu className="w-4 h-4 text-white/40 shrink-0" />
                <span className="font-serif text-[10px] uppercase tracking-wider text-white/80">{comp}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. ACHIEVEMENTS & IMPACT */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-4">
          <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-white/40">Impact // 04</span>
          <h2 className="text-2xl font-serif tracking-widest uppercase text-white">Achievements & Impact</h2>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>

        <div className="md:col-span-8 space-y-8">
          {data.achievements.map((ach, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <Award className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-serif text-[13px] tracking-widest uppercase text-white">{ach.title}</h3>
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-serif leading-relaxed">
                  {ach.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-serif tracking-widest uppercase text-white">Interested in Project Deployment?</h2>
        <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-white/50 leading-relaxed max-w-xl mx-auto">
          Contact our development team for pilot programs, custom telemetry configurations, or structural drone deployment requests.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button 
            onClick={() => onNavigate('contact')}
            className="border border-white bg-white text-black px-6 py-3 font-serif text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            Contact Team
            <Mail className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={() => onNavigate('media')}
            className="border border-white/10 bg-white/5 text-white px-6 py-3 font-serif text-[10px] uppercase tracking-[0.2em] hover:border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
          >
            View Project Media
            <Video className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* System Profile Modal (Print View Mockup) */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-black border border-white/10 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute top-6 right-6 font-serif text-[10px] tracking-widest text-white/50 hover:text-white uppercase"
            >
              [ Close ]
            </button>

            {/* Print Area */}
            <div className="space-y-8 font-serif" id="print-area">
              <div className="border-b border-white/10 pb-6 text-center space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">OFFICIAL DATA PROFILE SHEET</span>
                <h2 className="text-2xl uppercase tracking-widest text-white">{data.title}</h2>
                <p className="text-[10px] uppercase tracking-widest text-white/55 italic">"System Configuration & Hardware Telemetry"</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-wider text-white border-b border-white/5 pb-1">1. Summary</h4>
                <p className="text-[10px] uppercase tracking-wider text-white/50 leading-relaxed font-light">{data.intro}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-wider text-white border-b border-white/5 pb-1">2. Technical Specifications</h4>
                <div className="space-y-2">
                  {Object.entries(data.specs).map(([key, val], idx) => (
                    <div key={idx} className="flex justify-between text-[9px] uppercase tracking-widest border-b border-white/5 pb-1.5">
                      <span className="text-white/40">{key}</span>
                      <span className="text-white font-light text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-wider text-white border-b border-white/5 pb-1">3. Hardware Component Matrix</h4>
                <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-wider text-white/60">
                  {data.components.map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white" />
                      {comp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-wider text-white border-b border-white/5 pb-1">4. Verification & Milestones</h4>
                <div className="space-y-2">
                  {data.achievements.map((ach, idx) => (
                    <div key={idx} className="text-[9px] uppercase tracking-wider">
                      <span className="text-white block font-medium">{ach.title}</span>
                      <span className="text-white/40 block leading-relaxed">{ach.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 text-center text-[7px] tracking-[0.3em] text-white/30 uppercase">
                DREAMERS INNOVATOR LABS // SECURITY CLASSIFICATION: PUBLIC
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
              <button 
                onClick={handlePrint}
                className="border border-white bg-white text-black px-4 py-2 font-serif text-[9px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-all flex items-center gap-1.5"
              >
                Print Profile
              </button>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="border border-white/10 bg-white/5 text-white px-4 py-2 font-serif text-[9px] uppercase tracking-[0.2em] hover:border-white/40 transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
