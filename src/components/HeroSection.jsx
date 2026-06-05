import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yAvatar = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText   = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Motion values for mouse parallax — never trigger re-renders
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20, mass: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20, mass: 0.5 });

  const [isMobile, setIsMobile]     = useState(false);
  // Delay float animation until entrance is fully done to avoid conflicting y transforms
  const [floatReady, setFloatReady] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);

    // Start float 200ms after entrance animation ends (entrance takes ~1.5s)
    const t = setTimeout(() => setFloatReady(true), 1700);

    if (mobile) return () => clearTimeout(t);

    const handleMouseMove = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 20);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(t);
    };
  }, [rawX, rawY]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#FFFFFF' }}
    >
      {/*
        Background colour tint — NO filter:blur (extremely expensive on Windows/DirectX).
        The soft gradient is subtle enough without blurring.
        NO mixBlendMode here either — forces compositing layer on every frame.
      */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hidden md:block"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 40%, rgba(0,113,227,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 60%, rgba(88,86,214,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(90,200,250,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Background text — static, no entrance animation. It's 3% opacity, nobody notices.
          Scroll-driven parallax still works (yText). No per-frame paint cost. */}
      <motion.div
        className="absolute w-full flex-col items-center justify-center pointer-events-none select-none z-0 hidden md:flex"
        style={{ y: yText, opacity }}
      >
        <h1
          className="font-black tracking-tighter"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 0.75,
            textTransform: 'uppercase',
          }}
        >
          Bhaumik
        </h1>
        <h1
          className="font-black tracking-tighter"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 0.75,
            textTransform: 'uppercase',
            marginLeft: '15vw',
          }}
        >
          Hinunia
        </h1>
      </motion.div>

      {/* Foreground name — stacked on mobile, split on desktop */}
      <div
        className="absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-between px-6 md:px-16 lg:px-24 pointer-events-none z-10 pt-[12vh] md:pt-0"
        style={{ opacity }}
      >
        {/* Left — Bhaumik */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0 w-full md:w-auto"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 md:mb-3" style={{ color: 'var(--accent)' }}>
            Hello, I'm
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter" style={{ color: 'var(--text)', lineHeight: 0.9 }}>
            Bhaumik
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Right — Hinunia */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Avatar
          - Entrance: simple opacity + translateY via CSS class (no Framer y so mouseY doesn't conflict)
          - After entrance: mouse parallax via motion values + CSS float animation
          - mix-blend-mode ONLY on the <img>, not on wrappers (fewer compositing layers)
      */}
      <motion.div
        style={{ y: yAvatar, opacity }}
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
          style={{ x: isMobile ? 0 : mouseX, y: isMobile ? 0 : mouseY, willChange: 'transform' }}
          className="relative flex items-start justify-center w-full h-[55vh] md:h-[85vh] overflow-hidden md:mix-blend-multiply"
        >
          <img
            src="/bhaumik.png"
            alt="Bhaumik Hinunia"
            className={`mix-blend-multiply ${floatReady ? 'hero-float' : ''}`}
            style={{
              height: '115%',
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: 'brightness(1.08) contrast(1.05)',
              willChange: 'transform',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — delayed so it doesn't compete with entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
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
