import React from 'react';
import { motion } from 'framer-motion';

const MOMENTS = [
  {
    time: '9:00 AM',
    emoji: '☀️',
    title: 'Morning Routine',
    desc: "Coffee, GitHub notifications, and pretending I'll actually plan my day.",
    color: '#FF9F0A',
    above: true,
  },
  {
    time: '10:30 AM',
    emoji: '💻',
    title: 'Deep Work Mode',
    desc: 'Headphones on. Do not disturb. The world ceases to exist.',
    color: '#0071E3',
    above: false,
  },
  {
    time: '12:30 PM',
    emoji: '🤖',
    title: 'Model Training',
    desc: 'Kicked off a training run. Excellent excuse to take lunch.',
    color: '#BF5AF2',
    above: true,
  },
  {
    time: '2:00 PM',
    emoji: '🐛',
    title: 'Debugging',
    desc: '"It was working yesterday, I promise." — a memoir.',
    color: '#FF3B30',
    above: false,
  },
  {
    time: '4:30 PM',
    emoji: '☕',
    title: 'Docs & Coffee',
    desc: 'Reading the documentation I should have read this morning.',
    color: '#FF9F0A',
    above: true,
  },
  {
    time: '6:00 PM',
    emoji: '🚀',
    title: 'Shipped It!',
    desc: 'git commit -m "fix bug, add bug". Works on my machine.',
    color: '#30D158',
    above: false,
  },
  {
    time: '10:00 PM',
    emoji: '🌙',
    title: 'Side Projects',
    desc: '"One more feature, then I\'ll sleep." — never true.',
    color: '#5AC8FA',
    above: true,
  },
];

/* ── Desktop: Alternating above/below horizontal timeline ── */
const DesktopTimeline = () => (
  <div className="relative hidden md:block" style={{ minHeight: '320px' }}>
    {/* Central timeline line */}
    <div
      className="absolute left-0 right-0"
      style={{
        top: '50%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--border) 5%, var(--border) 95%, transparent)',
        transform: 'translateY(-50%)',
      }}
    />

    <div className="grid grid-cols-7 gap-3 h-full items-center">
      {MOMENTS.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: m.above ? -24 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
          style={{ paddingTop: m.above ? 0 : '52%', paddingBottom: m.above ? '52%' : 0 }}
        >
          {/* Card above the line */}
          {m.above && (
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="apple-card p-4 w-full mb-3 cursor-default"
            >
              <span className="text-2xl block mb-2">{m.emoji}</span>
              <p className="text-[11px] font-bold mb-1" style={{ color: m.color }}>{m.time}</p>
              <p className="text-xs font-bold leading-snug mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>{m.title}</p>
              <p className="text-[10px] leading-relaxed" style={{ color: 'var(--secondary)' }}>{m.desc}</p>
            </motion.div>
          )}

          {/* Timeline dot */}
          <div className="relative z-10 flex-shrink-0">
            <div
              className="w-3 h-3 rounded-full border-2"
              style={{ background: 'var(--card)', borderColor: m.color }}
            />
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: m.color, animationDuration: `${2 + i * 0.3}s` }}
            />
          </div>

          {/* Card below the line */}
          {!m.above && (
            <motion.div
              whileHover={{ y: 4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="apple-card p-4 w-full mt-3 cursor-default"
            >
              <span className="text-2xl block mb-2">{m.emoji}</span>
              <p className="text-[11px] font-bold mb-1" style={{ color: m.color }}>{m.time}</p>
              <p className="text-xs font-bold leading-snug mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>{m.title}</p>
              <p className="text-[10px] leading-relaxed" style={{ color: 'var(--secondary)' }}>{m.desc}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

/* ── Mobile: Vertical timeline ─────────────────────────── */
const MobileTimeline = () => (
  <div className="relative md:hidden pl-8">
    {/* Vertical line */}
    <div
      className="absolute left-3 top-2 bottom-2 w-0.5"
      style={{ background: 'linear-gradient(to bottom, transparent, var(--border) 5%, var(--border) 95%, transparent)' }}
    />

    <div className="space-y-4">
      {MOMENTS.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="relative flex items-start gap-4"
        >
          {/* Dot on the line */}
          <div
            className="absolute -left-5 top-4 w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 z-10"
            style={{ background: 'var(--card)', borderColor: m.color }}
          />

          {/* Card */}
          <div className="apple-card p-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{m.emoji}</span>
              <span className="text-[11px] font-bold" style={{ color: m.color }}>{m.time}</span>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>{m.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--secondary)' }}>{m.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ── Section ─────────────────────────────────────────────── */
const DayInLifeSection = () => (
  <section id="daily-life" className="py-10 md:py-14" style={{ background: 'var(--bg)' }}>
    <div className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="section-label mb-3">Developer Life</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2
            className="font-black tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
          >
            A day in my life.
          </h2>
          <p className="text-sm max-w-xs text-right hidden sm:block" style={{ color: 'var(--secondary)' }}>
            Hover each moment — some truths are universal among developers.
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <DesktopTimeline />
      <MobileTimeline />
    </div>
  </section>
);

export default DayInLifeSection;
