import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState('assembling'); // assembling -> glowing -> exiting
  const text = "DREAMERS INNOVATOR - ATBKHS";
  const letters = text.split("");
  const totalLetters = letters.length;

  useEffect(() => {
    // 1. Particle Background
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid-like lines in background (subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Loop screen edge
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 2. State Timeline
    const glowTimeout = setTimeout(() => {
      setStage('glowing');
    }, 2800);

    const exitTimeout = setTimeout(() => {
      setStage('exiting');
    }, 4100);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(glowTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Framer Motion Variants for letters
  const letterVariants = {
    hidden: (i) => {
      // Four corners mapping
      const corners = [
        { x: -window.innerWidth / 1.5, y: -window.innerHeight / 1.5 }, // Top-Left
        { x: window.innerWidth / 1.5, y: -window.innerHeight / 1.5 },  // Top-Right
        { x: -window.innerWidth / 1.5, y: window.innerHeight / 1.5 },  // Bottom-Left
        { x: window.innerWidth / 1.5, y: window.innerHeight / 1.5 },   // Bottom-Right
      ];
      const corner = corners[i % 4];
      return {
        x: corner.x,
        y: corner.y,
        opacity: 0,
        scale: 0.5,
        rotate: Math.random() * 360,
      };
    },
    visible: (i) => {
      // Radial circle configuration
      const radius = 140; // px
      const angleRad = (i / totalLetters) * 2 * Math.PI - Math.PI / 2; // offset by -90deg to start top
      const tx = radius * Math.cos(angleRad);
      const ty = radius * Math.sin(angleRad);
      const rot = (i / totalLetters) * 360;

      return {
        x: tx,
        y: ty,
        opacity: 1,
        scale: 1,
        rotate: rot,
        transition: {
          type: 'spring',
          stiffness: 35,
          damping: 10,
          delay: i * 0.04,
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50 select-none">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Main concentric visual wrapper */}
      <motion.div
        className="relative flex items-center justify-center w-96 h-96"
        animate={
          stage === 'glowing'
            ? { rotate: 15, scale: 1.05 }
            : stage === 'exiting'
            ? { scale: 1.8, opacity: 0 }
            : { rotate: 0 }
        }
        transition={
          stage === 'glowing'
            ? { duration: 1.2, ease: "easeOut" }
            : stage === 'exiting'
            ? { duration: 0.7, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        {/* Futuristic tech-ring blueprint */}
        <motion.div
          className="absolute rounded-full border border-white/5 border-dashed w-72 h-72 animate-spin-slow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="absolute rounded-full border border-white/10 w-64 h-64"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        
        {/* Centered Round Logo using logo.jpeg */}
        <motion.div 
          className="absolute w-28 h-28 rounded-full border border-white/20 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.3 }}
        >
          <img 
            src="/logo.jpeg" 
            alt="Dreamers Innovator Logo" 
            className="w-full h-full object-cover rounded-full" 
          />
        </motion.div>

        {/* Circular Letters Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={`absolute font-serif text-[13px] tracking-normal font-light transition-all duration-300 text-white ${
                stage === 'glowing' 
                  ? 'text-glow font-normal drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                  : 'text-white/80'
              }`}
              style={{
                transformOrigin: "center center",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Futuristic status text at bottom */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-1 font-serif text-[9px] tracking-[0.4em] text-white/40 uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: stage === 'exiting' ? 0 : 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span>Initializing System Core</span>
        <div className="w-16 h-[1px] bg-white/20 mt-1 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white/80" 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
