import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';

// Typewriter — pure hook, no library needed
const ROLES = ['Full Stack Developer', 'ML Engineer', 'React Developer', 'UI/UX Enthusiast'];

function useTypewriter(words, typeSpeed = 75, deleteSpeed = 45, pauseMs = 1800) {
  const [text, setText] = useState('');
  const state = useRef({ wordIdx: 0, phase: 'typing', charIdx: 0 });

  useEffect(() => {
    const s = state.current;
    let timer;

    const tick = () => {
      const word = words[s.wordIdx % words.length];
      let delay = typeSpeed;

      if (s.phase === 'typing') {
        if (s.charIdx < word.length) {
          s.charIdx++;
          setText(word.slice(0, s.charIdx));
        } else {
          s.phase = 'deleting';
          delay = pauseMs;
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--;
          setText(word.slice(0, s.charIdx));
          delay = deleteSpeed;
        } else {
          s.wordIdx++;
          s.phase = 'typing';
        }
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 800); // initial delay before typing starts
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

const HeroSection = () => {
  const ref = useRef(null);
  const role = useTypewriter(ROLES);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yAvatar = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText   = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Motion values for mouse parallax — never trigger a React re-render
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);
    if (mobile) return;

    const onMouseMove = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 25);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 25);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#FFFFFF' }}
    >
      {/* Color wash — desktop only (has blur filter) */}
      <div
        className="absolute inset-0 pointer-events-none z-30 hidden md:block"
        style={{
          background: `
            radial-gradient(circle at 20% 40%, rgba(0,113,227,0.07), transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(88,86,214,0.04), transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(90,200,250,0.04), transparent 40%)
          `,
          filter: 'blur(60px)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Massive background watermark — CSS fade-in, desktop only ── */}
      <motion.div
        className="absolute w-full flex flex-col items-center justify-center pointer-events-none select-none z-0 hidden md:flex"
        style={{ y: yText, opacity }}
      >
        <h1
          className="font-black tracking-tighter hero-anim hero-fade-in"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 0.75,
            textTransform: 'uppercase',
            animationDelay: '0.05s',
          }}
        >
          Bhaumik
        </h1>
        <h1
          className="font-black tracking-tighter hero-anim hero-fade-in"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 0.75,
            textTransform: 'uppercase',
            marginLeft: '15vw',
            animationDelay: '0.15s',
          }}
        >
          Hinunia
        </h1>
      </motion.div>

      {/* ── Foreground names — CSS animations, no JS overhead ── */}
      <div
        className="absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-between px-6 md:px-16 lg:px-24 pointer-events-none z-10 pt-[12vh] md:pt-0"
        style={{ opacity }}
      >
        {/* LEFT: Hello I'm + Bhaumik */}
        <div
          className="hero-anim hero-fade-left flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0 w-full md:w-auto"
          style={{ animationDelay: '0.35s' }}
        >
          {/* Available for work badge */}
          <div
            className="hero-anim hero-fade-up flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full w-fit"
            style={{
              animationDelay: '0.2s',
              background: 'rgba(48,209,88,0.1)',
              border: '1px solid rgba(48,209,88,0.25)',
            }}
          >
            {/* Pulsing green dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: '#30D158' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: '#30D158' }}
              />
            </span>
            <span className="text-[11px] font-bold tracking-wide" style={{ color: '#1a8c3a' }}>
              Open to opportunities
            </span>
          </div>

          <span
            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 md:mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Hello, I'm
          </span>
          <h2
            className="text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter"
            style={{ color: 'var(--text)', lineHeight: 0.9 }}
          >
            Bhaumik
          </h2>

          {/* Description + resume — desktop */}
          <div
            className="hero-anim hero-fade-up mt-6 md:mt-8 max-w-[280px] md:max-w-sm hidden md:block"
            style={{ animationDelay: '0.8s' }}
          >
            <p className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'var(--secondary)' }}>
              Building thoughtful digital products and AI-powered experiences.
            </p>
            <MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 pointer-events-auto"
                style={{ background: 'var(--text)', color: 'var(--bg)' }}
              >
                Resume ↗
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT: Full Stack + Hinunia */}
        <div
          className="hero-anim hero-fade-right flex flex-col items-center md:items-end text-center md:text-right w-full md:w-auto mt-2 md:mt-0"
          style={{ animationDelay: '0.5s' }}
        >
          {/* Typing subtitle — desktop */}
          <span
            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-1 md:mb-3 hidden md:flex items-center gap-1"
            style={{ color: 'var(--secondary)', minHeight: '1.2em' }}
          >
            {role}
            <span
              className="inline-block w-[2px] h-[0.9em] ml-0.5 rounded-full align-middle"
              style={{ background: 'var(--accent)', animation: 'blink 1s step-end infinite' }}
            />
          </span>
          <h2
            className="text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter"
            style={{ color: 'var(--text)', lineHeight: 0.9 }}
          >
            Hinunia
          </h2>
          {/* Typing subtitle — mobile */}
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase mt-2 md:hidden flex items-center justify-center gap-1"
            style={{ color: 'var(--secondary)', minHeight: '1.2em' }}
          >
            {role}
            <span
              className="inline-block w-[2px] h-[0.85em] ml-0.5 rounded-full"
              style={{ background: 'var(--accent)', animation: 'blink 1s step-end infinite' }}
            />
          </span>

          {/* Description + resume — mobile only */}
          <div
            className="hero-anim hero-fade-up mt-4 max-w-[280px] md:hidden block"
            style={{ animationDelay: '0.8s' }}
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
          </div>
        </div>
      </div>

      {/* ── Avatar ── */}
      {/* Outer: scroll parallax + fade + conditional mix-blend-mode on the SAME element as the transform */}
      {/* IMPORTANT: mix-blend-mode must be on the outermost element with the transform. */}
      {/* Children must NOT have mix-blend-mode — it traps blending inside stacking contexts */}
      <motion.div
        style={{ y: yAvatar, opacity, mixBlendMode: 'multiply' }}
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none"
      >
        {/* CSS entrance animation — separate element so it doesn't interfere with blend */}
        <div
          className="hero-anim hero-slide-up w-full flex items-start justify-center h-[55vh] md:h-[85vh] overflow-hidden"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Inner: mouse parallax via motion values only */}
          <motion.div
            style={{ x: isMobile ? 0 : mouseX, y: isMobile ? 0 : mouseY }}
            className="w-full h-full flex items-start justify-center"
          >
            <img
              src="/bhaumik.png"
              alt="Bhaumik Hinunia"
              className="hero-float"
              style={{
                height: '115%',
                width: 'auto',
                objectFit: 'cover',
                objectPosition: 'top center',
                filter: 'brightness(1.08) contrast(1.05)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-anim hero-fade-up absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        style={{ animationDelay: '1.1s', opacity }}
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
      </div>
    </section>
  );
};

export default HeroSection;
