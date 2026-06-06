import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#FFFFFF' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Thin accent line that draws across — same as site's progress indicator */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #0071E3, #7c3aed)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.8, delay: 0.1, ease: 'easeInOut' }}
      />

      {/* Main content — matches the hero section layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between select-none">

        {/* Left: Hello I'm + Bhaumik */}
        <div className="overflow-hidden flex flex-col items-center md:items-start">
          {/* "Hello, I'm" label */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 md:mb-3 block"
            style={{ color: '#0071E3' }}
          >
            Hello, I'm
          </motion.span>

          {/* "Bhaumik" wipes in from left — clip-path reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tighter"
              style={{
                fontSize: 'clamp(4.5rem, 14vw, 12rem)',
                color: '#1D1D1F',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
              }}
            >
              Bhaumik
            </motion.h1>
          </div>
        </div>

        {/* Right: Full Stack + Hinunia */}
        <div className="overflow-hidden flex flex-col items-center md:items-end mt-2 md:mt-0">
          {/* "Full Stack Developer" label */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 md:mb-3 hidden md:block"
            style={{ color: '#6E6E73' }}
          >
            Full Stack Developer
          </motion.span>

          {/* "Hinunia" wipes in from right */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tighter"
              style={{
                fontSize: 'clamp(4.5rem, 14vw, 12rem)',
                color: '#1D1D1F',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
              }}
            >
              Hinunia
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Large watermark background text — exactly like hero */}
      <div
        className="absolute w-full flex flex-col items-center justify-center pointer-events-none select-none z-[-1]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-black tracking-tighter uppercase text-center"
          style={{
            fontSize: 'clamp(6rem, 22vw, 24rem)',
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 0.8,
            letterSpacing: '-0.04em',
          }}
        >
          BH
        </motion.div>
      </div>

      {/* Bottom: loading bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px]"
        style={{ background: 'rgba(0,0,0,0.04)' }}
      >
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #0071E3, #7c3aed)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.0, delay: 0.05, ease: 'easeInOut' }}
        />
      </div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ color: '#6E6E73' }}
      >
        Building thoughtful digital products
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
