import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#F5F5F7' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Center reveal area */}
      <div className="relative flex flex-col items-center">

        {/* "BHAUMIK" — slides UP out of the accent line */}
        <div className="overflow-hidden pb-2">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tighter leading-none text-center"
            style={{
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              color: '#1D1D1F',
              letterSpacing: '-0.04em',
            }}
          >
            Bhaumik
          </motion.h1>
        </div>

        {/* Accent line — draws from centre outward */}
        <motion.div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #0071E3, #7c3aed, transparent)',
            borderRadius: '9999px',
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'min(420px, 80vw)', opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* "HINUNIA" — slides DOWN out of the accent line */}
        <div className="overflow-hidden pt-2">
          <motion.h1
            initial={{ y: '-110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tighter leading-none text-center"
            style={{
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              color: '#0071E3',
              letterSpacing: '-0.04em',
            }}
          >
            Hinunia
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-6 text-xs font-bold tracking-[0.25em] uppercase text-center"
          style={{ color: '#6E6E73' }}
        >
          Full Stack Developer
        </motion.p>
      </div>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px]"
        style={{ background: 'rgba(0,0,0,0.06)' }}
      >
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #0071E3, #7c3aed)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, delay: 0.05, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
