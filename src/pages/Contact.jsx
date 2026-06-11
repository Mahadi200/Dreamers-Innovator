import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Cpu, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email format is invalid";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Simulate form transmission
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/50 block">COMMUNICATION LINK</span>
          <h1 className="text-4xl md:text-5xl font-serif text-glow uppercase tracking-widest">Contact Team</h1>
          <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-white/45 max-w-xl">
            Initiate communication for pilot agreements, custom designs, telemetry code reviews, or recruitment inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info & Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel p-6 border border-white/5 space-y-2 rounded-sm">
                <Mail className="w-4 h-4 text-white/60" />
                <h4 className="font-serif text-[12px] text-white uppercase tracking-widest">Email</h4>
                <a href="mailto:contact@atbkhs.labs" className="font-serif text-[11px] uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                  contact@atbkhs.labs
                </a>
              </div>

              <div className="glass-panel p-6 border border-white/5 space-y-2 rounded-sm">
                <Phone className="w-4 h-4 text-white/60" />
                <h4 className="font-serif text-[12px] text-white uppercase tracking-widest">Phone Link</h4>
                <a href="tel:+8801746342152" className="font-serif text-[11px] uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                  +880 1746 342152
                </a>
              </div>

              <div className="glass-panel p-6 border border-white/5 space-y-2 rounded-sm">
                <MapPin className="w-4 h-4 text-white/60" />
                <h4 className="font-serif text-[12px] text-white uppercase tracking-widest">Coordinates</h4>
                <span className="font-serif text-[11px] uppercase tracking-wider text-white/50">
                  23.8103° N, 90.4125° E
                </span>
              </div>
            </div>

            {/* Leadership & Administration Contacts */}
            <div className="space-y-6">
              
              {/* Sister Concern Banner Card */}
              <div className="border border-white/10 rounded-sm overflow-hidden bg-neutral-950 p-6 flex flex-col sm:flex-row items-center gap-6 hover:border-white/20 transition-all duration-300">
                <img 
                  src="/dob logo.jpeg" 
                  alt="Dreams of Bangladesh Logo" 
                  className="w-20 h-20 rounded-md object-cover border border-white/15 shrink-0" 
                />
                <div className="space-y-1.5">
                  <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-white/40 block">Affiliation Protocol</span>
                  <h4 className="font-serif text-[15px] text-white uppercase tracking-wider">Sister Concern of Dreams of Bangladesh</h4>
                  <p className="font-serif text-[12px] uppercase tracking-widest text-white/50 leading-relaxed font-light">
                    Dreamers Innovator operates as a sister concern of <strong className="text-white border-b border-white/20 pb-0.5">Dreams of Bangladesh</strong>, collaborating on national cyber-physical frameworks, heavy UAV automation, and precision agricultural telemetry.
                  </p>
                </div>
              </div>

              <h3 className="font-serif text-[15px] uppercase tracking-[0.25em] text-white/50 border-b border-white/5 pb-2">Leadership & Direct Contacts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Mahadir Islam */}
                <div className="glass-panel p-6 border border-white/5 rounded-sm space-y-3 hover:border-white/20 transition-all duration-300">
                  <div>
                    <h4 className="font-serif text-[16px] text-white uppercase tracking-wider">Mahadir Islam</h4>
                    <span className="font-serif text-[11px] uppercase tracking-widest text-white/40 block">Founder & CEO</span>
                    <span className="font-serif text-[10px] uppercase tracking-widest text-white/30 block">Dreams of Bangladesh</span>
                  </div>
                  <div className="space-y-2 font-serif text-[12px] uppercase tracking-wider text-white/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-white/40" />
                      <a href="tel:01746342152" className="hover:text-white transition-all">01746342152</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <a href="mailto:mahadirislam0@gmail.com" className="hover:text-white transition-all lowercase">mahadirislam0@gmail.com</a>
                    </div>
                  </div>
                </div>

                {/* Mahadi Hassan Shurov */}
                <div className="glass-panel p-6 border border-white/5 rounded-sm space-y-3 hover:border-white/20 transition-all duration-300">
                  <div>
                    <h4 className="font-serif text-[16px] text-white uppercase tracking-wider">Mahadi Hassan Shurov</h4>
                    <span className="font-serif text-[11px] uppercase tracking-widest text-white/40 block">Chief Info & Financial Officer</span>
                    <span className="font-serif text-[10px] uppercase tracking-widest text-white/30 block">Dreams of Bangladesh</span>
                  </div>
                  <div className="space-y-2 font-serif text-[12px] uppercase tracking-wider text-white/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-white/40" />
                      <a href="tel:01754002201" className="hover:text-white transition-all">01754002201</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <a href="mailto:mahadihassn100life@gmail.com" className="hover:text-white transition-all lowercase">mahadihassn100life@gmail.com</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-8 border border-white/10 rounded-sm">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-white/80 animate-bounce" />
                  <h3 className="font-serif text-[16px] uppercase tracking-[0.2em] text-white">Transmission Successful</h3>
                  <p className="font-serif text-[10px] uppercase tracking-[0.15em] text-white/45 max-w-sm leading-relaxed">
                    Your transmission has been packeted and routed to the ATBKHS labs team. We will respond on your registered frequency.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="border border-white/20 px-6 py-2 font-serif text-[9px] uppercase tracking-widest hover:border-white transition-colors text-white"
                  >
                    Send Another Packet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-serif text-[9px] uppercase tracking-[0.2em] text-white/50 block">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-950' : 'border-white/10'} hover:border-white/20 focus:border-white focus:outline-none px-4 py-3 text-xs font-serif tracking-widest text-white transition-colors`}
                      />
                      {errors.name && <span className="text-red-500 font-serif text-[8px] uppercase tracking-wider block">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="font-serif text-[9px] uppercase tracking-[0.2em] text-white/50 block">Your Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-950' : 'border-white/10'} hover:border-white/20 focus:border-white focus:outline-none px-4 py-3 text-xs font-serif tracking-widest text-white transition-colors`}
                      />
                      {errors.email && <span className="text-red-500 font-serif text-[8px] uppercase tracking-wider block">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-serif text-[9px] uppercase tracking-[0.2em] text-white/50 block">Subject Protocol</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.subject ? 'border-red-950' : 'border-white/10'} hover:border-white/20 focus:border-white focus:outline-none px-4 py-3 text-xs font-serif tracking-widest text-white transition-colors`}
                    />
                    {errors.subject && <span className="text-red-500 font-serif text-[8px] uppercase tracking-wider block">{errors.subject}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="font-serif text-[9px] uppercase tracking-[0.2em] text-white/50 block">Message Content</label>
                    <textarea 
                      rows="5"
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.message ? 'border-red-950' : 'border-white/10'} hover:border-white/20 focus:border-white focus:outline-none px-4 py-3 text-xs font-serif tracking-widest text-white transition-colors resize-none`}
                    />
                    {errors.message && <span className="text-red-500 font-serif text-[8px] uppercase tracking-wider block">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-white text-black font-serif text-[10px] uppercase tracking-[0.25em] py-3.5 hover:bg-transparent hover:text-white border border-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send Telemetry Packet
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Custom Vector Map */}
          <div className="lg:col-span-5 h-[480px] border border-white/10 rounded-sm glass-panel p-6 flex flex-col justify-between overflow-hidden relative">
            
            {/* Holographic GPS coordinates radar screen */}
            <div className="flex justify-between items-center text-[7.5px] font-serif tracking-widest text-white/40 uppercase relative z-10">
              <span>TARGET REGION // RADAR</span>
              <span className="text-white animate-pulse">GRID ESTABLISHED</span>
            </div>

            {/* Custom SVG World Map / Grid */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 select-none pointer-events-none p-12">
              <svg viewBox="0 0 200 200" className="w-full h-full stroke-white fill-none stroke-[0.5]">
                {/* Radial radar lines */}
                <circle cx="100" cy="100" r="80" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="20" />
                
                {/* Grid coordinates */}
                <line x1="20" y1="100" x2="180" y2="100" />
                <line x1="100" y1="20" x2="100" y2="180" />
                
                {/* Dial crosshair */}
                <line x1="20" y1="20" x2="180" y2="180" strokeDasharray="3,3" />
                
                {/* Location target marker */}
                <g className="animate-pulse">
                  {/* Coords target dot (Dhaka offset) */}
                  <circle cx="120" cy="90" r="4" className="fill-white" />
                  <circle cx="120" cy="90" r="10" stroke="white" strokeWidth="0.8" />
                  <line x1="120" y1="75" x2="120" y2="105" />
                  <line x1="105" y1="90" x2="135" y2="90" />
                </g>

                <text x="128" y="86" className="fill-white font-serif text-[5px] tracking-wider font-light">ATBKHS LABS</text>
              </svg>
            </div>

            {/* Bottom status readout */}
            <div className="flex justify-between items-end relative z-10 text-[7px] font-serif tracking-widest text-white/30 uppercase">
              <div>
                LAT: 23° 48' 37.08" N<br />
                LNG: 90° 24' 45.00" E
              </div>
              <a 
                href="https://maps.google.com/?q=23.8103,90.4125" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-white/20 px-3 py-1.5 rounded-sm text-white hover:bg-white hover:text-black transition-colors"
              >
                External Map link
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
