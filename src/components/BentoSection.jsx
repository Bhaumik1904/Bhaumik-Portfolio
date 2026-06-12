import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ── Animated counter hook ───────────────────────────────── */
const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return [count, () => setStarted(true)];
};

/* ── Individual tiles ────────────────────────────────────── */

const TaglineTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="apple-card p-8 flex flex-col justify-between col-span-2 relative overflow-hidden"
    style={{ minHeight: '180px', background: '#0071E3' }}
  >
    {/* subtle grid pattern */}
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <p className="text-xs font-bold tracking-widest uppercase text-blue-200 relative z-10">About Me</p>
    <div className="relative z-10">
      <h3 className="font-black text-white leading-tight"
        style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '-0.03em' }}>
        I build things that matter.<br />
        <span className="text-blue-200">Sometimes they even work.</span>
      </h3>
    </div>
  </motion.div>
);

const StatusTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.06 }}
    className="apple-card p-6 flex flex-col justify-between"
    style={{ minHeight: '180px' }}
  >
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--secondary)' }}>Currently</p>
    </div>
    <div>
      <p className="font-bold text-sm leading-snug mb-1" style={{ color: 'var(--text)' }}>
        2 Active Internships
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--secondary)' }}>
        PHP Full Stack @ RVNS Solutions<br />
        Research Intern @ SRM University AP
      </p>
    </div>
  </motion.div>
);

const LocationTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="apple-card p-6 flex flex-col justify-between overflow-hidden relative"
    style={{ minHeight: '180px', background: '#F0FDF4' }}
  >
    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#16A34A' }}>Location</p>
    <div>
      <div className="text-4xl mb-2">📍</div>
      <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Gujarat, India</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>B.Tech CSE · SRM University AP</p>
    </div>
  </motion.div>
);

const StackTile = () => {
  const techs = [
    { name: 'React', color: '#61DAFB', bg: '#E0F7FE' },
    { name: 'Python', color: '#3776AB', bg: '#EBF3FC' },
    { name: 'TensorFlow', color: '#FF6F00', bg: '#FFF3E0' },
    { name: 'MongoDB', color: '#00ED64', bg: '#E6FFF5' },
    { name: 'PHP', color: '#777BB4', bg: '#EEEEF8' },
    { name: 'Node.js', color: '#339933', bg: '#E6F4E6' },
    { name: 'OpenCV', color: '#5C3EE8', bg: '#EDE8FD' },
    { name: 'Flask', color: '#000000', bg: '#F5F5F5' },
    { name: 'Git', color: '#F05032', bg: '#FEF0ED' },
    { name: 'MySQL', color: '#4479A1', bg: '#EBF3FB' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.14 }}
      className="apple-card p-6 flex flex-col row-span-2"
    >
      <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--secondary)' }}>Tech Stack</p>
      <div className="flex flex-wrap gap-2 flex-1">
        {techs.map(t => (
          <motion.span
            key={t.name}
            whileHover={{ scale: 1.08 }}
            className="px-3 py-1.5 rounded-full text-xs font-bold cursor-default"
            style={{ background: t.bg, color: t.color }}
          >
            {t.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const AccuracyTile = () => {
  const [count, start] = useCounter(96, 1200);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.18 } }}
      onViewportEnter={start}
      viewport={{ once: true }}
      className="apple-card p-6 flex flex-col justify-between relative overflow-hidden"
      style={{ background: '#FDF4FF' }}
    >
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#9333EA' }}>ML Accuracy</p>
      <div>
        <p className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#9333EA', letterSpacing: '-0.04em' }}>
          {count}<span style={{ fontSize: '1.5rem' }}>.8%</span>
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--secondary)' }}>Cancer Detection CNN</p>
      </div>
    </motion.div>
  );
};

const ProjectTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.22 }}
    className="apple-card p-6 flex flex-col justify-between"
    style={{ background: '#FFFBEB' }}
  >
    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#D97706' }}>Featured Project</p>
    <div>
      <div className="text-3xl mb-2">🔬</div>
      <p className="font-bold text-sm leading-snug" style={{ color: 'var(--text)' }}>Cancer Detection System</p>
      <p className="text-xs mt-1" style={{ color: 'var(--secondary)' }}>Deep Learning · TensorFlow · React</p>
    </div>
  </motion.div>
);

const InternsTile = () => {
  const [count, start] = useCounter(2, 800);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.26 } }}
      onViewportEnter={start}
      viewport={{ once: true }}
      className="apple-card p-6 flex flex-col justify-between"
      style={{ background: '#EFF6FF' }}
    >
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#0071E3' }}>Experience</p>
      <div>
        <p className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#0071E3', letterSpacing: '-0.04em' }}>
          {count}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--secondary)' }}>Active Internships</p>
      </div>
    </motion.div>
  );
};

const CoffeeTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="apple-card p-6 flex flex-col justify-between"
    style={{ background: '#FFF7ED' }}
  >
    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#EA580C' }}>Fuel</p>
    <div>
      <p className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#EA580C', letterSpacing: '-0.04em' }}>
        ∞
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--secondary)' }}>Coffees consumed ☕</p>
    </div>
  </motion.div>
);

const QuoteTile = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.34 }}
    className="apple-card p-8 flex flex-col justify-center col-span-2"
    style={{ background: '#1D1D1F' }}
  >
    <p className="text-2xl mb-3" style={{ lineHeight: 1 }}>"</p>
    <p className="font-semibold leading-relaxed text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>
      First, solve the problem. Then, write the code.
    </p>
    <p className="text-xs mt-3" style={{ color: '#86868B' }}>— John Johnson · A principle I actually live by</p>
  </motion.div>
);

/* ── Section ─────────────────────────────────────────────── */
const BentoSection = () => (
  <section id="bento" className="py-10 md:py-14" style={{ background: 'var(--bg)' }}>
    <div className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="section-label mb-3">The Full Picture</p>
        <h2
          className="font-black tracking-tight leading-none"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
        >
          More about me.
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* Row 1 */}
        <div className="sm:col-span-2 lg:col-span-2"><TaglineTile /></div>
        <div className="sm:col-span-1"><StatusTile /></div>
        <div className="sm:col-span-1"><LocationTile /></div>

        {/* Row 2 */}
        <div className="sm:col-span-1 lg:row-span-2"><StackTile /></div>
        <div className="sm:col-span-1"><AccuracyTile /></div>
        <div className="sm:col-span-1"><ProjectTile /></div>
        <div className="sm:col-span-1"><InternsTile /></div>

        {/* Row 3 */}
        <div className="sm:col-span-1"><CoffeeTile /></div>
        <div className="sm:col-span-2 lg:col-span-2"><QuoteTile /></div>
      </div>
    </div>
  </section>
);

export default BentoSection;
