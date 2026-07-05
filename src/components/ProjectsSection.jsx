import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id: '01',
    title: 'Aptiva AI',
    category: 'Artificial Intelligence',
    description: 'An AI-powered adaptive learning platform that personalises study plans, generates quizzes, and tracks performance to accelerate skill acquisition.',
    problem: 'Generic learning platforms fail to adapt to individual learning pace and knowledge gaps, leading to inefficient study sessions.',
    solution: 'Built an intelligent engine that analyses user performance data to dynamically generate personalised content and recommendations using LLMs.',
    tech: ['Python', 'React', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    color: '#0071E3',
    bgLight: '#EEF4FF',
    emoji: '🤖',
    github: 'https://github.com/Bhaumik1904/Aptiva-AI.git',
    demo: '#',
  },
  {
    id: '02',
    title: 'StockSense AI',
    category: 'FinTech & AI',
    description: 'An intelligent stock market analysis tool that leverages machine learning to predict trends and provide actionable investment insights.',
    problem: 'Retail investors lack accessible, data-driven tools to analyze complex stock market patterns effectively.',
    solution: 'Developed an AI-powered prediction engine using time-series forecasting and sentiment analysis for real-time stock insights.',
    tech: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'React'],
    color: '#30D158',
    bgLight: '#EEFBF1',
    emoji: '📈',
    github: 'https://github.com/Bhaumik1904/StockSense-AI.git',
    demo: 'https://stocksenseai-49l5.onrender.com/',
  },
  {
    id: '03',
    title: 'Cancer Detection',
    category: 'Medical AI',
    description: 'A deep learning model achieving 96.8% accuracy in detecting malignant tissue from histopathology images. Built with a clean React dashboard for clinical review.',
    problem: 'Early detection of cancer significantly improves survival rates, but skilled radiologists are scarce.',
    solution: 'Trained a CNN on the BreakHis dataset with transfer learning, wrapped in a clinical-grade React dashboard.',
    tech: ['TensorFlow', 'Python', 'React', 'Flask', 'OpenCV'],
    color: '#BF5AF2',
    bgLight: '#F5EEFF',
    emoji: '🔬',
    github: 'https://github.com/Bhaumik1904/Cancer-Detection.git',
    demo: '#',
  },
  {
    id: '04',
    title: 'BidSphere',
    category: 'Full Stack Web App',
    description: 'A real-time auction platform where users can list items, place bids, and win products in a competitive bidding environment with live updates.',
    problem: 'Traditional auction systems are slow, opaque, and inaccessible to everyday users wanting a fair bidding experience online.',
    solution: 'Engineered a full-stack auction application with real-time bid updates, secure authentication, and a seamless seller/buyer workflow.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    color: '#FF9F0A',
    bgLight: '#FFF8EE',
    emoji: '🏷️',
    github: 'https://github.com/Bhaumik1904/BidSphere-Auction-Application.git',
    demo: 'https://bid-sphere-auction-application.vercel.app/',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const ProjectCard = ({ project, index, onSelect }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia('(hover: none)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    cardRef.current.style.transition = 'transform 0.08s ease';
    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className="apple-card overflow-hidden cursor-pointer"
      style={{ willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Project header band */}
      <div
        className="px-8 py-6 flex items-center justify-between"
        style={{ background: project.bgLight, borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'white', boxShadow: `0 4px 16px ${project.color}22` }}
          >
            {project.emoji}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: project.color }}>
              {project.category}
            </p>
            <h3 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
              {project.title}
            </h3>
          </div>
        </div>
        <span
          className="text-6xl font-black opacity-10"
          style={{ color: project.color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.05em' }}
        >
          {project.id}
        </span>
      </div>

      {/* Project body */}
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-0`}>
        {/* Description */}
        <div className="md:col-span-3 p-6 md:p-8 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--secondary)' }}>
            {project.description}
          </p>

          {/* Problem / Solution */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-sm font-semibold mt-0.5 shrink-0" style={{ color: 'var(--secondary)' }}>Problem</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{project.problem}</p>
            </div>
            <div className="divider" />
            <div className="flex gap-3">
              <span className="text-sm font-semibold mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>Solution</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{project.solution}</p>
            </div>
          </div>
        </div>

        {/* Tech + Links */}
        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between" style={{ background: 'var(--bg)' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--secondary)' }}>
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6 md:mt-8">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-sm flex-1 justify-center"
            >
              GitHub ↗
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-apple text-sm flex-1 justify-center"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="py-10 md:py-14" style={{ background: 'var(--bg)' }}>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      <div className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="section-label mb-3">Selected work</p>
        <h2
          className="font-black tracking-tight leading-none"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
        >
          Projects that matter.
        </h2>
      </motion.div>

      {/* Project list */}
      <motion.div
        className="flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/Bhaumik1904"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium hover-accent"
          style={{ color: 'var(--secondary)' }}
        >
          More projects on GitHub →
        </a>
      </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
