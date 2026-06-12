import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EXPERIENCES = [
  {
    id: '01',
    role: 'Summer Research Intern',
    company: 'SRM University AP',
    type: 'Research Internship',
    period: 'May 2026 – Jul 2026',
    location: 'Amaravati, Andhra Pradesh',
    logo: '/srm-ap-logo.png',
    accentColor: '#5C6B3A',        // olive-green matching SRM logo
    bgTint: '#F9F9F7',
    project: 'Cancer Detection System',
    projectLink: 'https://github.com/Bhaumik1904/Cancer-Detection.git',
    description:
      'Conducted applied deep learning research focused on automated detection of malignant tissue in histopathology images using Convolutional Neural Networks.',
    highlights: [
      'Achieved 96.8% classification accuracy on the BreakHis histopathology dataset',
      'Applied transfer learning with fine-tuned CNN architecture using TensorFlow',
      'Built a clinical-grade React + Flask dashboard for radiologist review',
      'Integrated OpenCV pipelines for image preprocessing and augmentation',
    ],
    tech: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'React', 'Flask'],
  },
  {
    id: '02',
    role: 'PHP Full Stack Developer Intern',
    company: 'RVNS Solutions Pvt. Ltd.',
    type: 'Industry Internship',
    period: 'Jun 2026 – Aug 2026',
    location: 'Kurnool, Andhra Pradesh · Online',
    logo: '/rvns-logo.png',
    accentColor: '#1A3A6B',        // navy blue matching RVNS logo
    bgTint: '#F7F8FC',
    project: 'Full Stack Web Development',
    projectLink: null,
    description:
      'Selected as PHP Full Stack Developer Intern at RVNS Solutions Private Limited — a software development firm focused on innovating real-world business solutions.',
    highlights: [
      'Developing full-stack web applications using PHP, MySQL, HTML, CSS & JavaScript',
      'Working within an Agile team on client-facing software in the Software Development dept.',
      'Building dynamic, database-driven modules and REST-style backend services',
      'Gaining hands-on experience with production-grade deployments and version control',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Git'],
  },
];

/* ── Single Experience Block ─────────────────────────────── */
const ExperienceBlock = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Top hairline divider */}
      <div className="w-full h-px" style={{ background: 'var(--border)' }} />

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[340px]"
        style={{ background: exp.bgTint }}
      >
        {/* ── Left Side ─────────────────────────────────────── */}
        <div
          className={`flex flex-col justify-between p-8 md:p-12 lg:p-16 ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Ghost number watermark */}
          <div className="relative">
            <span
              className="absolute -top-6 -left-4 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: 'clamp(5rem, 14vw, 10rem)',
                color: `${exp.accentColor}08`,
                letterSpacing: '-0.05em',
              }}
            >
              {exp.id}
            </span>

            {/* Type label */}
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase mb-4 relative z-10"
              style={{ color: exp.accentColor }}
            >
              {exp.type}
            </p>

            {/* Role — the hero typographic element */}
            <h3
              className="font-black leading-none relative z-10"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.03em',
                color: 'var(--text)',
              }}
            >
              {exp.role}
            </h3>
          </div>

          {/* Company row */}
          <div className="mt-6 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-white"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-10 h-10 object-contain"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<span style="font-size:1.2rem;font-weight:800;color:${exp.accentColor}">${exp.id}</span>`;
                }}
              />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                {exp.company}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>
                {exp.period} · {exp.location}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical separator */}
        <div
          className={`hidden lg:block absolute top-0 bottom-0 w-px ${isEven ? 'left-1/2' : 'left-1/2'}`}
          style={{ background: 'var(--border)' }}
        />

        {/* ── Right Side ────────────────────────────────────── */}
        <div
          className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
            isEven ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r'
          }`}
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Project label */}
          {exp.project && (
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: `${exp.accentColor}10`, color: exp.accentColor }}
              >
                {exp.project}
              </span>
              {exp.projectLink && (
                <a
                  href={exp.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--accent)' }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--secondary)' }}>
            {exp.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-2.5 mb-8">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: exp.accentColor }}
                />
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {exp.tech.map(t => (
              <span
                key={t}
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `${exp.accentColor}0E`,
                  color: exp.accentColor,
                  border: `1px solid ${exp.accentColor}22`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────── */
const ExperienceSection = () => (
  <section id="experience" className="py-10 md:py-14" style={{ background: 'var(--bg)' }}>
    <div className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="section-label mb-3">Experience</p>
        <h2
          className="font-black tracking-tight leading-none"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          Where I've worked.
        </h2>
      </motion.div>
    </div>

    {/* Full-width editorial blocks */}
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceBlock key={exp.id} exp={exp} index={i} />
        ))}
        {/* Bottom hairline */}
        <div className="w-full h-px" style={{ background: 'var(--border)' }} />
      </div>
    </div>
  </section>
);

export default ExperienceSection;
