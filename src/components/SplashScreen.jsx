import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LETTERS = 'Bhaumik Hinunia'.split('');

const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    // Total animation time: ~2s. Trigger exit at 1.8s.
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
      style={{ background: '#08080f' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* BH Monogram */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7"
      >
        <div
          className="w-20 h-20 rounded-[22px] flex items-center justify-center font-black text-2xl tracking-tighter text-white shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #3B9EFF 0%, #7c3aed 100%)',
            letterSpacing: '-0.04em',
            boxShadow: '0 0 60px rgba(59,158,255,0.35), 0 0 120px rgba(124,58,237,0.2)',
          }}
        >
          BH
        </div>
      </motion.div>

      {/* Name — letter-by-letter reveal */}
      <div className="flex overflow-hidden" aria-label="Bhaumik Hinunia">
        {LETTERS.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.35 + i * 0.038,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-black text-3xl md:text-4xl"
            style={{
              color: char === ' ' ? 'transparent' : '#F5F5F7',
              letterSpacing: '-0.04em',
              width: char === ' ' ? '0.45em' : 'auto',
              display: 'inline-block',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.45, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-3 text-xs font-semibold tracking-[0.22em] uppercase"
        style={{ color: '#8E8E93' }}
      >
        Full Stack Developer
      </motion.p>

      {/* Progress line — sweeps from left to right */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #3B9EFF, #7c3aed, #ec4899)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.65, delay: 0.1, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default SplashScreen;
