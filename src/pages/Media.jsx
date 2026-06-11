import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Image as ImageIcon, X, Play, Eye, Maximize2 } from 'lucide-react';

const MEDIA_ITEMS = [
  { 
    id: 1, 
    type: 'video', 
    category: 'robotics', 
    title: 'Farming Rover Soil Probe Test', 
    desc: 'Telemetry recording of hydraulic probe deployment at Agribusiness Sector 4.',
    details: 'Resolution: 4K UHD // Frame Rate: 60 FPS // Telemetry: Embedded',
    image: '/rover.jpeg'
  },
  { 
    id: 2, 
    type: 'image', 
    category: 'competitions', 
    title: 'National Robo-Agri Grand Prize', 
    desc: 'The Dreamers Innovator team accepts the 1st place award at the National Expo.',
    details: 'Camera: Hasselblad X2D // ISO: 200 // Lens: 45mm f/4.0',
    image: '/dob logo.jpeg'
  },
  { 
    id: 3, 
    type: 'video', 
    category: 'drones', 
    title: 'Hexacopter Heavy Cargo Flight', 
    desc: 'Stabilization flight trials carrying an 8.0 kg active medical load.',
    details: 'Sensor Feed: Dual Gimbal Optical + Thermal // Speed: 14.5 KT',
    image: '/drone.jpeg'
  },
  { 
    id: 4, 
    type: 'image', 
    category: 'robotics', 
    title: 'Farming Rover CAD Blueprint', 
    desc: 'Full assembly computer-aided design model of the carbon fiber frame layout.',
    details: 'Software: Autodesk Fusion 360 // Mesh Density: High',
    image: '/rover.jpeg'
  },
  { 
    id: 5, 
    type: 'video', 
    category: 'robotics', 
    title: 'JolJan 1.0 Sonar Calibration', 
    desc: 'Acoustic sonar transducer testing in Kaptai reservoir at 12m depth.',
    details: 'Acoustic Frequency: 200 kHz // Depth: 12.4m // Sonar: Active',
    image: '/jolojan mini.jpeg'
  },
  { 
    id: 6, 
    type: 'image', 
    category: 'drones', 
    title: 'Hexacopter Wind Tunnel Test', 
    desc: 'Aero-elastic stress test of the carbon fiber folding arms at 25m/s wind speed.',
    details: 'Wind Tunnel Rig // Force Vectors: Tri-Axial // Status: Completed',
    image: '/drone.jpeg'
  },
  { 
    id: 7, 
    type: 'image', 
    category: 'competitions', 
    title: 'Submarine Robotics Cup Demo', 
    desc: 'Exhibiting the JolJan Mini propulsion drive assembly to international inspectors.',
    details: 'Expo Event: SRC-26 // Location: Sector Navy Terminal',
    image: '/jolojan mini.jpeg'
  }
];

// High-tech photo thumbnail generator with HUD layout
function MediaThumbnail({ item }) {
  const { id, type, title, image } = item;
  return (
    <div className="relative w-full aspect-video bg-neutral-950 border border-white/5 overflow-hidden flex items-center justify-center group-hover:border-white/20 transition-colors duration-500">
      {/* Background photo */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
      />

      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Target Focus brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-white/60 transition-colors" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-white/60 transition-colors" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />

      {/* Overlay indicator */}
      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[9px] font-serif tracking-widest text-white uppercase bg-black/60 px-2.5 py-1 rounded-sm border border-white/10">
        {type === 'video' ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
        <span>{type} // DI_{id}</span>
      </div>

      {/* Center play or view icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
        <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-black/40 text-white hover:scale-110 hover:border-white transition-all duration-300">
          {type === 'video' ? <Play className="w-4 h-4 fill-white ml-0.5" /> : <Eye className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}

export default function Media() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeItem, setActiveItem] = useState(null); // Selected item for lightbox

  const filters = ['ALL', 'ROBOTICS', 'DRONES', 'COMPETITIONS'];

  const filteredItems = activeFilter === 'ALL'
    ? MEDIA_ITEMS
    : MEDIA_ITEMS.filter(item => item.category === activeFilter.toLowerCase());

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/50 block">VISUAL RECORDS</span>
          <h1 className="text-4xl md:text-5xl font-serif text-glow uppercase tracking-widest">Media Showcase</h1>
          <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-white/45 max-w-xl">
            Archived flight videos, chemical scanning runs, underwater telemetry maps, and award moments from our robotics laboratories.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-3 border-b border-white/5 pb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-serif text-[10px] uppercase tracking-[0.2em] px-4 py-2 border rounded-sm transition-all duration-300 ${
                activeFilter === filter
                  ? 'border-white bg-white text-black font-normal'
                  : 'border-white/10 bg-transparent text-white/55 hover:border-white/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer border border-white/5 rounded-sm p-3 bg-neutral-950 flex flex-col justify-between hover:border-white/15 transition-all duration-500"
            >
              <MediaThumbnail item={item} />

              <div className="pt-4 pb-2 space-y-1">
                <span className="font-serif text-[7.5px] uppercase tracking-[0.25em] text-white/35">
                  Category: {item.category}
                </span>
                <h3 className="font-serif text-[12px] uppercase tracking-wider text-white group-hover:text-glow transition-all">
                  {item.title}
                </h3>
                <p className="text-[10px] uppercase tracking-wider leading-relaxed text-white/45 font-serif line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setActiveItem(null)} />

            <div className="relative w-full max-w-4xl bg-black border border-white/15 p-6 md:p-8 flex flex-col md:flex-row gap-8 z-10">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 font-serif text-[10px] uppercase tracking-widest text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Mock Media Screen */}
              <div className="flex-1 aspect-video bg-neutral-950 border border-white/10 relative flex flex-col justify-between overflow-hidden">
                {/* Photo background */}
                <img 
                  src={activeItem.image} 
                  alt={activeItem.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />

                {/* Background blueprint elements */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div className="flex justify-between items-center text-[10px] tracking-widest text-white/90 bg-black/60 px-3 py-2 uppercase z-10">
                  <span>CAMERA STREAM DI_{activeItem.id}</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />LIVE DECODING</span>
                </div>

                {/* Play button overlay for videos in lightbox */}
                {activeItem.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center bg-black/45 text-white hover:scale-110 hover:border-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Playback status bar */}
                <div className="flex justify-between items-center text-[10px] tracking-widest text-white/80 bg-black/60 px-3 py-2 uppercase z-10">
                  <span>TIMECODE // 00:14:52:08</span>
                  <span>BITRATE // 18.2 MB/S</span>
                </div>
              </div>

              {/* Right Side: Media Meta Data */}
              <div className="w-full md:w-80 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="font-serif text-[8px] uppercase tracking-[0.3em] text-white/40 block">
                    Record Info // {activeItem.category}
                  </span>
                  <h2 className="text-xl font-serif uppercase tracking-widest text-white leading-snug">
                    {activeItem.title}
                  </h2>
                  <div className="w-8 h-[1px] bg-white/20" />
                  <p className="text-[10px] uppercase tracking-wider leading-relaxed text-white/50 font-serif">
                    {activeItem.desc}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <span className="font-serif text-[8.5px] uppercase tracking-wider text-white/35 block">Metadata Specs</span>
                  <p className="font-serif text-[8px] uppercase tracking-widest leading-relaxed text-white/70">
                    {activeItem.details}
                  </p>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="w-full border border-white/20 py-2.5 font-serif text-[9px] uppercase tracking-[0.2em] text-white hover:border-white transition-colors uppercase"
                >
                  Return to Showcase
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
