import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yAvatar = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#FFFFFF' }}
    >
      {/* Subtle Professional Colorful Background - Overlays everything to blend white edges */}
      <div 
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: `
            radial-gradient(circle at 20% 40%, rgba(0, 113, 227, 0.08), transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(88, 86, 214, 0.05), transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(90, 200, 250, 0.05), transparent 40%)
          `,
          filter: 'blur(60px)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Massive Background Text - Moved to z-0 behind the avatar */}
      <motion.div 
        className="absolute w-full flex flex-col items-center justify-center pointer-events-none select-none z-0"
        style={{ y: yText, opacity }}
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-black tracking-tighter"
          style={{ 
            fontSize: 'clamp(6rem, 20vw, 22rem)', 
            color: 'rgba(0,0,0,0.03)', 
            lineHeight: 0.75,
            textTransform: 'uppercase'
          }}
        >
          Bhaumik
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-black tracking-tighter"
          style={{ 
            fontSize: 'clamp(6rem, 20vw, 22rem)', 
            color: 'rgba(0,0,0,0.03)', 
            lineHeight: 0.75,
            textTransform: 'uppercase',
            marginLeft: '15vw'
          }}
        >
          Hinunia
        </motion.h1>
      </motion.div>

      {/* Foreground Name - Split left and right */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-6 md:px-16 lg:px-24 pointer-events-none z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Hello, I'm
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter" style={{ color: 'var(--text)', lineHeight: 0.9 }}>
            Bhaumik
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xs md:max-w-sm"
          >
            <p className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'var(--secondary)' }}>
              Building thoughtful digital products and AI-powered experiences.
            </p>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105" 
              style={{ background: 'var(--text)', color: 'var(--bg)' }}
            >
              Resume ↗
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-end text-right"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--secondary)' }}>
            Full Stack Developer
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter" style={{ color: 'var(--text)', lineHeight: 0.9 }}>
            Hinunia
          </h2>
        </motion.div>
      </div>

      {/* 3D Avatar Container - Placed at z-10 so the white background blends with the pure white page */}
      {/* Adding mixBlendMode: 'multiply' to the parent fixes Stacking Context issues with the background text! */}
      <motion.div
        style={{ y: yAvatar, opacity, mixBlendMode: 'multiply' }}
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ 
            opacity: 1, 
            y: mousePosition.y, 
            x: mousePosition.x 
          }}
          transition={{ 
            opacity: { duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 }
          }}
          className="relative flex items-start justify-center w-full h-[75vh] md:h-[85vh] overflow-hidden"
          style={{ mixBlendMode: 'multiply' }}
        >
          <motion.img
            src="/bhaumik.png"
            alt="Bhaumik Hinunia"
            initial={{ y: 0 }}
            animate={{ y: [-10, 0, -10] }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            style={{
              height: '115%', // Make it slightly taller than the container to crop the legs
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'top center', // Pin head to the top, legs overflow bottom
              mixBlendMode: 'multiply',
              filter: 'brightness(1.08) contrast(1.05)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--secondary)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-16 overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.1)' }}
        >
          <motion.div 
            className="w-full h-1/2"
            style={{ background: 'var(--accent)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
