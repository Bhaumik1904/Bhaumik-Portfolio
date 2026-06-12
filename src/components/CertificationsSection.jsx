import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Frontend Developer',
    issuer: 'HackerRank',
    date: '2024',
    icon: '🎨',
    color: '#00EA64',
    bgLight: '#EAFFF4',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: 'https://www.hackerrank.com/certificates/79a3773e493f',
    image: '/Hackerrank Frontend Developer.jpg',
  },
  {
    id: 2,
    title: 'Software Engineer',
    issuer: 'HackerRank',
    date: '2024',
    icon: '💻',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    skills: ['Problem Solving', 'Algorithms', 'Data Structures'],
    link: 'https://www.hackerrank.com/certificates/f51f6e9d9664',
    image: '/Hackerrank Software Engineer.jpg',
  },
  {
    id: 3,
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB · Credly',
    date: '2025',
    icon: '🍃',
    color: '#00ED64',
    bgLight: '#EAFFF5',
    skills: ['MongoDB', 'NoSQL', 'Aggregation', 'Atlas'],
    link: 'https://www.credly.com/badges/fc861de6-29f9-4cd0-ae9a-f23416e97ee9/public_url',
    image: '/MongoDB Associate Developer.png',
  },
];

/* ── Lightbox ─────────────────────────────────────────────── */
const Lightbox = ({ cert, onClose }) => (
  <AnimatePresence>
    <motion.div
      key="backdrop"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--surface, #1C1C1E)' }}
      >
        {/* Colour bar */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }} />

        {/* Certificate image */}
        <div className="relative bg-black/20">
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="w-full object-contain max-h-[60vh]"
          />
        </div>

        {/* Footer */}
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{cert.title}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--secondary)' }}
            >
              Close
            </button>
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
              style={{ background: cert.color, color: '#000' }}
            >
              View Proof ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ── Card ─────────────────────────────────────────────────── */
const CertCard = ({ cert, index, onPreview }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
    className="apple-card overflow-hidden flex flex-col group cursor-pointer relative"
  >
    {/* Colour band top */}
    <div
      className="h-1.5 w-full flex-shrink-0"
      style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }}
    />

    {/* Certificate thumbnail */}
    <div
      className="relative overflow-hidden"
      style={{ background: '#000', height: '160px' }}
    >
      <img
        src={cert.image}
        alt={`${cert.title} certificate`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: 0.92 }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)' }}
      >
        <button
          onClick={() => onPreview(cert)}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl mr-2 hover:opacity-90 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)' }}
        >
          🔍 Preview
        </button>
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          style={{ background: cert.color, color: '#000' }}
          onClick={e => e.stopPropagation()}
        >
          View Proof ↗
        </a>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col gap-3">
      {/* Icon + date row */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: cert.bgLight, border: `1px solid ${cert.color}33` }}
        >
          {cert.icon}
        </div>
        <span
          className="text-[11px] font-bold tracking-widest uppercase"
          style={{ color: cert.color }}
        >
          {cert.date}
        </span>
      </div>

      {/* Title + issuer */}
      <div>
        <h3
          className="font-bold text-sm leading-snug mb-0.5 group-hover:text-[var(--accent)] transition-colors"
          style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
        >
          {cert.title}
        </h3>
        <p className="text-[11px] font-medium" style={{ color: 'var(--secondary)' }}>
          {cert.issuer}
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {cert.skills.map(s => (
          <span
            key={s}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${cert.color}18`, color: cert.color }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Section ──────────────────────────────────────────────── */
const CertificationsSection = () => {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="py-14 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Credentials</p>
          <h2
            className="font-black tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
          >
            Certifications.
          </h2>
          <p className="text-base mt-4 max-w-md" style={{ color: 'var(--secondary)' }}>
            Verified credentials earned through dedicated learning and real assessments.
          </p>
        </motion.div>

        {/* Grid — centred for 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onPreview={setActiveCert} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeCert && <Lightbox cert={activeCert} onClose={() => setActiveCert(null)} />}
    </section>
  );
};

export default CertificationsSection;
