import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '10+',  label: 'Projects Built' },
  { value: '3',    label: 'AI Models' },
  { value: '2+',   label: 'Years Coding' },
  { value: '500+', label: 'Commits' },
  { value: '96.8%',label: 'Model Accuracy' },
  { value: '∞',   label: 'Coffee ☕' },
];

// Duplicate for seamless loop
const ITEMS = [...STATS, ...STATS];

const StatsStrip = () => (
  <div
    className="w-full py-5 overflow-hidden relative"
    style={{ background: '#1D1D1F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
  >
    {/* Left fade */}
    <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to right, #1D1D1F, transparent)' }} />
    {/* Right fade */}
    <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to left, #1D1D1F, transparent)' }} />

    <motion.div
      className="flex items-center gap-0 whitespace-nowrap"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
    >
      {ITEMS.map((s, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          {/* Stat */}
          <div className="flex items-baseline gap-2 px-10">
            <span
              className="font-black tracking-tighter"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#F5F5F7', letterSpacing: '-0.04em' }}
            >
              {s.value}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {s.label}
            </span>
          </div>
          {/* Separator dot */}
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#0071E3' }}
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export default StatsStrip;
