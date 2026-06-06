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
      style={{ background: '#08080f' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Ambient glow — subtle purple/blue behind name */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,158,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-6 px-8 text-center">

        {/* Horizontal rule — draws from center out */}
        <div className="relative w-full flex items-center justify-center mb-2">
          <motion.div
            className="h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #3B9EFF, #7c3aed, transparent)' }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '280px', opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Full name — stacked, centered, different from hero's split layout */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(3.2rem, 10vw, 8rem)',
              letterSpacing: '-0.04em',
              color: '#F5F5F7',
            }}
          >
            Bhaumik
          </motion.p>
        </div>

        <div className="overflow-hidden -mt-4 md:-mt-6">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(3.2rem, 10vw, 8rem)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #3B9EFF 0%, #7c3aed 60%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hinunia
          </motion.p>
        </div>

        {/* Divider rule — appears after name */}
        <div className="relative w-full flex items-center justify-center mt-1">
          <motion.div
            className="h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #3B9EFF, #7c3aed, transparent)' }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '280px', opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-xs font-bold tracking-[0.28em] uppercase"
          style={{ color: '#8E8E93' }}
        >
          Full Stack Developer
        </motion.p>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #3B9EFF, #7c3aed, #ec4899)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, delay: 0.05, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
