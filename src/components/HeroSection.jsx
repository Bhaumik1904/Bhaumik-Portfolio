import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yAvatar = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Use motion values instead of useState — avoids component re-render on every mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);
    if (mobile) return;

    const handleMouseMove = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 30);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#FFFFFF' }}
    >
      {/* Subtle color background — desktop only, no filter on mobile */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 hidden md:block"
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

      {/* Massive Background Text — desktop only, fade-in only (no scale, scale on 22rem text is very expensive) */}
      <motion.div 
        className="absolute w-full flex flex-col items-center justify-center pointer-events-none select-none z-0 hidden md:flex"
        style={{ y: yText, opacity }}
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          className="font-black tracking-tighter"
          style={{ 
            fontSize: 'clamp(6rem, 20vw, 22rem)', 
            color: 'rgba(0,0,0,0.03)', 
            lineHeight: 0.75,
            textTransform: 'uppercase',
            willChange: 'opacity',
          }}
        >
          Bhaumik
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="font-black tracking-tighter"
          style={{ 
            fontSize: 'clamp(6rem, 20vw, 22rem)', 
            color: 'rgba(0,0,0,0.03)', 
            lineHeight: 0.75,
            textTransform: 'uppercase',
            marginLeft: '15vw',
            willChange: 'opacity',
          }}
        >
          Hinunia
        </motion.h1>
      </motion.div>

      {/* Foreground Name - Stacked on mobile, split on desktop */}
      <div 
        className="absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-between px-6 md:px-16 lg:px-24 pointer-events-none z-10 pt-[12vh] md:pt-0"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0 w-full md:w-auto"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 md:mb-3" style={{ color: 'var(--accent)' }}>
            Hello, I'm
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter" style={{ color: 'var(--text)', lineHeight: 0.9 }}>
            Bhaumik
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 max-w-[280px] md:max-w-sm hidden md:block"
          >
            <p className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'var(--secondary)' }}>
              Building thoughtful digital products and AI-powered experiences.
            </p>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 pointer-events-auto" 
              style={{ background: 'var(--text)', color: 'var(--bg)' }}
            >
              Resume ↗
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-auto mt-2 md:mt-0"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 md:mb-3 hidden md:block" style={{ color: 'var(--secondary)' }}>
            Full Stack Developer
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter" style={{ color: 'var(--text)', lineHeight: 0.9 }}>
            Hinunia
          </h2>
          <span className="text-xs font-bold tracking-[0.2em] uppercase mt-2 md:hidden block" style={{ color: 'var(--secondary)' }}>
            Full Stack Developer
          </span>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-[280px] md:hidden block"
          >
            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--secondary)' }}>
              Building thoughtful digital products and AI-powered experiences.
            </p>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full text-sm font-semibold transition-all pointer-events-auto shadow-sm" 
              style={{ background: 'var(--text)', color: 'var(--bg)' }}
            >
              Resume ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Avatar — mouse parallax uses motion values (no re-renders), float uses CSS animation */}
      <motion.div
        style={{ y: yAvatar, opacity }}
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none md:mix-blend-multiply"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ opacity: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }, y: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          style={{ x: isMobile ? 0 : mouseX, y: isMobile ? 0 : mouseY }}
          className="relative flex items-start justify-center w-full h-[55vh] md:h-[85vh] overflow-hidden md:mix-blend-multiply"
        >
          <img
            src="/bhaumik.png"
            alt="Bhaumik Hinunia"
            className="md:mix-blend-multiply mix-blend-normal hero-float"
            style={{
              height: '115%',
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: 'brightness(1.08) contrast(1.05)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--secondary)' }}>
          Scroll
        </span>
        <div className="w-px h-16 overflow-hidden" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <motion.div 
            className="w-full h-1/2"
            style={{ background: 'var(--accent)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
