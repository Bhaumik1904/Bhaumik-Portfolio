import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll + Escape key handler
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9000]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal panel — slides up from bottom */}
          <motion.div
            key="modal"
            className="fixed inset-x-0 bottom-0 z-[9001] mx-auto max-w-4xl rounded-t-[28px] overflow-hidden flex flex-col"
            style={{
              background: 'var(--card)',
              maxHeight: '92vh',
              boxShadow: '0 -20px 80px rgba(0,0,0,0.25)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Hero band with project colour */}
              <div
                className="px-8 pt-8 pb-10 relative"
                style={{ background: project.bgLight }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-lg font-medium transition-all hover:scale-110"
                  style={{
                    background: 'rgba(0,0,0,0.08)',
                    color: project.color,
                  }}
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: 'white', boxShadow: `0 8px 24px ${project.color}22` }}
                  >
                    {project.emoji}
                  </div>
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest block mb-1"
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </span>
                    <h2
                      className="font-black text-3xl md:text-4xl tracking-tight"
                      style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Big project number watermark */}
                <span
                  className="absolute bottom-4 right-8 text-8xl font-black opacity-10 pointer-events-none select-none"
                  style={{ color: project.color, letterSpacing: '-0.06em' }}
                >
                  {project.id}
                </span>
              </div>

              {/* Body */}
              <div className="px-8 py-8 space-y-8">

                {/* Description */}
                <p className="text-base leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  {project.description}
                </p>

                {/* Problem / Solution cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'The Problem', icon: '⚠️', text: project.problem, borderColor: '#FF453A' },
                    { label: 'The Solution', icon: '✅', text: project.solution, borderColor: project.color },
                  ].map(({ label, icon, text, borderColor }) => (
                    <div
                      key={label}
                      className="p-5 rounded-2xl"
                      style={{
                        background: 'var(--bg)',
                        border: `1px solid ${borderColor}22`,
                        borderLeftWidth: '3px',
                        borderLeftColor: borderColor,
                      }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: borderColor }}>
                        {icon} {label}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--secondary)' }}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background: `${project.color}14`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA links */}
                <div className="flex flex-col sm:flex-row gap-3 pb-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    <span>🐙</span> View on GitHub ↗
                  </a>
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 text-white"
                      style={{ background: project.color }}
                    >
                      <span>🚀</span> Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
