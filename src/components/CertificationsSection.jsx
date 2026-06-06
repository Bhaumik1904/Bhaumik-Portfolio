import React from 'react';
import { motion } from 'framer-motion';

// ⚠️  UPDATE THESE with your real certifications
const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: '2024',
    icon: '🤖',
    color: '#0071E3',
    bgLight: '#EEF4FF',
    skills: ['Python', 'TensorFlow', 'Neural Networks'],
    link: '#',
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'Udemy',
    date: '2024',
    icon: '🌐',
    color: '#30D158',
    bgLight: '#EEFBF1',
    skills: ['React', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    id: 3,
    title: 'Python for Data Science & AI',
    issuer: 'IBM · Cognitive Class',
    date: '2024',
    icon: '📊',
    color: '#BF5AF2',
    bgLight: '#F5EEFF',
    skills: ['Python', 'Pandas', 'NumPy'],
    link: '#',
  },
  {
    id: 4,
    title: 'Introduction to Computer Vision',
    issuer: 'OpenCV · Coursera',
    date: '2025',
    icon: '👁️',
    color: '#FF9F0A',
    bgLight: '#FFF8EE',
    skills: ['OpenCV', 'CNNs', 'Image Processing'],
    link: '#',
  },
  {
    id: 5,
    title: 'React — The Complete Guide',
    issuer: 'Udemy',
    date: '2025',
    icon: '⚛️',
    color: '#5AC8FA',
    bgLight: '#EEF8FE',
    skills: ['React', 'Redux', 'Hooks'],
    link: '#',
  },
  {
    id: 6,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2025',
    icon: '☁️',
    color: '#FF9F0A',
    bgLight: '#FFF8EE',
    skills: ['AWS', 'Cloud', 'EC2', 'S3'],
    link: '#',
  },
];

const CertCard = ({ cert, index }) => (
  <motion.a
    href={cert.link}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4 }}
    className="apple-card overflow-hidden flex flex-col group cursor-pointer"
    style={{ textDecoration: 'none' }}
  >
    {/* Colour band top */}
    <div
      className="h-1.5 w-full"
      style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }}
    />

    <div className="p-5 flex-1 flex flex-col gap-3">
      {/* Icon + date row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: cert.bgLight, border: `1px solid ${cert.color}22` }}
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
            style={{ background: `${cert.color}12`, color: cert.color }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </motion.a>
);

const CertificationsSection = () => (
  <section id="certifications" className="py-24" style={{ background: 'var(--bg)' }}>
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
          Courses and credentials earned while exploring the edges of what I can build.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
